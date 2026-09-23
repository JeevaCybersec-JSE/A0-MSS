// ============================================================
// MSS KPI Dashboard ”” Frontend
// Security Operations Console & Executive Reporting Engine
// ============================================================

let API = (
  window.location.protocol === 'file:' ||
  (window.location.port !== '4321' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || !window.location.port))
) ? 'http://localhost:4321' : '';

async function fetchWithFallback(urlPath, options) {
  const fullUrl = API + urlPath;
  try {
    return await fetch(fullUrl, options);
  } catch (err) {
    if (API === 'http://localhost:4321') {
      API = 'http://127.0.0.1:4321';
      return await fetch(API + urlPath, options);
    } else if (API === 'http://127.0.0.1:4321') {
      API = 'http://localhost:4321';
      return await fetch(API + urlPath, options);
    }
    throw err;
  }
}

// ---------- Icons (inline SVG, 20x20, stroke-based) ----------
const ICONS = {
  monitor: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3.5" width="15" height="10" rx="1.2"/><path d="M7 17h6M10 13.5V17" stroke-linecap="round"/></svg>',
  'shield-check': '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2.3l6 2.2v4.4c0 4-2.6 6.9-6 8.1-3.4-1.2-6-4.1-6-8.1V4.5z" stroke-linejoin="round"/><path d="M7.3 10l1.9 1.9 3.6-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2.3l6 2.2v4.4c0 4-2.6 6.9-6 8.1-3.4-1.2-6-4.1-6-8.1V4.5z" stroke-linejoin="round"/></svg>',
  radar: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="3.2"/><path d="M10 10L15.5 5.2" stroke-linecap="round"/></svg>',
  bug: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6.5" y="7" width="7" height="8.5" rx="3.3"/><path d="M10 7V4.5M7.2 8.5L4.5 6.5M12.8 8.5l2.7-2M4.3 11h2.2M13.5 11h2.2M7.2 14.5L4.7 16.5M12.8 14.5l2.5 2" stroke-linecap="round"/></svg>',
  key: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6.2" cy="13.8" r="3.2"/><path d="M8.4 11.6L15.5 4.5M13 7l2 2M15 5l2 2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="4.5" width="15" height="11" rx="1.3"/><path d="M3 5.5l7 5.5 7-5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  headset: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11v-1a6 6 0 0112 0v1" stroke-linecap="round"/><rect x="2.5" y="11" width="3.2" height="4.5" rx="1"/><rect x="14.3" y="11" width="3.2" height="4.5" rx="1"/><path d="M15.5 15.5v.5a2 2 0 01-2 2h-2.3" stroke-linecap="round"/></svg>',
  clipboard: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4.5" y="3.5" width="11" height="14" rx="1.3"/><rect x="7.3" y="2" width="5.4" height="3" rx="0.8"/><path d="M7 9.5h6M7 12.5h6M7 15.5h3.5" stroke-linecap="round"/></svg>',
  grid: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="2.5" width="6" height="6" rx="1"/><rect x="11.5" y="2.5" width="6" height="6" rx="1"/><rect x="2.5" y="11.5" width="6" height="6" rx="1"/><rect x="11.5" y="11.5" width="6" height="6" rx="1"/></svg>',
  trend: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 15l4.5-5 3 3L17 5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 5H17v4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  file: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5.5 2.5h6l3 3v12h-9z" stroke-linejoin="round"/><path d="M7.5 10h5M7.5 13h5M7.5 16h3" stroke-linecap="round"/></svg>',
  logout: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 17H4.5a1 1 0 01-1-1V4a1 1 0 011-1H8" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 13.5l4-3.5-4-3.5M17 10H8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  calendar: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="14" height="13" rx="1.3"/><path d="M3 8h14M7 2.3v3M13 2.3v3" stroke-linecap="round"/></svg>',
  history: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 10a7.5 7.5 0 101.5-4.5M2.5 4.5v4h4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6v4.5l3 1.8" stroke-linecap="round"/></svg>',
  reset: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4l12 12M16 4L4 16" stroke-linecap="round"/></svg>'
};

// ---------- App state ----------
const state = {
  token: localStorage.getItem('mss_token') || null,
  username: localStorage.getItem('mss_username') || '',
  role: localStorage.getItem('mss_role') || 'viewer',
  roleLabel: localStorage.getItem('mss_role_label') || 'Client / Viewer',
  permissions: (() => {
    try { return JSON.parse(localStorage.getItem('mss_permissions') || '[]'); }
    catch (e) { return []; }
  })(),
  sections: [],
  metrics: [],
  month: currentMonthStr(),
  monthData: { metrics: {}, narrative: {}, overallRAG: null, prevMonth: null, prevData: {}, history: {} },
  monthsHistory: [],
  view: 'overview',
  activeHistoryCard: null,
};

function hasPermission(perm) {
  return Array.isArray(state.permissions) && state.permissions.includes(perm);
}

function currentMonthStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

// ---------- API helper ----------
// ─── Phase 7: IST Timestamp Formatter ──────────────────────────────────────
// Formats any ISO/UTC timestamp as "DD-MM-YYYY HH:mm:ss IST" (Asia/Kolkata).
function formatIST(isoString) {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    const fmt = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
    const parts = {};
    fmt.formatToParts(d).forEach(p => { parts[p.type] = p.value; });
    return `${parts.day}-${parts.month}-${parts.year} ${parts.hour}:${parts.minute}:${parts.second} IST`;
  } catch (e) {
    return isoString;
  }
}
// ────────────────────────────────────────────────────────────────────────────

async function api(path, opts = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (state.token) headers['Authorization'] = 'Bearer ' + state.token;
  let res;
  try {
    res = await fetchWithFallback(path, Object.assign({}, opts, { headers }));
  } catch (err) {
    throw new Error('Server not reachable. Please make sure the backend is running at http://localhost:4321');
  }
  if (res.status === 401) { doLogout(true); throw new Error('Not authenticated'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ---------- Boot ----------
document.getElementById('login-form').addEventListener('submit', onLoginSubmit);
document.getElementById('logout-btn').addEventListener('click', () => doLogout(false));
document.getElementById('topbar-logout-btn').addEventListener('click', () => doLogout(false));
document.getElementById('month-input').addEventListener('change', onMonthChange);
document.getElementById('prev-month-btn').addEventListener('click', () => shiftMonth(-1));
document.getElementById('next-month-btn').addEventListener('click', () => shiftMonth(1));
document.getElementById('export-csv-btn')?.addEventListener('click', exportMonthCSV);

document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
  btn.addEventListener('click', () => setView(btn.dataset.view));
});

async function boot() {
  document.getElementById('month-input').value = state.month;
  initLoginCanvas();
  initCursorFollower();
  initLoginTilt();
  initSidebarToggle();
  initSidebarBrandAtom();
  initLoginControls();
  initShareModal();

  if (state.token) {
    try { await initApp(); return; } catch (e) { /* fall through to login */ }
  }
  showLogin();
}

// ---------- Sidebar Toggle ("A0" Brand Button) ----------
window.toggleSidebar = function(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const app = document.getElementById('app');
  if (app) {
    app.classList.toggle('sidebar-active');
  }
};

window.closeSidebar = function(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const app = document.getElementById('app');
  if (app) {
    app.classList.remove('sidebar-active');
  }
};

function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebar-toggle-a0');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const overlay = document.getElementById('sidebar-overlay');
  const app = document.getElementById('app');

  if (toggleBtn) {
    toggleBtn.onclick = window.toggleSidebar;
  }

  if (closeBtn) {
    closeBtn.onclick = window.closeSidebar;
  }

  if (overlay) {
    overlay.onclick = window.closeSidebar;
  }

  // Close sidebar on nav-item click
  document.addEventListener('click', (e) => {
    const isNavClick = e.target.closest('.nav-item');
    if (isNavClick && app) {
      app.classList.remove('sidebar-active');
    }
  });

  // ESC key dismisses sidebar drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && app && app.classList.contains('sidebar-active')) {
      app.classList.remove('sidebar-active');
    }
  });
}

// ---------- Sidebar Brand A0 Atom Parallax Interaction ----------
function initSidebarBrandAtom() {
  const container = document.getElementById('sidebar-brand-a0');
  const stage = document.getElementById('sidebar-brand-atom-stage');
  if (!container || !stage) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    // Subtle 1.5px parallax on stage orbits; text and container remain stationary
    stage.style.transform = `translate3d(${dx * 1.5}px, ${dy * 1.5}px, 0) scale(1.02)`;
  });

  container.addEventListener('mouseleave', () => {
    stage.style.transform = 'translate3d(0, 0, 0) scale(1)';
  });
}

// ---------- Login Page Controls & Enhancements ----------
function initLoginControls() {
  const togglePassBtn = document.getElementById('toggle-password-btn');
  const passInput = document.getElementById('login-password');
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass
        ? `<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M3 3l14 14M10 4C5 4 1.7 8.3 1.7 10c.8 1 2.3 3 5 4.5M10 16c5 0 8.3-4.3 8.3-6-.7-.9-2-2.6-4.3-4.1" stroke-linecap="round"/>
            <circle cx="10" cy="10" r="2.5"/>
          </svg>`
        : `<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M10 4C5 4 1.7 8.3 1.7 10s3.3 6 8.3 6 8.3-4.3 8.3-6-3.3-6-8.3-6z" />
            <circle cx="10" cy="10" r="2.5" />
          </svg>`;
    });
  }

  const quickLoginBtn = document.getElementById('quick-demo-login');
  if (quickLoginBtn) {
    quickLoginBtn.addEventListener('click', () => {
      const userInp = document.getElementById('login-username');
      const passInp = document.getElementById('login-password');
      if (userInp) userInp.value = 'Jeeva';
      if (passInp) passInp.value = '0123';
      showToast('Operator credentials autofilled (Jeeva)', 'green');
      const submitBtn = document.getElementById('login-btn-submit');
      if (submitBtn) {
        submitBtn.focus();
        submitBtn.classList.add('pulse-glow');
        setTimeout(() => submitBtn.classList.remove('pulse-glow'), 1200);
      }
    });
  }
}

