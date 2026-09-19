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

// ---- Hardcoded credentials, as requested ----
const USERNAME = 'Jeeva';
const PASSWORD = '0123';

// ---- In-memory session tokens (reset on server restart) ----
const sessions = new Set();

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

function requireAuth(req, res) {
  const token = getToken(req);
  if (!token || !sessions.has(token)) {
    sendJSON(res, 401, { error: 'Not authenticated' });
    return false;
  }
  return true;
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
      if (body.username === USERNAME && body.password === PASSWORD) {
        const token = crypto.randomBytes(24).toString('hex');
        sessions.add(token);
        return sendJSON(res, 200, { token, username: USERNAME });
      }
      return sendJSON(res, 401, { error: 'Invalid username or password' });
    }

    if (pathname === '/api/logout' && req.method === 'POST') {
      const token = getToken(req);
      if (token) sessions.delete(token);
      return sendJSON(res, 200, { ok: true });
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
      if (!requireAuth(req, res)) return;
      const body = await readBody(req);
      const { month, metricId, inputs, action } = body;
      if (!month || !metricId) return sendJSON(res, 400, { error: 'month and metricId are required' });
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
        // Record clear action into history
        if (targetMetric.inputs && Object.keys(targetMetric.inputs).length > 0) {
          targetMetric.history.unshift({
            timestamp: new Date().toISOString(),
            action: 'clear',
            previousInputs: Object.assign({}, targetMetric.inputs),
            previousComputed: targetMetric.computed,
            previousRAG: targetMetric.rag,
          });
        }
        targetMetric.inputs = {};
      } else {
        // Normal save or update: save old data to history before overwriting
        const oldInputs = targetMetric.inputs || {};
        const hasOld = Object.keys(oldInputs).length > 0 && Object.values(oldInputs).some(v => v !== null && v !== undefined && v !== '');
        if (hasOld) {
          targetMetric.history.unshift({
            timestamp: new Date().toISOString(),
            action: 'update',
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
      if (!requireAuth(req, res)) return;
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
      };
      saveDB(db);
      return sendJSON(res, 200, { ok: true, narrative: db.months[month].narrative });
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
  console.log('  MSS KPI Dashboard backend running');
  console.log('  ------------------------------------');
  console.log('  Open:  http://localhost:' + PORT);
  console.log('  Login: username = Jeeva   password = 0123');
  console.log('');
});
