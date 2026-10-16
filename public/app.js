// ============================================================
// MSS KPI Dashboard ”” Frontend
// Security Operations Console & Executive Reporting Engine
// ============================================================

// API base URL — empty string means same-origin (works on Render, Vercel, any host).
// Only point to localhost when explicitly running on localhost/127.0.0.1.
let API = (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.protocol === 'file:'
) ? 'http://' + (window.location.hostname || 'localhost') + ':4321' : '';

async function fetchWithFallback(urlPath, options) {
  const fullUrl = API + urlPath;
  try {
    return await fetch(fullUrl, options);
  } catch (err) {
    if (API.includes('localhost')) {
      API = 'http://127.0.0.1:4321';
      return await fetch(API + urlPath, options);
    } else if (API.includes('127.0.0.1')) {
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

// ---- Live Client Page Sync Broadcaster ----
const mainSyncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('brysa_mss_channel') : null;

function broadcastMainUpdate(targetMonth) {
  const m = targetMonth || state.month;
  try {
    localStorage.setItem('brysa_active_month', m);
    localStorage.setItem('brysa_data_version', String(Date.now()));
  } catch (e) {}
  if (mainSyncChannel) {
    try {
      mainSyncChannel.postMessage({ type: 'main_page_updated', month: m, timestamp: Date.now() });
    } catch (e) {}
  }
  fetch('/api/active-month', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ month: m })
  }).catch(() => {});
}

async function api(path, opts = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (state.token) headers['Authorization'] = 'Bearer ' + state.token;
  let res;
  try {
    res = await fetchWithFallback(path, Object.assign({}, opts, { headers }));
  } catch (err) {
    throw new Error('Server not reachable. Please check your connection and try again.');
  }
  if (res.status === 401) { doLogout(true); throw new Error('Not authenticated'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  if (opts.method && opts.method.toUpperCase() === 'POST' && (path.includes('/api/data') || path.includes('/api/weights') || path.includes('/api/narrative'))) {
    broadcastMainUpdate(state.month);
  }
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
  initCustomCalendar();

  if (state.token) {
    try { await initApp(); return; } catch (e) { /* fall through to login */ }
  }
  showLogin();
}

// ---------- Sidebar Toggle ("A0" Brand Button) ----------
// ---------- Sidebar Toggle & Reference Style Rail Navigation ----------
window.toggleSidebar = function(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const sidebar = document.getElementById('main-sidebar');
  const app = document.getElementById('app');
  if (window.innerWidth < 900) {
    if (app) app.classList.toggle('sidebar-active');
  } else {
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
      const isCollapsed = sidebar.classList.contains('collapsed');
      document.querySelectorAll('.toggle-icon-bars').forEach(el => el.style.display = isCollapsed ? 'block' : 'none');
      document.querySelectorAll('.toggle-icon-close').forEach(el => el.style.display = isCollapsed ? 'none' : 'block');
      const brandLogo = document.getElementById('sidebar-brand-a0');
      if (brandLogo) {
        brandLogo.setAttribute('title', isCollapsed ? 'Click logo to expand sidebar' : 'Click logo to collapse sidebar');
      }
    }
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
  const brandLogo = document.getElementById('sidebar-brand-a0');
  const brandContainer = document.querySelector('.sidebar .brand');
  const mobileBrandToggle = document.getElementById('mobile-brand-toggle');

  if (toggleBtn) {
    toggleBtn.onclick = window.toggleSidebar;
  }

  // Clicking the A0 Logo toggles the sidebar
  if (brandLogo) {
    brandLogo.onclick = window.toggleSidebar;
    brandLogo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.toggleSidebar(e);
      }
    });
  }

  // When sidebar is collapsed rail, clicking anywhere on the brand header expands it
  if (brandContainer) {
    brandContainer.addEventListener('click', (e) => {
      const sidebar = document.getElementById('main-sidebar');
      if (sidebar && sidebar.classList.contains('collapsed')) {
        if (e.target !== brandLogo && !brandLogo.contains(e.target)) {
          window.toggleSidebar(e);
        }
      }
    });
  }

  if (mobileBrandToggle) {
    mobileBrandToggle.onclick = window.toggleSidebar;
  }

  if (closeBtn) {
    closeBtn.onclick = window.toggleSidebar;
  }

  if (overlay) {
    overlay.onclick = window.closeSidebar;
  }

  // Only close on mobile screen nav-item click
  document.addEventListener('click', (e) => {
    const isNavClick = e.target.closest('.nav-item');
    if (isNavClick && app && window.innerWidth < 900) {
      app.classList.remove('sidebar-active');
    }
  });

  // ESC key dismisses mobile sidebar drawer
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

  // Helper to fill credentials with visual feedback
  function fillCredentials(user, pass, label) {
    const userInp = document.getElementById('login-username');
    const passInp = document.getElementById('login-password');
    if (userInp) userInp.value = user;
    if (passInp) passInp.value = pass;
    showToast(`Autofilled ${label} credentials (${user})`, 'green');
    const submitBtn = document.getElementById('login-btn-submit');
    if (submitBtn) {
      submitBtn.focus();
      submitBtn.classList.add('pulse-glow');
      setTimeout(() => submitBtn.classList.remove('pulse-glow'), 1200);
    }
  }

  const quickLoginBtn = document.getElementById('quick-demo-login');
  if (quickLoginBtn) {
    quickLoginBtn.addEventListener('click', () => {
      fillCredentials('Jeeva', '0123', 'Super Admin');
    });
  }

  // Social Login Pill Buttons (Quick Role Selectors from Image 1)
  const googleBtn = document.getElementById('btn-social-google');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      fillCredentials('Jeeva', '0123', 'Google Auth (Super Admin)');
    });
  }

  const discordBtn = document.getElementById('btn-social-discord');
  if (discordBtn) {
    discordBtn.addEventListener('click', () => {
      fillCredentials('admin', 'admin123', 'Discord Auth (Admin)');
    });
  }

  const fbBtn = document.getElementById('btn-social-facebook');
  if (fbBtn) {
    fbBtn.addEventListener('click', () => {
      fillCredentials('editor', 'editor123', 'Meta Auth (SecOps)');
    });
  }

  // Forgot password helper
  const forgotBtn = document.getElementById('btn-forgot-password');
  if (forgotBtn) {
    forgotBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Demo Credentials: Jeeva / 0123 (Super Admin), admin / admin123, editor / editor123', 'blue');
    });
  }

  // Theme toggle button on top right of neumorphic screen
  const themeToggleBtn = document.getElementById('login-theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const loginScreen = document.getElementById('login-screen');
      if (loginScreen) {
        loginScreen.classList.toggle('dark-preview');
        const isDark = loginScreen.classList.contains('dark-preview');
        themeToggleBtn.style.transform = 'scale(0.92) rotate(180deg)';
        setTimeout(() => { themeToggleBtn.style.transform = ''; }, 300);
        showToast(isDark ? 'Neumorphic High-Contrast Dark mode active' : 'Neumorphic Clean Light shade active', 'blue');
      }
    });
  }

  // Remember me initial load
  const rememberCb = document.getElementById('remember-me');
  const savedUser = localStorage.getItem('mss_saved_username');
  if (rememberCb && savedUser) {
    rememberCb.checked = true;
    const userInp = document.getElementById('login-username');
    if (userInp && !userInp.value) userInp.value = savedUser;
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

    // Handle Remember Me persistence
    const rememberCb = document.getElementById('remember-me');
    if (rememberCb && rememberCb.checked) {
      localStorage.setItem('mss_saved_username', state.username);
    } else {
      localStorage.removeItem('mss_saved_username');
    }

    stopLoginCanvasAnimation();
    // Show premium welcome transition, then reveal dashboard
    await showWelcomeTransition(state.username, async () => {
      await initApp();
      showToast('Signed in as ' + state.username + ' (' + state.roleLabel + ')', 'green');
    });
  } catch (err) {
    if (err.name === 'TypeError' || (err.message && err.message.toLowerCase().includes('fetch'))) {
      errBox.textContent = 'Server-க்கு connect பண்ண முடியல. Network connection check பண்ணி மீண்டும் try பண்ணவும்.';
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
  const monthInput = document.getElementById('month-input');
  if (monthInput && state.month) {
    monthInput.value = state.month;
  }
  updateMonthDisplayLabel();
  syncCalendarToStateMonth();
  await loadMonthData();
  setView('overview');
}

const SECTION_COLORS = {
  'overview': '#ef4444',
  'exec': '#3b82f6',
  'users': '#f59e0b',
  'audit': '#06b6d4',
  'section:endpoint': '#10b981',
  'section:endpoints': '#10b981',
  'section:patch': '#8b5cf6',
  'section:patching': '#8b5cf6',
  'section:protection': '#0ea5e9',
  'section:secops': '#ec4899',
  'section:vuln': '#f97316',
  'section:vulnerabilities': '#f97316',
  'section:identity': '#6366f1',
  'section:email': '#14b8a6',
  'section:service': '#3b82f6',
  'section:compliance': '#10b981'
};

function buildSectionNav() {
  const nav = document.getElementById('nav-sections');
  nav.querySelectorAll('.nav-item').forEach(n => n.remove());
  state.sections.forEach(sec => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.dataset.view = 'section:' + sec.id;
    btn.title = sec.name;
    const viewKey = 'section:' + sec.id;
    const color = SECTION_COLORS[viewKey] || '#8b5cf6';
    btn.style.setProperty('--item-active-color', color);
    btn.innerHTML = `<div class="nav-icon-bubble">${ICONS[sec.icon] || ICONS.grid}</div><span class="nav-text">${sec.name}</span><span class="nav-item-dot" id="dot-${sec.id}"></span>`;
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

// ---------- Ultra-Modern Dark Glow Calendar Controller (Year Scroll & Month Picker) ----------
let calViewYear = 2026;
let calViewMonth = 5; // 1-12

function updateMonthDisplayLabel() {
  const label = document.getElementById('month-display-text');
  if (label && state.month) {
    label.textContent = formatMonthHuman(state.month);
  }
}

function syncCalendarToStateMonth() {
  if (!state.month) return;
  const parts = state.month.split('-');
  if (parts.length >= 2) {
    calViewYear = parseInt(parts[0], 10);
    calViewMonth = parseInt(parts[1], 10);
  }
  renderCustomCalendar();
}

function initCustomCalendar() {
  const trigger = document.getElementById('month-picker-trigger');
  const popup = document.getElementById('custom-calendar-popup');
  const prevMonthBtn = document.getElementById('cal-nav-prev');
  const nextMonthBtn = document.getElementById('cal-nav-next');
  const prevYearBtn = document.getElementById('cal-year-scroll-prev');
  const nextYearBtn = document.getElementById('cal-year-scroll-next');
  const yearScrollBox = document.getElementById('cal-year-scroll-container');

  if (state.month) {
    const parts = state.month.split('-');
    if (parts.length >= 2) {
      calViewYear = parseInt(parts[0], 10);
      calViewMonth = parseInt(parts[1], 10);
    }
  }

  updateMonthDisplayLabel();
  renderCustomCalendar();

  if (trigger && popup) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCustomCalendar();
    });
  }

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCalendarMonth(-1);
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCalendarMonth(1);
    });
  }

  if (prevYearBtn) {
    prevYearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCalendarYear(-1);
    });
  }

  if (nextYearBtn) {
    nextYearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCalendarYear(1);
    });
  }

  // Interactive mouse wheel scrolling & swipe gestures for years (Fix bi-directional scroll)
  if (yearScrollBox) {
    let lastWheelTime = 0;
    yearScrollBox.addEventListener('wheel', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const now = Date.now();
      if (now - lastWheelTime < 130) return;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      let delta = 0;
      if (absX > absY && absX > 2) {
        // Horizontal scroll: scroll right (deltaX > 0) moves forward (+1)
        // scroll left (deltaX < 0) moves backward (-1)
        delta = e.deltaX > 0 ? 1 : -1;
      } else if (absY > 2) {
        // Vertical wheel: scroll down (deltaY > 0) moves forward (+1)
        // scroll up (deltaY < 0) moves backward (-1)
        delta = e.deltaY > 0 ? 1 : -1;
      }

      if (delta !== 0) {
        lastWheelTime = now;
        navigateCalendarYear(delta);
      }
    }, { passive: false });

    // Touch & pointer drag swipe support for year ribbon
    let startX = 0;
    let isDragging = false;
    yearScrollBox.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.cal-year-nav-btn')) return;
      startX = e.clientX;
      isDragging = true;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const diffX = e.clientX - startX;
      if (Math.abs(diffX) > 28) {
        isDragging = false;
        // Dragging left moves forward (+1), dragging right moves backward (-1)
        navigateCalendarYear(diffX < 0 ? 1 : -1);
      }
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
    });
  }

  // Dismiss calendar popup when clicking outside
  document.addEventListener('click', (e) => {
    if (popup && popup.style.display !== 'none') {
      if (!popup.contains(e.target) && !trigger?.contains(e.target)) {
        closeCustomCalendar();
      }
    }
  });

  // Dismiss calendar popup on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCustomCalendar();
    }
  });
}

function toggleCustomCalendar() {
  const popup = document.getElementById('custom-calendar-popup');
  const trigger = document.getElementById('month-picker-trigger');
  if (!popup) return;

  const isOpen = popup.style.display !== 'none';
  if (isOpen) {
    closeCustomCalendar();
  } else {
    if (state.month) {
      const parts = state.month.split('-');
      if (parts.length >= 2) {
        calViewYear = parseInt(parts[0], 10);
        calViewMonth = parseInt(parts[1], 10);
      }
    }
    renderCustomCalendar();
    popup.style.display = 'block';
    if (trigger) trigger.classList.add('active');
  }
}

function closeCustomCalendar() {
  const popup = document.getElementById('custom-calendar-popup');
  const trigger = document.getElementById('month-picker-trigger');
  if (popup) popup.style.display = 'none';
  if (trigger) trigger.classList.remove('active');
}

function navigateCalendarMonth(delta) {
  calViewMonth += delta;
  if (calViewMonth < 1) {
    calViewMonth = 12;
    calViewYear--;
  } else if (calViewMonth > 12) {
    calViewMonth = 1;
    calViewYear++;
  }
  renderCustomCalendar();
}

function navigateCalendarYear(delta) {
  calViewYear += delta;
  renderCustomCalendar();
}

function renderCustomCalendar() {
  const titleEl = document.getElementById('cal-month-title');
  const yearTrack = document.getElementById('cal-year-track');
  const monthsGrid = document.getElementById('cal-months-grid');
  if (!titleEl && !monthsGrid) return;

  const monthDate = new Date(calViewYear, calViewMonth - 1, 1);
  const monthNameLong = monthDate.toLocaleString('en-US', { month: 'long' });
  if (titleEl) {
    titleEl.textContent = `${monthNameLong} ${calViewYear}`;
  }

  // 1. Render Year Scroll Track with active highlight & quick jump
  if (yearTrack) {
    yearTrack.innerHTML = '';
    for (let y = calViewYear - 1; y <= calViewYear + 1; y++) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'cal-year-chip' + (y === calViewYear ? ' active' : '');
      chip.textContent = y;
      chip.title = `Switch to year ${y}`;
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        calViewYear = y;
        renderCustomCalendar();
      });
      yearTrack.appendChild(chip);
    }
  }

  // 2. Render 12 Months Grid (JAN through DEC)
  if (monthsGrid) {
    monthsGrid.innerHTML = '';
    const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [selectedY, selectedM] = (state.month || currentMonthStr()).split('-').map(Number);

    MONTHS_SHORT.forEach((mName, idx) => {
      const mNum = idx + 1;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-month-cell';
      if (calViewYear === selectedY && mNum === selectedM) {
        btn.classList.add('selected');
      }
      btn.textContent = mName;
      btn.title = `Select ${mName} ${calViewYear}`;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectCalendarMonth(calViewYear, mNum);
      });
      monthsGrid.appendChild(btn);
    });
  }
}

