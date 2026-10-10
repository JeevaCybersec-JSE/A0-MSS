// ============================================================
// MSS KPI Dashboard — Calculation Engine
// Single source of truth for all metric calculations, RAG logic,
// 8-metric Veto layer, 17-metric Weighted Vote, and YTD aggregation.
// ============================================================

const { METRICS } = require('./metrics');

const metricById = {};
METRICS.forEach(m => { metricById[m.id] = m; });

function round2(n) {
  if (n === null || n === undefined || !Number.isFinite(Number(n))) return null;
  return Math.round(Number(n) * 100) / 100;
}

// ------------------------------------------------------------
// 8 VETO METRICS (Target = 0, lower is better)
// If ANY has computed value > 0 in a month, overall status = RED
// ------------------------------------------------------------
const VETO_METRICS = [
  'critical_patches_outstanding',
  'ransomware_detections',
  'p1_security_incidents',
  'critical_vulns_open',
  'open_gt30_sla',
  'open_gt60_sla',
  'open_gt90_sla',
  'policy_exceptions_open',
];

// ------------------------------------------------------------
// 17 WEIGHTED THRESHOLD METRICS & DEFAULT WEIGHTS
// Total weight when all 17 are scored = 22.5
// ------------------------------------------------------------
const DEFAULT_WEIGHTS = {
  devices_not_reporting_pct: 1.0,          // Medium
  endpoint_protection_coverage_pct: 2.0,   // High
  patch_compliance_pct: 2.0,               // High
  high_patches_outstanding: 1.0,           // Medium
  patch_deployment_success_rate_pct: 0.5,  // Low
  avg_days_to_critical_patch: 1.0,         // Medium
  devices_outdated_protection_pct: 2.0,    // High
  mttd_hours: 2.0,                         // High
  mttr_hours: 1.0,                         // Medium
  high_vulns_open: 1.0,                    // Medium
  mttr_critical_days: 2.0,                 // High
  mfa_coverage_pct: 2.0,                   // High
  first_time_fix_pct: 0.5,                 // Low
  p1_response_sla_pct: 2.0,                // High
  p2_response_sla_pct: 1.0,                // Medium
  resolution_sla_pct: 1.0,                 // Medium
  recommendations_completion_pct: 0.5,     // Low
};

// ------------------------------------------------------------
// YTD AGGREGATION RULES
// ------------------------------------------------------------
const YTD_SUM_METRICS = [
  'new_endpoints',
  'removed_endpoints',
  'failed_patch_deployments',
  'successful_patch_deployments',
  'threats_blocked',
  'malware_detections',
  'ransomware_detections',
  'policy_violations',
  'security_incidents_raised',
  'p1_security_incidents',
  'vulns_remediated',
  'risky_sign_ins',
  'user_reported_phishing',
  'support_requests',
  'incidents_resolved',
  'reopened_incidents',
  'onboarding_completed',
  'offboarding_completed',
  'iso_evidence_completed',
  'config_changes',
  'security_recommendations_raised',
  'recommendations_completed',
];

const YTD_AVG_METRICS = [
  'devices_not_reporting_pct',
  'endpoint_protection_coverage_pct',
  'patch_compliance_pct',
  'patch_deployment_success_rate_pct',
  'avg_days_to_critical_patch',
  'devices_outdated_protection_pct',
  'mttd_hours',
  'mttr_hours',
  'mttr_critical_days',
  'mfa_coverage_pct',
  'first_time_fix_pct',
  'p1_response_sla_pct',
  'p2_response_sla_pct',
  'resolution_sla_pct',
  'recommendations_completion_pct',
];

const YTD_LATEST_METRICS = [
  'managed_endpoints',
  'mobile_devices',
  'devices_not_reporting',
  'critical_patches_outstanding',
  'high_patches_outstanding',
  'devices_outdated_protection',
  'critical_vulns_open',
  'high_vulns_open',
  'medium_vulns_open',
  'open_gt30_sla',
  'open_gt60_sla',
  'open_gt90_sla',
  'open_ticket_backlog',
  'policy_exceptions_open',
];

