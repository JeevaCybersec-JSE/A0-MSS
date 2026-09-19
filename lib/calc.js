// ============================================================
// MSS KPI Dashboard — Calculation Engine
// Every formula and every RAG (Red/Amber/Green) rule described
// in the spec lives here, server-side. The frontend never
// calculates anything — it only sends raw inputs and displays
// what this engine returns.
// ============================================================

const { METRICS } = require('./metrics');

const metricById = {};
METRICS.forEach(m => { metricById[m.id] = m; });

function round2(n) {
  return Math.round(n * 100) / 100;
}

// ---- Step 1: turn raw inputs into a computed numeric value based on Definition ----
function computeValue(metric, inputs, monthMetrics) {
  if (!metric) return null;
  inputs = inputs || {};

  switch (metric.mode) {
    case 'direct': {
      const raw = inputs.value !== undefined && inputs.value !== null && inputs.value !== ''
        ? inputs.value
        : (inputs.count !== undefined && inputs.count !== null && inputs.count !== ''
          ? inputs.count
          : (inputs.num !== undefined && inputs.num !== null && inputs.num !== ''
            ? inputs.num
            : inputs[metric.id]));
      if (raw === undefined || raw === null || raw === '') return null;
      const v = Number(raw);
      return Number.isFinite(v) ? v : null;
    }

    case 'dual': {
      // dual mode: supports "VPN only" vs "MDM Only"
      const choice = inputs.choice || (inputs.b !== undefined && inputs.b !== null && inputs.b !== '' && Number(inputs.b) > 0 ? 'mdm_only' : 'vpn_only');
      const rawA = inputs.a !== undefined && inputs.a !== null ? inputs.a : inputs.value;
      const a = Number(rawA);
      const b = Number(inputs.b);
      const aOk = Number.isFinite(a);
      const bOk = Number.isFinite(b);

      if (choice === 'mdm_only') {
        return bOk ? b : null;
      }
      // vpn_only (default)
      return aOk ? a : null;
    }

    case 'ratio': {
      // Actual is calculated from the Definition / data source:
      // (numerator / denominator) * 100
      let num = null;
      let den = null;

      // 1. Direct num/den fields
      if (inputs.num !== undefined && inputs.num !== null && inputs.num !== '') {
        num = Number(inputs.num);
      }
      if (inputs.den !== undefined && inputs.den !== null && inputs.den !== '') {
        den = Number(inputs.den);
      }

      // 2. Definition-based named aliases if num was not directly supplied
      if (num === null || !Number.isFinite(num)) {
        if (metric.id === 'endpoint_protection_coverage_pct') {
          const raw = inputs.healthy ?? inputs.healthy_protection_endpoints ?? inputs.endpoints_with_healthy_protection_agent ?? inputs.healthy_endpoints;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'patch_compliance_pct') {
          const raw = inputs.patched ?? inputs.fully_patched ?? inputs.endpoints_fully_patched_to_policy;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'devices_not_reporting_pct') {
          const raw = inputs.devices_not_reporting ?? (monthMetrics && monthMetrics['devices_not_reporting']?.computed);
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'devices_outdated_protection_pct') {
          const raw = inputs.outdated ?? inputs.devices_outdated_protection ?? (monthMetrics && monthMetrics['devices_outdated_protection']?.computed);
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'mfa_coverage_pct') {
          const raw = inputs.mfa_enforced ?? inputs.enabled_users_with_mfa_enforced;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'first_time_fix_pct') {
          const raw = inputs.first_contact ?? inputs.tickets_resolved_at_first_contact;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'p1_response_sla_pct') {
          const raw = inputs.p1_responded ?? inputs.responded_within_sla;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'p2_response_sla_pct') {
          const raw = inputs.p2_responded ?? inputs.responded_within_sla;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'resolution_sla_pct') {
          const raw = inputs.resolved_within_sla ?? inputs.tickets_resolved_within_sla;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'training_completion_pct') {
          const raw = inputs.completed ?? inputs.users_completing_assigned_training ?? inputs.users_completing_training;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        } else if (metric.id === 'backup_success_rate_pct') {
          const raw = inputs.successful ?? inputs.successful_jobs ?? inputs.successful_backup_jobs;
          if (raw !== undefined && raw !== null && raw !== '') num = Number(raw);
        }
      }

      // 3. Definition-based named aliases if den was not directly supplied
      if (den === null || !Number.isFinite(den)) {
        if (metric.id === 'endpoint_protection_coverage_pct' || metric.id === 'patch_compliance_pct' || metric.id === 'devices_not_reporting_pct' || metric.id === 'devices_outdated_protection_pct') {
          const raw = inputs.managed ?? inputs.managed_endpoints ?? (monthMetrics && monthMetrics['managed_endpoints']?.computed);
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        } else if (metric.id === 'mfa_coverage_pct') {
          const raw = inputs.total_users ?? inputs.total_enabled_users ?? inputs.enabled_users;
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        } else if (metric.id === 'first_time_fix_pct') {
          const raw = inputs.tickets_closed ?? inputs.closed_tickets ?? inputs.total_closed ?? (monthMetrics && monthMetrics['incidents_resolved']?.computed);
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        } else if (metric.id === 'p1_response_sla_pct') {
          const raw = inputs.total_p1 ?? inputs.p1_tickets ?? inputs.total;
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        } else if (metric.id === 'p2_response_sla_pct') {
          const raw = inputs.total_p2 ?? inputs.p2_tickets ?? inputs.total;
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        } else if (metric.id === 'resolution_sla_pct') {
          const raw = inputs.tickets_closed ?? inputs.applicable_closed_tickets ?? (monthMetrics && monthMetrics['incidents_resolved']?.computed);
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        } else if (metric.id === 'training_completion_pct') {
          const raw = inputs.assigned ?? inputs.users_assigned;
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        } else if (metric.id === 'backup_success_rate_pct') {
          const raw = inputs.total ?? inputs.total_scheduled_jobs ?? inputs.scheduled_jobs;
          if (raw !== undefined && raw !== null && raw !== '') den = Number(raw);
        }
      }

      // Safe division: denominator must be a finite number > 0. Never return NaN or Infinity.
      if (!Number.isFinite(num) || !Number.isFinite(den) || den <= 0) return null;
      return round2((num / den) * 100);
    }

    case 'avg': {
      const total = Number(inputs.total);
      const count = Number(inputs.count);
      if (!Number.isFinite(total) || !Number.isFinite(count) || count <= 0) return null;
      return round2(total / count);
    }

    case 'derived': {
      // ----------------------------------------
      // Patch deployment success rate %
      // Definition: "Successful / (successful + failed) deployments"
      // Formula: successful deployments / (successful deployments + failed deployments) * 100
      // ----------------------------------------
      if (metric.id === 'patch_deployment_success_rate_pct') {
        let successful = null;
        let failed = null;

        if (inputs.successful !== undefined && inputs.successful !== null && inputs.successful !== '') {
          successful = Number(inputs.successful);
        } else if (inputs.num !== undefined && inputs.num !== null && inputs.num !== '') {
          successful = Number(inputs.num);
        } else if (monthMetrics && monthMetrics['successful_patch_deployments']) {
          successful = monthMetrics['successful_patch_deployments'].computed;
        }

        if (inputs.failed !== undefined && inputs.failed !== null && inputs.failed !== '') {
          failed = Number(inputs.failed);
        } else if (inputs.den !== undefined && inputs.den !== null && inputs.den !== '') {
          // If den was directly provided as total (successful + failed)
          const den = Number(inputs.den);
          if (Number.isFinite(successful) && Number.isFinite(den) && den > 0) {
            return round2((successful / den) * 100);
          }
        } else if (monthMetrics && monthMetrics['failed_patch_deployments']) {
          failed = monthMetrics['failed_patch_deployments'].computed;
        }

        if (successful == null || failed == null || !Number.isFinite(Number(successful)) || !Number.isFinite(Number(failed))) {
          return null;
        }
        const total = Number(successful) + Number(failed);
        if (total <= 0) return null;
        return round2((Number(successful) / total) * 100);
      }

      // ----------------------------------------
      // Recommendations completion %
      // Definition: "Recommendations completed / raised"
      // Formula: (recommendations completed / recommendations raised) * 100
      // ----------------------------------------
      if (metric.id === 'recommendations_completion_pct') {
        let completed = null;
        let raised = null;

        if (inputs.completed !== undefined && inputs.completed !== null && inputs.completed !== '') {
          completed = Number(inputs.completed);
        } else if (inputs.num !== undefined && inputs.num !== null && inputs.num !== '') {
          completed = Number(inputs.num);
        } else if (monthMetrics && monthMetrics['recommendations_completed']) {
          completed = monthMetrics['recommendations_completed'].computed;
        }

        if (inputs.raised !== undefined && inputs.raised !== null && inputs.raised !== '') {
          raised = Number(inputs.raised);
        } else if (inputs.den !== undefined && inputs.den !== null && inputs.den !== '') {
          raised = Number(inputs.den);
        } else if (monthMetrics && monthMetrics['security_recommendations_raised']) {
          raised = monthMetrics['security_recommendations_raised'].computed;
        }

        if (completed == null || raised == null || !Number.isFinite(Number(completed)) || !Number.isFinite(Number(raised)) || Number(raised) <= 0) {
          return null;
        }
        return round2((Number(completed) / Number(raised)) * 100);
      }

      // Fallback for any other derived metric based on deriveFrom array
      if (Array.isArray(metric.deriveFrom) && metric.deriveFrom.length >= 2) {
        const [aId, bId] = metric.deriveFrom;
        const a = monthMetrics && monthMetrics[aId] ? monthMetrics[aId].computed : null;
        const b = monthMetrics && monthMetrics[bId] ? monthMetrics[bId].computed : null;
        if (a == null || b == null || !Number.isFinite(Number(a)) || !Number.isFinite(Number(b)) || Number(b) <= 0) return null;
        return round2((Number(a) / Number(b)) * 100);
      }

      return null;
    }

    default:
      return null;
  }
}