async function selectCalendarMonth(y, m) {
  calViewYear = y;
  calViewMonth = m;
  const monthStr = `${y}-${String(m).padStart(2, '0')}`;
  state.month = monthStr;

  const monthInput = document.getElementById('month-input');
  if (monthInput) monthInput.value = state.month;

  updateMonthDisplayLabel();
  renderCustomCalendar();
  closeCustomCalendar();

  await loadMonthData();
  await loadMonthsHistory();
  renderView();
  broadcastMainUpdate(state.month);
}

async function onMonthChange(e) {
  state.month = e.target.value || currentMonthStr();
  updateMonthDisplayLabel();
  syncCalendarToStateMonth();
  await loadMonthData();
  await loadMonthsHistory();
  renderView();
  broadcastMainUpdate(state.month);
}

async function shiftMonth(delta) {
  const parts = state.month.split('-');
  let y = parseInt(parts[0], 10);
  let m = parseInt(parts[1], 10) + delta;
  if (m < 1) { m = 12; y--; }
  else if (m > 12) { m = 1; y++; }
  state.month = `${y}-${String(m).padStart(2, '0')}`;
  const monthInput = document.getElementById('month-input');
  if (monthInput) monthInput.value = state.month;
  updateMonthDisplayLabel();
  syncCalendarToStateMonth();
  await loadMonthData();
  await loadMonthsHistory();
  renderView();
  broadcastMainUpdate(state.month);
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
    'YTD Value',
    'YTD Status',
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
    } else if (metric.mode === 'four_layer') {
      detailStr = `Sophos: ${inputs.sophos ?? ''} | ME: ${inputs.manageengine ?? ''} | VPN: ${inputs.vpn ?? ''} | MFA: ${inputs.mfa ?? ''} / Managed: ${inputs.den ?? ''}`;
    } else if (metric.mode === 'ratio') {
      detailStr = `${metric.numLabel || 'Num'}: ${inputs.num ?? ''} / ${metric.denLabel || 'Den'}: ${inputs.den ?? ''}`;
    } else if (metric.mode === 'avg') {
      detailStr = `${metric.totalLabel || 'Total'}: ${inputs.total ?? ''} / ${metric.countLabel || 'Count'}: ${inputs.count ?? ''}`;
    } else if (metric.mode === 'derived') {
      detailStr = 'Auto-derived formula';
    } else {
      detailStr = inputs.value !== undefined && inputs.value !== null ? `Value: ${inputs.value}` : '';
    }

    const ytdEntry = (state.monthData && state.monthData.ytd && state.monthData.ytd[metric.id]) || {};
    const ytdValStr = ytdEntry.computed !== null && ytdEntry.computed !== undefined ? String(ytdEntry.computed) : '';
    const ytdRagStr = metric.direction === 'trend' ? 'TREND' : (ytdEntry.rag ? ytdEntry.rag.toUpperCase() : '');

    rows.push([
      secName,
      metric.id,
      metric.label,
      metric.direction,
      targetStr,
      valStr,
      metric.unit || '',
      ragStr,
      ytdValStr,
      ytdRagStr,
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
  const overallDetails = state.monthData.overallDetails || {};
  const vetoBreaches = overallDetails.vetoBreaches || [];
  const weightedScore = overallDetails.weightedScore;
  const numerator = overallDetails.numerator;
  const denominator = overallDetails.denominator;

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

      const ytdEntry = (state.monthData.ytd && state.monthData.ytd[m.id]) || {};
      const ytdVal = ytdEntry.computed !== null && ytdEntry.computed !== undefined
        ? String(ytdEntry.computed) + (m.unit || '') : '—';
      const ytdRagStr = m.direction === 'trend' ? 'TREND' : (ytdEntry.rag ? ytdEntry.rag.toUpperCase() : '—');
      const yrc = ytdRagStr==='GREEN'?'#15803d':ytdRagStr==='AMBER'?'#b45309':ytdRagStr==='RED'?'#b91c1c':'#475569';
      const yrb = ytdRagStr==='GREEN'?'#dcfce7':ytdRagStr==='AMBER'?'#fef9c3':ytdRagStr==='RED'?'#fee2e2':'#f1f5f9';

      rows += '<tr>'
        + '<td>' + escapeHTML(m.label) + '</td>'
        + '<td>' + escapeHTML(m.desc || '—') + '</td>'
        + '<td style="text-align:center">' + escapeHTML(tgt) + '</td>'
        + '<td style="text-align:center;font-weight:700">' + escapeHTML(val) + '</td>'
        + '<td style="text-align:center"><span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;background:' + rb + ';color:' + rc + '">' + ragStr + '</span></td>'
        + '<td style="text-align:center;font-weight:700">' + escapeHTML(ytdVal) + '</td>'
        + '<td style="text-align:center">' + (ytdRagStr !== '—' ? '<span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;background:' + yrb + ';color:' + yrc + '">' + ytdRagStr + '</span>' : '—') + '</td>'
        + '</tr>';
    });
    sectionsHtml += '<h3 style="font-size:12px;font-weight:700;margin:18px 0 5px;padding-bottom:3px;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:.5px">' + escapeHTML(sec.name) + '</h3>'
      + '<table style="width:100%;border-collapse:collapse;font-size:12px">'
      + '<thead><tr style="background:#f8fafc">'
      + '<th style="padding:5px 8px;text-align:left;border-bottom:1px solid #e2e8f0;color:#475569">Metric</th>'
      + '<th style="padding:5px 8px;text-align:left;border-bottom:1px solid #e2e8f0;color:#475569">Description</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">Target</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">Month Value</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">Month Status</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">YTD Value</th>'
      + '<th style="padding:5px 8px;text-align:center;border-bottom:1px solid #e2e8f0;color:#475569">YTD Status</th>'
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

  const vetoNotice = vetoBreaches.length > 0
    ? '<div style="margin-top:8px;padding:6px 12px;background:#fee2e2;border:1px solid #f87171;border-radius:6px;color:#991b1b;font-size:12px;font-weight:600">⚠ VETO TRIGGERED (' + vetoBreaches.length + ' metric breach' + (vetoBreaches.length>1?'es':'') + '): ' + vetoBreaches.map(b => escapeHTML(b)).join(', ') + '</div>'
    : '';

  const scoreText = weightedScore !== null && weightedScore !== undefined
    ? 'Weighted Score: <strong>' + (weightedScore > 0 ? '+' : '') + weightedScore + '</strong> (Net: ' + (numerator ?? 0) + ' / Den: ' + (denominator ?? 0) + ')'
    : 'Weighted Score: N/A';

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
    + '<div style="padding:14px 18px;border-radius:10px;background:' + ragBg + ';border:1.5px solid ' + ragColor + '44;margin-bottom:20px">'
    + '<div style="display:flex;align-items:center;justify-content:space-between">'
    + '<div><div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px">Overall Security Posture</div><div style="font-size:26px;font-weight:800;color:' + ragColor + '">' + rag + '</div><div style="font-size:11px;color:#475569;margin-top:2px">' + scoreText + '</div></div>'
    + '<div style="display:flex;gap:16px;text-align:center">'
    + '<div><div style="font-size:20px;font-weight:800;color:#16a34a">' + green + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Green</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#d97706">' + amber + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Amber</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#dc2626">' + red + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Red</div></div>'
    + '<div><div style="font-size:20px;font-weight:800;color:#64748b">' + trend + '</div><div style="font-size:10px;color:#64748b;text-transform:uppercase">Trend</div></div>'
    + '</div></div>'
    + vetoNotice
    + '</div>'
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

  if (state.view === 'overview' || state.view === 'trends') {
    state.view = 'overview';
    titleEl.textContent = 'Overview';
    subEl.textContent = 'Reporting period: ' + state.month + (!hasPermission('metrics:write') ? ' • Read-Only' : '');
    root.appendChild(renderOverview());
  } else if (state.view === 'exec') {
    titleEl.textContent = 'Executive Summary';
    subEl.textContent = 'Roll-up for ' + state.month + (!hasPermission('narrative:write') ? ' • Read-Only' : '');
    root.appendChild(renderExecSummary());
  } else if (state.view === 'users') {
    titleEl.textContent = 'Settings & Access Control';
    subEl.textContent = 'System Preferences, User Management & Role-Based Access Control';
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
}

function stopOverviewBgAnimation() {
  if (overviewJellyfishField) {
    overviewJellyfishField.stop();
    overviewJellyfishField = null;
  }
}

