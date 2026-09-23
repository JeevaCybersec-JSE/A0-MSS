/**
 * MSS Intelligence — Client Security Report (Phase 5)
 * Strict Read-Only Client Intelligence Portal
 *
 * Security Guarantee:
 * - Read-only public portal using URL token.
 * - Strictly calls GET /api/public/portal/:token.
 * - Zero browser persistence used.
 */

(function () {
  'use strict';

  // ---- Utility: Mojibake and Text Sanitization ----
  function cleanText(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/â€”/g, '—')
      .replace(/â€“/g, '–')
      .replace(/â€œ/g, '"')
      .replace(/â€/g, '"')
      .replace(/â€™/g, "'")
      .replace(/Â/g, '');
  }

  // ---- Utility: Format Month (e.g. 2026-09 -> September 2026) ----
  function formatMonth(monthStr) {
    if (!monthStr || !/^\d{4}-\d{2}$/.test(monthStr)) return cleanText(monthStr || '—');
    const [year, month] = monthStr.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  // ---- Utility: Format Date (e.g. ISO string -> 29 Sep 2026) ----
  function formatDate(isoStr) {
    if (!isoStr) return '—';
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return '—';
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return '—';
    }
  }

  // ---- Utility: Value Formatting ----
  function formatMetricValue(val, unit) {
    if (val === null || val === undefined || val === '' || !Number.isFinite(Number(val))) {
      return '—';
    }
    const num = Number(val);
    const formattedNum = Number.isInteger(num) ? num.toString() : num.toFixed(2);
    if (unit && unit.trim()) {
      return formattedNum + unit.trim();
    }
    return formattedNum;
  }

  // ---- Extract Token from URL ----
  function extractToken() {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/client\/([a-fA-F0-9_-]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
    // Fallback query parameter ?token=
    const params = new URLSearchParams(window.location.search);
    const queryToken = params.get('token');
    return queryToken ? queryToken.trim() : null;
  }

  // ---- Show Error Screen ----
  function showError(title, message) {
    const loading = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const portalApp = document.getElementById('portal-app');

    if (loading) {
      loading.hidden = true;
      loading.style.display = 'none';
    }
    if (portalApp) {
      portalApp.hidden = true;
      portalApp.style.display = 'none';
    }

    if (errorState) {
      const titleEl = document.getElementById('error-title');
      const msgEl = document.getElementById('error-message');
      if (titleEl) titleEl.textContent = title;
      if (msgEl) msgEl.innerHTML = message;
      errorState.hidden = false;
      errorState.style.display = 'flex';
    }
  }

  // ---- Render Portal Data ----
  function renderPortal(portal) {
    if (!portal) {
      showError('Report Unavailable', 'The requested report could not be loaded.<br>Please contact your MSS administrator.');
      return;
    }

    const clientName = cleanText(portal.clientName || 'A0 MSS Dashboard');
    const monthFormatted = formatMonth(portal.month);
    const overallRAG = (portal.overallRAG || 'neutral').toLowerCase();
    const summary = portal.summary || { total: 0, green: 0, amber: 0, red: 0 };
    const narrative = portal.narrative || {};
    const sections = Array.isArray(portal.sections) ? portal.sections : [];
    const metricDefs = Array.isArray(portal.metricDefinitions) ? portal.metricDefinitions : [];
    const metricsData = portal.metrics || {};

    // 1. Header Information
    const clientNameDisplay = document.getElementById('client-name-display');
    const reportMonthDisplay = document.getElementById('report-month-display');
    const footerClientName = document.getElementById('footer-client-name');
    const footerMonth = document.getElementById('footer-month');

    if (clientNameDisplay) clientNameDisplay.textContent = `Client: ${clientName}`;
    if (reportMonthDisplay) reportMonthDisplay.textContent = monthFormatted;
    if (footerClientName) footerClientName.textContent = clientName;
    if (footerMonth) footerMonth.textContent = monthFormatted;

    // 2. Section 1: Executive Overall Posture Banner
    const ragPill = document.getElementById('overall-rag-pill');
    const ragLabel = document.getElementById('overall-rag-label');
    const postureTitle = document.getElementById('overall-posture-title');
    const postureDesc = document.getElementById('overall-posture-desc');
    const expiryNotice = document.getElementById('report-expiry-val');

    if (ragPill && ragLabel) {
      ragPill.className = 'banner-rag-pill';
      if (overallRAG === 'green') {
        ragPill.classList.add('rag-green');
        ragLabel.textContent = 'GREEN — OPTIMAL';
      } else if (overallRAG === 'amber') {
        ragPill.classList.add('rag-amber');
        ragLabel.textContent = 'AMBER — ATTENTION';
      } else if (overallRAG === 'red') {
        ragPill.classList.add('rag-red');
        ragLabel.textContent = 'RED — ACTION REQUIRED';
      } else {
        ragLabel.textContent = 'MONITORED';
      }
    }

    if (postureTitle && postureDesc) {
      if (overallRAG === 'green') {
        postureTitle.textContent = 'Security posture is currently within target.';
        postureDesc.textContent = 'All evaluated telemetry benchmarks meet established operational criteria.';
      } else if (overallRAG === 'amber') {
        postureTitle.textContent = 'Security posture requires attention in highlighted areas.';
        postureDesc.textContent = 'Several operational metrics have reached warning thresholds requiring oversight.';
      } else if (overallRAG === 'red') {
        postureTitle.textContent = 'Security posture has critical thresholds requiring remediation.';
        postureDesc.textContent = 'Active variances detected in key security domains requiring prioritized intervention.';
      } else {
        postureTitle.textContent = 'Security posture evaluated for reporting period.';
        postureDesc.textContent = 'Continuous security operations telemetry active.';
      }
    }

    if (expiryNotice) {
      expiryNotice.textContent = portal.expiresAt ? formatDate(portal.expiresAt) : 'Active';
    }

    // 3. KPI Summary Counts
    const countTotal = document.getElementById('count-total');
    const countGreen = document.getElementById('count-green');
    const countAmber = document.getElementById('count-amber');
    const countRed = document.getElementById('count-red');

    if (countTotal) countTotal.textContent = summary.total !== undefined ? summary.total : '—';
    if (countGreen) countGreen.textContent = summary.green !== undefined ? summary.green : '—';
    if (countAmber) countAmber.textContent = summary.amber !== undefined ? summary.amber : '—';
    if (countRed)   countRed.textContent   = summary.red   !== undefined ? summary.red   : '—';

    // 4. Executive Narrative / Management Message
    const sectionNarrative = document.getElementById('section-narrative');
    const cardRisks = document.getElementById('card-narrative-risks');
    const textRisks = document.getElementById('text-narrative-risks');
    const cardImpr = document.getElementById('card-narrative-improvements');
    const textImpr = document.getElementById('text-narrative-improvements');
    const cardActs = document.getElementById('card-narrative-actions');
    const textActs = document.getElementById('text-narrative-actions');

    let hasNarrative = false;
    if (narrative.topRisks && cleanText(narrative.topRisks).trim()) {
      if (textRisks) textRisks.textContent = cleanText(narrative.topRisks);
      if (cardRisks) cardRisks.hidden = false;
      hasNarrative = true;
    }
    if (narrative.improvements && cleanText(narrative.improvements).trim()) {
      if (textImpr) textImpr.textContent = cleanText(narrative.improvements);
      if (cardImpr) cardImpr.hidden = false;
      hasNarrative = true;
    }
    if (narrative.plannedActions && cleanText(narrative.plannedActions).trim()) {
      if (textActs) textActs.textContent = cleanText(narrative.plannedActions);
      if (cardActs) cardActs.hidden = false;
      hasNarrative = true;
    }
    if (sectionNarrative) sectionNarrative.hidden = !hasNarrative;

    // 5. Section 5: Risk & Attention Items (Red and Amber)
    const riskContainer = document.getElementById('risk-attention-container');
    if (riskContainer) {
      riskContainer.innerHTML = '';
      const sectionNameMap = {};
      sections.forEach(s => { sectionNameMap[s.id] = cleanText(s.name); });

      const riskItems = [];
      metricDefs.forEach(def => {
        const data = metricsData[def.id];
        if (!data || !data.rag) return;
        const rag = data.rag.toLowerCase();
        if (rag === 'red' || rag === 'amber') {
          riskItems.push({ def, data, rag });
        }
      });

      // Sort red first, then amber
      riskItems.sort((a, b) => (a.rag === 'red' ? -1 : 1));

      if (riskItems.length === 0) {
        riskContainer.innerHTML = `
          <div class="risk-empty-state">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 6px;">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            No critical risks or attention items identified for this period. All evaluated metrics are within target.
          </div>
        `;
      } else {
        riskItems.forEach(item => {
          const card = document.createElement('div');
          card.className = `risk-item-card ${item.rag === 'red' ? 'risk-red' : 'risk-amber'}`;
          const currentFormatted = formatMetricValue(item.data.computed, item.def.unit);
          const targetFormatted = (item.def.target !== null && item.def.target !== undefined && item.def.target !== '')
            ? `${cleanText(item.def.target)}${item.def.unit || ''}`
            : '—';
          const secName = sectionNameMap[item.def.section] || cleanText(item.def.section);

          card.innerHTML = `
            <div class="risk-item-header">
              <div>
                <div class="risk-metric-title">${cleanText(item.def.label)}</div>
                <div class="risk-metric-section">${secName}</div>
              </div>
              <span class="status-badge ${item.rag === 'red' ? 'badge-red' : 'badge-amber'}">
                ${item.rag.toUpperCase()}
              </span>
            </div>
            <div class="risk-values-row">
              <div class="risk-val-block">
                <span class="risk-val-label">Current</span>
                <span class="risk-val-num">${currentFormatted}</span>
              </div>
              <div class="risk-val-block">
                <span class="risk-val-label">Target</span>
                <span class="risk-val-num">${targetFormatted}</span>
              </div>
            </div>
          `;
          riskContainer.appendChild(card);
        });
      }
    }

    // 6. Section 6: Distribution Breakdown
    const totalCount = Number(summary.total) || 0;
    const greenCount = Number(summary.green) || 0;
    const amberCount = Number(summary.amber) || 0;
    const redCount = Number(summary.red) || 0;

    const pctGreen = totalCount > 0 ? Math.round((greenCount / totalCount) * 100) : 0;
    const pctAmber = totalCount > 0 ? Math.round((amberCount / totalCount) * 100) : 0;
    const pctRed = totalCount > 0 ? Math.round((redCount / totalCount) * 100) : 0;

    const elPctGreen = document.getElementById('pct-green');
    const elPctAmber = document.getElementById('pct-amber');
    const elPctRed = document.getElementById('pct-red');
    const barGreen = document.getElementById('dist-bar-green');
    const barAmber = document.getElementById('dist-bar-amber');
    const barRed = document.getElementById('dist-bar-red');

    if (elPctGreen) elPctGreen.textContent = `${pctGreen}%`;
    if (elPctAmber) elPctAmber.textContent = `${pctAmber}%`;
    if (elPctRed)   elPctRed.textContent   = `${pctRed}%`;

    if (barGreen) barGreen.style.width = `${pctGreen}%`;
    if (barAmber) barAmber.style.width = `${pctAmber}%`;
    if (barRed)   barRed.style.width   = `${pctRed}%`;

    // Section Health Breakdown Pills
    const sectionHealthContainer = document.getElementById('section-health-breakdown');
    if (sectionHealthContainer) {
      sectionHealthContainer.innerHTML = '';
      sections.forEach(sec => {
        const secDefs = metricDefs.filter(m => m.section === sec.id);
        let secTotal = 0, secGreen = 0;
        secDefs.forEach(d => {
          const data = metricsData[d.id];
          if (data && data.rag) {
            secTotal++;
            if (data.rag.toLowerCase() === 'green') secGreen++;
          }
        });
        if (secTotal > 0) {
          const pill = document.createElement('div');
          pill.className = 'section-health-pill';
          pill.innerHTML = `
            <span>${cleanText(sec.name)}:</span>
            <strong>${secGreen}/${secTotal} Green</strong>
          `;
          sectionHealthContainer.appendChild(pill);
        }
      });
    }

    // 7. Section 2: Key Metrics Grouped by Operational Section
    const sectionsContainer = document.getElementById('metrics-sections-container');
    if (sectionsContainer) {
      sectionsContainer.innerHTML = '';

      sections.forEach(section => {
        const secDefs = metricDefs.filter(m => m.section === section.id);
        if (secDefs.length === 0) return;

        const block = document.createElement('div');
        block.className = 'section-block';

        const blockHeader = document.createElement('div');
        blockHeader.className = 'section-block-header';
        blockHeader.innerHTML = `
          <div class="section-block-title">
            <span>${cleanText(section.name)}</span>
          </div>
          <span class="section-block-count">${secDefs.length} metrics</span>
        `;
        block.appendChild(blockHeader);

        const grid = document.createElement('div');
        grid.className = 'metrics-table-grid';

        secDefs.forEach(def => {
          const data = metricsData[def.id] || { computed: null, rag: null };
          const cell = document.createElement('div');
          cell.className = 'metric-cell-card';

          const rag = (data.rag || 'neutral').toLowerCase();
          let badgeHtml = '';
          if (rag === 'green') {
            badgeHtml = '<span class="status-badge badge-green">GREEN</span>';
          } else if (rag === 'amber') {
            badgeHtml = '<span class="status-badge badge-amber">AMBER</span>';
          } else if (rag === 'red') {
            badgeHtml = '<span class="status-badge badge-red">RED</span>';
          } else {
            badgeHtml = '<span class="status-badge badge-neutral">TREND</span>';
          }

          const actualFormatted = formatMetricValue(data.computed, def.unit);
          const targetFormatted = (def.target !== null && def.target !== undefined && def.target !== '')
            ? `Target: ${cleanText(def.target)}${def.unit || ''}`
            : 'Target: —';

          cell.innerHTML = `
            <div class="metric-cell-top">
              <span class="metric-cell-label">${cleanText(def.label)}</span>
              ${badgeHtml}
            </div>
            <div class="metric-cell-body">
              <span class="metric-cell-actual">${actualFormatted}</span>
              <span class="metric-cell-target">${targetFormatted}</span>
            </div>
            ${def.desc ? `<div class="metric-cell-desc">${cleanText(def.desc)}</div>` : ''}
          `;
          grid.appendChild(cell);
        });

        block.appendChild(grid);
        sectionsContainer.appendChild(block);
      });
    }

    // 8. Reveal Portal App
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const portalApp = document.getElementById('portal-app');
    if (loadingState) {
      loadingState.hidden = true;
      loadingState.style.display = 'none';
    }
    if (errorState) {
      errorState.hidden = true;
      errorState.style.display = 'none';
    }
    if (portalApp) {
      portalApp.hidden = false;
      portalApp.style.display = 'flex';
    }
  }

  // ---- Fetch Portal Report ----
  async function fetchPortalReport() {
    const token = extractToken();
    if (!token) {
      showError(
        'Report Unavailable',
        'No valid share token was detected in the URL link.<br>Please contact your MSS administrator for a valid report link.'
      );
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(`/api/public/portal/${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.status === 401) {
        showError(
          'Report Unavailable',
          'This secure report link is invalid, expired, or has been revoked.<br>Please contact your MSS administrator for a new report link.'
        );
        return;
      }

      if (!response.ok) {
        showError(
          'Unable to Load Report',
          `The security intelligence report could not be retrieved at this time (Status ${response.status}).<br>Please try again later or contact your MSS administrator.`
        );
        return;
      }

      const data = await response.json();
      if (!data || !data.success || !data.portal) {
        showError(
          'Report Unavailable',
          'The report payload is invalid or unavailable.<br>Please contact your MSS administrator.'
        );
        return;
      }

      renderPortal(data.portal);
    } catch (err) {
      clearTimeout(timeoutId);
      const isTimeout = err.name === 'AbortError';
      showError(
        'Unable to Load Report',
        isTimeout
          ? 'The report connection timed out.<br><button type="button" class="btn btn-primary" onclick="window.location.reload()" style="margin-top:14px;padding:8px 16px;cursor:pointer;border-radius:6px;background:#2563eb;color:#fff;border:none;font-weight:600;">Retry Now</button>'
          : 'A network error occurred while connecting to the MSS Intelligence service.<br><button type="button" class="btn btn-primary" onclick="window.location.reload()" style="margin-top:14px;padding:8px 16px;cursor:pointer;border-radius:6px;background:#2563eb;color:#fff;border:none;font-weight:600;">Retry</button>'
      );
    }
  }

  // ---- Setup Print Handler ----
  function setupPrintHandler() {
    const printBtn = document.getElementById('print-report-btn');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }
  }

  // ---- Initialization ----
  function init() {
    setupPrintHandler();
    fetchPortalReport();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
