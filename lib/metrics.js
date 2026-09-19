// ============================================================
// MSS KPI Dashboard — Metric Definitions
// This is the single source of truth for every metric, its
// section, its formula shape, and its RAG (Red/Amber/Green) rule.
// The frontend fetches this via GET /api/metrics and renders
// forms from it — nothing about a metric is hardcoded in the UI.
// ============================================================

const SECTIONS = [
  { id: 'endpoint',    name: 'Endpoint Management',           icon: 'monitor' },
  { id: 'patch',       name: 'Patch Management',               icon: 'shield-check' },
  { id: 'protection',  name: 'Endpoint Protection (Sophos)',    icon: 'shield' },
  { id: 'secops',      name: 'Security Operations',            icon: 'radar' },
  { id: 'vuln',        name: 'Vulnerability Management',       icon: 'bug' },
  { id: 'identity',    name: 'Identity & Access',               icon: 'key' },
  { id: 'email',       name: 'Email & Phishing',               icon: 'mail' },
  { id: 'service',     name: 'Service Delivery',                icon: 'headset' },
  { id: 'compliance',  name: 'Compliance',                      icon: 'clipboard' },
];

// mode:
//  'direct'  -> single numeric input, stored & shown as-is
//  'ratio'   -> two inputs (numerator/denominator) -> percentage
//  'avg'     -> two inputs (total/count) -> average
//  'derived' -> no inputs of its own; computed from other metrics' values in the same month
//  'dual'    -> two selectable inputs (VPN Only or MDM Only); stored & shown with scope
//
// ragRule:
//  default   -> normal higher/lower-vs-target comparison
//  'binary0' -> lower-is-better, no formal target; GREEN if 0 else RED (or AMBER if amberNotRed)
//  'prevMonth' -> lower-is-better; compares against previous month's value instead of a fixed target