// ---------- Interactive Executive Posture Navigator & Status History Component (Reference-Inspired 3-Card Carousel) ----------
function buildInteractiveStatusHistoryPanel() {
  const panel = document.createElement('div');
  panel.className = 'panel interactive-history-panel';

  const months = (state.monthsHistory && state.monthsHistory.length) ? [...state.monthsHistory] : [];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Ensure current active month and calendar month are in months list
  const activeMonth = state.month || currentMonthStr();
  if (activeMonth && !months.some(m => m.month === activeMonth)) {
    const rag = state.monthData ? state.monthData.overallRAG : null;
    let g = 0, a = 0, r = 0, tr = 0;
    if (state.monthData && state.monthData.metrics) {
      Object.values(state.monthData.metrics).forEach(entry => {
        if (entry && entry.rag === 'green') g++;
        else if (entry && entry.rag === 'amber') a++;
        else if (entry && entry.rag === 'red') r++;
        else if (entry && entry.direction === 'trend') tr++;
      });
    }
    months.push({
      month: activeMonth,
      overallRAG: rag,
      overallDetails: state.monthData ? state.monthData.overallDetails : null,
      green: g,
      amber: a,
      red: r,
      trend: tr,
      total: g + a + r + tr,
      hasNarrative: false,
      narrative: {}
    });
  }

  // Ensure calendar current month is present
  const calMonth = currentMonthStr();
  if (calMonth && !months.some(m => m.month === calMonth)) {
    months.push({
      month: calMonth,
      overallRAG: null,
      overallDetails: null,
      green: 0,
      amber: 0,
      red: 0,
      trend: 0,
      total: 0,
      hasNarrative: false,
      narrative: {}
    });
  }

  // Sort chronologically
  months.sort((a, b) => a.month.localeCompare(b.month));

  let inspectedMonthKey = state.month || (months.length > 0 ? months[months.length - 1].month : '');
  if (!months.some(m => m.month === inspectedMonthKey) && months.length > 0) {
    inspectedMonthKey = months[months.length - 1].month;
  }

  // Carousel Active Index: 0 = SLA Metrics (Left), 1 = Trajectory (Center - Default), 2 = MoM Delta (Right)
  let activeIndex = 1;

  panel.innerHTML = `
    <div class="ih-top-center">
      <h2 class="ih-main-title">Status History &amp; SLA Performance</h2>
      <p class="ih-main-subtitle">Multi-period posture tracker &bull; Click any month or curve point to inspect</p>
    </div>

    <!-- Sleek Timeline Ribbon Track -->
    <div class="ih-ribbon-wrap">
      <div class="ih-ribbon-track" id="ih-ribbon-track"></div>
    </div>

    <!-- 3D Interactive Carousel Container -->
    <div class="ih-carousel-wrapper">
      <button type="button" class="ih-nav-btn left" id="ih-nav-prev" aria-label="Previous Card">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4">
          <path d="M12.5 15l-5-5 5-5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="ih-carousel-track" id="ih-carousel-track">
        <!-- Card 0: SLA Metrics -->
        <div class="ih-carousel-card" id="ih-card-sla" data-card-idx="0">
          <div id="ih-card-sla-content" class="ih-card-inner"></div>
        </div>

        <!-- Card 1: Trajectory (Center / Featured) -->
        <div class="ih-carousel-card" id="ih-card-traj" data-card-idx="1">
          <div id="ih-card-traj-content" class="ih-card-inner"></div>
        </div>

        <!-- Card 2: MoM Delta -->
        <div class="ih-carousel-card" id="ih-card-delta" data-card-idx="2">
          <div id="ih-card-delta-content" class="ih-card-inner"></div>
        </div>
      </div>

      <button type="button" class="ih-nav-btn right" id="ih-nav-next" aria-label="Next Card">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4">
          <path d="M7.5 15l5-5-5-5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Carousel Indicators (Pill Dots) -->
    <div class="ih-indicators" id="ih-indicators">
      <div class="ih-dot" data-dot-idx="0" title="SLA Metrics"></div>
      <div class="ih-dot active" data-dot-idx="1" title="Trajectory"></div>
      <div class="ih-dot" data-dot-idx="2" title="MoM Delta"></div>
    </div>

    <!-- Bottom Sync / Dashboard Action (Reference-inspired pill) -->
    <div class="ih-bottom-action-wrap">
      <button type="button" class="ih-pill-action" id="ih-sync-cta"></button>
    </div>
  `;

  const ribbon = panel.querySelector('#ih-ribbon-track');
  const cardSla = panel.querySelector('#ih-card-sla');
  const cardTraj = panel.querySelector('#ih-card-traj');
  const cardDelta = panel.querySelector('#ih-card-delta');
  const navPrev = panel.querySelector('#ih-nav-prev');
  const navNext = panel.querySelector('#ih-nav-next');
  const syncBtn = panel.querySelector('#ih-sync-cta');

  function getMonthObj(mKey) {
    return months.find(x => x.month === mKey) || months[months.length - 1] || null;
  }

  function getMonthLabel(mKey) {
    if (!mKey) return 'N/A';
    const parts = mKey.split('-');
    const mNum = parseInt(parts[1], 10);
    const mName = monthNames[mNum - 1] || parts[1];
    return `${mName} 20${parts[0].slice(2)}`;
  }

  // Render Horizontal Timeline Ribbon
  function renderTimelineRibbon() {
    ribbon.innerHTML = '';
    if (!months.length) {
      ribbon.innerHTML = `<div class="empty-note" style="padding:6px 0;">No history recorded yet.</div>`;
      return;
    }

    months.forEach(m => {
      const isInspected = m.month === inspectedMonthKey;
      const isDashboardCur = m.month === state.month;
      const color = m.overallRAG || 'none';
      const parts = m.month.split('-');
      const mNum = parseInt(parts[1], 10);
      const mName = monthNames[mNum - 1] || parts[1];
      const yearShort = parts[0].slice(2);

      const ov = m.overallDetails || {};
      const hasVeto = (ov.vetoBreaches && ov.vetoBreaches.length > 0);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `m-pill ih-ribbon-btn ${isInspected ? 'active is-active' : ''}`;
      btn.dataset.month = m.month;
      btn.title = `${mName} 20${yearShort}${color !== 'none' ? ` (${hasVeto ? 'VETO' : color.toUpperCase()})` : ''}`;
      btn.textContent = mName;

      btn.addEventListener('click', async () => {
        inspectedMonthKey = m.month;
        if (state.month !== m.month) {
          state.month = m.month;
          const monthInput = document.getElementById('month-input');
          if (monthInput) monthInput.value = state.month;
          await loadMonthData();
          renderView();
        } else {
          renderTimelineRibbon();
          renderAllCards();
        }
      });

      ribbon.appendChild(btn);
    });
  }

  // Render Card 0: SLA Metrics Content
  function renderSlaCardContent(m) {
    const target = panel.querySelector('#ih-card-sla-content');
    if (!target) return;
    if (!m) {
      target.innerHTML = '<div class="empty-note">No monthly data available.</div>';
      return;
    }
    const g = m.green || 0;
    const a = m.amber || 0;
    const r = m.red || 0;
    const t = m.trend || 0;
    const slaTotal = g + a + r || 31;
    const gPct = Math.round((g / slaTotal) * 100);
    const aPct = Math.round((a / slaTotal) * 100);
    const rPct = Math.round((r / slaTotal) * 100);
    const color = m.overallRAG || 'none';

    target.innerHTML = `
      <div class="ih-card-header">
        <div class="ih-badge-row">
          <span class="ih-card-tag">SLA MATRIX</span>
          <span class="ih-card-period-tag ${color}">${getMonthLabel(m.month)} &bull; ${color.toUpperCase()}</span>
        </div>
        <div class="ih-card-title">Core SLA Metrics Distribution</div>
        <div class="ih-card-desc">Evaluated breakdown across all monitored target endpoints</div>
      </div>

      <div class="ih-quad-grid-compact">
        <div class="ih-quad-item green">
          <div class="ih-quad-num green">${g}</div>
          <div class="ih-quad-meta">
            <div class="ih-quad-lbl">Within Target</div>
            <div class="ih-quad-sub">${gPct}% of evaluated</div>
          </div>
        </div>
        <div class="ih-quad-item amber">
          <div class="ih-quad-num amber">${a}</div>
          <div class="ih-quad-meta">
            <div class="ih-quad-lbl">Attention Required</div>
            <div class="ih-quad-sub">${aPct}% of evaluated</div>
          </div>
        </div>
        <div class="ih-quad-item red">
          <div class="ih-quad-num red">${r}</div>
          <div class="ih-quad-meta">
            <div class="ih-quad-lbl">Critical Remediation</div>
            <div class="ih-quad-sub">${rPct}% of evaluated</div>
          </div>
        </div>
        <div class="ih-quad-item purple">
          <div class="ih-quad-num purple">${t}</div>
          <div class="ih-quad-meta">
            <div class="ih-quad-lbl">Operational Telemetry</div>
            <div class="ih-quad-sub">${t} active trackers</div>
          </div>
        </div>
      </div>

      <div class="ih-metrics-footer-row">
        <div class="ih-stat-col">
          <div class="ih-stat-val">${slaTotal}</div>
          <div class="ih-stat-lbl">Total Targets</div>
        </div>
        <div class="ih-stat-col">
          <div class="ih-stat-val val-green">${gPct}%</div>
          <div class="ih-stat-lbl">Compliance</div>
        </div>
        <div class="ih-stat-col">
          <div class="ih-stat-val ${r > 0 ? 'val-red' : ''}">${r}</div>
          <div class="ih-stat-lbl">Critical Breaches</div>
        </div>
      </div>
    `;
  }

  // Render Card 1: Trajectory Content (Reference-Inspired Analytic Bar Card)
  function renderTrajectoryCardContent(m) {
    const target = panel.querySelector('#ih-card-traj-content');
    if (!target) return;
    if (!months.length) {
      target.innerHTML = '<div class="empty-note">No monthly data available.</div>';
      return;
    }

    const w = 680;
    const h = 230;
    const padL = 20;
    const padR = 20;
    const baselineY = 186;
    const minH = 34;
    const maxH = 136;
    const plotW = w - padL - padR;
    const n = months.length;
    const colW = n > 0 ? plotW / n : plotW;
    const barW = Math.min(32, Math.max(22, colW * 0.58));

    // Calculate rates for each month
    const pts = months.map((item, i) => {
      const cx = padL + i * colW + colW / 2;
      const x = cx - barW / 2;
      const totalSLA = (item.green || 0) + (item.amber || 0) + (item.red || 0);
      const rate = totalSLA > 0 ? (item.green || 0) / totalSLA : 0.5;
      const ratePct = Math.round(rate * 100);
      // Normalized height between minH and maxH
      const barH = minH + (ratePct / 100) * (maxH - minH);
      const y = baselineY - barH;
      const parts = item.month.split('-');
      const mNum = parseInt(parts[1], 10);
      const mShort = monthNames[mNum - 1] || parts[1];
      const mUpper = mShort.toUpperCase();
      return { x, y, cx, barH, item, ratePct, mShort, mUpper };
    });

    const curPt = pts.find(p => p.item.month === inspectedMonthKey) || pts[pts.length - 1];
    const curRate = curPt ? curPt.ratePct : 0;
    const fullActiveMonthLabel = getMonthLabel(m ? m.month : inspectedMonthKey);

    let svg = `<svg viewBox="0 0 ${w} ${h}">`;
    svg += `
      <defs>
        <!-- Inactive Bar Gradient (Clean Slate Light Theme Capsule) -->
        <linearGradient id="ihInactiveBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e2e8f0" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="#cbd5e1" stop-opacity="0.80"/>
          <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.45"/>
        </linearGradient>

        <!-- Active Bar Gradient (Vibrant Radiant Orange) -->
        <linearGradient id="ihActiveBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff7326"/>
          <stop offset="60%" stop-color="#f97316"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>

        <!-- Floating Card Gradient (Crisp Elevated Glass Card) -->
        <linearGradient id="ihFloatCardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98"/>
          <stop offset="100%" stop-color="#f8fafc" stop-opacity="0.98"/>
        </linearGradient>

        <!-- Glow filter for Active Bar -->
        <filter id="ihOrangeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
    `;

    // Render bars
    pts.forEach((pt) => {
      const isInspected = pt.item.month === inspectedMonthKey;

      if (!isInspected) {
        // Inactive glossy light slate pill bar
        svg += `
          <g class="ih-bar-col" style="cursor:pointer;">
            <rect x="${pt.x}" y="${pt.y}" width="${barW}" height="${pt.barH}" rx="${barW / 2}" 
                  fill="url(#ihInactiveBarGrad)" stroke="#cbd5e1" stroke-width="1" />
          </g>
        `;
      } else {
        // Active glowing vibrant orange bar
        svg += `
          <g class="ih-bar-col active-bar" style="cursor:pointer;">
            <!-- Outer Glow Aura -->
            <rect x="${pt.x - 2}" y="${pt.y - 2}" width="${barW + 4}" height="${pt.barH + 4}" rx="${(barW + 4) / 2}" 
                  fill="#ff5e1a" opacity="0.22" filter="url(#ihOrangeGlow)" />
            
            <!-- Main Glowing Radiant Orange Pill -->
            <rect x="${pt.x}" y="${pt.y}" width="${barW}" height="${pt.barH}" rx="${barW / 2}" 
                  fill="url(#ihActiveBarGrad)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.2" 
                  style="filter: drop-shadow(0 4px 14px rgba(249, 115, 22, 0.45));" />

            <!-- Vertical Center Highlight Line -->
            <line x1="${pt.cx}" y1="${pt.y + 14}" x2="${pt.cx}" y2="${baselineY - 14}" 
                  stroke="rgba(255, 255, 255, 0.75)" stroke-width="1.5" stroke-linecap="round" />

            <!-- Top Circular Checkmark Pin Badge -->
            <circle cx="${pt.cx}" cy="${pt.y}" r="11" fill="#ff5e1a" stroke="#ffffff" stroke-width="2.4" 
                    style="filter: drop-shadow(0 2px 6px rgba(249, 115, 22, 0.35));" />
            <path d="M ${pt.cx - 3.5} ${pt.y} L ${pt.cx - 1} ${pt.y + 3} L ${pt.cx + 4} ${pt.y - 2.5}" 
                  fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        `;
      }

      // Bottom Month Labels
      if (isInspected) {
        svg += `
          <text x="${pt.cx}" y="${baselineY + 24}" font-size="11.5" font-weight="800" fill="#ff5e1a" text-anchor="middle" 
                style="letter-spacing: 0.04em;">${pt.mUpper}</text>
        `;
      } else {
        svg += `
          <text x="${pt.cx}" y="${baselineY + 24}" font-size="10.5" font-weight="600" fill="#64748b" text-anchor="middle" 
                style="letter-spacing: 0.04em;">${pt.mUpper}</text>
        `;
      }

      // Transparent clickable hit zone
      svg += `
        <rect class="ih-traj-zone" data-month="${pt.item.month}" x="${pt.cx - colW / 2}" y="0" width="${colW}" height="${h}" 
              fill="transparent" style="cursor:pointer;" />
      `;
    });

    // Render Floating Tooltip Card over active month
    if (curPt) {
      const curIdx = pts.findIndex(p => p.item.month === inspectedMonthKey);
      const tw = 142;
      const th = 64;
      // Position to right if in left half, else to left of bar
      let tx = (curIdx < n - 3) ? (curPt.cx + 18) : (curPt.cx - tw - 18);
      tx = Math.max(12, Math.min(w - tw - 12, tx));
      const ty = Math.max(10, Math.min(curPt.y - 24, baselineY - th - 20));

      const monthTitle = `${curPt.mShort}, 20${curPt.item.month.split('-')[0].slice(2)}`;

      svg += `
        <g class="ih-floating-tooltip" style="pointer-events:none;">
          <!-- Card Body with Glass Elevation -->
          <rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="12" 
                fill="url(#ihFloatCardGrad)" stroke="#e2e8f0" stroke-width="1.2" 
                style="filter: drop-shadow(0 8px 22px rgba(15, 23, 42, 0.12));" />
          
          <!-- Month Title -->
          <text x="${tx + 12}" y="${ty + 18}" font-size="11.5" font-weight="750" fill="#0f172a" letter-spacing="-0.01em">${monthTitle}</text>
          
          <!-- Row 1: Overall / Compliance -->
          <text x="${tx + 12}" y="${ty + 37}" font-size="10" font-weight="500" fill="#64748b">Overall</text>
          <text x="${tx + tw - 12}" y="${ty + 37}" font-size="12" font-weight="800" fill="#0f172a" text-anchor="end">${curRate}%</text>

          <!-- Row 2: Target / Benchmark -->
          <text x="${tx + 12}" y="${ty + 52}" font-size="10" font-weight="500" fill="#64748b">Benchmark</text>
          <text x="${tx + tw - 12}" y="${ty + 52}" font-size="11" font-weight="700" fill="#059669" text-anchor="end">&ge; 90%</text>
        </g>
      `;
    }

    svg += `</svg>`;

    target.innerHTML = `
      <div class="ih-analytic-header">
        <div class="ih-analytic-title-col">
          <div class="ih-analytic-subtitle">Posture Trajectory</div>
          <div class="ih-analytic-main-val">${curRate}%</div>
        </div>
        <div class="ih-analytic-badge-col">
          <div class="ih-analytic-pill">
            <span class="ih-analytic-pill-dot"></span>
            <span>Monthly</span>
          </div>
          <div class="ih-analytic-date-sub">${fullActiveMonthLabel}</div>
        </div>
      </div>

      <div class="ih-analytic-chart-stage">
        ${svg}
      </div>
    `;

    target.querySelectorAll('.ih-traj-zone').forEach(zone => {
      zone.addEventListener('click', async (e) => {
        e.stopPropagation();
        const targetM = zone.dataset.month;
        inspectedMonthKey = targetM;
        if (state.month !== targetM) {
          state.month = targetM;
          const monthInput = document.getElementById('month-input');
          if (monthInput) monthInput.value = state.month;
          await loadMonthData();
          renderView();
        } else {
          renderTimelineRibbon();
          renderAllCards();
        }
      });
    });
  }

  // Render Card 2: MoM Delta Content
  function renderDeltaCardContent(m) {
    const target = panel.querySelector('#ih-card-delta-content');
    if (!target) return;
    if (!m) {
      target.innerHTML = '<div class="empty-note">No monthly data available.</div>';
      return;
    }
    const idx = months.findIndex(x => x.month === m.month);
    const prev = idx > 0 ? months[idx - 1] : null;

    let deltaHtml = '';
    let prevScore = 0;
    let curScore = 0;
    let scoreDiffStr = '0.00';

    if (!prev) {
      deltaHtml = `
        <div class="ih-delta-empty-state">
          <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:4px;">Earliest Historical Milestone</div>
          <div style="font-size:11.5px; color:#64748b;">${getMonthLabel(m.month)} represents the origin cycle in security archives. Prior period comparison baseline is not available.</div>
        </div>
      `;
    } else {
      const gDiff = (m.green || 0) - (prev.green || 0);
      const rDiff = (m.red || 0) - (prev.red || 0);

      curScore = m.overallDetails && m.overallDetails.weightedScore !== undefined ? m.overallDetails.weightedScore : 0;
      prevScore = prev.overallDetails && prev.overallDetails.weightedScore !== undefined ? prev.overallDetails.weightedScore : 0;
      const scoreDiff = (curScore - prevScore).toFixed(2);
      scoreDiffStr = scoreDiff > 0 ? '+' + scoreDiff : scoreDiff;

      deltaHtml = `
        <div class="ih-delta-grid-compact">
          <div class="ih-delta-item ${gDiff >= 0 ? 'good' : 'bad'}">
            <div class="ih-delta-item-header">
              <span class="ih-delta-item-title">SLA Compliance Shift</span>
              <span class="ih-delta-item-val">${gDiff >= 0 ? '+' + gDiff : gDiff}</span>
            </div>
            <div class="ih-delta-item-sub">${gDiff >= 0 ? '▲ Positive SLA Gain' : '▼ Regressed SLA Target'}</div>
          </div>
          <div class="ih-delta-item ${rDiff <= 0 ? 'good' : 'bad'}">
            <div class="ih-delta-item-header">
              <span class="ih-delta-item-title">Critical Breaches Delta</span>
              <span class="ih-delta-item-val">${rDiff > 0 ? '+' + rDiff : rDiff}</span>
            </div>
            <div class="ih-delta-item-sub">${rDiff <= 0 ? '▼ Breaches Reduced' : '▲ Breaches Increased'}</div>
          </div>
        </div>
      `;
    }

    const curColor = m.overallRAG || 'none';

    target.innerHTML = `
      <div class="ih-card-header">
        <div class="ih-badge-row">
          <span class="ih-card-tag">MOM DELTA</span>
          <span class="ih-card-period-tag ${curColor}">${getMonthLabel(m.month)} &bull; ${curColor.toUpperCase()}</span>
        </div>
        <div class="ih-card-title">Month-over-Month Shift</div>
        <div class="ih-card-desc">Comparative audit analytics versus preceding cycle</div>
      </div>

      ${deltaHtml}

      <div class="ih-metrics-footer-row">
        <div class="ih-stat-col">
          <div class="ih-stat-val">${prev ? getMonthLabel(prev.month) : 'None'}</div>
          <div class="ih-stat-lbl">Prior Cycle</div>
        </div>
        <div class="ih-stat-col">
          <div class="ih-stat-val">${getMonthLabel(m.month)}</div>
          <div class="ih-stat-lbl">Inspected Cycle</div>
        </div>
        <div class="ih-stat-col">
          <div class="ih-stat-val ${parseFloat(scoreDiffStr) >= 0 ? 'val-green' : 'val-red'}">${prev ? scoreDiffStr : 'Baseline'}</div>
          <div class="ih-stat-lbl">Score Delta</div>
        </div>
      </div>
    `;
  }

  // Update Bottom Action Button
  function updateSyncButton(m) {
    if (!m) return;
    const isCur = m.month === state.month;
    if (isCur) {
      syncBtn.className = 'ih-pill-action active-period';
      syncBtn.innerHTML = `
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 8.5l3.5 3.5 6.5-7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Currently Active: ${getMonthLabel(m.month)}</span>
      `;
    } else {
      syncBtn.className = 'ih-pill-action';
      syncBtn.innerHTML = `
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Load &amp; Sync ${getMonthLabel(m.month)} to Dashboard</span>
      `;
    }
  }

  // Render all cards data for current inspected month
  function renderAllCards() {
    const curObj = getMonthObj(inspectedMonthKey);
    renderSlaCardContent(curObj);
    renderTrajectoryCardContent(curObj);
    renderDeltaCardContent(curObj);
    updateSyncButton(curObj);
  }

  // Update 3D card layout & indicators based on activeIndex
  function updateCarouselPositions() {
    const cards = [cardSla, cardTraj, cardDelta];
    const dots = panel.querySelectorAll('.ih-dot');

    cards.forEach((c, idx) => {
      if (!c) return;
      c.classList.remove('pos-center', 'pos-left', 'pos-right');
      const offset = (idx - activeIndex + 3) % 3;
      if (offset === 0) {
        c.classList.add('pos-center');
      } else if (offset === 1) {
        c.classList.add('pos-right');
      } else if (offset === 2) {
        c.classList.add('pos-left');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToCard(idx) {
    if (idx < 0) idx = 0;
    if (idx > 2) idx = 2;
    if (activeIndex === idx) return;
    activeIndex = idx;
    updateCarouselPositions();
  }

  // Navigation handlers
  navPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex - 1 + 3) % 3;
    updateCarouselPositions();
  });

  navNext.addEventListener('click', (e) => {
    e.stopPropagation();
    activeIndex = (activeIndex + 1) % 3;
    updateCarouselPositions();
  });

  // Mouse Wheel / Trackpad Scroll Support
  const carouselWrapper = panel.querySelector('.ih-carousel-wrapper');
  let isWheelCooldown = false;
  if (carouselWrapper) {
    carouselWrapper.addEventListener('wheel', (e) => {
      const dx = e.deltaX;
      const dy = e.deltaY;
      if (Math.abs(dx) > 15 || Math.abs(dy) > 25) {
        e.preventDefault();
        if (isWheelCooldown) return;
        isWheelCooldown = true;
        setTimeout(() => { isWheelCooldown = false; }, 420);

        if (dx > 15 || dy > 25) {
          activeIndex = (activeIndex + 1) % 3; // Scroll right/down -> next
        } else {
          activeIndex = (activeIndex - 1 + 3) % 3; // Scroll left/up -> prev
        }
        updateCarouselPositions();
      }
    }, { passive: false });

    // Touch Swipe Support (Mobile & Trackpad touch)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;

    carouselWrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
      }
    }, { passive: true });

    carouselWrapper.addEventListener('touchmove', (e) => {
      touchMoved = true;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      if (!touchMoved) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          activeIndex = (activeIndex + 1) % 3; // Swipe left -> next
        } else {
          activeIndex = (activeIndex - 1 + 3) % 3; // Swipe right -> prev
        }
        updateCarouselPositions();
      }
    }, { passive: true });

    // Mouse Drag Support
    let isMouseDown = false;
    let dragStartX = 0;
    let dragDistance = 0;

    carouselWrapper.addEventListener('mousedown', (e) => {
      if (e.target.closest('.ih-nav-btn, .ih-traj-zone')) return;
      isMouseDown = true;
      dragStartX = e.clientX;
      dragDistance = 0;
      carouselWrapper.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      dragDistance = e.clientX - dragStartX;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      carouselWrapper.style.cursor = '';
      if (Math.abs(dragDistance) > 40) {
        if (dragDistance < 0) {
          activeIndex = (activeIndex + 1) % 3;
        } else {
          activeIndex = (activeIndex - 1 + 3) % 3;
        }
        updateCarouselPositions();
      }
    });
  }

  // Clicking cards directly transitions them to center
  cardSla.addEventListener('click', () => {
    if (activeIndex !== 0) goToCard(0);
  });
  cardTraj.addEventListener('click', () => {
    if (activeIndex !== 1) goToCard(1);
  });
  cardDelta.addEventListener('click', () => {
    if (activeIndex !== 2) goToCard(2);
  });

  // Indicator dot clicks
  panel.querySelectorAll('.ih-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIdx = parseInt(dot.dataset.dotIdx, 10);
      goToCard(targetIdx);
    });
  });

  // Sync button action
  syncBtn.addEventListener('click', async () => {
    if (state.month !== inspectedMonthKey) {
      state.month = inspectedMonthKey;
      const monthInput = document.getElementById('month-input');
      if (monthInput) monthInput.value = state.month;
      await loadMonthData();
      renderView();
    }
  });

  // Initialize
  renderTimelineRibbon();
  renderAllCards();
  updateCarouselPositions();

  return panel;
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

  const overallDetails = state.monthData.overallDetails || {};
  const vetoBreaches = overallDetails.vetoBreaches || [];

  // 1. Overview Banner with Dynamic RAG Visualization
  const totalSLA = green + amber + red || 1;
  const greenPct = Math.round((green / totalSLA) * 100);
  const amberPct = Math.round((amber / totalSLA) * 100);
  const redPct = Math.round((red / totalSLA) * 100);

  const statusHeadline = rag === 'green' ? 'COMPLIANT' : (rag === 'amber' ? 'TOLERANCE' : (rag === 'red' ? 'CRITICAL' : 'NO DATA'));
  const statusSubLabel = rag === 'green' ? 'Optimal Posture' : (rag === 'amber' ? 'Tolerance Watch' : (rag === 'red' ? 'Critical Action Required' : 'Standby'));

  let vetoDetailsHtml = '';
  if (vetoBreaches.length > 0) {
    const vetoNames = vetoBreaches.map(id => {
      const found = state.metrics.find(x => x.id === id);
      return found ? found.label : id;
    });
    vetoDetailsHtml = `
      <div class="sc-veto-tag" title="VETO: ${vetoNames.join(', ')}">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 2l6 11H2L8 2zM8 6v3M8 11.5v.5" stroke-linecap="round"/></svg>
        <span class="sc-veto-text">VETO: ${vetoNames.join(', ')}</span>
      </div>
    `;
  }

  const evaluatedTotal = green + amber + red || 1;

  const banner = document.createElement('div');
  banner.className = 'overview-banner modern-scorecard-table rag-' + (rag || 'none');
  banner.innerHTML = `
    <!-- Col 1: Overall Posture -->
    <div class="hud-col hud-col-posture">
      <div class="hud-th">
        <span>SECURITY POSTURE</span>
        <span class="hud-th-sep">&bull;</span>
        <span class="hud-th-period">${state.month}</span>
      </div>
      <div class="hud-td hud-td-posture">
        <span class="hud-posture-title rag-${rag || 'none'}">${statusHeadline}</span>
      </div>
      <div class="hud-sub hud-sub-posture">
        ${vetoDetailsHtml ? vetoDetailsHtml : `<span class="hud-sub-text ${rag === 'red' ? 'sub-warn' : ''}">${statusSubLabel} &bull; SOC Audit</span>`}
      </div>
    </div>

    <div class="hud-divider" aria-hidden="true"></div>

    <!-- Col 2: SLA Compliance -->
    <div class="hud-col hud-col-kpi">
      <div class="hud-th">
        <span>SLA COMPLIANCE</span>
      </div>
      <div class="hud-td">
        <span class="hud-kpi-val">${greenPct}<span class="hud-kpi-unit">%</span></span>
      </div>
      <div class="hud-sub">
        <span class="hud-sub-text"><strong>${green}</strong> / ${evaluatedTotal} Targets Met</span>
      </div>
    </div>

    <div class="hud-divider" aria-hidden="true"></div>

    <!-- Col 3: Green / Compliant -->
    <div class="hud-col hud-col-kpi">
      <div class="hud-th th-green">
        <span>COMPLIANT</span>
      </div>
      <div class="hud-td">
        <span class="hud-kpi-val val-green">${green}</span>
      </div>
      <div class="hud-sub">
        <span class="hud-sub-text">Targets Met</span>
      </div>
    </div>

    <div class="hud-divider" aria-hidden="true"></div>

    <!-- Col 4: Amber / Tolerance -->
    <div class="hud-col hud-col-kpi">
      <div class="hud-th th-amber">
        <span>TOLERANCE</span>
      </div>
      <div class="hud-td">
        <span class="hud-kpi-val val-amber">${amber}</span>
      </div>
      <div class="hud-sub">
        <span class="hud-sub-text">${amber > 0 ? 'Tolerance Watch' : 'None At Risk'}</span>
      </div>
    </div>

    <div class="hud-divider" aria-hidden="true"></div>

    <!-- Col 5: Red / Critical -->
    <div class="hud-col hud-col-kpi">
      <div class="hud-th th-red">
        <span>CRITICAL</span>
      </div>
      <div class="hud-td">
        <span class="hud-kpi-val val-red">${red}</span>
      </div>
      <div class="hud-sub">
        <span class="hud-sub-text ${red > 0 ? 'sub-warn' : ''}">${red > 0 ? 'Action Required' : 'Zero Breaches'}</span>
      </div>
    </div>

    <div class="hud-divider" aria-hidden="true"></div>

    <!-- Col 6: Trend Trackers -->
    <div class="hud-col hud-col-kpi">
      <div class="hud-th th-trend">
        <span>OBSERVATION</span>
      </div>
      <div class="hud-td">
        <span class="hud-kpi-val val-trend">${trend}</span>
      </div>
      <div class="hud-sub">
        <span class="hud-sub-text">Trend Trackers</span>
      </div>
    </div>

    <div class="hud-divider" aria-hidden="true"></div>

    <!-- Col 7: Executive Report Action -->
    <div class="hud-col hud-col-action">
      <div class="hud-th">
        <span>EXECUTIVE DOSSIER</span>
      </div>
      <div class="hud-td hud-td-action">
        <button id="btn-download-status-report" class="hud-btn-report rag-${rag || 'none'}" title="Download Complete Security Status Dossier">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10 3v10M6 9l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 15h14" stroke-linecap="round"/></svg>
          <span>Download Report</span>
        </button>
      </div>
      <div class="hud-sub">
        <span class="hud-sub-text text-muted">Audited PDF / CSV</span>
      </div>
    </div>
  `;
  banner.querySelector('#btn-download-status-report').addEventListener('click', downloadStatusReport);
  frag.appendChild(banner);

  // 2. Overview Top Row: Section Cards (3x3 Grid) + RAG Distribution (Right Side)
  const topSectionsRow = document.createElement('div');
  topSectionsRow.className = 'overview-sections-rag-row';

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
    const evaluatedTotal = g + a + r + t;
    const targetBearing = g + a + r;
    const slaPct = targetBearing > 0 ? Math.round((g / targetBearing) * 100) + '%' : null;

    let statusClass = 'none';
    let statusBadgeText = 'NO DATA';
    let statusSub = 'Pending entry';

    if (targetBearing > 0) {
      if (r > 0) {
        statusClass = 'red';
        statusBadgeText = r === 1 ? '1 ACTION' : `${r} ACTIONS`;
        statusSub = `${g}/${targetBearing} Targets Met`;
      } else if (a > 0) {
        statusClass = 'amber';
        statusBadgeText = 'TOLERANCE';
        statusSub = `${g}/${targetBearing} Targets Met`;
      } else if (g > 0) {
        statusClass = 'green';
        statusBadgeText = 'COMPLIANT';
        statusSub = 'All Targets Met';
      }
    } else if (t > 0) {
      statusClass = 'trend';
      statusBadgeText = 'TRACKING';
      statusSub = `${t} Trend Trackers`;
    }

    const card = document.createElement('div');
    card.className = 'section-card' + (worst ? ' rag-' + worst : '');
    card.innerHTML = `
      <div class="sec-card-body">
        <div class="sec-card-left">
          <div class="sec-icon-box">
            ${ICONS[sec.icon] || ''}
          </div>
          <div class="sec-text-col">
            <span class="sec-title" title="${escapeHTML(sec.name)}">${escapeHTML(sec.name)}</span>
            <span class="sec-subtitle">${secMetrics.length} metrics &bull; ${statusSub}</span>
          </div>
        </div>

        <div class="sec-card-right">
          <span class="sec-kpi-value ${statusClass}">${slaPct !== null ? slaPct : (t > 0 ? 'Trend' : '–')}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => setView('section:' + sec.id));
    grid.appendChild(card);
  });

  const ragPanel = buildRAGDistributionPanel(green, amber, red, trend);
  topSectionsRow.appendChild(grid);
  topSectionsRow.appendChild(ragPanel);
  frag.appendChild(topSectionsRow);

  // Dynamic Glassmorphic Segment Detail Card Slot (Reference Inspired)
  const detailSlot = document.createElement('div');
  detailSlot.id = 'overview-pie-detail-card-slot';
  detailSlot.style.display = 'none';
  frag.appendChild(detailSlot);

  // 3. Status History & SLA Performance (Full Width)
  const histPanel = buildInteractiveStatusHistoryPanel();
  histPanel.style.marginTop = '22px';
  frag.appendChild(histPanel);

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
            <span class="snip-label">TOP RISKS</span>
          </div>
          <div class="snip-text">${nar.topRisks && nar.topRisks.trim() ? escapeHTML(nar.topRisks) : '<span class="snip-empty">No critical risks recorded for this period.</span>'}</div>
        </div>
        <div class="overview-exec-snippet improvement">
          <div class="snip-head">
            <span class="snip-label">DELIVERED IMPROVEMENTS</span>
          </div>
          <div class="snip-text">${nar.improvements && nar.improvements.trim() ? escapeHTML(nar.improvements) : '<span class="snip-empty">No delivered improvements recorded.</span>'}</div>
        </div>
        <div class="overview-exec-snippet action">
          <div class="snip-head">
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
    if (activePieDetailCategory) {
      openRAGSegmentDetailCard(activePieDetailCategory);
    }
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

  // Header
  const titleRow = document.createElement('div');
  titleRow.className = 'rag-card-header';
  titleRow.innerHTML = `
    <span class="rag-title">RAG Distribution</span>
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

  // Category definitions with exact counts
  const ALL_CATS = [
    { key: 'red',   label: 'Critical Breaches', short: 'Critical', v: r, color: '#ef4444', textColor: '#ffffff' },
    { key: 'trend', label: 'Trend Trackers',    short: 'Trend',    v: t, color: '#18181b', textColor: '#ffffff' },
    { key: 'amber', label: 'Tolerance Watch',   short: 'Tolerance',v: a, color: '#f59e0b', textColor: '#ffffff' },
    { key: 'green', label: 'Targets Met',       short: 'Compliant',v: g, color: '#10b981', textColor: '#ffffff' }
  ];

  const valid = ALL_CATS.filter(s => s.v > 0);

  // Top-Right Legend with exact counts & percentages
  const legend = document.createElement('div');
  legend.className = 'rag-top-legend';
  legend.innerHTML = valid.map((s, idx) => {
    const pct = Math.round((s.v / total) * 100);
    return `
      <div class="legend-row" data-key="${s.key}" data-idx="${idx}" style="cursor:pointer;">
        <span class="legend-dot" style="background:${s.color};"></span>
        <span class="legend-name">${s.label}</span>
        <span class="legend-count">${s.v} <span style="color:#94a3b8; font-weight:500; font-size:10px;">(${pct}%)</span></span>
      </div>
    `;
  }).join('');
  panel.appendChild(legend);

  // SVG Geometry (100% mathematically exact proportional donut)
  const size = 210;
  const CX = size / 2;
  const CY = size / 2;
  const Ro = 86;
  const Ri = 52;
  const Rm = (Ro + Ri) / 2;
  const padAngle = valid.length > 1 ? 0.025 : 0; // ~1.4deg clean separation
  const NS = 'http://www.w3.org/2000/svg';

  function E(tag, attrs = {}) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
    return e;
  }

  const svg = E('svg', {
    viewBox: `0 0 ${size} ${size}`,
    width: String(size),
    height: String(size),
    class: 'rag-donut-svg',
    role: 'img',
    'aria-label': `RAG distribution: ${g} OK, ${a} Amber, ${r} Red, ${t} Trend`,
  });

  // Soft center circle base
  svg.appendChild(E('circle', {
    cx: CX, cy: CY, r: Ri - 1, fill: '#f8fafc'
  }));

  const segG = E('g', { class: 'rag-yinyang-group' });
  const lblG = E('g', { class: 'rag-yinyang-labels', style: 'pointer-events:none;' });

  // Center text elements
  const centerG = E('g', { class: 'rag-center-info', style: 'pointer-events:none;' });
  const numEl = E('text', {
    x: CX, y: CY - 3,
    'text-anchor': 'middle',
    'font-family': "'JetBrains Mono', monospace",
    'font-size': '22',
    'font-weight': '800',
    fill: '#0f172a',
    class: 'rag-center-num'
  });
  numEl.textContent = total;

  const lblEl = E('text', {
    x: CX, y: CY + 13,
    'text-anchor': 'middle',
    'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    'font-size': '8.5',
    'font-weight': '700',
    fill: '#94a3b8',
    'letter-spacing': '0.08em',
    class: 'rag-center-sub'
  });
  lblEl.textContent = 'METRICS';

  centerG.appendChild(numEl);
  centerG.appendChild(lblEl);

  function resetCenter() {
    numEl.textContent = total;
    numEl.setAttribute('fill', '#0f172a');
    lblEl.textContent = 'METRICS';
    lblEl.setAttribute('fill', '#94a3b8');
  }

  function setCenter(s) {
    const pct = Math.round((s.v / total) * 100);
    numEl.textContent = s.v;
    numEl.setAttribute('fill', s.color);
    lblEl.textContent = `${s.short.toUpperCase()} (${pct}%)`;
    lblEl.setAttribute('fill', s.color);
  }

  // Draw exact mathematically proportional slices
  let currentAngle = -Math.PI / 2; // Start from 12 o'clock
  const segElements = [];

  valid.forEach((s, idx) => {
    const frac = s.v / total;
    const angleSpan = frac * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angleSpan;
    currentAngle = endAngle;

    const st = startAngle + padAngle / 2;
    const en = endAngle - padAngle / 2;
    const span = Math.max(0.001, en - st);
    const largeArc = span > Math.PI ? 1 : 0;

    const cosS = Math.cos(st), sinS = Math.sin(st);
    const cosE = Math.cos(en), sinE = Math.sin(en);

    const x1 = (CX + Ro * cosS).toFixed(2);
    const y1 = (CY + Ro * sinS).toFixed(2);
    const x2 = (CX + Ro * cosE).toFixed(2);
    const y2 = (CY + Ro * sinE).toFixed(2);
    const x3 = (CX + Ri * cosE).toFixed(2);
    const y3 = (CY + Ri * sinE).toFixed(2);
    const x4 = (CX + Ri * cosS).toFixed(2);
    const y4 = (CY + Ri * sinS).toFixed(2);

    let pathD;
    if (valid.length === 1) {
      pathD = `M ${CX} ${CY - Ro} A ${Ro} ${Ro} 0 1 1 ${CX} ${CY + Ro} A ${Ro} ${Ro} 0 1 1 ${CX} ${CY - Ro} M ${CX} ${CY - Ri} A ${Ri} ${Ri} 0 1 0 ${CX} ${CY + Ri} A ${Ri} ${Ri} 0 1 0 ${CX} ${CY - Ri} Z`;
    } else {
      pathD = `M ${x1} ${y1} A ${Ro} ${Ro} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${Ri} ${Ri} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    }

    const pathEl = E('path', {
      d: pathD,
      fill: s.color,
      class: 'rag-donut-slice',
      'data-key': s.key,
      'data-idx': String(idx),
      style: `cursor:pointer; transform-origin:${CX}px ${CY}px; transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, filter 0.2s ease;`
    });

    pathEl.addEventListener('mouseenter', () => {
      segElements.forEach((el, i) => {
        if (i === idx) {
          el.style.transform = 'scale(1.035)';
          el.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.18))';
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0.55';
          el.style.transform = 'scale(1)';
          el.style.filter = 'none';
        }
      });
      setCenter(s);
    });

    pathEl.addEventListener('mouseleave', () => {
      segElements.forEach(el => {
        el.style.transform = 'scale(1)';
        el.style.filter = 'none';
        el.style.opacity = '1';
      });
      resetCenter();
    });

    segG.appendChild(pathEl);
    segElements.push(pathEl);

    // Click handler for pie chart slice
    pathEl.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSlice(s.key);
    });

    // Percentage inside slice if arc width is >= 7%
    const pct = Math.round(frac * 100);
    if (pct >= 7) {
      const midA = (st + en) / 2;
      const lx = (CX + Rm * Math.cos(midA)).toFixed(2);
      const ly = (CY + Rm * Math.sin(midA)).toFixed(2);
      const textEl = E('text', {
        x: lx,
        y: ly,
        fill: '#ffffff',
        'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'font-size': '11',
        'font-weight': '700',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        style: 'pointer-events:none; user-select:none;'
      });
      textEl.textContent = `${pct}%`;
      lblG.appendChild(textEl);
    }
  });

  function selectSlice(sKey) {
    segElements.forEach((el) => {
      if (el.getAttribute('data-key') === sKey) {
        el.classList.add('is-selected-slice');
      } else {
        el.classList.remove('is-selected-slice');
      }
    });
    legend.querySelectorAll('.legend-row').forEach(r => {
      if (r.getAttribute('data-key') === sKey) {
        r.classList.add('is-selected-legend');
      } else {
        r.classList.remove('is-selected-legend');
      }
    });
    openRAGSegmentDetailCard(sKey);
  }

  // Link legend hover & click to slices
  legend.querySelectorAll('.legend-row').forEach(row => {
    const idx = parseInt(row.dataset.idx, 10);
    const s = valid[idx];
    if (!s) return;
    row.addEventListener('mouseenter', () => {
      segElements.forEach((el, i) => {
        if (i === idx) {
          el.style.transform = 'scale(1.035)';
          el.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.18))';
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0.55';
          el.style.transform = 'scale(1)';
          el.style.filter = 'none';
        }
      });
      setCenter(s);
    });
    row.addEventListener('mouseleave', () => {
      segElements.forEach(el => {
        el.style.transform = 'scale(1)';
        el.style.filter = 'none';
        el.style.opacity = '1';
      });
      resetCenter();
    });
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSlice(s.key);
    });
  });

  svg.appendChild(segG);
  svg.appendChild(lblG);
  svg.appendChild(centerG);

  const chartWrap = document.createElement('div');
  chartWrap.className = 'rag-donut-wrap';
  chartWrap.style.display = 'flex';
  chartWrap.style.justifyContent = 'center';
  chartWrap.style.alignItems = 'center';
  chartWrap.style.position = 'relative';
  chartWrap.appendChild(svg);

  panel.appendChild(chartWrap);

  if (activePieDetailCategory) {
    requestAnimationFrame(() => {
      selectSlice(activePieDetailCategory);
    });
  }

  return panel;
}

function initRAGYinYangInteraction(panel, segMeta, legend, numEl, lblEl, total, isSingle) {
  function setActive(idx) {
    if (idx < 0 || idx >= segMeta.length) {
      numEl.textContent = total;
      lblEl.textContent = isSingle ? 'METRICS (100%)' : 'METRICS';
      segMeta.forEach(s => {
        if (s.el) {
          s.el.style.filter = 'none';
          s.el.style.stroke = s.color;
          s.el.style.strokeWidth = '0.5';
        }
      });
      legend.querySelectorAll('.legend-row').forEach(row => {
        row.classList.remove('active');
        row.style.opacity = '1';
      });
      return;
    }

    const activeSeg = segMeta[idx];
    numEl.textContent = activeSeg.v;
    lblEl.textContent = `${activeSeg.short.toUpperCase()} (${activeSeg.truePct}%)`;

    segMeta.forEach((s, i) => {
      if (s.el) {
        if (i === idx) {
          s.el.style.filter = 'brightness(1.12) saturate(1.1)';
          s.el.style.stroke = '#ffffff';
          s.el.style.strokeWidth = '2';
        } else {
          s.el.style.filter = 'brightness(0.88) saturate(0.85)';
          s.el.style.stroke = s.color;
          s.el.style.strokeWidth = '0.5';
        }
      }
    });

    legend.querySelectorAll('.legend-row').forEach((row, i) => {
      if (i === idx) {
        row.classList.add('active');
        row.style.opacity = '1';
      } else {
        row.classList.remove('active');
        row.style.opacity = '0.55';
      }
    });
  }

  // Segment hover
  segMeta.forEach((s, idx) => {
    if (s.el) {
      s.el.addEventListener('mouseenter', () => setActive(idx));
      s.el.addEventListener('mouseleave', () => setActive(-1));
    }
  });

  // Legend hover
  legend.querySelectorAll('.legend-row').forEach(row => {
    const idx = parseInt(row.getAttribute('data-idx'), 10);
    row.addEventListener('mouseenter', () => setActive(idx));
    row.addEventListener('mouseleave', () => setActive(-1));
  });
}
function donutSVG(g, a, r, t) {
  return buildRAGDistributionPanel(g, a, r, t).outerHTML;
}

// =========================================================================
// GLASSMORPHIC PIE / DONUT SEGMENT DETAIL CARD (DYNAMIC DRILLDOWN)
// =========================================================================
let activePieDetailCategory = null;
let activeFloatingCard = null;
let activeFloatingBackdrop = null;
let activeFloatingCleanup = null;

function positionFloatingCardCenter(card) {
  if (!card) return;
  card.style.position = 'fixed';
  card.style.top = '50%';
  card.style.left = '50%';
  card.style.zIndex = '10050';
}
const positionFloatingCardAbove = positionFloatingCardCenter;

function renderGlassSegmentDetailCard(opts) {
  const {
    targetContainer,
    anchorElement = null,
    title,
    category = 'trend',
    categoryLabel = 'SEGMENT',
    sourceLabel = 'EVALUATED DATASET',
    totalCount = 0,
    records = [],
    month = state.month,
    onClose = null
  } = opts;

  // Hide any legacy in-flow slot so it never pushes layout down
  if (targetContainer) {
    targetContainer.style.display = 'none';
    targetContainer.innerHTML = '';
  }

  // If another floating card is already active, remove it cleanly
  if (activeFloatingCard && activeFloatingCard.parentNode) {
    activeFloatingCard.parentNode.removeChild(activeFloatingCard);
    activeFloatingCard = null;
  }
  if (activeFloatingBackdrop && activeFloatingBackdrop.parentNode) {
    activeFloatingBackdrop.parentNode.removeChild(activeFloatingBackdrop);
    activeFloatingBackdrop = null;
  }
  if (activeFloatingCleanup) {
    activeFloatingCleanup();
    activeFloatingCleanup = null;
  }

  let isExpanded = false;

  const backdrop = document.createElement('div');
  backdrop.className = 'glass-detail-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  const card = document.createElement('div');
  card.className = 'glass-segment-detail-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');
  card.setAttribute('aria-label', `${title} Detail List`);

  function render() {
    card.innerHTML = '';
    card.classList.toggle('is-expanded', isExpanded);

    // Header with close button
    const head = document.createElement('div');
    head.className = 'glass-detail-head';
    head.innerHTML = `
      <div class="glass-detail-head-left">
        <div class="glass-detail-badge-row">
          <span class="glass-category-pill ${category}">${escapeHTML(categoryLabel)}</span>
          <span class="glass-source-pill">${escapeHTML(sourceLabel)}</span>
        </div>
        <h3 class="glass-detail-title">${escapeHTML(title)}</h3>
        <div class="glass-detail-subtitle">
          <span class="glass-detail-meta-total">Total: ${totalCount}</span>
          <span>&bull;</span>
          <span>Reporting Period: ${escapeHTML(month)}</span>
        </div>
      </div>
      <button type="button" class="glass-detail-close-btn" aria-label="Close detail card" title="Dismiss details">&times;</button>
    `;

    head.querySelector('.glass-detail-close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });

    card.appendChild(head);

    // Records List
    if (totalCount === 0 || !records.length) {
      const empty = document.createElement('div');
      empty.className = 'glass-empty-state';
      empty.innerHTML = `
        <div class="glass-empty-icon">
          <svg viewBox="0 0 20 20" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="10" cy="10" r="7.5"/>
            <path d="M7 10h6" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="glass-empty-title">No records found for this selection.</div>
        <div class="glass-empty-desc">Zero telemetry outliers or breaches recorded for ${escapeHTML(month)}.</div>
      `;
      card.appendChild(empty);
    } else {
      const list = document.createElement('div');
      list.className = 'glass-record-list';

      const displayedRecords = isExpanded ? records : records.slice(0, 5);

      displayedRecords.forEach((rec, idx) => {
        const item = document.createElement('div');
        item.className = 'glass-record-item';
        item.innerHTML = `
          <div class="glass-record-left">
            <div class="glass-record-idx">${idx + 1}</div>
            <div class="glass-record-info">
              <div class="glass-record-name" title="${escapeHTML(rec.name)}">${escapeHTML(rec.name)}</div>
              <div class="glass-record-tags">
                <span class="glass-record-tag system">${escapeHTML(rec.system || 'Core System')}</span>
                ${rec.target ? `<span class="glass-record-tag target">${escapeHTML(rec.target)}</span>` : ''}
                ${rec.date ? `<span class="glass-record-tag">${escapeHTML(rec.date)}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="glass-record-right">
            ${rec.value !== undefined && rec.value !== null ? `<div class="glass-record-metric-val">${escapeHTML(String(rec.value))}</div>` : ''}
            <span class="glass-record-status-chip ${rec.statusClass || 'trend'}">${escapeHTML(rec.status || 'Active')}</span>
          </div>
        `;
        list.appendChild(item);
      });

      card.appendChild(list);

      // Show All Button
      if (records.length > 5) {
        const footer = document.createElement('div');
        footer.className = 'glass-detail-footer';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'glass-show-all-btn';
        btn.innerHTML = isExpanded 
          ? `<span>Show Less (5)</span> <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
          : `<span>Show All (${totalCount})</span> <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          isExpanded = !isExpanded;
          render();
          positionFloatingCardCenter(card);
        });

        footer.appendChild(btn);
        card.appendChild(footer);
      }
    }
  }

  function dismiss() {
    if (card.classList.contains('is-closing')) return;
    card.classList.remove('is-visible');
    card.classList.add('is-closing');
    if (backdrop) {
      backdrop.classList.remove('is-visible');
      backdrop.classList.add('is-closing');
    }
    if (activeFloatingCleanup) {
      activeFloatingCleanup();
      activeFloatingCleanup = null;
    }
    setTimeout(() => {
      if (card.parentNode) card.parentNode.removeChild(card);
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      if (activeFloatingCard === card) activeFloatingCard = null;
      if (activeFloatingBackdrop === backdrop) activeFloatingBackdrop = null;
      if (typeof onClose === 'function') onClose();
    }, 220);
  }

  render();
  document.body.appendChild(backdrop);
  document.body.appendChild(card);
  activeFloatingCard = card;
  activeFloatingBackdrop = backdrop;

  // Immediate placement & next frame animated entrance
  positionFloatingCardCenter(card);
  requestAnimationFrame(() => {
    backdrop.classList.add('is-visible');
    card.classList.add('is-visible');
    positionFloatingCardCenter(card);
  });

  // Backdrop click dismisses
  backdrop.addEventListener('click', (e) => {
    e.stopPropagation();
    dismiss();
  });

  // Escape key closes modal
  const onKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      dismiss();
    }
  };
  window.addEventListener('keydown', onKeyDown);

  // Outside pointerdown fallback
  const onPointerDown = (e) => {
    if (!card.isConnected) return;
    if (card.contains(e.target)) return;
    if (e.target.closest('.rag-donut-slice, .rag-donut-card, .legend-row, #patches_pie, #vuln_donut, #patch_comp_donut, .patches-leg-card, .vuln-leg-item')) {
      return; // Handled by chart click
    }
    dismiss();
  };
  document.addEventListener('pointerdown', onPointerDown);

  activeFloatingCleanup = () => {
    window.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('pointerdown', onPointerDown);
  };
}

