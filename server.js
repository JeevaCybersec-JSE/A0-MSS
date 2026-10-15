// ============================================================
// MSS KPI Dashboard — Backend Server
// Pure Node.js core modules only (no npm install needed).
// Run with:  node server.js
// Then open: http://localhost:4321
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');

const { SECTIONS, METRICS } = require('./lib/metrics');
const { computeMonth, computeOverallRAG, computeYTD, DEFAULT_WEIGHTS } = require('./lib/calc');
const {
  createShare,
  revokeShare,
  listShares,
  isValidMonth,
  isValidExpiryDays,
  EXPIRY_OPTIONS,
  resolveShareToken,
} = require('./lib/shares');

const PORT = process.env.PORT || 4321;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

// ---- Storage Paths ----
const USERS_PATH   = path.join(__dirname, 'data', 'users.json');
const AUDIT_PATH   = path.join(__dirname, 'data', 'audit.json');
const SHARES_PATH  = path.join(__dirname, 'data', 'shares.json'); // share-token store (referenced by lib/shares.js)
const WEIGHTS_PATH = path.join(__dirname, 'data', 'weights.json');

// =========================================================================
// REAL-TIME LIVE SYNCHRONIZATION ENGINE (Main Page -> Client Page)
// =========================================================================
let dataChangeVersion = 1;
let currentActiveMonth = '2026-05';
const sseClients = new Set();

function notifyDataChanged(month = null) {
  dataChangeVersion++;
  if (month && typeof month === 'string') currentActiveMonth = month;
  const payload = JSON.stringify({
    type: 'data_updated',
    version: dataChangeVersion,
    month: currentActiveMonth,
    timestamp: Date.now()
  });
  for (const client of sseClients) {
    try {
      client.res.write(`data: ${payload}\n\n`);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

function loadWeights() {
  try {
    return JSON.parse(fs.readFileSync(WEIGHTS_PATH, 'utf8'));
  } catch (e) {
    return Object.assign({}, DEFAULT_WEIGHTS);
  }
}

function saveWeights(w) {
  fs.writeFileSync(WEIGHTS_PATH, JSON.stringify(w, null, 2), 'utf8');
  notifyDataChanged();
}

// ---- Role-Based Access Control (RBAC) Definitions ----
const ROLES = {
  superadmin: {
    label: 'Super Admin',
    description: 'Full administrative access, dashboard read/write, history management, and user control',
    permissions: [
      'view:dashboard',
      'export:reports',
      'metrics:write',
      'metrics:clear',
      'history:restore',
      'history:delete',
      'history:clear_all',
      'narrative:write',
      'users:manage',
      'audit:delete',
    ],
  },
  admin: {
    label: 'Admin',
    description: 'Dashboard read/write access, metric editing, history restore/delete, and narrative authoring',
    permissions: [
      'view:dashboard',
      'export:reports',
      'metrics:write',
      'metrics:clear',
      'history:restore',
      'history:delete',
      'narrative:write',
    ],
  },
  editor: {
    label: 'Editor',
    description: 'Limited dashboard write access (enter/update metric values and narrative); cannot delete history',
    permissions: [
      'view:dashboard',
      'export:reports',
      'metrics:write',
      'history:restore',
      'narrative:write',
    ],
  },
  viewer: {
    label: 'Client / Viewer',
    description: 'Read-only access to all dashboards, metrics, trends, and executive briefings',
    permissions: [
      'view:dashboard',
      'export:reports',
    ],
  },
};

// ---- Password Hashing (PBKDF2, Zero External Dependencies) ----
function hashPassword(password, salt) {
  if (!salt) salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  if (!password || !hash || !salt) return false;
  try {
    const check = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(hash, 'hex'));
  } catch (e) {
    return false;
  }
}

// ---- User Datastore ----
function loadUsers() {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
  } catch (e) {
    const defaults = {
      users: [
        {
          id: 'u_superadmin_01',
          username: 'Jeeva',
          displayName: 'Jeeva',
          role: 'superadmin',
          ...hashPassword('0123'),
          createdAt: new Date().toISOString(),
          lastLogin: null,
        },
        {
          id: 'u_admin_01',
          username: 'admin',
          displayName: 'Admin',
          role: 'admin',
          ...hashPassword('admin123'),
          createdAt: new Date().toISOString(),
          lastLogin: null,
        },
        {
          id: 'u_editor_01',
          username: 'editor',
          displayName: 'Editor',
          role: 'editor',
          ...hashPassword('editor123'),
          createdAt: new Date().toISOString(),
          lastLogin: null,
        },
        {
          id: 'u_viewer_01',
          username: 'viewer',
          displayName: 'Client / Viewer',
          role: 'viewer',
          ...hashPassword('viewer123'),
          createdAt: new Date().toISOString(),
          lastLogin: null,
        },
      ],
    };
    saveUsers(defaults);
    return defaults;
  }
  if (data && data.users) {
    data.users.forEach(u => {
      if (!u.status) u.status = 'active';
    });
  }
  return data;
}

function saveUsers(data) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// ---- Lightweight Audit Log ----
function loadAudit() {
  try {
    return JSON.parse(fs.readFileSync(AUDIT_PATH, 'utf8'));
  } catch (e) {
    const defaults = { events: [] };
    try { fs.writeFileSync(AUDIT_PATH, JSON.stringify(defaults, null, 2), 'utf8'); } catch (_) {}
    return defaults;
  }
}

function recordAudit(actor, action, target, result, details = {}) {
  try {
    const auditDB = loadAudit();
    if (!auditDB.events) auditDB.events = [];
    auditDB.events.push({
      id: 'aud_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      timestamp: new Date().toISOString(),
      actor: actor || 'SYSTEM',
      action,
      target: target || 'N/A',
      result: result || 'SUCCESS',
      details: details || {},
    });
    if (auditDB.events.length > 1000) auditDB.events = auditDB.events.slice(-1000);
    fs.writeFileSync(AUDIT_PATH, JSON.stringify(auditDB, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}

// ---- Invalidate active sessions for a user ----
function invalidateUserSessions(username) {
  if (!username) return;
  const uLower = username.toLowerCase();
  for (const [token, sess] of sessions.entries()) {
    if (sess.username && sess.username.toLowerCase() === uLower) {
      sessions.delete(token);
    }
  }
}

// ---- Last Active Super Admin Counter ----
function getActiveSuperAdminCount(usersDB) {
  return usersDB.users.filter(u => u.role === 'superadmin' && (u.status || 'active') !== 'disabled').length;
}

// ---- In-memory session store (token -> sessionData) ----
// Session Map structure:
// Map<token, {
//   token: string,
//   username: string,
//   role: string,
//   roleLabel: string,
//   userId: string,
//   displayName: string,
//   createdAt: string,
//   expiresAt: number,       // Epoch ms
//   expiresAtISO: string     // ISO 8601 string
// }>
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const sessions = new Map();


// ---- Tiny JSON file datastore ----
function loadDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (e) {
    return { months: {} };
  }
}
function saveDB(db, targetMonth = null) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  notifyDataChanged(targetMonth);
}

function sortedMonthKeys(db) {
  return Object.keys(db.months).sort();
}
function prevMonthKey(db, month) {
  const keys = sortedMonthKeys(db).filter(k => k < month);
  return keys.length ? keys[keys.length - 1] : null;
}

function recomputeMonth(db, month) {
  const raw = (db.months[month] && db.months[month].metrics) || {};
  const prevKey = prevMonthKey(db, month);
  const prevComputed = prevKey ? db.months[prevKey].metrics : null;
  const computed = computeMonth(raw, prevComputed);
  if (!db.months[month]) db.months[month] = { metrics: {}, narrative: {} };
  // Preserve history and metadata from raw entries
  Object.keys(computed).forEach(mId => {
    if (raw[mId] && raw[mId].history) {
      computed[mId].history = raw[mId].history;
    }
  });
  db.months[month].metrics = computed;
  return computed;
}

// Recompute a month AND every month after it (since prevMonth-based RAG
// and trend arrows can shift when an earlier month's data changes)
function recomputeForward(db, fromMonth) {
  const keys = sortedMonthKeys(db).filter(k => k >= fromMonth);
  keys.forEach(k => recomputeMonth(db, k));
}


// ---- Production Security Headers ----
const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' http://localhost:4321 http://127.0.0.1:4321 ws: wss:; frame-ancestors 'none';",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
};

// ---- Authentication Abuse Protection (Rate Limiting & Lockout) ----
const loginAttempts = new Map(); // key -> { count: number, lockedUntil: number, firstAttempt: number }
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || '127.0.0.1';
}