function showLogin() {
  const wtScreen = document.getElementById('welcome-transition');
  if (wtScreen) {
    wtScreen.hidden = true;
    wtScreen.setAttribute('aria-hidden', 'true');
    wtScreen.classList.remove('wt-visible', 'wt-fade-out');
  }
  const loginScreen = document.getElementById('login-screen');
  const app = document.getElementById('app');
  loginScreen.hidden = false;
  loginScreen.style.display = 'flex';
  app.hidden = true;
  app.style.display = 'none';

  const userInp = document.getElementById('login-username');
  const passInp = document.getElementById('login-password');
  if (userInp) userInp.value = '';
  if (passInp) {
    passInp.value = '';
    passInp.type = 'password'; // Phase7: always reset to hidden on re-show
    const toggleBtn = document.getElementById('toggle-password-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = `<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M10 4C5 4 1.7 8.3 1.7 10s3.3 6 8.3 6 8.3-4.3 8.3-6-3.3-6-8.3-6z" />
          <circle cx="10" cy="10" r="2.5" />
        </svg>`;
    }
  }
  const errBox = document.getElementById('login-error');
  if (errBox) { errBox.textContent = ''; errBox.hidden = true; }

  startLoginCanvasAnimation();
}

async function onLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error');
  errBox.hidden = true;
  try {
    const res = await fetchWithFallback('/api/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid credentials');
    state.token = data.token;
    state.username = data.username;
    state.role = data.role || 'viewer';
    state.roleLabel = data.roleLabel || 'Client / Viewer';
    state.permissions = data.permissions || [];
    localStorage.setItem('mss_token', state.token);
    localStorage.setItem('mss_username', state.username);
    localStorage.setItem('mss_role', state.role);
    localStorage.setItem('mss_role_label', state.roleLabel);
    localStorage.setItem('mss_permissions', JSON.stringify(state.permissions));
    stopLoginCanvasAnimation();
    // Show premium welcome transition, then reveal dashboard
    await showWelcomeTransition(state.username, async () => {
      await initApp();
      showToast('Signed in as ' + state.username + ' (' + state.roleLabel + ')', 'green');
    });
  } catch (err) {
    if (err.name === 'TypeError' || (err.message && err.message.toLowerCase().includes('fetch'))) {
      errBox.textContent = 'Server-க்கு connect பண்ண முடியல (Server not reachable). start.bat run பண்ணி http://localhost:4321-ல் open பண்ணவும்.';
    } else {
      errBox.textContent = err.message || 'Could not sign in';
    }
    errBox.hidden = false;
  }
}

function doLogout(silent) {
  if (!silent && state.token) api('/api/logout', { method: 'POST' }).catch(() => {});
  state.token = null;
  state.role = 'viewer';
  state.roleLabel = 'Client / Viewer';
  state.permissions = [];
  localStorage.removeItem('mss_token');
  localStorage.removeItem('mss_username');
  localStorage.removeItem('mss_role');
  localStorage.removeItem('mss_role_label');
  localStorage.removeItem('mss_permissions');

  const userInp = document.getElementById('login-username');
  const passInp = document.getElementById('login-password');
  if (userInp) userInp.value = '';
  if (passInp) passInp.value = '';

  showToast('Signed out successfully', 'green');
  showLogin();
}

function updateUserBadge() {
  const nameEl = document.getElementById('user-name');
  if (nameEl) nameEl.textContent = state.username || 'Operator';
  const badgeEl = document.getElementById('user-role-badge');
  if (badgeEl) {
    badgeEl.textContent = state.roleLabel || state.role || 'Viewer';
    badgeEl.className = 'user-role-badge ' + (state.role || 'viewer');
  }
  const adminNav = document.getElementById('nav-admin');
  if (adminNav) {
    adminNav.style.display = hasPermission('users:manage') ? 'block' : 'none';
  }
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.style.display = (state.role === 'superadmin' || state.role === 'admin') ? 'inline-flex' : 'none';
  }
}

async function initApp() {
  try {
    const me = await api('/api/me');
    state.username = me.username;
    state.role = me.role;
    state.roleLabel = me.roleLabel;
    state.permissions = me.permissions || [];
    localStorage.setItem('mss_username', state.username);
    localStorage.setItem('mss_role', state.role);
    localStorage.setItem('mss_role_label', state.roleLabel);
    localStorage.setItem('mss_permissions', JSON.stringify(state.permissions));
  } catch (e) { /* use cached session if offline/error */ }

  const meta = await api('/api/metrics');
  state.sections = meta.sections;
  state.metrics = meta.metrics;

  const loginScreen = document.getElementById('login-screen');
  const app = document.getElementById('app');
  loginScreen.hidden = true;
  loginScreen.style.display = 'none';
  app.hidden = false;
  app.style.display = 'flex';
  
  updateUserBadge();

  buildSectionNav();
  await loadMonthsHistory();
  await loadMonthData();
  setView('overview');
}

function buildSectionNav() {
  const nav = document.getElementById('nav-sections');
  nav.querySelectorAll('.nav-item').forEach(n => n.remove());
  state.sections.forEach(sec => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.dataset.view = 'section:' + sec.id;
    btn.innerHTML = `<span class="nav-icon">${ICONS[sec.icon] || ICONS.grid}</span><span>${sec.name}</span><span class="nav-item-dot" id="dot-${sec.id}"></span>`;
    btn.addEventListener('click', () => setView('section:' + sec.id));
    nav.appendChild(btn);
  });
}

async function loadMonthsHistory() {
  const data = await api('/api/months');
  state.monthsHistory = data.months || [];
}

async function loadMonthData() {
  const data = await api('/api/data?month=' + encodeURIComponent(state.month));
  state.monthData = data;
  updateTopbarRAG();
  updateSectionDots();
}

async function onMonthChange(e) {
  state.month = e.target.value || currentMonthStr();
  await loadMonthData();
  renderView();
}

async function shiftMonth(delta) {
  const parts = state.month.split('-');
  let y = parseInt(parts[0], 10);
  let m = parseInt(parts[1], 10) + delta;
  if (m < 1) { m = 12; y--; }
  else if (m > 12) { m = 1; y++; }
  state.month = `${y}-${String(m).padStart(2, '0')}`;
  document.getElementById('month-input').value = state.month;
  await loadMonthData();
  renderView();
}

function updateTopbarRAG() {
  const pill = document.getElementById('overall-pill');
  if (!pill) return;
  const text = document.getElementById('overall-pill-text');
  const rag = state.monthData.overallRAG;
  pill.className = 'rag-pill rag-' + (rag || 'none');
  if (text) text.textContent = rag ? rag.toUpperCase() : 'No data';
}

function exportMonthCSV() {
  const month = state.month;
  const rows = [];

  // Title & Metadata
  rows.push(['MSS KPI Dashboard - Monthly Performance Report']);
  rows.push(['Reporting Period', month]);
  rows.push(['Generated By', state.username || 'Operator']);
  rows.push(['Generated At', new Date().toLocaleString()]);
  rows.push(['Overall Month Status', (state.monthData.overallRAG || 'NO DATA').toUpperCase()]);
  rows.push([]);

  // Column Headers
  rows.push([
    'Section',
    'Metric ID',
    'Metric Label',
    'Direction',
    'Target / Benchmark',
    'Computed Value',
    'Unit',
    'Status (RAG)',
    'Inputs / Scope Details',
    'Description'
  ]);

  state.metrics.forEach(metric => {
    const sec = state.sections.find(s => s.id === metric.section);
    const secName = sec ? sec.name : metric.section;
    const entry = (state.monthData && state.monthData.metrics && state.monthData.metrics[metric.id]) || {};
    const inputs = entry.inputs || {};

    let targetStr = '';
    if (metric.direction === 'trend') targetStr = 'Trend (No fixed target)';
    else if (metric.target !== null && metric.target !== undefined) targetStr = (metric.direction === 'higher' ? '>= ' : '<= ') + metric.target + (metric.unit || '');
    else if (metric.ragRule === 'binary0') targetStr = '0' + (metric.amberNotRed ? ' (Amber flag if >0)' : ' (Critical red if >0)');
    else if (metric.ragRule === 'prevMonth') targetStr = '<= Previous Month';

    const valStr = entry.computed !== null && entry.computed !== undefined ? String(entry.computed) : '';
    const ragStr = metric.direction === 'trend' ? 'TREND' : (entry.rag ? entry.rag.toUpperCase() : 'NO DATA');

    // Details / Scope description
    let detailStr = '';
    if (metric.mode === 'dual') {
      const choice = inputs.choice || (inputs.b !== null && inputs.b !== undefined && Number(inputs.b) > 0 ? 'mdm_only' : 'vpn_only');
      const vpnVal = inputs.a !== undefined && inputs.a !== null ? inputs.a : (inputs.value !== undefined ? inputs.value : '');
      const mdmVal = inputs.b !== undefined && inputs.b !== null ? inputs.b : '';
      if (choice === 'mdm_only') {
        detailStr = `MDM Only Scope (MDM: ${mdmVal})`;
      } else {
        detailStr = `VPN Only Scope (VPN: ${vpnVal})`;
      }
    } else if (metric.mode === 'ratio') {
      detailStr = `${metric.numLabel || 'Num'}: ${inputs.num ?? ''} / ${metric.denLabel || 'Den'}: ${inputs.den ?? ''}`;
    } else if (metric.mode === 'avg') {
      detailStr = `${metric.totalLabel || 'Total'}: ${inputs.total ?? ''} / ${metric.countLabel || 'Count'}: ${inputs.count ?? ''}`;
    } else if (metric.mode === 'derived') {
      detailStr = 'Auto-derived formula';
    } else {
      detailStr = inputs.value !== undefined && inputs.value !== null ? `Value: ${inputs.value}` : '';
    }

    rows.push([
      secName,
      metric.id,
      metric.label,
      metric.direction,
      targetStr,
      valStr,
      metric.unit || '',
      ragStr,
      detailStr,
      metric.desc || ''
    ]);
  });

  // Append Executive Summary notes if recorded
  const nar = state.monthData.narrative || {};
  if ((nar.topRisks && nar.topRisks.trim()) || (nar.improvements && nar.improvements.trim()) || (nar.plannedActions && nar.plannedActions.trim())) {
    rows.push([]);
    rows.push(['=== Executive Summary Notes ===']);
    if (nar.topRisks && nar.topRisks.trim()) {
      rows.push(['Top Client Risks', '', '', '', '', '', '', '', '', nar.topRisks.trim()]);
    }
    if (nar.improvements && nar.improvements.trim()) {
      rows.push(['Delivered Improvements', '', '', '', '', '', '', '', '', nar.improvements.trim()]);
    }
    if (nar.plannedActions && nar.plannedActions.trim()) {
      rows.push(['Planned Next Actions', '', '', '', '', '', '', '', '', nar.plannedActions.trim()]);
    }
  }

  // Format with RFC 4180 CSV specifications
  const csvContent = rows.map(r => 
    r.map(field => {
      const cell = field === null || field === undefined ? '' : String(field);
      if (cell.includes(',') || cell.includes('"') || cell.includes('\n') || cell.includes('\r')) {
        return '"' + cell.replace(/"/g, '""') + '"';
      }
      return cell;
    }).join(',')
  ).join('\r\n');

  // UTF-8 BOM for Microsoft Excel compatibility
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `MSS_KPI_Report_${month}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);

  showToast(`Exported ${month} KPI report to CSV`, 'green');
}

// ============================================================
// Phase 7: Download Overall Status Report
// Opens a professional, printable HTML report in a new window.
// User can Save as PDF from the browser's Print dialog.
// ============================================================
function downloadStatusReport() {
  const month = state.month;
  const rag = (state.monthData.overallRAG || 'none').toUpperCase();
  const nar = state.monthData.narrative || {};
  const nowIST = formatIST(new Date().toISOString());

  let green = 0, amber = 0, red = 0, trend = 0;
  state.metrics.forEach(m => {
    const entry = state.monthData.metrics[m.id];
    if (!entry) { if (m.direction === 'trend') trend++; return; }
    if (entry.rag === 'green') green++;
    else if (entry.rag === 'amber') amber++;
    else if (entry.rag === 'red') red++;
    else trend++;
  });

  const ragColor = rag === 'GREEN' ? '#16a34a' : rag === 'AMBER' ? '#d97706' : rag === 'RED' ? '#dc2626' : '#64748b';
  const ragBg   = rag === 'GREEN' ? '#f0fdf4' : rag === 'AMBER' ? '#fffbeb' : rag === 'RED' ? '#fef2f2' : '#f8fafc';

  let sectionsHtml = '';
  state.sections.forEach(sec => {
    const secMetrics = state.metrics.filter(m => m.section === sec.id);
    if (!secMetrics.length) return;
    let rows = '';
    secMetrics.forEach(m => {
      const entry = (state.monthData.metrics && state.monthData.metrics[m.id]) || {};
      const ragStr = m.direction === 'trend' ? 'TREND' : (entry.rag || 'NO DATA').toUpperCase();
      const val = entry.computed !== null && entry.computed !== undefined
        ? String(entry.computed) + (m.unit || '') : '—';
      let tgt = '—';
      if (m.direction === 'trend') tgt = 'Trend metric';
      else if (m.target !== null && m.target !== undefined)
        tgt = (m.direction === 'higher' ? '≥ ' : '≤ ') + m.target + (m.unit || '');
      else if (m.ragRule === 'binary0') tgt = '0';
      else if (m.ragRule === 'prevMonth') tgt = '≤ Prev. Month';
      const rc = ragStr==='GREEN'?'#15803d':ragStr==='AMBER'?'#b45309':ragStr==='RED'?'#b91c1c':'#475569';
      const rb = ragStr==='GREEN'?'#dcfce7':ragStr==='AMBER'?'#fef9c3':ragStr==='RED'?'#fee2e2':'#f1f5f9';
      rows += '<tr>'
        + '<td>' + escapeHTML(m.label) + '</td>'
        + '<td>' + escapeHTML(m.desc || '—') + '</td>'
        + '<td style="text-align:center">' + escapeHTML(tgt) + '</td>'
        + '<td style="text-align:center;font-weight:700">' + escapeHTML(val) + '</td>'
        + '<td style="text-align:center"><span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;background:' + rb + ';color:' + rc + '">' + ragStr + '</span></td>'
        + '</tr>';
    });
    sectionsHtml += '<h3 style="font-size:12px;font-weight:700;margin:18px 0 5px;padding-bottom:3px;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:.5px">' + escapeHTML(sec.name) + '</h3>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px">'
      + '<thead><tr style="background:#f8fafc">'
      + '<th style="padding:5px 8px;text-align:left;border-bottom:1px solid #e2e8f0;color:#475569">Metric</th>'
      + '<th style="padding:5px 8px;text-align:left;border-bottom:1px solid #e2e8f0;color:#475569">Description</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">Target</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">Value</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">Status</th>'
      + '</tr></thead>'
      + '<tbody>' + rows + '</tbody></table>';
  });

  let execHtml = '';
  if (nar.topRisks || nar.improvements || nar.plannedActions) {
    execHtml = '<div style="margin-top:24px"><h2 style="font-size:12px;font-weight:700;margin:0 0 10px;padding-bottom:4px;border-bottom:2px solid #e2e8f0;text-transform:uppercase">Executive Summary</h2>';
    if (nar.topRisks) execHtml += '<div style="margin-bottom:8px"><div style="font-size:10px;font-weight:700;color:#b91c1c;text-transform:uppercase;margin-bottom:2px">Top Risks</div><div style="font-size:12px;line-height:1.6">' + escapeHTML(nar.topRisks) + '</div></div>';
    if (nar.improvements) execHtml += '<div style="margin-bottom:8px"><div style="font-size:10px;font-weight:700;color:#15803d;text-transform:uppercase;margin-bottom:2px">Improvements</div><div style="font-size:12px;line-height:1.6">' + escapeHTML(nar.improvements) + '</div></div>';
    if (nar.plannedActions) execHtml += '<div style="margin-bottom:8px"><div style="font-size:10px;font-weight:700;color:#1d4ed8;text-transform:uppercase;margin-bottom:2px">Planned Actions</div><div style="font-size:12px;line-height:1.6">' + escapeHTML(nar.plannedActions) + '</div></div>';
    execHtml += '</div>';
  }

  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>MSS Status Report — ' + month + '</title>'
    + '<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Segoe UI",Arial,sans-serif;background:#fff;color:#0f172a;font-size:13px;padding:32px 36px;max-width:900px;margin:0 auto}'
    + 'table tbody tr td{padding:5px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top}'
    + 'table tbody tr:nth-child(even) td{background:#f8fafc}'
    + '@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.no-print{display:none!important}}'
    + '</style></head><body>'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid #0f172a">'
    + '<div><div style="font-size:20px;font-weight:800">A0 MSS Dashboard</div><div style="font-size:11px;color:#64748b;margin-top:2px">Security Operations Console — Client Status Report</div></div>'
    + '<div style="text-align:right"><div style="font-size:10px;color:#94a3b8">Reporting Period</div><div style="font-size:15px;font-weight:700">' + escapeHTML(month) + '</div><div style="font-size:10px;color:#94a3b8;margin-top:2px">Generated: ' + escapeHTML(nowIST) + '</div></div>'
    + '</div>'
    + '<div style="padding:14px 18px;border-radius:10px;background:' + ragBg + ';border:1.5px solid ' + ragColor + '44;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between">'
    + '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px">Overall Security Posture</div><div style="font-size:26px;font-weight:800;color:' + ragColor + '">' + rag + '</div><div style="font-size:10px;color:#64748b;margin-top:2px">Based on ' + (green+amber+red+trend) + ' tracked metrics</div></div>'
    + '<div style="display:flex;gap:16px;text-align:center">'
    + '<div><div style="font-size:20px;font-weight:800;color:#16a34a">' + green + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Green</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#d97706">' + amber + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Amber</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#dc2626">' + red + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Red</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#64748b">' + trend + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Trend</div></div>'
    + '</div></div>'
    + '<h2 style="font-size:12px;font-weight:700;margin:0 0 10px;padding-bottom:4px;border-bottom:2px solid #e2e8f0;text-transform:uppercase;letter-spacing:.5px">KPI Metrics Detail</h2>'
    + sectionsHtml
    + execHtml
    + '<div style="margin-top:24px;padding-top:10px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:10px;color:#94a3b8">'
    + '<div>A0 MSS Dashboard — Confidential — Authorized Personnel Only</div>'
    + '<div>Prepared by: ' + escapeHTML(state.username || 'Operator') + '</div>'
    + '</div>'
    + '<div class="no-print" style="margin-top:16px;text-align:center">'
    + '<button onclick="window.print()" style="padding:9px 26px;background:#1d4ed8;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer">Print / Save as PDF</button>'
    + '</div></body></html>';

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank', 'width=980,height=760,scrollbars=yes');
  if (!win) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MSS_Overall_Status_Report_' + month + '.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  setTimeout(() => URL.revokeObjectURL(url), 8000);
  showToast('Status report for ' + month + ' opened — use Print → Save as PDF', 'green');
}


function metricsBySection(sectionId) {
  return state.metrics.filter(m => m.section === sectionId);
}

function sectionWorstRAG(sectionId) {
  const ids = metricsBySection(sectionId).map(m => m.id);
  let worst = null;
  ids.forEach(id => {
    const entry = state.monthData.metrics[id];
    if (!entry || !entry.rag) return;
    if (entry.rag === 'red') worst = 'red';
    else if (entry.rag === 'amber' && worst !== 'red') worst = 'amber';
    else if (entry.rag === 'green' && !worst) worst = 'green';
  });
  return worst;
}

function updateSectionDots() {
  state.sections.forEach(sec => {
    const dot = document.getElementById('dot-' + sec.id);
    if (!dot) return;
    const rag = sectionWorstRAG(sec.id);
    dot.className = 'nav-item-dot' + (rag ? ' ' + rag : '');
    const label = rag === 'red' ? 'Critical (Red)' : (rag === 'amber' ? 'Warning (Amber)' : (rag === 'green' ? 'Healthy (Green)' : 'No active alerts'));
    dot.title = `Status: ${label}`;
    dot.setAttribute('aria-label', `${sec.name} status: ${label}`);
  });
}

// ---------- Navigation ----------
function setView(view) {
  state.view = view;
  state.activeHistoryCard = null;
  document.querySelectorAll('.nav-item[data-view]').forEach(n => {
    n.classList.toggle('active', n.dataset.view === view);
  });
  if (typeof window.closeSidebar === 'function') window.closeSidebar();
  renderView();
}

function renderView() {
  stopOverviewBgAnimation();
  const root = document.getElementById('view-root');
  const titleEl = document.getElementById('view-title');
  const subEl = document.getElementById('view-subtitle');
  root.innerHTML = '';

  if (state.view === 'overview') {
    titleEl.textContent = 'Overview';
    subEl.textContent = 'Reporting period: ' + state.month + (!hasPermission('metrics:write') ? ' • Read-Only' : '');
    root.appendChild(renderOverview());
  } else if (state.view === 'trends') {
    titleEl.textContent = 'Trends';
    subEl.textContent = 'Overall status across reporting periods';
    root.appendChild(renderTrends());
  } else if (state.view === 'exec') {
    titleEl.textContent = 'Executive Summary';
    subEl.textContent = 'Roll-up for ' + state.month + (!hasPermission('narrative:write') ? ' • Read-Only' : '');
    root.appendChild(renderExecSummary());
  } else if (state.view === 'users') {
    titleEl.textContent = 'User Management & Access Control';
    subEl.textContent = 'Role-Based Access Control (RBAC) Administration';
    root.appendChild(renderUserManagement());
  } else if (state.view === 'audit') {
    titleEl.textContent = 'System Audit Logs';
    subEl.textContent = 'Cryptographic Compliance & Security Audit Trail';
    root.appendChild(renderAuditLogs());
  } else if (state.view.startsWith('section:')) {
    const sectionId = state.view.split(':')[1];
    const sec = state.sections.find(s => s.id === sectionId);
    titleEl.textContent = sec ? sec.name : 'Section';
    subEl.textContent = state.month + (!hasPermission('metrics:write') ? ' • Read-Only' : '');
    root.appendChild(renderSection(sectionId));
  }
}

// =========================================================================
// ORGANIC JELLYFISH PARTICLE FIELD ENGINE
// Premium, minimal, futuristic aquatic organism particle system.
// - Soft circular/ring-shaped particles with a visible soft center hole (torus / ring)
// - Subtle organic harmonic deformation (breathing, undulating boundaries)
// - Jellyfish locomotion (contraction pulse, forward boost, smooth glide relaxation)
// - Ambient fluid wave currents (buoyant, non-linear underwater drift)
// - Fluid cursor disturbance & wake (push away, tangential swirl wake, smooth relaxation)
// - Delicate trailing tendril filaments waving with underwater physics
// - Pure monochrome / slate neutral tones on clean white background
// - High-DPI support, zero dependencies, auto-pause on hidden tab
// =========================================================================
class OrganicJellyfishField {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.options = Object.assign({
      particleCount: null,
      densityDivisor: 20000,
      minParticles: 35,
      maxParticles: 70,
      baseColor: '30, 41, 59',      // Slate-800
      strokeColor: '51, 65, 85',    // Slate-700
      tendrilColor: '71, 85, 105',  // Slate-600
      speedMultiplier: 1.0,
      enableTendrils: true,
      container: null
    }, options);

    this.particles = [];
    this.animId = null;
    this.running = false;
    this.time = 0;
    this.lastTimestamp = 0;
    this.width = 0;
    this.height = 0;

    // Mouse state for fluid disturbance
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.prevMouseX = -9999;
    this.prevMouseY = -9999;
    this.mouseVx = 0;
    this.mouseVy = 0;

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._onResize = this._onResize.bind(this);
    this._loop = this._loop.bind(this);

    this.resizeObserver = null;
  }

  init() {
    this.resize();
    this._bindEvents();
  }

  resize() {
    if (!this.canvas) return;
    let w, h;
    if (this.options.container) {
      const rect = this.options.container.getBoundingClientRect();
      w = Math.max(this.options.container.scrollWidth, rect.width, window.innerWidth - 100);
      h = Math.max(this.options.container.scrollHeight, rect.height, 900);
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }

    if (w <= 0 || h <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }

    this.width = w;
    this.height = h;

    if (this.particles.length === 0) {
      this._generateParticles(w, h);
    } else {
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.x > w + 60) p.x = Math.random() * w;
        if (p.y > h + 60) p.y = Math.random() * h;
      }
    }
  }

  _generateParticles(w, h) {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.particles = [];
      return;
    }

    const count = this.options.particleCount || Math.min(
      Math.max(Math.floor((w * h) / this.options.densityDivisor), this.options.minParticles),
      this.options.maxParticles
    );

    this.particles = [];
    for (let i = 0; i < count; i++) {
      const depth = 0.35 + Math.random() * 0.65; // depth illusion (0.35 to 1.0)
      const baseR = (6.5 + Math.random() * 11.5) * (0.65 + 0.35 * depth);
      const holeRatio = 0.40 + Math.random() * 0.14; // soft distinct center hole

      const tendrils = [];
      if (this.options.enableTendrils && depth > 0.42) {
        const tCount = Math.random() > 0.45 ? 3 : 2;
        for (let t = 0; t < tCount; t++) {
          tendrils.push([
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 }
          ]);
        }
      }

      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        depth: depth,
        baseR: baseR,
        holeRatio: holeRatio,
        heading: Math.random() * Math.PI * 2,
        turnSpeed: (Math.random() - 0.5) * 0.003,
        speed: (0.16 + Math.random() * 0.20) * (0.65 + 0.35 * depth) * this.options.speedMultiplier,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.016 + Math.random() * 0.016,
        deformPhase1: Math.random() * Math.PI * 2,
        deformPhase2: Math.random() * Math.PI * 2,
        deformSpeed1: 0.02 + Math.random() * 0.02,
        deformSpeed2: 0.015 + Math.random() * 0.015,
        deformLobes: Math.random() > 0.5 ? 3 : 4,
        deformAmp: 0.07 + Math.random() * 0.04,
        baseAlpha: 0.09 + depth * 0.11,
        wakeX: 0,
        wakeY: 0,
        targetWakeX: 0,
        targetWakeY: 0,
        followAffinity: Math.random(),
        tendrils: tendrils
      });
    }
  }

  _bindEvents() {
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseleave', this._onMouseLeave);
    document.addEventListener('visibilitychange', this._onVisibilityChange);
    window.addEventListener('resize', this._onResize);

    if (this.options.container && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.options.container);
    }
  }

  _unbindEvents() {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseleave', this._onMouseLeave);
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    window.removeEventListener('resize', this._onResize);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  _onMouseMove(e) {
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (this.prevMouseX !== -9999) {
        this.mouseVx = (x - this.prevMouseX) * 0.4 + this.mouseVx * 0.6;
        this.mouseVy = (y - this.prevMouseY) * 0.4 + this.mouseVy * 0.6;
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.mouseX = x;
      this.mouseY = y;
    }
  }

  _onMouseLeave() {
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.prevMouseX = -9999;
    this.prevMouseY = -9999;
    this.mouseVx = 0;
    this.mouseVy = 0;
  }

  _onVisibilityChange() {
    if (document.hidden) {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    } else {
      if (this.running && !this.animId) {
        this.lastTimestamp = performance.now();
        this.animId = requestAnimationFrame(this._loop);
      }
    }
  }

  _onResize() {
    this.resize();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.init();
    this.lastTimestamp = performance.now();
    this.animId = requestAnimationFrame(this._loop);
  }

  stop() {
    this.running = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this._unbindEvents();
    if (this.ctx && this.width && this.height) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  _loop(timestamp) {
    if (!this.running) return;

    const dt = Math.min((timestamp - (this.lastTimestamp || timestamp)) / 1000, 0.05);
    this.lastTimestamp = timestamp;
    this.time += dt;

    this._update(dt);
    this._draw();

    this.animId = requestAnimationFrame(this._loop);
  }

  _update(dt) {
    const w = this.width || window.innerWidth;
    const h = this.height || window.innerHeight;
    const margin = 50;

    this.mouseVx *= 0.90;
    this.mouseVy *= 0.90;
    const cursorSpeed = Math.hypot(this.mouseVx, this.mouseVy);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // 1. Locomotion & organic pulse
      p.pulsePhase += p.pulseSpeed;
      p.deformPhase1 += p.deformSpeed1;
      p.deformPhase2 += p.deformSpeed2;

      const rawSin = Math.sin(p.pulsePhase);
      let pulseBoost = 0;
      let contraction = 1.0;
      if (rawSin > 0.25) {
        const progress = (rawSin - 0.25) / 0.75;
        contraction = 1.0 - progress * progress * 0.16;
        pulseBoost = progress * 0.38 * p.speed;
      }

      p.heading += p.turnSpeed + Math.sin(this.time * 0.4 + p.pulsePhase) * 0.0025;

      const currentX = Math.sin(p.y * 0.0022 + this.time * 0.25) * 0.14;
      const currentY = Math.cos(p.x * 0.0022 + this.time * 0.20) * 0.10 - 0.07;

      const moveX = Math.cos(p.heading) * (p.speed + pulseBoost) + currentX;
      const moveY = Math.sin(p.heading) * (p.speed + pulseBoost) + currentY;

      // 2. Cursor disturbance & fluid wake
      p.wakeX += (p.targetWakeX - p.wakeX) * 0.08;
      p.wakeY += (p.targetWakeY - p.wakeY) * 0.08;
      p.targetWakeX *= 0.92;
      p.targetWakeY *= 0.92;

      if (this.mouseX > -500) {
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const dist = Math.hypot(dx, dy);
        const radius = 190;
        if (dist < radius && dist > 1) {
          const factor = Math.pow(1 - dist / radius, 1.8);
          const push = factor * 2.8;
          p.targetWakeX += (dx / dist) * push;
          p.targetWakeY += (dy / dist) * push;

          if (cursorSpeed > 0.3) {
            const swirl = factor * Math.min(cursorSpeed * 0.18, 1.6);
            if (p.followAffinity > 0.55) {
              p.targetWakeX += (this.mouseVx * 0.12) * factor;
              p.targetWakeY += (this.mouseVy * 0.12) * factor;
            } else {
              p.targetWakeX += (-dy / dist) * swirl * 0.5;
              p.targetWakeY += (dx / dist) * swirl * 0.5;
            }
          }
        }
      }

      p.x += moveX + p.wakeX;
      p.y += moveY + p.wakeY;

      if (p.x < -margin) p.x = w + margin;
      if (p.x > w + margin) p.x = -margin;
      if (p.y < -margin) p.y = h + margin;
      if (p.y > h + margin) p.y = -margin;

      // 3. Tendril trailing wave physics
      if (p.tendrils && p.tendrils.length > 0) {
        const outerR = p.baseR * contraction;
        const originX = p.x - Math.cos(p.heading) * (outerR * 0.7);
        const originY = p.y - Math.sin(p.heading) * (outerR * 0.7);

        for (let t = 0; t < p.tendrils.length; t++) {
          const tendril = p.tendrils[t];
          const tOffset = (t - (p.tendrils.length - 1) / 2) * (outerR * 0.45);
          let prevX = originX + Math.sin(p.heading) * tOffset;
          let prevY = originY - Math.cos(p.heading) * tOffset;

          for (let seg = 0; seg < tendril.length; seg++) {
            const node = tendril[seg];
            const segDist = 4.5 + seg * 2.2;
            const wave = Math.sin(this.time * 2.4 + p.pulsePhase + seg * 0.9 + t * 0.7) * (1.1 + seg * 0.5);
            const targetX = prevX - Math.cos(p.heading) * segDist + Math.sin(p.heading) * wave;
            const targetY = prevY - Math.sin(p.heading) * segDist - Math.cos(p.heading) * wave;

            node.x += (targetX - node.x) * 0.28;
            node.y += (targetY - node.y) * 0.28;
            prevX = node.x;
            prevY = node.y;
          }
        }
      }

      p._currentContraction = contraction;
    }
  }

  _draw() {
    const ctx = this.ctx;
    if (!ctx) return;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    const steps = 24;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const contraction = p._currentContraction || 1.0;
      const outerR = p.baseR * contraction;
      const innerR = outerR * p.holeRatio;

      ctx.save();

      // ── Trailing micro-tendril filaments ──
      if (p.tendrils && p.tendrils.length > 0) {
        ctx.beginPath();
        for (let t = 0; t < p.tendrils.length; t++) {
          const tendril = p.tendrils[t];
          const tOffset = (t - (p.tendrils.length - 1) / 2) * (outerR * 0.45);
          const startX = p.x - Math.cos(p.heading) * (outerR * 0.6) + Math.sin(p.heading) * tOffset;
          const startY = p.y - Math.sin(p.heading) * (outerR * 0.6) - Math.cos(p.heading) * tOffset;

          ctx.moveTo(startX, startY);
          for (let seg = 0; seg < tendril.length; seg++) {
            ctx.lineTo(tendril[seg].x, tendril[seg].y);
          }
        }
        ctx.strokeStyle = `rgba(${this.options.tendrilColor}, ${(p.baseAlpha * 0.42).toFixed(3)})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }

      // ── Organic Ring Body with Soft Center Hole (evenodd rule) ──
      ctx.beginPath();

      // Outer boundary (clockwise)
      for (let s = 0; s <= steps; s++) {
        const theta = (s / steps) * Math.PI * 2;
        const deform = 1 + p.deformAmp * Math.sin(p.deformLobes * theta + p.deformPhase1)
                         + (p.deformAmp * 0.45) * Math.cos(2 * theta + p.deformPhase2);
        const r = outerR * deform;
        const px = p.x + Math.cos(theta) * r;
        const py = p.y + Math.sin(theta) * r;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Inner hole boundary (counter-clockwise)
      for (let s = steps; s >= 0; s--) {
        const theta = (s / steps) * Math.PI * 2;
        const deform = 1 + (p.deformAmp * 0.75) * Math.sin(p.deformLobes * theta + p.deformPhase1 + 0.5)
                         + (p.deformAmp * 0.35) * Math.cos(2 * theta + p.deformPhase2);
        const r = innerR * deform;
        const px = p.x + Math.cos(theta) * r;
        const py = p.y + Math.sin(theta) * r;
        if (s === steps) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      let alpha = p.baseAlpha;
      if (this.mouseX > -500) {
        const dCursor = Math.hypot(p.x - this.mouseX, p.y - this.mouseY);
        if (dCursor < 180) {
          alpha += (1 - dCursor / 180) * 0.12;
        }
      }

      ctx.fillStyle = `rgba(${this.options.baseColor}, ${alpha.toFixed(3)})`;
      ctx.fill('evenodd');

      ctx.strokeStyle = `rgba(${this.options.strokeColor}, ${(alpha * 0.75).toFixed(3)})`;
      ctx.lineWidth = 0.65;
      ctx.stroke();

      ctx.restore();
    }
  }
}

let overviewJellyfishField = null;

function initOverviewBgAnimation(container, canvas) {
  stopOverviewBgAnimation();
  if (!container || !canvas) return;
  overviewJellyfishField = new OrganicJellyfishField(canvas, {
    densityDivisor: 22000,
    minParticles: 36,
    maxParticles: 70,
    speedMultiplier: 0.85,
    baseColor: '51, 65, 85',
    strokeColor: '71, 85, 105',
    tendrilColor: '100, 116, 139',
    container: container
  });
  overviewJellyfishField.start();
}

function stopOverviewBgAnimation() {
  if (overviewJellyfishField) {
    overviewJellyfishField.stop();
    overviewJellyfishField = null;
  }
}

// ---------- Overview ----------
function renderOverview() {
  const container = document.createElement('div');
  container.className = 'overview-container';

  // Background Canvas for Operational Intelligence Network Field
  const canvas = document.createElement('canvas');
  canvas.id = 'overview-bg-canvas';
  canvas.className = 'overview-bg-canvas';
  container.appendChild(canvas);

  // Soft Ambient Radial Lights for Depth
  const ambient = document.createElement('div');
  ambient.className = 'overview-ambient-layer';
  ambient.innerHTML = `
    <div class="overview-ambient-glow glow-1"></div>
    <div class="overview-ambient-glow glow-2"></div>
    <div class="overview-ambient-glow glow-3"></div>
  `;
  container.appendChild(ambient);

  // Content wrapper for Overview page
  const frag = document.createElement('div');
  frag.className = 'overview-content';

  const rag = state.monthData.overallRAG;

  let green = 0, amber = 0, red = 0, trend = 0;
  state.metrics.forEach(m => {
    const entry = state.monthData.metrics[m.id];
    if (!entry) { if (m.direction === 'trend') trend++; return; }
    if (entry.rag === 'green') green++;
    else if (entry.rag === 'amber') amber++;
    else if (entry.rag === 'red') red++;
    else trend++;
  });

  // 1. Overview Banner
  const banner = document.createElement('div');
  banner.className = 'overview-banner rag-' + (rag || 'none');
  banner.innerHTML = `
    <div>
      <div class="banner-label">Overall status &middot; ${state.month}</div>
      <div class="banner-status ${rag || 'none'}">${rag ? rag.toUpperCase() : 'NO DATA'}</div>
    </div>
    <div class="banner-counts">
      <div class="banner-count"><div class="n" style="color:var(--green)">${green}</div><div class="l">Green</div></div>
      <div class="banner-count"><div class="n" style="color:var(--amber)">${amber}</div><div class="l">Amber</div></div>
      <div class="banner-count"><div class="n" style="color:var(--red)">${red}</div><div class="l">Red</div></div>
      <div class="banner-count"><div class="n" style="color:var(--text-dim)">${trend}</div><div class="l">Trend-only</div></div>
    </div>
    <div class="banner-actions">
      <button id="btn-download-status-report" class="btn btn-clear" title="Download Overall Client Status Report">
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 3v10M6 9l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 15h14" stroke-linecap="round"/></svg>
        <span>Download Status Report</span>
      </button>
    </div>
  `;
  // Wire up Download Status Report button
  banner.querySelector('#btn-download-status-report').addEventListener('click', downloadStatusReport);
  frag.appendChild(banner);

  // 2. Sections Grid
  const grid = document.createElement('div');
  grid.className = 'section-grid';
  state.sections.forEach(sec => {
    const secMetrics = metricsBySection(sec.id);
    let g = 0, a = 0, r = 0, t = 0;
    secMetrics.forEach(m => {
      const entry = state.monthData.metrics[m.id];
      if (!entry || entry.computed === null || entry.computed === undefined) return;
      if (entry.rag === 'green') g++; else if (entry.rag === 'amber') a++; else if (entry.rag === 'red') r++; else if (m.direction === 'trend') t++;
    });
    const worst = sectionWorstRAG(sec.id);
    const card = document.createElement('div');
    card.className = 'section-card' + (worst ? ' rag-' + worst : '');
    card.innerHTML = `
      <div class="section-card-head">${ICONS[sec.icon] || ''}<span class="section-card-name">${sec.name}</span></div>
      <div class="section-card-pills">
        ${g ? `<span class="mini-pill green">${g} OK</span>` : ''}
        ${a ? `<span class="mini-pill amber">${a} AMBER</span>` : ''}
        ${r ? `<span class="mini-pill red">${r} RED</span>` : ''}
        ${t ? `<span class="mini-pill trend">${t} trend</span>` : ''}
        ${!g && !a && !r && !t ? `<span class="mini-pill trend" style="opacity:.6">No data</span>` : ''}
      </div>
    `;
    card.addEventListener('click', () => setView('section:' + sec.id));
    grid.appendChild(card);
  });
  frag.appendChild(grid);

  // 3. RAG Distribution & Status History row
  const row = document.createElement('div');
  row.className = 'chart-row';

  const ragPanel = buildRAGDistributionPanel(green, amber, red, trend);
  const histPanel = document.createElement('div');
  histPanel.className = 'panel status-history-panel';
  histPanel.innerHTML = `
    <div class="panel-title" style="display:flex; justify-content:space-between; align-items:center;">
      <span>Status history</span>
      <span style="font-size:11px; text-transform:none; color:var(--text-faint); font-weight:500;">Interactive timeline &middot; Click to select period</span>
    </div>
    ${monthsStripSVG()}
  `;
  row.appendChild(ragPanel);
  row.appendChild(histPanel);
  frag.appendChild(row);

  // 4. Executive Summary Highlights on Overview
  const nar = state.monthData.narrative || {};
  const hasNar = Boolean((nar.topRisks && nar.topRisks.trim()) || (nar.improvements && nar.improvements.trim()) || (nar.plannedActions && nar.plannedActions.trim()));

  const execRow = document.createElement('div');
  execRow.className = 'panel overview-exec-panel';
  execRow.style.marginTop = '22px';
  execRow.innerHTML = `
    <div class="overview-exec-head">
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="overview-exec-badge">EXECUTIVE BRIEFING</span>
        <span class="overview-exec-title">Summary for ${state.month}</span>
        ${hasNar ? '<span class="mini-pill green">SAVED & ACTIVE</span>' : '<span class="mini-pill trend">NOT RECORDED YET</span>'}
      </div>
      <button id="btn-view-exec-overview" class="btn btn-primary btn-exec-cta" title="Open complete Executive Report">
        <span>${hasNar ? 'Open Executive Report' : 'Create Executive Summary'}</span>
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 10h12M11 5l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="overview-exec-content" style="margin-top:14px;">
      <div class="overview-exec-grid">
        <div class="overview-exec-snippet risk">
          <div class="snip-head">
            <span class="snip-dot red"></span>
            <span class="snip-label">TOP RISKS</span>
          </div>
          <div class="snip-text">${nar.topRisks && nar.topRisks.trim() ? escapeHTML(nar.topRisks) : '<span class="snip-empty">No critical risks recorded for this period.</span>'}</div>
        </div>
        <div class="overview-exec-snippet improvement">
          <div class="snip-head">
            <span class="snip-dot green"></span>
            <span class="snip-label">DELIVERED IMPROVEMENTS</span>
          </div>
          <div class="snip-text">${nar.improvements && nar.improvements.trim() ? escapeHTML(nar.improvements) : '<span class="snip-empty">No delivered improvements recorded.</span>'}</div>
        </div>
        <div class="overview-exec-snippet action">
          <div class="snip-head">
            <span class="snip-dot blue"></span>
            <span class="snip-label">PLANNED NEXT ACTIONS</span>
          </div>
          <div class="snip-text">${nar.plannedActions && nar.plannedActions.trim() ? escapeHTML(nar.plannedActions) : '<span class="snip-empty">No planned actions specified.</span>'}</div>
        </div>
      </div>
    </div>
  `;

  execRow.querySelector('#btn-view-exec-overview').addEventListener('click', () => setView('exec'));
  frag.appendChild(execRow);

  // Hook up month bar click jumps
  frag.querySelectorAll('[data-month-jump]').forEach(el => {
    el.addEventListener('click', async () => {
      const targetMonth = el.dataset.monthJump;
      if (!targetMonth || targetMonth === state.month) return;
      state.month = targetMonth;
      document.getElementById('month-input').value = state.month;
      await loadMonthData();
      renderView();
    });
  });

  container.appendChild(frag);

  requestAnimationFrame(() => {
    initOverviewBgAnimation(container, canvas);
  });

  return container;
}


/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   RAG DISTRIBUTION ”” Interactive Bangle-Ring System
   buildRAGDistributionPanel(g, a, r, t) → DOM Element (panel)
   Each ring responds to the cursor's angular velocity around the chart centre.
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   RAG DISTRIBUTION ”” Interactive Security Status Ring
   ONE unified ring. All segments rotate together as a single object.
   Centre label is always stationary.
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function buildRAGDistributionPanel(g, a, r, t) {
  const panel = document.createElement('div');
  panel.className = 'panel rag-distribution-card';
  const total = g + a + r + t;

  // â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const titleRow = document.createElement('div');
  titleRow.className = 'panel-title';
  titleRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;';
  titleRow.innerHTML = `
    <span>RAG distribution</span>
    <span class="rag-live-indicator"><span class="rag-orbit-dot"></span>LIVE</span>
  `;
  panel.appendChild(titleRow);

  if (total === 0) {
    const em = document.createElement('div');
    em.className = 'empty-note';
    em.textContent = 'No metrics recorded for this month yet.';
    panel.appendChild(em);
    return panel;
  }

  // â”€â”€ SVG constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const VB = 180;             // viewBox square size
  const CX = 90, CY = 90;    // centre point
  const R  = 68;              // ring radius
  const SW = 15;              // ring stroke-width
  const GAP_DEG = 3.2;        // gap between segments (degrees)
  const CIRC = 2 * Math.PI * R;
  const NS = 'http://www.w3.org/2000/svg';

  /** Create an SVG element with attributes */
  function E(tag, attrs = {}) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
    return e;
  }

  const svg = E('svg', {
    viewBox: `0 0 ${VB} ${VB}`,
    width: '180', height: '180',
    class: 'rag-donut-svg',
    role: 'img',
    'aria-label': `RAG distribution: ${g} OK, ${a} Amber, ${r} Red, ${t} Trend`,
    style: 'overflow:visible',
  });

  // â”€â”€ Static layer ”” NEVER rotates â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const staticG = E('g', { class: 'rag-static' });

  // Track (background ring)
  staticG.appendChild(E('circle', {
    cx: CX, cy: CY, r: R,
    fill: 'none', stroke: '#F1F5F9', 'stroke-width': SW,
  }));
  // Outer dashed guide ring
  staticG.appendChild(E('circle', {
    cx: CX, cy: CY, r: R + SW / 2 + 7,
    fill: 'none', stroke: '#E5E7EB',
    'stroke-width': '0.75', 'stroke-dasharray': '2 8', opacity: '0.65',
  }));
  // Inner solid guide ring
  staticG.appendChild(E('circle', {
    cx: CX, cy: CY, r: R - SW / 2 - 6,
    fill: 'none', stroke: '#E5E7EB',
    'stroke-width': '0.5', opacity: '0.5',
  }));

  // Centre ”” total number (always visible by default)
  const numEl = E('text', {
    x: CX, y: CY - 5,
    'text-anchor': 'middle',
    'font-family': 'var(--mono)',
    'font-size': '26', 'font-weight': '800',
    fill: '#111827', class: 'rag-ctr-num',
  });
  numEl.textContent = total;

  const lblEl = E('text', {
    x: CX, y: CY + 13,
    'text-anchor': 'middle',
    'font-family': 'var(--sans, Inter, sans-serif)',
    'font-size': '10', 'font-weight': '500',
    fill: '#94A3B8', 'letter-spacing': '0.06em',
    class: 'rag-ctr-lbl',
  });
  lblEl.textContent = 'metrics';

  // Hover overlays ”” shown when a segment is highlighted
  const hvNumEl = E('text', {
    x: CX, y: CY - 5,
    'text-anchor': 'middle',
    'font-family': 'var(--mono)',
    'font-size': '26', 'font-weight': '800',
    fill: '#111827', opacity: '0', class: 'rag-hv-num',
  });
  const hvLblEl = E('text', {
    x: CX, y: CY + 13,
    'text-anchor': 'middle',
    'font-family': 'var(--sans, Inter, sans-serif)',
    'font-size': '10', 'font-weight': '500',
    fill: '#94A3B8', 'letter-spacing': '0.06em',
    opacity: '0', class: 'rag-hv-lbl',
  });

  staticG.appendChild(numEl);
  staticG.appendChild(lblEl);
  staticG.appendChild(hvNumEl);
  staticG.appendChild(hvLblEl);
  svg.appendChild(staticG);

  // â”€â”€ Unified rotating ring group â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const ringG = E('g', { class: 'rag-ring-group', id: 'rag-unified-ring' });

  // baseG: rotates -90° so segments start at 12 o'clock (top)
  const baseG = E('g', { transform: `rotate(-90 ${CX} ${CY})` });

  // Segment definitions
  const SEG_DEFS = [
    { v: g, color: '#15803D', colorHover: '#16A34A', label: 'OK',    key: 'green' },
    { v: a, color: '#B45309', colorHover: '#D97706', label: 'Amber',  key: 'amber' },
    { v: r, color: '#B91C1C', colorHover: '#DC2626', label: 'Red',    key: 'red'   },
    { v: t, color: '#64748B', colorHover: '#475569', label: 'Trend',  key: 'trend' },
  ].filter(s => s.v > 0);

  let accDeg = 0;
  const segMeta = [];

  SEG_DEFS.forEach(s => {
    const spanDeg  = (s.v / total) * 360;
    // Offset start by half-gap, shorten arc by full gap → clean rounded tips
    const startFrac = (accDeg + GAP_DEG / 2) / 360;
    const lenFrac   = Math.max((spanDeg - GAP_DEG) / 360, 0.003);
    const dashLen   = lenFrac * CIRC;
    const dashOff   = -(startFrac * CIRC);

    const circle = E('circle', {
      cx: CX, cy: CY, r: R,
      fill: 'none',
      stroke: s.color,
      'stroke-width': SW,
      'stroke-dasharray': `${dashLen.toFixed(2)} ${CIRC.toFixed(2)}`,
      'stroke-dashoffset': dashOff.toFixed(2),
      'stroke-linecap': 'round',
      opacity: '0.92',
      class: 'rag-seg',
    });
    baseG.appendChild(circle);

    // Boundary dot at segment start (white notch between segments)
    const bRad = (accDeg - 90) * Math.PI / 180;
    baseG.appendChild(E('circle', {
      cx: (CX + R * Math.cos(bRad)).toFixed(2),
      cy: (CY + R * Math.sin(bRad)).toFixed(2),
      r: '2', fill: '#FFFFFF', opacity: '0.8',
    }));

    segMeta.push({ ...s, startDeg: accDeg, endDeg: accDeg + spanDeg, el: circle });
    accDeg += spanDeg;
  });

  ringG.appendChild(baseG);

  // Orbit marker dot at 12 o'clock on the outer edge ”” rotates with ring
  ringG.appendChild(E('circle', {
    cx: CX, cy: CY - R - SW / 2 - 4,
    r: '2.5', fill: '#CBD5E1', class: 'rag-orbit-marker',
  }));

  svg.appendChild(ringG);

  // â”€â”€ Assemble panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const stage = document.createElement('div');
  stage.className = 'rag-ring-stage';
  stage.appendChild(svg);
  panel.appendChild(stage);

  // Legend pills
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;justify-content:center;gap:10px;margin-top:14px;flex-wrap:wrap;';
  legend.innerHTML = [
    { label: 'OK', count: g, cls: 'green' },
    { label: 'Amber', count: a, cls: 'amber' },
    { label: 'Red',   count: r, cls: 'red'   },
    { label: 'Trend', count: t, cls: 'trend' },
  ].filter(l => l.count > 0)
   .map(l => `<span class="mini-pill ${l.cls}">${l.count} ${l.label}</span>`)
   .join('');
  panel.appendChild(legend);

  // Boot physics after first paint (panel must be in DOM)
  requestAnimationFrame(() =>
    initRAGRingInteraction(panel, ringG, svg, segMeta, CX, CY, R, SW, VB,
                           numEl, lblEl, hvNumEl, hvLblEl)
  );

  return panel;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   initRAGRingInteraction ”” Single-Ring Angular Physics Engine

   States:
     IDLE     → slow continuous idle rotation
     ENTERING → smoothly return to angle 0, then → CURSOR
     CURSOR   → cursor angular velocity drives the whole ring
     LEAVING  → smoothly return to angle 0, then → IDLE

   The centre label group is never rotated.
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function initRAGRingInteraction(panel, ringG, svg, segMeta, CX, CY, R, SW, VB,
                                 numEl, lblEl, hvNumEl, hvLblEl) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!panel || !panel.isConnected) return;

  // â”€â”€ State constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const S = { IDLE: 0, ENTERING: 1, CURSOR: 2, LEAVING: 3 };
  let state = S.IDLE;

  // â”€â”€ Motion variables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  let angle       = 0;    // current ring rotation (degrees, accumulating)
  let vel         = 0;    // angular velocity (deg / frame)
  let curVel      = 0;    // velocity component contributed by cursor
  let prevCursDeg = null; // cursor angle from last frame
  let activeSegIdx = -1;  // currently highlighted segment (-1 = none)
  let alive       = true;

  // â”€â”€ Physics constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const IDLE_SPD    = 0.19;   // Phase7: idle deg/frame ≈ 1 revolution / 32 s at 60fps (boosted 35%)
  const IDLE_RAMP   = 0.022;  // how fast we accelerate to idle speed
  const MAX_CURS    = 1.2;    // max cursor-induced speed (deg/frame)
  const MAX_RET     = 2.2;    // max return-to-0 speed (deg/frame)
  const FRICTION    = 0.92;   // velocity decay per frame
  const CURS_LERP   = 0.20;   // cursor velocity blend-in rate
  const RING_DRAG   = 0.96;   // slight drag in cursor mode
  const RET_SPRING  = 0.11;   // spring strength for return-to-0
  const SNAP_DEG    = 2.0;    // angle (°) threshold → snap to 0
  const SNAP_VEL    = 0.08;   // velocity threshold → snap to 0

  // â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  /** SVG centre in screen pixels + scale factor */
  function svgCtr() {
    const rect = svg.getBoundingClientRect();
    const sc = rect.width / VB;
    return { x: rect.left + CX * sc, y: rect.top + CY * sc, sc };
  }

  /** Shortest delta from current angle to nearest 0° (nearest full rotation) */
  function returnDelta() {
    const norm = ((angle % 360) + 360) % 360;   // 0…360
    return norm <= 180 ? -norm : 360 - norm;    // negative = go back, positive = go forward
  }

  /** Apply animation rotation to ring group */
  function setAngle(a) {
    angle = a;
    ringG.setAttribute('transform', `rotate(${a.toFixed(3)} ${CX} ${CY})`);
  }

  // â”€â”€ Segment hover â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function setActive(idx) {
    if (idx === activeSegIdx) return;
    activeSegIdx = idx;
    const hasActive = idx >= 0;

    segMeta.forEach((s, i) => {
      if (i === idx) {
        s.el.setAttribute('stroke-width', String(SW + 3));
        s.el.setAttribute('stroke',       s.colorHover);
        s.el.setAttribute('opacity',      '1');
      } else {
        s.el.setAttribute('stroke-width', String(SW));
        s.el.setAttribute('stroke',       s.color);
        s.el.setAttribute('opacity',      hasActive ? '0.42' : '0.92');
      }
    });

    // Swap centre text
    if (hasActive) {
      const s = segMeta[idx];
      numEl.setAttribute('opacity',   '0');
      lblEl.setAttribute('opacity',   '0');
      hvNumEl.textContent = s.v;
      hvLblEl.textContent = s.label;
      hvNumEl.setAttribute('opacity', '1');
      hvLblEl.setAttribute('opacity', '1');
    } else {
      numEl.setAttribute('opacity',   '1');
      lblEl.setAttribute('opacity',   '1');
      hvNumEl.setAttribute('opacity', '0');
      hvLblEl.setAttribute('opacity', '0');
    }
  }

  // â”€â”€ Pointer events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function onMove(e) {
    const c = svgCtr();
    const dx = e.clientX - c.x;
    const dy = e.clientY - c.y;

    // --- Cursor angular velocity ---
    if (state === S.CURSOR || state === S.ENTERING) {
      const cursDeg = Math.atan2(dy, dx) * 180 / Math.PI;
      if (prevCursDeg !== null) {
        let delta = cursDeg - prevCursDeg;
        if (delta >  180) delta -= 360;
        if (delta < -180) delta += 360;
        // Proximity factor: nearer to ring → stronger response
        const dist   = Math.sqrt(dx * dx + dy * dy);
        const prox   = Math.min(1.5, 1.0 / (1 + dist / (c.sc * R) * 0.55));
        const target = Math.max(-MAX_CURS, Math.min(MAX_CURS, delta * prox * 0.38));
        curVel += (target - curVel) * CURS_LERP;
      }
      prevCursDeg = cursDeg;
    }

    // --- Segment hover (only in CURSOR state, only over the ring band) ---
    if (state === S.CURSOR) {
      const dist     = Math.sqrt(dx * dx + dy * dy);
      const innerPx  = (R - SW / 2) * c.sc;
      const outerPx  = (R + SW / 2) * c.sc;
      if (dist >= innerPx - 5 && dist <= outerPx + 5) {
        // Map cursor to segment-space angle (undo ring rotation)
        const svgDeg   = Math.atan2(dy, dx) * 180 / Math.PI;
        const clockDeg = ((svgDeg + 90) + 3600) % 360;          // 0=top, CW
        const normAng  = ((angle % 360) + 360) % 360;
        const segDeg   = ((clockDeg - normAng) + 3600) % 360;   // segment-space

        let found = -1;
        for (let i = 0; i < segMeta.length; i++) {
          if (segDeg >= segMeta[i].startDeg && segDeg < segMeta[i].endDeg) {
            found = i; break;
          }
        }
        setActive(found);
      } else {
        setActive(-1);
      }
    }
  }

  function onEnter() {
    state = S.ENTERING;
    prevCursDeg = null;
    panel.classList.add('rag-rotating-active');
  }

  function onLeave() {
    state = S.LEAVING;
    prevCursDeg = null;
    curVel = 0;
    setActive(-1);
    panel.classList.remove('rag-rotating-active');
  }

  panel.addEventListener('pointermove',  onMove,  { passive: true });
  panel.addEventListener('pointerenter', onEnter, { passive: true });
  panel.addEventListener('pointerleave', onLeave, { passive: true });

  // â”€â”€ Animation loop â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function tick() {
    if (!alive || !panel.isConnected) {
      panel.removeEventListener('pointermove',  onMove);
      panel.removeEventListener('pointerenter', onEnter);
      panel.removeEventListener('pointerleave', onLeave);
      return;
    }

    switch (state) {

      case S.IDLE: {
        // Ramp smoothly up to idle speed
        vel += (IDLE_SPD - vel) * IDLE_RAMP;
        setAngle(angle + vel);
        break;
      }

      case S.ENTERING: {
        // Spring back to angle 0, then hand off to CURSOR
        const d = returnDelta();
        if (Math.abs(d) < SNAP_DEG && Math.abs(vel) < SNAP_VEL) {
          vel = 0;
          setAngle(Math.round(angle / 360) * 360);
          state = S.CURSOR;
          prevCursDeg = null;
        } else {
          const target = Math.max(-MAX_RET, Math.min(MAX_RET, d * RET_SPRING));
          vel += (target - vel) * 0.18;
          vel *= FRICTION;
          setAngle(angle + vel);
        }
        break;
      }

      case S.CURSOR: {
        // Cursor drives ring velocity with inertia + slight drag
        vel += (curVel - vel) * 0.14;
        curVel *= FRICTION;
        vel   *= RING_DRAG;
        vel    = Math.max(-MAX_CURS, Math.min(MAX_CURS, vel));
        setAngle(angle + vel);
        break;
      }

      case S.LEAVING: {
        // Spring back to angle 0, then hand off to IDLE
        const d = returnDelta();
        if (Math.abs(d) < SNAP_DEG && Math.abs(vel) < SNAP_VEL) {
          vel = 0;
          setAngle(Math.round(angle / 360) * 360);
          state = S.IDLE;
        } else {
          const target = Math.max(-MAX_RET, Math.min(MAX_RET, d * RET_SPRING));
          vel += (target - vel) * 0.15;
          vel *= FRICTION;
          setAngle(angle + vel);
        }
        break;
      }
    }

    requestAnimationFrame(tick);
  }

  // Observe DOM removal (view navigation wipes the panel)
  const obs = new MutationObserver(() => {
    if (!panel.isConnected) { alive = false; obs.disconnect(); }
  });
  obs.observe(document.getElementById('view-root') || document.body,
              { childList: true, subtree: true });

  requestAnimationFrame(tick);
}

// Legacy alias ”” keeps any stray callers from throwing
function donutSVG(g, a, r, t) {
  return buildRAGDistributionPanel(g, a, r, t).outerHTML;
}





function monthsStripSVG() {
  const months = state.monthsHistory;
  if (!months.length) return `<div class="empty-note">Save data for a month to start building history.</div>`;
  const last = months.slice(-12);
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const startPeriod = last[0].month.slice(2);
  const endPeriod = last[last.length - 1].month.slice(2);

  let html = `<div class="status-timeline-card">`;
  html += `
    <div class="status-timeline-header">
      <span class="timeline-span-badge">${startPeriod}</span>
      <div class="timeline-quick-legend">
        <span class="tql-item"><span class="tql-dot green"></span> OK</span>
        <span class="tql-item"><span class="tql-dot amber"></span> Amber</span>
        <span class="tql-item"><span class="tql-dot red"></span> Red</span>
        <span class="tql-item"><span class="tql-dot trend"></span> Trend</span>
      </div>
      <span class="timeline-span-badge latest">${endPeriod}</span>
    </div>
    <div class="status-timeline-body">
      <div class="status-timeline-track"></div>
      <div class="status-timeline-items">
  `;

  last.forEach((m, idx) => {
    const isCur = m.month === state.month;
    const isLatest = idx === last.length - 1;
    const color = m.overallRAG || 'none';
    const parts = m.month.split('-');
    const y = parts[0];
    const mStr = parts[1];
    const mNum = parseInt(mStr, 10);
    const mName = monthNames[mNum - 1] || mStr;
    const pCode = `${y.slice(2)}-${mStr}`;
    const statusText = (m.overallRAG || 'NO DATA').toUpperCase();

    html += `
      <div class="timeline-node-wrap ${isCur ? 'active-month' : ''} ${isLatest ? 'is-latest' : ''}" 
           data-month-jump="${m.month}" 
           role="button" 
           tabindex="0" 
           title="${m.month} · ${statusText}">
        <div class="timeline-node-tooltip">
          <div class="tnt-month">${mName} 20${y.slice(2)}</div>
          <div class="tnt-status ${color}">Status: <strong>${statusText}</strong></div>
          <div class="tnt-hint">Click to switch month</div>
        </div>
        <div class="timeline-dot-anchor">
          <div class="timeline-dot ${color}"></div>
          ${isLatest ? '<div class="timeline-dot-pulse"></div>' : ''}
        </div>
        <div class="timeline-node-meta">
          <span class="timeline-month-label">${mName}</span>
          <span class="timeline-year-label">${pCode}</span>
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  </div>`;
  return html;
}

// ---------- Trends ----------
function renderTrends() {
  const frag = document.createElement('div');

  const totalMonths = state.monthsHistory.length;
  let totalGreen = 0, totalAmber = 0, totalRed = 0;
  state.monthsHistory.forEach(m => {
    if (m.overallRAG === 'green') totalGreen++;
    else if (m.overallRAG === 'amber') totalAmber++;
    else if (m.overallRAG === 'red') totalRed++;
  });

  // Summary Metrics Banner
  const summaryPanel = document.createElement('div');
  summaryPanel.className = 'trends-summary-banner';
  summaryPanel.innerHTML = `
    <div class="trends-stat-item">
      <div class="stat-num">${totalMonths}</div>
      <div class="stat-lbl">Months Logged</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--green)">${totalGreen}</div>
      <div class="stat-lbl">Green Periods</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--amber)">${totalAmber}</div>
      <div class="stat-lbl">Amber Periods</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--red)">${totalRed}</div>
      <div class="stat-lbl">Red Periods</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--accent);">${state.month}</div>
      <div class="stat-lbl">Active Month</div>
    </div>
  `;
  frag.appendChild(summaryPanel);

  // Overall status by month chart
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.style.marginTop = '20px';
  panel.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
      <div class="panel-title" style="margin:0;">Overall status by month (Click any bar to jump to month)</div>
      <span style="font-size:12px; color:var(--text-faint);">Reporting timeline</span>
    </div>
    ${monthsStripSVG()}
  `;
  frag.appendChild(panel);

  // Reporting History Table with Rich Information
  const tablePanel = document.createElement('div');
  tablePanel.className = 'panel';
  tablePanel.style.marginTop = '20px';
  let rows = '';
  [...state.monthsHistory].reverse().forEach(m => {
    const isCurrent = m.month === state.month;
    const hasNarrative = m.hasNarrative;
    rows += `
      <tr class="${isCurrent ? 'active-row' : ''}" data-month="${m.month}">
        <td style="font-weight:700;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${m.month}</span>
            ${isCurrent ? '<span class="mini-pill green" style="font-size:10px; padding:1px 5px;">CURRENT</span>' : ''}
          </div>
        </td>
        <td>
          <span class="rag-pill rag-${m.overallRAG || 'none'}" style="display:inline-flex;">
            <span class="rag-dot"></span>${(m.overallRAG || 'no data').toUpperCase()}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            ${m.green !== undefined ? `<span class="mini-pill green">${m.green} OK</span>` : ''}
            ${m.amber !== undefined && m.amber > 0 ? `<span class="mini-pill amber">${m.amber} WARN</span>` : ''}
            ${m.red !== undefined && m.red > 0 ? `<span class="mini-pill red">${m.red} CRIT</span>` : ''}
            ${!m.green && !m.amber && !m.red ? `<span class="mini-pill trend" style="opacity:.6">No breakdown</span>` : ''}
          </div>
        </td>
        <td>
          ${hasNarrative ? `<span class="mini-pill green" title="Executive Summary is recorded">📄 Saved</span>` : `<span class="mini-pill trend" style="opacity:.6">None</span>`}
        </td>
        <td style="text-align:right;">
          <button class="btn btn-sm btn-open-month" data-open-month="${m.month}">
            <span>Open &middot; ${m.month}</span>
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>
    `;
  });

  tablePanel.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
      <div class="panel-title" style="margin:0;">Reporting history (${state.monthsHistory.length} recorded months)</div>
      <span style="font-size:12px; color:var(--text-faint);">Click any row to switch dashboard month</span>
    </div>
    <table class="months-table">
      <thead>
        <tr>
          <th>Reporting Month</th>
          <th>Overall Status</th>
          <th>Metrics Health</th>
          <th>Executive Briefing</th>
          <th style="text-align:right;">Action</th>
        </tr>
      </thead>
      <tbody>${rows || '<tr><td colspan="5" class="empty-note">No months recorded yet. Save metrics to build history.</td></tr>'}</tbody>
    </table>
  `;

  tablePanel.querySelectorAll('tr[data-month]').forEach(tr => {
    tr.addEventListener('click', async () => {
      state.month = tr.dataset.month;
      document.getElementById('month-input').value = state.month;
      await loadMonthData();
      setView('overview');
    });
  });

  frag.querySelectorAll('[data-month-jump]').forEach(el => {
    el.addEventListener('click', async () => {
      const targetMonth = el.dataset.monthJump;
      if (!targetMonth) return;
      state.month = targetMonth;
      document.getElementById('month-input').value = state.month;
      await loadMonthData();
      renderView();
    });
  });

  frag.appendChild(tablePanel);
  return frag;
}

// ---------- Section detail ----------
function renderSection(sectionId) {
  const sec = state.sections.find(s => s.id === sectionId);
  const frag = document.createElement('div');
  const heading = document.createElement('div');
  heading.className = 'section-heading';
  heading.innerHTML = `${ICONS[sec.icon] || ''}<h2>${sec.name}</h2>`;
  frag.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'metrics-list';
  metricsBySection(sectionId).forEach(m => list.appendChild(renderMetricCard(m)));
  frag.appendChild(list);

  // ---- Managed Endpoints Auto-Propagation ----
  // After rendering, wire up managed_endpoints input to auto-fill all
  // denomination fields in this section that are based on managed_endpoints.
  // Also pre-populate those den fields from the current stored managed_endpoints value.
  if (sectionId === 'endpoint') {
    // Find the managed_endpoints direct input
    const meCards = list.querySelectorAll('.metric-card');
    let meInput = null;
    meCards.forEach(card => {
      const inp = card.querySelector('input[data-key="value"]');
      // The managed_endpoints card is the first card with a direct value input
      // Check via its label text
      const label = card.querySelector('.metric-label');
      if (label && label.textContent === 'Managed endpoints' && inp) {
        meInput = inp;
      }
    });

    if (meInput) {
      // Propagate current value to all managed-endpoints den inputs in this section
      function propagateManagedEndpoints() {
        const val = meInput.value;
        list.querySelectorAll('input[data-managed-endpoints-den]').forEach(denInp => {
          if (denInp !== meInput) {
            denInp.value = val;
            denInp.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      }

      meInput.addEventListener('input', propagateManagedEndpoints);
      // Initial propagation on render
      setTimeout(propagateManagedEndpoints, 0);
    }
  }

  return frag;
}

function fmtVal(v, unit) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return s + (unit || '');
}

function renderMetricCard(metric) {
  const entry = state.monthData.metrics[metric.id] || {};
  const rag = entry.rag || null;
  const historyList = (state.monthData.history && state.monthData.history[metric.id]) || entry.history || [];

  const wrap = document.createElement('div');
  wrap.className = 'metric-card';

  const cardTop = document.createElement('div');
  cardTop.className = 'metric-card-top';

  const strip = document.createElement('div');
  strip.className = 'metric-rag-strip' + (rag ? ' ' + rag : '');
  cardTop.appendChild(strip);

  const body = document.createElement('div');
  body.className = 'metric-body';

  // Info column
  const info = document.createElement('div');
  info.className = 'metric-info';
  let targetLine = '';
  if (metric.direction === 'trend') targetLine = 'Trend metric &middot; no fixed target';
  else if (metric.target !== null && metric.target !== undefined) targetLine = `Target: ${metric.direction === 'higher' ? '&ge;' : '&le;'} ${metric.target}${metric.unit || ''}`;
  else if (metric.ragRule === 'binary0') targetLine = 'Target: 0' + (metric.amberNotRed ? ' (flagged, not critical)' : '');
  else if (metric.ragRule === 'prevMonth') targetLine = 'Judged against previous month';

  let prevRefHtml = '';
  if (state.monthData.prevData && state.monthData.prevData[metric.id] !== undefined && state.monthData.prevData[metric.id] !== null) {
    prevRefHtml = `<div class="metric-prev-ref">Last month (${state.monthData.prevMonth}): <strong>${fmtVal(state.monthData.prevData[metric.id], metric.unit)}</strong></div>`;
  }

  info.innerHTML = `
    <div class="metric-label">${metric.label}</div>
    <div class="metric-desc">${metric.desc || ''}</div>
    <div class="metric-target">${targetLine}</div>
    ${prevRefHtml}
  `;
  body.appendChild(info);

  // Value column
  const valueBlock = document.createElement('div');
  valueBlock.className = 'metric-value-block';
  const valStr = fmtVal(entry.computed, metric.unit);
  const badge = metric.direction === 'trend' ? 'trend' : (rag || null);
  // For dual mode, show breakdown pills under value
  let dualBreakdown = '';
  if (metric.mode === 'dual' && entry.inputs) {
    const choice = entry.inputs.choice || (entry.inputs.b !== null && entry.inputs.b !== undefined && Number(entry.inputs.b) > 0 ? 'mdm_only' : 'vpn_only');
    const aVal = (entry.inputs.a !== null && entry.inputs.a !== undefined) ? entry.inputs.a : (entry.inputs.value !== undefined ? entry.inputs.value : null);
    const bVal = (entry.inputs.b !== null && entry.inputs.b !== undefined) ? entry.inputs.b : null;
    if (choice === 'mdm_only' && bVal !== null) {
      dualBreakdown = `<div class="dual-badge-pill"><span class="pill-tag">MDM: ${bVal}</span></div>`;
    } else if (aVal !== null) {
      dualBreakdown = `<div class="dual-badge-pill"><span class="pill-tag">VPN: ${aVal}</span></div>`;
    }
  }
  valueBlock.innerHTML = `
    <div class="metric-value ${badge || ''}">${valStr !== null ? valStr : '<span class="metric-value-empty">-</span>'}</div>
    ${badge ? `<div class="metric-badge ${badge}">${badge === 'trend' ? 'TREND' : badge.toUpperCase()}</div>` : ''}
    ${dualBreakdown}
  `;
  body.appendChild(valueBlock);

  // Inputs column with custom Up/Down Stepper
  const inputsBlock = document.createElement('div');
  inputsBlock.className = 'metric-inputs';

  const hasStoredData = entry.inputs && Object.values(entry.inputs).some(v => v !== null && v !== undefined && v !== '');

  if (metric.mode === 'direct') {
    inputsBlock.appendChild(miniField('value', 'Value', entry.inputs && entry.inputs.value));
  } else if (metric.mode === 'dual') {
    // Dual mode with Scope Switch: [ VPN Only ] vs [ MDM Only ]
    let currentChoice = (entry.inputs && entry.inputs.choice)
      ? entry.inputs.choice
      : (entry.inputs && entry.inputs.b !== null && entry.inputs.b !== undefined && Number(entry.inputs.b) > 0 ? 'mdm_only' : 'vpn_only');

    const scopeWrap = document.createElement('div');
    scopeWrap.className = 'scope-selector-wrap';
    scopeWrap.innerHTML = `
      <span class="scope-label">Enrollment Scope:</span>
      <div class="scope-pill-group">
        <button type="button" class="scope-btn ${currentChoice === 'vpn_only' ? 'active' : ''}" data-choice="vpn_only" title="Track VPN enrolled mobile devices only">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6.5" width="10" height="7.5" rx="1.5"/><path d="M5.5 6.5V4.5a2.5 2.5 0 015 0v2.5"/></svg>
          <span>VPN Only</span>
        </button>
        <button type="button" class="scope-btn ${currentChoice === 'mdm_only' ? 'active' : ''}" data-choice="mdm_only" title="Track MDM enrolled devices only">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="4.5" y="2" width="7" height="12" rx="1.5"/><path d="M7 11.5h2"/></svg>
          <span>MDM Only</span>
        </button>
      </div>
    `;
    inputsBlock.appendChild(scopeWrap);

    const fieldsRow = document.createElement('div');
    fieldsRow.className = 'dual-fields-row';

    const rawA = entry.inputs ? (entry.inputs.a !== undefined && entry.inputs.a !== null ? entry.inputs.a : entry.inputs.value) : '';
    const rawB = entry.inputs && entry.inputs.b !== undefined && entry.inputs.b !== null ? entry.inputs.b : '';

    const aField = miniField('a', metric.aLabel || 'VPN Enrolled', rawA);
    const bField = miniField('b', metric.bLabel || 'MDM Enrolled', rawB);
    fieldsRow.appendChild(aField);
    fieldsRow.appendChild(bField);
    inputsBlock.appendChild(fieldsRow);

    const totalRow = document.createElement('div');
    totalRow.className = 'dual-total-row';

    function refreshDualUI() {
      const isMDM = currentChoice === 'mdm_only';
      // Show only the relevant field
      aField.style.display = isMDM ? 'none' : '';
      bField.style.display = isMDM ? '' : 'none';
      if (isMDM) {
        const bVal = parseFloat(bField.querySelector('input').value) || 0;
        totalRow.innerHTML = `<span class="total-text">Total: <strong class="total-highlight">${bVal}</strong> (${bVal} MDM Only)</span>`;
      } else {
        const aVal = parseFloat(aField.querySelector('input').value) || 0;
        totalRow.innerHTML = `<span class="total-text">Total: <strong class="total-highlight">${aVal}</strong> (${aVal} VPN Only)</span>`;
      }
    }

    scopeWrap.querySelectorAll('.scope-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentChoice = btn.dataset.choice;
        scopeWrap.querySelectorAll('.scope-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        refreshDualUI();
      });
    });

    [aField, bField].forEach(f => f.querySelector('input').addEventListener('input', refreshDualUI));
    refreshDualUI();
    inputsBlock.appendChild(totalRow);
  } else if (metric.mode === 'ratio') {
    inputsBlock.appendChild(miniField('num', metric.numLabel, entry.inputs && entry.inputs.num));
    // For metrics using managed_endpoints as denominator, pre-populate from managed_endpoints stored value
    const isManagedEndpointsDen = metric.denLabel === 'Managed endpoints';
    let denVal = entry.inputs && entry.inputs.den;
    if (isManagedEndpointsDen && (denVal === undefined || denVal === null || denVal === '')) {
      const meEntry = state.monthData.metrics['managed_endpoints'];
      if (meEntry && meEntry.computed !== null && meEntry.computed !== undefined) {
        denVal = meEntry.computed;
      } else if (meEntry && meEntry.inputs && meEntry.inputs.value !== null && meEntry.inputs.value !== undefined) {
        denVal = meEntry.inputs.value;
      }
    }
    const denLabelDisplay = isManagedEndpointsDen ? 'Managed endpoints ↑' : metric.denLabel;
    const denField = miniField('den', denLabelDisplay, denVal);
    if (isManagedEndpointsDen) {
      const denInp = denField.querySelector('input');
      if (denInp) {
        denInp.setAttribute('data-managed-endpoints-den', 'true');
        denInp.title = 'Auto-populated from Managed Endpoints — update the Managed Endpoints value above to change';
      }
      const denLabel = denField.querySelector('label');
      if (denLabel) {
        denLabel.style.color = 'var(--accent, #6366f1)';
        denLabel.style.fontStyle = 'italic';
        denLabel.title = 'This value is automatically sourced from Managed Endpoints';
      }
    }
    inputsBlock.appendChild(denField);

  } else if (metric.mode === 'avg') {
    inputsBlock.appendChild(miniField('total', metric.totalLabel, entry.inputs && entry.inputs.total));
    inputsBlock.appendChild(miniField('count', metric.countLabel, entry.inputs && entry.inputs.count));
  } else if (metric.mode === 'derived') {
    const note = document.createElement('div');
    note.className = 'derived-note';
    note.textContent = 'Auto-computed from ' + metric.deriveFrom.map(id => {
      const mm = state.metrics.find(x => x.id === id);
      return mm ? mm.label : id;
    }).join(' & ');
    inputsBlock.appendChild(note);
  }

  if (metric.mode !== 'derived') {
    const canWrite = hasPermission('metrics:write');
    const canClear = hasPermission('metrics:clear');

    if (canWrite) {
      const saveBtn = document.createElement('button');
      saveBtn.className = 'btn btn-primary metric-save';
      saveBtn.textContent = 'Save';
      saveBtn.title = 'Save or update data for ' + state.month;
      saveBtn.addEventListener('click', () => saveMetric(metric, wrap));
      inputsBlock.appendChild(saveBtn);
    } else {
      // Viewer: show read-only pill instead of Save
      const roPill = document.createElement('span');
      roPill.className = 'readonly-pill';
      roPill.textContent = 'View Only';
      roPill.title = 'Your role does not allow editing metrics';
      inputsBlock.appendChild(roPill);
    }

    if (canClear && hasStoredData) {
      const clearBtn = document.createElement('button');
      clearBtn.className = 'btn btn-clear';
      clearBtn.innerHTML = `${ICONS.reset} <span>Clear</span>`;
      clearBtn.title = 'Clear/reset stored data for this metric in ' + state.month;
      clearBtn.addEventListener('click', () => clearMetric(metric, wrap));
      inputsBlock.appendChild(clearBtn);
    }
  }

  // History button if records exist
  if (historyList && historyList.length > 0) {
    const histBtn = document.createElement('button');
    histBtn.className = 'btn btn-history';
    histBtn.innerHTML = `${ICONS.history} <span>History (${historyList.length})</span>`;
    histBtn.title = 'View, restore, or delete past entries';
    histBtn.addEventListener('click', () => {
      state.activeHistoryCard = state.activeHistoryCard === metric.id ? null : metric.id;
      renderView();
    });
    inputsBlock.appendChild(histBtn);
  }

  body.appendChild(inputsBlock);
  cardTop.appendChild(body);
  wrap.appendChild(cardTop);

  // Render collapsible History Drawer with both RESTORE and DELETE buttons
  if (state.activeHistoryCard === metric.id && historyList.length > 0) {
    const drawer = document.createElement('div');
    drawer.className = 'history-drawer';

    let itemsHtml = '';
    historyList.forEach((h, idx) => {
      const dateStr = new Date(h.timestamp).toLocaleString();
      const valDisplay = h.computed !== undefined && h.computed !== null ? fmtVal(h.computed, metric.unit) : '(Cleared)';
      const inputsStr = Object.entries(h.inputs || h.previousInputs || {}).map(([k, v]) => `${k}:${v}`).join(', ');
      const actBadge = h.action === 'clear' ? '<span class="mini-pill red" style="font-size:10px; padding:1px 5px;">CLEAR</span>' : '<span class="mini-pill green" style="font-size:10px; padding:1px 5px;">SAVED</span>';
      const userTag = h.user ? `<span class="hist-user" style="color:var(--text-dim, #64748b); font-size:11px;">by <strong>@${escapeHTML(h.user)}</strong></span> &middot; ` : '';

      const canRestore = hasPermission('history:restore');
      const canDelete = hasPermission('history:delete');
      itemsHtml += `
        <div class="history-item">
          <div class="hist-info">
            ${actBadge}
            ${userTag}
            <span class="hist-time">${dateStr}</span> &middot; 
            <span class="hist-val">${valDisplay}</span> 
            ${inputsStr ? `<span class="hist-inputs">(${inputsStr})</span>` : ''}
          </div>
          <div class="hist-btn-group">
            ${canRestore ? `
              <button type="button" class="btn-restore" data-idx="${idx}" title="Restore this past state">
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 8a5.5 5.5 0 101.2-3.4M2.5 3.5v4.5h4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>Restore</span>
              </button>
            ` : ''}
            ${canDelete ? `
              <button type="button" class="btn-delete-hist" data-idx="${idx}" title="Permanently delete this entry from history">
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4.5h10M6 4.5V3a1 1 0 011-1h2a1 1 0 011 1v1.5M5 4.5v8a1 1 0 001 1h4a1 1 0 001-1v-8" stroke-linecap="round"/></svg>
                <span>Delete</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    });

    const canClearAll = hasPermission('history:clear_all');
    drawer.innerHTML = `
      <div class="history-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span>Change History &middot; Past Entries for ${metric.label}</span>
          <span class="mini-pill trend" style="font-size:10.5px;">${historyList.length} records</span>
        </div>
        ${canClearAll ? `
          <button type="button" class="btn-clear-all-hist" title="Remove all history entries for this metric">
            Clear All
          </button>
        ` : ''}
      </div>
      <div class="history-list">${itemsHtml}</div>
    `;

    drawer.querySelectorAll('.btn-restore').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        restoreMetricHistory(metric, historyList[idx]);
      });
    });

    drawer.querySelectorAll('.btn-delete-hist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        deleteMetricHistory(metric, idx);
      });
    });

    if (canClearAll) {
      const clearAllBtn = drawer.querySelector('.btn-clear-all-hist');
      if (clearAllBtn) {
        clearAllBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          clearAllMetricHistory(metric);
        });
      }
    }

    wrap.appendChild(drawer);
  }

  return wrap;
}

// Custom Stepper Field with Up (▲) & Down (▼) Buttons
function miniField(key, label, value) {
  const canWrite = hasPermission('metrics:write');
  const f = document.createElement('div');
  f.className = 'mini-field';
  const val = value !== undefined && value !== null ? value : '';
  f.innerHTML = `
    <label title="${label || ''}">${label || key}</label>
    <div class="stepper-wrap">
      <input type="number" step="any" data-key="${key}" value="${val}" ${!canWrite ? 'readonly class="field-readonly"' : ''}>
      ${canWrite ? `
      <div class="stepper-controls">
        <button type="button" class="stepper-btn stepper-up" title="Increase value">
          <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M2 8L6 4L10 8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button type="button" class="stepper-btn stepper-down" title="Decrease value">
          <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M2 4L6 8L10 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>` : ''}
    </div>
  `;

  if (canWrite) {
    const inp = f.querySelector('input');
    const upBtn = f.querySelector('.stepper-up');
    const downBtn = f.querySelector('.stepper-down');

    function adjust(delta) {
      let cur = parseFloat(inp.value);
      if (isNaN(cur)) cur = 0;
      let next = Math.round((cur + delta) * 100) / 100;
      if (next < 0) next = 0;
      inp.value = next;
      inp.dispatchEvent(new Event('input', { bubbles: true }));
      inp.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (upBtn) {
      upBtn.addEventListener('click', (e) => {
        e.preventDefault();
        adjust(1);
      });
    }

    if (downBtn) {
      downBtn.addEventListener('click', (e) => {
        e.preventDefault();
        adjust(-1);
      });
    }
  }

  return f;
}

async function saveMetric(metric, cardEl) {
  const inputs = {};
  cardEl.querySelectorAll('.mini-field input').forEach(inp => {
    inputs[inp.dataset.key] = inp.value === '' ? null : Number(inp.value);
  });
  if (metric.mode === 'dual') {
    const activeBtn = cardEl.querySelector('.scope-btn.active');
    inputs.choice = activeBtn ? activeBtn.dataset.choice : 'vpn_only';
    if (inputs.choice === 'vpn_only') {
      inputs.b = null;
    } else if (inputs.choice === 'mdm_only') {
      inputs.a = null;
    }
  }
  const saveBtn = cardEl.querySelector('.metric-save');
  saveBtn.textContent = 'Saving…';
  saveBtn.disabled = true;
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, inputs }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    updateTopbarRAG();
    updateSectionDots();
    await loadMonthsHistory();
    showToast('Saved · ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not save: ' + err.message, 'red');
    saveBtn.textContent = 'Save';
    saveBtn.disabled = false;
  }
}

async function clearMetric(metric, cardEl) {
  if (!confirm(`Are you sure you want to clear stored data for "${metric.label}" in ${state.month}? (A backup will remain in History)`)) {
    return;
  }
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, action: 'clear' }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    updateTopbarRAG();
    updateSectionDots();
    await loadMonthsHistory();
    showToast('Cleared · ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not clear: ' + err.message, 'red');
  }
}

async function restoreMetricHistory(metric, histEntry) {
  try {
    const inputsToRestore = histEntry.inputs || histEntry.previousInputs || {};
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, inputs: inputsToRestore }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    updateTopbarRAG();
    updateSectionDots();
    await loadMonthsHistory();
    showToast('Restored previous value for ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not restore: ' + err.message, 'red');
  }
}

async function deleteMetricHistory(metric, index) {
  if (!confirm(`Delete this history record for "${metric.label}"?`)) return;
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, action: 'delete_history_item', historyIndex: index }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    showToast('History entry deleted', 'green');
    renderView();
  } catch (err) {
    showToast('Could not delete history: ' + err.message, 'red');
  }
}

async function clearAllMetricHistory(metric) {
  if (!confirm(`Clear ALL history entries for "${metric.label}" in ${state.month}?`)) return;
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, action: 'clear_all_history' }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    showToast('All history cleared for ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not clear history: ' + err.message, 'red');
  }
}

// ---------- Executive Summary ----------
function renderExecSummary() {
  const frag = document.createElement('div');

  const reds = [], ambers = [];
  state.metrics.forEach(m => {
    const entry = state.monthData.metrics[m.id];
    if (!entry || !entry.rag) return;
    const targetStr = m.target !== null && m.target !== undefined ? `target ${m.direction === 'higher' ? '≥' : '≤'} ${m.target}${m.unit || ''}` : (m.ragRule === 'binary0' ? 'target 0' : '');
    const row = { label: m.label, value: fmtVal(entry.computed, m.unit), targetStr };
    if (entry.rag === 'red') reds.push(row);
    else if (entry.rag === 'amber') ambers.push(row);
  });

  // 1. Top risks auto-detected
  const heading = document.createElement('div');
  heading.className = 'section-heading';
  heading.innerHTML = `${ICONS.file}<h2>Top Risks &middot; System Identified (${state.month})</h2>`;
  frag.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'risk-list';
  if (!reds.length && !ambers.length) {
    list.innerHTML = `<div class="empty-note">No RED or AMBER metric threshold breaches for ${state.month}. Security posture is within acceptable parameters.</div>`;
  } else {
    reds.forEach(r => {
      list.innerHTML += `<div class="risk-row"><div class="risk-row-label">${r.label}</div><div class="risk-row-value">${r.value} &middot; ${r.targetStr}</div></div>`;
    });
    ambers.forEach(r => {
      list.innerHTML += `<div class="risk-row amber"><div class="risk-row-label">${r.label}</div><div class="risk-row-value">${r.value} &middot; ${r.targetStr}</div></div>`;
    });
  }
  frag.appendChild(list);

  // 2. Published / Active Executive Briefing Card
  const narrative = state.monthData.narrative || {};
  const hasNarrative = Boolean(
    (narrative.topRisks && narrative.topRisks.trim()) ||
    (narrative.improvements && narrative.improvements.trim()) ||
    (narrative.plannedActions && narrative.plannedActions.trim())
  );

  const briefingSection = document.createElement('div');
  briefingSection.className = 'panel exec-briefing-panel';
  briefingSection.style.marginTop = '24px';
  
  briefingSection.innerHTML = `
    <div class="exec-briefing-header">
      <div>
        <div class="panel-title" style="margin-bottom:4px;">Published Executive Briefing &middot; ${state.month}</div>
        <div style="font-size:12px; color:var(--text-faint);">
          ${hasNarrative ? `Status: <span style="color:var(--green); font-weight:700;">SAVED & PUBLISHED</span>` : `Status: <span style="color:var(--amber); font-weight:700;">DRAFT (NO SUMMARY SAVED YET)</span>`}
          ${narrative.updatedAt ? `&middot; Last updated: ${new Date(narrative.updatedAt).toLocaleString()}` : ''}
        </div>
      </div>
      <div class="exec-actions-bar">
        <button id="btn-print-briefing" class="btn btn-sm" title="Print or Export Briefing as PDF">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7V3h10v4M5 15H3a1 1 0 01-1-1V9a1 1 0 011-1h14a1 1 0 011 1v5a1 1 0 01-1 1h-2M5 11h10v6H5v-6z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Print / PDF</span>
        </button>
        <button id="btn-jump-editor" class="btn btn-primary btn-sm" title="Edit and update summary below">
          <span>Edit Summary</span>
        </button>
      </div>
    </div>

    <div class="exec-briefing-body">
      ${hasNarrative ? `
        <div class="briefing-card-grid">
          <div class="briefing-card card-risks">
            <div class="briefing-card-title">
              <span class="briefing-icon">⚠️</span>
              <span>1. Top Operational Risks (Client Notes)</span>
            </div>
            <div class="briefing-card-content">${escapeHTML(narrative.topRisks) || '<em style="color:var(--text-faint)">No specific risk notes provided.</em>'}</div>
          </div>

          <div class="briefing-card card-improvements">
            <div class="briefing-card-title">
              <span class="briefing-icon">🚀</span>
              <span>2. Key Improvements Delivered</span>
            </div>
            <div class="briefing-card-content">${escapeHTML(narrative.improvements) || '<em style="color:var(--text-faint)">No improvement items logged.</em>'}</div>
          </div>

          <div class="briefing-card card-actions">
            <div class="briefing-card-title">
              <span class="briefing-icon">🎯</span>
              <span>3. Planned Actions & Milestones (Next Month)</span>
            </div>
            <div class="briefing-card-content">${escapeHTML(narrative.plannedActions) || '<em style="color:var(--text-faint)">No planned actions specified.</em>'}</div>
          </div>
        </div>
      ` : `
        <div class="empty-briefing-prompt">
          <div style="font-size:26px; margin-bottom:8px;">📋</div>
          <div style="font-weight:700; font-size:14.5px; margin-bottom:6px; color:#111827;">No Executive Summary Saved For ${state.month}</div>
          <div style="color:var(--text-dim); font-size:12.5px; max-width:500px; margin:0 auto 16px;">
            Fill in the notes below and click <strong>"Save Summary"</strong>. Once saved, your summary will be published here and displayed on the Overview dashboard.
          </div>
        </div>
      `}
    </div>
  `;

  frag.appendChild(briefingSection);

  // 3. Executive Summary Editor Form
  const canWriteNarrative = hasPermission('narrative:write');
  const editorHeading = document.createElement('div');
  editorHeading.className = 'section-heading';
  editorHeading.style.marginTop = '28px';
  editorHeading.id = 'summary-editor-anchor';
  editorHeading.innerHTML = `<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13.5 3.5l3 3L6 17H3v-3L13.5 3.5z" stroke-linejoin="round"/></svg><h2>Executive Summary Editor &middot; ${state.month}</h2>`;
  frag.appendChild(editorHeading);

  const narrativeWrap = document.createElement('div');
  narrativeWrap.className = 'narrative-grid';
  narrativeWrap.innerHTML = `
    <div class="narrative-field">
      <label>1. Top Risks (Notes for the client &amp; stakeholder review)</label>
      <textarea id="n-topRisks" placeholder="Key risks carried into next month..." ${!canWriteNarrative ? 'readonly class="field-readonly"' : ''}>${narrative.topRisks || ''}</textarea>
    </div>
    <div class="narrative-field">
      <label>2. Key Improvements Delivered This Month</label>
      <textarea id="n-improvements" placeholder="Improvements delivered this month..." ${!canWriteNarrative ? 'readonly class="field-readonly"' : ''}>${narrative.improvements || ''}</textarea>
    </div>
    <div class="narrative-field">
      <label>3. Planned Actions &amp; Objectives — Next Month</label>
      <textarea id="n-plannedActions" placeholder="Committed actions for the next reporting period..." ${!canWriteNarrative ? 'readonly class="field-readonly"' : ''}>${narrative.plannedActions || ''}</textarea>
    </div>
    <div class="editor-btn-row">
      ${canWriteNarrative ? `
        <button id="save-narrative" class="btn btn-primary" style="padding:10px 24px; font-size:13.5px;">
          <span>Save Summary</span>
        </button>
        <span style="font-size:12px; color:var(--text-faint); margin-left:10px;">Saved summaries instantly publish to the Briefing card above and the Overview screen.</span>
      ` : `
        <div class="readonly-banner">
          🔒 <strong>Read-Only Mode</strong> &middot; Your role does not allow editing the executive summary.
        </div>
      `}
    </div>
  `;
  frag.appendChild(narrativeWrap);

  // Event handlers
  const printBtn = briefingSection.querySelector('#btn-print-briefing');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  const jumpBtn = briefingSection.querySelector('#btn-jump-editor');
  if (jumpBtn) {
    jumpBtn.addEventListener('click', () => {
      document.getElementById('summary-editor-anchor').scrollIntoView({ behavior: 'smooth' });
      document.getElementById('n-topRisks').focus();
    });
  }

  if (canWriteNarrative) {
  const saveNarrativeBtn = narrativeWrap.querySelector('#save-narrative');
  if (saveNarrativeBtn) {
    saveNarrativeBtn.addEventListener('click', async (e) => {
      e.target.textContent = 'Saving…';
      e.target.disabled = true;
      try {
        const topRisks = document.getElementById('n-topRisks').value;
        const improvements = document.getElementById('n-improvements').value;
        const plannedActions = document.getElementById('n-plannedActions').value;
        const res = await api('/api/narrative', {
          method: 'POST',
          body: JSON.stringify({
            month: state.month,
            topRisks,
            improvements,
            plannedActions,
          }),
        });
        state.monthData.narrative = res.narrative || { topRisks, improvements, plannedActions, updatedAt: new Date().toISOString() };
        await loadMonthsHistory();
        showToast('Executive summary saved successfully!', 'green');
        renderView();
      } catch (err) {
        showToast('Could not save summary: ' + err.message, 'red');
        e.target.textContent = 'Save Summary';
        e.target.disabled = false;
      }
    });
  }
  } // end canWriteNarrative

  return frag;
}