function openRAGSegmentDetailCard(sKey) {
  activePieDetailCategory = sKey;
  const slot = document.getElementById('overview-pie-detail-card-slot');

  const monthData = state.monthData || {};
  const metricsMap = monthData.metrics || {};
  const isTrend = sKey === 'trend';

  const matchedMetrics = [];

  state.metrics.forEach(m => {
    const entry = metricsMap[m.id];
    if (!entry || entry.computed === null || entry.computed === undefined) return;
    const sec = state.sections.find(s => s.id === m.section) || { name: m.section };

    let isMatch = false;
    if (isTrend) {
      isMatch = (m.direction === 'trend');
    } else {
      isMatch = (entry.rag === sKey);
    }

    if (isMatch) {
      matchedMetrics.push({
        id: m.id,
        name: m.label || m.id,
        system: sec.name || 'Core System',
        value: fmtVal(entry.computed, m.unit),
        target: m.target !== undefined && m.target !== null ? `SLA Target: ${m.target}${m.unit || ''}` : (m.desc || ''),
        status: entry.rag ? (entry.rag === 'red' ? 'CRITICAL BREACH' : (entry.rag === 'amber' ? 'ATTENTION REQUIRED' : 'WITHIN TARGET')) : 'TRACKING',
        statusClass: entry.rag || 'trend',
        date: state.month
      });
    }
  });

  let title = 'Selected Metric Records';
  let categoryLabel = sKey.toUpperCase();
  if (sKey === 'red') {
    title = 'Critical Breaches & SLA Remediation';
    categoryLabel = 'CRITICAL BREACHES';
  } else if (sKey === 'amber') {
    title = 'Attention Required & Elevated Risks';
    categoryLabel = 'ATTENTION REQUIRED';
  } else if (sKey === 'green') {
    title = 'Within Target & SLA Attainment';
    categoryLabel = 'WITHIN TARGET';
  } else if (sKey === 'trend') {
    title = 'Operational Telemetry & Trackers';
    categoryLabel = 'TELEMETRY TRACKERS';
  }

  const anchor = document.querySelector('.rag-distribution-card') 
              || document.querySelector('.rag-donut-card')
              || document.querySelector('.rag-donut-svg')
              || slot;

  renderGlassSegmentDetailCard({
    anchorElement: anchor,
    targetContainer: slot,
    title: title,
    category: sKey,
    categoryLabel: categoryLabel,
    sourceLabel: 'EVALUATED TELEMETRY',
    totalCount: matchedMetrics.length,
    records: matchedMetrics,
    month: state.month,
    onClose: () => {
      activePieDetailCategory = null;
      document.querySelectorAll('.rag-donut-slice').forEach(el => el.classList.remove('is-selected-slice'));
      document.querySelectorAll('.legend-row').forEach(el => el.classList.remove('is-selected-legend'));
    }
  });
}