function checkLoginThrottle(ip, username) {
  const now = Date.now();
  const key = `${ip}_${(username || '').toLowerCase()}`;
  const record = loginAttempts.get(key);
  if (record && record.lockedUntil && now < record.lockedUntil) {
    const remainingSecs = Math.ceil((record.lockedUntil - now) / 1000);
    return { locked: true, remainingSecs };
  }
  return { locked: false };
}

function recordFailedLogin(ip, username) {
  const now = Date.now();
  const key = `${ip}_${(username || '').toLowerCase()}`;
  const record = loginAttempts.get(key) || { count: 0, lockedUntil: 0, firstAttempt: now };
  if (now - record.firstAttempt > LOCKOUT_WINDOW_MS) {
    record.count = 0;
    record.firstAttempt = now;
  }
  record.count += 1;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS;
  }
  loginAttempts.set(key, record);
}

function clearFailedLogin(ip, username) {
  const key = `${ip}_${(username || '').toLowerCase()}`;
  loginAttempts.delete(key);
}

// ---- Helpers ----
function sendJSON(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Private-Network': 'true',
    ...SECURITY_HEADERS,
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; if (data.length > 5e6) req.destroy(); });
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
    });
    req.on('error', reject);
  });
}

function getToken(req) {
  const h = req.headers['authorization'] || '';
  const m = h.match(/^Bearer (.+)$/);
  return m ? m[1] : null;
}

function getSession(req) {
  const token = getToken(req);
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt && Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  // Check if account still exists and is not disabled
  const usersDB = loadUsers();
  const user = usersDB.users.find(u => u.username.toLowerCase() === session.username.toLowerCase());
  if (!user || user.status === 'disabled') {
    sessions.delete(token);
    return null;
  }
  if (user.role && ROLES[user.role]) {
    session.permissions = ROLES[user.role].permissions;
    session.role = user.role;
    session.roleLabel = ROLES[user.role].label;
  }
  return session;
}

function requireAuth(req, res) {
  const session = getSession(req);
  if (!session) {
    sendJSON(res, 401, { error: 'Not authenticated or session expired' });
    return null;
  }
  return session;
}

function requirePermission(req, res, perm) {
  const session = requireAuth(req, res);
  if (!session) return null;
  if (!session.permissions || !session.permissions.includes(perm)) {
    sendJSON(res, 403, { error: 'Forbidden: Insufficient permissions for this action (' + perm + ')' });
    return null;
  }
  return session;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

function serveStatic(req, res, pathname) {
  let filePath;
  if (pathname === '/' || pathname === '/index.html') {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  } else if (pathname === '/client.html') {
    filePath = path.join(PUBLIC_DIR, 'client.html');
  } else if (pathname === '/client' || pathname === '/client/') {
    filePath = path.join(PUBLIC_DIR, 'client.html');
  } else if (pathname.startsWith('/client/')) {
    const sub = pathname.slice('/client/'.length).trim();
    const candidate = path.join(PUBLIC_DIR, sub);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      filePath = candidate;
    } else {
      filePath = path.join(PUBLIC_DIR, 'client.html');
    }
  } else {
    filePath = path.join(PUBLIC_DIR, pathname);
  }
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end('Forbidden'); }
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*',
      ...SECURITY_HEADERS,
    });
    if (req.method === 'HEAD') {
      return res.end();
    }
    res.end(data);
  });
}