// ---- Step 2: turn a computed value into a RAG status ----
function computeRAG(metric, value, prevValue) {
  if (!metric) return null;
  const dir = (metric.direction || '').toLowerCase();

  // 1. Trend metrics: Direction = "trend" have no RAG status.
  if (dir === 'trend') return null;

  // 2. Missing/empty value: no RAG status.
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return null;

  const numVal = Number(value);

  // 3. Rule: prevMonth (Judged against previous month)
  if (metric.ragRule === 'prevMonth') {
    if (prevValue === null || prevValue === undefined || !Number.isFinite(Number(prevValue))) return 'amber'; // no baseline yet
    const prev = Number(prevValue);
    if (numVal <= prev) return 'green';
    if (numVal <= prev * 1.1) return 'amber';
    return 'red';
  }

  // 4. Rule: binary0 (Zero is green, non-zero is red or amber)
  if (metric.ragRule === 'binary0') {
    if (numVal === 0) return 'green';
    return metric.amberNotRed ? 'amber' : 'red';
  }

  // 5. Target threshold interpretation:
  // Target is "-" or blank or null/undefined -> no target threshold, do not force artificial RAG.
  if (metric.target === null || metric.target === undefined || metric.target === '' || metric.target === '-') {
    return null;
  }

  let targetNum;
  if (typeof metric.target === 'number') {
    targetNum = metric.target;
  } else {
    const cleaned = String(metric.target).replace('%', '').trim();
    if (cleaned === '' || cleaned === '-') return null;
    targetNum = parseFloat(cleaned);
  }

  if (!Number.isFinite(targetNum)) return null;

  // 6. Direction must control the comparison:
  if (dir === 'higher') {
    if (numVal >= targetNum) return 'green';
    // Preserve existing metric-specific amber rule if defined
    if (metric.amber !== undefined && metric.amber !== null) {
      if (numVal >= Number(metric.amber)) return 'amber';
      return 'red';
    }
    // Existing fallback behavior: within 10% of target is amber, else red
    if (numVal >= targetNum * 0.9) return 'amber';
    return 'red';
  }

  if (dir === 'lower') {
    if (numVal <= targetNum) return 'green';
    // Preserve existing metric-specific amber rule if defined
    if (metric.amber !== undefined && metric.amber !== null) {
      if (numVal <= Number(metric.amber)) return 'amber';
      return 'red';
    }
    // Existing fallback behavior: within 10% of target is amber, else red
    if (numVal <= targetNum * 1.1) return 'amber';
    return 'red';
  }

  return null;
}