function buildSecurityPostureGraph() {
  const panel = document.createElement('div');
  panel.className = 'security-posture-graph-panel';

  const history = state.monthsHistory || [];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Head
  const head = document.createElement('div');
  head.className = 'graph-panel-head';
  head.innerHTML = `
    <div class="graph-title-group">
      <h3>Security Posture & SLA Attainment Trend</h3>
      <p>Historical month-by-month SLA targets and weighted score rollup</p>
    </div>
    <div class="graph-legend">
      <span class="graph-legend-item"><span class="graph-legend-dot green"></span> Within Target</span>
      <span class="graph-legend-item"><span class="graph-legend-dot amber"></span> Attention</span>
      <span class="graph-legend-item"><span class="graph-legend-dot red"></span> Critical</span>
      <span class="graph-legend-item"><span class="graph-legend-line"></span> Attainment %</span>
    </div>
  `;
  panel.appendChild(head);

  if (!history.length) {
    const em = document.createElement('div');
    em.className = 'empty-note';
    em.textContent = 'Save data for reporting months to generate performance trend charts.';
    panel.appendChild(em);
    return panel;
  }

  const stage = document.createElement('div');
  stage.className = 'graph-stage';

  const W = 620, H = 200;
  const padLeft = 40, padRight = 30, padTop = 32, padBottom = 34;
  const chartW = W - padLeft - padRight;
  const chartH = H - padTop - padBottom;

  const displayMonths = history.slice(-8); // Show up to last 8 months
  const colW = chartW / Math.max(1, displayMonths.length);

  let maxEvaluated = 25;
  displayMonths.forEach(m => {
    const ev = (m.green || 0) + (m.amber || 0) + (m.red || 0);
    if (ev > maxEvaluated) maxEvaluated = ev;
  });

  const NS = 'http://www.w3.org/2000/svg';
  function E(tag, attrs = {}) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    return el;
  }

  const svg = E('svg', {
    viewBox: `0 0 ${W} ${H}`,
    class: 'graph-svg',
    style: 'overflow:visible'
  });

  // Background Grid Lines
  const gridLevels = [0, 0.5, 1.0];
  gridLevels.forEach(pct => {
    const y = padTop + chartH * (1 - pct);
    svg.appendChild(E('line', {
      x1: padLeft, y1: y, x2: W - padRight, y2: y,
      stroke: '#f1f5f9', 'stroke-width': '1', 'stroke-dasharray': pct === 0 ? 'none' : '3 3'
    }));
    const gt = E('text', {
      x: padLeft - 6, y: y + 3.5,
      'text-anchor': 'end', 'font-family': 'var(--mono)', 'font-size': '9',
      fill: '#94a3b8'
    });
    gt.textContent = Math.round(maxEvaluated * pct);
    svg.appendChild(gt);
  });

  const linePoints = [];

  displayMonths.forEach((m, i) => {
    const isCur = m.month === state.month;
    const parts = m.month.split('-');
    const mNum = parseInt(parts[1], 10);
    const mLabel = (monthNames[mNum - 1] || parts[1]) + " '" + parts[0].slice(2);

    const g = m.green || 0;
    const a = m.amber || 0;
    const r = m.red || 0;
    const ev = g + a + r;
    const attainment = ev > 0 ? (g / ev) * 100 : 0;

    const cx = padLeft + i * colW + colW / 2;
    const barW = Math.min(28, colW * 0.44);
    const bx = cx - barW / 2;

    const gH = (g / maxEvaluated) * chartH;
    const aH = (a / maxEvaluated) * chartH;
    const rH = (r / maxEvaluated) * chartH;

    let curY = padTop + chartH;

    // Red (bottom)
    if (rH > 0) {
      curY -= rH;
      svg.appendChild(E('rect', {
        x: bx, y: curY, width: barW, height: rH,
        fill: '#dc2626', rx: aH === 0 && gH === 0 ? '4' : '0'
      }));
    }
    // Amber (middle)
    if (aH > 0) {
      curY -= aH;
      svg.appendChild(E('rect', {
        x: bx, y: curY, width: barW, height: aH,
        fill: '#d97706', rx: gH === 0 ? '4' : '0'
      }));
    }
    // Green (top)
    if (gH > 0) {
      curY -= gH;
      svg.appendChild(E('rect', {
        x: bx, y: curY, width: barW, height: gH,
        fill: '#059669', rx: '4'
      }));
    }

    // Attainment point
    const py = padTop + chartH - (attainment / 100) * chartH;
    linePoints.push({ x: cx, y: py, attainment, month: m.month });

    // Active column glow border
    if (isCur) {
      svg.appendChild(E('rect', {
        x: bx - 4, y: padTop - 10, width: barW + 8, height: chartH + 34,
        fill: 'rgba(37,99,235,0.05)', stroke: '#3b82f6', 'stroke-width': '1.5',
        rx: '8', 'stroke-dasharray': '3 3'
      }));
    }

    // Top Posture & Score Pill
    const scoreVal = m.overallDetails?.weightedScore;
    const isVeto = m.overallDetails?.vetoBreaches?.length > 0;
    let scoreTxt = isVeto ? 'VETO' : (scoreVal !== null && scoreVal !== undefined ? (scoreVal > 0 ? '+' : '') + scoreVal.toFixed(2) : (m.overallRAG ? m.overallRAG.toUpperCase() : ''));
    if (scoreTxt) {
      const pillBg = m.overallRAG === 'green' ? '#dcfce7' : m.overallRAG === 'amber' ? '#fef9c3' : '#fee2e2';
      const pillCol = m.overallRAG === 'green' ? '#15803d' : m.overallRAG === 'amber' ? '#a16207' : '#b91c1c';
      const pillW = Math.max(34, scoreTxt.length * 6.5);

      svg.appendChild(E('rect', {
        x: cx - pillW / 2, y: padTop - 18, width: pillW, height: 16,
        fill: pillBg, rx: '4', stroke: pillCol, 'stroke-width': '0.7', opacity: '0.95'
      }));
      const pt = E('text', {
        x: cx, y: padTop - 6.5, 'text-anchor': 'middle',
        'font-family': 'var(--mono)', 'font-size': '9', 'font-weight': '700',
        fill: pillCol
      });
      pt.textContent = scoreTxt;
      svg.appendChild(pt);
    }

    // X-Axis Month label
    const xl = E('text', {
      x: cx, y: H - padBottom + 16,
      'text-anchor': 'middle', 'font-family': 'var(--sans, Inter)',
      'font-size': '11', 'font-weight': isCur ? '700' : '500',
      fill: isCur ? '#0f172a' : '#64748b',
      cursor: 'pointer'
    });
    xl.textContent = mLabel;
    svg.appendChild(xl);

    // Click target on each column to switch month
    const hitRect = E('rect', {
      x: cx - colW / 2, y: 0, width: colW, height: H,
      fill: 'transparent', cursor: 'pointer'
    });
    hitRect.setAttribute('title', `${m.month} · ${m.overallRAG ? m.overallRAG.toUpperCase() : 'NO DATA'} (Score: ${scoreTxt}) · Click to switch`);
    hitRect.addEventListener('click', async () => {
      if (m.month !== state.month) {
        state.month = m.month;
        document.getElementById('month-input').value = state.month;
        await loadMonthData();
        renderView();
      }
    });
    svg.appendChild(hitRect);
  });

  // Draw Attainment Trend Line
  if (linePoints.length > 1) {
    let d = `M ${linePoints[0].x} ${linePoints[0].y}`;
    for (let i = 1; i < linePoints.length; i++) {
      d += ` L ${linePoints[i].x} ${linePoints[i].y}`;
    }
    svg.appendChild(E('path', {
      d, fill: 'none', stroke: '#2563eb', 'stroke-width': '2.2',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }));

    // Dots on trend line
    linePoints.forEach(pt => {
      svg.appendChild(E('circle', {
        cx: pt.x, cy: pt.y, r: '3.5',
        fill: '#ffffff', stroke: '#2563eb', 'stroke-width': '2.2'
      }));
    });
  }

  stage.appendChild(svg);
  panel.appendChild(stage);
  return panel;
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

  // ---- Managed Endpoints Auto-Propagation & Live Derived Recalculation ----
  if (sectionId === 'endpoint') {
    const meCard = list.querySelector('.metric-card[data-metric-id="managed_endpoints"]');
    const dnrCard = list.querySelector('.metric-card[data-metric-id="devices_not_reporting"]');
    const dnrPctCard = list.querySelector('.metric-card[data-metric-id="devices_not_reporting_pct"]');
    const meInput = meCard ? meCard.querySelector('input[data-key="value"]') : null;
    const dnrInput = dnrCard ? dnrCard.querySelector('input[data-key="value"]') : null;

    function liveUpdateDnrPct() {
      if (!dnrPctCard) return;
      const meVal = meInput && meInput.value !== '' ? Number(meInput.value) : (state.monthData && state.monthData.metrics && state.monthData.metrics.managed_endpoints && typeof state.monthData.metrics.managed_endpoints.computed === 'number' ? state.monthData.metrics.managed_endpoints.computed : null);
      const dnrVal = dnrInput && dnrInput.value !== '' ? Number(dnrInput.value) : (state.monthData && state.monthData.metrics && state.monthData.metrics.devices_not_reporting && typeof state.monthData.metrics.devices_not_reporting.computed === 'number' ? state.monthData.metrics.devices_not_reporting.computed : null);

      const dnrDisp = dnrPctCard.querySelector('#dnr-pct-disp-dnr');
      const meDisp = dnrPctCard.querySelector('#dnr-pct-disp-me');
      const resDisp = dnrPctCard.querySelector('#dnr-pct-disp-result');

      const dnrText = (dnrVal !== null && !isNaN(dnrVal) && dnrVal >= 0) ? String(dnrVal) : '–';
      const meText = (meVal !== null && !isNaN(meVal) && meVal > 0) ? String(meVal) : '–';

      if (dnrDisp) dnrDisp.textContent = dnrText;
      if (meDisp) meDisp.textContent = meText;

      const valEl = dnrPctCard.querySelector('.metric-value');
      const badgeEl = dnrPctCard.querySelector('.metric-badge');
      const stripEl = dnrPctCard.querySelector('.metric-rag-strip');

      if (dnrVal !== null && meVal !== null && !isNaN(dnrVal) && !isNaN(meVal) && meVal > 0 && dnrVal >= 0) {
        const pct = Math.round((dnrVal / meVal) * 10000) / 100;
        const pctStr = (Number.isInteger(pct) ? pct : pct.toFixed(2)) + '%';
        if (resDisp) resDisp.textContent = pctStr;
        if (valEl) {
          valEl.textContent = pctStr;
          valEl.classList.remove('green', 'amber', 'red');
        }
        let rag = 'green';
        if (pct > 2.0 * 1.1) rag = 'red';
        else if (pct > 2.0) rag = 'amber';

        if (valEl) valEl.classList.add(rag);
        if (badgeEl) {
          badgeEl.className = 'metric-badge ' + rag;
          badgeEl.textContent = rag.toUpperCase();
        }
        if (stripEl) {
          stripEl.className = 'metric-rag-strip ' + rag;
        }
      } else {
        if (resDisp) resDisp.textContent = '–';
        if (valEl) valEl.innerHTML = '<span class="metric-value-empty">-</span>';
        if (badgeEl) {
          badgeEl.className = 'metric-badge';
          badgeEl.textContent = '';
        }
        if (stripEl) stripEl.className = 'metric-rag-strip';
      }
    }

    if (meInput) {
      function propagateManagedEndpoints() {
        const val = meInput.value;
        list.querySelectorAll('input[data-managed-endpoints-den]').forEach(denInp => {
          if (denInp !== meInput) {
            denInp.value = val;
            denInp.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
        liveUpdateDnrPct();
      }
      meInput.addEventListener('input', propagateManagedEndpoints);
      setTimeout(propagateManagedEndpoints, 0);
    }

    if (dnrInput) {
      dnrInput.addEventListener('input', liveUpdateDnrPct);
    }
    setTimeout(liveUpdateDnrPct, 0);
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
  wrap.dataset.metricId = metric.id;

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

  // YTD aggregated value
  let ytdPillHtml = '';
  const ytdMetric = state.monthData.ytd && state.monthData.ytd[metric.id];
  if (ytdMetric && ytdMetric.computed !== null && ytdMetric.computed !== undefined) {
    const ytdValFormatted = fmtVal(ytdMetric.computed, metric.unit);
    const ytdRag = metric.direction === 'trend' ? '' : (ytdMetric.rag || '');
    const mthd = (ytdMetric.method || 'ytd').toUpperCase();
    ytdPillHtml = `
      <div class="metric-ytd-pill" title="Year-to-Date (${mthd}) across active months in ${state.month.split('-')[0]}">
        <span class="ytd-lbl">YTD (${mthd}):</span>
        <span class="ytd-val">${ytdValFormatted}</span>
        ${ytdRag ? `<span class="ytd-rag-dot ${ytdRag}"></span>` : ''}
      </div>
    `;
  }

  valueBlock.innerHTML = `
    <div class="metric-value ${badge || ''}">${valStr !== null ? valStr : '<span class="metric-value-empty">-</span>'}</div>
    ${badge ? `<div class="metric-badge ${badge}">${badge === 'trend' ? 'TREND' : badge.toUpperCase()}</div>` : ''}
    ${dualBreakdown}
    ${ytdPillHtml}
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
  } else if (metric.mode === 'four_layer') {
    const fGrid = document.createElement('div');
    fGrid.className = 'four-layer-grid';
    fGrid.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px;';

    const sVal = entry.inputs ? (entry.inputs.sophos ?? (entry.inputs.sophos_agent ?? '')) : '';
    const meVal = entry.inputs ? (entry.inputs.manageengine ?? (entry.inputs.manage_engine ?? '')) : '';
    const vVal = entry.inputs ? (entry.inputs.vpn ?? (entry.inputs.vpn_client ?? '')) : '';
    const mVal = entry.inputs ? (entry.inputs.mfa ?? (entry.inputs.mfa_enabled ?? '')) : '';

    fGrid.appendChild(miniField('sophos', 'Sophos healthy', sVal));
    fGrid.appendChild(miniField('manageengine', 'ManageEngine healthy', meVal));
    fGrid.appendChild(miniField('vpn', 'VPN client healthy', vVal));
    fGrid.appendChild(miniField('mfa', 'MFA enabled', mVal));
    inputsBlock.appendChild(fGrid);

    // Denominator (Managed endpoints)
    let denVal = entry.inputs && entry.inputs.den;
    if (denVal === undefined || denVal === null || denVal === '') {
      const meEntry = state.monthData.metrics['managed_endpoints'];
      if (meEntry && meEntry.computed !== null && meEntry.computed !== undefined) {
        denVal = meEntry.computed;
      } else if (meEntry && meEntry.inputs && meEntry.inputs.value !== null && meEntry.inputs.value !== undefined) {
        denVal = meEntry.inputs.value;
      }
    }
    const denField = miniField('den', 'Managed endpoints ↑', denVal);
    const denInp = denField.querySelector('input');
    if (denInp) {
      denInp.setAttribute('data-managed-endpoints-den', 'true');
      denInp.title = 'Auto-populated from Managed Endpoints';
    }
    const denLabel = denField.querySelector('label');
    if (denLabel) {
      denLabel.style.color = 'var(--accent, #6366f1)';
      denLabel.style.fontStyle = 'italic';
      denLabel.title = 'Auto-populated from Managed Endpoints';
    }
    inputsBlock.appendChild(denField);

    // Backward compatibility notice if old data was single numerator
    if (entry.inputs && entry.inputs.num !== undefined && entry.inputs.num !== null && sVal === '' && meVal === '' && vVal === '' && mVal === '') {
      const legNote = document.createElement('div');
      legNote.className = 'legacy-data-note';
      legNote.style.cssText = 'font-size:11px; color:#f59e0b; margin-top:4px; font-style:italic;';
      legNote.textContent = `Legacy single numerator stored: ${entry.inputs.num}. Fill all 4 layers above to activate MIN calculation.`;
      inputsBlock.appendChild(legNote);
    }
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
    note.textContent = 'Auto-computed from ' + (metric.deriveFrom || []).map(id => {
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
      const inputsStr = Object.entries(h.inputs || h.previousInputs || {}).map(([k, v]) => `${k}: ${v}`).join(', ');
      const actBadge = h.action === 'clear' ? '<span class="mini-pill red hist-badge">CLEAR</span>' : '<span class="mini-pill green hist-badge">SAVED</span>';
      const userTag = h.user ? `<span class="hist-user">by <strong>@${escapeHTML(h.user)}</strong></span> &middot; ` : '';

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
              <button type="button" class="btn btn-restore" data-idx="${idx}" title="Restore this past state">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8a5.5 5.5 0 101.2-3.4M2.5 3.5v4.5h4.5"/></svg>
                <span>Restore</span>
              </button>
            ` : ''}
            ${canDelete ? `
              <button type="button" class="btn btn-delete-hist" data-idx="${idx}" title="Permanently delete this entry from history">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
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
          <span>Change History &middot; Past Entries for ${escapeHTML(metric.label)}</span>
          <span class="mini-pill trend hist-count-pill">${historyList.length} records</span>
        </div>
        ${canClearAll ? `
          <button type="button" class="btn btn-clear-all-hist" title="Remove all history entries for this metric">
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
          <svg viewBox="0 0 14 14" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9L7 5L11 9"/></svg>
        </button>
        <button type="button" class="stepper-btn stepper-down" title="Decrease value">
          <svg viewBox="0 0 14 14" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5L7 9L11 5"/></svg>
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
    if (res.overallDetails) state.monthData.overallDetails = res.overallDetails;
    if (res.ytd) state.monthData.ytd = res.ytd;
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
    if (res.overallDetails) state.monthData.overallDetails = res.overallDetails;
    if (res.ytd) state.monthData.ytd = res.ytd;
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
    if (res.overallDetails) state.monthData.overallDetails = res.overallDetails;
    if (res.ytd) state.monthData.ytd = res.ytd;
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
    if (res.overallDetails) state.monthData.overallDetails = res.overallDetails;
    if (res.ytd) state.monthData.ytd = res.ytd;
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
    if (res.overallDetails) state.monthData.overallDetails = res.overallDetails;
    if (res.ytd) state.monthData.ytd = res.ytd;
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

    <!-- KPI Threshold Weights Configuration Card -->
    <div class="users-table-card" style="margin-top: 24px;">
      <div class="users-header-row" style="margin-bottom: 14px;">
        <div class="users-header-info">
          <h3>KPI Threshold Weights Configuration</h3>
          <p>Configure weights for the 17 threshold metrics (High = 2, Medium = 1, Low = 0.5) used to calculate overall monthly RAG score. Changes are audit-logged.</p>
        </div>
        <button id="btn-save-weights" class="btn btn-primary">Save Weights</button>
      </div>
      <div id="weights-table-wrap">
        <table class="users-table" id="weights-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Target</th>
              <th>Direction</th>
              <th>Tier</th>
              <th style="width: 130px; text-align: right;">Weight</th>
            </tr>
          </thead>
          <tbody id="weights-tbody"></tbody>
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

  // Weights save handler
  const saveWeightsBtn = frag.querySelector('#btn-save-weights');
  if (saveWeightsBtn) {
    saveWeightsBtn.addEventListener('click', async () => {
      saveWeightsBtn.disabled = true;
      saveWeightsBtn.textContent = 'Saving...';
      try {
        const weights = {};
        frag.querySelectorAll('.metric-weight-select').forEach(sel => {
          weights[sel.dataset.id] = parseFloat(sel.value);
        });
        await api('/api/weights', {
          method: 'POST',
          body: JSON.stringify({ weights }),
        });
        showToast('KPI Threshold weights updated and audit-logged', 'green');
        await loadMonthData();
      } catch (err) {
        showToast('Could not save weights: ' + err.message, 'red');
      } finally {
        saveWeightsBtn.disabled = false;
        saveWeightsBtn.textContent = 'Save Weights';
      }
    });
  }

  loadUsersList(frag);
  loadWeightsConfig(frag);
  return frag;
}

async function loadWeightsConfig(container) {
  const tbody = container.querySelector('#weights-tbody');
  if (!tbody) return;
  try {
    const res = await api('/api/weights');
    const weights = res.weights || {};
    tbody.innerHTML = '';
    const thresholdOrder = [
      { id: 'devices_not_reporting_pct', tier: 'Medium', def: 1 },
      { id: 'endpoint_protection_coverage_pct', tier: 'High', def: 2 },
      { id: 'patch_compliance_pct', tier: 'High', def: 2 },
      { id: 'high_patches_outstanding', tier: 'Medium', def: 1 },
      { id: 'patch_deployment_success_rate_pct', tier: 'Low', def: 0.5 },
      { id: 'avg_days_to_critical_patch', tier: 'Medium', def: 1 },
      { id: 'devices_outdated_protection_pct', tier: 'High', def: 2 },
      { id: 'mttd_hours', tier: 'High', def: 2 },
      { id: 'mttr_hours', tier: 'Medium', def: 1 },
      { id: 'high_vulns_open', tier: 'Medium', def: 1 },
      { id: 'mttr_critical_days', tier: 'High', def: 2 },
      { id: 'mfa_coverage_pct', tier: 'High', def: 2 },
      { id: 'first_time_fix_pct', tier: 'Low', def: 0.5 },
      { id: 'p1_response_sla_pct', tier: 'High', def: 2 },
      { id: 'p2_response_sla_pct', tier: 'Medium', def: 1 },
      { id: 'resolution_sla_pct', tier: 'Medium', def: 1 },
      { id: 'recommendations_completion_pct', tier: 'Low', def: 0.5 }
    ];

    thresholdOrder.forEach(item => {
      const metric = state.metrics.find(m => m.id === item.id) || { label: item.id, target: '-', direction: '-' };
      const curVal = weights[item.id] !== undefined ? weights[item.id] : item.def;
      const tr = document.createElement('tr');
      const targetStr = (metric.target !== null && metric.target !== undefined) ? `${metric.direction === 'higher' ? '≥ ' : '≤ '}${metric.target}${metric.unit || ''}` : '-';
      tr.innerHTML = `
        <td style="font-weight:600;">${escapeHTML(metric.label)}</td>
        <td style="color:var(--text-dim, #64748b); font-family:var(--mono);">${escapeHTML(targetStr)}</td>
        <td style="text-transform:capitalize; color:var(--text-dim, #64748b);">${escapeHTML(metric.direction || '')}</td>
        <td><span class="user-role-badge ${item.tier === 'High' ? 'admin' : (item.tier === 'Medium' ? 'editor' : 'viewer')}">${item.tier}</span></td>
        <td style="text-align:right;">
          <select class="metric-weight-select" data-id="${item.id}" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:var(--surface,#fff); font-size:12px; font-weight:700;">
            <option value="2" ${curVal === 2 ? 'selected' : ''}>2.0 (High)</option>
            <option value="1" ${curVal === 1 ? 'selected' : ''}>1.0 (Med)</option>
            <option value="0.5" ${curVal === 0.5 ? 'selected' : ''}>0.5 (Low)</option>
          </select>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" style="color:#ef4444; padding:12px;">Could not load weights: ${escapeHTML(err.message)}</td></tr>`;
  }
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

  const canDelete = hasPermission('audit:delete') || state.role === 'superadmin';

  frag.innerHTML = `
    <div class="audit-header-row">
      <div class="audit-header-info">
        <h3>Security Audit Logs & Compliance Trail</h3>
        <p>Immutable forensic record of administrative actions, clearance modifications, and authentication events.</p>
      </div>
      <div class="audit-header-actions">
        <button id="btn-refresh-audit" class="btn btn-clear">
          <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Refresh Logs</span>
        </button>
        ${canDelete ? `
        <button id="btn-clear-all-audit" class="btn btn-danger-soft" title="Purge all audit logs (Super Admin only)">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H3.862a2 2 0 01-1.995-1.858L1 7m5 4v6m4-6v6m4-6v6M1 7h18M8 7V4a1 1 0 011-1h2a1 1 0 011 1v3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Purge All Logs</span>
        </button>
        ` : ''}
      </div>
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
        <div class="audit-field audit-field-date">
          <label>From Date</label>
          <div class="audit-date-picker-wrap">
            <input type="text" id="flt-from" class="audit-date-input" placeholder="YYYY-MM-DD" autocomplete="off" readonly>
            <div class="audit-cal-toggle-icon">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="4" width="14" height="13" rx="2.5" ry="2.5"/>
                <line x1="13" y1="2" x2="13" y2="5"/>
                <line x1="7" y1="2" x2="7" y2="5"/>
                <line x1="3" y1="8.5" x2="17" y2="8.5"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="audit-field audit-field-date">
          <label>To Date</label>
          <div class="audit-date-picker-wrap">
            <input type="text" id="flt-to" class="audit-date-input" placeholder="YYYY-MM-DD" autocomplete="off" readonly>
            <div class="audit-cal-toggle-icon">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="4" width="14" height="13" rx="2.5" ry="2.5"/>
                <line x1="13" y1="2" x2="13" y2="5"/>
                <line x1="7" y1="2" x2="7" y2="5"/>
                <line x1="3" y1="8.5" x2="17" y2="8.5"/>
              </svg>
            </div>
          </div>
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
      <div id="audit-table-wrap" class="audit-table-wrap" style="display: none;">
        <table class="audit-table">
          <thead>
            <tr>
              <th>Timestamp (IST)</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Target</th>
              <th>Result</th>
              <th>Details</th>
              ${canDelete ? '<th style="text-align: right; width: 64px;">Action</th>' : ''}
            </tr>
          </thead>
          <tbody id="audit-tbody"></tbody>
        </table>
      </div>
      <div id="audit-table-footer" class="audit-table-footer" style="display: none;">
        <div class="audit-footer-info">
          <span id="audit-showing-text">Showing 10 of 0 events</span>
        </div>
        <button type="button" id="btn-audit-toggle-all" class="btn-audit-toggle-all">
          <span id="btn-audit-toggle-label">Show All</span>
          <svg id="btn-audit-toggle-icon" viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 7.5L10 12.5L15 7.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  const form = frag.querySelector('#audit-filter-form');
  const resetBtn = frag.querySelector('#btn-reset-filters');
  const refreshBtn = frag.querySelector('#btn-refresh-audit');
  const fltFrom = frag.querySelector('#flt-from');
  const fltTo = frag.querySelector('#flt-to');
  const toggleAllBtn = frag.querySelector('#btn-audit-toggle-all');
  const tableWrap = frag.querySelector('#audit-table-wrap');

  attachAuditDatePicker(fltFrom);
  attachAuditDatePicker(fltTo);

  if (tableWrap) {
    tableWrap.addEventListener('scroll', () => {
      if (frag._auditShowAll) return;
      const events = frag._auditAllEvents || [];
      const current = frag._auditVisibleCount || 10;
      if (current >= events.length) return;

      // Load next 10 logs when scrolled near the bottom
      if (tableWrap.scrollTop + tableWrap.clientHeight >= tableWrap.scrollHeight - 50) {
        frag._auditVisibleCount = Math.min(events.length, current + 10);
        renderAuditTableRows(frag);
      }
    });
  }

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      frag._auditShowAll = !frag._auditShowAll;
      if (!frag._auditShowAll) {
        frag._auditVisibleCount = 10;
        if (tableWrap) tableWrap.scrollTop = 0;
      }
      renderAuditTableRows(frag);
    });
  }

  const clearAllBtn = frag.querySelector('#btn-clear-all-audit');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', async () => {
      if (!confirm('⚠️ WARNING: Are you sure you want to PURGE ALL audit logs? This action is permanent and cannot be undone.')) return;
      try {
        clearAllBtn.disabled = true;
        await api('/api/audit', { method: 'DELETE' });
        showToast('All audit logs have been purged', 'green');
        loadAuditEvents(frag, {});
      } catch (err) {
        showToast('Could not purge audit logs: ' + err.message, 'red');
      } finally {
        clearAllBtn.disabled = false;
      }
    });
  }

  const tbody = frag.querySelector('#audit-tbody');
  if (tbody) {
    tbody.addEventListener('click', async (e) => {
      const delBtn = e.target.closest('.btn-audit-row-del');
      if (!delBtn) return;
      const logId = delBtn.dataset.id;
      if (!logId) return;
      if (!confirm('Delete this audit log entry permanently?')) return;
      try {
        delBtn.disabled = true;
        await api('/api/audit/' + encodeURIComponent(logId), { method: 'DELETE' });
        showToast('Audit log deleted', 'green');
        loadAuditEvents(frag, getFilters());
      } catch (err) {
        showToast('Could not delete audit log: ' + err.message, 'red');
        delBtn.disabled = false;
      }
    });
  }

  function getFilters() {
    return {
      action: frag.querySelector('#flt-action').value.trim(),
      user: frag.querySelector('#flt-user').value.trim(),
      from: fltFrom.value.trim(),
      to: fltTo.value.trim(),
    };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadAuditEvents(frag, getFilters());
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    fltFrom.value = '';
    fltTo.value = '';
    loadAuditEvents(frag, {});
  });

  refreshBtn.addEventListener('click', () => {
    loadAuditEvents(frag, getFilters());
  });

  loadAuditEvents(frag, {});
  return frag;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CUSTOM LIGHT THEME CALENDAR PICKER (Matching User Reference Image)
   - Clean light card with 26px rounded radius
   - Signature purple top accent notch
   - Month & Year header with Year stepper and quick Year picker
   - MON..SUN uppercase weekdays header
   - Monday-first dates grid with purple glowing active circle
   - Sized perfectly to fit audit filter panel
   ═══════════════════════════════════════════════════════════════════════════ */
function attachAuditDatePicker(inputEl) {
  const wrap = inputEl.closest('.audit-date-picker-wrap');
  if (!wrap) return;

  let popover = null;
  let showYearPicker = false;
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Default view to current year/month
  let viewDate = new Date();
  if (inputEl.value) {
    const p = inputEl.value.split('-');
    if (p.length === 3) viewDate = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
  }
  let viewYear = viewDate.getFullYear();
  let viewMonth = viewDate.getMonth();
  let selectedYMD = inputEl.value || '';

  function pad(n) { return String(n).padStart(2, '0'); }
  function formatYMD(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

  function renderCalendar() {
    if (!popover) {
      popover = document.createElement('div');
      popover.className = 'audit-cal-popover';
      wrap.appendChild(popover);
    }

    const today = new Date();
    const todayYMD = formatYMD(today.getFullYear(), today.getMonth(), today.getDate());

    if (showYearPicker) {
      // Quick Year Selector view
      const startYear = Math.floor(viewYear / 12) * 12;
      let yearButtons = '';
      for (let y = startYear; y < startYear + 12; y++) {
        const isSel = y === viewYear;
        yearButtons += `<button type="button" class="audit-cal-year-option${isSel ? ' selected' : ''}" data-year="${y}">${y}</button>`;
      }

      popover.innerHTML = `
        <div class="audit-cal-top-notch"></div>
        <div class="audit-cal-header">
          <button type="button" class="audit-cal-nav-btn audit-cal-prev-range" title="Previous Range">
            <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 15L7 10L12 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="audit-cal-title">
            <span class="audit-cal-month-text" style="cursor:pointer;" id="btn-back-to-month">${startYear} - ${startYear + 11}</span>
          </div>
          <button type="button" class="audit-cal-nav-btn audit-cal-next-range" title="Next Range">
            <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 5L13 10L8 15" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <div class="audit-cal-year-grid">${yearButtons}</div>
        <div class="audit-cal-footer">
          <button type="button" class="audit-cal-action-btn" id="btn-cancel-year">Back</button>
        </div>
      `;

      popover.querySelector('.audit-cal-prev-range').addEventListener('click', (e) => {
        e.stopPropagation();
        viewYear -= 12;
        renderCalendar();
      });
      popover.querySelector('.audit-cal-next-range').addEventListener('click', (e) => {
        e.stopPropagation();
        viewYear += 12;
        renderCalendar();
      });
      popover.querySelector('#btn-back-to-month').addEventListener('click', (e) => {
        e.stopPropagation();
        showYearPicker = false;
        renderCalendar();
      });
      popover.querySelector('#btn-cancel-year').addEventListener('click', (e) => {
        e.stopPropagation();
        showYearPicker = false;
        renderCalendar();
      });
      popover.querySelectorAll('.audit-cal-year-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          viewYear = parseInt(btn.dataset.year, 10);
          showYearPicker = false;
          renderCalendar();
        });
      });
      popover.addEventListener('click', (e) => e.stopPropagation());
      return;
    }

    // Standard Month View with Year Stepper (Matching User Reference Image)
    const firstDay = new Date(viewYear, viewMonth, 1);
    const startDayOfWeek = firstDay.getDay(); // 0 is Sun, 1 is Mon...
    const mondayStartOffset = (startDayOfWeek + 6) % 7; // Mon=0, Sun=6

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    popover.innerHTML = `
      <div class="audit-cal-top-notch"></div>
      <div class="audit-cal-header">
        <button type="button" class="audit-cal-nav-btn audit-cal-prev" title="Previous Month">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 15L7 10L12 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="audit-cal-title">
          <span class="audit-cal-month-text">${MONTHS[viewMonth]}</span>
          <div class="audit-cal-year-control">
            <button type="button" class="audit-cal-year-btn audit-cal-year-down" title="Previous Year">‹</button>
            <span class="audit-cal-year-text" title="Click to pick year">${viewYear}</span>
            <button type="button" class="audit-cal-year-btn audit-cal-year-up" title="Next Year">›</button>
          </div>
        </div>
        <button type="button" class="audit-cal-nav-btn audit-cal-next" title="Next Month">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 5L13 10L8 15" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="audit-cal-weekdays">
        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
      </div>
      <div class="audit-cal-grid" id="audit-cal-grid"></div>
      <div class="audit-cal-footer">
        <button type="button" class="audit-cal-action-btn audit-cal-btn-clear">Clear</button>
        <button type="button" class="audit-cal-action-btn audit-cal-btn-today">Today</button>
      </div>
    `;

    const gridEl = popover.querySelector('#audit-cal-grid');

    // Previous month overflow days
    for (let i = mondayStartOffset - 1; i >= 0; i--) {
      const pDay = daysInPrevMonth - i;
      const pMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const pYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      const ymd = formatYMD(pYear, pMonth, pDay);
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'audit-cal-cell other-month' + (selectedYMD === ymd ? ' selected' : '');
      cell.textContent = pDay;
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        viewMonth = pMonth;
        viewYear = pYear;
        selectDate(ymd);
      });
      gridEl.appendChild(cell);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const ymd = formatYMD(viewYear, viewMonth, day);
      const cell = document.createElement('button');
      cell.type = 'button';
      const isSel = selectedYMD === ymd;
      const isTod = todayYMD === ymd;
      cell.className = 'audit-cal-cell' + (isSel ? ' selected' : '') + (isTod ? ' is-today' : '');
      cell.textContent = day;
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        selectDate(ymd);
      });
      gridEl.appendChild(cell);
    }

    // Next month overflow days
    const totalCells = mondayStartOffset + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let day = 1; day <= remainingCells; day++) {
      const nMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const nYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      const ymd = formatYMD(nYear, nMonth, day);
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'audit-cal-cell other-month' + (selectedYMD === ymd ? ' selected' : '');
      cell.textContent = day;
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        viewMonth = nMonth;
        viewYear = nYear;
        selectDate(ymd);
      });
      gridEl.appendChild(cell);
    }

    // Navigation Listeners
    popover.querySelector('.audit-cal-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      renderCalendar();
    });

    popover.querySelector('.audit-cal-next').addEventListener('click', (e) => {
      e.stopPropagation();
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      renderCalendar();
    });

    popover.querySelector('.audit-cal-year-down').addEventListener('click', (e) => {
      e.stopPropagation();
      viewYear--;
      renderCalendar();
    });

    popover.querySelector('.audit-cal-year-up').addEventListener('click', (e) => {
      e.stopPropagation();
      viewYear++;
      renderCalendar();
    });

    popover.querySelector('.audit-cal-year-text').addEventListener('click', (e) => {
      e.stopPropagation();
      showYearPicker = true;
      renderCalendar();
    });

    popover.querySelector('.audit-cal-btn-clear').addEventListener('click', (e) => {
      e.stopPropagation();
      selectedYMD = '';
      inputEl.value = '';
      closePopover();
      inputEl.dispatchEvent(new Event('change', { bubbles: true }));
    });

    popover.querySelector('.audit-cal-btn-today').addEventListener('click', (e) => {
      e.stopPropagation();
      viewYear = today.getFullYear();
      viewMonth = today.getMonth();
      selectDate(todayYMD);
    });

    popover.addEventListener('click', (e) => e.stopPropagation());
  }

  function selectDate(ymd) {
    selectedYMD = ymd;
    inputEl.value = ymd;
    closePopover();
    inputEl.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function openPopover() {
    document.querySelectorAll('.audit-cal-popover').forEach(p => p.remove());
    document.querySelectorAll('.audit-date-input.active').forEach(i => i.classList.remove('active'));

    inputEl.classList.add('active');
    showYearPicker = false;
    if (inputEl.value) {
      const parts = inputEl.value.split('-');
      if (parts.length === 3) {
        viewYear = parseInt(parts[0], 10);
        viewMonth = parseInt(parts[1], 10) - 1;
        selectedYMD = inputEl.value;
      }
    }
    renderCalendar();
    setTimeout(() => {
      document.addEventListener('click', onDocClick);
    }, 10);
  }

  function closePopover() {
    if (popover) {
      popover.remove();
      popover = null;
    }
    inputEl.classList.remove('active');
    document.removeEventListener('click', onDocClick);
  }

  function onDocClick(e) {
    if (!wrap.contains(e.target)) {
      closePopover();
    }
  }

  inputEl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (popover) closePopover();
    else openPopover();
  });
}

async function loadAuditEvents(container, filters = {}) {
  const loadingEl = container.querySelector('#audit-loading');
  const tableWrap = container.querySelector('#audit-table-wrap');
  const tbody = container.querySelector('#audit-tbody');
  const footerEl = container.querySelector('#audit-table-footer');
  if (!loadingEl || !tbody) return;

  loadingEl.style.display = 'block';
  loadingEl.textContent = 'Loading audit trail...';
  tableWrap.style.display = 'none';
  if (footerEl) footerEl.style.display = 'none';

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

    const events = (res.events || []).slice().reverse(); // newest first
    container._auditAllEvents = events;
    container._auditVisibleCount = 10; // default to 10 logs
    container._auditShowAll = false;
    tableWrap.scrollTop = 0;

    renderAuditTableRows(container);
  } catch (err) {
    loadingEl.style.display = 'block';
    loadingEl.textContent = 'Could not load audit trail: ' + err.message;
    if (footerEl) footerEl.style.display = 'none';
  }
}

function renderAuditTableRows(container) {
  const tbody = container.querySelector('#audit-tbody');
  const countBadge = container.querySelector('#audit-count-badge');
  const footerEl = container.querySelector('#audit-table-footer');
  const toggleLabel = container.querySelector('#btn-audit-toggle-label');
  const toggleIcon = container.querySelector('#btn-audit-toggle-icon');
  const showingText = container.querySelector('#audit-showing-text');
  if (!tbody) return;

  const events = container._auditAllEvents || [];
  const total = events.length;
  const canDelete = hasPermission('audit:delete') || state.role === 'superadmin';
  const colspan = canDelete ? 7 : 6;
  tbody.innerHTML = '';

  if (total === 0) {
    if (countBadge) countBadge.textContent = '0 events';
    tbody.innerHTML = `<tr><td colspan="${colspan}" style="text-align: center; padding: 24px; color: var(--text-dim, #64748b);">No audit events match the selected criteria.</td></tr>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  const showAll = Boolean(container._auditShowAll);
  let visibleCount = showAll ? total : (container._auditVisibleCount || 10);
  if (visibleCount > total) visibleCount = total;

  const displayedEvents = events.slice(0, visibleCount);

  if (total > 10) {
    if (visibleCount >= total) {
      if (countBadge) countBadge.textContent = `Showing all ${total} events`;
      if (showingText) showingText.textContent = `Showing all ${total} events`;
      if (toggleLabel) toggleLabel.textContent = `Show Less (First 10)`;
      if (toggleIcon) toggleIcon.innerHTML = `<path d="M15 12.5L10 7.5L5 12.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      if (footerEl) footerEl.style.display = 'flex';
    } else {
      if (countBadge) countBadge.textContent = `Showing ${visibleCount} of ${total} events`;
      if (showingText) showingText.textContent = `Showing ${visibleCount} of ${total} events (scroll down for more)`;
      if (toggleLabel) toggleLabel.textContent = `Show All (${total} events)`;
      if (toggleIcon) toggleIcon.innerHTML = `<path d="M5 7.5L10 12.5L15 7.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      if (footerEl) footerEl.style.display = 'flex';
    }
  } else {
    if (countBadge) countBadge.textContent = `${total} event${total === 1 ? '' : 's'}`;
    if (footerEl) footerEl.style.display = 'none';
  }

  displayedEvents.forEach(ev => {
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
      ${canDelete ? `
        <td style="text-align: right; padding-right: 14px;">
          <button type="button" class="btn-audit-row-del" data-id="${escapeHTML(ev.id)}" title="Delete this log entry (Super Admin only)">
            <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H3.862a2 2 0 01-1.995-1.858L1 7m5 4v6m4-6v6m4-6v6M1 7h18M8 7V4a1 1 0 011-1h2a1 1 0 011 1v3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </td>
      ` : ''}
    `;
    tbody.appendChild(tr);
  });
}

// ---------- Toast (Apple-Style Push Notification Animation) ----------
let toastTimer = null;
function showToast(msg, kind) {
  const el = document.getElementById('toast');
  if (!el) return;

  const k = kind || 'green';
  let title = 'Saved!';
  let desc = String(msg || '');

  // Smart iOS title & description parsing
  if (desc.includes('·')) {
    const parts = desc.split('·');
    title = parts[0].trim() + '!';
    desc = parts.slice(1).join('·').trim();
  } else if (/^saved/i.test(desc)) {
    title = 'Saved!';
    desc = desc.replace(/^saved\s*[:-]?\s*/i, '');
    if (!desc) desc = 'Changes successfully recorded';
  } else if (/^cleared/i.test(desc)) {
    title = 'Cleared!';
    desc = desc.replace(/^cleared\s*[:-]?\s*/i, '');
  } else if (/^restored/i.test(desc)) {
    title = 'Restored!';
  } else if (/^signed in/i.test(desc)) {
    title = 'Welcome Back!';
  } else if (/^signed out/i.test(desc)) {
    title = 'Signed Out';
  } else if (/^exported/i.test(desc)) {
    title = 'Export Complete!';
  } else if (/could not|failed|error|cannot/i.test(desc) || k === 'red') {
    title = 'Attention';
  } else if (k === 'amber') {
    title = 'System Notice';
  } else if (k === 'blue') {
    title = 'Information';
  } else if (k === 'green') {
    title = 'Success!';
  }

  el.className = 'toast apple-notif notif-' + k;
  el.innerHTML = `
    <div class="apple-notif-badge">
      <img src="/logo-symbol.png" alt="A0 Logo" class="apple-notif-logo" onerror="this.onerror=null; this.src='/logo.png';">
    </div>
    <div class="apple-notif-content">
      <div class="apple-notif-title">${escapeHTML(title)}</div>
      <div class="apple-notif-desc" title="${escapeHTML(desc)}">${escapeHTML(desc)}</div>
    </div>
    <button type="button" class="apple-notif-close" aria-label="Dismiss">&times;</button>
  `;

  el.hidden = false;
  el.classList.remove('apple-notif-closing');

  const closeBtn = el.querySelector('.apple-notif-close');
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      clearTimeout(toastTimer);
      el.classList.add('apple-notif-closing');
      setTimeout(() => {
        el.hidden = true;
        el.classList.remove('apple-notif-closing');
      }, 240);
    };
  }

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.add('apple-notif-closing');
    setTimeout(() => {
      el.hidden = true;
      el.classList.remove('apple-notif-closing');
    }, 240);
  }, 3400);
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
    const openLinkBtn = document.getElementById('share-open-link-btn');
    if (openLinkBtn) openLinkBtn.href = res.url;

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