// ---------- User Management View (Super Admin Only) ----------
function renderUserManagement() {
  const frag = document.createElement('div');
  frag.className = 'users-mgmt-view';

  frag.innerHTML = `
    <div class="users-header-row">
      <div class="users-header-info">
        <h3>Operator Directory & Access Control</h3>
        <p>Manage cybersecurity console operators, provision accounts, configure roles, and manage clearances.</p>
      </div>
      <button id="btn-toggle-add-user" class="btn btn-primary">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 4v12M4 10h12" stroke-linecap="round"/></svg>
        <span>Add Operator</span>
      </button>
    </div>

    <!-- Collapsible Add User Form -->
    <div id="add-user-panel" class="user-form-card" style="display: none;">
      <div class="form-title">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 3a4 4 0 100 8 4 4 0 000-8zM4 17a6 6 0 0112 0" stroke-linecap="round"/></svg>
        <span>Provision New Console Operator</span>
      </div>
      <form id="create-user-form" class="user-grid-form">
        <div class="user-field">
          <label>Username *</label>
          <input type="text" id="nu-username" placeholder="e.g. operator.one" required autocomplete="off">
        </div>
        <div class="user-field">
          <label>Display Name</label>
          <input type="text" id="nu-display" placeholder="e.g. John Doe" autocomplete="off">
        </div>
        <div class="user-field">
          <label>Initial Password *</label>
          <input type="password" id="nu-password" placeholder="Min. 4 characters" required autocomplete="new-password">
        </div>
        <div class="user-field">
          <label>Clearance Role *</label>
          <select id="nu-role">
            <option value="viewer">Client / Viewer (Read-only)</option>
            <option value="editor">Editor (Metric Entry & Narrative)</option>
            <option value="admin">Admin (Read/Write, History Controls)</option>
            <option value="superadmin">Super Admin (Full Access & User Control)</option>
          </select>
        </div>
        <div class="user-form-actions">
          <button type="submit" class="btn btn-primary" id="btn-submit-create-user">Provision</button>
          <button type="button" class="btn btn-clear" id="btn-cancel-create-user">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Users Table Container -->
    <div class="users-table-card">
      <div id="users-loading" class="users-loading" style="padding: 24px; text-align: center; color: var(--text-dim, #64748b);">Loading operator directory...</div>
      <div id="users-table-wrap" style="display: none;">
        <table class="users-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Clearance Tier</th>
              <th>Account Status</th>
              <th>Created</th>
              <th>Last Active</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody id="users-tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  const addPanel = frag.querySelector('#add-user-panel');
  const toggleBtn = frag.querySelector('#btn-toggle-add-user');
  const cancelBtn = frag.querySelector('#btn-cancel-create-user');
  const form = frag.querySelector('#create-user-form');

  toggleBtn.addEventListener('click', () => {
    const isHidden = addPanel.style.display === 'none';
    addPanel.style.display = isHidden ? 'block' : 'none';
    toggleBtn.classList.toggle('active', isHidden);
  });

  cancelBtn.addEventListener('click', () => {
    addPanel.style.display = 'none';
    form.reset();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('nu-username').value.trim();
    const displayName = document.getElementById('nu-display').value.trim() || username;
    const password = document.getElementById('nu-password').value;
    const role = document.getElementById('nu-role').value;
    const submitBtn = document.getElementById('btn-submit-create-user');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Provisioning...';
    try {
      await api('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, displayName, password, role }),
      });
      showToast('Operator @' + username + ' provisioned successfully', 'green');
      form.reset();
      addPanel.style.display = 'none';
      await loadUsersList(frag);
    } catch (err) {
      showToast('Could not provision operator: ' + err.message, 'red');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Provision';
    }
  });

  loadUsersList(frag);
  return frag;
}

async function loadUsersList(container) {
  const loadingEl = container.querySelector('#users-loading');
  const tableWrap = container.querySelector('#users-table-wrap');
  const tbody = container.querySelector('#users-tbody');
  if (!loadingEl || !tbody) return;

  try {
    const res = await api('/api/users');
    loadingEl.style.display = 'none';
    tableWrap.style.display = 'block';
    tbody.innerHTML = '';

    res.users.forEach(u => {
      const tr = document.createElement('tr');
      const isSelf = (u.username.toLowerCase() === (state.username || '').toLowerCase());
      const roleBadgeClass = u.role || 'viewer';
      const isStatusActive = (u.status || 'active') === 'active';

      tr.innerHTML = `
        <td>
          <div class="user-row-meta">
            <div class="user-row-avatar">${escapeHTML(u.displayName || u.username).charAt(0).toUpperCase()}</div>
            <div>
              <div class="user-row-name">${escapeHTML(u.displayName || u.username)} ${isSelf ? '<span class="self-tag">(You)</span>' : ''}</div>
              <div class="user-row-username">@${escapeHTML(u.username)}</div>
            </div>
          </div>
        </td>
        <td>
          <select class="user-role-select ${roleBadgeClass}" data-user-id="${u.id}" ${isSelf ? 'disabled title="Cannot change your own role"' : ''}>
            <option value="superadmin" ${u.role === 'superadmin' ? 'selected' : ''}>Super Admin</option>
            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="editor" ${u.role === 'editor' ? 'selected' : ''}>Editor</option>
            <option value="viewer" ${u.role === 'viewer' ? 'selected' : ''}>Client / Viewer</option>
          </select>
        </td>
        <td>
          <span class="user-status-badge ${isStatusActive ? 'active' : 'disabled'}">
            ${isStatusActive ? 'Active' : 'Disabled'}
          </span>
        </td>
        <td class="user-date-cell">${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}</td>
        <td class="user-date-cell">${u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '<span style="color:var(--text-faint, #94a3b8)">Never</span>'}</td>
        <td style="text-align:right;">
          <div class="user-actions-group">
            <button type="button" class="btn-user-status ${isStatusActive ? 'disable' : 'enable'}" data-user-id="${u.id}" data-username="${escapeHTML(u.username)}" title="${isStatusActive ? 'Disable operator account' : 'Enable operator account'}" ${isSelf ? 'disabled style="opacity:0.4;cursor:not-allowed;" title="Cannot disable your own account"' : ''}>
              ${isStatusActive ? 'Disable' : 'Enable'}
            </button>
            <button type="button" class="btn-user-pwd" data-user-id="${u.id}" data-username="${escapeHTML(u.username)}" title="Reset operator password">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="11" r="3"/><path d="M7.5 8.5L14 2M11 5l2 2M13 3l2 2" stroke-linecap="round"/></svg>
              <span>Reset Pass</span>
            </button>
            <button type="button" class="btn-user-delete" data-user-id="${u.id}" data-username="${escapeHTML(u.username)}" title="Delete operator account" ${isSelf ? 'disabled style="opacity:0.3;cursor:not-allowed;" title="Cannot delete your own account"' : ''}>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4.5h10M6 4.5V3a1 1 0 011-1h2a1 1 0 011 1v1.5M5 4.5v8a1 1 0 001 1h4a1 1 0 001-1v-8" stroke-linecap="round"/></svg>
            </button>
          </div>
        </td>
      `;

      const roleSelect = tr.querySelector('.user-role-select');
      if (roleSelect && !isSelf) {
        roleSelect.addEventListener('change', async (e) => {
          const newRole = e.target.value;
          try {
            await api('/api/users/' + u.id, {
              method: 'PUT',
              body: JSON.stringify({ role: newRole }),
            });
            showToast('Role updated for @' + u.username, 'green');
            roleSelect.className = 'user-role-select ' + newRole;
          } catch (err) {
            showToast('Could not update role: ' + err.message, 'red');
            roleSelect.value = u.role;
          }
        });
      }

      const statusBtn = tr.querySelector('.btn-user-status');
      if (statusBtn && !isSelf) {
        statusBtn.addEventListener('click', async () => {
          const isCurrentlyActive = (u.status || 'active') === 'active';
          if (isCurrentlyActive) {
            if (!confirm(`Are you sure you want to disable operator @${u.username}? They will no longer be able to log in or use active sessions.`)) return;
          }
          try {
            await api('/api/users/status', {
              method: 'POST',
              body: JSON.stringify({ id: u.id, status: isCurrentlyActive ? 'disabled' : 'active' }),
            });
            showToast(`Operator @${u.username} ${isCurrentlyActive ? 'disabled' : 'enabled'} successfully`, 'green');
            await loadUsersList(container);
          } catch (err) {
            showToast(`Could not update status: ${err.message}`, 'red');
          }
        });
      }

      const pwdBtn = tr.querySelector('.btn-user-pwd');
      if (pwdBtn) {
        pwdBtn.addEventListener('click', async () => {
          const newPass = prompt(`Enter new password for operator @${u.username}:`);
          if (newPass === null) return;
          if (!newPass.trim()) {
            showToast('Password cannot be empty', 'red');
            return;
          }
          try {
            await api('/api/users/reset-password', {
              method: 'POST',
              body: JSON.stringify({ id: u.id, password: newPass.trim() }),
            });
            showToast(`Password reset successfully for @${u.username}`, 'green');
          } catch (err) {
            showToast(`Password reset failed: ${err.message}`, 'red');
          }
        });
      }

      const delBtn = tr.querySelector('.btn-user-delete');
      if (delBtn && !isSelf) {
        delBtn.addEventListener('click', async () => {
          if (!confirm(`Are you sure you want to permanently delete operator @${u.username}?`)) return;
          try {
            await api('/api/users/' + u.id, { method: 'DELETE' });
            showToast(`Operator @${u.username} permanently removed`, 'green');
            await loadUsersList(container);
          } catch (err) {
            showToast(`Could not delete operator: ${err.message}`, 'red');
          }
        });
      }

      tbody.appendChild(tr);
    });
  } catch (err) {
    loadingEl.textContent = 'Could not load operators: ' + err.message;
  }
}

// ---------- Audit Logs View (Super Admin Only) ----------
function renderAuditLogs() {
  const frag = document.createElement('div');
  frag.className = 'audit-mgmt-view';

  frag.innerHTML = `
    <div class="audit-header-row">
      <div class="audit-header-info">
        <h3>Security Audit Logs & Compliance Trail</h3>
        <p>Immutable forensic record of administrative actions, clearance modifications, and authentication events.</p>
      </div>
      <button id="btn-refresh-audit" class="btn btn-clear">
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Refresh Logs</span>
      </button>
    </div>

    <!-- Filter Card -->
    <div class="audit-filters-card">
      <form id="audit-filter-form" class="audit-filters-grid">
        <div class="audit-field">
          <label>Action Type</label>
          <select id="flt-action">
            <option value="">All Actions</option>
            <option value="USER_CREATED">USER_CREATED</option>
            <option value="PASSWORD_RESET">PASSWORD_RESET</option>
            <option value="USER_DISABLED">USER_DISABLED</option>
            <option value="USER_ENABLED">USER_ENABLED</option>
            <option value="ROLE_CHANGED">ROLE_CHANGED</option>
            <option value="USER_DELETED">USER_DELETED</option>
            <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
            <option value="LOGIN_FAILED">LOGIN_FAILED</option>
            <option value="LOGIN_THROTTLED">LOGIN_THROTTLED</option>
          </select>
        </div>
        <div class="audit-field">
          <label>User (Actor or Target)</label>
          <input type="text" id="flt-user" placeholder="e.g. Jeeva, operator..." autocomplete="off">
        </div>
        <div class="audit-field">
          <label>From Date</label>
          <input type="date" id="flt-from">
        </div>
        <div class="audit-field">
          <label>To Date</label>
          <input type="date" id="flt-to">
        </div>
        <div class="audit-filter-actions">
          <button type="submit" class="btn btn-primary" id="btn-apply-filters">Filter</button>
          <button type="button" class="btn btn-clear" id="btn-reset-filters">Reset</button>
        </div>
      </form>
    </div>

    <!-- Audit Events Table Card -->
    <div class="audit-table-card">
      <div class="audit-table-topbar">
        <span id="audit-count-badge" class="audit-count-badge">0 events</span>
      </div>
      <div id="audit-loading" class="audit-loading" style="padding: 24px; text-align: center; color: var(--text-dim, #64748b);">Loading audit trail...</div>
      <div id="audit-table-wrap" style="display: none;">
        <table class="audit-table">
          <thead>
            <tr>
              <th>Timestamp (IST)</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Target</th>
              <th>Result</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody id="audit-tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  const form = frag.querySelector('#audit-filter-form');
  const resetBtn = frag.querySelector('#btn-reset-filters');
  const refreshBtn = frag.querySelector('#btn-refresh-audit');

  function getFilters() {
    return {
      action: frag.querySelector('#flt-action').value.trim(),
      user: frag.querySelector('#flt-user').value.trim(),
      from: frag.querySelector('#flt-from').value.trim(),
      to: frag.querySelector('#flt-to').value.trim(),
    };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadAuditEvents(frag, getFilters());
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    loadAuditEvents(frag, {});
  });

  refreshBtn.addEventListener('click', () => {
    loadAuditEvents(frag, getFilters());
  });

  loadAuditEvents(frag, {});
  return frag;
}

