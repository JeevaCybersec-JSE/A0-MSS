// ============================================================
// MSS KPI Dashboard ”” Frontend
// Security Operations Console & Executive Reporting Engine
// ============================================================

const API = (
  window.location.protocol === 'file:' ||
  (window.location.port !== '4321' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
) ? 'http://localhost:4321' : '';

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
async function api(path, opts = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (state.token) headers['Authorization'] = 'Bearer ' + state.token;
  let res;
  try {
    res = await fetch(API + path, Object.assign({}, opts, { headers }));
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

boot();

async function boot() {
  document.getElementById('month-input').value = state.month;
  initLoginCanvas();
  initCursorFollower();
  initLoginTilt();
  initSidebarToggle();
  initSidebarBrandAtom();
  initLoginControls();

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
  if (passInp) passInp.value = '';
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
    const res = await fetch(API + '/api/login', {
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
  } else if (state.view.startsWith('section:')) {
    const sectionId = state.view.split(':')[1];
    const sec = state.sections.find(s => s.id === sectionId);
    titleEl.textContent = sec ? sec.name : 'Section';
    subEl.textContent = state.month + (!hasPermission('metrics:write') ? ' • Read-Only' : '');
    root.appendChild(renderSection(sectionId));
  }
}

// =========================================================================
// OVERVIEW OPERATIONAL INTELLIGENCE BACKGROUND ENGINE
// Live network/infrastructure field + moving nodes + subtle data flow
// =========================================================================
let overviewAnimId = null;
let overviewResizeObserver = null;
let overviewMouseMoveHandler = null;
let overviewMouseLeaveHandler = null;

let overviewMouse = {
  x: -9999,
  y: -9999,
  targetPx: 0,
  targetPy: 0,
  px: 0,
  py: 0,
  speed: 0,
  lastX: -9999,
  lastY: -9999,
  lastTime: 0
};

let overviewWaypoints = [];
let overviewPaths = [];
let overviewNodes = [];
let overviewDataPulses = [];
let lastPulseSpawnTime = 0;

function stopOverviewBgAnimation() {
  if (overviewAnimId) {
    cancelAnimationFrame(overviewAnimId);
    overviewAnimId = null;
  }
  if (overviewResizeObserver) {
    overviewResizeObserver.disconnect();
    overviewResizeObserver = null;
  }
  if (overviewMouseMoveHandler) {
    window.removeEventListener('mousemove', overviewMouseMoveHandler);
    overviewMouseMoveHandler = null;
  }
  if (overviewMouseLeaveHandler) {
    window.removeEventListener('mouseleave', overviewMouseLeaveHandler);
    overviewMouseLeaveHandler = null;
  }
  overviewWaypoints = [];
  overviewPaths = [];
  overviewNodes = [];
  overviewDataPulses = [];
}

function sampleBezier(t, path, ox, oy) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  const p0x = path.p0.x + ox, p0y = path.p0.y + oy;
  const c1x = path.c1.x + ox, c1y = path.c1.y + oy;
  const c2x = path.c2.x + ox, c2y = path.c2.y + oy;
  const p1x = path.p1.x + ox, p1y = path.p1.y + oy;

  return {
    x: mt3 * p0x + 3 * mt2 * t * c1x + 3 * mt * t2 * c2x + t3 * p1x,
    y: mt3 * p0y + 3 * mt2 * t * c1y + 3 * mt * t2 * c2y + t3 * p1y
  };
}

function buildOverviewTopology(w, h) {
  const normWPs = [
    { x: 0.03, y: 0.05, label: 'INGEST::01' },
    { x: 0.26, y: 0.03, label: 'BUS::NORTH' },
    { x: 0.54, y: 0.04, label: 'CORE::HUB' },
    { x: 0.80, y: 0.03, label: 'GATEWAY::02' },
    { x: 0.96, y: 0.07, label: 'EDGE::EAST' },

    { x: 0.04, y: 0.22, label: 'ZONE::EP-A' },
    { x: 0.96, y: 0.24, label: 'ZONE::EP-B' },

    { x: 0.03, y: 0.42, label: 'SEC-OPS::L' },
    { x: 0.50, y: 0.40, label: 'CORRELATION' },
    { x: 0.97, y: 0.44, label: 'SEC-OPS::R' },

    { x: 0.05, y: 0.66, label: 'PATCH::BUS' },
    { x: 0.95, y: 0.68, label: 'TELEMETRY' },

    { x: 0.04, y: 0.88, label: 'STORE::A0' },
    { x: 0.52, y: 0.92, label: 'COMPLIANCE' },
    { x: 0.96, y: 0.90, label: 'VAULT::SOC' }
  ];

  overviewWaypoints = normWPs.map(n => ({
    x: Math.round(n.x * w),
    y: Math.round(n.y * h),
    label: n.label
  }));

  const pathPairs = [
    // Top routing
    { from: 0, to: 1, c1: [0.12, 0.01], c2: [0.18, 0.07], accent: true },
    { from: 1, to: 2, c1: [0.36, 0.07], c2: [0.44, 0.01], accent: false },
    { from: 2, to: 3, c1: [0.65, 0.01], c2: [0.72, 0.06], accent: true },
    { from: 3, to: 4, c1: [0.88, 0.01], c2: [0.92, 0.11], accent: false },

    // Left border flow down
    { from: 0, to: 5, c1: [0.01, 0.13], c2: [0.06, 0.17], accent: true },
    { from: 5, to: 7, c1: [0.06, 0.31], c2: [0.01, 0.37], accent: false },
    { from: 7, to: 10, c1: [0.01, 0.51], c2: [0.06, 0.59], accent: true },
    { from: 10, to: 12, c1: [0.06, 0.77], c2: [0.02, 0.83], accent: false },

    // Right border flow down
    { from: 4, to: 6, c1: [0.98, 0.15], c2: [0.93, 0.19], accent: false },
    { from: 6, to: 9, c1: [0.93, 0.33], c2: [0.99, 0.39], accent: true },
    { from: 9, to: 11, c1: [0.99, 0.53], c2: [0.92, 0.61], accent: false },
    { from: 11, to: 14, c1: [0.92, 0.77], c2: [0.98, 0.83], accent: true },

    // Cross-channel horizontal routes across inter-card gaps
    { from: 5, to: 8, c1: [0.20, 0.25], c2: [0.35, 0.43], accent: false },
    { from: 8, to: 6, c1: [0.65, 0.39], c2: [0.80, 0.23], accent: true },
    { from: 7, to: 8, c1: [0.22, 0.45], c2: [0.36, 0.39], accent: true },
    { from: 8, to: 9, c1: [0.64, 0.43], c2: [0.78, 0.47], accent: false },

    // Bottom routing
    { from: 12, to: 13, c1: [0.24, 0.93], c2: [0.38, 0.87], accent: false },
    { from: 13, to: 14, c1: [0.66, 0.95], c2: [0.82, 0.85], accent: true }
  ];

  overviewPaths = pathPairs.map(pp => {
    const p0 = overviewWaypoints[pp.from];
    const p1 = overviewWaypoints[pp.to];
    return {
      p0: p0,
      p1: p1,
      c1: { x: Math.round(pp.c1[0] * w), y: Math.round(pp.c1[1] * h) },
      c2: { x: Math.round(pp.c2[0] * w), y: Math.round(pp.c2[1] * h) },
      isAccent: pp.accent,
      flowSpeed: 0.6 + Math.random() * 0.5
    };
  });

  // Moving telemetry & security infrastructure nodes
  overviewNodes = [];
  const nodeCount = 22;
  for (let i = 0; i < nodeCount; i++) {
    const pIdx = i % overviewPaths.length;
    const isAccent = overviewPaths[pIdx].isAccent;
    overviewNodes.push({
      pathIdx: pIdx,
      t: Math.random(),
      speed: 0.0006 + Math.random() * 0.0008, // Slow, calm, professional operational speed
      radius: Math.random() * 0.9 + 2.1, // 2.1 to 3.0px
      accentColor: isAccent ? '#2563EB' : (Math.random() > 0.5 ? '#0284C7' : '#64748B'),
      baseAlpha: Math.random() * 0.22 + 0.36,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.012,
      deflectX: 0,
      deflectY: 0,
      excitement: 0
    });
  }
}

function initOverviewBgAnimation(container, canvas) {
  stopOverviewBgAnimation();
  if (!container || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    const rect = container.getBoundingClientRect();
    const w = Math.max(container.scrollWidth, rect.width, window.innerWidth - 300);
    const h = Math.max(container.scrollHeight, rect.height, 900);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    buildOverviewTopology(w, h);
  }

  overviewResizeObserver = new ResizeObserver(() => {
    resize();
  });
  overviewResizeObserver.observe(container);
  resize();

  overviewMouseMoveHandler = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const now = performance.now();
    const dt = Math.max(1, now - (overviewMouse.lastTime || now));
    const vx = ((mx - (overviewMouse.lastX || mx)) / dt) * 16.67;
    const vy = ((my - (overviewMouse.lastY || my)) / dt) * 16.67;
    overviewMouse.speed = Math.sqrt(vx * vx + vy * vy);
    overviewMouse.lastX = mx;
    overviewMouse.lastY = my;
    overviewMouse.lastTime = now;

    overviewMouse.x = mx;
    overviewMouse.y = my;

    // Gentle parallax target: max +/- 16px
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    overviewMouse.targetPx = Math.max(-18, Math.min(18, (mx - cx) * 0.015));
    overviewMouse.targetPy = Math.max(-18, Math.min(18, (my - cy) * 0.015));
  };

  overviewMouseLeaveHandler = () => {
    overviewMouse.x = -9999;
    overviewMouse.y = -9999;
    overviewMouse.targetPx = 0;
    overviewMouse.targetPy = 0;
    overviewMouse.speed = 0;
  };

  window.addEventListener('mousemove', overviewMouseMoveHandler);
  window.addEventListener('mouseleave', overviewMouseLeaveHandler);

  let flowStep = 0;

  function draw() {
    flowStep += 0.35;
    const w = parseFloat(canvas.style.width) || canvas.width;
    const h = parseFloat(canvas.style.height) || canvas.height;

    // Smooth inertia on parallax
    overviewMouse.px += (overviewMouse.targetPx - overviewMouse.px) * 0.04;
    overviewMouse.py += (overviewMouse.targetPy - overviewMouse.py) * 0.04;

    ctx.clearRect(0, 0, w, h);

    // 1. Technical Grid / Dot Field (layer 0: parallax 0.3x)
    const gpx = overviewMouse.px * 0.3;
    const gpy = overviewMouse.py * 0.3;
    ctx.save();
    ctx.fillStyle = 'rgba(148, 163, 184, 0.13)';
    const pitch = 54;
    const startX = ((gpx % pitch) + pitch) % pitch;
    const startY = ((gpy % pitch) + pitch) % pitch;
    for (let x = startX; x < w; x += pitch) {
      for (let y = startY; y < h; y += pitch) {
        ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
      }
    }
    ctx.restore();

    // 2. Waypoints / Network Stations (layer 1: parallax 0.6x)
    const wpx = overviewMouse.px * 0.6;
    const wpy = overviewMouse.py * 0.6;
    ctx.save();
    ctx.font = '500 8.5px "JetBrains Mono", Consolas, monospace';
    for (let i = 0; i < overviewWaypoints.length; i++) {
      const wp = overviewWaypoints[i];
      const wx = wp.x + wpx;
      const wy = wp.y + wpy;

      // Small crosshair
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.26)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(wx - 4, wy); ctx.lineTo(wx + 4, wy);
      ctx.moveTo(wx, wy - 4); ctx.lineTo(wx, wy + 4);
      ctx.stroke();

      // Station ID label
      ctx.fillStyle = 'rgba(100, 116, 139, 0.26)';
      ctx.fillText(wp.label, wx + 6, wy - 4);
    }
    ctx.restore();

    // 3. Curved Connection Paths (layer 2: parallax 0.75x)
    const ppx = overviewMouse.px * 0.75;
    const ppy = overviewMouse.py * 0.75;
    ctx.save();
    for (let i = 0; i < overviewPaths.length; i++) {
      const p = overviewPaths[i];
      const p0x = p.p0.x + ppx, p0y = p.p0.y + ppy;
      const c1x = p.c1.x + ppx, c1y = p.c1.y + ppy;
      const c2x = p.c2.x + ppx, c2y = p.c2.y + ppy;
      const p1x = p.p1.x + ppx, p1y = p.p1.y + ppy;

      // Static thin base curve
      ctx.beginPath();
      ctx.moveTo(p0x, p0y);
      ctx.bezierCurveTo(c1x, c1y, c2x, c2y, p1x, p1y);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Subtle flowing pulse dashes
      ctx.beginPath();
      ctx.moveTo(p0x, p0y);
      ctx.bezierCurveTo(c1x, c1y, c2x, c2y, p1x, p1y);
      ctx.setLineDash([5, 20]);
      ctx.lineDashOffset = -(flowStep * (p.flowSpeed || 0.8));
      ctx.strokeStyle = p.isAccent ? 'rgba(37, 99, 235, 0.13)' : 'rgba(14, 165, 233, 0.10)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();

    // 4. Traveling Data Pulses (occasional packets)
    const now = performance.now();
    if (now - lastPulseSpawnTime > 2800 && overviewPaths.length > 0) {
      const randomPathIdx = Math.floor(Math.random() * overviewPaths.length);
      overviewDataPulses.push({
        pathIdx: randomPathIdx,
        t: 0,
        speed: 0.007 + Math.random() * 0.004,
        color: Math.random() > 0.4 ? 'rgba(37, 99, 235, 0.32)' : 'rgba(14, 165, 233, 0.28)'
      });
      lastPulseSpawnTime = now;
    }

    ctx.save();
    for (let i = overviewDataPulses.length - 1; i >= 0; i--) {
      const pulse = overviewDataPulses[i];
      pulse.t += pulse.speed;
      if (pulse.t >= 1) {
        overviewDataPulses.splice(i, 1);
        continue;
      }
      const path = overviewPaths[pulse.pathIdx];
      if (!path) continue;

      const ptHead = sampleBezier(pulse.t, path, ppx, ppy);
      const ptTail = sampleBezier(Math.max(0, pulse.t - 0.06), path, ppx, ppy);

      const grad = ctx.createLinearGradient(ptTail.x, ptTail.y, ptHead.x, ptHead.y);
      grad.addColorStop(0, 'rgba(37, 99, 235, 0)');
      grad.addColorStop(1, pulse.color);
      ctx.beginPath();
      ctx.moveTo(ptTail.x, ptTail.y);
      ctx.lineTo(ptHead.x, ptHead.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }
    ctx.restore();

    // 5. Moving Infrastructure & Security Nodes (layer 3: parallax 1.0x + cursor proximity reaction)
    const npx = overviewMouse.px;
    const npy = overviewMouse.py;

    for (let i = 0; i < overviewNodes.length; i++) {
      const node = overviewNodes[i];
      node.t += node.speed;
      if (node.t >= 1) node.t = 0;
      node.phase += node.pulseSpeed;

      const path = overviewPaths[node.pathIdx];
      if (!path) continue;

      const basePt = sampleBezier(node.t, path, npx, npy);

      // Mouse proximity interaction with smooth inertia & deflection
      const dx = overviewMouse.x - basePt.x;
      const dy = overviewMouse.y - basePt.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetDeflectX = 0;
      let targetDeflectY = 0;
      let targetExcitement = 0;

      if (dist < 180 && dist > 1) {
        const prox = 1 - dist / 180;
        targetExcitement = prox;
        targetDeflectX = (dx / dist) * prox * 8.5;
        targetDeflectY = (dy / dist) * prox * 8.5;
      }

      // Smooth inertia on node deflection
      node.deflectX += (targetDeflectX - node.deflectX) * 0.08;
      node.deflectY += (targetDeflectY - node.deflectY) * 0.08;
      node.excitement += (targetExcitement - node.excitement) * 0.08;

      const finalX = basePt.x + node.deflectX;
      const finalY = basePt.y + node.deflectY;

      // Subtle brightness and scale variation
      const breathing = Math.sin(node.phase) * 0.12;
      const currentAlpha = Math.min(0.85, node.baseAlpha + breathing + node.excitement * 0.35);
      const currentRadius = node.radius * (1 + node.excitement * 0.28);

      ctx.save();
      // Outer subtle ring
      ctx.beginPath();
      ctx.arc(finalX, finalY, currentRadius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = node.accentColor;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = currentAlpha * 0.35;
      ctx.stroke();

      // Node core
      ctx.beginPath();
      ctx.arc(finalX, finalY, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = node.accentColor;
      ctx.globalAlpha = currentAlpha;
      ctx.fill();
      ctx.restore();
    }

    overviewAnimId = requestAnimationFrame(draw);
  }

  draw();
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
  `;
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
  const IDLE_SPD    = 0.14;   // idle deg/frame ≈ 1 revolution / 43 s at 60fps
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

// ---------- Dynamic Login Canvas Animation (SOC Cyber Grid & Radar Engine) ----------
let canvasAnimId = null;
let particles = [];
let telemetryStreams = [];
let shockwaves = [];
let mousePos = { x: -2000, y: -2000 };
let mouseVel = { x: 0, y: 0 };
let lastMousePos = { x: -2000, y: -2000 };
let lastMouseMoveTime = 0;
let radarAngle = 0;
let lastShockwaveTime = 0;

const TELEMETRY_PHRASES = [
  'NODE#A0::ONLINE',
  'AES-256::VERIFIED',
  '0x7F::AUTH_OK',
  'PORT:443::SECURE',
  'LATENCY::12ms',
  'TLS_v1.3::ACTIVE',
  'KEY_EXCHANGE::PASS',
  'SOC_MSS::STREAM',
  'SHA-512::INTEGRITY',
  'PACKET_TRACE::VALID',
  'NODE_SYNC::100%'
];

function initLoginCanvas() {
  const canvas = document.getElementById('login-canvas');
  if (!canvas) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
    createTelemetry();
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (lastMouseMoveTime > 0) {
      const dt = Math.max(1, now - lastMouseMoveTime);
      const vx = ((e.clientX - lastMousePos.x) / dt) * 16.67;
      const vy = ((e.clientY - lastMousePos.y) / dt) * 16.67;
      mouseVel.x = mouseVel.x * 0.35 + vx * 0.65;
      mouseVel.y = mouseVel.y * 0.35 + vy * 0.65;
    }
    lastMousePos.x = e.clientX;
    lastMousePos.y = e.clientY;
    lastMouseMoveTime = now;
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    const timeNow = Date.now();
    if (timeNow - lastShockwaveTime > 400) {
      const screen = document.getElementById('login-screen');
      if (screen && !screen.hidden) {
        shockwaves.push({
          x: e.clientX,
          y: e.clientY,
          radius: 12,
          maxRadius: 160,
          speed: 2.6,
          alpha: 0.35,
          color: Math.random() > 0.5 ? '#23d6bb' : '#38bdf8'
        });
        lastShockwaveTime = timeNow;
      }
    }
  });

  window.addEventListener('mouseleave', () => {
    mousePos.x = -2000;
    mousePos.y = -2000;
    mouseVel.x = 0;
    mouseVel.y = 0;
  });

  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) {
    loginScreen.addEventListener('mousedown', (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 8,
        maxRadius: 320,
        speed: 4.8,
        alpha: 0.75,
        color: '#23d6bb'
      });
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 240,
        speed: 3.6,
        alpha: 0.55,
        color: '#38bdf8'
      });
    });
  }

  // Live HUD Latency variation ticker
  setInterval(() => {
    const latEl = document.getElementById('login-hud-latency');
    if (latEl) {
      const ms = Math.floor(10 + Math.random() * 5);
      latEl.textContent = ms + 'ms';
    }
  }, 2400);
}

function createParticles() {
  const canvas = document.getElementById('login-canvas');
  if (!canvas) return;
  const count = Math.min(Math.max(Math.floor((canvas.width * canvas.height) / 11500), 55), 115);
  particles = [];
  const palette = ['#23d6bb', '#38bdf8', '#5c8bf5', '#2dd4bf', '#818cf8'];

  for (let i = 0; i < count; i++) {
    particles.push({
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      baseVx: (Math.random() - 0.5) * 0.45,
      baseVy: (Math.random() - 0.5) * 0.45,
      orbitRadius: Math.random() * 24 + 8,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.012 + 0.006),
      baseRadius: Math.random() * 2.8 + 2.4, // Small, elegant ring outer radius
      lineWidth: Math.random() * 0.55 + 0.95, // Thin circular stroke outline
      color: palette[Math.floor(Math.random() * palette.length)],
      baseAlpha: Math.random() * 0.35 + 0.28,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.012,
      swirlDir: Math.random() > 0.5 ? 1 : -1,
      followVx: 0,
      followVy: 0,
      excitement: 0
    });
  }
}

function createTelemetry() {
  const canvas = document.getElementById('login-canvas');
  if (!canvas) return;
  telemetryStreams = [];
  const streamCount = Math.min(Math.floor(canvas.width / 140), 12);
  for (let i = 0; i < streamCount; i++) {
    telemetryStreams.push({
      x: (i + 0.5) * (canvas.width / streamCount) + (Math.random() - 0.5) * 40,
      y: Math.random() * canvas.height,
      text: TELEMETRY_PHRASES[Math.floor(Math.random() * TELEMETRY_PHRASES.length)],
      vy: -(Math.random() * 0.4 + 0.2),
      alpha: Math.random() * 0.28 + 0.1,
      fontSize: Math.floor(Math.random() * 2) + 10,
      color: Math.random() > 0.4 ? '#23d6bb' : '#38bdf8'
    });
  }
}

function startLoginCanvasAnimation() {
  const canvas = document.getElementById('login-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (canvasAnimId) cancelAnimationFrame(canvasAnimId);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 1. Concentric Holographic Range Rings
    ctx.save();
    ctx.strokeStyle = 'rgba(35, 214, 187, 0.045)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 12]);
    const maxR = Math.max(canvas.width, canvas.height) * 0.65;
    for (let r = 180; r < maxR; r += 160) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Crosshair axes
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
    ctx.beginPath();
    ctx.moveTo(0, centerY); ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0); ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    ctx.restore();

    // 2. Animated Radar Sweep Beam on Canvas
    radarAngle += 0.009;
    if (radarAngle > Math.PI * 2) radarAngle = 0;
    const sweepLen = Math.max(canvas.width, canvas.height);
    const sweepEndX = centerX + Math.cos(radarAngle) * sweepLen;
    const sweepEndY = centerY + Math.sin(radarAngle) * sweepLen;
    
    ctx.save();
    const sweepGrad = ctx.createLinearGradient(centerX, centerY, sweepEndX, sweepEndY);
    sweepGrad.addColorStop(0, 'rgba(35, 214, 187, 0.22)');
    sweepGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.10)');
    sweepGrad.addColorStop(1, 'rgba(35, 214, 187, 0)');
    ctx.strokeStyle = sweepGrad;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(sweepEndX, sweepEndY);
    ctx.stroke();
    ctx.restore();

    // 3. Floating Telemetry Stream Packets
    ctx.save();
    for (let s of telemetryStreams) {
      s.y += s.vy;
      if (s.y < -30) {
        s.y = canvas.height + 20;
        s.x = Math.random() * canvas.width;
        s.text = TELEMETRY_PHRASES[Math.floor(Math.random() * TELEMETRY_PHRASES.length)];
        s.alpha = Math.random() * 0.28 + 0.1;
      }
      ctx.font = `600 ${s.fontSize}px 'JetBrains Mono', Consolas, monospace`;
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.fillText(s.text, s.x, s.y);
    }
    ctx.restore();

    // 4. Interactive Shockwaves (expanding subtle rings)
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha -= 0.012;
      if (sw.radius >= sw.maxRadius || sw.alpha <= 0) {
        shockwaves.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = Math.max(0, sw.alpha);
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 12;
      ctx.shadowColor = sw.color;
      ctx.stroke();
      ctx.restore();
    }

    // Damp mouse velocity naturally for inertia response
    mouseVel.x *= 0.88;
    mouseVel.y *= 0.88;
    if (Math.abs(mouseVel.x) < 0.01) mouseVel.x = 0;
    if (Math.abs(mouseVel.y) < 0.01) mouseVel.y = 0;
    const mouseSpeed = Math.sqrt(mouseVel.x * mouseVel.x + mouseVel.y * mouseVel.y);

    // 5. Perfect Circular Donut / Ring Particle System
    const influenceRadius = 220;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Current spatial position before applying frame forces
      const curOrbitX = Math.cos(p.orbitAngle) * p.orbitRadius;
      const curOrbitY = Math.sin(p.orbitAngle) * p.orbitRadius;
      const curX = p.baseX + curOrbitX;
      const curY = p.baseY + curOrbitY;

      // Distance to cursor
      const dx = mousePos.x - curX;
      const dy = mousePos.y - curY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetExcitement = 0;

      if (dist < influenceRadius && dist > 1) {
        const prox = 1 - dist / influenceRadius; // 0 to 1
        targetExcitement = prox;

        const nx = dx / dist;
        const ny = dy / dist;

        // Flow reaction: cursor movement pulls particles along with natural delay/inertia
        // Fast movement creates stronger flow, slow movement creates gentle pull
        const flowFactor = Math.min(mouseSpeed * 0.06, 2.4) * (prox * prox);
        p.followVx += mouseVel.x * 0.035 * prox + (mouseSpeed > 0.1 ? mouseVel.x * 0.025 * flowFactor : 0);
        p.followVy += mouseVel.y * 0.035 * prox + (mouseSpeed > 0.1 ? mouseVel.y * 0.025 * flowFactor : 0);

        // Gentle attraction towards cursor
        const attract = (0.28 + Math.min(mouseSpeed * 0.04, 0.5)) * (prox * prox);
        p.followVx += nx * attract * 0.65;
        p.followVy += ny * attract * 0.65;

        // Gentle tangential swirl around cursor so they flow gracefully without bunching up
        const tx = -ny;
        const ty = nx;
        p.followVx += tx * (p.swirlDir * 0.22 * prox);
        p.followVy += ty * (p.swirlDir * 0.22 * prox);
      }

      // Smooth inertia decay: particles decelerate and smoothly return to their autonomous paths
      p.followVx *= 0.91;
      p.followVy *= 0.91;

      // Smooth excitement interpolation (controls brightness, radius, speed)
      p.excitement += (targetExcitement - p.excitement) * 0.08;

      // Autonomous motion: drift + orbit, slightly faster when excited by cursor
      const speedMultiplier = 1 + p.excitement * 1.35;
      p.orbitAngle += p.orbitSpeed * speedMultiplier;
      p.pulse += p.pulseSpeed;

      // Update anchor position with autonomous drift + follow velocity
      p.baseX += p.baseVx * speedMultiplier + p.followVx;
      p.baseY += p.baseVy * speedMultiplier + p.followVy;

      // Seamless screen boundary wrap
      const margin = 50;
      if (p.baseX < -margin) p.baseX = canvas.width + margin;
      if (p.baseX > canvas.width + margin) p.baseX = -margin;
      if (p.baseY < -margin) p.baseY = canvas.height + margin;
      if (p.baseY > canvas.height + margin) p.baseY = -margin;

      // Final coordinates for rendering
      const drawX = p.baseX + Math.cos(p.orbitAngle) * p.orbitRadius;
      const drawY = p.baseY + Math.sin(p.orbitAngle) * p.orbitRadius;

      // Donut / Ring geometry: hollow center with thin circular stroke
      const currentRadius = (p.baseRadius + Math.sin(p.pulse) * 0.35) * (1 + p.excitement * 0.45);
      const currentLineWidth = p.lineWidth * (1 + p.excitement * 0.35);
      const currentAlpha = Math.min(0.95, p.baseAlpha + p.excitement * 0.55);

      // Render perfect circular donut/ring (NEVER filled dot or lines)
      ctx.save();
      ctx.beginPath();
      ctx.arc(drawX, drawY, Math.max(1, currentRadius), 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = currentLineWidth;
      ctx.globalAlpha = currentAlpha;

      if (p.excitement > 0.08) {
        ctx.shadowBlur = 9 * p.excitement;
        ctx.shadowColor = p.color;
      }

      ctx.stroke(); // Hollow ring with clear outline
      ctx.restore();
    }

    canvasAnimId = requestAnimationFrame(draw);
  }

  draw();
}

function stopLoginCanvasAnimation() {
  if (canvasAnimId) {
    cancelAnimationFrame(canvasAnimId);
    canvasAnimId = null;
  }
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
   Welcome canvas: subtle floating particles, cursor parallax
--------------------------------------------------------------- */
function initWelcomeCanvas() {
  const canvas = document.getElementById('wt-canvas');
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let animId = null;
  let mouseX = W / 2;
  let mouseY = H / 2;
  let running = true;

  // Particle palette — very muted to stay on-brand
  const PALETTE = [
    'rgba(37, 99, 235, IDX)',   // blue
    'rgba(56,189,248, IDX)',    // sky
    'rgba(139,92,246, IDX)',    // violet
    'rgba(17,24,39, IDX)',      // near-black
  ];

  function makeColor(idx, alpha) {
    return PALETTE[idx % PALETTE.length].replace('IDX', alpha.toFixed(2));
  }

  // Generate particles
  const COUNT = Math.min(55, Math.floor(W * H / 22000));
  const particles = Array.from({ length: COUNT }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 1.5 + Math.random() * 2.5,
    alpha: 0.06 + Math.random() * 0.12,
    alphaDir: Math.random() < 0.5 ? 1 : -1,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: (Math.random() - 0.5) * 0.25,
    colorIdx: Math.floor(Math.random() * PALETTE.length),
    parallaxStrength: 0.008 + Math.random() * 0.018,
  }));

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;

    for (const p of particles) {
      // Parallax offset from cursor
      const ox = (mouseX - cx) * p.parallaxStrength;
      const oy = (mouseY - cy) * p.parallaxStrength;

      // Drift
      p.x += p.speedX;
      p.y += p.speedY;

      // Breathe alpha
      p.alpha += 0.0008 * p.alphaDir;
      if (p.alpha > 0.18) p.alphaDir = -1;
      if (p.alpha < 0.04) p.alphaDir = 1;

      // Wrap edges
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      const drawX = p.x + ox;
      const drawY = p.y + oy;

      ctx.beginPath();
      ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = makeColor(p.colorIdx, p.alpha);
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  draw();

  // Resize handler
  const onResize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize, { passive: true });

  // Mouse parallax
  const onMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
  window.addEventListener('mousemove', onMouse, { passive: true });

  // Cleanup function returned to caller
  return function cleanup() {
    running = false;
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onMouse);
    if (ctx) ctx.clearRect(0, 0, W, H);
  };
}
