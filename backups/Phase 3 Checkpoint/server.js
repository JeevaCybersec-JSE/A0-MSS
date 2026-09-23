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
const { computeMonth, computeOverallRAG } = require('./lib/calc');

const PORT = process.env.PORT || 4321;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

// ---- Storage Paths ----
const USERS_PATH = path.join(__dirname, 'data', 'users.json');
const AUDIT_PATH = path.join(__dirname, 'data', 'audit.json');

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
function saveDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
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

// ---- Helpers ----
function sendJSON(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
};

function serveStatic(req, res, pathname) {
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(PUBLIC_DIR, filePath);
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    });
    return res.end();
  }

  try {
    // ---- AUTH ----
    if (pathname === '/api/login' && req.method === 'POST') {
      const body = await readBody(req);
      const username = (body.username || '').trim();
      const password = String(body.password || '');
      const usersDB = loadUsers();
      const user = usersDB.users.find(u => u.username.toLowerCase() === username.toLowerCase());

      if (!user || !verifyPassword(password, user.hash, user.salt)) {
        return sendJSON(res, 401, { error: 'Invalid username or password' });
      }

      if (user.status === 'disabled') {
        return sendJSON(res, 401, { error: 'Account is disabled. Please contact an administrator.' });
      }

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
        return sendJSON(res, 200, { month, metrics: {}, narrative: {}, overallRAG: null, prevMonth: prevKey, prevData, history: {} });
      }
      const metrics = recomputeMonth(db, month); // ensure fresh (handles first-load-after-earlier-edit case)
      saveDB(db);

      const history = {};
      Object.keys(db.months[month].metrics || {}).forEach(mId => {
        if (db.months[month].metrics[mId].history) {
          history[mId] = db.months[month].metrics[mId].history;
        }
      });

      return sendJSON(res, 200, {
        month,
        metrics,
        narrative: db.months[month].narrative || {},
        overallRAG: computeOverallRAG(metrics),
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
        return sendJSON(res, 200, {
          month,
          metrics,
          overallRAG: computeOverallRAG(metrics),
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
        return sendJSON(res, 200, {
          month,
          metrics,
          overallRAG: computeOverallRAG(metrics),
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

      return sendJSON(res, 200, {
        month,
        metrics,
        overallRAG: computeOverallRAG(metrics),
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
      const displayName = (body.displayName || username).trim();
      const role = body.role || 'viewer';

      if (!username || !password) {
        return sendJSON(res, 400, { error: 'Username and password are required' });
      }
      if (!ROLES[role]) {
        return sendJSON(res, 400, { error: 'Invalid role specified' });
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

    // Audit log viewer
    if (pathname === '/api/audit' && req.method === 'GET') {
      if (!requirePermission(req, res, 'users:manage')) return;
      const auditDB = loadAudit();
      return sendJSON(res, 200, { events: auditDB.events || [] });
    }

    // ---- LIST months with overall RAG and metric breakdowns (for trends / history) ----
    if (pathname === '/api/months' && req.method === 'GET') {
      if (!requireAuth(req, res)) return;
      const db = loadDB();
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
        return {
          month: k,
          overallRAG: computeOverallRAG(monthMetrics),
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