async function loadAuditEvents(container, filters = {}) {
  const loadingEl = container.querySelector('#audit-loading');
  const tableWrap = container.querySelector('#audit-table-wrap');
  const tbody = container.querySelector('#audit-tbody');
  const countBadge = container.querySelector('#audit-count-badge');
  if (!loadingEl || !tbody) return;

  loadingEl.style.display = 'block';
  loadingEl.textContent = 'Loading audit trail...';
  tableWrap.style.display = 'none';

  const params = new URLSearchParams();
  if (filters.action) params.set('action', filters.action);
  if (filters.user) params.set('user', filters.user);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);

  const queryStr = params.toString() ? '?' + params.toString() : '';

  try {
    const res = await api('/api/audit' + queryStr);
    loadingEl.style.display = 'none';
    tableWrap.style.display = 'block';
    tbody.innerHTML = '';

    const events = (res.events || []).slice().reverse(); // newest first
    if (countBadge) countBadge.textContent = `${events.length} event${events.length === 1 ? '' : 's'}`;

    if (events.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 24px; color: var(--text-dim, #64748b);">No audit events match the selected criteria.</td></tr>`;
      return;
    }

    events.forEach(ev => {
      const tr = document.createElement('tr');
      const isSuccess = (ev.result || '').toUpperCase() === 'SUCCESS';
      const actionClass = (ev.action || 'OTHER').toLowerCase();
      
      // Formatted details
      let detailsStr = '-';
      if (ev.details && typeof ev.details === 'object' && Object.keys(ev.details).length > 0) {
        detailsStr = Object.entries(ev.details)
          .map(([k, v]) => `${escapeHTML(k)}: ${escapeHTML(String(v))}`)
          .join(', ');
      }

      tr.innerHTML = `
        <td class="audit-time-cell">${ev.timestamp ? formatIST(ev.timestamp) : '-'}</td>
        <td>
          <div class="audit-user-tag">
            <span class="audit-user-avatar">${escapeHTML(ev.actor || 'SYSTEM').charAt(0).toUpperCase()}</span>
            <span class="audit-user-name">@${escapeHTML(ev.actor || 'SYSTEM')}</span>
          </div>
        </td>
        <td><span class="audit-badge ${actionClass}">${escapeHTML(ev.action || 'UNKNOWN')}</span></td>
        <td>${ev.target && ev.target !== 'N/A' ? '@' + escapeHTML(ev.target) : '<span style="color:var(--text-faint, #94a3b8)">—</span>'}</td>
        <td><span class="audit-result-tag ${isSuccess ? 'success' : 'failed'}">${escapeHTML(ev.result || 'UNKNOWN')}</span></td>
        <td class="audit-details-cell">${detailsStr}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    loadingEl.style.display = 'block';
    loadingEl.textContent = 'Could not load audit trail: ' + err.message;
  }
}

// ---------- Toast ----------
let toastTimer = null;
function showToast(msg, kind) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show-' + (kind || 'green');
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
}

// =========================================================================
// ORGANIC DIGITAL FLOW FIELD ENGINE (Login Background Canvas)
// Premium enterprise-grade flow field: hundreds of tiny particles stream
// along invisible, smooth, curved aerodynamic paths driven by a 2D harmonic
// vector field that slowly evolves over time.
//
// Visual language: white/light background, tiny dark-slate particles,
// ultra-thin trailing streamlines, zero neon, zero glowing blobs.
// Mouse interaction: aerodynamic cylinder deflection bends flows around cursor.
// =========================================================================
class OrganicFlowField {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.options = Object.assign({
      particleCount: null,
      densityDivisor: 3800,
      minParticles: 480,
      maxParticles: 700,
      particleColor: '30, 41, 59',     // Slate-800 base
      trailColor: '51, 65, 85',        // Slate-700 trails
      baseSpeed: 0.90,
      fieldScale: 0.0018,              // spatial frequency of flow field
      fieldEvolution: 0.00025,         // how fast the field evolves over time
      trailLength: 5,
      mouseRadius: 185
    }, options);

    this.particles = [];
    this.animId = null;
    this.running = false;
    this.time = 0;
    this.lastTimestamp = 0;
    this.width = 0;
    this.height = 0;

    this.mouseX = -9999;
    this.mouseY = -9999;
    this.prevMouseX = -9999;
    this.prevMouseY = -9999;
    this.mouseVx = 0;
    this.mouseVy = 0;
    this.mouseStrength = 0; // ramps up/down for smooth interaction

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._onResize = this._onResize.bind(this);
    this._loop = this._loop.bind(this);
  }

  // ── Vector field: returns flow angle at (x, y, t) ─────────────────────
  _fieldAngle(x, y, t) {
    const s = this.options.fieldScale;
    const e = this.options.fieldEvolution;
    // Three layered harmonics for organic, non-repeating paths
    const a1 = Math.sin(x * s * 1.0 + y * s * 0.7 + t * e * 1.0) * 1.10;
    const a2 = Math.cos(x * s * 0.5 - y * s * 1.3 + t * e * 0.7) * 0.80;
    const a3 = Math.sin(x * s * 0.8 + y * s * 0.4 - t * e * 1.4) * 0.55;
    // Base drift angle ~10° (general eastward/northeastward tendency)
    return 0.175 + a1 + a2 + a3;
  }

  // ── Aerodynamic cursor deflection angle ──────────────────────────────
  _cursorDeflection(x, y, baseAngle) {
    if (this.mouseX < -500 || this.mouseStrength < 0.005) return baseAngle;
    const dx = x - this.mouseX;
    const dy = y - this.mouseY;
    const dist = Math.hypot(dx, dy);
    const R = this.options.mouseRadius;
    if (dist >= R || dist < 1) return baseAngle;

    // Cylinder-flow aerodynamic deflection: bend around cursor
    const proximity = 1 - dist / R;
    const tanAngle = Math.atan2(dy, dx);          // angle from cursor to particle
    const separation = Math.PI * 0.5;             // perpendicular deflection
    const deflectedAngle = tanAngle + separation;  // tangential around cursor
    const blend = Math.pow(proximity, 1.6) * 0.72 * this.mouseStrength;

    return baseAngle * (1 - blend) + deflectedAngle * blend;
  }

  // ── Spawn a fresh particle ─────────────────────────────────────────────
  _spawnParticle(w, h, existing) {
    const depth = 0.3 + Math.random() * 0.7;
    const speed = (0.55 + Math.random() * 0.95) * this.options.baseSpeed * (0.5 + 0.5 * depth);

    // Bias spawn along left edge and top edge to feed flows across the canvas
    let x, y;
    if (existing && Math.random() > 0.12) {
      // Mostly random positions when filling initially
      x = Math.random() * w;
      y = Math.random() * h;
    } else {
      // Re-inject along entry edges
      if (Math.random() < 0.6) {
        x = Math.random() < 0.5 ? -5 : Math.random() * w;
        y = Math.random() * h;
      } else {
        x = Math.random() * w;
        y = Math.random() < 0.5 ? -5 : h + 5;
      }
    }

    const baseAlpha = (0.10 + depth * 0.16);
    const maxLife = 240 + Math.floor(Math.random() * 220);

    return {
      x, y,
      depth,
      speed,
      size: 0.85 + Math.random() * 0.75 * depth,
      baseAlpha,
      alpha: 0,
      life: 0,
      maxLife,
      trail: [],                   // {x, y} history
      angle: this._fieldAngle(x, y, this.time) // initial heading
    };
  }

  init() {
    this.resize();
    this._bindEvents();
  }

  resize() {
    if (!this.canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w <= 0 || h <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }

    this.width = w;
    this.height = h;

    // Re-build particles scaled to new size
    const count = Math.min(
      Math.max(Math.floor((w * h) / this.options.densityDivisor), this.options.minParticles),
      this.options.maxParticles
    );

    if (this.particles.length === 0) {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) { this.particles = []; return; }

      this.particles = [];
      for (let i = 0; i < count; i++) {
        const p = this._spawnParticle(w, h, true);
        p.life = Math.floor(Math.random() * p.maxLife); // stagger phase-in
        this.particles.push(p);
      }
    }
  }

  _bindEvents() {
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseleave', this._onMouseLeave);
    document.addEventListener('visibilitychange', this._onVisibilityChange);
    window.addEventListener('resize', this._onResize);
  }

  _unbindEvents() {
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseleave', this._onMouseLeave);
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    window.removeEventListener('resize', this._onResize);
  }

  _onMouseMove(e) {
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      if (this.prevMouseX !== -9999) {
        const dvx = (this.mouseX - this.prevMouseX) * 0.4;
        const dvy = (this.mouseY - this.prevMouseY) * 0.4;
        this.mouseVx = dvx + this.mouseVx * 0.6;
        this.mouseVy = dvy + this.mouseVy * 0.6;
      }
    }
  }

  _onMouseLeave() {
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.prevMouseX = -9999;
    this.prevMouseY = -9999;
    this.mouseVx = 0;
    this.mouseVy = 0;
  }

  _onVisibilityChange() {
    if (document.hidden) {
      if (this.animId) { cancelAnimationFrame(this.animId); this.animId = null; }
    } else {
      if (this.running && !this.animId) {
        this.lastTimestamp = performance.now();
        this.animId = requestAnimationFrame(this._loop);
      }
    }
  }

  _onResize() { this.resize(); }

  start() {
    if (this.running) return;
    this.running = true;
    this.init();
    this.lastTimestamp = performance.now();
    this.animId = requestAnimationFrame(this._loop);
  }

  stop() {
    this.running = false;
    if (this.animId) { cancelAnimationFrame(this.animId); this.animId = null; }
    this._unbindEvents();
    if (this.ctx && this.width && this.height) this.ctx.clearRect(0, 0, this.width, this.height);
  }

  _loop(timestamp) {
    if (!this.running) return;
    const dt = Math.min((timestamp - (this.lastTimestamp || timestamp)) / 1000, 0.05);
    this.lastTimestamp = timestamp;
    this.time += dt * 60; // convert to ~frame units

    this._update(dt);
    this._draw();
    this.animId = requestAnimationFrame(this._loop);
  }

  _update(dt) {
    const w = this.width || window.innerWidth;
    const h = this.height || window.innerHeight;
    const t = this.time;
    const trailLen = this.options.trailLength;

    // Mouse velocity damping
    this.mouseVx *= 0.88;
    this.mouseVy *= 0.88;
    const cursorMoving = (Math.hypot(this.mouseVx, this.mouseVy) > 0.3) && this.mouseX > -500;
    // Ramp cursor strength smoothly
    const targetStrength = (this.mouseX > -500) ? 1.0 : 0.0;
    this.mouseStrength += (targetStrength - this.mouseStrength) * 0.06;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.life++;

      // Life-cycle opacity envelope (fade in then fade out)
      const t01 = p.life / p.maxLife;
      const fadePct = 0.12;
      let env;
      if (t01 < fadePct) {
        env = t01 / fadePct;
      } else if (t01 > 1 - fadePct) {
        env = (1 - t01) / fadePct;
      } else {
        env = 1.0;
      }
      p.alpha = p.baseAlpha * env;

      // Sample flow field at current position
      const baseAngle = this._fieldAngle(p.x, p.y, t);
      p.angle = p.angle * 0.82 + this._cursorDeflection(p.x, p.y, baseAngle) * 0.18;

      // Push trail
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > trailLen) p.trail.shift();

      // Advance along flow
      const spd = p.speed;
      p.x += Math.cos(p.angle) * spd;
      p.y += Math.sin(p.angle) * spd;

      // Recycle particles: expired or out-of-canvas
      const margin = 30;
      if (
        p.life >= p.maxLife ||
        p.x < -margin || p.x > w + margin ||
        p.y < -margin || p.y > h + margin
      ) {
        const np = this._spawnParticle(w, h, false);
        Object.assign(p, np);
        p.life = 0;
        p.trail = [];
      }
    }
  }

  _draw() {
    const ctx = this.ctx;
    if (!ctx) return;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.alpha < 0.01 || p.trail.length < 2) continue;

      // Depth-based color: deeper = slightly lighter
      const depthOffset = (1 - p.depth) * 30;
      const r = Math.floor(30 + depthOffset);
      const g = Math.floor(41 + depthOffset);
      const b = Math.floor(59 + depthOffset);

      // ── Draw trail as connected line segments with decaying alpha ──
      const trail = p.trail;
      const trailLen = trail.length;
      for (let j = 0; j < trailLen - 1; j++) {
        const frac = (j + 1) / trailLen;
        const segAlpha = p.alpha * frac * 0.55;
        if (segAlpha < 0.005) continue;

        ctx.beginPath();
        ctx.moveTo(trail[j].x, trail[j].y);
        ctx.lineTo(trail[j + 1].x, trail[j + 1].y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${segAlpha.toFixed(3)})`;
        ctx.lineWidth = p.size * 0.55;
        ctx.stroke();
      }

      // ── Draw particle head ──
      // Boost alpha near cursor
      let headAlpha = p.alpha;
      if (this.mouseX > -500) {
        const dCursor = Math.hypot(p.x - this.mouseX, p.y - this.mouseY);
        if (dCursor < 160) {
          headAlpha += (1 - dCursor / 160) * 0.18;
        }
      }
      headAlpha = Math.min(headAlpha, 0.65);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${headAlpha.toFixed(3)})`;
      ctx.fill();
    }
  }
}

// ---------- Login Canvas — Organic Digital Flow Field ----------
var loginFlowField = null;

function initLoginCanvas() {
  const canvas = document.getElementById('login-canvas');
  if (!canvas) return;

  if (!loginFlowField) {
    loginFlowField = new OrganicFlowField(canvas, {
      densityDivisor: 3800,
      minParticles: 480,
      maxParticles: 700,
      baseSpeed: 0.90,
      fieldScale: 0.0018,
      fieldEvolution: 0.00025,
      trailLength: 5,
      mouseRadius: 185
    });
  }
  loginFlowField.resize();

  // Live IST clock in bottom-right corner
  const clockEl = document.getElementById('login-status-time');
  function updateClock() {
    if (!clockEl) return;
    clockEl.textContent = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }) + ' IST';
  }
  updateClock();
  setInterval(updateClock, 1000);
}

function startLoginCanvasAnimation() {
  const canvas = document.getElementById('login-canvas');
  if (!canvas) return;
  if (!loginFlowField) { initLoginCanvas(); }
  if (loginFlowField) { loginFlowField.start(); }
}

function stopLoginCanvasAnimation() {
  if (loginFlowField) { loginFlowField.stop(); }
}

// ---------- Dynamic Interactive Cursor Follower ----------
// ---------- Enterprise Subtle Cursor & Card Interaction System ----------
function initCursorFollower() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const spotlight = document.getElementById('cursor-spotlight');
  const aura = document.getElementById('cursor-glow');
  const dot = document.getElementById('cursor-dot');
  if (!spotlight || !aura || !dot) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let auraX = targetX;
  let auraY = targetY;
  let spotlightX = targetX;
  let spotlightY = targetY;
  let isMoving = false;
  let activeCard = null;

  // Track cursor coordinates, active card selection, and micro-parallax
  window.addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!isMoving) {
      isMoving = true;
      document.body.classList.add('cursor-active');
      document.body.classList.remove('cursor-hidden');
    }

    // Direct positioning for zero-latency micro-dot
    dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

    // Global CSS coordinates
    document.documentElement.style.setProperty('--mouse-x', targetX + 'px');
    document.documentElement.style.setProperty('--mouse-y', targetY + 'px');

    // Micro-parallax coordinates (-1 to 1) clamped and smoothed
    const pX = ((targetX / window.innerWidth) - 0.5) * 2;
    const pY = ((targetY / window.innerHeight) - 0.5) * 2;
    document.documentElement.style.setProperty('--parallax-x', pX.toFixed(3));
    document.documentElement.style.setProperty('--parallax-y', pY.toFixed(3));

    // Dynamic interactive hover trigger
    const interactiveTarget = e.target.closest(
      'button, input, textarea, select, a, [role="button"], .nav-item, .metric-card, .section-card, .trends-stat-item, .overview-banner, .overview-exec-panel, .briefing-card, .scope-btn, .btn-a0-toggle, .trend-bar-wrap'
    );
    document.body.classList.toggle('cursor-hover', !!interactiveTarget);

    // 1, 2, 4. DYNAMIC CARD SELECTION & INTERNAL RADIAL HIGHLIGHT
    const hoveredCard = e.target.closest(
      '.metric-card, .section-card, .trends-stat-item, .overview-banner, .overview-exec-panel, .overview-exec-snippet, .briefing-card, .panel'
    );

    if (hoveredCard) {
      if (activeCard && activeCard !== hoveredCard) {
        activeCard.classList.remove('card-active');
      }
      activeCard = hoveredCard;
      activeCard.classList.add('card-active');

      const rect = activeCard.getBoundingClientRect();
      const cardX = targetX - rect.left;
      const cardY = targetY - rect.top;
      activeCard.style.setProperty('--card-x', `${cardX}px`);
      activeCard.style.setProperty('--card-y', `${cardY}px`);
    } else if (activeCard) {
      activeCard.classList.remove('card-active');
      activeCard = null;
    }
  }, { passive: true });

  // Handle pointer leaving / entering window
  window.addEventListener('pointerleave', () => {
    document.body.classList.add('cursor-hidden');
    if (activeCard) {
      activeCard.classList.remove('card-active');
      activeCard = null;
    }
  });

  window.addEventListener('pointerenter', () => {
    document.body.classList.remove('cursor-hidden');
  });

  // Smooth fluid interpolation for the ambient spotlight and aura ring
  function renderCursor() {
    // Lerp factors: 0.14 for soft spotlight, 0.22 for aura ring
    spotlightX += (targetX - spotlightX) * 0.14;
    spotlightY += (targetY - spotlightY) * 0.14;
    auraX += (targetX - auraX) * 0.22;
    auraY += (targetY - auraY) * 0.22;

    spotlight.style.transform = `translate3d(${spotlightX.toFixed(2)}px, ${spotlightY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    aura.style.transform = `translate3d(${auraX.toFixed(2)}px, ${auraY.toFixed(2)}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();
}

// ---------- 3D Interactive Tilt on Login Card ----------
function initLoginTilt() {
  const screen = document.getElementById('login-screen');
  const card = document.getElementById('login-form');
  if (!screen || !card) return;

  screen.addEventListener('mousemove', (e) => {
    if (screen.hidden) return;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

    const tiltX = -deltaY * 8;
    const tiltY = deltaX * 8;

    card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
  });

  screen.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}


/* ================================================================
   PREMIUM WELCOME TRANSITION — showWelcomeTransition()
   Called after auth success, before initApp().
   Signature: showWelcomeTransition(username, onRevealDashboard)
   Returns a Promise that resolves after the dashboard is visible.
   ================================================================ */

function showWelcomeTransition(username, onRevealDashboard) {
  return new Promise((resolve) => {
    const screen = document.getElementById('welcome-transition');
    if (!screen) {
      // Fallback: just call dashboard reveal immediately
      Promise.resolve(onRevealDashboard()).then(resolve);
      return;
    }

    // Inject username dynamically
    const usernameEl = document.getElementById('wt-username');
    if (usernameEl) usernameEl.textContent = username || 'there';

    // Show the transition stage immediately
    screen.hidden = false;
    screen.setAttribute('aria-hidden', 'false');

    // Kick off canvas particle system with continuous ambient movement
    const canvasCleanup = initWelcomeCanvas();

    const startTime = Date.now();

    // Trigger CSS transitions via rAF
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        screen.classList.add('wt-visible');
      });
    });

    // 4000ms: subtle preparation for transition without revealing dashboard
    setTimeout(() => {
      screen.classList.add('wt-pre-fade');
    }, 4000);

    // CRITICAL: Enforce full 5-second minimum display duration programmatically
    const MINIMUM_DURATION_MS = 5000;

    setTimeout(async () => {
      // Ensure at least 5000ms have elapsed before revealing the dashboard
      const elapsed = Date.now() - startTime;
      if (elapsed < MINIMUM_DURATION_MS) {
        await new Promise(r => setTimeout(r, MINIMUM_DURATION_MS - elapsed));
      }

      // Initialize/render dashboard while screen is still covering
      await onRevealDashboard();

      // Smooth crossfade out
      screen.classList.add('wt-fade-out');
      screen.classList.remove('wt-visible', 'wt-pre-fade');

      // Teardown and resolve after crossfade completes
      const OUT_DURATION = 600;
      setTimeout(() => {
        screen.hidden = true;
        screen.setAttribute('aria-hidden', 'true');
        screen.classList.remove('wt-fade-out');
        if (canvasCleanup) canvasCleanup();
        resolve();
      }, OUT_DURATION);
    }, MINIMUM_DURATION_MS);
  });
}

/* ---------------------------------------------------------------
   Dynamic Enterprise Network Canvas: subtle drifting monochrome nodes
   with dynamic connecting lines (zero neon, low GPU/CPU footprint)
--------------------------------------------------------------- */
function initWelcomeCanvas() {
  const canvas = document.getElementById('wt-canvas');
  if (!canvas) return null;
  const field = new OrganicJellyfishField(canvas, {
    densityDivisor: 20000,
    minParticles: 30,
    maxParticles: 52,
    speedMultiplier: 1.0,
    baseColor: '15, 23, 42',
    strokeColor: '51, 65, 85',
    tendrilColor: '71, 85, 105'
  });
  field.start();
  return function cleanup() {
    field.stop();
  };
}

// ================================================================
// PHASE 4: SHARE CLIENT REPORT MODAL LOGIC
// ================================================================
let isGeneratingShare = false;

function formatMonthHuman(mStr) {
  if (!mStr || !/^\d{4}-\d{2}$/.test(mStr)) return mStr || '';
  const parts = mStr.split('-');
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function openShareModal() {
  if (state.role !== 'superadmin' && state.role !== 'admin') {
    showToast('You do not have permission to create share links.', 'red');
    return;
  }

  const overlay = document.getElementById('share-modal-overlay');
  if (!overlay) {
    console.error('[Share] #share-modal-overlay not found in DOM');
    return;
  }

  try {
    const formSection = document.getElementById('share-form-section');
    const successSection = document.getElementById('share-success-section');
    const errorBox = document.getElementById('share-error-box');
    const monthText = document.getElementById('share-month-text');
    const clientInput = document.getElementById('share-client-name');
    const expirySelect = document.getElementById('share-expiry-select');
    const generateBtn = document.getElementById('share-generate-btn');
    const urlInput = document.getElementById('share-generated-url');
    const copyBtnText = document.getElementById('share-copy-btn-text');

    // Reset form state
    if (formSection) formSection.hidden = false;
    if (successSection) successSection.hidden = true;
    if (errorBox) { errorBox.hidden = true; errorBox.textContent = ''; }

    // Set current selected month (human-readable)
    if (monthText) monthText.textContent = formatMonthHuman(state.month);

    // Default values
    if (clientInput && !clientInput.value) clientInput.value = 'A0 MSS Dashboard';
    if (expirySelect) expirySelect.value = '7';
    if (urlInput) urlInput.value = '';
    if (copyBtnText) copyBtnText.textContent = 'Copy Link';
    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.innerHTML = `
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M10 3v10M6 9l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Generate Secure Link</span>
      `;
    }

    isGeneratingShare = false;

    // Show the modal
    overlay.removeAttribute('hidden');
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      if (generateBtn) generateBtn.focus();
    }, 50);
  } catch (err) {
    console.error('[Share] Error opening share modal:', err);
  }
}

function closeShareModal() {
  const overlay = document.getElementById('share-modal-overlay');
  if (!overlay) return;
  overlay.hidden = true;
  overlay.setAttribute('aria-hidden', 'true');

  // Sensitive clean-up: never persist raw generated URL or tokens in DOM
  const urlInput = document.getElementById('share-generated-url');
  if (urlInput) urlInput.value = '';
  isGeneratingShare = false;
}

async function onGenerateShareLink() {
  if (isGeneratingShare) return;

  // Strict client-side RBAC guard
  if (state.role !== 'superadmin' && state.role !== 'admin') {
    showToast('You do not have permission to create share links.', 'red');
    closeShareModal();
    return;
  }

  const generateBtn = document.getElementById('share-generate-btn');
  const errorBox = document.getElementById('share-error-box');
  const clientInput = document.getElementById('share-client-name');
  const expirySelect = document.getElementById('share-expiry-select');
  const formSection = document.getElementById('share-form-section');
  const successSection = document.getElementById('share-success-section');
  const urlInput = document.getElementById('share-generated-url');
  const copyBtnText = document.getElementById('share-copy-btn-text');

  errorBox.hidden = true;
  errorBox.textContent = '';

  // Validate selected month format (YYYY-MM)
  const month = (state.month || '').trim();
  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    errorBox.textContent = 'Invalid reporting month selected. Please select a valid month on the dashboard.';
    errorBox.hidden = false;
    return;
  }

  const expiresInDays = Number(expirySelect ? expirySelect.value : 7) || 7;
  const clientName = (clientInput && clientInput.value ? clientInput.value : 'A0 MSS Dashboard').trim();

  // Set loading state & prevent duplicate clicks
  isGeneratingShare = true;
  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="spinner-inline"></span><span>Generating...</span>';
  }

  try {
    const res = await api('/api/shares', {
      method: 'POST',
      body: JSON.stringify({
        month,
        expiresInDays,
        clientName,
      }),
    });

    if (!res || !res.url) {
      throw new Error('Server did not return a valid share URL.');
    }

    // Switch to success view inside the modal
    formSection.hidden = true;
    successSection.hidden = false;
    if (urlInput) urlInput.value = res.url;
    if (copyBtnText) copyBtnText.textContent = 'Copy Link';

    showToast('Secure share link created', 'green');
  } catch (err) {
    errorBox.textContent = err.message || 'Unable to generate share link. Please try again.';
    errorBox.hidden = false;
  } finally {
    isGeneratingShare = false;
    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.innerHTML = `
        <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M10 3v10M6 9l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Generate Secure Link</span>
      `;
    }
  }
}

async function onCopyShareLink() {
  const urlInput = document.getElementById('share-generated-url');
  const copyBtnText = document.getElementById('share-copy-btn-text');
  if (!urlInput || !urlInput.value) return;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(urlInput.value);
    } else {
      urlInput.select();
      document.execCommand('copy');
    }
    if (copyBtnText) copyBtnText.textContent = 'Copied!';
    showToast('Secure link copied to clipboard', 'green');
    setTimeout(() => {
      if (copyBtnText) copyBtnText.textContent = 'Copy Link';
    }, 2500);
  } catch (err) {
    urlInput.select();
    showToast('Please press Ctrl+C to copy', 'amber');
  }
}

function initShareModal() {
  // Direct element handlers for resilience
  const closeBtn = document.getElementById('share-modal-close');
  if (closeBtn) closeBtn.onclick = closeShareModal;

  const cancelBtn = document.getElementById('share-cancel-btn');
  if (cancelBtn) cancelBtn.onclick = closeShareModal;

  const doneBtn = document.getElementById('share-done-btn');
  if (doneBtn) doneBtn.onclick = closeShareModal;

  const generateBtn = document.getElementById('share-generate-btn');
  if (generateBtn) generateBtn.onclick = onGenerateShareLink;

  const copyBtn = document.getElementById('share-copy-btn');
  if (copyBtn) copyBtn.onclick = onCopyShareLink;

  // Delegated click listener
  document.addEventListener('click', (e) => {
    if (e.target.closest('#share-btn'))          { openShareModal();      return; }
    if (e.target.closest('#share-modal-close'))  { closeShareModal();     return; }
    if (e.target.closest('#share-cancel-btn'))   { closeShareModal();     return; }
    if (e.target.closest('#share-done-btn'))     { closeShareModal();     return; }
    if (e.target.closest('#share-generate-btn')) { onGenerateShareLink(); return; }
    if (e.target.closest('#share-copy-btn'))     { onCopyShareLink();     return; }
    // Backdrop: only when the direct target IS the overlay (not the modal card inside it)
    if (e.target.id === 'share-modal-overlay')   { closeShareModal();     return; }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('share-modal-overlay');
      if (modal && !modal.hidden) closeShareModal();
    }
  });

  // Expose globally
  window.openShareModal      = openShareModal;
  window.closeShareModal     = closeShareModal;
  window.onGenerateShareLink = onGenerateShareLink;
  window.onCopyShareLink     = onCopyShareLink;
}

// Expose globally at file scope as well
window.openShareModal      = openShareModal;
window.closeShareModal     = closeShareModal;
window.onGenerateShareLink = onGenerateShareLink;
window.onCopyShareLink     = onCopyShareLink;

// Start application once all declarations and DOM elements are ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}