// ---- Step 1: turn raw inputs into a computed numeric value ----
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

      if (choice === 'mdm_only') return bOk ? b : null;
      return aOk ? a : null;
    }

    case 'four_layer':
    case 'ratio': {
      // ----------------------------------------------------
      // Endpoint protection coverage %
      // MIN of 4 layers: Sophos, ManageEngine, VPN, MFA
      // each divided by managed endpoints.
      // Only calculates when ALL 4 are filled and managed > 0.
      // Backward compatibility: if only old single numerator exists, compute it.
      // ----------------------------------------------------
      if (metric.id === 'endpoint_protection_coverage_pct') {
        const hasSophos = inputs.sophos !== undefined && inputs.sophos !== null && inputs.sophos !== '';
        const hasME     = inputs.manageengine !== undefined && inputs.manageengine !== null && inputs.manageengine !== '';
        const hasVPN    = inputs.vpn !== undefined && inputs.vpn !== null && inputs.vpn !== '';
        const hasMFA    = inputs.mfa !== undefined && inputs.mfa !== null && inputs.mfa !== '';

        let den = null;
        if (inputs.den !== undefined && inputs.den !== null && inputs.den !== '') den = Number(inputs.den);
        else if (inputs.managed !== undefined && inputs.managed !== null && inputs.managed !== '') den = Number(inputs.managed);
        else if (monthMetrics && monthMetrics['managed_endpoints'] && Number.isFinite(Number(monthMetrics['managed_endpoints'].computed))) {
          den = Number(monthMetrics['managed_endpoints'].computed);
        }

        if (hasSophos && hasME && hasVPN && hasMFA) {
          const s = Number(inputs.sophos);
          const me = Number(inputs.manageengine);
          const v = Number(inputs.vpn);
          const m = Number(inputs.mfa);
          const d = Number(den);

          if ([s, me, v, m, d].every(Number.isFinite) && d > 0) {
            const minCoverage = Math.min(s / d, me / d, v / d, m / d);
            return round2(minCoverage * 100);
          }
          return null;
        }

        // Backward compatibility: old single numerator
        let singleNum = null;
        if (inputs.num !== undefined && inputs.num !== null && inputs.num !== '') singleNum = Number(inputs.num);
        else if (inputs.healthy !== undefined && inputs.healthy !== null && inputs.healthy !== '') singleNum = Number(inputs.healthy);
        else if (inputs.healthy_endpoints !== undefined && inputs.healthy_endpoints !== null && inputs.healthy_endpoints !== '') singleNum = Number(inputs.healthy_endpoints);

        if (Number.isFinite(singleNum) && Number.isFinite(den) && den > 0) {
          return round2((singleNum / den) * 100);
        }
        return null;
      }

      // Standard ratio metrics: (num / den) * 100
      let num = null;
      let den = null;

      if (inputs.num !== undefined && inputs.num !== null && inputs.num !== '') {
        num = Number(inputs.num);
      }
      if (inputs.den !== undefined && inputs.den !== null && inputs.den !== '') {
        den = Number(inputs.den);
      }

      if (num === null || !Number.isFinite(num)) {
        if (metric.id === 'patch_compliance_pct') {
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
        }
      }

      if (den === null || !Number.isFinite(den)) {
        if (metric.id === 'patch_compliance_pct' || metric.id === 'devices_not_reporting_pct' || metric.id === 'devices_outdated_protection_pct') {
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
        }
      }

      if (!Number.isFinite(num) || !Number.isFinite(den) || den <= 0) return null;
      return round2((num / den) * 100);
    }

    case 'avg': {
      if (inputs.total === undefined || inputs.total === null || inputs.total === '') return null;
      if (inputs.count === undefined || inputs.count === null || inputs.count === '') return null;
      const total = Number(inputs.total);
      const count = Number(inputs.count);
      if (!Number.isFinite(total) || !Number.isFinite(count) || count <= 0) return null;
      return round2(total / count);
    }

    case 'derived': {
      if (metric.id === 'patch_deployment_success_rate_pct') {
        let successful = null;
        let failed = null;

        if (monthMetrics && (monthMetrics['successful_patch_deployments'] || monthMetrics['failed_patch_deployments'])) {
          const sObj = monthMetrics['successful_patch_deployments'];
          const fObj = monthMetrics['failed_patch_deployments'];
          if (sObj && typeof sObj.computed === 'number') successful = sObj.computed;
          if (fObj && typeof fObj.computed === 'number') failed = fObj.computed;
        } else if (inputs) {
          if (inputs.successful !== undefined && inputs.successful !== null && inputs.successful !== '') {
            successful = Number(inputs.successful);
          } else if (inputs.num !== undefined && inputs.num !== null && inputs.num !== '') {
            successful = Number(inputs.num);
          }

          if (inputs.failed !== undefined && inputs.failed !== null && inputs.failed !== '') {
            failed = Number(inputs.failed);
          } else if (inputs.den !== undefined && inputs.den !== null && inputs.den !== '') {
            const den = Number(inputs.den);
            if (Number.isFinite(successful) && Number.isFinite(den) && den > 0) {
              return round2((successful / den) * 100);
            }
          }
        }

        if (successful === null || failed === null || !Number.isFinite(Number(successful)) || !Number.isFinite(Number(failed))) {
          return null;
        }
        const total = Number(successful) + Number(failed);
        if (total <= 0) return null;
        return round2((Number(successful) / total) * 100);
      }

      if (metric.id === 'recommendations_completion_pct') {
        let completed = null;
        let raised = null;

        if (monthMetrics && monthMetrics['recommendations_completed'] && typeof monthMetrics['recommendations_completed'].computed === 'number') {
          completed = monthMetrics['recommendations_completed'].computed;
        } else if (inputs.completed !== undefined && inputs.completed !== null && inputs.completed !== '') {
          completed = Number(inputs.completed);
        } else if (inputs.num !== undefined && inputs.num !== null && inputs.num !== '') {
          completed = Number(inputs.num);
        }

        if (monthMetrics && monthMetrics['security_recommendations_raised'] && typeof monthMetrics['security_recommendations_raised'].computed === 'number') {
          raised = monthMetrics['security_recommendations_raised'].computed;
        } else if (inputs.raised !== undefined && inputs.raised !== null && inputs.raised !== '') {
          raised = Number(inputs.raised);
        } else if (inputs.den !== undefined && inputs.den !== null && inputs.den !== '') {
          raised = Number(inputs.den);
        }

        if (completed == null || raised == null || !Number.isFinite(Number(completed)) || !Number.isFinite(Number(raised)) || Number(raised) <= 0) {
          return null;
        }
        return round2((Number(completed) / Number(raised)) * 100);
      }

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
// Exact methodology:
// - Direction = 'trend': no score (returns null)
// - Missing/empty/non-finite value: no score (returns null)
// - Target is null/undefined/''/'-': no score (returns null)
// - Target = 0 (veto metrics): value > 0 -> Red, value = 0 -> Green. No Amber!
// - Higher is better: value >= target -> Green; value >= target*0.9 -> Amber; else Red.
// - Lower is better: value <= target -> Green; value <= target*1.1 -> Amber; else Red.
function computeRAG(metric, value, prevValue) {
  if (!metric) return null;
  const dir = (metric.direction || '').toLowerCase();

  // 1. Trend metrics: Direction = "trend" never get a score
  if (dir === 'trend') return null;

  // 2. Missing/empty value: no RAG status
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return null;

  // 3. No target: info-only, no score
  if (metric.target === null || metric.target === undefined || metric.target === '' || metric.target === '-') {
    return null;
  }

  const numVal = Number(value);

  let targetNum;
  if (typeof metric.target === 'number') {
    targetNum = metric.target;
  } else {
    const cleaned = String(metric.target).replace('%', '').trim();
    if (cleaned === '' || cleaned === '-') return null;
    targetNum = parseFloat(cleaned);
  }

  if (!Number.isFinite(targetNum)) return null;

  // 4. Target = 0 (veto metrics): value > 0 -> Red, value = 0 -> Green. No Amber.
  if (targetNum === 0 && dir === 'lower') {
    return numVal > 0 ? 'red' : 'green';
  }

  // 5. Higher is better: deviation = (target - actual) / target <= 10% -> Amber
  if (dir === 'higher') {
    if (numVal >= targetNum) return 'green';
    const amberFloor = targetNum * 0.9;
    if (numVal >= amberFloor) return 'amber';
    return 'red';
  }

  // 6. Lower is better: deviation = (actual - target) / target <= 10% -> Amber
  if (dir === 'lower') {
    if (numVal <= targetNum) return 'green';
    const amberCeil = targetNum * 1.1;
    if (numVal <= amberCeil) return 'amber';
    return 'red';
  }

  return null;
}

// ---- Step 3: compute an entire month's metrics in dependency order ----
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
// VETO check + WEIGHTED vote
// Returns { rag, vetoBreaches, weightedScore, numerator, denominator, scoredCount }
function computeOverallRAG(monthMetrics, customWeights) {
  if (!monthMetrics || typeof monthMetrics !== 'object') return null;

  const weights = Object.assign({}, DEFAULT_WEIGHTS, customWeights || {});

  // 1. Veto check: exactly the 8 veto metrics
  const vetoBreaches = [];
  let anyVetoHasData = false;

  VETO_METRICS.forEach(id => {
    const entry = monthMetrics[id];
    if (entry && entry.computed !== null && entry.computed !== undefined && Number.isFinite(Number(entry.computed))) {
      anyVetoHasData = true;
      if (Number(entry.computed) > 0) {
        vetoBreaches.push(id);
      }
    }
  });

  // 2. Weighted threshold vote across the 17 threshold metrics
  let sumGreen = 0;
  let sumRed = 0;
  let sumAll = 0;
  let scoredThresholdCount = 0;

  Object.keys(DEFAULT_WEIGHTS).forEach(id => {
    const entry = monthMetrics[id];
    if (!entry || entry.computed === null || entry.computed === undefined || !entry.rag) return;
    const w = Number(weights[id] !== undefined ? weights[id] : DEFAULT_WEIGHTS[id]);
    const rag = (entry.rag || '').toLowerCase();
    if (rag === 'green') {
      sumGreen += w;
      sumAll += w;
      scoredThresholdCount++;
    } else if (rag === 'red') {
      sumRed += w;
      sumAll += w;
      scoredThresholdCount++;
    } else if (rag === 'amber') {
      sumAll += w;
      scoredThresholdCount++;
    }
  });

  const numerator = round2(sumGreen - sumRed);
  const denominator = round2(sumAll);
  const weightedScore = denominator > 0
    ? Math.round(((sumGreen - sumRed) / denominator) * 10000) / 10000
    : null;

  let rag = null;

  // Rule 5: Overall RAG for a month
  if (vetoBreaches.length > 0) {
    rag = 'red';
  } else if (scoredThresholdCount === 0) {
    if (anyVetoHasData) {
      rag = 'green';
    } else {
      rag = null;
    }
  } else {
    if (weightedScore > 0) rag = 'green';
    else if (weightedScore < 0) rag = 'red';
    else rag = 'amber';
  }

  const healthScore = denominator > 0
    ? Math.round(((sumGreen + 0.5 * (sumAll - sumGreen - sumRed)) / denominator) * 100)
    : 0;

  return {
    rag,
    vetoBreaches,
    weightedScore,
    healthScore,
    numerator,
    denominator,
    scoredCount: scoredThresholdCount,
    toString() { return this.rag || ''; },
    valueOf() { return this.rag || ''; },
  };
}

// ---- Step 5: YTD Aggregation ----
// Calculates across the months of the specified year that have data
function computeYTD(dbMonths, year) {
  if (!dbMonths || typeof dbMonths !== 'object') return null;
  const targetYear = String(year || new Date().getFullYear());

  const monthsInYear = Object.keys(dbMonths)
    .filter(k => k.startsWith(targetYear + '-'))
    .sort();

  // Find months that actually have at least one computed metric
  const activeMonths = monthsInYear.filter(m => {
    const metrics = (dbMonths[m] && dbMonths[m].metrics) || {};
    return Object.values(metrics).some(entry => entry && entry.computed !== null && entry.computed !== undefined);
  });

  if (activeMonths.length === 0) return null;

  const ytdMetrics = {};

  METRICS.forEach(metric => {
    const mId = metric.id;

    if (YTD_SUM_METRICS.includes(mId)) {
      let sum = 0;
      let count = 0;
      activeMonths.forEach(m => {
        const val = dbMonths[m]?.metrics?.[mId]?.computed;
        if (val !== null && val !== undefined && Number.isFinite(Number(val))) {
          sum += Number(val);
          count++;
        }
      });
      const computed = count > 0 ? round2(sum) : null;
      ytdMetrics[mId] = {
        computed,
        rag: computeRAG(metric, computed),
        method: 'sum',
        monthsCount: count,
      };
    } else if (YTD_AVG_METRICS.includes(mId)) {
      let sum = 0;
      let count = 0;
      activeMonths.forEach(m => {
        const val = dbMonths[m]?.metrics?.[mId]?.computed;
        if (val !== null && val !== undefined && Number.isFinite(Number(val))) {
          sum += Number(val);
          count++;
        }
      });
      const computed = count > 0 ? round2(sum / count) : null;
      ytdMetrics[mId] = {
        computed,
        rag: computeRAG(metric, computed),
        method: 'average',
        monthsCount: count,
      };
    } else if (YTD_LATEST_METRICS.includes(mId)) {
      let latestVal = null;
      let latestMonth = null;
      // activeMonths is sorted ascending, so last non-null is latest
      activeMonths.forEach(m => {
        const val = dbMonths[m]?.metrics?.[mId]?.computed;
        if (val !== null && val !== undefined && Number.isFinite(Number(val))) {
          latestVal = Number(val);
          latestMonth = m;
        }
      });
      ytdMetrics[mId] = {
        computed: latestVal !== null ? round2(latestVal) : null,
        rag: computeRAG(metric, latestVal),
        method: 'latest',
        latestMonth,
      };
    } else {
      // Default: latest
      let latestVal = null;
      activeMonths.forEach(m => {
        const val = dbMonths[m]?.metrics?.[mId]?.computed;
        if (val !== null && val !== undefined && Number.isFinite(Number(val))) {
          latestVal = Number(val);
        }
      });
      ytdMetrics[mId] = {
        computed: latestVal !== null ? round2(latestVal) : null,
        rag: computeRAG(metric, latestVal),
        method: 'latest',
      };
    }
  });

  return {
    year: targetYear,
    activeMonths,
    monthsCount: activeMonths.length,
    metrics: ytdMetrics,
  };
}

module.exports = {
  computeValue,
  computeRAG,
  computeMonth,
  computeOverallRAG,
  computeYTD,
  round2,
  metricById,
  DEFAULT_WEIGHTS,
  VETO_METRICS,
  YTD_SUM_METRICS,
  YTD_AVG_METRICS,
  YTD_LATEST_METRICS,
};
