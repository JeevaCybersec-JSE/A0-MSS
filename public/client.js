/**
 * MSS Intelligence — Client Security Report v7.2
 * Tier 1 / Tier 2 / Tier 3 Visualization
 * Dynamic Rotating Donut Chart + Interactive Domain Security Posture
 *
 * Security Guarantee:
 * - Read-only public portal via URL token.
 * - Calls GET /api/public/portal/:token only.
 * - Zero browser persistence. No external dependencies.
 */

(function () {
  'use strict';

  // ===========================================================
  // SECTION 1: UTILITIES
  // ===========================================================

  function cleanText(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/â€"/g, '\u2014')
      .replace(/â€"/g, '\u2013')
      .replace(/â€œ/g, '\u201c')
      .replace(/â€/g, '\u201d')
      .replace(/â€™/g, '\u2019')
      .replace(/Â/g, '');
  }

  function formatMonth(monthStr) {
    if (!monthStr || !/^\d{4}-\d{2}$/.test(monthStr)) return cleanText(monthStr || '\u2014');
    const [year, month] = monthStr.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  function formatDate(isoStr) {
    if (!isoStr) return '\u2014';
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return '\u2014';
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return '\u2014'; }
  }

  function formatMetricValue(val, unit) {
    if (val === null || val === undefined || val === '' || !Number.isFinite(Number(val))) return '\u2014';
    const num = Number(val);
    const s = Number.isInteger(num) ? num.toString() : num.toFixed(2);
    return unit && unit.trim() ? s + unit.trim() : s;
  }

  function safeNum(v) {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function isTargetMetric(def) {
    if (!def) return false;
    const dir = (def.direction || '').toLowerCase();
    if (dir === 'trend' || dir === '') return false;
    if (def.ragRule === 'prevMonth') return false;
    const t = def.target;
    if (t === null || t === undefined || t === '' || t === '-') return false;
    return Number.isFinite(parseFloat(String(t).replace('%', '').trim()));
  }

  function computeGap(actual, target, direction) {
    const a = safeNum(actual), t = safeNum(target);
    if (a === null || t === null) return null;
    const dir = (direction || '').toLowerCase();
    if (dir === 'higher') return Math.round((a - t) * 100) / 100;
    if (dir === 'lower')  return Math.round((t - a) * 100) / 100;
    return null;
  }

  function formatGap(gapVal, unit) {
    if (gapVal === null || gapVal === undefined) return '\u2014';
    const sign = gapVal >= 0 ? '+' : '\u2212';
    const abs  = Math.abs(gapVal);
    const s    = Number.isInteger(abs) ? abs.toString() : abs.toFixed(2);
    const suf  = unit === '%' ? ' pp' : (unit ? ' ' + unit : '');
    return `${sign}${s}${suf}`;
  }

  function ragLabel(rag) {
    const r = (rag || '').toLowerCase();
    if (r === 'green') return 'GREEN';
    if (r === 'amber') return 'AMBER';
    if (r === 'red')   return 'RED';
    return '\u2014';
  }

  function ragColor(rag) {
    const r = (rag || '').toLowerCase();
    if (r === 'green') return '#059669';
    if (r === 'amber') return '#d97706';
    if (r === 'red')   return '#dc2626';
    return '#9ca3af';
  }

  function svgText(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // ===========================================================
  // SECTION 3: DYNAMIC ROTATING DONUT CHART (Physics Engine)
  // ===========================================================

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function createSVG(tag, attrs = {}) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    return el;
  }

  /**
   * Builds an interactive physics-driven rotating RAG donut chart.
   * Matches the signature motion design of the core MSS Intelligence suite:
   * - Smooth, continuous orbital idle rotation
   * - Interactive angular inertia tracking on mouse pointer move
   * - Per-segment dynamic hover expansion with contrast glow
   * - Center text swap displaying segment counts and status
   * - Orbit marker dot rotating along outer track
   * - Automatic smooth spring return to 0° on pointer leave
   */
  function initRotatingDonutChart(container, cardWrap, green, amber, red) {
    if (!container) return;
    container.innerHTML = '';

    const total = green + amber + red;
    const VB = 180;
    const CX = 90, CY = 90;
    const R  = 68;
    const SW = 15;
    const GAP_DEG = 3.2;
    const CIRC = 2 * Math.PI * R;

    const svg = createSVG('svg', {
      viewBox: `0 0 ${VB} ${VB}`,
      width: '180',
      height: '180',
      class: 'rag-donut-svg',
      role: 'img',
      'aria-label': `RAG distribution: ${green} Within Target, ${amber} Attention, ${red} Critical`,
      style: 'overflow:visible;'
    });

    // Static layer — never rotates
    const staticG = createSVG('g', { class: 'rag-static' });

    // Track
    staticG.appendChild(createSVG('circle', {
      cx: CX, cy: CY, r: R,
      fill: 'none', stroke: '#F1F5F9', 'stroke-width': SW
    }));

    // Outer dashed guide ring
    staticG.appendChild(createSVG('circle', {
      cx: CX, cy: CY, r: R + SW / 2 + 7,
      fill: 'none', stroke: '#E5E7EB',
      'stroke-width': '0.75', 'stroke-dasharray': '2 8', opacity: '0.65'
    }));

    // Inner solid guide ring
    staticG.appendChild(createSVG('circle', {
      cx: CX, cy: CY, r: R - SW / 2 - 6,
      fill: 'none', stroke: '#E5E7EB',
      'stroke-width': '0.5', opacity: '0.5'
    }));

    // Center default text
    const numEl = createSVG('text', {
      x: CX, y: CY - 5,
      'text-anchor': 'middle',
      class: 'rag-ctr-num'
    });
    numEl.textContent = total > 0 ? String(total) : '0';

    const lblEl = createSVG('text', {
      x: CX, y: CY + 13,
      'text-anchor': 'middle',
      class: 'rag-ctr-lbl'
    });
    lblEl.textContent = total > 0 ? 'metrics' : 'no data';

    // Hover overlays — shown when a segment is hovered
    const hvNumEl = createSVG('text', {
      x: CX, y: CY - 5,
      'text-anchor': 'middle',
      class: 'rag-hv-num',
      opacity: '0'
    });
    const hvLblEl = createSVG('text', {
      x: CX, y: CY + 13,
      'text-anchor': 'middle',
      class: 'rag-hv-lbl',
      opacity: '0'
    });

    staticG.appendChild(numEl);
    staticG.appendChild(lblEl);
    staticG.appendChild(hvNumEl);
    staticG.appendChild(hvLblEl);
    svg.appendChild(staticG);

    if (total === 0) {
      container.appendChild(svg);
      return;
    }

    // Unified rotating ring group
    const ringG = createSVG('g', { class: 'rag-ring-group' });
    const baseG = createSVG('g', { transform: `rotate(-90 ${CX} ${CY})` });

    const SEG_DEFS = [
      { v: green, color: '#059669', colorHover: '#10b981', label: 'Within Target', short: 'Green' },
      { v: amber, color: '#d97706', colorHover: '#f59e0b', label: 'Attention Req.', short: 'Amber' },
      { v: red,   color: '#dc2626', colorHover: '#ef4444', label: 'Critical Remed.', short: 'Red'   }
    ].filter(s => s.v > 0);

    let accDeg = 0;
    const segMeta = [];

    SEG_DEFS.forEach(s => {
      const spanDeg = (s.v / total) * 360;
      const startFrac = (accDeg + GAP_DEG / 2) / 360;
      const lenFrac = Math.max((spanDeg - GAP_DEG) / 360, 0.003);
      const dashLen = lenFrac * CIRC;
      const dashOff = -(startFrac * CIRC);

      const circle = createSVG('circle', {
        cx: CX, cy: CY, r: R,
        fill: 'none',
        stroke: s.color,
        'stroke-width': SW,
        'stroke-dasharray': `${dashLen.toFixed(2)} ${CIRC.toFixed(2)}`,
        'stroke-dashoffset': dashOff.toFixed(2),
        'stroke-linecap': 'round',
        opacity: '0.94',
        class: 'rag-seg'
      });
      baseG.appendChild(circle);

      // Boundary dot at segment start (white notch between segments)
      const bRad = (accDeg - 90) * Math.PI / 180;
      baseG.appendChild(createSVG('circle', {
        cx: (CX + R * Math.cos(bRad)).toFixed(2),
        cy: (CY + R * Math.sin(bRad)).toFixed(2),
        r: '2', fill: '#FFFFFF', opacity: '0.85'
      }));

      segMeta.push({ ...s, startDeg: accDeg, endDeg: accDeg + spanDeg, el: circle });
      accDeg += spanDeg;
    });

    ringG.appendChild(baseG);

    // Orbit marker dot on the outer guide ring at 12 o'clock — rotates with the ring
    ringG.appendChild(createSVG('circle', {
      cx: CX, cy: CY - R - SW / 2 - 4,
      r: '2.5', fill: '#94A3B8', class: 'rag-orbit-marker'
    }));

    svg.appendChild(ringG);
    container.appendChild(svg);

    // Physics Engine
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const targetCard = cardWrap || container;
    const S = { IDLE: 0, ENTERING: 1, CURSOR: 2, LEAVING: 3 };
    let state = S.IDLE;

    let angle       = 0;
    let vel         = 0;
    let curVel      = 0;
    let prevCursDeg = null;
    let activeSegIdx = -1;
    let alive       = true;

    const IDLE_SPD    = 0.19;
    const IDLE_RAMP   = 0.022;
    const MAX_CURS    = 1.2;
    const MAX_RET     = 2.2;
    const FRICTION    = 0.92;
    const CURS_LERP   = 0.20;
    const RING_DRAG   = 0.96;
    const RET_SPRING  = 0.11;
    const SNAP_DEG    = 2.0;
    const SNAP_VEL    = 0.08;

    function svgCtr() {
      const rect = svg.getBoundingClientRect();
      const sc = rect.width / VB;
      return { x: rect.left + CX * sc, y: rect.top + CY * sc, sc };
    }

    function returnDelta() {
      const norm = ((angle % 360) + 360) % 360;
      return norm <= 180 ? -norm : 360 - norm;
    }

    function setAngle(a) {
      angle = a;
      ringG.setAttribute('transform', `rotate(${a.toFixed(3)} ${CX} ${CY})`);
    }

    function setActive(idx) {
      if (idx === activeSegIdx) return;
      activeSegIdx = idx;
      const hasActive = idx >= 0;

      segMeta.forEach((s, i) => {
        if (i === idx) {
          s.el.setAttribute('stroke-width', String(SW + 4));
          s.el.setAttribute('stroke', s.colorHover);
          s.el.setAttribute('opacity', '1');
        } else {
          s.el.setAttribute('stroke-width', String(SW));
          s.el.setAttribute('stroke', s.color);
          s.el.setAttribute('opacity', hasActive ? '0.38' : '0.94');
        }
      });

      if (hasActive) {
        const s = segMeta[idx];
        numEl.setAttribute('opacity', '0');
        lblEl.setAttribute('opacity', '0');
        hvNumEl.textContent = s.v;
        hvLblEl.textContent = s.label;
        hvNumEl.setAttribute('opacity', '1');
        hvLblEl.setAttribute('opacity', '1');
      } else {
        numEl.setAttribute('opacity', '1');
        lblEl.setAttribute('opacity', '1');
        hvNumEl.setAttribute('opacity', '0');
        hvLblEl.setAttribute('opacity', '0');
      }
    }

    function onMove(e) {
      const c = svgCtr();
      const dx = e.clientX - c.x;
      const dy = e.clientY - c.y;

      if (state === S.CURSOR || state === S.ENTERING) {
        const cursDeg = Math.atan2(dy, dx) * 180 / Math.PI;
        if (prevCursDeg !== null) {
          let delta = cursDeg - prevCursDeg;
          if (delta >  180) delta -= 360;
          if (delta < -180) delta += 360;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const prox = Math.min(1.5, 1.0 / (1 + dist / (c.sc * R) * 0.55));
          const target = Math.max(-MAX_CURS, Math.min(MAX_CURS, delta * prox * 0.38));
          curVel += (target - curVel) * CURS_LERP;
        }
        prevCursDeg = cursDeg;
      }

      if (state === S.CURSOR) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        const innerPx = (R - SW / 2) * c.sc;
        const outerPx = (R + SW / 2) * c.sc;
        if (dist >= innerPx - 6 && dist <= outerPx + 6) {
          const svgDeg   = Math.atan2(dy, dx) * 180 / Math.PI;
          const clockDeg = ((svgDeg + 90) + 3600) % 360;
          const normAng  = ((angle % 360) + 360) % 360;
          const segDeg   = ((clockDeg - normAng) + 3600) % 360;

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
      targetCard.classList.add('rag-rotating-active');
    }

    function onLeave() {
      state = S.LEAVING;
      prevCursDeg = null;
      curVel = 0;
      setActive(-1);
      targetCard.classList.remove('rag-rotating-active');
    }

    targetCard.addEventListener('pointermove',  onMove,  { passive: true });
    targetCard.addEventListener('pointerenter', onEnter, { passive: true });
    targetCard.addEventListener('pointerleave', onLeave, { passive: true });

    function tick() {
      if (!alive || !document.contains(container)) {
        targetCard.removeEventListener('pointermove',  onMove);
        targetCard.removeEventListener('pointerenter', onEnter);
        targetCard.removeEventListener('pointerleave', onLeave);
        return;
      }

      switch (state) {
        case S.IDLE:
          vel += (IDLE_SPD - vel) * IDLE_RAMP;
          setAngle(angle + vel);
          break;

        case S.ENTERING: {
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

        case S.CURSOR:
          vel += (curVel - vel) * 0.14;
          curVel *= FRICTION;
          vel *= RING_DRAG;
          vel = Math.max(-MAX_CURS, Math.min(MAX_CURS, vel));
          setAngle(angle + vel);
          break;

        case S.LEAVING: {
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

    requestAnimationFrame(tick);
  }

  // ===========================================================
  // SECTION 4: INTERACTIVE DOMAIN SECURITY POSTURE
  // ===========================================================

  const DOMAIN_ICONS = {
    endpoint: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="3.5" width="15" height="10" rx="1.5"/><path d="M7 17h6M10 13.5V17" stroke-linecap="round"/></svg>',
    patch: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 2.3l6 2.2v4.4c0 4-2.6 6.9-6 8.1-3.4-1.2-6-4.1-6-8.1V4.5z" stroke-linejoin="round"/><path d="M7.3 10l1.9 1.9 3.6-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    protection: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 2.3l6 2.2v4.4c0 4-2.6 6.9-6 8.1-3.4-1.2-6-4.1-6-8.1V4.5z" stroke-linejoin="round"/></svg>',
    secops: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="3"/><path d="M10 10L15.5 5.2" stroke-linecap="round"/></svg>',
    vuln: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6.5" y="7" width="7" height="8.5" rx="3.3"/><path d="M10 7V4.5M7.2 8.5L4.5 6.5M12.8 8.5l2.7-2M4.3 11h2.2M13.5 11h2.2M7.2 14.5L4.7 16.5M12.8 14.5l2.5 2" stroke-linecap="round"/></svg>',
    identity: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.2" cy="13.8" r="3.2"/><path d="M8.4 11.6L15.5 4.5M13 7l2 2M15 5l2 2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    email: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M3 5.5l7 5.5 7-5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    service: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11v-1a6 6 0 0112 0v1" stroke-linecap="round"/><rect x="2.5" y="11" width="3.2" height="4.5" rx="1"/><rect x="14.3" y="11" width="3.2" height="4.5" rx="1"/><path d="M15.5 15.5v.5a2 2 0 01-2 2h-2.3" stroke-linecap="round"/></svg>',
    compliance: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4.5" y="3.5" width="11" height="14" rx="1.5"/><rect x="7.3" y="2" width="5.4" height="3" rx="0.8"/><path d="M7 9.5h6M7 12.5h6M7 15.5h3.5" stroke-linecap="round"/></svg>',
    default: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="2.5" width="6" height="6" rx="1.2"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.2"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.2"/><rect x="11.5" y="11.5" width="6" height="6" rx="1.2"/></svg>'
  };

  let sharedTooltip = null;
  function getOrCreateTooltip() {
    if (!sharedTooltip) {
      sharedTooltip = document.createElement('div');
      sharedTooltip.className = 'domain-tooltip';
      document.body.appendChild(sharedTooltip);
    }
    return sharedTooltip;
  }

  function showDomainTooltip(html, clientX, clientY) {
    const tip = getOrCreateTooltip();
    tip.innerHTML = html;
    tip.classList.add('visible');
    const tipW = tip.offsetWidth || 190;
    const tipH = tip.offsetHeight || 38;
    let left = clientX - tipW / 2;
    let top = clientY - tipH - 12;
    if (left < 10) left = 10;
    if (left + tipW > window.innerWidth - 10) left = window.innerWidth - tipW - 10;
    if (top < 10) top = clientY + 16;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  function hideDomainTooltip() {
    if (sharedTooltip) sharedTooltip.classList.remove('visible');
  }

  function renderDomainSecurityPosture(container, controlsContainer, sections, metricDefs, metricsData) {
    if (!container) return;
    container.innerHTML = '';

    // Collect domain stats
    const domainStats = [];
    sections.forEach(sec => {
      const defs = metricDefs.filter(d => d.section === sec.id);
      let g = 0, a = 0, r = 0;
      defs.forEach(d => {
        const e = metricsData[d.id];
        if (!e || !e.rag) return;
        const rag = (e.rag || '').toLowerCase();
        if (rag === 'green') g++;
        else if (rag === 'amber') a++;
        else if (rag === 'red')   r++;
      });
      const tot = g + a + r;
      if (tot > 0) {
        const pct = Math.round((g / tot) * 100);
        const status = r > 0 ? 'critical' : a > 0 ? 'attention' : 'optimal';
        domainStats.push({
          id: sec.id,
          name: cleanText(sec.name),
          icon: sec.icon || sec.id,
          g, a, r, tot, pct, status
        });
      }
    });

    if (domainStats.length === 0) {
      container.innerHTML = '<p class="no-data-notice">No evaluated security domain metrics available for this period.</p>';
      if (controlsContainer) controlsContainer.innerHTML = '';
      return;
    }

    // Counts for filter pills
    const criticalCount = domainStats.filter(d => d.status === 'critical').length;
    const attentionCount = domainStats.filter(d => d.status === 'attention').length;
    const optimalCount = domainStats.filter(d => d.status === 'optimal').length;

    let activeFilter = 'all';

    // Build controls
    if (controlsContainer) {
      controlsContainer.innerHTML = `
        <button class="domain-filter-pill active" data-filter="all">All Domains (${domainStats.length})</button>
        ${criticalCount > 0 ? `<button class="domain-filter-pill pill-critical" data-filter="critical">&#9679; Action Required (${criticalCount})</button>` : ''}
        ${attentionCount > 0 ? `<button class="domain-filter-pill pill-attention" data-filter="attention">&#9679; Attention (${attentionCount})</button>` : ''}
        ${optimalCount > 0 ? `<button class="domain-filter-pill pill-optimal" data-filter="optimal">&#9679; Optimal (${optimalCount})</button>` : ''}
      `;

      controlsContainer.querySelectorAll('.domain-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          controlsContainer.querySelectorAll('.domain-filter-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeFilter = btn.getAttribute('data-filter') || 'all';
          applyFilter();
        });
      });
    }

    // Build modern domain grid cards
    function buildCards() {
      container.innerHTML = '';
      container.className = 'domain-posture-grid';

      domainStats.forEach(d => {
        const iconSvg = DOMAIN_ICONS[d.id] || DOMAIN_ICONS[d.icon] || DOMAIN_ICONS.default;

        const badgeHtml = d.status === 'critical'
          ? `<span class="domain-badge badge-critical">&#9679; ${d.r} Critical</span>`
          : d.status === 'attention'
          ? `<span class="domain-badge badge-attention">&#9679; ${d.a} Attention</span>`
          : `<span class="domain-badge badge-optimal">&#10003; 100% Met</span>`;

        // Circular radial gauge calculations (r = 28, C = 175.929)
        const C = 175.929;
        const gLen = d.tot > 0 ? ((d.g / d.tot) * C).toFixed(2) : '0';
        const aLen = d.tot > 0 ? ((d.a / d.tot) * C).toFixed(2) : '0';
        const rLen = d.tot > 0 ? ((d.r / d.tot) * C).toFixed(2) : '0';
        const aOffset = (-Number(gLen)).toFixed(2);
        const rOffset = (-(Number(gLen) + Number(aLen))).toFixed(2);

        const card = document.createElement('div');
        card.className = `domain-grid-card status-${d.status}`;
        card.setAttribute('data-sec-id', d.id);
        card.setAttribute('data-status', d.status);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('title', `Click to inspect ${d.name} operational telemetry in Tier 3`);

        card.innerHTML = `
          <!-- Top Row: Icon + Status Badge -->
          <div class="dcard-top-row">
            <div class="dcard-icon-box domain-icon-${d.status}" aria-hidden="true">
              ${iconSvg}
            </div>
            ${badgeHtml}
          </div>

          <!-- Domain Title & Subtitle -->
          <div class="dcard-meta-block">
            <div class="dcard-name">${cleanText(d.name)}</div>
            <div class="dcard-subtitle">${d.tot} evaluated metric${d.tot !== 1 ? 's' : ''}</div>
          </div>

          <!-- Gauge + Health Breakdown Section -->
          <div class="dcard-gauge-section">
            <div class="dcard-radial-wrap" title="${d.pct}% Target Attainment">
              <svg class="dcard-radial-svg" viewBox="0 0 76 76" width="72" height="72">
                <circle cx="38" cy="38" r="28" fill="none" stroke="#f1f5f9" stroke-width="5" />
                ${d.g > 0 ? `<circle cx="38" cy="38" r="28" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="${gLen} ${C}" stroke-dashoffset="0" transform="rotate(-90 38 38)" class="dcard-radial-seg" />` : ''}
                ${d.a > 0 ? `<circle cx="38" cy="38" r="28" fill="none" stroke="#f59e0b" stroke-width="5" stroke-dasharray="${aLen} ${C}" stroke-dashoffset="${aOffset}" transform="rotate(-90 38 38)" class="dcard-radial-seg" />` : ''}
                ${d.r > 0 ? `<circle cx="38" cy="38" r="28" fill="none" stroke="#ef4444" stroke-width="5" stroke-dasharray="${rLen} ${C}" stroke-dashoffset="${rOffset}" transform="rotate(-90 38 38)" class="dcard-radial-seg" />` : ''}
              </svg>
              <div class="dcard-gauge-center">
                <span class="dcard-gauge-val">${d.pct}%</span>
                <span class="dcard-gauge-sub">MET</span>
              </div>
            </div>

            <div class="dcard-breakdown-list">
              <div class="dcard-b-item b-green">
                <span class="dcard-b-dot"></span>
                <span class="dcard-b-txt">Within Target: <strong>${d.g}</strong></span>
              </div>
              <div class="dcard-b-item b-amber ${d.a === 0 ? 'is-zero' : ''}">
                <span class="dcard-b-dot"></span>
                <span class="dcard-b-txt">Attention: <strong>${d.a}</strong></span>
              </div>
              <div class="dcard-b-item b-red ${d.r === 0 ? 'is-zero' : ''}">
                <span class="dcard-b-dot"></span>
                <span class="dcard-b-txt">Critical: <strong>${d.r}</strong></span>
              </div>
            </div>
          </div>

          <!-- Bottom Row: Ratio & Inspect Action -->
          <div class="dcard-footer-row">
            <span class="dcard-ratio-badge">${d.g}/${d.tot} on target</span>
            <span class="dcard-action-link">
              <span>Inspect</span>
              <span class="dcard-action-arrow">&rarr;</span>
            </span>
          </div>
        `;

        // Click to jump to Tier 3 section (auto-expands if collapsed)
        function jumpToTier3() {
          const targetBlock = document.getElementById('telemetry-section-' + d.id);
          if (targetBlock) {
            targetBlock.classList.remove('is-collapsed');
            const hdr = targetBlock.querySelector('.telemetry-domain-toggle');
            if (hdr) hdr.setAttribute('aria-expanded', 'true');
            targetBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetBlock.classList.add('telemetry-block-focused');
            setTimeout(() => targetBlock.classList.remove('telemetry-block-focused'), 2400);
          }
        }

        card.addEventListener('click', jumpToTier3);
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            jumpToTier3();
          }
        });

        container.appendChild(card);
      });
    }

    function applyFilter() {
      const cards = container.querySelectorAll('.domain-grid-card');
      cards.forEach(c => {
        const s = c.getAttribute('data-status');
        if (activeFilter === 'all' || s === activeFilter) {
          c.style.display = 'flex';
        } else {
          c.style.display = 'none';
        }
      });
    }

    buildCards();
  }

  // ===========================================================
  // SECTION 5: INTERACTIVE BULLET-BAR CHART (TIER 2)
  // ===========================================================

  // Shared hover tooltip for bullet-bar rows (reuses domain tooltip system)
  let t2Tooltip = null;
  function getT2Tooltip() {
    if (!t2Tooltip) {
      t2Tooltip = document.createElement('div');
      t2Tooltip.className = 'domain-tooltip';
      document.body.appendChild(t2Tooltip);
    }
    return t2Tooltip;
  }
  function showT2Tip(html, cx, cy) {
    const tip = getT2Tooltip();
    tip.innerHTML = html;
    tip.classList.add('visible');
    const tipW = tip.offsetWidth || 200;
    const tipH = tip.offsetHeight || 44;
    let left = cx - tipW / 2;
    let top  = cy - tipH - 14;
    if (left < 10) left = 10;
    if (left + tipW > window.innerWidth - 10) left = window.innerWidth - tipW - 10;
    if (top  < 10) top  = cy + 18;
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
  }
  function hideT2Tip() {
    if (t2Tooltip) t2Tooltip.classList.remove('visible');
  }

  /**
   * Build and inject interactive divergence chart rows into the list container.
   * Each row visualizes SLA contract target baseline (0% center axis) with
   * deficit extending left (red/amber) and surplus extending right (green).
   */
  function buildBulletBarRows(listEl, items, sectionMap) {
    listEl.innerHTML = '';
    if (!items || items.length === 0) {
      listEl.innerHTML = '<p class="no-data-notice">No matching KPIs for the current filter.</p>';
      return;
    }

    items.forEach(({ def, data }, idx) => {
      const rag    = (data.rag || 'neutral').toLowerCase();
      const actual = safeNum(data.computed);
      const target = safeNum(def.target);
      const dir    = (def.direction || '').toLowerCase();
      const unit   = def.unit || '';

      const actualFmt = formatMetricValue(data.computed, unit);
      const targetFmt = target !== null ? `${target}${unit}` : '\u2014';
      const gapVal    = computeGap(actual, target, dir);
      const gapFmt    = formatGap(gapVal, unit);

      // Determine deficit vs surplus
      const isDeficit = gapVal !== null && gapVal < 0;
      const isSurplus = gapVal !== null && gapVal >= 0;

      // Calculate visual divergence width (normalized 0% to 100% of half-track)
      let barWidthPct = 0;
      if (gapVal !== null && gapVal !== 0) {
        let rawPct = 0;
        if (target !== null && target !== 0) {
          rawPct = (Math.abs(gapVal) / Math.abs(target)) * 100;
        } else {
          rawPct = Math.min(Math.abs(gapVal) * 5, 100);
        }
        // Scaled visually so subtle gaps are visible (min 12%) and capped at 100%
        barWidthPct = Math.min(Math.max(rawPct, 12), 100);
      }

      const gapPillCls = gapVal === null ? 'gap-pill-neutral' : isSurplus ? 'gap-pill-positive' : 'gap-pill-negative';
      const dirArrow   = dir === 'higher' ? '\u2191' : dir === 'lower' ? '\u2193' : '\u2014';
      const dirLabel   = dir === 'higher' ? 'Higher is better' : dir === 'lower' ? 'Lower is better' : 'Trend';
      const badgeCls   = `rag-badge-${['green','amber','red'].includes(rag) ? rag : 'neutral'}`;

      // Section name lookup for sub-label
      const sectionName = sectionMap && def.section ? (sectionMap[def.section] || '') : '';

      const row = document.createElement('div');
      row.className = 'divergence-row target-bullet-row';
      row.setAttribute('data-rag', rag);
      row.setAttribute('tabindex', '0');
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', `${cleanText(def.label)}: actual ${actualFmt}, target ${targetFmt}, variance ${gapFmt}`);

      row.innerHTML = `
        <div class="divergence-row-info target-row-info">
          <div class="divergence-metric-name target-metric-name">${cleanText(def.label)}</div>
          <div class="divergence-metric-sub target-metric-sub">
            ${sectionName ? `<span>${sectionName}</span><span style="color:#cbd5e1">\u2022</span>` : ''}
            <span class="target-dir-badge">${dirArrow} ${dirLabel}</span>
            <span class="rag-badge ${badgeCls}" style="font-size:10px;padding:1px 7px">&#9679;&nbsp;${ragLabel(rag)}</span>
          </div>
        </div>
        <div class="divergence-axis-cell target-bar-cell">
          <div class="divergence-scale-labels">
            <span>&larr; Deficit (SLA Breach)</span>
            <span class="scale-zero-marker">&#127919; 0% Target SLA Baseline</span>
            <span>Surplus (Target Met) &rarr;</span>
          </div>
          <div class="divergence-track">
            <div class="divergence-half divergence-left-zone">
              ${isDeficit ? `<div class="divergence-bar bar-deficit ${rag === 'amber' ? 'fill-amber' : ''}" style="width:0%" data-width="${barWidthPct.toFixed(1)}%"><span class="divergence-bar-val">${gapFmt}</span></div>` : ''}
            </div>
            <div class="divergence-center-line" title="Target SLA Baseline (0% Gap)"></div>
            <div class="divergence-half divergence-right-zone">
              ${isSurplus ? `<div class="divergence-bar bar-surplus" style="width:0%" data-width="${barWidthPct.toFixed(1)}%"><span class="divergence-bar-val">${gapFmt}</span></div>` : ''}
            </div>
          </div>
          <div class="divergence-subtrack-note">
            <span>Actual: <strong>${actualFmt}</strong></span>
            <span>Target: <strong>${targetFmt}</strong></span>
          </div>
        </div>
        <div class="divergence-readout-col target-row-readout">
          <div class="readout-actual-block">
            <div class="readout-actual">${actualFmt}</div>
            <div class="readout-target">Target: ${targetFmt}</div>
          </div>
          <span class="readout-gap ${gapPillCls}">${gapFmt}</span>
          <span class="target-row-arrow">&#8250;</span>
        </div>
      `;

      // Animate divergence bar in with stagger
      const barEl = row.querySelector('.divergence-bar');
      if (barEl) {
        const targetW = barEl.getAttribute('data-width') || '0%';
        setTimeout(() => {
          barEl.style.width = targetW;
        }, 60 + idx * 35);
      }

      // Hover tooltip on the divergence axis cell
      const axisCell = row.querySelector('.divergence-axis-cell');
      if (axisCell) {
        axisCell.addEventListener('pointermove', e => {
          showT2Tip(
            `<strong>${cleanText(def.label)}</strong><br>` +
            `Contract Target: <b>${targetFmt}</b> &nbsp;|&nbsp; Actual: <b>${actualFmt}</b><br>` +
            `SLA Variance: <b>${gapFmt}</b> (${isSurplus ? 'Target Met / Surplus' : 'Deficit / SLA Breach'}) &bull; ${dirLabel}`,
            e.clientX, e.clientY
          );
        }, { passive: true });
        axisCell.addEventListener('pointerleave', hideT2Tip, { passive: true });
      }

      // Click / keyboard: scroll to Tier 3 section for this metric's domain (auto-expands)
      function drillToTier3() {
        const secId = def.section;
        if (!secId) return;
        const t3Block = document.getElementById('telemetry-section-' + secId);
        if (t3Block) {
          t3Block.classList.remove('is-collapsed');
          const hdr = t3Block.querySelector('.telemetry-domain-toggle');
          if (hdr) hdr.setAttribute('aria-expanded', 'true');
          t3Block.scrollIntoView({ behavior: 'smooth', block: 'center' });
          t3Block.classList.add('telemetry-block-focused');
          setTimeout(() => t3Block.classList.remove('telemetry-block-focused'), 2400);
        }
      }
      row.addEventListener('click', drillToTier3);
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); drillToTier3(); }
      });

      listEl.appendChild(row);
    });
  }

  // ===========================================================
  // SECTION 6: TIER 1 — EXECUTIVE OVERVIEW
  // ===========================================================

  function renderTier1(portal) {
    const summary    = portal.summary    || { total: 0, green: 0, amber: 0, red: 0 };
    const narrative  = portal.narrative  || {};
    const sections   = Array.isArray(portal.sections)          ? portal.sections          : [];
    const metricDefs = Array.isArray(portal.metricDefinitions) ? portal.metricDefinitions : [];
    const metricsData = portal.metrics || {};
    const overallRAG  = (portal.overallRAG || 'neutral').toLowerCase();

    const green = Number(summary.green) || 0;
    const amber = Number(summary.amber) || 0;
    const red   = Number(summary.red)   || 0;
    const total = green + amber + red;

    // ---- 1a. Dynamic Rotating Donut Chart ----
    const donutEl = document.getElementById('donut-chart-container');
    const donutCard = document.getElementById('donut-distribution-card') || donutEl;
    if (donutEl) initRotatingDonutChart(donutEl, donutCard, green, amber, red);

    // ---- 1b. RAG summary cards ----
    const ragCardsEl = document.getElementById('rag-summary-cards');
    if (ragCardsEl) {
      const pctG = total > 0 ? Math.round((green / total) * 100) : 0;
      const pctA = total > 0 ? Math.round((amber / total) * 100) : 0;
      const pctR = total > 0 ? Math.round((red   / total) * 100) : 0;
      ragCardsEl.innerHTML = `
        <div class="rag-card rag-card-green" role="status">
          <div class="rag-card-count">${green}</div>
          <div class="rag-card-info">
            <div class="rag-card-label">Within Target</div>
            <div class="rag-card-pct">${pctG}% of evaluated metrics</div>
          </div>
          <div class="rag-card-dot"></div>
        </div>
        <div class="rag-card rag-card-amber" role="status">
          <div class="rag-card-count">${amber}</div>
          <div class="rag-card-info">
            <div class="rag-card-label">Attention Required</div>
            <div class="rag-card-pct">${pctA}% of evaluated metrics</div>
          </div>
          <div class="rag-card-dot"></div>
        </div>
        <div class="rag-card rag-card-red" role="status">
          <div class="rag-card-count">${red}</div>
          <div class="rag-card-info">
            <div class="rag-card-label">Critical Remediation</div>
            <div class="rag-card-pct">${pctR}% of evaluated metrics</div>
          </div>
          <div class="rag-card-dot"></div>
        </div>
      `;
    }

    // ---- 1c. Interactive Domain Security Posture ----
    const domainEl = document.getElementById('domain-rag-chart-container');
    const controlsEl = document.getElementById('domain-posture-controls');
    if (domainEl) renderDomainSecurityPosture(domainEl, controlsEl, sections, metricDefs, metricsData);

    // ---- 1d. Overall RAG Hero Card (Positioned Above Pie Chart) ----
    const ragHeroEl = document.getElementById('overall-rag-hero-container');
    if (ragHeroEl) {
      const overallText = overallRAG === 'green'
        ? 'All evaluated security metrics are within defined target thresholds. Security posture is operating at optimal levels for the reporting period.'
        : overallRAG === 'amber'
        ? 'Several security metrics have reached warning thresholds requiring active oversight and remediation during this period.'
        : overallRAG === 'red'
        ? 'Critical thresholds have been breached in one or more security domains. Prioritized intervention is required.'
        : 'Security posture has been evaluated for the reporting period.';

      const overallLbl = ragLabel(overallRAG);
      const badgeCls   = `rag-badge-${overallRAG || 'neutral'}`;

      ragHeroEl.innerHTML = `
        <div class="exec-card exec-card-status status-${overallRAG} exec-card-hero">
          <div class="exec-hero-header">
            <div class="exec-card-header">
              <span class="exec-card-icon" aria-hidden="true">&#9711;</span>
              <span class="exec-card-title">Overall RAG Status</span>
            </div>
            <div class="exec-rag-badge ${badgeCls}" role="status">&#9679; ${overallLbl}</div>
          </div>
          <p class="exec-card-body exec-hero-body">${overallText}</p>
        </div>
      `;
    }
  }

  // ===========================================================
  // SECTION 7: TIER 2 — CLIENT TARGET ACHIEVEMENT (Dynamic)
  // ===========================================================

  function getTargetMetrics(metricDefs, metricsData) {
    return metricDefs
      .filter(def => isTargetMetric(def))
      .map(def => ({ def, data: metricsData[def.id] || { computed: null, rag: null } }))
      .filter(item => item.data.computed !== null && item.data.computed !== undefined);
  }

  function renderTier2(portal) {
    const metricDefs    = Array.isArray(portal.metricDefinitions) ? portal.metricDefinitions : [];
    const metricsData   = portal.metrics || {};
    const sections      = Array.isArray(portal.sections) ? portal.sections : [];
    const targetMetrics = getTargetMetrics(metricDefs, metricsData);

    // Build section id → name lookup for sub-labels
    const sectionMap = {};
    sections.forEach(s => { sectionMap[s.id] = cleanText(s.name); });

    // ---- 2a. Animated summary cards ----
    const summaryEl = document.getElementById('target-summary-row');
    if (summaryEl) {
      let met = 0, warning = 0, notMet = 0;
      targetMetrics.forEach(({ data }) => {
        const rag = (data.rag || '').toLowerCase();
        if (rag === 'green')      met++;
        else if (rag === 'amber') warning++;
        else if (rag === 'red')   notMet++;
      });
      const metPct  = targetMetrics.length > 0 ? Math.round((met  / targetMetrics.length) * 100) : 0;
      summaryEl.innerHTML = `
        <div class="target-summary-card" role="status">
          <div class="tscard-count">${targetMetrics.length}</div>
          <div class="tscard-label">Total KPIs</div>
          <div class="tscard-sub">Contract-defined thresholds</div>
        </div>
        <div class="target-summary-card tscard-met" role="status">
          <div class="tscard-count tscard-green">${met}</div>
          <div class="tscard-label">Target Met</div>
          <div class="tscard-sub">${metPct}% success rate</div>
        </div>
        <div class="target-summary-card tscard-warning" role="status">
          <div class="tscard-count tscard-amber">${warning}</div>
          <div class="tscard-label">Warning</div>
          <div class="tscard-sub">Near threshold</div>
        </div>
        <div class="target-summary-card tscard-notmet" role="status">
          <div class="tscard-count tscard-red">${notMet}</div>
          <div class="tscard-label">Not Met</div>
          <div class="tscard-sub">Requires action</div>
        </div>
      `;
    }

    // ---- 2b. Interactive filter + search controls ----
    const controlsEl = document.getElementById('target-controls-bar');
    const chartEl    = document.getElementById('target-chart-container');

    if (!chartEl) return;

    if (targetMetrics.length === 0) {
      if (controlsEl) controlsEl.innerHTML = '';
      chartEl.innerHTML = '<p class="no-data-notice">No target-defined KPIs with computed values available for this reporting period.</p>';
    } else {
      let activeFilter = 'all';
      let searchQuery  = '';

      // Count per RAG for pill badges
      const counts = { green: 0, amber: 0, red: 0 };
      targetMetrics.forEach(({ data }) => {
        const r = (data.rag || '').toLowerCase();
        if (counts[r] !== undefined) counts[r]++;
      });

      if (controlsEl) {
        controlsEl.innerHTML = `
          <button class="target-filter-pill active" data-filter="all" aria-pressed="true">
            All <span style="opacity:0.65">${targetMetrics.length}</span>
          </button>
          <button class="target-filter-pill pill-met" data-filter="green" aria-pressed="false">
            &#9679; Met <span style="opacity:0.65">${counts.green}</span>
          </button>
          <button class="target-filter-pill pill-warning" data-filter="amber" aria-pressed="false">
            &#9679; Warning <span style="opacity:0.65">${counts.amber}</span>
          </button>
          <button class="target-filter-pill pill-notmet" data-filter="red" aria-pressed="false">
            &#9679; Not Met <span style="opacity:0.65">${counts.red}</span>
          </button>
          <div class="target-search-wrap">
            <svg class="target-search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="6.5" cy="6.5" r="4.5"/><path d="M10.5 10.5l3 3" stroke-linecap="round"/>
            </svg>
            <input class="target-search-input" id="target-kpi-search" type="search"
              placeholder="Search KPIs\u2026" autocomplete="off" spellcheck="false"
              aria-label="Search KPIs">
          </div>
        `;

        function refreshBulletList() {
          let filtered = targetMetrics;
          if (activeFilter !== 'all') {
            filtered = filtered.filter(({ data }) => (data.rag || '').toLowerCase() === activeFilter);
          }
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(({ def }) => cleanText(def.label).toLowerCase().includes(q));
          }
          buildBulletBarRows(chartEl, filtered, sectionMap);
        }

        // Filter pill logic
        controlsEl.querySelectorAll('.target-filter-pill').forEach(pill => {
          pill.addEventListener('click', () => {
            activeFilter = pill.getAttribute('data-filter');
            controlsEl.querySelectorAll('.target-filter-pill').forEach(p => {
              p.classList.toggle('active', p === pill);
              p.setAttribute('aria-pressed', String(p === pill));
            });
            refreshBulletList();
          });
        });

        // Search logic
        const searchInput = controlsEl.querySelector('#target-kpi-search');
        if (searchInput) {
          searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim();
            refreshBulletList();
          });
        }

        // Initial render
        refreshBulletList();
      } else {
        // Fallback: render all without controls
        buildBulletBarRows(chartEl, targetMetrics, sectionMap);
      }
    }

    // ---- 2c. Target KPI detail cards (scorecard grid) ----
    const cardsEl = document.getElementById('target-kpi-cards');
    if (cardsEl) {
      if (targetMetrics.length === 0) {
        cardsEl.innerHTML = '<p class="no-data-notice">No target-defined KPIs with computed values available for this reporting period.</p>';
        return;
      }
      cardsEl.innerHTML = targetMetrics.map(({ def, data }) => {
        const rag       = (data.rag || 'neutral').toLowerCase();
        const actual    = safeNum(data.computed);
        const target    = safeNum(def.target);
        const dir       = (def.direction || '').toLowerCase();
        const unit      = def.unit || '';
        const actualFmt = formatMetricValue(data.computed, unit);
        const targetFmt = target !== null ? `${target}${unit}` : '\u2014';
        const gapVal    = computeGap(actual, target, dir);
        const gapFmt    = formatGap(gapVal, unit);
        const gapCls    = gapVal === null ? '' : gapVal >= 0 ? 'gap-positive' : 'gap-negative';
        const dirLabel  = dir === 'higher' ? '\u2191 Higher is better' : dir === 'lower' ? '\u2193 Lower is better' : '';
        const badgeCls  = `rag-badge-${['green','amber','red'].includes(rag) ? rag : 'neutral'}`;

        // Mini gauge percentage
        let gaugePct = 0;
        if (actual !== null && target !== null && target !== 0) {
          if (dir === 'higher') gaugePct = Math.min(Math.round((actual / target) * 100), 100);
          else if (dir === 'lower') gaugePct = actual > 0 ? Math.min(Math.round((target / actual) * 100), 100) : 100;
        }
        const gaugeColor = rag === 'green' ? '#10b981' : rag === 'amber' ? '#f59e0b' : '#ef4444';
        const circumference = 2 * Math.PI * 22; // r=22
        const dashOffset = circumference * (1 - gaugePct / 100);

        return `<div class="target-kpi-card target-kpi-${rag}">
          <div class="tkpi-header">
            <div class="tkpi-name">${cleanText(def.label)}</div>
            <span class="tkpi-rag-badge ${badgeCls}">&#9679; ${ragLabel(rag)}</span>
          </div>
          <div class="tkpi-body">
            <div class="tkpi-actual-block" style="position:relative;display:flex;flex-direction:column;align-items:center">
              <svg width="60" height="60" viewBox="0 0 60 60" style="transform:rotate(-90deg)" aria-hidden="true">
                <circle cx="30" cy="30" r="22" fill="none" stroke="#f1f5f9" stroke-width="7"/>
                <circle cx="30" cy="30" r="22" fill="none" stroke="${gaugeColor}" stroke-width="7"
                  stroke-dasharray="${circumference.toFixed(2)}"
                  stroke-dashoffset="${dashOffset.toFixed(2)}"
                  stroke-linecap="round"
                  style="transition:stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)"/>
              </svg>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center">
                <div class="tkpi-actual-val" style="font-size:12px;line-height:1">${gaugePct}%</div>
              </div>
              <div class="tkpi-actual-sub" style="margin-top:4px">Achievement</div>
            </div>
            <div class="tkpi-meta">
              <div class="tkpi-target-row">
                <span class="tkpi-meta-label">Actual</span>
                <span class="tkpi-meta-val" style="font-weight:800">${actualFmt}</span>
              </div>
              <div class="tkpi-target-row">
                <span class="tkpi-meta-label">Target</span>
                <span class="tkpi-meta-val">${targetFmt}</span>
              </div>
              <div class="tkpi-gap-row">
                <span class="tkpi-meta-label">Gap</span>
                <span class="tkpi-meta-val ${gapCls}">${gapFmt}</span>
              </div>
              ${dirLabel ? `<div class="tkpi-dir-label">${dirLabel}</div>` : ''}
            </div>
          </div>
        </div>`;
      }).join('');
    }
  }

  // ===========================================================
  // SECTION 8: TIER 3 — TELEMETRY CATALOG (Interactive Collapsible Toggle)
  // ===========================================================

  function renderTier3(portal) {
    const sections    = Array.isArray(portal.sections)          ? portal.sections          : [];
    const metricDefs  = Array.isArray(portal.metricDefinitions) ? portal.metricDefinitions : [];
    const metricsData = portal.metrics || {};

    const container = document.getElementById('telemetry-catalog-container');
    if (!container) return;
    container.innerHTML = '';

    let domainCount = 0;
    let totalEvaluatedMetrics = 0;

    sections.forEach(section => {
      const secDefs = metricDefs.filter(d => d.section === section.id);
      if (secDefs.length === 0) return;
      if (!secDefs.some(d => { const e = metricsData[d.id]; return e && e.computed !== null && e.computed !== undefined; })) return;

      domainCount++;
      totalEvaluatedMetrics += secDefs.length;

      // Count RAG status per domain for quick pill preview
      let dG = 0, dA = 0, dR = 0;
      secDefs.forEach(def => {
        const e = metricsData[def.id];
        if (e && e.rag) {
          const r = (e.rag || '').toLowerCase();
          if (r === 'green') dG++;
          else if (r === 'amber') dA++;
          else if (r === 'red') dR++;
        }
      });

      let pillsHtml = '';
      if (dG > 0) pillsHtml += `<span class="telemetry-mini-pill pill-green">&#9679; ${dG} Met</span>`;
      if (dA > 0) pillsHtml += `<span class="telemetry-mini-pill pill-amber">&#9679; ${dA} Attention</span>`;
      if (dR > 0) pillsHtml += `<span class="telemetry-mini-pill pill-red">&#9679; ${dR} Critical</span>`;

      const block = document.createElement('div');
      block.className = 'telemetry-domain-block';
      block.id = 'telemetry-section-' + section.id;

      // Interactive Collapsible Toggle Header Button
      const headerBtn = document.createElement('button');
      headerBtn.type = 'button';
      headerBtn.className = 'telemetry-domain-header telemetry-domain-toggle';
      headerBtn.setAttribute('aria-expanded', 'true');
      headerBtn.setAttribute('aria-controls', 'telemetry-table-wrap-' + section.id);
      headerBtn.setAttribute('title', `Click to collapse or expand ${cleanText(section.name)} telemetry`);
      headerBtn.innerHTML = `
        <div class="telemetry-domain-header-left">
          <span class="telemetry-toggle-chevron" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
          <span class="telemetry-domain-name">${cleanText(section.name)}</span>
          <span class="telemetry-domain-count">${secDefs.length} metric${secDefs.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="telemetry-domain-header-right">
          <div class="telemetry-domain-rag-pills">${pillsHtml}</div>
          <span class="telemetry-toggle-hint">Click to toggle</span>
        </div>
      `;

      // Collapsible Table Wrapper
      const tableWrap = document.createElement('div');
      tableWrap.className = 'telemetry-table-wrapper';
      tableWrap.id = 'telemetry-table-wrap-' + section.id;

      const table = document.createElement('div');
      table.className = 'telemetry-table';

      const thead = document.createElement('div');
      thead.className = 'telemetry-row telemetry-row-header';
      thead.innerHTML = `
        <div class="tcol tcol-metric">Metric</div>
        <div class="tcol tcol-value">Current Value</div>
        <div class="tcol tcol-direction">Direction</div>
        <div class="tcol tcol-target">Target</div>
        <div class="tcol tcol-status">Status</div>
      `;
      table.appendChild(thead);

      secDefs.forEach(def => {
        const entry  = metricsData[def.id] || { computed: null, rag: null };
        const rag    = (entry.rag || '').toLowerCase();
        const dir    = (def.direction || '').toLowerCase();
        const unit   = def.unit || '';

        const valFmt = formatMetricValue(entry.computed, unit);
        const tgtFmt = (def.target !== null && def.target !== undefined && def.target !== '')
          ? `${def.target}${unit}` : '\u2014';
        const dirDisp = dir === 'higher' ? '\u2191 Higher' : dir === 'lower' ? '\u2193 Lower' : '\u2192 Trend';
        const ragCls  = rag ? `trag-${rag}` : 'trag-neutral';
        const ragLbl  = rag ? ragLabel(rag) : 'TREND';

        const row = document.createElement('div');
        row.className = 'telemetry-row telemetry-row-data';
        row.innerHTML = `
          <div class="tcol tcol-metric" data-label="Metric">
            <span class="tcol-metric-name">${cleanText(def.label)}</span>
            ${def.desc ? `<span class="tcol-metric-desc">${cleanText(def.desc)}</span>` : ''}
          </div>
          <div class="tcol tcol-value" data-label="Value">
            <span class="tcol-value-num">${valFmt}</span>
          </div>
          <div class="tcol tcol-direction" data-label="Direction">
            <span class="tcol-dir">${dirDisp}</span>
          </div>
          <div class="tcol tcol-target" data-label="Target">${tgtFmt}</div>
          <div class="tcol tcol-status" data-label="Status">
            <span class="telemetry-rag-pill ${ragCls}">${ragLbl}</span>
          </div>
        `;
        table.appendChild(row);
      });

      tableWrap.appendChild(table);

      // Toggle click handler
      headerBtn.addEventListener('click', () => {
        const isCollapsed = block.classList.toggle('is-collapsed');
        headerBtn.setAttribute('aria-expanded', String(!isCollapsed));
      });

      block.appendChild(headerBtn);
      block.appendChild(tableWrap);
      container.appendChild(block);
    });

    // Update Toolbar Stats
    const totalDomainEl = document.getElementById('telemetry-domain-total');
    const totalMetricEl = document.getElementById('telemetry-metric-total');
    if (totalDomainEl) totalDomainEl.textContent = `${domainCount} Security Domains`;
    if (totalMetricEl) totalMetricEl.textContent = `${totalEvaluatedMetrics} Evaluated Metrics`;

    // Wire Toolbar Expand All / Collapse All buttons
    const expandAllBtn = document.getElementById('telemetry-expand-all');
    const collapseAllBtn = document.getElementById('telemetry-collapse-all');
    if (expandAllBtn) {
      expandAllBtn.onclick = () => {
        container.querySelectorAll('.telemetry-domain-block').forEach(b => {
          b.classList.remove('is-collapsed');
          const hdr = b.querySelector('.telemetry-domain-toggle');
          if (hdr) hdr.setAttribute('aria-expanded', 'true');
        });
      };
    }
    if (collapseAllBtn) {
      collapseAllBtn.onclick = () => {
        container.querySelectorAll('.telemetry-domain-block').forEach(b => {
          b.classList.add('is-collapsed');
          const hdr = b.querySelector('.telemetry-domain-toggle');
          if (hdr) hdr.setAttribute('aria-expanded', 'false');
        });
      };
    }

    if (domainCount === 0) {
      container.innerHTML = '<p class="no-data-notice">No telemetry catalog metrics available for this period.</p>';
    }

    // ---- Render Executive Insights & Operational Next Steps (Below Telemetry Catalog) ----
    const narrativesEl = document.getElementById('exec-narratives-container') || document.getElementById('exec-summary-container');
    if (narrativesEl) {
      const narrative = portal.narrative || {};
      const topRisks      = cleanText(narrative.topRisks      || '').trim();
      const improvements  = cleanText(narrative.improvements  || '').trim();
      const plannedActions = cleanText(narrative.plannedActions || '').trim();

      narrativesEl.innerHTML = `
        <div class="exec-card">
          <div class="exec-card-header">
            <span class="exec-card-icon" aria-hidden="true">&#9888;</span>
            <span class="exec-card-title">Top Risks</span>
          </div>
          <p class="exec-card-body">${topRisks || '<span class="exec-empty">No active risks identified for this reporting period.</span>'}</p>
        </div>
        <div class="exec-card">
          <div class="exec-card-header">
            <span class="exec-card-icon" aria-hidden="true">&#8593;</span>
            <span class="exec-card-title">Key Improvements</span>
          </div>
          <p class="exec-card-body">${improvements || '<span class="exec-empty">No key improvements recorded for this reporting period.</span>'}</p>
        </div>
        <div class="exec-card">
          <div class="exec-card-header">
            <span class="exec-card-icon" aria-hidden="true">&#8594;</span>
            <span class="exec-card-title">Planned Actions Next Month</span>
          </div>
          <p class="exec-card-body">${plannedActions || '<span class="exec-empty">No planned actions recorded for this reporting period.</span>'}</p>
        </div>
      `;
    }
  }

  // ===========================================================
  // SECTION 9: MAIN PORTAL RENDERER
  // ===========================================================

  function renderPortal(portal) {
    if (!portal) return;

    const clientName     = cleanText(portal.clientName || 'Client');
    const monthFormatted = formatMonth(portal.month);

    document.title = `${clientName} — Monthly Security Report | ${monthFormatted}`;

    const elClient  = document.getElementById('client-name-display');
    const elMonth   = document.getElementById('report-month-display');
    const elFClient = document.getElementById('footer-client-name');
    const elFMonth  = document.getElementById('footer-month');
    const elExpiry  = document.getElementById('report-expiry-val');

    if (elClient)  elClient.textContent  = clientName;
    if (elMonth)   elMonth.textContent   = monthFormatted;
    if (elFClient) elFClient.textContent = clientName;
    if (elFMonth)  elFMonth.textContent  = monthFormatted;
    if (elExpiry)  elExpiry.textContent  = portal.expiresAt ? formatDate(portal.expiresAt) : 'Active';

    renderTier1(portal);
    renderTier2(portal);
    renderTier3(portal);

    const loadingEl = document.getElementById('loading-state');
    const errorEl   = document.getElementById('error-state');
    const portalEl  = document.getElementById('portal-app');
    if (loadingEl) { loadingEl.hidden = true; loadingEl.style.display = 'none'; }
    if (errorEl)   { errorEl.hidden   = true; errorEl.style.display   = 'none'; }
    if (portalEl)  { portalEl.hidden  = false; portalEl.style.display  = 'flex'; }
  }

  // ===========================================================
  // SECTION 10: TOKEN EXTRACTION, FETCH & INIT
  // ===========================================================

  function extractToken() {
    const match = window.location.pathname.match(/\/client\/([a-fA-F0-9_-]+)/);
    if (match && match[1]) return match[1].trim();
    const q = new URLSearchParams(window.location.search).get('token');
    return q ? q.trim() : null;
  }

  function showError(title, message) {
    const loadingEl = document.getElementById('loading-state');
    const errorEl   = document.getElementById('error-state');
    const portalEl  = document.getElementById('portal-app');
    if (loadingEl) { loadingEl.hidden = true; loadingEl.style.display = 'none'; }
    if (portalEl)  { portalEl.hidden  = true; portalEl.style.display  = 'none'; }
    if (errorEl) {
      const t = document.getElementById('error-title');
      const m = document.getElementById('error-message');
      if (t) t.textContent = title;
      if (m) m.innerHTML   = message;
      errorEl.hidden = false;
      errorEl.style.display = 'flex';
    }
  }

  async function fetchPortalReport() {
    const token = extractToken();
    if (!token) {
      showError('Report Unavailable', 'No valid share token was detected in the URL.<br>Please contact your MSS administrator for a valid report link.');
      return;
    }

    const ctrl    = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 12000);

    try {
      const res = await fetch(`/api/public/portal/${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: ctrl.signal,
      });
      clearTimeout(timeout);

      if (res.status === 401) {
        showError('Report Unavailable', 'This secure report link is invalid, expired, or has been revoked.<br>Please contact your MSS administrator for a new report link.');
        return;
      }
      if (!res.ok) {
        showError('Unable to Load Report', `The report could not be retrieved (Status ${res.status}).<br>Please try again or contact your MSS administrator.`);
        return;
      }

      const json = await res.json();
      if (!json || !json.success || !json.portal) {
        showError('Report Unavailable', 'The report payload is invalid or unavailable.<br>Please contact your MSS administrator.');
        return;
      }

      renderPortal(json.portal);

    } catch (err) {
      clearTimeout(timeout);
      const isTimeout = err.name === 'AbortError';
      showError('Unable to Load Report',
        isTimeout
          ? 'The report connection timed out.<br><button onclick="location.reload()" style="margin-top:12px;padding:8px 18px;background:#0f172a;color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px">Retry</button>'
          : 'A network error occurred.<br><button onclick="location.reload()" style="margin-top:12px;padding:8px 18px;background:#0f172a;color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px">Retry</button>'
      );
    }
  }

  function init() {
    const printBtn = document.getElementById('print-report-btn');
    if (printBtn) printBtn.addEventListener('click', () => window.print());
    fetchPortalReport();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