// ---- Step 3: compute an entire month's metrics in dependency order ----
// direct/ratio/avg metrics first, then derived metrics (which depend on them)
function computeMonth(rawInputsByMetric, prevMonthComputed) {
  const result = {};
  const order = [...METRICS].sort((a, b) => (a.mode === 'derived' ? 1 : 0) - (b.mode === 'derived' ? 1 : 0));

  order.forEach(metric => {
    const inputs = (rawInputsByMetric && rawInputsByMetric[metric.id] && rawInputsByMetric[metric.id].inputs) || {};
    const computed = computeValue(metric, inputs, result);
    const prevValue = prevMonthComputed && prevMonthComputed[metric.id] ? prevMonthComputed[metric.id].computed : null;
    const rag = computeRAG(metric, computed, prevValue);
    result[metric.id] = { inputs, computed, rag };
  });

  return result;
}

// ---- Step 4: roll everything up into an overall RAG status ----
// Worst-case rule: any RED metric -> overall RED; else any AMBER -> AMBER; else GREEN
function computeOverallRAG(monthMetrics) {
  let hasRed = false, hasAmber = false, hasAny = false;
  METRICS.forEach(metric => {
    const entry = monthMetrics[metric.id];
    if (!entry || entry.rag === null || entry.rag === undefined) return;
    hasAny = true;
    if (entry.rag === 'red') hasRed = true;
    if (entry.rag === 'amber') hasAmber = true;
  });
  if (!hasAny) return null;
  if (hasRed) return 'red';
  if (hasAmber) return 'amber';
  return 'green';
}

module.exports = { computeValue, computeRAG, computeMonth, computeOverallRAG, round2, metricById };