// ---- Main request handler ----
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Private-Network': 'true',
      'Access-Control-Max-Age': '86400',
      ...SECURITY_HEADERS,
    });
    return res.end();
  }

  try {
    // ---- DOWNLOAD CLIENT STANDALONE HTML ----
    if ((pathname === '/download-client' || pathname === '/client/download') && (req.method === 'GET' || req.method === 'HEAD')) {
      const clientStandalonePath = path.join(PUBLIC_DIR, 'client_standalone.html');
      if (fs.existsSync(clientStandalonePath)) {
        const fileData = fs.readFileSync(clientStandalonePath);
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': 'attachment; filename="Brysa_Executive_Client_Portal.html"',
          'Content-Length': fileData.length,
          ...SECURITY_HEADERS,
        });
        if (req.method === 'HEAD') return res.end();
        return res.end(fileData);
      }
    }

    // ---- AUTH ----
    if (pathname === '/api/login' && req.method === 'POST') {
      const body = await readBody(req);
      const username = (body.username || '').trim();
      const password = String(body.password || '');
      const ip = getClientIP(req);

      const throttle = checkLoginThrottle(ip, username);
      if (throttle.locked) {
        recordAudit('SYSTEM', 'LOGIN_THROTTLED', username || 'UNKNOWN', 'FAILED', { ip, remainingSecs: throttle.remainingSecs });
        return sendJSON(res, 429, { error: `Too many failed login attempts. Please try again in ${throttle.remainingSecs} seconds.` });
      }

      const usersDB = loadUsers();
      const user = usersDB.users.find(u => u.username.toLowerCase() === username.toLowerCase());

      if (!user || !verifyPassword(password, user.hash, user.salt)) {
        recordFailedLogin(ip, username);
        recordAudit('SYSTEM', 'LOGIN_FAILED', username || 'UNKNOWN', 'FAILED', { ip });
        return sendJSON(res, 401, { error: 'Invalid username or password' });
      }

      if (user.status === 'disabled') {
        recordAudit(user.username, 'LOGIN_BLOCKED_DISABLED', user.username, 'FAILED', { ip });
        return sendJSON(res, 401, { error: 'Account is disabled. Please contact an administrator.' });
      }

      // Successful login clears failed attempt tracking
      clearFailedLogin(ip, username);
      recordAudit(user.username, 'LOGIN_SUCCESS', user.username, 'SUCCESS', { ip });

      user.lastLogin = new Date().toISOString();
      saveUsers(usersDB);

      const token = crypto.randomBytes(24).toString('hex');
      const roleConfig = ROLES[user.role] || ROLES.viewer;
      const now = Date.now();
      const expiresAt = now + SESSION_TTL_MS;
      const sessionData = {
        token,
        username: user.username,
        role: user.role,
        roleLabel: roleConfig.label,
        userId: user.id,
        displayName: user.displayName || user.username,
        permissions: roleConfig.permissions,
        createdAt: new Date(now).toISOString(),
        expiresAt,
        expiresAtISO: new Date(expiresAt).toISOString(),
      };
      sessions.set(token, sessionData);

      return sendJSON(res, 200, {
        token,
        username: user.username,
        displayName: user.displayName || user.username,
        role: user.role,
        roleLabel: roleConfig.label,
        permissions: roleConfig.permissions,
        expiresAt: sessionData.expiresAtISO,
      });
    }

    if (pathname === '/api/logout' && req.method === 'POST') {
      const token = getToken(req);
      if (token) sessions.delete(token);
      return sendJSON(res, 200, { ok: true });
    }

    if (pathname === '/api/me' && req.method === 'GET') {
      const session = requireAuth(req, res);
      if (!session) return;
      return sendJSON(res, 200, {
        username: session.username,
        displayName: session.displayName,
        role: session.role,
        roleLabel: session.roleLabel,
        permissions: session.permissions,
        expiresAt: session.expiresAtISO,
      });
    }

    // ---- METRIC DEFINITIONS (drives the entire frontend UI) ----
    if (pathname === '/api/metrics' && req.method === 'GET') {
      if (!requireAuth(req, res)) return;
      return sendJSON(res, 200, { sections: SECTIONS, metrics: METRICS });
    }

    // ---- GET a month's computed data (+ narrative + history) ----
    if (pathname === '/api/data' && req.method === 'GET') {
      if (!requireAuth(req, res)) return;
      const month = parsed.query.month;
      if (!month) return sendJSON(res, 400, { error: 'month is required' });
      const db = loadDB();
      const prevKey = prevMonthKey(db, month);
      const prevData = {};
      if (prevKey && db.months[prevKey] && db.months[prevKey].metrics) {
        Object.keys(db.months[prevKey].metrics).forEach(mId => {
          prevData[mId] = db.months[prevKey].metrics[mId].computed;
        });
      }
      if (!db.months[month]) {
        const year = month.split('-')[0];
        const ytd = computeYTD(db.months, year);
        return sendJSON(res, 200, { month, metrics: {}, narrative: {}, overallRAG: null, overallDetails: null, ytd, prevMonth: prevKey, prevData, history: {} });
      }
      const metrics = recomputeMonth(db, month); // ensure fresh (handles first-load-after-earlier-edit case)
      saveDB(db);

      const history = {};
      Object.keys(db.months[month].metrics || {}).forEach(mId => {
        if (db.months[month].metrics[mId].history) {
          history[mId] = db.months[month].metrics[mId].history;
        }
      });

      const weights = loadWeights();
      const overall = computeOverallRAG(metrics, weights);
      const year = month.split('-')[0];
      const ytd = computeYTD(db.months, year);

      return sendJSON(res, 200, {
        month,
        metrics,
        narrative: db.months[month].narrative || {},
        overallRAG: overall ? overall.rag : null,
        overallDetails: overall,
        ytd,
        prevMonth: prevKey,
        prevData,
        history,
      });
    }

    // ---- SAVE / CLEAR raw inputs for one metric, recompute, persist with history ----
    if (pathname === '/api/data' && req.method === 'POST') {
      const session = requireAuth(req, res);
      if (!session) return;
      const body = await readBody(req);
      const { month, metricId, inputs, action } = body;
      if (!month || !metricId) return sendJSON(res, 400, { error: 'month and metricId are required' });

      // RBAC Permission checks
      if (action === 'clear_all_history') {
        if (!requirePermission(req, res, 'history:clear_all')) return;
      } else if (action === 'delete_history_item') {
        if (!requirePermission(req, res, 'history:delete')) return;
      } else if (action === 'clear') {
        if (!requirePermission(req, res, 'metrics:clear')) return;
      } else {
        // Normal save or history restore
        if (!requirePermission(req, res, 'metrics:write')) return;
      }

      const db = loadDB();
      if (!db.months[month]) db.months[month] = { metrics: {}, narrative: {} };
      if (!db.months[month].metrics[metricId]) db.months[month].metrics[metricId] = {};
      
      const targetMetric = db.months[month].metrics[metricId];
      if (!Array.isArray(targetMetric.history)) {
        targetMetric.history = [];
      }

      if (action === 'delete_history_item') {
        const histIndex = typeof body.historyIndex === 'number' ? body.historyIndex : -1;
        if (histIndex >= 0 && histIndex < targetMetric.history.length) {
          targetMetric.history.splice(histIndex, 1);
        }
        saveDB(db);
        const metrics = db.months[month].metrics;
        const history = {};
        Object.keys(db.months[month].metrics || {}).forEach(mId => {
          if (db.months[month].metrics[mId].history) {
            history[mId] = db.months[month].metrics[mId].history;
          }
        });
        const weights = loadWeights();
        const overall = computeOverallRAG(metrics, weights);
        const year = month.split('-')[0];
        const ytd = computeYTD(db.months, year);
        return sendJSON(res, 200, {
          month,
          metrics,
          overallRAG: overall ? overall.rag : null,
          overallDetails: overall,
          ytd,
          history,
        });
      }

      if (action === 'clear_all_history') {
        targetMetric.history = [];
        saveDB(db);
        const metrics = db.months[month].metrics;
        const history = {};
        Object.keys(db.months[month].metrics || {}).forEach(mId => {
          if (db.months[month].metrics[mId].history) {
            history[mId] = db.months[month].metrics[mId].history;
          }
        });
        const weights = loadWeights();
        const overall = computeOverallRAG(metrics, weights);
        const year = month.split('-')[0];
        const ytd = computeYTD(db.months, year);
        return sendJSON(res, 200, {
          month,
          metrics,
          overallRAG: overall ? overall.rag : null,
          overallDetails: overall,
          ytd,
          history,
        });
      }

      if (action === 'clear') {
        // Record clear action into history with author attribution
        if (targetMetric.inputs && Object.keys(targetMetric.inputs).length > 0) {
          targetMetric.history.unshift({
            timestamp: new Date().toISOString(),
            action: 'clear',
            user: session.username,
            previousInputs: Object.assign({}, targetMetric.inputs),
            previousComputed: targetMetric.computed,
            previousRAG: targetMetric.rag,
          });
        }
        targetMetric.inputs = {};
      } else {
        // Normal save or update: save old data to history before overwriting, with author attribution
        const oldInputs = targetMetric.inputs || {};
        const hasOld = Object.keys(oldInputs).length > 0 && Object.values(oldInputs).some(v => v !== null && v !== undefined && v !== '');
        if (hasOld) {
          targetMetric.history.unshift({
            timestamp: new Date().toISOString(),
            action: 'update',
            user: session.username,
            inputs: Object.assign({}, oldInputs),
            computed: targetMetric.computed,
            rag: targetMetric.rag,
          });
        }
        if (targetMetric.history.length > 20) {
          targetMetric.history = targetMetric.history.slice(0, 20);
        }
        targetMetric.inputs = inputs || {};
      }

      recomputeForward(db, month);
      saveDB(db);
      const metrics = db.months[month].metrics;

      const history = {};
      Object.keys(db.months[month].metrics || {}).forEach(mId => {
        if (db.months[month].metrics[mId].history) {
          history[mId] = db.months[month].metrics[mId].history;
        }
      });

      const weights = loadWeights();
      const overall = computeOverallRAG(metrics, weights);
      const year = month.split('-')[0];
      const ytd = computeYTD(db.months, year);

      return sendJSON(res, 200, {
        month,
        metrics,
        overallRAG: overall ? overall.rag : null,
        overallDetails: overall,
        ytd,
        history,
      });
    }

    // ---- SAVE narrative text (exec summary) ----
    if (pathname === '/api/narrative' && req.method === 'POST') {
      const session = requirePermission(req, res, 'narrative:write');
      if (!session) return;
      const body = await readBody(req);
      const { month, topRisks, improvements, plannedActions } = body;
      if (!month) return sendJSON(res, 400, { error: 'month is required' });
      const db = loadDB();
      if (!db.months[month]) db.months[month] = { metrics: {}, narrative: {} };
      db.months[month].narrative = {
        topRisks: topRisks || '',
        improvements: improvements || '',
        plannedActions: plannedActions || '',
        updatedAt: new Date().toISOString(),
        updatedBy: session.username,
      };
      saveDB(db);
      return sendJSON(res, 200, { ok: true, narrative: db.months[month].narrative });
    }

    // ---- USER MANAGEMENT (Super Admin Only) ----
    if (pathname === '/api/users' && req.method === 'GET') {
      if (!requirePermission(req, res, 'users:manage')) return;
      const usersDB = loadUsers();
      const safeUsers = usersDB.users.map(u => ({
        id: u.id,
        username: u.username,
        displayName: u.displayName || u.username,
        role: u.role,
        roleLabel: (ROLES[u.role] && ROLES[u.role].label) || u.role,
        status: u.status || 'active',
        createdAt: u.createdAt,
        lastLogin: u.lastLogin,
      }));
      return sendJSON(res, 200, { users: safeUsers, roles: ROLES });
    }

    if (pathname === '/api/users' && req.method === 'POST') {
      const session = requirePermission(req, res, 'users:manage');
      if (!session) return;
      const body = await readBody(req);
      const username = (body.username || '').trim();
      const password = String(body.password || '').trim();
      const displayName = (body.displayName || username).trim().slice(0, 60);
      const role = body.role || 'viewer';

      if (!username || !password) {
        return sendJSON(res, 400, { error: 'Username and password are required' });
      }

      // Strict username format validation (2-40 chars, alphanumeric + dots/hyphens/underscores)
      const USERNAME_REGEX = /^[a-zA-Z0-9._-]{2,40}$/;
      if (!USERNAME_REGEX.test(username)) {
        return sendJSON(res, 400, { error: 'Username must be 2-40 characters and contain only letters, numbers, dots, hyphens, or underscores' });
      }

      // Strict password length validation (4-128 chars)
      if (password.length < 4 || password.length > 128) {
        return sendJSON(res, 400, { error: 'Password must be between 4 and 128 characters' });
      }

      if (!ROLES[role]) {
        return sendJSON(res, 400, { error: 'Invalid role specified. Supported roles: superadmin, admin, editor, viewer' });
      }

      const usersDB = loadUsers();
      if (usersDB.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return sendJSON(res, 400, { error: 'Username already exists' });
      }

      const { hash, salt } = hashPassword(password);
      const newUser = {
        id: 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        username,
        displayName,
        role,
        status: 'active',
        hash,
        salt,
        createdAt: new Date().toISOString(),
        lastLogin: null,
      };
      usersDB.users.push(newUser);
      saveUsers(usersDB);
      recordAudit(session.username, 'USER_CREATED', username, 'SUCCESS', { role });

      return sendJSON(res, 201, {
        ok: true,
        user: {
          id: newUser.id,
          username: newUser.username,
          displayName: newUser.displayName,
          role: newUser.role,
          roleLabel: ROLES[newUser.role].label,
          status: newUser.status,
          createdAt: newUser.createdAt,
          lastLogin: null,
        },
      });
    }

    // Reset password endpoint
    if (pathname === '/api/users/reset-password' && req.method === 'POST') {
      const session = requirePermission(req, res, 'users:manage');
      if (!session) return;
      const body = await readBody(req);
      const targetIdentifier = (body.username || body.id || '').trim();
      const newPassword = String(body.password || '').trim();
      if (!targetIdentifier || !newPassword) {
        return sendJSON(res, 400, { error: 'User identifier and new password are required' });
      }
      if (newPassword.length < 4 || newPassword.length > 128) {
        return sendJSON(res, 400, { error: 'New password must be between 4 and 128 characters' });
      }
      const usersDB = loadUsers();
      const user = usersDB.users.find(u =>
        u.id === targetIdentifier || u.username.toLowerCase() === targetIdentifier.toLowerCase()
      );
      if (!user) return sendJSON(res, 404, { error: 'User not found' });

      const { hash, salt } = hashPassword(newPassword);
      user.hash = hash;
      user.salt = salt;
      saveUsers(usersDB);
      invalidateUserSessions(user.username);
      recordAudit(session.username, 'PASSWORD_RESET', user.username, 'SUCCESS');

      return sendJSON(res, 200, { ok: true, message: 'Password reset successfully for @' + user.username });
    }

    // Enable / Disable status endpoint
    if (pathname === '/api/users/status' && req.method === 'POST') {
      const session = requirePermission(req, res, 'users:manage');
      if (!session) return;
      const body = await readBody(req);
      const targetIdentifier = (body.username || body.id || '').trim();
      const newStatus = (body.status || '').trim().toLowerCase();
      if (!targetIdentifier || !newStatus) {
        return sendJSON(res, 400, { error: 'User identifier and status are required' });
      }
      if (newStatus !== 'active' && newStatus !== 'disabled') {
        return sendJSON(res, 400, { error: 'Status must be active or disabled' });
      }
      const usersDB = loadUsers();
      const user = usersDB.users.find(u =>
        u.id === targetIdentifier || u.username.toLowerCase() === targetIdentifier.toLowerCase()
      );
      if (!user) return sendJSON(res, 404, { error: 'User not found' });

      // Last active Super Admin protection
      if (user.role === 'superadmin' && (user.status || 'active') === 'active' && newStatus === 'disabled') {
        if (getActiveSuperAdminCount(usersDB) <= 1) {
          recordAudit(session.username, 'USER_DISABLED', user.username, 'FAILED', { reason: 'Cannot disable last active Super Admin' });
          return sendJSON(res, 400, { error: 'Cannot disable the last active Super Admin account' });
        }
      }

      user.status = newStatus;
      saveUsers(usersDB);
      if (newStatus === 'disabled') {
        invalidateUserSessions(user.username);
        recordAudit(session.username, 'USER_DISABLED', user.username, 'SUCCESS');
      } else {
        recordAudit(session.username, 'USER_ENABLED', user.username, 'SUCCESS');
      }

      return sendJSON(res, 200, {
        ok: true,
        user: { id: user.id, username: user.username, status: user.status },
      });
    }

    // Update user (role, status, password, displayName)
    if (pathname.startsWith('/api/users/') && req.method === 'PUT') {
      const session = requirePermission(req, res, 'users:manage');
      if (!session) return;
      const targetIdentifier = pathname.replace('/api/users/', '').trim();
      const body = await readBody(req);
      const usersDB = loadUsers();
      const user = usersDB.users.find(u =>
        u.id === targetIdentifier || u.username.toLowerCase() === targetIdentifier.toLowerCase()
      );
      if (!user) return sendJSON(res, 404, { error: 'User not found' });

      // Role change
      if (body.role) {
        if (!ROLES[body.role]) return sendJSON(res, 400, { error: 'Invalid role' });
        if (user.role === 'superadmin' && body.role !== 'superadmin' && (user.status || 'active') === 'active') {
          if (getActiveSuperAdminCount(usersDB) <= 1) {
            recordAudit(session.username, 'ROLE_CHANGED', user.username, 'FAILED', { reason: 'Cannot change role of last active Super Admin' });
            return sendJSON(res, 400, { error: 'Cannot change the role of the last active Super Admin' });
          }
        }
        const oldRole = user.role;
        user.role = body.role;
        recordAudit(session.username, 'ROLE_CHANGED', user.username, 'SUCCESS', { oldRole, newRole: body.role });
      }

      // Status change
      if (body.status) {
        const newStatus = body.status.trim().toLowerCase();
        if (newStatus !== 'active' && newStatus !== 'disabled') {
          return sendJSON(res, 400, { error: 'Status must be active or disabled' });
        }
        if (user.role === 'superadmin' && (user.status || 'active') === 'active' && newStatus === 'disabled') {
          if (getActiveSuperAdminCount(usersDB) <= 1) {
            recordAudit(session.username, 'USER_DISABLED', user.username, 'FAILED', { reason: 'Cannot disable last active Super Admin' });
            return sendJSON(res, 400, { error: 'Cannot disable the last active Super Admin account' });
          }
        }
        user.status = newStatus;
        if (newStatus === 'disabled') {
          invalidateUserSessions(user.username);
          recordAudit(session.username, 'USER_DISABLED', user.username, 'SUCCESS');
        } else {
          recordAudit(session.username, 'USER_ENABLED', user.username, 'SUCCESS');
        }
      }

      if (body.displayName) user.displayName = body.displayName.trim();

      // Password reset
      if (body.password && String(body.password).trim()) {
        const { hash, salt } = hashPassword(String(body.password).trim());
        user.hash = hash;
        user.salt = salt;
        invalidateUserSessions(user.username);
        recordAudit(session.username, 'PASSWORD_RESET', user.username, 'SUCCESS');
      }

      saveUsers(usersDB);
      return sendJSON(res, 200, {
        ok: true,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          role: user.role,
          roleLabel: (ROLES[user.role] && ROLES[user.role].label) || user.role,
          status: user.status || 'active',
        },
      });
    }

    // Delete user
    if (pathname.startsWith('/api/users/') && req.method === 'DELETE') {
      const session = requirePermission(req, res, 'users:manage');
      if (!session) return;
      const targetIdentifier = pathname.replace('/api/users/', '').trim();
      const usersDB = loadUsers();
      const userIndex = usersDB.users.findIndex(u =>
        u.id === targetIdentifier || u.username.toLowerCase() === targetIdentifier.toLowerCase()
      );
      if (userIndex === -1) return sendJSON(res, 404, { error: 'User not found' });

      const targetUser = usersDB.users[userIndex];
      if (targetUser.username.toLowerCase() === session.username.toLowerCase()) {
        recordAudit(session.username, 'USER_DELETED', targetUser.username, 'FAILED', { reason: 'Cannot delete own account' });
        return sendJSON(res, 400, { error: 'You cannot delete your own account' });
      }
      if (targetUser.role === 'superadmin' && (targetUser.status || 'active') === 'active') {
        if (getActiveSuperAdminCount(usersDB) <= 1) {
          recordAudit(session.username, 'USER_DELETED', targetUser.username, 'FAILED', { reason: 'Cannot delete last active Super Admin' });
          return sendJSON(res, 400, { error: 'Cannot delete the only active Super Admin account' });
        }
      }

      usersDB.users.splice(userIndex, 1);
      saveUsers(usersDB);
      invalidateUserSessions(targetUser.username);
      recordAudit(session.username, 'USER_DELETED', targetUser.username, 'SUCCESS');
      return sendJSON(res, 200, { ok: true, message: 'Operator account deleted' });
    }

    // Audit log viewer with filtering
    if (pathname === '/api/audit' && req.method === 'GET') {
      if (!requirePermission(req, res, 'users:manage')) return;
      const auditDB = loadAudit();
      let events = auditDB.events || [];
      const { action, user, from, to, result } = parsed.query;
      if (action && typeof action === 'string' && action.trim()) {
        const a = action.trim().toUpperCase();
        events = events.filter(e => e.action === a);
      }
      if (user && typeof user === 'string' && user.trim()) {
        const u = user.trim().toLowerCase();
        events = events.filter(e =>
          (e.actor && e.actor.toLowerCase().includes(u)) ||
          (e.target && e.target.toLowerCase().includes(u))
        );
      }
      if (result && typeof result === 'string' && result.trim()) {
        const r = result.trim().toUpperCase();
        events = events.filter(e => e.result === r);
      }
      if (from && typeof from === 'string' && from.trim()) {
        const fromDate = new Date(from.trim());
        if (!isNaN(fromDate.getTime())) {
          events = events.filter(e => new Date(e.timestamp) >= fromDate);
        }
      }
      if (to && typeof to === 'string' && to.trim()) {
        const toDate = new Date(to.trim());
        if (!isNaN(toDate.getTime())) {
          if (to.trim().length === 10) toDate.setHours(23, 59, 59, 999);
          events = events.filter(e => new Date(e.timestamp) <= toDate);
        }
      }
      return sendJSON(res, 200, { events });
    }

    // Delete a single audit log entry by ID (Super Admin only via RBAC)
    if (pathname.startsWith('/api/audit/') && req.method === 'DELETE') {
      const session = requirePermission(req, res, 'audit:delete');
      if (!session) return;
      const targetId = decodeURIComponent(pathname.slice('/api/audit/'.length).trim());
      const auditDB = loadAudit();
      const initialCount = (auditDB.events || []).length;
      auditDB.events = (auditDB.events || []).filter(e => e.id !== targetId);
      if (auditDB.events.length === initialCount) {
        return sendJSON(res, 404, { error: 'Audit event not found' });
      }
      try {
        fs.writeFileSync(AUDIT_PATH, JSON.stringify(auditDB, null, 2), 'utf8');
      } catch (err) {
        return sendJSON(res, 500, { error: 'Failed to update audit datastore' });
      }
      recordAudit(session.username, 'AUDIT_LOG_DELETED', targetId, 'SUCCESS', { deletedId: targetId });
      return sendJSON(res, 200, { ok: true, deletedId: targetId });
    }

    // Clear all audit logs (Super Admin only via RBAC)
    if ((pathname === '/api/audit' || pathname === '/api/audit/clear') && (req.method === 'DELETE' || req.method === 'POST')) {
      const session = requirePermission(req, res, 'audit:delete');
      if (!session) return;
      const auditDB = loadAudit();
      const clearedCount = (auditDB.events || []).length;
      auditDB.events = [];
      try {
        fs.writeFileSync(AUDIT_PATH, JSON.stringify(auditDB, null, 2), 'utf8');
      } catch (err) {
        return sendJSON(res, 500, { error: 'Failed to clear audit datastore' });
      }
      recordAudit(session.username, 'AUDIT_LOGS_PURGED', 'ALL', 'SUCCESS', { clearedCount });
      return sendJSON(res, 200, { ok: true, clearedCount });
    }

    // ---- LIST months with overall RAG and metric breakdowns (for trends / history) ----
    if (pathname === '/api/months' && req.method === 'GET') {
      if (!requireAuth(req, res)) return;
      const db = loadDB();
      const now = new Date();
      const currentCalMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
      if (!db.months[currentCalMonth]) {
        const prevKey = prevMonthKey(db, currentCalMonth);
        const templateMetrics = prevKey && db.months[prevKey] ? db.months[prevKey].metrics : {};
        db.months[currentCalMonth] = {
          metrics: JSON.parse(JSON.stringify(templateMetrics || {})),
          narrative: { topRisks: '', improvements: '', plannedActions: '' }
        };
        saveDB(db);
      }
      const keys = sortedMonthKeys(db);
      const out = keys.map(k => {
        const mObj = db.months[k] || {};
        const monthMetrics = mObj.metrics || {};
        let green = 0, amber = 0, red = 0, trend = 0, total = 0;
        METRICS.forEach(m => {
          const entry = monthMetrics[m.id];
          if (!entry || entry.computed === null || entry.computed === undefined) {
            if (m.direction === 'trend') trend++;
            return;
          }
          total++;
          if (entry.rag === 'green') green++;
          else if (entry.rag === 'amber') amber++;
          else if (entry.rag === 'red') red++;
          else trend++;
        });
        const nar = mObj.narrative || {};
        const hasNarrative = Boolean(
          (nar.topRisks && nar.topRisks.trim()) ||
          (nar.improvements && nar.improvements.trim()) ||
          (nar.plannedActions && nar.plannedActions.trim())
        );
        const weights = loadWeights();
        const overall = computeOverallRAG(monthMetrics, weights);
        return {
          month: k,
          overallRAG: overall ? overall.rag : null,
          overallDetails: overall,
          green,
          amber,
          red,
          trend,
          total,
          hasNarrative,
          narrative: nar,
        };
      });
      return sendJSON(res, 200, { months: out });
    }

    // ================================================================
    // SHARE LINK API  — Phase 2 secure client share-token backend
    // Only superadmin and admin roles may create / revoke share links.
    // Viewers and editors are explicitly rejected.
    // ================================================================

    // ---- Helper: check if session role is admin or superadmin ----
    function isAdminOrAbove(session) {
      return session && (session.role === 'superadmin' || session.role === 'admin');
    }

    // ---- POST /api/shares — Create a new secure share link ----
    if (pathname === '/api/shares' && req.method === 'POST') {
      const session = requireAuth(req, res);
      if (!session) return;

      if (!isAdminOrAbove(session)) {
        return sendJSON(res, 403, { error: 'You do not have permission to create client share links.' });
      }

      const body = await readBody(req);

      // Validate month
      const month = (body.month || '').trim();
      if (!isValidMonth(month)) {
        return sendJSON(res, 400, { error: 'Invalid reporting month. Expected YYYY-MM format (e.g. 2026-09).' });
      }

      // Validate expiry
      const expiresInDays = Number(body.expiresInDays);
      if (!isValidExpiryDays(expiresInDays)) {
        return sendJSON(res, 400, {
          error: `Invalid expiry duration. Allowed values: ${EXPIRY_OPTIONS.join(', ')} days.`,
        });
      }

      // Client name: use the provided value or fall back to application default
      const clientName = (body.clientName && String(body.clientName).trim()) || 'A0 MSS Dashboard';
      if (clientName.length > 120) {
        return sendJSON(res, 400, { error: 'Client name is too long (max 120 characters).' });
      }

      let rawToken, record;
      try {
        ({ rawToken, record } = createShare({
          month,
          expiresInDays,
          clientName,
          createdBy: session.displayName || session.username,
        }));
      } catch (shareErr) {
        return sendJSON(res, 400, { error: shareErr.message || 'Failed to create share link.' });
      }

      // Build the share URL using the Host header so it works on any port/hostname
      const host = req.headers.host || 'localhost:' + PORT;
      const protocol = (req.headers['x-forwarded-proto'] || 'http').split(',')[0].trim();
      const shareUrl = `${protocol}://${host}/client/${rawToken}`;

      // Audit the action — but NEVER log rawToken or the full URL
      recordAudit(
        session.username,
        'SHARE_CREATED',
        `share:${record.id}`,
        'SUCCESS',
        { month, expiresInDays, clientName, shareId: record.id }
      );

      // rawToken is returned ONCE in the response body only.
      // It is NOT written to shares.json, audit.json, or console.
      return sendJSON(res, 201, {
        success: true,
        share: {
          id:         record.id,
          clientName: record.clientName,
          month:      record.month,
          expiresAt:  record.expiresAt,
          createdAt:  record.createdAt,
          createdBy:  record.createdBy,
          status:     'active',
        },
        url: shareUrl,   // contains rawToken — returned once; never stored
      });
    }

    // ---- GET /api/shares — List all share records (safe metadata only) ----
    if (pathname === '/api/shares' && req.method === 'GET') {
      const session = requireAuth(req, res);
      if (!session) return;

      if (!isAdminOrAbove(session)) {
        return sendJSON(res, 403, { error: 'You do not have permission to view share links.' });
      }

      // Optional ?status= filter (active | expired | revoked)
      const statusFilter = parsed.query.status || null;
      const allowedFilters = ['active', 'expired', 'revoked'];
      if (statusFilter && !allowedFilters.includes(statusFilter)) {
        return sendJSON(res, 400, { error: 'Invalid status filter. Use: active, expired, or revoked.' });
      }

      const shares = listShares({ statusFilter: statusFilter || undefined });
      // listShares() already strips tokenHash before returning
      return sendJSON(res, 200, { shares, allowedExpiryDays: EXPIRY_OPTIONS });
    }

    // ---- POST /api/shares/:id/revoke — Revoke a share by internal ID ----
    if (pathname.startsWith('/api/shares/') && pathname.endsWith('/revoke') && req.method === 'POST') {
      const session = requireAuth(req, res);
      if (!session) return;

      if (!isAdminOrAbove(session)) {
        return sendJSON(res, 403, { error: 'You do not have permission to revoke share links.' });
      }

      // Extract the share ID between /api/shares/ and /revoke
      const shareId = pathname.slice('/api/shares/'.length, -'/revoke'.length).trim();
      if (!shareId || !/^shr_[0-9a-f]+$/.test(shareId)) {
        return sendJSON(res, 400, { error: 'Invalid share ID format.' });
      }

      const result = revokeShare(shareId);
      if (!result.ok) {
        const status = result.error === 'Share not found.' ? 404 : 400;
        return sendJSON(res, status, { error: result.error });
      }

      recordAudit(
        session.username,
        'SHARE_REVOKED',
        `share:${shareId}`,
        'SUCCESS',
        { shareId }
      );

      return sendJSON(res, 200, { success: true, message: 'Share link has been revoked.' });
    }

    // ================================================================
    // PUBLIC CLIENT PORTAL API — Phase 3 Secure Client Intelligence Portal
    // Public endpoint for authorized clients via Phase 2 share token.
    // Does NOT require Bearer auth.
    // Strictly read-only, isolated to the authorized month only.
    // ================================================================
    if (pathname.startsWith('/api/public/portal/')) {
      if (req.method !== 'GET') {
        return sendJSON(res, 405, { error: 'Method not allowed. Public portal is strictly read-only.' });
      }

      const rawToken = pathname.slice('/api/public/portal/'.length).trim();

      // Resolve and validate token (checks format, HMAC hash match, active status, expiry)
      const share = resolveShareToken(rawToken);
      if (!share) {
        // Generic 401 error: does not reveal whether token never existed, expired, or was revoked
        return sendJSON(res, 401, { error: 'Invalid or expired share link' });
      }

      // Authoritative month from validated share record — any client-supplied ?month= is ignored
      const month = share.month;
      const db = loadDB();
      const monthObj = db.months[month] || { metrics: {}, narrative: {} };

      // Previous month for delta/trend comparison (if applicable)
      const prevKey = prevMonthKey(db, month);
      const prevComputed = prevKey && db.months[prevKey] && db.months[prevKey].metrics
        ? db.months[prevKey].metrics
        : null;

      // Calculate the month's metrics using the existing calc engine
      const rawMetrics = monthObj.metrics || {};
      const computed = computeMonth(rawMetrics, prevComputed);

      // Build sanitized metrics dictionary (strictly strip operator edit history)
      const sanitizedMetrics = {};
      Object.keys(computed).forEach(mId => {
        const item = computed[mId];
        sanitizedMetrics[mId] = {
          computed: item.computed,
          rag: item.rag,
          inputs: item.inputs || {},
        };
      });

      // Compute summary RAG counts across entire 51-metric estate
      let green = 0, amber = 0, red = 0, evaluatedTotal = 0;
      Object.values(computed).forEach(m => {
        if (m && m.rag) {
          evaluatedTotal++;
          if (m.rag === 'green') green++;
          else if (m.rag === 'amber') amber++;
          else if (m.rag === 'red') red++;
        }
      });

      const totalCatalog = METRICS.length;
      const telemetryCount = Math.max(0, totalCatalog - evaluatedTotal);

      const weights = loadWeights();
      const overall = computeOverallRAG(computed, weights);
      const overallRAG = overall ? overall.rag : null;

      return sendJSON(res, 200, {
        success: true,
        portal: {
          clientName: share.clientName,
          month,
          expiresAt: share.expiresAt,
          overallRAG,
          summary: {
            overallRAG,
            green,
            amber,
            red,
            evaluatedTotal,
            total: totalCatalog,
            telemetryCount,
          },
          narrative: {
            topRisks: (monthObj.narrative && monthObj.narrative.topRisks) || '',
            improvements: (monthObj.narrative && monthObj.narrative.improvements) || '',
            plannedActions: (monthObj.narrative && monthObj.narrative.plannedActions) || '',
          },
          sections: SECTIONS,
          metricDefinitions: METRICS,
          metrics: sanitizedMetrics,
        },
      });
    }

    // ================================================================
    // REAL-TIME LIVE SYNCHRONIZATION ENDPOINTS (Main Page -> Client Page)
    // ================================================================
    if (pathname === '/api/public/live-events' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });
      res.write(`data: ${JSON.stringify({ type: 'connected', version: dataChangeVersion, month: currentActiveMonth })}\n\n`);
      const client = { res, id: Date.now() };
      sseClients.add(client);
      req.on('close', () => {
        sseClients.delete(client);
      });
      return;
    }

    if (pathname === '/api/public/version' && req.method === 'GET') {
      return sendJSON(res, 200, {
        version: dataChangeVersion,
        activeMonth: currentActiveMonth,
        timestamp: Date.now(),
      });
    }

    if (pathname === '/api/active-month' && req.method === 'POST') {
      const body = await readBody(req);
      if (body && body.month && isValidMonth(body.month)) {
        currentActiveMonth = body.month;
        notifyDataChanged(body.month);
      }
      return sendJSON(res, 200, { success: true, activeMonth: currentActiveMonth, version: dataChangeVersion });
    }

    // ================================================================
    // PUBLIC CLIENT DELIVERABLE API — Direct live connection to Main Dashboard data
    // Single Source of Truth: reads db.json and executes calc.js directly
    // Does NOT require Bearer auth (client deliverable page)
    // Strictly read-only, sanitizes sensitive internal fields
    // ================================================================
    if (pathname === '/api/public/client-data' && req.method === 'GET') {
      const db = loadDB();
      const allMonthKeys = Object.keys(db.months || {}).sort();

      // Dynamic calendar previous month helper (correctly handles Dec of prior year for Jan)
      function getCalendarPrevMonth(mKey) {
        if (!mKey || typeof mKey !== 'string') return null;
        const [yStr, mStr] = mKey.split('-');
        let y = parseInt(yStr, 10);
        let m = parseInt(mStr, 10);
        if (isNaN(y) || isNaN(m)) return null;
        if (m === 1) {
          y -= 1;
          m = 12;
        } else {
          m -= 1;
        }
        return `${y}-${String(m).padStart(2, '0')}`;
      }

      // Check for share token
      const token = (parsed.query.token || '').trim();
      let share = null;
      if (token) {
        share = resolveShareToken(token);
      }

      // Determine requested month, default to share month, latest month with data or 2026-03
      let month = parsed.query.month;
      if (share && share.month && (!month || month === 'auto')) {
        month = share.month;
      } else if (!month || !isValidMonth(month)) {
        month = allMonthKeys.slice().reverse().find(m => {
          const raw = db.months[m]?.metrics || {};
          return Object.values(raw).some(e => e && (e.computed !== null || e.inputs));
        }) || allMonthKeys[allMonthKeys.length - 1] || '2026-03';
      }

      const year = month.split('-')[0];
      const prevKey = prevMonthKey(db, month);

      // Dynamically discover all years from db.months + requested year (NO ARBITRARY LIMITS)
      const yearsSet = new Set();
      allMonthKeys.forEach(k => {
        const y = parseInt(k.split('-')[0], 10);
        if (y && !isNaN(y)) yearsSet.add(y);
      });
      const reqYearInt = parseInt(year, 10);
      if (reqYearInt && !isNaN(reqYearInt)) yearsSet.add(reqYearInt);
      const availableYears = Array.from(yearsSet).sort((a, b) => a - b);

      // Generate all 12 calendar months for the selected year
      const yearMonths = [];
      for (let i = 1; i <= 12; i++) {
        yearMonths.push(`${year}-${String(i).padStart(2, '0')}`);
      }

      // Pre-calculate all months in database + selected year's calendar months for trends and sparklines
      const computedAll = {};
      const allMonthsSummary = {};
      const weights = loadWeights();

      let lastComputed = null;
      const combinedMonthKeys = Array.from(new Set([...allMonthKeys, ...yearMonths])).sort();
      combinedMonthKeys.forEach(mKey => {
        const mObj = db.months[mKey];
        const comp = mObj ? computeMonth(mObj.metrics || {}, lastComputed) : computeMonth({}, null);
        computedAll[mKey] = comp;
        if (mObj) lastComputed = comp;

        const ov = mObj ? computeOverallRAG(comp, weights) : null;
        let mGreen = 0, mAmber = 0, mRed = 0, mScored = 0;
        Object.values(comp).forEach(m => {
          if (m && m.rag) {
            mScored++;
            if (m.rag === 'green') mGreen++;
            else if (m.rag === 'amber') mAmber++;
            else if (m.rag === 'red') mRed++;
          }
        });
        allMonthsSummary[mKey] = {
          rag: ov ? ov.rag : null,
          weightedScore: ov ? ov.weightedScore : null,
          healthScore: ov ? ov.healthScore : null,
          vetoBreaches: (ov && ov.vetoBreaches) || [],
          scoredCount: mScored,
          greenCount: mGreen,
          amberCount: mAmber,
          redCount: mRed,
          metrics: {},
        };
        Object.keys(comp).forEach(metricId => {
          allMonthsSummary[mKey].metrics[metricId] = {
            computed: comp[metricId].computed,
            rag: comp[metricId].rag,
            inputs: comp[metricId].inputs || {},
          };
        });
      });

      // Target month data (cleanly handles empty/missing month without fake data)
      const currentComputed = db.months[month]
        ? (computedAll[month] || computeMonth((db.months[month] && db.months[month].metrics) || {}, null))
        : computeMonth({}, null);

      const prevComputed = prevKey && db.months[prevKey]
        ? (computedAll[prevKey] || computeMonth((db.months[prevKey] && db.months[prevKey].metrics) || {}, null))
        : null;

      const overall = computeOverallRAG(currentComputed, weights);

      // Sanitized current month metrics
      const sanitizedMetrics = {};
      Object.keys(currentComputed).forEach(mId => {
        const item = currentComputed[mId];
        sanitizedMetrics[mId] = {
          computed: item.computed,
          rag: item.rag,
          inputs: item.inputs || {},
        };
      });

      // Sanitized prev month metrics
      const sanitizedPrev = {};
      if (prevComputed) {
        Object.keys(prevComputed).forEach(mId => {
          sanitizedPrev[mId] = {
            computed: prevComputed[mId].computed,
            rag: prevComputed[mId].rag,
          };
        });
      }

      // Compute YTD up to the selected month
      const scopedMonths = {};
      allMonthKeys.filter(k => k.startsWith(year + '-') && k <= month).forEach(k => {
        scopedMonths[k] = db.months[k];
      });
      const ytd = computeYTD(scopedMonths, year);

      // Narrative for current month
      const narrative = (db.months[month] && db.months[month].narrative) || {};

      // Calculate RAG counts
      let greenCount = 0, amberCount = 0, redCount = 0, scoredCount = 0;
      Object.values(currentComputed).forEach(m => {
        if (m && m.rag) {
          scoredCount++;
          if (m.rag === 'green') greenCount++;
          else if (m.rag === 'amber') amberCount++;
          else if (m.rag === 'red') redCount++;
        }
      });

      return sendJSON(res, 200, {
        success: true,
        clientName: (share && share.clientName) ? share.clientName : 'Brysa',
        share: share ? {
          clientName: share.clientName,
          month: share.month,
          expiresAt: share.expiresAt,
          id: share.id
        } : null,
        month,
        year,
        availableYears,
        yearMonths,
        availableMonths: allMonthKeys,
        prevMonth: prevKey,
        sections: SECTIONS,
        metrics: METRICS,
        monthData: sanitizedMetrics,
        prevData: sanitizedPrev,
        overall: {
          rag: overall ? overall.rag : null,
          vetoBreaches: (overall && overall.vetoBreaches) || [],
          weightedScore: overall ? overall.weightedScore : null,
          healthScore: overall ? overall.healthScore : null,
          scoredCount,
          greenCount,
          amberCount,
          redCount,
          passCount: greenCount,
        },
        ytd: ytd ? (ytd.metrics || {}) : {},
        narrative: {
          topRisks: narrative.topRisks || '',
          improvements: narrative.improvements || '',
          plannedActions: narrative.plannedActions || '',
        },
        activeMonth: currentActiveMonth,
        dataVersion: dataChangeVersion,
        allMonthsData: allMonthsSummary,
      });
    }

    // ---- WEIGHTS API ----
    if (pathname === '/api/weights' && req.method === 'GET') {
      const session = requireAuth(req, res);
      if (!session) return;
      return sendJSON(res, 200, {
        weights: loadWeights(),
        defaults: DEFAULT_WEIGHTS,
      });
    }

    if (pathname === '/api/weights' && req.method === 'POST') {
      const session = requireAuth(req, res);
      if (!session) return;
      if (session.role !== 'superadmin' && session.role !== 'admin') {
        return sendJSON(res, 403, { error: 'Forbidden: Admin or Super Admin role required to update weights' });
      }
      const body = await readBody(req);
      const incoming = body.weights || {};
      const current = loadWeights();
      const updated = {};
      Object.keys(DEFAULT_WEIGHTS).forEach(id => {
        const val = Number(incoming[id] !== undefined ? incoming[id] : current[id]);
        updated[id] = Number.isFinite(val) && val >= 0 ? val : DEFAULT_WEIGHTS[id];
      });
      saveWeights(updated);
      recordAudit(session.username, 'weights:update', 'weights.json', 'SUCCESS', { updated });
      return sendJSON(res, 200, { success: true, weights: updated });
    }

    // ---- static frontend files ----
    if (req.method === 'GET' || req.method === 'HEAD') {
      return serveStatic(req, res, pathname);
    }

    sendJSON(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: 'Server error', detail: String(err && err.message || err) });
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('');
    console.error(`  [ERROR] Port ${PORT} is already in use by another process.`);
    console.error(`  Please close existing instances or run start.bat to automatically free port ${PORT}.`);
    console.error('');
    process.exit(1);
  } else {
    console.error('  [SERVER ERROR]', err);
  }
});

server.listen(PORT, () => {
  console.log('');
  console.log('  MSS KPI Dashboard backend running with RBAC');
  console.log('  --------------------------------------------');
  console.log('  Open:  http://localhost:' + PORT);
  console.log('  Super Admin : Jeeva  / 0123');
  console.log('  Admin       : admin  / admin123');
  console.log('  Editor      : editor / editor123');
  console.log('  Viewer      : viewer / viewer123');
  console.log('');
});