const METRICS = [
  // ---------------- Endpoint Management ----------------
  { id: 'managed_endpoints', section: 'endpoint', label: 'Managed endpoints', direction: 'trend', mode: 'direct', unit: '', desc: 'Total endpoints under management at month end (RMM inventory)' },
  {
    id: 'mobile_devices',
    section: 'endpoint',
    label: 'Mobile devices - VPN',
    direction: 'trend',
    mode: 'dual',
    unit: '',
    aLabel: 'VPN Enrolled',
    bLabel: 'MDM Enrolled',
    desc: 'Enrolled mobile devices at month end (VPN Only or MDM Only)',
  },
  { id: 'new_endpoints', section: 'endpoint', label: 'New endpoints', direction: 'trend', mode: 'direct', unit: '', desc: 'Devices onboarded during the month' },
  { id: 'removed_endpoints', section: 'endpoint', label: 'Removed endpoints', direction: 'trend', mode: 'direct', unit: '', desc: 'Devices decommissioned during the month' },
  { id: 'devices_not_reporting', section: 'endpoint', label: 'Devices not reporting', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'No agent check-in for >7 days, at month end' },
  { id: 'devices_not_reporting_pct', section: 'endpoint', label: 'Devices not reporting % of estate', direction: 'lower', target: 2.0, mode: 'ratio', unit: '%', numLabel: 'Devices not reporting', denLabel: 'Managed endpoints', desc: 'Devices not reporting / managed endpoints' },
  { id: 'endpoint_protection_coverage_pct', section: 'endpoint', label: 'Endpoint protection coverage %', direction: 'higher', target: 98.0, mode: 'ratio', unit: '%', numLabel: 'Endpoints with healthy protection agent', denLabel: 'Managed endpoints', desc: 'Endpoints with a healthy protection agent / managed endpoints' },

  // ---------------- Patch Management ----------------
  { id: 'patch_compliance_pct', section: 'patch', label: 'Patch compliance %', direction: 'higher', target: 95.0, mode: 'ratio', unit: '%', numLabel: 'Endpoints fully patched to policy', denLabel: 'Managed endpoints', desc: 'Endpoints fully patched to policy at month end' },
  { id: 'critical_patches_outstanding', section: 'patch', label: 'Critical patches outstanding', direction: 'lower', target: 0, mode: 'direct', unit: '', desc: 'Critical patches unapplied at month end' },
  { id: 'high_patches_outstanding', section: 'patch', label: 'High patches outstanding', direction: 'lower', target: 5, mode: 'direct', unit: '', desc: 'High patches unapplied at month end' },
  { id: 'failed_patch_deployments', section: 'patch', label: 'Failed patch deployments', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Deployment attempts failed during the month' },
  { id: 'successful_patch_deployments', section: 'patch', label: 'Successful patch deployments', direction: 'trend', mode: 'direct', unit: '', desc: 'Deployment attempts succeeded during the month' },
  { id: 'patch_deployment_success_rate_pct', section: 'patch', label: 'Patch deployment success rate %', direction: 'higher', target: 97.0, mode: 'derived', unit: '%', deriveFrom: ['successful_patch_deployments', 'failed_patch_deployments'], desc: 'Successful / (successful + failed) deployments — auto-computed' },
  { id: 'avg_days_to_critical_patch', section: 'patch', label: 'Avg days to critical patch', direction: 'lower', target: 7.0, mode: 'avg', unit: 'days', totalLabel: 'Sum of (Deployment Date − Vendor Release Date) per patch', countLabel: 'Number of applicable critical patches', desc: 'Mean days from vendor release to deployment' },

  // ---------------- Endpoint Protection (Sophos) ----------------
  { id: 'threats_blocked', section: 'protection', label: 'Threats blocked', direction: 'trend', mode: 'direct', unit: '', desc: 'Total detections blocked during the month' },
  { id: 'malware_detections', section: 'protection', label: 'Malware detections', direction: 'trend', mode: 'direct', unit: '', desc: 'Malware events detected' },
  { id: 'ransomware_detections', section: 'protection', label: 'Ransomware detections', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Ransomware events detected' },
  { id: 'policy_violations', section: 'protection', label: 'Policy violations', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Protection policy violations recorded' },
  { id: 'devices_outdated_protection', section: 'protection', label: 'Devices with outdated protection', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Stale agent or definitions at month end' },
  { id: 'devices_outdated_protection_pct', section: 'protection', label: 'Devices with outdated protection % of estate', direction: 'lower', target: 2.0, mode: 'ratio', unit: '%', numLabel: 'Devices with outdated protection', denLabel: 'Managed endpoints', desc: 'Outdated protection / managed endpoints' },

  // ---------------- Security Operations ----------------
  { id: 'security_incidents_raised', section: 'secops', label: 'Security incidents raised', direction: 'trend', mode: 'direct', unit: '', desc: 'Confirmed security incidents logged during the month' },
  { id: 'p1_security_incidents', section: 'secops', label: 'P1 security incidents', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Severity 1 security incidents' },
  { id: 'mttd_hours', section: 'secops', label: 'Mean time to detect (hours)', direction: 'lower', target: 1.0, mode: 'avg', unit: 'hrs', totalLabel: 'Total detection time (hours, summed)', countLabel: 'Number of incidents', desc: 'Alert generated to detection confirmed' },
  { id: 'mttr_hours', section: 'secops', label: 'Mean time to respond (hours)', direction: 'lower', target: 4.0, mode: 'avg', unit: 'hrs', totalLabel: 'Total response time (hours, summed)', countLabel: 'Number of incidents', desc: 'Detection confirmed to containment' },

  // ---------------- Vulnerability Management ----------------
  { id: 'critical_vulns_open', section: 'vuln', label: 'Critical vulnerabilities open', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Open critical vulnerabilities at month end' },
  { id: 'high_vulns_open', section: 'vuln', label: 'High vulnerabilities open', direction: 'lower', target: 10, mode: 'direct', unit: '', desc: 'Open high vulnerabilities at month end' },
  { id: 'medium_vulns_open', section: 'vuln', label: 'Medium vulnerabilities open', direction: 'trend', mode: 'direct', unit: '', desc: 'Open medium vulnerabilities at month end' },
  { id: 'vulns_remediated', section: 'vuln', label: 'Vulnerabilities remediated', direction: 'trend', mode: 'direct', unit: '', desc: 'Vulnerabilities closed during the month' },
  { id: 'mttr_critical_days', section: 'vuln', label: 'Mean time to remediate critical (days)', direction: 'lower', target: 14.0, mode: 'avg', unit: 'days', totalLabel: 'Total days (summed)', countLabel: 'Number of critical vulns remediated', desc: 'Discovery to remediation, critical severity' },
  { id: 'open_gt30_sla', section: 'vuln', label: 'Open >30 days past SLA', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Vulnerabilities 30+ days beyond remediation SLA' },
  { id: 'open_gt60_sla', section: 'vuln', label: 'Open >60 days past SLA', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Vulnerabilities 60+ days beyond remediation SLA' },
  { id: 'open_gt90_sla', section: 'vuln', label: 'Open >90 days past SLA', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Vulnerabilities 90+ days beyond remediation SLA' },

  // ---------------- Identity & Access ----------------
  { id: 'mfa_coverage_pct', section: 'identity', label: 'MFA coverage %', direction: 'higher', target: 100.0, mode: 'ratio', unit: '%', numLabel: 'Enabled users with MFA enforced', denLabel: 'Total enabled users', desc: 'Enabled users with MFA enforced / total enabled users' },
  { id: 'risky_sign_ins', section: 'identity', label: 'Risky sign-ins detected', direction: 'lower', target: null, ragRule: 'binary0', amberNotRed: true, mode: 'direct', unit: '', desc: 'Identity protection risky sign-in events' },

  // ---------------- Email & Phishing ----------------
  { id: 'training_completion_pct', section: 'email', label: 'Security awareness training completion %', direction: 'higher', target: 95.0, mode: 'ratio', unit: '%', numLabel: 'Users completing assigned training', denLabel: 'Users assigned', desc: 'Users completing assigned training / users assigned' },

  // ---------------- Service Delivery ----------------
  { id: 'support_requests', section: 'service', label: 'Support requests', direction: 'trend', mode: 'direct', unit: '', desc: 'Tickets raised during the month' },
  { id: 'incidents_resolved', section: 'service', label: 'Incidents resolved', direction: 'trend', mode: 'direct', unit: '', desc: 'Tickets closed during the month' },
  { id: 'first_time_fix_pct', section: 'service', label: 'First-time fix rate %', direction: 'higher', target: 75.0, mode: 'ratio', unit: '%', numLabel: 'Tickets resolved at first contact', denLabel: 'Tickets closed', desc: 'Tickets resolved at first contact / tickets closed' },
  { id: 'reopened_incidents', section: 'service', label: 'Reopened incidents', direction: 'lower', target: null, ragRule: 'binary0', mode: 'direct', unit: '', desc: 'Tickets reopened after closure' },
  { id: 'open_ticket_backlog', section: 'service', label: 'Open ticket backlog (month end)', direction: 'lower', target: null, ragRule: 'prevMonth', mode: 'direct', unit: '', desc: 'Tickets still open at month end — judged vs previous month' },
  { id: 'p1_response_sla_pct', section: 'service', label: 'P1 response SLA %', direction: 'higher', target: 100.0, mode: 'ratio', unit: '%', numLabel: 'P1 tickets responded within SLA', denLabel: 'Total P1 tickets', desc: 'P1 tickets responded to within SLA' },
  { id: 'p2_response_sla_pct', section: 'service', label: 'P2 response SLA %', direction: 'higher', target: 95.0, mode: 'ratio', unit: '%', numLabel: 'P2 tickets responded within SLA', denLabel: 'Total P2 tickets', desc: 'P2 tickets responded to within SLA' },
  { id: 'resolution_sla_pct', section: 'service', label: 'Resolution SLA %', direction: 'higher', target: 95.0, mode: 'ratio', unit: '%', numLabel: 'Tickets resolved within SLA', denLabel: 'Tickets closed, all priorities', desc: 'Tickets resolved within SLA, all priorities' },
  { id: 'onboarding_completed', section: 'service', label: 'Onboarding completed', direction: 'trend', mode: 'direct', unit: '', desc: 'User onboardings completed' },
  { id: 'offboarding_completed', section: 'service', label: 'Offboarding completed', direction: 'trend', mode: 'direct', unit: '', desc: 'User offboardings completed' },

  // ---------------- Compliance ----------------
  { id: 'iso_evidence_completed', section: 'compliance', label: 'ISO evidence requests completed', direction: 'higher', target: null, ragRule: 'binary0', amberNotRed: true, mode: 'direct', unit: '', desc: 'Evidence requests fulfilled during the month' },
  { id: 'config_changes', section: 'compliance', label: 'Configuration changes', direction: 'trend', mode: 'direct', unit: '', desc: 'Changes applied via change control' },
  { id: 'security_recommendations_raised', section: 'compliance', label: 'Security recommendations raised', direction: 'trend', mode: 'direct', unit: '', desc: 'New recommendations issued to the client' },
  { id: 'recommendations_completed', section: 'compliance', label: 'Recommendations completed', direction: 'trend', mode: 'direct', unit: '', desc: 'Recommendations closed during the month' },
  { id: 'recommendations_completion_pct', section: 'compliance', label: 'Recommendations completion %', direction: 'higher', target: 80.0, mode: 'derived', unit: '%', deriveFrom: ['recommendations_completed', 'security_recommendations_raised'], desc: 'Recommendations completed / raised — auto-computed' },
  { id: 'policy_exceptions_open', section: 'compliance', label: 'Policy exceptions open', direction: 'lower', target: null, ragRule: 'binary0', amberNotRed: true, mode: 'direct', unit: '', desc: 'Approved exceptions still open at month end' },
];

module.exports = { SECTIONS, METRICS };
