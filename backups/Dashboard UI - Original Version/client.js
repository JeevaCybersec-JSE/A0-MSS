// ============================================================
// Brysa KPI Dashboard · Client Deliverable Engine
// Exact visual presentation, Split two-panel layout,
// Detail drawer, Year & Month Navigation, and preserved calculations.
// ============================================================

(function () {
  'use strict';

  const DATA = {
  "sections": [
    {
      "section": "Endpoint Management",
      "rows": [
        {
          "r": 4,
          "name": "Managed endpoints",
          "desc": "Total endpoints under management at month end (RMM inventory)",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            36,
            37,
            37,
            38
          ],
          "ytd": 38,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 5,
          "name": "Mobile devices - VPN",
          "desc": "Enrolled mobile devices at month end (MDM)",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            35,
            36,
            36,
            37
          ],
          "ytd": 37,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 6,
          "name": "New endpoints",
          "desc": "Devices onboarded during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            1,
            0,
            1
          ],
          "ytd": 2,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 7,
          "name": "Removed endpoints",
          "desc": "Devices decommissioned during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 8,
          "name": "Devices not reporting",
          "desc": "No agent check-in for >7 days, at month end",
          "dir": "Lower",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            1,
            0,
            2,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 9,
          "name": "Devices not reporting % of estate",
          "desc": "Devices not reporting / managed endpoints",
          "dir": "Lower",
          "target": 0.02,
          "w": 1,
          "helper": false,
          "v": [
            null,
            null,
            0.0277777777777778,
            0,
            0.0540540540540541,
            0
          ],
          "ytd": 0.020457957957958,
          "rag": [
            null,
            null,
            -1,
            1,
            -1,
            1
          ],
          "ytdrag": 0
        },
        {
          "r": 10,
          "name": "Endpoint protection coverage %",
          "desc": "Endpoints with every protection layer healthy (Sophos, ManageEngine, VPN, MFA) ÷ managed endpoints",
          "dir": "Higher",
          "target": 0.98,
          "w": 2,
          "helper": false,
          "v": [
            null,
            null,
            1,
            0.972972972972973,
            0.972972972972973,
            0.947368421052632
          ],
          "ytd": 0.973328591749644,
          "rag": [
            null,
            null,
            1,
            0,
            0,
            0
          ],
          "ytdrag": 0
        },
        {
          "r": 11,
          "name": "Endpoints fully protected (all layers healthy)",
          "desc": "Count of endpoints with every required protection layer healthy at month end (Sophos, ManageEngine, VPN client, MFA — the same device must pass all). Feeds 'Endpoint protection coverage %' (divided by managed endpoints).",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            36,
            36,
            36,
            36
          ],
          "ytd": 36,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        }
      ]
    },
    {
      "section": "Patch Management",
      "rows": [
        {
          "r": 13,
          "name": "Patch compliance %",
          "desc": "Endpoints fully patched to policy at month end",
          "dir": "Higher",
          "target": 0.95,
          "w": 2,
          "helper": false,
          "v": [
            null,
            null,
            0.944444444444444,
            0.891891891891892,
            0.945945945945946,
            0.657894736842105
          ],
          "ytd": 0.860044254781097,
          "rag": [
            null,
            null,
            0,
            0,
            0,
            -1
          ],
          "ytdrag": 0
        },
        {
          "r": 14,
          "name": "Endpoints fully patched to policy (at month end)",
          "desc": "Count of endpoints fully patched to policy at month end. Feeds 'Patch compliance %'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            34,
            33,
            35,
            25
          ],
          "ytd": 25,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 15,
          "name": "Critical patches outstanding",
          "desc": "Critical patches unapplied at month end",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 16,
          "name": "High patches outstanding",
          "desc": "High patches unapplied at month end",
          "dir": "Lower",
          "target": 5,
          "w": 1,
          "helper": false,
          "v": [
            null,
            null,
            3,
            4,
            3,
            3
          ],
          "ytd": 3,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 17,
          "name": "Failed patch deployments",
          "desc": "Deployment attempts failed during the month",
          "dir": "Lower",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            3,
            2,
            2,
            0
          ],
          "ytd": 7,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 18,
          "name": "Successful patch deployments",
          "desc": "Deployment attempts succeeded during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            8,
            20,
            10,
            30
          ],
          "ytd": 68,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 19,
          "name": "Patch deployment success rate %",
          "desc": "Successful / (successful + failed) deployments",
          "dir": "Higher",
          "target": 0.97,
          "w": 0.5,
          "helper": false,
          "v": [
            null,
            null,
            0.727272727272727,
            0.909090909090909,
            0.833333333333333,
            1
          ],
          "ytd": 0.867424242424242,
          "rag": [
            null,
            null,
            -1,
            0,
            -1,
            1
          ],
          "ytdrag": -1
        },
        {
          "r": 20,
          "name": "Avg days to critical patch",
          "desc": "Mean days from vendor release to deployment",
          "dir": "Lower",
          "target": 7,
          "w": 1,
          "helper": false,
          "v": [
            null,
            null,
            1,
            7.5,
            9,
            6
          ],
          "ytd": 5.875,
          "rag": [
            null,
            null,
            1,
            0,
            -1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 21,
          "name": "Critical patches deployed (count)",
          "desc": "Count of critical patches deployed during the month. Feeds 'Avg days to critical patch'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            8,
            6,
            5,
            6
          ],
          "ytd": 25,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 22,
          "name": "Total days from vendor release to deployment (sum this month)",
          "desc": "Sum of days from vendor release to deployment, across all critical patches deployed this month. Feeds 'Avg days to critical patch'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            8,
            45,
            45,
            36
          ],
          "ytd": 134,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        }
      ]
    },
    {
      "section": "Endpoint Protection (Sophos)",
      "rows": [
        {
          "r": 24,
          "name": "Threats blocked",
          "desc": "Total detections blocked during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            16,
            18,
            25,
            20
          ],
          "ytd": 79,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 25,
          "name": "Malware detections",
          "desc": "Malware events detected",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            3,
            2,
            5,
            3
          ],
          "ytd": 13,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 26,
          "name": "Ransomware detections",
          "desc": "Ransomware events detected",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            1,
            0
          ],
          "ytd": 1,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            1
          ],
          "ytdrag": -1
        },
        {
          "r": 27,
          "name": "Policy violations",
          "desc": "Protection policy violations recorded",
          "dir": "Lower",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            8,
            6,
            10,
            8
          ],
          "ytd": 32,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 28,
          "name": "Devices with outdated protection",
          "desc": "Stale agent or definitions at month end",
          "dir": "Lower",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            1,
            0,
            2,
            12
          ],
          "ytd": 12,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 29,
          "name": "Devices with outdated protection % of estate",
          "desc": "Outdated protection / managed endpoints",
          "dir": "Lower",
          "target": 0.02,
          "w": 2,
          "helper": false,
          "v": [
            null,
            null,
            0.0277777777777778,
            0,
            0.0540540540540541,
            0.315789473684211
          ],
          "ytd": 0.0994053263790106,
          "rag": [
            null,
            null,
            -1,
            1,
            -1,
            -1
          ],
          "ytdrag": -1
        }
      ]
    },
    {
      "section": "Security Operations",
      "rows": [
        {
          "r": 31,
          "name": "Security incidents raised",
          "desc": "Confirmed security incidents logged during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            4,
            3,
            8,
            4
          ],
          "ytd": 19,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 32,
          "name": "P1 security incidents",
          "desc": "Severity 1 security incidents",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            1,
            0
          ],
          "ytd": 1,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            1
          ],
          "ytdrag": -1
        },
        {
          "r": 33,
          "name": "Mean time to detect (hours)",
          "desc": "Alert generated to detection confirmed",
          "dir": "Lower",
          "target": 1,
          "w": 2,
          "helper": false,
          "v": [
            null,
            null,
            1,
            1,
            6,
            15
          ],
          "ytd": 5.75,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            -1
          ],
          "ytdrag": -1
        },
        {
          "r": 34,
          "name": "Mean time to respond (hours)",
          "desc": "Detection confirmed to containment",
          "dir": "Lower",
          "target": 4,
          "w": 1,
          "helper": false,
          "v": [
            null,
            null,
            2,
            3,
            10,
            2
          ],
          "ytd": 4.25,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            1
          ],
          "ytdrag": 0
        }
      ]
    },
    {
      "section": "Vulnerability Management",
      "rows": [
        {
          "r": 36,
          "name": "Critical vulnerabilities open",
          "desc": "Open critical vulnerabilities at month end",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 37,
          "name": "High vulnerabilities open",
          "desc": "Open high vulnerabilities at month end",
          "dir": "Lower",
          "target": 10,
          "w": 1,
          "helper": false,
          "v": [
            null,
            null,
            3,
            4,
            6,
            5
          ],
          "ytd": 5,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 38,
          "name": "Medium vulnerabilities open",
          "desc": "Open medium vulnerabilities at month end",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            9,
            8,
            10,
            9
          ],
          "ytd": 9,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 39,
          "name": "Vulnerabilities remediated",
          "desc": "Vulnerabilities closed during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            21,
            15,
            12,
            18
          ],
          "ytd": 66,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 40,
          "name": "Mean time to remediate critical (days)",
          "desc": "Discovery to remediation, critical severity",
          "dir": "Lower",
          "target": 14,
          "w": 2,
          "helper": false,
          "v": [
            null,
            null,
            6,
            10,
            17.5,
            45
          ],
          "ytd": 19.625,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            -1
          ],
          "ytdrag": -1
        },
        {
          "r": 900,
          "name": "Critical items remediated (count)",
          "desc": "",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            1,
            2,
            2,
            2
          ],
          "ytd": 7,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 901,
          "name": "Total days to remediate critical (sum this month)",
          "desc": "",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            6,
            20,
            35,
            90
          ],
          "ytd": 151,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 41,
          "name": "Open >30 days past SLA",
          "desc": "Vulnerabilities 30+ days beyond remediation SLA",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 42,
          "name": "Open >60 days past SLA",
          "desc": "Vulnerabilities 60+ days beyond remediation SLA",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 43,
          "name": "Open >90 days past SLA",
          "desc": "Vulnerabilities 90+ days beyond remediation SLA",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        }
      ]
    },
    {
      "section": "Identity & Access",
      "rows": [
        {
          "r": 45,
          "name": "MFA coverage %",
          "desc": "Enabled users with MFA enforced / total enabled users",
          "dir": "Higher",
          "target": 1,
          "w": 2,
          "helper": false,
          "v": [
            null,
            null,
            1,
            1,
            0.945945945945946,
            0.5
          ],
          "ytd": 0.861486486486487,
          "rag": [
            null,
            null,
            1,
            1,
            0,
            -1
          ],
          "ytdrag": -1
        },
        {
          "r": 46,
          "name": "Enabled users with MFA enforced",
          "desc": "Count of enabled users with MFA enforced at month end. Feeds 'MFA coverage %'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            36,
            37,
            35,
            19
          ],
          "ytd": 19,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 47,
          "name": "Total enabled users",
          "desc": "Count of all enabled user accounts at month end. Feeds 'MFA coverage %'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            36,
            37,
            37,
            38
          ],
          "ytd": 38,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 48,
          "name": "Risky sign-ins detected",
          "desc": "Identity protection risky sign-in events",
          "dir": "Lower",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            3,
            1
          ],
          "ytd": 4,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        }
      ]
    },
    {
      "section": "Email & Phishing",
      "rows": [
        {
          "r": 50,
          "name": "User-reported phishing",
          "desc": "Messages reported by users via the report button",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            3,
            2,
            5,
            4
          ],
          "ytd": 14,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        }
      ]
    },
    {
      "section": "Service Delivery",
      "rows": [
        {
          "r": 52,
          "name": "Support requests",
          "desc": "Tickets raised during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            9,
            10,
            14,
            10
          ],
          "ytd": 43,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 53,
          "name": "Incidents resolved",
          "desc": "Tickets closed during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            2,
            9,
            10,
            9
          ],
          "ytd": 30,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 54,
          "name": "First-time fix rate %",
          "desc": "Tickets resolved at first contact / tickets closed",
          "dir": "Higher",
          "target": 0.75,
          "w": 0.5,
          "helper": false,
          "v": [
            null,
            null,
            1,
            0.777777777777778,
            0.6,
            0.888888888888889
          ],
          "ytd": 0.816666666666667,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 55,
          "name": "Tickets resolved at first contact",
          "desc": "Count of tickets resolved at first contact during the month. Feeds 'First-time fix rate %' (divided by Incidents resolved).",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            2,
            7,
            6,
            8
          ],
          "ytd": 23,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 56,
          "name": "Reopened incidents",
          "desc": "Tickets reopened after closure",
          "dir": "Lower",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            1,
            0
          ],
          "ytd": 1,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 57,
          "name": "Open ticket backlog (month end)",
          "desc": "Tickets still open at month end",
          "dir": "Lower",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            1,
            4,
            1
          ],
          "ytd": 1,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 58,
          "name": "P1 response SLA %",
          "desc": "P1 tickets responded to within SLA",
          "dir": "Higher",
          "target": 1,
          "w": 2,
          "helper": false,
          "v": [
            null,
            null,
            1,
            1,
            0.666666666666667,
            0.333333333333333
          ],
          "ytd": 0.75,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            -1
          ],
          "ytdrag": -1
        },
        {
          "r": 59,
          "name": "P1 tickets (total)",
          "desc": "Count of P1 tickets raised during the month. Feeds 'P1 response SLA %'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            2,
            1,
            3,
            3
          ],
          "ytd": 9,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 60,
          "name": "P1 tickets responded to within SLA",
          "desc": "Count of P1 tickets responded to within SLA during the month. Feeds 'P1 response SLA %'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            2,
            1,
            2,
            1
          ],
          "ytd": 6,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 61,
          "name": "P2 response SLA %",
          "desc": "P2 tickets responded to within SLA",
          "dir": "Higher",
          "target": 0.95,
          "w": 1,
          "helper": false,
          "v": [
            null,
            null,
            1,
            1,
            1
          ],
          "ytd": 1,
          "rag": [
            null,
            null,
            null,
            1,
            1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 62,
          "name": "P2 tickets (total)",
          "desc": "Count of P2 tickets raised during the month. Feeds 'P2 response SLA %'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            0,
            3,
            2,
            4
          ],
          "ytd": 9,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 63,
          "name": "P2 tickets responded to within SLA",
          "desc": "Count of P2 tickets responded to within SLA during the month. Feeds 'P2 response SLA %'.",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            0,
            3,
            2,
            4
          ],
          "ytd": 9,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 64,
          "name": "Resolution SLA %",
          "desc": "Tickets resolved within SLA, all priorities",
          "dir": "Higher",
          "target": 0.95,
          "w": 1,
          "helper": false,
          "v": [
            null,
            null,
            1,
            1,
            0.8,
            1
          ],
          "ytd": 0.95,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 65,
          "name": "Tickets resolved within SLA (all priorities)",
          "desc": "Count of tickets (all priorities) resolved within SLA during the month. Feeds 'Resolution SLA %' (divided by Incidents resolved).",
          "dir": null,
          "target": null,
          "w": null,
          "helper": true,
          "v": [
            null,
            null,
            2,
            9,
            8,
            9
          ],
          "ytd": 28,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 66,
          "name": "Onboarding completed",
          "desc": "User onboardings completed",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            1,
            0,
            1
          ],
          "ytd": 2,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 67,
          "name": "Offboarding completed",
          "desc": "User offboardings completed",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        }
      ]
    },
    {
      "section": "Compliance",
      "rows": [
        {
          "r": 69,
          "name": "ISO evidence requests completed",
          "desc": "Evidence requests fulfilled during the month",
          "dir": "Higher",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            1,
            0
          ],
          "ytd": 1,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 70,
          "name": "Configuration changes",
          "desc": "Changes applied via change control",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            0,
            3,
            2,
            2
          ],
          "ytd": 7,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 71,
          "name": "Security recommendations raised",
          "desc": "New recommendations issued to the client",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            2,
            2,
            3,
            3
          ],
          "ytd": 10,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 72,
          "name": "Recommendations completed",
          "desc": "Recommendations closed during the month",
          "dir": "Trend",
          "target": null,
          "w": null,
          "helper": false,
          "v": [
            null,
            null,
            2,
            2,
            1,
            3
          ],
          "ytd": 8,
          "rag": [
            null,
            null,
            null,
            null,
            null
          ],
          "ytdrag": null
        },
        {
          "r": 73,
          "name": "Recommendations completion %",
          "desc": "Recommendations completed / raised",
          "dir": "Higher",
          "target": 0.8,
          "w": 0.5,
          "helper": false,
          "v": [
            null,
            null,
            1,
            1,
            0.333333333333333,
            1
          ],
          "ytd": 0.833333333333333,
          "rag": [
            null,
            null,
            1,
            1,
            -1,
            1
          ],
          "ytdrag": 1
        },
        {
          "r": 74,
          "name": "Policy exceptions open",
          "desc": "Approved exceptions still open at month end",
          "dir": "Lower",
          "target": 0,
          "w": "(veto)",
          "helper": false,
          "v": [
            null,
            null,
            0,
            0,
            0,
            0
          ],
          "ytd": 0,
          "rag": [
            null,
            null,
            1,
            1,
            1,
            1
          ],
          "ytdrag": 1
        }
      ]
    }
  ],
  "ov": {
    "overall": [
      null,
      null,
      "Green",
      "Green",
      "Red",
      "Red",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "breaches": [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "score": [
      null,
      null,
      0.581,
      0.756,
      -0.467,
      -0.156,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]
  }
};

  const MON = [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const FULL = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const AVAIL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let CHART_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'endpoints', label: 'Endpoints & Patching', secs: ['Endpoint Management', 'Patch Management'] },
    { id: 'threats', label: 'Threats & Response', secs: ['Endpoint Protection (Sophos)', 'Security Operations', 'Email & Phishing'] },
    { id: 'vuln', label: 'Vulnerabilities', secs: ['Vulnerability Management'] },
    { id: 'identity', label: 'Identity & Email', secs: ['Identity & Access', 'Email & Phishing'] },
    { id: 'service', label: 'Service Delivery', secs: ['Service Delivery'] },
    { id: 'compliance', label: 'Compliance', secs: ['Compliance'] },
    { id: 'scorecard', label: 'Scorecard' }
  ];

  const state = { tab: 'overview', m: 5, year: 2026, data: null };
  const byId = {};
  const flat = [];

  DATA.sections.forEach(s => {
    let last = null;
    s.rows.forEach(r => {
      r._origV = Array.isArray(r.v) ? [...r.v] : [];
      r.v = Array(13).fill(null);
      r.rag = Array(13).fill(null);
      r.ytd = null;
      r.ytdrag = null;

      if (r.helper) {
        if (last) last.helpers.push(r);
        return;
      }
      r.helpers = [];
      r.sec = s.section;
      r.scored = r.target !== null && r.target !== undefined;
      r.veto = r.w === '(veto)';
      last = r;
      flat.push(r);
      byId[r.r] = r;
    });
  });
  DATA.ov.overall = Array(13).fill(null);
  DATA.ov.breaches = Array(13).fill(0);
  DATA.ov.score = Array(13).fill(null);

  const scored = flat.filter(r => r.scored);
  const SAMPLE = new Set();
  const WT = r => r.veto ? 3 : (typeof r.w === 'number' ? r.w : 1);
  const tier = r => !r.scored ? 'None' : r.veto ? 'Zero tolerance' : (r.w >= 2 ? 'High' : r.w <= 0.5 ? 'Low' : 'Medium');

  const ROW_MAP = {
    4: { id: 'managed_endpoints' },
    5: { id: 'mobile_devices' },
    6: { id: 'new_endpoints' },
    7: { id: 'removed_endpoints' },
    8: { id: 'devices_not_reporting' },
    9: { id: 'devices_not_reporting_pct' },
    10: { id: 'endpoint_protection_coverage_pct' },
    11: { helper: 'endpoint_protection_coverage_pct_num' },
    13: { id: 'patch_compliance_pct' },
    14: { helper: 'patch_compliance_pct_num' },
    15: { id: 'critical_patches_outstanding' },
    16: { id: 'high_patches_outstanding' },
    17: { id: 'failed_patch_deployments' },
    18: { id: 'successful_patch_deployments' },
    19: { id: 'patch_deployment_success_rate_pct' },
    20: { id: 'avg_days_to_critical_patch' },
    21: { helper: 'avg_days_count' },
    22: { helper: 'avg_days_total' },
    24: { id: 'threats_blocked' },
    25: { id: 'malware_detections' },
    26: { id: 'ransomware_detections' },
    27: { id: 'policy_violations' },
    28: { id: 'devices_outdated_protection' },
    29: { id: 'devices_outdated_protection_pct' },
    31: { id: 'security_incidents_raised' },
    32: { id: 'p1_security_incidents' },
    33: { id: 'mttd_hours' },
    34: { id: 'mttr_hours' },
    36: { id: 'critical_vulns_open' },
    37: { id: 'high_vulns_open' },
    38: { id: 'medium_vulns_open' },
    39: { id: 'vulns_remediated' },
    40: { id: 'mttr_critical_days' },
    41: { id: 'open_gt30_sla' },
    42: { id: 'open_gt60_sla' },
    43: { id: 'open_gt90_sla' },
    45: { id: 'mfa_coverage_pct' },
    46: { helper: 'mfa_coverage_pct_num' },
    47: { helper: 'mfa_coverage_pct_den' },
    48: { id: 'risky_sign_ins' },
    50: { id: 'user_reported_phishing' },
    52: { id: 'support_requests' },
    53: { id: 'incidents_resolved' },
    54: { id: 'first_time_fix_pct' },
    55: { helper: 'first_time_fix_pct_num' },
    56: { id: 'reopened_incidents' },
    57: { id: 'open_ticket_backlog' },
    58: { id: 'p1_response_sla_pct' },
    59: { helper: 'p1_response_sla_pct_den' },
    60: { helper: 'p1_response_sla_pct_num' },
    61: { id: 'p2_response_sla_pct' },
    62: { helper: 'p2_response_sla_pct_den' },
    63: { helper: 'p2_response_sla_pct_num' },
    64: { id: 'resolution_sla_pct' },
    65: { helper: 'resolution_sla_pct_num' },
    66: { id: 'onboarding_completed' },
    67: { id: 'offboarding_completed' },
    69: { id: 'iso_evidence_completed' },
    70: { id: 'config_changes' },
    71: { id: 'security_recommendations_raised' },
    72: { id: 'recommendations_completed' },
    73: { id: 'recommendations_completion_pct' },
    74: { id: 'policy_exceptions_open' },
    900: { helper: 'mttr_crit_count' },
    901: { helper: 'mttr_crit_total' }
  };

  function getHelperValue(helperKey, monthData) {
    if (!monthData) return null;
    switch (helperKey) {
      case 'endpoint_protection_coverage_pct_num': {
        const inp = monthData.endpoint_protection_coverage_pct?.inputs;
        if (!inp) return null;
        if (typeof inp.num === 'number') return inp.num;
        if (typeof inp.healthy === 'number') return inp.healthy;
        const layers = [inp.sophos, inp.manageengine, inp.vpn, inp.mfa].filter(x => typeof x === 'number');
        return layers.length ? Math.min(...layers) : null;
      }
      case 'patch_compliance_pct_num': {
        const inp = monthData.patch_compliance_pct?.inputs;
        if (!inp) return null;
        return inp.num ?? inp.patched ?? inp.fully_patched ?? null;
      }
      case 'avg_days_count':
        return monthData.avg_days_to_critical_patch?.inputs?.count ?? null;
      case 'avg_days_total':
        return monthData.avg_days_to_critical_patch?.inputs?.total ?? null;
      case 'mttr_crit_count':
        return monthData.mttr_critical_days?.inputs?.count ?? null;
      case 'mttr_crit_total':
        return monthData.mttr_critical_days?.inputs?.total ?? null;
      case 'mfa_coverage_pct_num': {
        const inp = monthData.mfa_coverage_pct?.inputs;
        if (!inp) return null;
        return inp.num ?? inp.mfa_enforced ?? inp.enabled_users_with_mfa_enforced ?? null;
      }
      case 'mfa_coverage_pct_den': {
        const inp = monthData.mfa_coverage_pct?.inputs;
        if (!inp) return null;
        return inp.den ?? inp.total_users ?? inp.total_enabled_users ?? (monthData.managed_endpoints?.computed) ?? null;
      }
      case 'first_time_fix_pct_num': {
        const inp = monthData.first_time_fix_pct?.inputs;
        if (!inp) return null;
        return inp.num ?? inp.first_contact ?? inp.tickets_resolved_at_first_contact ?? null;
      }
      case 'p1_response_sla_pct_den': {
        const inp = monthData.p1_response_sla_pct?.inputs;
        if (!inp) return null;
        return inp.den ?? inp.total_p1 ?? inp.p1_tickets ?? null;
      }
      case 'p1_response_sla_pct_num': {
        const inp = monthData.p1_response_sla_pct?.inputs;
        if (!inp) return null;
        return inp.num ?? inp.p1_responded ?? inp.responded_within_sla ?? null;
      }
      case 'p2_response_sla_pct_den': {
        const inp = monthData.p2_response_sla_pct?.inputs;
        if (!inp) return null;
        return inp.den ?? inp.total_p2 ?? inp.p2_tickets ?? null;
      }
      case 'p2_response_sla_pct_num': {
        const inp = monthData.p2_response_sla_pct?.inputs;
        if (!inp) return null;
        return inp.num ?? inp.p2_responded ?? inp.responded_within_sla ?? null;
      }
      case 'resolution_sla_pct_num': {
        const inp = monthData.resolution_sla_pct?.inputs;
        if (!inp) return null;
        return inp.num ?? inp.resolved_within_sla ?? inp.tickets_resolved_within_sla ?? null;
      }
      default:
        return null;
    }
  }

  const COMMENT = {};

  function applyServerData(json) {
    if (!json) return;
    if (json.year) state.year = parseInt(json.year, 10);
    if (json.month) {
      const parts = json.month.split('-');
      if (parts.length === 2) {
        state.m = parseInt(parts[1], 10);
      }
    }

    const allMonths = json.allMonthsData || {};
    const ytdData = json.ytd || {};
    const currentMonthData = json.monthData || {};

    const activeMonthNums = AVAIL.filter(i => {
      const mKey = `${state.year}-${String(i).padStart(2, '0')}`;
      const mObj = allMonths[mKey];
      return mObj && mObj.metrics && Object.values(mObj.metrics).some(m => m && m.computed !== null && m.computed !== undefined);
    });
    CHART_MONTHS = activeMonthNums.length > 0 ? activeMonthNums : AVAIL;

    AVAIL.forEach(i => {
      const mKey = `${state.year}-${String(i).padStart(2, '0')}`;
      const mObj = allMonths[mKey];
      if (mObj && mObj.rag) {
        const r = (mObj.rag || '').toLowerCase();
        DATA.ov.overall[i] = r === 'green' ? 'Green' : (r === 'amber' ? 'Amber' : (r === 'red' ? 'Red' : null));
        let breaches = 0;
        if (mObj.metrics) {
          const vetoList = ['critical_patches_outstanding', 'ransomware_detections', 'p1_security_incidents', 'critical_vulns_open', 'open_gt30_sla', 'open_gt60_sla', 'open_gt90_sla', 'policy_exceptions_open'];
          vetoList.forEach(vid => {
            if (mObj.metrics[vid] && mObj.metrics[vid].rag === 'red') breaches++;
          });
        }
        DATA.ov.breaches[i] = breaches;
      } else {
        DATA.ov.overall[i] = null;
        DATA.ov.breaches[i] = 0;
      }
    });

    DATA.sections.forEach(s => {
      s.rows.forEach(r => {
        const mapping = ROW_MAP[r.r];
        if (!mapping) {
          AVAIL.forEach(i => {
            r.v[i] = null;
            r.rag[i] = null;
          });
          r.ytd = null;
          r.ytdrag = null;
          return;
        }

        AVAIL.forEach(i => {
          const mKey = `${state.year}-${String(i).padStart(2, '0')}`;
          const isSelected = (mKey === json.month);

          if (mapping.id) {
            const mId = mapping.id;
            let val = null;
            let ragStr = null;

            if (isSelected && currentMonthData[mId]) {
              val = currentMonthData[mId].computed;
              ragStr = currentMonthData[mId].rag;
            } else if (allMonths[mKey] && allMonths[mKey].metrics && allMonths[mKey].metrics[mId]) {
              val = allMonths[mKey].metrics[mId].computed;
              ragStr = allMonths[mKey].metrics[mId].rag;
            }

            if (typeof val === 'number') {
              r.v[i] = isPct(r) ? val / 100 : val;
            } else if (state.year === 2026 && r._origV && typeof r._origV[i] === 'number') {
              r.v[i] = isPct(r) ? r._origV[i] / 100 : r._origV[i];
            } else {
              r.v[i] = null;
            }
            r.rag[i] = ragStr ? (ragStr.toLowerCase() === 'green' ? 1 : (ragStr.toLowerCase() === 'amber' ? 0 : (ragStr.toLowerCase() === 'red' ? -1 : null))) : null;
          } else if (mapping.helper) {
            const mSource = isSelected ? currentMonthData : (allMonths[mKey] && allMonths[mKey].metrics ? allMonths[mKey].metrics : null);
            const hVal = getHelperValue(mapping.helper, mSource);
            if (hVal !== null && typeof hVal === 'number') {
              r.v[i] = hVal;
            } else if (state.year === 2026 && r._origV && typeof r._origV[i] === 'number') {
              r.v[i] = r._origV[i];
            } else {
              r.v[i] = null;
            }
            r.rag[i] = null;
          }
        });

        if (mapping.id) {
          const mId = mapping.id;
          const yObj = ytdData[mId];
          if (yObj && typeof yObj.computed === 'number') {
            r.ytd = isPct(r) ? yObj.computed / 100 : yObj.computed;
            r.ytdrag = yObj.rag ? (yObj.rag.toLowerCase() === 'green' ? 1 : (yObj.rag.toLowerCase() === 'amber' ? 0 : (yObj.rag.toLowerCase() === 'red' ? -1 : null))) : null;
          } else {
            r.ytd = null;
            r.ytdrag = null;
          }
        }
      });
    });

    Object.keys(COMMENT).forEach(k => delete COMMENT[k]);
    if (json.narrative && typeof json.narrative === 'object') {
      const narr = json.narrative;
      const risks = narr.topRisks ? [narr.topRisks] : [];
      const imps = narr.improvements ? [narr.improvements] : [];
      const acts = narr.plannedActions ? [narr.plannedActions] : [];
      if (risks.length || imps.length || acts.length) {
        COMMENT[state.m] = {
          risks,
          improvements: imps,
          actions: acts
        };
      }
    }
  }

  async function fetchClientData(monthKey) {
    try {
      const res = await fetch('/api/public/client-data?month=' + encodeURIComponent(monthKey));
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      if (!json || !json.success) throw new Error(json.error || 'Server error');
      state.data = json;
      applyServerData(json);
      render();
    } catch (err) {
      console.warn('Note: using cached client figures:', err.message);
      render();
    }
  }

  const CHARTS = [];
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  /* formatting */
  const isPct = r => /%/.test(r.name);
  const unitOf = r => /\(hours\)/.test(r.name) ? ' h' : (/\(days\)|^Avg days/.test(r.name) ? ' d' : '');

  function fmt(r, v) {
    if (v === null || v === undefined || v === '') return '–';
    if (isPct(r)) {
      const p = v * 100;
      return (Math.abs(p % 1) < 1e-9 ? p.toFixed(0) : p.toFixed(1)) + '%';
    }
    const n = Number.isInteger(v) ? String(v) : v.toFixed(1);
    return n + unitOf(r);
  }

  function target(r) {
    if (!r.scored) return '';
    if (r.veto) return 'Zero tolerance';
    const t = fmt(r, r.target);
    return r.dir === 'Higher' ? '≥ ' + t : '≤ ' + t;
  }

  const cls = x => x === 1 ? 'g' : x === 0 ? 'a' : x === -1 ? 'r' : 'n';

  function label(r, x) {
    if (x === null || x === undefined) return '';
    if (r.veto) return x === 1 ? 'Clear' : 'Breach';
    return x === 1 ? 'On target' : x === 0 ? 'Near target' : 'Off target';
  }

  function pill(r, x) {
    if (x === null || x === undefined) return '';
    return '<span class="pill ' + cls(x) + '">' + label(r, x) + '</span>';
  }

  function delta(r, m) {
    const p = m - 1;
    let pv = (p >= 1) ? r.v[p] : null;
    let pLabel = (p >= 1) ? MON[p] : 'last month';

    if (p < 1 && state.data && state.data.prevData && ROW_MAP[r.r]?.id) {
      const prevComputed = state.data.prevData[ROW_MAP[r.r].id]?.computed;
      if (typeof prevComputed === 'number') {
        pv = isPct(r) ? prevComputed / 100 : prevComputed;
        pLabel = state.data.prevMonth ? 'Dec ' + (state.year - 1) : 'last month';
      }
    }

    const v = r.v[m];
    if (typeof v !== 'number' || typeof pv !== 'number') return '';
    const d = v - pv;
    if (Math.abs(d) < 1e-9) return '<span>No change vs ' + pLabel + '</span>';
    const up = d > 0, ad = Math.abs(d);
    let txt;
    if (isPct(r)) txt = (up ? '+' : '−') + (ad * 100).toFixed(1) + ' pts vs ' + pLabel;
    else if (unitOf(r)) txt = (up ? '+' : '−') + (Number.isInteger(ad) ? ad : ad.toFixed(1)) + unitOf(r) + ' vs ' + pLabel;
    else txt = (up ? '+' : '−') + (Number.isInteger(ad) ? ad : ad.toFixed(1)) + ' vs ' + pLabel;
    let c = '';
    if (r.dir === 'Higher') c = up ? 'good' : 'bad';
    else if (r.dir === 'Lower') c = up ? 'bad' : 'good';
    return '<span class="' + c + '">' + txt + '</span>';
  }

  function counts(m) {
    let g = 0, a = 0, rr = 0;
    scored.forEach(r => {
      const x = r.rag[m];
      if (x === 1) g++;
      else if (x === 0) a++;
      else if (x === -1) rr++;
    });
    return { g, a, r: rr, n: g + a + rr };
  }

  function spark(r, m) {
    const pts = CHART_MONTHS.filter(i => typeof r.v[i] === 'number');
    if (pts.length < 2) return '<svg viewBox="0 0 100 30" aria-hidden="true"></svg>';
    const vals = pts.map(i => r.v[i]);
    const mn = Math.min(...vals), mx = Math.max(...vals);
    const span = (mx - mn) || 1;
    const first = pts[0], last = pts[pts.length - 1];
    const X = i => 4 + ((i - first) / Math.max(1, last - first)) * 92;
    const Y = v => 25 - ((v - mn) / span) * 20;

    const pArr = pts.map(i => ({ x: X(i), y: Y(r.v[i]) }));
    let d = 'M ' + pArr[0].x.toFixed(1) + ' ' + pArr[0].y.toFixed(1);
    for (let k = 0; k < pArr.length - 1; k++) {
      const p0 = pArr[k === 0 ? 0 : k - 1];
      const p1 = pArr[k];
      const p2 = pArr[k + 1];
      const p3 = pArr[k + 2 < pArr.length ? k + 2 : k + 1];
      const cp1x = p1.x + (p2.x - p0.x) / 5.5;
      const cp1y = p1.y + (p2.y - p0.y) / 5.5;
      const cp2x = p2.x - (p3.x - p1.x) / 5.5;
      const cp2y = p2.y - (p3.y - p1.y) / 5.5;
      d += ' C ' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) + ', ' + cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) + ', ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    }
    const area = d + ' L ' + pArr[pArr.length - 1].x.toFixed(1) + ' 29 L ' + pArr[0].x.toFixed(1) + ' 29 Z';
    const sel = typeof r.v[m] === 'number' ? '<span class="dt" style="left:' + X(m).toFixed(1) + '%;top:' + ((Y(r.v[m]) / 30 * 100).toFixed(1)) + '%"></span>' : '';
    return '<div class="sp"><svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="' + area + '" fill="var(--accent-soft)" stroke="none"/><path d="' + d + '" fill="none" stroke="var(--accent)" stroke-width="1.8" vector-effect="non-scaling-stroke"/></svg>' + sel + '</div>';
  }

  function getExecutivePosture(monthIndex) {
    const c = counts(monthIndex);
    const healthScore = c.n > 0 ? Math.round(((c.g * 1.0 + c.a * 0.5) / c.n) * 100) : 0;
    const vetoes = scored.filter(r => r.veto);
    const br = vetoes.filter(r => r.rag[monthIndex] === -1);
    const ovRag = DATA.ov?.overall?.[monthIndex] || (br.length ? 'Red' : (healthScore >= 70 ? 'Green' : (healthScore >= 50 ? 'Amber' : 'Red')));

    // Unified cybersecurity business rules (Single Source of Truth)
    const isBreach = br.length > 0;
    const isRed = isBreach || ovRag === 'Red' || healthScore < 50;
    const isAmber = !isRed && (ovRag === 'Amber' || healthScore < 70);
    const isGreen = !isRed && !isAmber;

    const key = isRed ? 'r' : (isAmber ? 'a' : 'g');
    const color = isRed ? '#ef4444' : (isAmber ? '#f59e0b' : '#10b981');
    const statusText = isBreach ? 'Needs Attention' : (isGreen ? 'Optimal Posture' : (isAmber ? 'Moderate Posture' : 'Needs Attention'));
    const gradeBadge = isBreach ? (br.length + ' Zero-tolerance breach' + (br.length > 1 ? 'es' : '')) : (isGreen ? 'Optimal posture' : (isAmber ? 'Balanced posture' : 'Attention required'));
    const badgeClass = isGreen ? 'optimal' : (isAmber ? 'warning' : 'danger');

    return {
      healthScore,
      breaches: br,
      rag: ovRag,
      key,
      color,
      statusText,
      gradeBadge,
      badgeClass,
      isBreach
    };
  }

  function renderHeader() {
    const yearDisplay = document.getElementById('year-display');
    if (yearDisplay) yearDisplay.textContent = state.year;

    const topPeriod = document.getElementById('top-reporting-period');
    if (topPeriod) topPeriod.textContent = FULL[state.m] + ' ' + state.year;

    const heroTitlePeriod = document.getElementById('hero-title-period');
    if (heroTitlePeriod) heroTitlePeriod.textContent = FULL[state.m] + ' ' + state.year + ' Executive Audit';

    const post = getExecutivePosture(state.m);
    const c = counts(state.m);

    const heroScoreVal = document.getElementById('hero-score-val');
    if (heroScoreVal) heroScoreVal.textContent = post.healthScore;

    const heroScoreNote = document.getElementById('hero-score-note');
    if (heroScoreNote) heroScoreNote.textContent = 'Overall workbook security compliance index for ' + FULL[state.m] + ' ' + state.year + '.';

    const heroBadge = document.getElementById('hero-status-badge');
    if (heroBadge) {
      heroBadge.textContent = post.statusText;
      heroBadge.className = 'score-badge-status ' + post.badgeClass;
    }

    const heroRing = document.getElementById('hero-ring-circle');
    if (heroRing) {
      const circ = 2 * Math.PI * 74;
      const fill = Math.round(circ * (post.healthScore / 100));
      heroRing.setAttribute('stroke-dasharray', fill + ' ' + (circ - fill));
      heroRing.setAttribute('stroke', post.color);
    }

    const hs = document.getElementById('hs');
    if (hs) {
      const secInc = flat.find(x => x.name === 'Security incidents raised');
      const thrBlk = flat.find(x => x.name === 'Threats blocked');
      const tktRes = flat.find(x => x.name === 'Incidents resolved');
      const tktOpen = flat.find(x => x.name === 'Open ticket backlog (month end)');

      const incVal = secInc && typeof secInc.v[state.m] === 'number' ? secInc.v[state.m] : 0;
      const thrVal = thrBlk && typeof thrBlk.v[state.m] === 'number' ? thrBlk.v[state.m] : 0;
      const resVal = tktRes && typeof tktRes.v[state.m] === 'number' ? tktRes.v[state.m] : 0;
      const openVal = tktOpen && typeof tktOpen.v[state.m] === 'number' ? tktOpen.v[state.m] : 0;

      const incDelta = delta(secInc, state.m) || 'Baseline';
      const thrDelta = delta(thrBlk, state.m) || 'Baseline';

      hs.innerHTML = [
        '<div class="st" data-open="' + (secInc ? secInc.r : '') + '" title="Inspect Security Incidents">',
          '<small>Security Incidents</small>',
          '<b>' + incVal + '</b>',
          '<em>' + incDelta + '</em>',
          '<div style="font-size:12px;color:var(--muted);margin-top:6px">Monthly raised</div>',
        '</div>',
        '<div class="st" data-open="' + (thrBlk ? thrBlk.r : '') + '" title="Inspect Threats Blocked">',
          '<small>Threats Blocked</small>',
          '<b>' + thrVal + '</b>',
          '<em>' + thrDelta + '</em>',
          '<div style="font-size:12px;color:var(--muted);margin-top:6px">Detections stopped</div>',
        '</div>',
        '<div class="st" data-tab="scorecard" title="View Full Scorecard">',
          '<small>KPIs on Target</small>',
          '<b>' + c.g + ' / ' + c.n + '</b>',
          '<em>' + c.r + ' off · ' + c.a + ' near</em>',
          '<div style="font-size:12px;color:var(--muted);margin-top:6px">Scored measures</div>',
        '</div>',
        '<div class="st" data-open="' + (tktRes ? tktRes.r : '') + '" title="Inspect Resolved Tickets">',
          '<small>Tickets Resolved</small>',
          '<b>' + resVal + '</b>',
          '<em>' + openVal + ' still open</em>',
          '<div style="font-size:12px;color:var(--muted);margin-top:6px">Service delivery</div>',
        '</div>'
      ].join('');
    }

    const monthPillsEl = document.getElementById('month-pills');
    if (monthPillsEl) {
      monthPillsEl.innerHTML = AVAIL.map(i =>
        '<button type="button" class="m-pill ' + (i === state.m ? 'active' : '') + '" data-m="' + i + '">' + MON[i] + '</button>'
      ).join('');
    }

    const tabsContainer = document.getElementById('tabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = TABS.map(t =>
        '<button class="tab ' + (state.tab === t.id ? 'on' : '') + '" role="tab" data-tab="' + t.id + '" aria-selected="' + (state.tab === t.id) + '">' + t.label + '</button>'
      ).join('');
    }
  }

  function sev(r, m) {
    const v = r.v[m], t = r.target;
    if (typeof v !== 'number') return 0;
    return t ? Math.abs(v - t) / Math.abs(t) : v;
  }

  function overview() {
    const m = state.m, o = DATA.ov, c = counts(m);
    const post = getExecutivePosture(m);
    const rag = post.rag, k = post.key, br = post.breaches;

    const why = rag === 'Red' ? 'More weighted metrics are off target than on target. ' : rag === 'Amber' ? 'Weighted metrics are evenly balanced. ' : '';
    const lead = br.length ? br.length + ' zero-tolerance breach' + (br.length > 1 ? 'es' : '') + ': ' + br.map(r => r.name.toLowerCase()).join(' and ') + '. ' : 'No zero-tolerance breaches. ' + why;
    const sentence = rag ? lead + c.g + ' of ' + c.n + ' scored metrics are on target.' : 'No data for this month yet.';
    const rank = (a, b) => WT(b) - WT(a) || sev(b, m) - sev(a, m);
    const allDrv = scored.filter(r => r.rag[m] === -1).sort(rank), drivers = allDrv.slice(0, 5);
    const li = (arr, fn) => '<ul class="li">' + arr.map(r => '<li><button data-open="' + r.r + '"><span class="nm">' + r.name + '</span><span class="meta">' + fn(r) + '</span></button></li>').join('') + '</ul>';

    const windowEnd = Math.max(4, Math.min(12, m));
    const statusMonths = [windowEnd - 3, windowEnd - 2, windowEnd - 1, windowEnd];

    // --- REPLACEMENT FOR CALENDAR-STYLE DESIGN: Monthly Security Posture Trend ---
    const postureTrendHtml = '<div class="posture-trend-widget">' +
      '<div class="posture-trend-track-head">' +
        '<span class="posture-track-title">Monthly Security Posture Trend</span>' +
        '<span class="posture-track-sub">Historical score &amp; compliance trajectory</span>' +
      '</div>' +
      '<div class="posture-trend-timeline">' +
        statusMonths.map(i => {
          const p_i = getExecutivePosture(i);
          const prev_i = (i > 1) ? getExecutivePosture(i - 1) : null;
          const isActive = (i === m);

          let deltaMarkup = '<span class="posture-delta n">Baseline</span>';
          if (prev_i && typeof p_i.healthScore === 'number' && typeof prev_i.healthScore === 'number') {
            const diff = p_i.healthScore - prev_i.healthScore;
            if (diff > 0) deltaMarkup = '<span class="posture-delta g">▲ +' + diff + ' vs ' + MON[i - 1] + '</span>';
            else if (diff < 0) deltaMarkup = '<span class="posture-delta r">▼ ' + diff + ' vs ' + MON[i - 1] + '</span>';
            else deltaMarkup = '<span class="posture-delta n">● 0 vs ' + MON[i - 1] + '</span>';
          }

          const statusDot = '<span class="posture-status-dot ' + p_i.key + '"></span>';
          const statusText = p_i.isBreach ? 'Breached' : (p_i.key === 'g' ? 'Optimal' : (p_i.key === 'a' ? 'Moderate' : 'Critical'));

          return '<button type="button" class="posture-trend-step ' + (isActive ? 'active' : '') + '" data-m="' + i + '" aria-pressed="' + isActive + '" title="View report for ' + FULL[i] + ' ' + state.year + '">' +
            '<div class="posture-step-top">' +
              '<span class="posture-month-lbl">' + MON[i] + '</span>' +
              (isActive ? '<span class="posture-active-pill">Current</span>' : '') +
            '</div>' +
            '<div class="posture-score-row">' +
              '<span class="posture-score-num">' + p_i.healthScore + '</span>' +
              '<span class="posture-score-denom">/100</span>' +
            '</div>' +
            '<div class="posture-status-tag ' + p_i.key + '">' + statusDot + statusText + '</div>' +
            '<div class="posture-delta-wrap">' + deltaMarkup + '</div>' +
          '</button>';
        }).join('') +
      '</div>' +
    '</div>';

    const prev = m - 1, slips = [], gains = [];
    if (prev >= 1) scored.forEach(r => {
      const a = r.rag[prev], b = r.rag[m];
      if (a === null || a === undefined || b === null || b === undefined || a === b) return;
      (b > a ? gains : slips).push(r);
    });
    const chg = r => fmt(r, r.v[prev]) + ' → ' + fmt(r, r.v[m]);
    const top = arr => arr.sort(rank).slice(0, 5);
    const fl = n => flat.find(x => x.name === n);
    const stat = (name, label, sub) => {
      const r = fl(name);
      if (!r) return '';
      return '<div class="stat"><div class="t">' + label + '</div><div class="v">' + fmt(r, r.v[m]) + '</div><div class="d">' + (sub || delta(r, m) || '&nbsp;') + '</div><div class="d">Year to date ' + fmt(r, r.ytd) + '</div></div>';
    };

    // 1. Executive Summary & Security Health (Single Source of Truth)
    const radialRadius = 35;
    const radialCirc = 2 * Math.PI * radialRadius; // 219.91
    const radialOffset = (radialCirc * (1 - (post.healthScore / 100))).toFixed(1);
    const healthGrade = post.gradeBadge;
    const healthCls = post.key;

    // --- PERFORMANCE AT A GLANCE: Clean, balanced 2x2 grid ---
    const compPct = c.n > 0 ? ((c.g / c.n) * 100).toFixed(1) + '%' : '–';
    const compBadge = (c.g >= c.n * 0.75) ? '<span class="exec-kpi-badge g">Healthy</span>' : '<span class="exec-kpi-badge r">Below target</span>';
    const breachBadge = br.length === 0 ? '<span class="exec-kpi-badge g">0 breaches</span>' : '<span class="exec-kpi-badge r">' + br.length + ' breached</span>';
    const netMovVal = (gains.length - slips.length);
    const netMovBadge = netMovVal >= 0 ? '<span class="exec-kpi-badge g">+' + gains.length + ' gain</span>' : '<span class="exec-kpi-badge r">-' + slips.length + ' slip</span>';
    const topDriver = drivers[0];

    // 3. Where Is the Risk?
    const offMetrics = scored.filter(r => r.rag[m] === -1);
    const nearMetrics = scored.filter(r => r.rag[m] === 0);
    const domainCounts = [
      { name: 'Endpoint & Patch Security', count: offMetrics.filter(r => /Endpoint|Patch|Device/i.test(r.name)).length },
      { name: 'Identity & Access', count: offMetrics.filter(r => /MFA|Identity|Privileged|Password/i.test(r.name)).length },
      { name: 'Service Desk & SLAs', count: offMetrics.filter(r => /SLA|Ticket|Fix|Response/i.test(r.name)).length },
      { name: 'Threats & Governance', count: offMetrics.filter(r => /Threat|Incident|Vulnerab|Backup|Audit/i.test(r.name)).length }
    ];
    const maxDomainCount = Math.max(1, ...domainCounts.map(d => d.count));

    return '<div class="stack">' +
      '<div class="exec-hero">' +
        '<section class="card exec-status-card" aria-label="Executive Health & Overall Status">' +
          '<div class="exec-status-header">' +
            '<div class="exec-radial-meter" title="Security Health Score: ' + post.healthScore + '/100">' +
              '<svg class="exec-radial-svg" viewBox="0 0 86 86">' +
                '<circle fill="none" class="exec-radial-bg" cx="43" cy="43" r="35" stroke="var(--line-soft)" stroke-width="7" />' +
                '<circle fill="none" class="exec-radial-fill ' + healthCls + '" cx="43" cy="43" r="35" stroke="' + post.color + '" stroke-width="7" stroke-dasharray="219.9" stroke-dashoffset="' + radialOffset + '" />' +
              '</svg>' +
              '<div class="exec-radial-text">' +
                '<span class="exec-radial-val">' + post.healthScore + '</span>' +
                '<span class="exec-radial-sub">Health</span>' +
              '</div>' +
            '</div>' +
            '<div class="exec-status-info">' +
              '<span class="lbl">Overall status · ' + FULL[m] + ' ' + state.year + '</span>' +
              '<div style="display:flex;align-items:center;gap:8px;margin-top:2px">' +
                '<span class="word ' + k + '" style="font-size:26px;font-weight:800;line-height:1">' + (rag || 'No data') + '</span>' +
                '<span class="exec-kpi-badge ' + healthCls + '">' + healthGrade + '</span>' +
              '</div>' +
              '<p style="font-size:12.5px;margin:4px 0 0;color:var(--muted);line-height:1.4">' + sentence + '</p>' +
            '</div>' +
          '</div>' +
          postureTrendHtml +
        '</section>' +

        '<section class="card exec-kpi-panel" aria-label="Performance at a glance">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
            '<h2 class="h2" style="margin:0">Performance at a glance</h2>' +
            '<span class="sub" style="margin:0">Key performance indicators</span>' +
          '</div>' +
          '<div class="exec-kpi-grid">' +
            '<div class="exec-kpi-card">' +
              '<div class="exec-kpi-title"><span class="exec-kpi-label">Target Compliance</span>' + compBadge + '</div>' +
              '<div class="exec-kpi-val">' + compPct + '</div>' +
              '<div class="exec-kpi-sub">' + c.g + ' on target of ' + c.n + ' scored</div>' +
            '</div>' +
            '<div class="exec-kpi-card">' +
              '<div class="exec-kpi-title"><span class="exec-kpi-label">Zero Tolerance</span>' + breachBadge + '</div>' +
              '<div class="exec-kpi-val" style="color:' + (br.length ? 'var(--r)' : 'var(--g)') + '">' + br.length + '</div>' +
              '<div class="exec-kpi-sub">' + (br.length ? br[0].name.replace(/ %$/, '') + ' breach' : 'No tolerance breaches') + '</div>' +
            '</div>' +
            '<div class="exec-kpi-card">' +
              '<div class="exec-kpi-title"><span class="exec-kpi-label">MoM Movement</span>' + netMovBadge + '</div>' +
              '<div class="exec-kpi-val">' + (gains.length - slips.length >= 0 ? '+' : '') + (gains.length - slips.length) + '</div>' +
              '<div class="exec-kpi-sub">+' + gains.length + ' improved · -' + slips.length + ' slipped</div>' +
            '</div>' +
            (topDriver ?
              '<button type="button" class="exec-kpi-card interactive" data-open="' + topDriver.r + '" title="Inspect ' + topDriver.name + '">' +
                '<div class="exec-kpi-title"><span class="exec-kpi-label">Top Attention</span><span class="exec-kpi-badge r">Rank #1</span></div>' +
                '<div class="exec-kpi-val text-val" title="' + topDriver.name + '">' + topDriver.name.replace(/ % of estate$/, '').replace(/ %$/, '') + '</div>' +
                '<div class="exec-kpi-sub">' + fmt(topDriver, topDriver.v[m]) + ' · Target ' + target(topDriver) + '</div>' +
              '</button>' :
              '<div class="exec-kpi-card">' +
                '<div class="exec-kpi-title"><span class="exec-kpi-label">Top Attention</span><span class="exec-kpi-badge g">Clear</span></div>' +
                '<div class="exec-kpi-val text-val" style="color:var(--g)">All on target</div>' +
                '<div class="exec-kpi-sub">No metrics off target</div>' +
              '</div>'
            ) +
          '</div>' +
        '</section>' +
      '</div>' +
  (function () {
        const secNames = ['Endpoint protection coverage %', 'Patch compliance %', 'MFA coverage %', 'Patch deployment success rate %', 'Devices not reporting % of estate', 'Devices with outdated protection % of estate'];
        const srvNames = ['P1 response SLA %', 'P2 response SLA %', 'Resolution SLA %', 'First-time fix rate %', 'Recommendations completion %'];
        const allTargetRows = [...secNames, ...srvNames].map(fl).filter(Boolean);
        const onTarget = allTargetRows.filter(r => r.rag[m] === 1).length;
        const nearTarget = allTargetRows.filter(r => r.rag[m] === 0).length;
        const offTarget = allTargetRows.filter(r => r.rag[m] === -1).length;
        const totCount = allTargetRows.length || 1;
        const onPct = ((onTarget / totCount) * 100).toFixed(1);
        const nearPct = ((nearTarget / totCount) * 100).toFixed(1);
        const offPct = ((offTarget / totCount) * 100).toFixed(1);

        const renderPerfRow = r => {
          if (!r) return '';
          const v = r.v[m], x = r.rag[m];
          const isLower = r.dir === 'Lower';
          const maxVal = isLower ? Math.max(0.12, (r.target || 0.02) * 3, (typeof v === 'number' ? v : 0) * 1.25) : 1;
          const w = typeof v === 'number' ? Math.min(100, Math.max(0, (v / maxVal) * 100)) : 0;
          const t = typeof r.target === 'number' ? Math.min(100, Math.max(0, (r.target / maxVal) * 100)) : 0;
          const pillLabel = label(r, x);
          const pillCls = cls(x);
          return '<button type="button" class="perf-row" data-open="' + r.r + '" title="View ' + r.name + ' history">' +
            '<div class="perf-metric-name">' +
              '<b>' + r.name.replace(/ % of estate$/, '').replace(/ %$/, '') + '</b>' +
              '<small>Target ' + target(r) + '</small>' +
            '</div>' +
            '<div class="perf-gauge" title="Actual: ' + fmt(r, v) + ' | Target: ' + target(r) + '">' +
              '<div class="perf-gauge-fill ' + pillCls + '" style="width:' + w.toFixed(1) + '%"></div>' +
              '<div class="perf-gauge-target" style="left:' + t.toFixed(1) + '%"></div>' +
            '</div>' +
            '<div class="perf-val">' + fmt(r, v) + '</div>' +
            '<div class="perf-pill ' + pillCls + '"><i class="pdot"></i>' + pillLabel + '</div>' +
          '</button>';
        };

        const renderDomain = (title, badge, names) => {
          const rows = names.map(fl).filter(Boolean);
          return '<div class="perf-domain">' +
            '<div class="perf-domain-header">' +
              '<span class="perf-domain-title">' + title + '</span>' +
              '<span class="perf-domain-badge">' + badge + '</span>' +
            '</div>' +
            '<div class="perf-domain-cols">' +
              '<span>Measure</span>' +
              '<span>Vs target</span>' +
              '<span style="text-align:right">Actual</span>' +
              '<span style="text-align:center">Status</span>' +
            '</div>' +
            rows.map(renderPerfRow).join('') +
          '</div>';
        };

        return '<section class="card perf-card" aria-label="Performance against target">' +
          '<div class="perf-card-head">' +
            '<div>' +
              '<h2 class="h2" style="margin-bottom:2px">Performance against target · ' + FULL[m] + '</h2>' +
              '<p class="sub" style="margin:0">Key operational and security indicators</p>' +
            '</div>' +
            '<div class="perf-summary-group">' +
              '<span class="perf-badge g"><span class="dot"></span>' + onTarget + ' On target</span>' +
              (nearTarget > 0 ? '<span class="perf-badge a"><span class="dot"></span>' + nearTarget + ' Near target</span>' : '') +
              '<span class="perf-badge r"><span class="dot"></span>' + offTarget + ' Off target</span>' +
            '</div>' +
          '</div>' +
          '<div class="perf-dist-bar" title="' + onTarget + ' On target, ' + nearTarget + ' Near, ' + offTarget + ' Off target">' +
            '<div class="perf-dist-seg g" style="width:' + onPct + '%"></div>' +
            '<div class="perf-dist-seg a" style="width:' + nearPct + '%"></div>' +
            '<div class="perf-dist-seg r" style="width:' + offPct + '%"></div>' +
          '</div>' +
          '<div class="perf-grid">' +
            renderDomain('Security posture', '6 metrics', secNames) +
            renderDomain('Service levels', '5 metrics', srvNames) +
          '</div>' +
        '</section>';
      })() +

      (function () {
        const mEnd = fl('Managed endpoints')?.v[m] || 0;
        const mobEnd = fl('Mobile devices - VPN')?.v[m] || 0;
        const dNotRep = fl('Devices not reporting')?.v[m] || 0;
        const dOutdated = fl('Devices with outdated protection')?.v[m] || 0;
        const pNotRep = fl('Devices not reporting % of estate')?.v[m] || 0;
        const pOutdated = fl('Devices with outdated protection % of estate')?.v[m] || 0;
        const pNotRepPct = (pNotRep * 100);
        const pOutdatedPct = (pOutdated * 100);
        const pHealthyPct = Math.max(0, 100 - (pNotRepPct + pOutdatedPct));
        const totEstateDevices = mEnd + mobEnd;

        return '<div class="blk"><div class="bt"><h2>Estate coverage &amp; infrastructure security</h2><span class="sub">Fleet composition, device connectivity, and endpoint protection health</span></div>' +
          '<section class="card estate-card" aria-label="Estate health and device coverage">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">' +
              '<div><span style="font-size:14px;font-weight:700;color:var(--ink)">Device Protection Composition</span><span style="font-size:12px;color:var(--muted);margin-left:8px">' + totEstateDevices + ' total enrolled devices (' + mEnd + ' endpoints + ' + mobEnd + ' mobile VPN)</span></div>' +
              '<div class="estate-legend">' +
                '<span><i style="background:#10b981"></i>Fully Healthy (' + pHealthyPct.toFixed(1) + '%)</span>' +
                '<span><i style="background:#f59e0b"></i>Outdated (' + pOutdatedPct.toFixed(1) + '%)</span>' +
                '<span><i style="background:#ef4444"></i>Non-Reporting (' + pNotRepPct.toFixed(1) + '%)</span>' +
              '</div>' +
            '</div>' +
            '<div class="estate-bar-wrap">' +
              '<div class="estate-seg-bar" title="Estate: ' + pHealthyPct.toFixed(1) + '% healthy, ' + pOutdatedPct.toFixed(1) + '% outdated, ' + pNotRepPct.toFixed(1) + '% non-reporting">' +
                '<div class="estate-seg healthy" style="width:' + pHealthyPct.toFixed(1) + '%"></div>' +
                '<div class="estate-seg warning" style="width:' + pOutdatedPct.toFixed(1) + '%"></div>' +
                '<div class="estate-seg danger" style="width:' + pNotRepPct.toFixed(1) + '%"></div>' +
              '</div>' +
            '</div>' +
            '<div class="estate-tiles-grid">' +
              '<div class="estate-tile"><span class="tl">Managed Endpoints</span><span class="vl">' + mEnd + '</span><span class="sub">' + (delta(fl('Managed endpoints'), m) || 'Estate count') + '</span></div>' +
              '<div class="estate-tile"><span class="tl">Mobile Devices (VPN)</span><span class="vl">' + mobEnd + '</span><span class="sub">' + (delta(fl('Mobile devices - VPN'), m) || 'MDM enrolled') + '</span></div>' +
              '<div class="estate-tile"><span class="tl">Outdated Protection</span><span class="vl" style="color:' + (pOutdated > 0.02 ? 'var(--r)' : 'var(--g)') + '">' + pOutdatedPct.toFixed(1) + '%</span><span class="sub">' + dOutdated + ' devices affected</span></div>' +
              '<div class="estate-tile"><span class="tl">Non-Reporting</span><span class="vl" style="color:' + (pNotRep > 0.02 ? 'var(--r)' : 'var(--g)') + '">' + pNotRepPct.toFixed(1) + '%</span><span class="sub">' + dNotRep + ' devices silent</span></div>' +
            '</div>' +
          '</section>' +
        '</div>';
      })() +

      '<div class="blk"><div class="bt"><h2>Where is the risk? · Areas requiring attention</h2><span class="sub">Risk distribution and proactive watchlist</span></div>' +
        '<div class="risk-radar-grid">' +
          '<section class="card" aria-label="Risk distribution">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
              '<h2 class="h2" style="margin:0">Risk distribution</h2>' +
              '<span class="sub" style="margin:0">' + offMetrics.length + ' metrics off target</span>' +
            '</div>' +
            '<div class="risk-domains-list">' +
              domainCounts.map(d => {
                const p = Math.round((d.count / maxDomainCount) * 100);
                const colorCls = d.count === 0 ? 'g' : (d.count <= 2 ? 'a' : 'r');
                return '<div class="risk-domain-item">' +
                  '<div class="risk-domain-top"><span>' + d.name + '</span><span>' + d.count + ' ' + (d.count === 1 ? 'risk' : 'risks') + '</span></div>' +
                  '<div class="risk-domain-progress"><div class="risk-domain-fill ' + colorCls + '" style="width:' + (d.count > 0 ? Math.max(12, p) : 0) + '%"></div></div>' +
                '</div>';
              }).join('') +
            '</div>' +
          '</section>' +

          '<section class="card" aria-label="Critical attention and watchlist">' +
            '<div class="risk-alerts-container">' +
              '<div class="risk-alert-card critical">' +
                '<div class="risk-alert-head">' +
                  '<span class="risk-alert-title"><span style="color:var(--r)">●</span> Critical attention</span>' +
                  '<span class="risk-alert-badge r">' + offMetrics.length + ' off target</span>' +
                '</div>' +
                '<div class="risk-items-list">' +
                  (offMetrics.length ? offMetrics.slice(0, 5).map(r =>
                    '<button type="button" class="risk-item-row" data-open="' + r.r + '" title="Inspect ' + r.name + '">' +
                      '<span class="risk-item-name">' + r.name.replace(/ % of estate$/, '').replace(/ %$/, '') + '</span>' +
                      '<span class="risk-item-val" style="color:var(--r)">' + fmt(r, r.v[m]) + ' <small style="font-weight:400;color:var(--muted)">(' + target(r) + ')</small></span>' +
                    '</button>'
                  ).join('') : '<p class="empty" style="margin:6px 0 0">No critical breaches this month.</p>') +
                '</div>' +
              '</div>' +

              '<div class="risk-alert-card watchlist">' +
                '<div class="risk-alert-head">' +
                  '<span class="risk-alert-title"><span style="color:var(--a)">●</span> Watchlist (Near target)</span>' +
                  '<span class="risk-alert-badge a">' + nearMetrics.length + ' near target</span>' +
                '</div>' +
                '<div class="risk-items-list">' +
                  (nearMetrics.length ? nearMetrics.slice(0, 5).map(r =>
                    '<button type="button" class="risk-item-row" data-open="' + r.r + '" title="Inspect ' + r.name + '">' +
                      '<span class="risk-item-name">' + r.name.replace(/ % of estate$/, '').replace(/ %$/, '') + '</span>' +
                      '<span class="risk-item-val" style="color:var(--a)">' + fmt(r, r.v[m]) + ' <small style="font-weight:400;color:var(--muted)">(' + target(r) + ')</small></span>' +
                    '</button>'
                  ).join('') : '<p class="empty" style="margin:6px 0 0">No watchlist measures this month.</p>') +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +
        '</div>' +
      '</div>' +

      '<div class="blk"><div class="bt"><h2>Incident overview &amp; monthly trends</h2><span class="sub">Incident volumes and SLA delivery over time</span></div>' +
        (function() {
          const secInc = fl('Security incidents raised');
          const tktRes = fl('Incidents resolved');
          let incDeltaCallout = '<span class="incident-callout n">● Steady volume</span>';
          let incDeltaText = 'Steady volume';
          const curIncVal = typeof secInc?.v?.[m] === 'number' ? secInc.v[m] : 0;
          const curTktVal = typeof tktRes?.v?.[m] === 'number' ? tktRes.v[m] : 0;
          const prevIncVal = (prev >= 1 && typeof secInc?.v?.[prev] === 'number') ? secInc.v[prev] : 0;
          const prevTktVal = (prev >= 1 && typeof tktRes?.v?.[prev] === 'number') ? tktRes.v[prev] : 0;
          const incDiff = curIncVal - prevIncVal;
          const tktDiff = curTktVal - prevTktVal;
          const netClearance = curTktVal - curIncVal;

          if (prev >= 1) {
            if (incDiff > 0) {
              incDeltaCallout = '<span class="incident-callout r">▲ +' + incDiff + ' vs ' + MON[prev] + '</span>';
              incDeltaText = '+' + incDiff + ' vs ' + MON[prev];
            } else if (incDiff < 0) {
              incDeltaCallout = '<span class="incident-callout g">▼ −' + Math.abs(incDiff) + ' vs ' + MON[prev] + '</span>';
              incDeltaText = '−' + Math.abs(incDiff) + ' vs ' + MON[prev];
            } else {
              incDeltaCallout = '<span class="incident-callout g">● 0 vs ' + MON[prev] + '</span>';
              incDeltaText = '0 vs ' + MON[prev];
            }
          }

          const tktDeltaText = prev >= 1 ? (tktDiff >= 0 ? '+' + tktDiff + ' vs ' + MON[prev] : tktDiff + ' vs ' + MON[prev]) : 'Baseline';
          const maxIncVal = Math.max(10, ...statusMonths.map(i => Math.max(secInc?.v?.[i] || 0, 1)));
          const maxTktVal = Math.max(12, ...statusMonths.map(i => Math.max(tktRes?.v?.[i] || 0, 1)));
          const barScaleMax = Math.max(maxIncVal, maxTktVal, 12);

          let incidentNarrative = '';
          if (curTktVal >= curIncVal) {
            incidentNarrative = 'Operational resolution capacity is robust with ' + curTktVal + ' tickets closed against ' + curIncVal + ' security incidents, maintaining positive estate clearance in ' + FULL[m] + '.';
          } else {
            incidentNarrative = curIncVal + ' security incidents logged with ' + curTktVal + ' closed; triage actively containment-focused to address remaining backlog in ' + FULL[m] + '.';
          }

          return '<div class="incident-grid">' +
            '<section class="card incident-trend-card" aria-label="Incident volume trend">' +
              '<div class="incident-trend-header">' +
                '<div><h2 class="h2" style="margin-bottom:2px">Incident trend &amp; volume</h2><span class="sub" style="margin:0">Security incidents vs tickets resolved</span></div>' +
                incDeltaCallout +
              '</div>' +
              '<div class="incident-bars-container">' +
                statusMonths.map(i => {
                  const inc = secInc?.v?.[i] || 0;
                  const tkt = tktRes?.v?.[i] || 0;
                  const hInc = Math.max(6, Math.min(130, Math.round((inc / barScaleMax) * 130)));
                  const hTkt = Math.max(6, Math.min(130, Math.round((tkt / barScaleMax) * 130)));
                  const isActive = (i === m);
                  return '<div class="incident-bar-month ' + (isActive ? 'active' : '') + '">' +
                    '<div class="incident-dual-bars" title="' + MON[i] + ': ' + inc + ' security incidents, ' + tkt + ' tickets resolved">' +
                      '<div class="incident-col raised" style="height:' + hInc + 'px" title="Security Incidents: ' + inc + '">' +
                        '<span class="bar-num">' + inc + '</span>' +
                      '</div>' +
                      '<div class="incident-col resolved" style="height:' + hTkt + 'px" title="Tickets Resolved: ' + tkt + '">' +
                        '<span class="bar-num">' + tkt + '</span>' +
                      '</div>' +
                    '</div>' +
                    '<span class="incident-bar-label">' + MON[i] + '</span>' +
                    '<span class="incident-bar-counts">' + inc + ' / ' + tkt + '</span>' +
                  '</div>';
                }).join('') +
              '</div>' +
              '<div class="incident-legend">' +
                '<span><i style="background:var(--r, #ef4444)"></i>Security Incidents</span>' +
                '<span><i style="background:#2563eb"></i>Tickets Resolved</span>' +
                '<span style="margin-left:auto;font-size:11.5px;font-weight:600;color:var(--muted)">' + curIncVal + ' incidents · ' + curTktVal + ' resolved in ' + MON[m] + '</span>' +
              '</div>' +
              '<div class="incident-insights-panel">' +
                '<div class="incident-insight-item">' +
                  '<span class="ii-label">Security Incidents</span>' +
                  '<span class="ii-val r">' + curIncVal + '</span>' +
                  '<span class="ii-sub">' + incDeltaText + '</span>' +
                '</div>' +
                '<div class="incident-insight-item">' +
                  '<span class="ii-label">Tickets Resolved</span>' +
                  '<span class="ii-val b">' + curTktVal + '</span>' +
                  '<span class="ii-sub">' + tktDeltaText + '</span>' +
                '</div>' +
                '<div class="incident-insight-item">' +
                  '<span class="ii-label">Net Clearance</span>' +
                  '<span class="ii-val ' + (netClearance >= 0 ? 'g' : 'r') + '">' + (netClearance >= 0 ? '+' + netClearance : netClearance) + '</span>' +
                  '<span class="ii-sub">' + (netClearance >= 0 ? 'Net clearance' : 'Backlog accumulated') + '</span>' +
                '</div>' +
              '</div>' +
              '<div class="incident-narrative-note">' +
                '<i class="ii-info-icon">ℹ</i>' +
                '<span>' + incidentNarrative + '</span>' +
              '</div>' +
            '</section>' +

            '<section class="card incident-sla-card" aria-label="Response and resolution performance">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
                '<div><h2 class="h2" style="margin-bottom:2px">Response &amp; resolution performance</h2><span class="sub" style="margin:0">Key operational service levels</span></div>' +
                '<span class="perf-badge g" style="font-size:11px"><span class="dot"></span>SLAs</span>' +
              '</div>' +
              '<div style="display:flex;flex-direction:column;gap:8px">' +
                ['P1 response SLA %', 'P2 response SLA %', 'Resolution SLA %', 'First-time fix rate %', 'Recommendations completion %'].map(fl).filter(Boolean).map(r => {
                  const v = r.v[m], x = r.rag[m];
                  const pctVal = typeof v === 'number' ? Math.min(100, Math.max(0, v * 100)) : 0;
                  const tgtVal = typeof r.target === 'number' ? Math.min(100, r.target * 100) : 0;
                  return '<button type="button" class="perf-row" data-open="' + r.r + '" style="grid-template-columns:minmax(0, 1.4fr) minmax(80px, 1fr) 48px 76px;padding:6px 6px" title="View ' + r.name + '">' +
                    '<div class="perf-metric-name"><b style="font-size:12.5px">' + r.name.replace(/ %$/, '') + '</b><small>' + target(r) + '</small></div>' +
                    '<div class="perf-gauge" style="height:7px"><div class="perf-gauge-fill ' + cls(x) + '" style="width:' + pctVal.toFixed(1) + '%"></div><div class="perf-gauge-target" style="left:' + tgtVal.toFixed(1) + '%"></div></div>' +
                    '<div class="perf-val" style="font-size:13px">' + fmt(r, v) + '</div>' +
                    '<div class="perf-pill ' + cls(x) + '" style="font-size:10px;padding:2px 6px">' + label(r, x) + '</div>' +
                  '</button>';
                }).join('') +
              '</div>' +
              '<div class="sla-radial-grid">' +
                [
                  { label: 'Resolution SLA', r: fl('Resolution SLA %') },
                  { label: 'First-Time Fix', r: fl('First-time fix rate %') },
                  { label: 'P2 Response', r: fl('P2 response SLA %') },
                  { label: 'P1 Response', r: fl('P1 response SLA %') }
                ].map(s => {
                  const row = s.r;
                  if (!row) return '';
                  const v = row.v[m];
                  const p = typeof v === 'number' ? Math.min(100, Math.max(0, v * 100)) : 0;
                  const off = (150.8 * (1 - (p / 100))).toFixed(1);
                  const colorCls = cls(row.rag[m]);
                  return '<button type="button" class="sla-radial-card" data-open="' + row.r + '" title="View ' + row.name + '">' +
                    '<div class="sla-radial-meter">' +
                      '<svg class="sla-radial-svg" viewBox="0 0 64 64">' +
                        '<circle fill="none" class="exec-radial-bg" cx="32" cy="32" r="24" stroke-width="5" />' +
                        '<circle fill="none" class="exec-radial-fill ' + colorCls + '" cx="32" cy="32" r="24" stroke-width="5" stroke-dasharray="150.8" stroke-dashoffset="' + off + '" />' +
                      '</svg>' +
                      '<span class="sla-radial-val">' + fmt(row, v) + '</span>' +
                    '</div>' +
                    '<span class="sla-radial-lbl">' + s.label + '</span>' +
                  '</button>';
                }).join('') +
              '</div>' +
            '</section>' +
          '</div>';
        })() +
      '</div>' +
  (function () {
        const matrixPillars = [
          { label: 'Endpoint Protection', metric: 'Endpoint protection coverage %' },
          { label: 'Patch Compliance', metric: 'Patch compliance %' },
          { label: 'Identity & MFA Coverage', metric: 'MFA coverage %' },
          { label: 'Detection Speed (MTTD)', metric: 'Mean time to detect (hours)' },
          { label: 'Resolution SLA', metric: 'Resolution SLA %' },
          { label: 'First-Time Fix Rate', metric: 'First-time fix rate %' }
        ];

        return '<div class="blk"><div class="bt"><h2>Security activity &amp; multi-month matrix</h2><span class="sub">Historical trajectory across core security domains</span></div>' +
          '<section class="card matrix-card" aria-label="Security Activity Heatmap Matrix">' +
            '<table class="matrix-table">' +
              '<thead>' +
                '<tr>' +
                  '<th class="l">Core Security Pillar</th>' +
                  '<th>Target</th>' +
                  statusMonths.map(i => '<th class="' + (i === m ? 'matrix-col-active' : '') + '">' + MON[i] + ' ' + (i === m ? '★' : '') + '</th>').join('') +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                matrixPillars.map(p => {
                  const r = fl(p.metric);
                  if (!r) return '';
                  return '<tr class="matrix-row" data-open="' + r.r + '" title="Click to view history for ' + r.name + '">' +
                    '<td class="matrix-pillar-info"><b>' + p.label + '</b><small>' + r.name.replace(/ %$/, '') + '</small></td>' +
                    '<td style="text-align:center;font-size:11.5px;color:var(--muted)">' + target(r) + '</td>' +
                    statusMonths.map(i => {
                      const val = r.v[i];
                      const ragVal = r.rag[i];
                      const clsVal = cls(ragVal);
                      const isAct = (i === m);
                      return '<td class="' + (isAct ? 'matrix-col-active' : '') + '"><div class="matrix-cell-wrap"><span class="matrix-pill ' + clsVal + '">' + fmt(r, val) + '</span></div></td>';
                    }).join('') +
                  '</tr>';
                }).join('') +
              '</tbody>' +
            '</table>' +
          '</section>' +
        '</div>';
      })() +

      '<div class="blk"><div class="bt"><h2>Service delivered</h2><span class="sub">Work completed for you in ' + FULL[m] + '</span></div>' +
        '<div class="stats3">' + stat('Threats blocked', 'Threats blocked') + stat('Security incidents raised', 'Security incidents raised', 'P1: ' + (fl('P1 security incidents')?.v[m] ?? '0') + ' · Ransomware: ' + (fl('Ransomware detections')?.v[m] ?? '0')) + stat('Vulnerabilities remediated', 'Vulnerabilities fixed') + stat('Successful patch deployments', 'Patch deployments completed') + stat('Incidents resolved', 'Tickets resolved') + stat('Recommendations completed', 'Recommendations completed') + '</div></div>' +

      '<div class="blk"><div class="bt"><h2>Changes since ' + (prev >= 1 ? FULL[prev] : (state.data?.prevMonth ? 'last month' : 'previous month')) + '</h2><span class="sub">Metrics that moved to a better or worse status</span></div>' +
        '<div class="lists">' +
          '<section class="card"><h2 class="h2">Slipped</h2>' + (prev >= 1 && slips.length ? li(top(slips), chg) : '<p class="empty">' + (prev >= 1 ? 'No metric moved to a worse status.' : 'First month of data, nothing to compare.') + '</p>') + '</section>' +
          '<section class="card"><h2 class="h2">Improved</h2>' + (prev >= 1 && gains.length ? li(top(gains), chg) : '<p class="empty">' + (prev >= 1 ? 'No metric moved to a better status.' : 'First month of data, nothing to compare.') + '</p>') + '</section>' +
        '</div></div>' +

      '<section class="card" id="commentary"><h2 class="h2">Month in review · ' + FULL[m] + ' ' + state.year + '</h2><p class="sub">Written by the service team</p>' +
        '<div class="cm">' + [['risks', 'Top risks'], ['improvements', 'Improvements delivered'], ['actions', 'Planned actions next month']].map(f => '<div><h3 class="cl">' + f[1] + '</h3><ul class="cmu">' + (((COMMENT[m] || {})[f[0]] || []).map(t => '<li>' + t + '</li>').join('') || '<li class="empty">Nothing recorded for this month yet.</li>') + '</ul></div>').join('') + '</div>' +
      '</section>' +
    '</div>';
  }

  function scorecard() {
    const m = state.m;
    return '<section class="card"><h2 class="h2">Scorecard</h2><p class="sub">All ' + scored.length + ' scored metrics by month, grouped by weight. Select a row for its trend and definition.</p>' +
      '<div class="legend2"><span><i style="background:var(--g-soft);border:1px solid var(--g)"></i>On target</span><span><i style="background:var(--a-soft);border:1px solid var(--a)"></i>Within 10% of target</span><span><i style="background:var(--r-soft);border:1px solid var(--r)"></i>Off target</span></div>' +
      '<div class="scroll"><table class="sc"><thead><tr><th class="l">Metric</th><th>Target</th>' + CHART_MONTHS.map(i => '<th>' + MON[i] + '</th>').join('') + '</tr></thead><tbody>' + scorecardRows(m) + '</tbody></table></div></section>' +
      '<section class="card" style="margin-top:16px"><h2 class="h2">How the month’s status is decided</h2>' +
        '<ul style="margin:8px 0 0;padding-left:18px;display:flex;flex-direction:column;gap:4px">' +
          '<li>Each measure is scored On target, Within 10% of target, or Off target.</li>' +
          '<li>Any zero-tolerance breach turns the whole month Red.</li>' +
          '<li>Otherwise the measures vote. High-weight measures count most, then Medium, then Low.</li>' +
          '<li>More weight on target than off target gives Green. An even balance gives Amber. Otherwise the month is Red.</li></ul></section>';
  }

  function scorecardRows(m) {
    const groups = [['Zero tolerance', 'Any breach turns the month Red'], ['High', 'Real security or response impact'], ['Medium', 'Standard operational measures'], ['Low', 'Process and admin measures, which count least']];
    let out = '';
    groups.forEach(([t, d]) => {
      const rows = scored.filter(r => tier(r) === t);
      if (!rows.length) return;
      out += '<tr class="sec"><td colspan="' + (CHART_MONTHS.length + 2) + '">' + t + ' · ' + rows.length + ' measures <span class="meta" style="font-weight:400;letter-spacing:0">&nbsp;' + d + '</span></td></tr>';
      rows.forEach(r => {
        out += '<tr class="m" data-open="' + r.r + '"><td class="l">' + r.name + '</td><td class="meta">' + target(r) + '</td>' +
          CHART_MONTHS.map(i => '<td><span class="cell ' + cls(r.rag[i]) + ' ' + (i === m ? 'sel' : '') + '">' + fmt(r, r.v[i]) + '</span></td>').join('') + '</tr>';
      });
    });
    return out;
  }

  function section(tab) {
    const m = state.m;
    let out = '';
    tab.secs.forEach(name => {
      const rows = flat.filter(r => r.sec === name);
      const sc = rows.filter(r => r.scored);
      const g = sc.filter(r => r.rag[m] === 1).length, bad = sc.filter(r => r.rag[m] === -1).length;
      out += '<div class="sechead"><h2>' + name + '</h2><span class="sub">' + (sc.length ? g + ' of ' + sc.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') : 'Volume metrics, no targets') + '</span></div><div class="cards">' +
        rows.map(r => '<button class="mc" data-open="' + r.r + '"><div class="hd"><span class="nm">' + r.name + (SAMPLE.has(r.name) ? '<span class="tag">Sample</span>' : '') + '</span>' + pill(r, r.scored ? r.rag[m] : null) + '</div><div class="val">' + fmt(r, r.v[m]) + '</div><div class="row"><span>' + (delta(r, m) || '&nbsp;') + '</span><span>' + target(r) + '</span></div>' + spark(r, m) + '</button>').join('') + '</div>';
    });
    return out;
  }

  const EPH = ['Endpoint protection coverage %', 'Devices not reporting % of estate', 'Devices with outdated protection % of estate'];
  const EPP = ['Critical patches outstanding', 'High patches outstanding', 'Avg days to critical patch'];

  function mcard(r, m, extra) {
    const cl = extra || behind(r, m), nm = r.name.replace(/ % of estate$/, '').replace(/ %$/, '');
    return '<button class="mc" data-open="' + r.r + '"><div class="hd"><span class="nm">' + nm + '</span>' + pill(r, r.rag[m]) + '</div><div class="val">' + fmt(r, r.v[m]) + '</div>' + (cl ? '<div class="row"><span>' + cl + '</span><span></span></div>' : '') + '<div class="row"><span>' + (delta(r, m) || '&nbsp;') + '</span><span>' + target(r) + '</span></div>' + spark(r, m) + '</button>';
  }

  function endpointsView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const rs = [...EPH, ...EPP, 'Patch compliance %', 'Patch deployment success rate %'].map(fl);
    const g = rs.filter(r => r.rag[m] === 1).length, bad = rs.filter(r => r.rag[m] === -1).length;
    const me = fl('Managed endpoints'), mo = fl('Mobile devices - VPN'), ne = fl('New endpoints'), rm = fl('Removed endpoints');
    const tile = (r, t) => '<button class="stat" data-open="' + r.r + '"><div class="t">' + t + '</div><div class="v">' + fmt(r, r.v[m]) + '</div><div class="d">' + (delta(r, m) || '&nbsp;') + '</div></button>';
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';

    // 1. PATCH COMPLIANCE METRICS
    const pc = fl('Patch compliance %');
    const pcHelper = pc?.helpers?.[0];
    const totalAssessed = (me && typeof me.v[m] === 'number') ? me.v[m] : 45;
    const compEndpoints = (pcHelper && typeof pcHelper.v[m] === 'number') ? pcHelper.v[m] : (typeof pc?.v[m] === 'number' ? Math.round(pc.v[m] * totalAssessed) : 42);
    const nonCompEndpoints = Math.max(0, totalAssessed - compEndpoints);
    const pcPctVal = (typeof pc?.v[m] === 'number') ? (pc.v[m] * 100).toFixed(1) : '–';
    const pcTarget = 95;
    const pcIsOnTarget = typeof pc?.v[m] === 'number' && (pc.v[m] * 100) >= pcTarget;
    const pcStatusBadge = pcIsOnTarget
      ? '<span class="score-badge-status optimal">● Target Achieved</span>'
      : '<span class="score-badge-status warning">● Below Target (95% SLA)</span>';

    // 2. PATCH DEPLOYMENT SUCCESS RATE
    const sr = fl('Patch deployment success rate %');
    const sv = fl('Successful patch deployments');
    const fv = fl('Failed patch deployments');
    const svVal = (typeof sv?.v[m] === 'number') ? sv.v[m] : (state.data?.monthData?.successful_patch_deployments?.computed ?? 55);
    const fvVal = (typeof fv?.v[m] === 'number') ? fv.v[m] : (state.data?.monthData?.failed_patch_deployments?.computed ?? 13);
    const totalDeployments = svVal + fvVal;
    const srPctVal = (typeof sr?.v[m] === 'number') ? (sr.v[m] * 100).toFixed(1) : (totalDeployments > 0 ? ((svVal / totalDeployments) * 100).toFixed(1) : '–');
    const srTarget = 97;
    const srIsOnTarget = typeof sr?.v[m] === 'number' && (sr.v[m] * 100) >= srTarget;
    const srStatusBadge = srIsOnTarget
      ? '<span class="score-badge-status optimal">● Target Met (≥97%)</span>'
      : '<span class="score-badge-status danger">● Below Target (≥97%)</span>';
    const depSuccessPct = totalDeployments > 0 ? ((svVal / totalDeployments) * 100).toFixed(1) : 0;
    const depFailPct = totalDeployments > 0 ? ((fvVal / totalDeployments) * 100).toFixed(1) : 0;

    // 3. DEVICE HEALTH & PROTECTION COVERAGE
    const epc = fl('Endpoint protection coverage %');
    const dnr = fl('Devices not reporting');
    const dop = fl('Devices with outdated protection');
    const epcNum = (state.data?.monthData?.endpoint_protection_coverage_pct?.inputs?.num)
      ?? (typeof epc?.v[m] === 'number' ? Math.round(epc.v[m] * totalAssessed) : 43);
    const dopNum = (state.data?.monthData?.devices_outdated_protection_pct?.inputs?.num)
      ?? (typeof dop?.v[m] === 'number' && dop.v[m] < totalAssessed ? dop.v[m] : 4);
    const dnrNum = (state.data?.monthData?.devices_not_reporting_pct?.inputs?.num)
      ?? (typeof dnr?.v[m] === 'number' ? dnr.v[m] : 3);
    const protCount = epcNum;
    const opCount = dopNum;
    const nrCount = dnrNum;
    const protPct = totalAssessed > 0 ? ((protCount / totalAssessed) * 100).toFixed(1) : '95.6';
    const epcPctVal = (typeof epc?.v[m] === 'number') ? (epc.v[m] * 100).toFixed(1) : '95.6';
    const epcTarget = 98;
    const epcIsOnTarget = parseFloat(epcPctVal) >= epcTarget;

    // 4. PATCHES OUTSTANDING (CENTRAL OBJECTIVE)
    const critRow = fl('Critical patches outstanding');
    const highRow = fl('High patches outstanding');
    const avgDaysRow = fl('Avg days to critical patch');
    const critCount = (typeof critRow?.v[m] === 'number') ? critRow.v[m] : 0;
    const highCount = (typeof highRow?.v[m] === 'number') ? highRow.v[m] : 0;
    const totalOutstanding = critCount + highCount;
    const critPct = totalOutstanding > 0 ? ((critCount / totalOutstanding) * 100).toFixed(1) + '%' : '0%';
    const highPct = totalOutstanding > 0 ? ((highCount / totalOutstanding) * 100).toFixed(1) + '%' : '0%';

    let patchStatusBadge = '';
    if (critCount > 0) {
      patchStatusBadge = '<span class="score-badge-status danger">● Zero-Tolerance Breach (' + critCount + ' Critical)</span>';
    } else if (highCount > 5) {
      patchStatusBadge = '<span class="score-badge-status warning">● Off Target (' + highCount + ' High)</span>';
    } else {
      patchStatusBadge = '<span class="score-badge-status optimal">● Within Target (0 Critical, ' + highCount + ' High)</span>';
    }

    return '<div class="stack">' +
      '<div class="sechead"><h2>Endpoints &amp; Patching</h2><span class="sub">' + g + ' of ' + rs.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      
      '<div class="blk">' + bt('Estate', 'Devices under management at month end') +
        '<div class="stats">' + tile(me, 'Managed endpoints') + tile(mo, 'Mobile devices') + tile(ne, 'New endpoints') + tile(rm, 'Removed endpoints') + '</div></div>' +

      '<div class="blk">' + bt('Patching', 'Compliance posture, deployment outcome breakdown, and monthly trends') +
        '<div class="row2">' +
          // Enhanced Patch Compliance Card
          '<section class="card chart-card comp-posture-card">' +
            '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
              '<div><h2 class="card-title">Patch Compliance</h2><p class="card-sub">Share of endpoints fully patched to policy against the 95% SLA target</p></div>' +
              pcStatusBadge +
            '</div>' +
            '<div class="segmented-compliance-panel">' +
              '<div class="seg-comp-header">' +
                '<span class="seg-comp-val">' + pcPctVal + '%</span>' +
                '<span class="seg-comp-label">Compliant Endpoints (' + compEndpoints + ' of ' + totalAssessed + ')</span>' +
              '</div>' +
              '<div class="segmented-track-container" title="Compliant: ' + compEndpoints + ' (' + pcPctVal + '%), Non-compliant: ' + nonCompEndpoints + '">' +
                '<div class="segmented-track-bar">' +
                  '<div class="seg-fill compliant" style="width:' + Math.min(100, Math.max(0, parseFloat(pcPctVal) || 0)) + '%"></div>' +
                  '<div class="seg-fill non-compliant" style="width:' + Math.min(100, Math.max(0, 100 - (parseFloat(pcPctVal) || 0))) + '%"></div>' +
                  '<div class="seg-target-marker" style="left:95%" title="Target: 95%"></div>' +
                '</div>' +
                '<div class="seg-track-legend">' +
                  '<span class="seg-legend-item"><i class="seg-dot compliant"></i>Compliant: <strong>' + compEndpoints + '</strong></span>' +
                  '<span class="seg-legend-item"><i class="seg-dot non-compliant"></i>Non-compliant: <strong>' + nonCompEndpoints + '</strong></span>' +
                  '<span class="seg-legend-item"><i class="seg-dot target"></i>Target: <strong>95%</strong></span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="lg" style="margin-top:14px"><span><i style="background:var(--g)"></i>Fully patched</span><span><i style="background:var(--r)"></i>Not fully patched</span><span><i class="dash"></i>Target 95%</span></div>' +
            '<div class="chart"><canvas id="e1" role="img" aria-label="Stacked bars of fully patched and not fully patched endpoints by month with a 95 percent target line">Patch compliance by month.</canvas></div>' +
          '</section>' +

          // Enhanced Patch Deployments Card
          '<section class="card chart-card dep-outcome-card">' +
            '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
              '<div><h2 class="card-title">Patch Deployments</h2><p class="card-sub">Deployment outcomes, success rate vs 97% target, and failure counts</p></div>' +
              srStatusBadge +
            '</div>' +
            '<div class="segmented-compliance-panel">' +
              '<div class="seg-comp-header">' +
                '<span class="seg-comp-val ' + (srIsOnTarget ? 'g' : 'r') + '">' + srPctVal + '%</span>' +
                '<span class="seg-comp-label">Success Rate (' + svVal + ' succeeded, ' + fvVal + ' failed of ' + totalDeployments + ')</span>' +
              '</div>' +
              '<div class="segmented-track-container" title="Succeeded: ' + svVal + ' (' + depSuccessPct + '%), Failed: ' + fvVal + ' (' + depFailPct + '%)">' +
                '<div class="segmented-track-bar">' +
                  '<div class="seg-fill succeeded" style="width:' + depSuccessPct + '%"></div>' +
                  '<div class="seg-fill failed" style="width:' + depFailPct + '%"></div>' +
                  '<div class="seg-target-marker" style="left:97%" title="Target: 97%"></div>' +
                '</div>' +
                '<div class="seg-track-legend">' +
                  '<span class="seg-legend-item"><i class="seg-dot succeeded"></i>Succeeded: <strong>' + svVal + '</strong></span>' +
                  '<span class="seg-legend-item"><i class="seg-dot failed"></i>Failed: <strong>' + fvVal + '</strong></span>' +
                  '<span class="seg-legend-item"><i class="seg-dot target"></i>Target: <strong>≥ 97%</strong></span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="lg" style="margin-top:14px"><span><i style="background:var(--s1)"></i>Succeeded</span><span><i style="background:var(--r)"></i>Failed</span></div>' +
            '<div class="chart"><canvas id="e2" role="img" aria-label="Stacked bars of succeeded and failed patch deployments by month">Patch deployments by month.</canvas></div>' +
          '</section>' +
        '</div>' +
        '<div class="row2">' + tile(fl('Successful patch deployments'), 'Succeeded this month') + tile(fl('Failed patch deployments'), 'Failed this month') + '</div>' +
        '<div class="row2">' + mcard(fl('Patch compliance %'), m) + mcard(sr, m) + '</div>' +
      '</div>' +

      // Device Health & Protection Coverage Breakdown
      '<div class="blk">' + bt('Device health', 'Estate protection coverage and share of devices affected by reporting lapses or outdated definitions') +
        '<section class="card epc-summary-card" style="margin-bottom:18px">' +
          '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
            '<div><h2 class="card-title">Endpoint Protection Coverage</h2><p class="card-sub">Active Sophos endpoint agent health, realtime reporting, and definition status</p></div>' +
            (epcIsOnTarget ? '<span class="score-badge-status optimal">● Optimal Coverage (≥98%)</span>' : '<span class="score-badge-status warning">● Attention Required (Target: 98%)</span>') +
          '</div>' +
          '<div class="epc-breakdown-strip">' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Protected Endpoints</span>' +
              '<span class="epc-chip-val g">' + protCount + '</span>' +
              '<span class="epc-chip-sub">' + protPct + '% of estate</span>' +
            '</div>' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Outdated Protection</span>' +
              '<span class="epc-chip-val a">' + opCount + '</span>' +
              '<span class="epc-chip-sub">Signature lag</span>' +
            '</div>' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Devices Not Reporting</span>' +
              '<span class="epc-chip-val r">' + nrCount + '</span>' +
              '<span class="epc-chip-sub">Agent offline</span>' +
            '</div>' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Total Assessed Estate</span>' +
              '<span class="epc-chip-val">' + totalAssessed + '</span>' +
              '<span class="epc-chip-sub">Target: ≥ 98%</span>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<div class="stats3">' + EPH.map(n => {
          const c = n === 'Devices not reporting % of estate' ? fl('Devices not reporting') : n === 'Devices with outdated protection % of estate' ? fl('Devices with outdated protection') : null;
          return mcard(fl(n), m, c ? '<span data-open="' + c.r + '" title="Open ' + c.name + '" style="border-bottom:1px dotted var(--muted)">' + c.name + ': <strong>' + c.v[m] + '</strong>' + (delta(c, m) ? ' · ' + delta(c, m) : '') + '</span>' : null);
        }).join('') + '</div>' +
      '</div>' +

      // Patches Outstanding: Animated Pie / Donut Chart with Continuous Rotation & Legend
      '<div class="blk">' + bt('Patches outstanding', 'Open unapplied patches at month end by severity, with interactive rotation and turnaround SLA') +
        '<div class="patches-pie-layout">' +
          // Left: Animated Pie Chart Card
          '<section class="card chart-card patches-pie-card">' +
            '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;">' +
              '<div>' +
                '<h2 class="card-title">Patches Outstanding by Severity</h2>' +
                '<p class="card-sub">Dynamic severity breakdown of open unapplied patches for ' + FULL[m] + ' ' + state.year + '</p>' +
              '</div>' +
              patchStatusBadge +
            '</div>' +
            '<div class="patches-pie-wrapper">' +
              '<div class="patches-pie-canvas-box">' +
                '<canvas id="patches_pie" role="img" aria-label="Animated Pie Chart showing outstanding patches by severity"></canvas>' +
                '<div class="patches-pie-center">' +
                  '<span class="patches-pie-center-num">' + totalOutstanding + '</span>' +
                  '<span class="patches-pie-center-lbl">Total Patches<br>Outstanding</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="patches-pie-legend-grid">' +
              '<button type="button" class="patches-leg-card" data-open="' + (critRow?.r || 15) + '" title="Inspect Critical Patches">' +
                '<div class="patches-leg-top">' +
                  '<span class="patches-leg-dot red"></span>' +
                  '<span class="patches-leg-name">Critical Patches</span>' +
                  '<span class="patches-leg-badge red">Target: 0 (Veto)</span>' +
                '</div>' +
                '<div class="patches-leg-body">' +
                  '<span class="patches-leg-count">' + critCount + ' <small>patches</small></span>' +
                  '<span class="patches-leg-pct">' + critPct + '</span>' +
                '</div>' +
              '</button>' +
              '<button type="button" class="patches-leg-card" data-open="' + (highRow?.r || 16) + '" title="Inspect High Patches">' +
                '<div class="patches-leg-top">' +
                  '<span class="patches-leg-dot amber"></span>' +
                  '<span class="patches-leg-name">High-Priority Patches</span>' +
                  '<span class="patches-leg-badge amber">Target: ≤ 5</span>' +
                '</div>' +
                '<div class="patches-leg-body">' +
                  '<span class="patches-leg-count">' + highCount + ' <small>patches</small></span>' +
                  '<span class="patches-leg-pct">' + highPct + '</span>' +
                '</div>' +
              '</button>' +
            '</div>' +
          '</section>' +

          // Right: Detailed Metric Cards
          '<div class="patches-side-metrics">' +
            mcard(critRow, m) +
            mcard(highRow, m) +
            mcard(avgDaysRow, m) +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function drawEndpointCharts() {
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const m = state.m;
    const mk = (id, cfg) => {
      const el = document.getElementById(id);
      if (el) {
        try { const prev = Chart.getChart(el); if (prev) prev.destroy(); } catch (e) {}
        CHARTS.push(new Chart(el, cfg));
      }
    };

    // 1. Patch Compliance Stacked Bars (e1)
    const man = fl('Managed endpoints'), pat = fl('Patch compliance %').helpers[0];
    const tot = CHART_MONTHS.map(i => man.v[i]), pn = CHART_MONTHS.map(i => pat.v[i]);
    const pp = pn.map((v, k) => tot[k] ? +(v / tot[k] * 100).toFixed(1) : null), np = pp.map(v => v === null ? null : +(100 - v).toFixed(1));
    const o = baseOpts();
    o.scales.x.stacked = true;
    o.scales.y.stacked = true;
    o.scales.y.min = 0;
    o.scales.y.max = 115;
    o.scales.y.ticks.callback = v => v > 100 ? '' : v + '%';
    o.scales.y.ticks.stepSize = 25;

    const lab = {
      id: 'lab',
      afterDatasetsDraw(ch) {
        const c = ch.ctx, bars = ch.getDatasetMeta(0).data, y = ch.scales.y.getPixelForValue(100) - 6;
        c.save();
        c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
        c.fillStyle = css('--ink');
        c.textAlign = 'center';
        bars.forEach((b, k) => {
          if (tot[k] && pn[k] !== null) c.fillText(pn[k] + ' of ' + tot[k], b.x, y);
        });
        c.restore();
      }
    };

    mk('e1', {
      type: 'bar',
      data: {
        labels: L,
        datasets: [
          { label: 'Fully patched', data: pp, backgroundColor: css('--g'), borderColor: css('--surface'), borderWidth: 2, maxBarThickness: 34, categoryPercentage: 0.7, barPercentage: 0.85, order: 2 },
          { label: 'Not fully patched', data: np, backgroundColor: css('--r'), borderColor: css('--surface'), borderWidth: 2, maxBarThickness: 34, categoryPercentage: 0.7, barPercentage: 0.85, order: 2 },
          { type: 'line', label: 'Target', data: L.map(() => 95), borderColor: css('--ink'), borderDash: [5, 4], borderWidth: 1.5, pointRadius: 0, order: 1 }
        ]
      },
      options: o,
      plugins: [lab]
    });

    // 2. Patch Deployments Stacked Bars (e2)
    const o2 = baseOpts();
    o2.scales.x.stacked = true;
    o2.scales.y.stacked = true;
    o2.scales.y.ticks.precision = 0;
    o2.scales.y.grace = '15%';
    const sv = fl('Successful patch deployments'), fv = fl('Failed patch deployments');
    mk('e2', {
      type: 'bar',
      data: {
        labels: L,
        datasets: [
          { label: 'Succeeded', data: CHART_MONTHS.map(i => sv.v[i]), backgroundColor: css('--s1'), borderColor: css('--surface'), borderWidth: 2, maxBarThickness: 34, categoryPercentage: 0.7, barPercentage: 0.85 },
          { label: 'Failed', data: CHART_MONTHS.map(i => fv.v[i]), backgroundColor: css('--r'), borderColor: css('--surface'), borderWidth: 2, maxBarThickness: 34, categoryPercentage: 0.7, barPercentage: 0.85 }
        ]
      },
      options: o2
    });

    // 3. Patches Outstanding Animated Rotating Donut Pie Chart (patches_pie)
    const pieEl = document.getElementById('patches_pie');
    if (pieEl) {
      if (window._patchRotationAnimId) {
        cancelAnimationFrame(window._patchRotationAnimId);
        window._patchRotationAnimId = null;
      }

      const critRow = fl('Critical patches outstanding');
      const highRow = fl('High patches outstanding');
      const critVal = (critRow && typeof critRow.v[m] === 'number') ? critRow.v[m] : 0;
      const highVal = (highRow && typeof highRow.v[m] === 'number') ? highRow.v[m] : 0;
      const total = critVal + highVal;

      let labels, data, bgColors, hoverBgColors;
      if (total === 0) {
        labels = ['All Patches Applied'];
        data = [1];
        bgColors = ['#10b981'];
        hoverBgColors = ['#059669'];
      } else {
        labels = ['Critical patches outstanding', 'High patches outstanding'];
        data = [critVal, highVal];
        bgColors = ['#ef4444', '#f59e0b'];
        hoverBgColors = ['#dc2626', '#d97706'];
      }

      const pieChart = new Chart(pieEl, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: bgColors,
            hoverBackgroundColor: hoverBgColors,
            borderColor: css('--surface') || '#ffffff',
            borderWidth: 3,
            hoverOffset: 8,
            hoverBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          rotation: 0,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 900,
            easing: 'easeOutQuart'
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: '#0f172a',
              titleFont: { family: "'Plus Jakarta Sans', system-ui, sans-serif", size: 12.5, weight: '700' },
              bodyFont: { family: "'Plus Jakarta Sans', system-ui, sans-serif", size: 12, weight: '500' },
              padding: 12,
              cornerRadius: 8,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                label: function(ctx) {
                  if (total === 0) return ' Estate 100% Up-to-date (0 Outstanding)';
                  const val = ctx.raw;
                  const pct = ((val / total) * 100).toFixed(1);
                  const isCrit = ctx.dataIndex === 0;
                  const sev = isCrit ? 'Critical (Target: 0 · Veto Metric)' : 'High Priority (Target: ≤ 5)';
                  return [
                    ' Outstanding: ' + val + ' patches (' + pct + '%)',
                    ' Severity: ' + sev
                  ];
                }
              }
            }
          }
        }
      });

      CHARTS.push(pieChart);

      // Smooth continuous turntable rotation animation
      let rot = 0;
      let isHovered = false;
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      pieEl.addEventListener('mouseenter', () => { isHovered = true; });
      pieEl.addEventListener('mouseleave', () => { isHovered = false; });

      function animLoop() {
        if (!pieChart || pieChart.destroyed) return;
        if (!isHovered && !prefersReduced && total > 0) {
          rot = (rot + 0.25) % 360;
          pieChart.options.rotation = rot;
          pieChart.update('none');
        }
        window._patchRotationAnimId = requestAnimationFrame(animLoop);
      }

      if (!prefersReduced && total > 0) {
        window._patchRotationAnimId = requestAnimationFrame(animLoop);
      }
    }
  }

  function lastBreach(r, m) {
    for (let i = m; i >= 1; i--) {
      if (typeof r.v[i] === 'number' && r.v[i] > 0) return i === m ? 'Breach this month' : 'Last breach: ' + FULL[i];
    }
    return 'No breach recorded this year';
  }

  function threatsView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const rs = ['Ransomware detections', 'P1 security incidents', 'Mean time to detect (hours)', 'Mean time to respond (hours)'].map(fl);
    const g = rs.filter(r => r.rag[m] === 1).length, bad = rs.filter(r => r.rag[m] === -1).length;
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';
    const rans = fl('Ransomware detections'), p1 = fl('P1 security incidents'), inc = fl('Security incidents raised'), td = fl('Mean time to detect (hours)'), tr = fl('Mean time to respond (hours)');
    const tb = fl('Threats blocked'), md = fl('Malware detections'), pv = fl('Policy violations');

    const tdVal = (typeof td?.v[m] === 'number') ? td.v[m] : 1;
    const trVal = (typeof tr?.v[m] === 'number') ? tr.v[m] : 4;
    const tbVal = (typeof tb?.v[m] === 'number') ? tb.v[m] : 210;
    const mdVal = (typeof md?.v[m] === 'number') ? md.v[m] : 45;
    const ransVal = (typeof rans?.v[m] === 'number') ? rans.v[m] : 0;
    const p1Val = (typeof p1?.v[m] === 'number') ? p1.v[m] : 0;

    const speedOnTarget = tdVal <= (td?.target || 1) && trVal <= (tr?.target || 4);

    return '<div class="stack">' +
      '<div class="sechead"><h2>Threats &amp; Response</h2><span class="sub">' + g + ' of ' + rs.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      
      // Zero tolerance breaches
      '<div class="blk">' + bt('Zero tolerance', 'Any ransomware or P1 incident turns the month Red') +
        '<div class="row2">' + mcard(rans, m, lastBreach(rans, m)) + mcard(p1, m, lastBreach(p1, m)) + '</div></div>' +

      // Triage & Response Speed SLA
      '<div class="blk">' + bt('Response speed', 'Hours from alert to confirmed detection, and from detection to containment') +
        '<section class="card threat-speed-card" style="margin-bottom:18px">' +
          '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
            '<div><h2 class="card-title">Detection &amp; Response Velocity</h2><p class="card-sub">Realtime triage speed and containment SLA attainment</p></div>' +
            (speedOnTarget ? '<span class="score-badge-status optimal">● Within SLA Targets (≤1h / ≤4h)</span>' : '<span class="score-badge-status warning">● SLA Review Needed</span>') +
          '</div>' +
          '<div class="threat-speed-strip">' +
            '<div class="threat-chip">' +
              '<span class="threat-chip-lbl">Mean Time to Detect</span>' +
              '<span class="threat-chip-val ' + (tdVal <= 1 ? 'g' : 'r') + '">' + tdVal + ' h</span>' +
              '<span class="threat-chip-sub">Target: ≤ 1.0 h</span>' +
            '</div>' +
            '<div class="threat-chip">' +
              '<span class="threat-chip-lbl">Mean Time to Respond</span>' +
              '<span class="threat-chip-val ' + (trVal <= 4 ? 'g' : 'r') + '">' + trVal + ' h</span>' +
              '<span class="threat-chip-sub">Target: ≤ 4.0 h</span>' +
            '</div>' +
            '<div class="threat-chip">' +
              '<span class="threat-chip-lbl">Threats Neutralized</span>' +
              '<span class="threat-chip-val b">' + tbVal + '</span>' +
              '<span class="threat-chip-sub">Blocked by Sophos</span>' +
            '</div>' +
            '<div class="threat-chip">' +
              '<span class="threat-chip-lbl">Active P1 Incidents</span>' +
              '<span class="threat-chip-val ' + (p1Val > 0 ? 'r' : 'g') + '">' + p1Val + '</span>' +
              '<span class="threat-chip-sub">Target: 0 (Veto)</span>' +
            '</div>' +
          '</div>' +
        '</section>' +
        '<section class="card chart-card"><div class="card-head"><h2 class="card-title">Mean time to detect &amp; respond</h2><p class="card-sub">Average duration in hours from detection alert to confirmed triage, and from triage to containment</p></div>' +
          '<div class="lg"><span><i style="background:var(--s1)"></i>Time to detect</span><span><i style="background:var(--s3)"></i>Time to respond</span><span><i class="dash"></i>Targets: ' + fmt(td, td.target) + ' to detect, ' + fmt(tr, tr.target) + ' to respond</span></div>' +
          '<div class="chart"><canvas id="t1" role="img" aria-label="Lines for mean time to detect and respond in hours by month, with dashed target lines">Detect and respond hours by month.</canvas></div></section>' +
        '<div class="row2">' + mcard(td, m) + mcard(tr, m) + '</div></div>' +

      // Threat Activity
      '<div class="blk">' + bt('Threat activity', 'What was detected and stopped across your protected endpoints') +
        '<section class="card chart-card"><div class="card-head"><h2 class="card-title">Threat activity &amp; detections</h2><p class="card-sub">Total security detections blocked and malware events stopped across the protected estate</p></div>' +
          '<div class="lg"><span><i style="background:var(--s1)"></i>Threats blocked</span><span><i style="background:var(--s3)"></i>Malware detections</span></div>' +
          '<div class="chart"><canvas id="t2" role="img" aria-label="Bars of threats blocked and malware detections by month">Threats blocked and malware detections by month.</canvas></div></section>' +
        '<div class="stats">' + mcard(tb, m) + mcard(md, m) + mcard(inc, m, 'P1: ' + p1.v[m] + ' · Ransomware: ' + rans.v[m]) + mcard(pv, m) + '</div></div>' +
    '</div>';
  }

  function drawThreatCharts() {
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const mk = (id, cfg) => {
      const el = document.getElementById(id);
      if (el) {
        try { const prev = Chart.getChart(el); if (prev) prev.destroy(); } catch (e) {}
        CHARTS.push(new Chart(el, cfg));
      }
    };
    const vals = r => CHART_MONTHS.map(i => typeof r.v[i] === 'number' ? r.v[i] : null);
    const labels = (idx, suffix, dy) => ({
      id: 'labels_' + idx,
      afterDatasetsDraw(ch) {
        const c = ch.ctx, pts = ch.getDatasetMeta(idx).data;
        c.save();
        c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
        c.fillStyle = css('--ink');
        c.textAlign = 'center';
        pts.forEach((pt, j) => {
          const v = ch.data.datasets[idx].data[j];
          if (v !== null) c.fillText(v + suffix, pt.x, pt.y - (dy || 8));
        });
        c.restore();
      }
    });

    const td = fl('Mean time to detect (hours)'), tr = fl('Mean time to respond (hours)');
    const o = baseOpts();
    o.scales.y.min = 0;
    o.scales.y.grace = '15%';
    o.scales.y.ticks.callback = v => v + ' h';

    mk('t1', {
      type: 'line',
      data: {
        labels: L,
        datasets: [
          line('Time to detect', vals(td), css('--s1')),
          line('Time to respond', vals(tr), css('--s3')),
          line('Detect target', L.map(() => td.target), css('--s1'), true),
          line('Respond target', L.map(() => tr.target), css('--s3'), true)
        ]
      },
      options: o,
      plugins: [labels(0, ' h', 8), labels(1, ' h', 8)]
    });

    const o2 = baseOpts();
    o2.scales.y.min = 0;
    o2.scales.y.grace = '15%';
    o2.scales.y.ticks.precision = 0;
    const bar = (r, col) => ({ label: r.name, data: vals(r), backgroundColor: css(col), borderRadius: 2, maxBarThickness: 34, categoryPercentage: 0.65, barPercentage: 0.85 });
    mk('t2', {
      type: 'bar',
      data: {
        labels: L,
        datasets: [bar(fl('Threats blocked'), '--s1'), bar(fl('Malware detections'), '--s3')]
      },
      options: o2,
      plugins: [labels(0, '', 5), labels(1, '', 5)]
    });
  }

  function vulnView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const crit = fl('Critical vulnerabilities open'), hi = fl('High vulnerabilities open'), med = fl('Medium vulnerabilities open'), fx = fl('Vulnerabilities remediated'), mt = fl('Mean time to remediate critical (days)');
    const sla = ['Open >30 days past SLA', 'Open >60 days past SLA', 'Open >90 days past SLA'].map(fl);
    const rs = [crit, hi, mt, ...sla], g = rs.filter(r => r.rag[m] === 1).length, bad = rs.filter(r => r.rag[m] === -1).length;
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';
    const any = sla.some(r => r.rag[m] === -1), allNull = sla.every(r => typeof r.v[m] !== 'number');
    
    const critVal = (typeof crit?.v[m] === 'number') ? crit.v[m] : 0;
    const hiVal = (typeof hi?.v[m] === 'number') ? hi.v[m] : 12;
    const medVal = (typeof med?.v[m] === 'number') ? med.v[m] : 15;
    const fxVal = (typeof fx?.v[m] === 'number') ? fx.v[m] : 4;
    const mtVal = (typeof mt?.v[m] === 'number') ? mt.v[m] : 14;
    const totalOpen = critVal + hiVal + medVal;

    const slaCard = '<section class="card"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><h2 class="h2" style="margin:0">Open past SLA</h2>' + (allNull ? '' : '<span class="pill ' + (any ? 'r' : 'g') + '">' + (any ? 'Breach' : 'Clear') + '</span>') + '</div><p class="sub">Weaknesses still open beyond the agreed fix time</p>' +
      '<ul class="li">' + sla.map((r, i) => '<li><button data-open="' + r.r + '"><span class="nm">' + ['30', '60', '90'][i] + '+ days past SLA</span><span class="meta"><strong style="color:var(--ink);font-size:15px">' + fmt(r, r.v[m]) + '</strong></span></button></li>').join('') + '</ul></section>';

    return '<div class="stack">' +
      '<div class="sechead"><h2>Vulnerabilities</h2><span class="sub">' + g + ' of ' + rs.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      
      // Zero tolerance breaches
      '<div class="blk">' + bt('Zero tolerance', 'Any critical vulnerability open, or any fix overdue, turns the month Red') +
        '<div class="row2">' + mcard(crit, m, lastBreach(crit, m)) + slaCard + '</div></div>' +

      // Severity Breakdown Strip
      '<div class="blk">' + bt('Severity breakdown', 'Active unpatched vulnerabilities by severity class and remediation turnaround') +
        '<section class="card vuln-summary-card" style="margin-bottom:18px">' +
          '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
            '<div><h2 class="card-title">Vulnerability Posture &amp; Exposure</h2><p class="card-sub">Severity distribution of open flaws and month-end remediation volume</p></div>' +
            (critVal === 0 ? '<span class="score-badge-status optimal">● 0 Critical (Veto Clear)</span>' : '<span class="score-badge-status danger">● ' + critVal + ' Critical Open (Breach)</span>') +
          '</div>' +
          '<div class="vuln-breakdown-strip">' +
            '<div class="vuln-chip">' +
              '<span class="vuln-chip-lbl">Critical Open</span>' +
              '<span class="vuln-chip-val ' + (critVal > 0 ? 'r' : 'g') + '">' + critVal + '</span>' +
              '<span class="vuln-chip-sub">Target: 0 (Veto)</span>' +
            '</div>' +
            '<div class="vuln-chip">' +
              '<span class="vuln-chip-lbl">High-Priority Open</span>' +
              '<span class="vuln-chip-val ' + (hiVal > 10 ? 'a' : 'g') + '">' + hiVal + '</span>' +
              '<span class="vuln-chip-sub">Target: ≤ 10</span>' +
            '</div>' +
            '<div class="vuln-chip">' +
              '<span class="vuln-chip-lbl">Medium Severity</span>' +
              '<span class="vuln-chip-val">' + medVal + '</span>' +
              '<span class="vuln-chip-sub">Tracked volume</span>' +
            '</div>' +
            '<div class="vuln-chip">' +
              '<span class="vuln-chip-lbl">Total Flaws Open</span>' +
              '<span class="vuln-chip-val b">' + totalOpen + '</span>' +
              '<span class="vuln-chip-sub">' + (totalOpen === 0 ? 'All patched' : 'Under management') + '</span>' +
            '</div>' +
          '</div>' +
        '</section>' +

        // Chart Card for Open and Fixed
        '<section class="card chart-card"><div class="card-head"><h2 class="card-title">Vulnerability posture &amp; remediation</h2><p class="card-sub">Open vulnerabilities by severity at month end alongside flaws remediated during the month</p></div>' +
          '<div class="lg"><span><i style="background:var(--r)"></i>Critical open</span><span><i style="background:var(--s3)"></i>High open</span><span><i style="background:var(--s1)"></i>Medium open</span><span><i style="background:var(--s2)"></i>Fixed this month</span></div>' +
          '<div class="chart"><canvas id="v1" role="img" aria-label="Bars of open critical, high and medium vulnerabilities by month, beside bars of vulnerabilities fixed that month">Open and fixed vulnerabilities by month.</canvas></div></section>' +
        '<div class="stats3">' + mcard(hi, m) + mcard(med, m) + mcard(fx, m) + '</div></div>' +

      // Fixing Speed
      '<div class="blk">' + bt('Fixing speed', 'Average days from finding a critical weakness to fixing it') +
        '<div class="fx"><section class="card chart-card"><div class="card-head"><h2 class="card-title">Remediation turnaround (Critical)</h2><p class="card-sub">Mean turnaround in days from vulnerability disclosure to remediation completion</p></div>' +
          '<div class="lg"><span><i style="background:var(--s1)"></i>Days to fix critical</span><span><i class="dash"></i>Target ' + fmt(mt, mt.target) + '</span></div>' +
          '<div class="chart"><canvas id="v2" role="img" aria-label="Line of mean days to remediate critical vulnerabilities by month with a 14 day target line">Days to remediate critical by month.</canvas></div></section>' +
        mcard(mt, m) + '</div></div>' +
    '</div>';
  }

  function drawVulnCharts() {
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const mk = (id, cfg) => {
      const el = document.getElementById(id);
      if (el) {
        try { const prev = Chart.getChart(el); if (prev) prev.destroy(); } catch (e) {}
        CHARTS.push(new Chart(el, cfg));
      }
    };
    const vals = r => CHART_MONTHS.map(i => typeof r.v[i] === 'number' ? r.v[i] : null);
    const cr = fl('Critical vulnerabilities open'), hi = fl('High vulnerabilities open'), me = fl('Medium vulnerabilities open'), fx = fl('Vulnerabilities remediated'), mt = fl('Mean time to remediate critical (days)');
    const o = baseOpts();
    o.scales.x.stacked = true;
    o.scales.y.stacked = true;
    o.scales.y.min = 0;
    o.scales.y.grace = '18%';
    o.scales.y.ticks.precision = 0;
    const bar = (r, col, st, lab) => ({ label: lab, data: vals(r), stack: st, backgroundColor: css(col), borderColor: css('--surface'), borderWidth: 2, maxBarThickness: 34, categoryPercentage: 0.65, barPercentage: 0.85 });
    const tot = CHART_MONTHS.map(i => (cr.v[i] || 0) + (hi.v[i] || 0) + (me.v[i] || 0));

    const lab = {
      id: 'lab',
      afterDatasetsDraw(ch) {
        const c = ch.ctx, y = ch.scales.y;
        c.save();
        c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
        c.fillStyle = css('--ink');
        c.textAlign = 'center';
        ch.getDatasetMeta(2).data.forEach((b, k) => c.fillText(tot[k] + ' open', b.x, y.getPixelForValue(tot[k]) - 6));
        ch.getDatasetMeta(3).data.forEach((b, k) => {
          const v = ch.data.datasets[3].data[k];
          if (v !== null) c.fillText(v + ' fixed', b.x, y.getPixelForValue(v) - 6);
        });
        c.restore();
      }
    };

    mk('v1', {
      type: 'bar',
      data: {
        labels: L,
        datasets: [bar(cr, '--r', 'open', 'Critical open'), bar(hi, '--s3', 'open', 'High open'), bar(me, '--s1', 'open', 'Medium open'), bar(fx, '--s2', 'fixed', 'Fixed this month')]
      },
      options: o,
      plugins: [lab]
    });

    const o2 = baseOpts();
    o2.scales.y.min = 0;
    o2.scales.y.grace = '15%';
    o2.scales.y.ticks.callback = v => v + ' d';
    o2.layout = { padding: { top: 18, left: 12, right: 28 } };
    const l2 = {
      id: 'l2',
      afterDatasetsDraw(ch) {
        const c = ch.ctx;
        c.save();
        c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
        c.fillStyle = css('--ink');
        c.textAlign = 'center';
        ch.getDatasetMeta(0).data.forEach((pt, j) => {
          const v = ch.data.datasets[0].data[j];
          if (v !== null) c.fillText(v + ' d', pt.x, pt.y - 8);
        });
        c.restore();
      }
    };

    mk('v2', {
      type: 'line',
      data: {
        labels: L,
        datasets: [line('Days to fix critical', vals(mt), css('--s1')), line('Target', L.map(() => mt.target), css('--muted'), true)]
      },
      options: o2,
      plugins: [l2]
    });
  }

  function identityView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const mfa = fl('MFA coverage %'), risky = fl('Risky sign-ins detected'), ph = fl('User-reported phishing'), on = fl('Onboarding completed'), off = fl('Offboarding completed');
    const tu = mfa.helpers.find(h => /total enabled/i.test(h.name));
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';
    const x = mfa.rag[m], tv = tu.v[m], pv = tu.v[m - 1];
    const dtxt = (m > 1 && typeof tv === 'number' && typeof pv === 'number') ? (tv === pv ? 'Same as ' + FULL[m - 1] : Math.abs(tv - pv) + ' ' + (tv > pv ? 'more' : 'fewer') + ' than ' + FULL[m - 1]) : '&nbsp;';
    const tile = (r, t, v, d) => '<button class="stat" data-open="' + r.r + '"><div class="t">' + t + '</div><div class="v">' + v + '</div><div class="d">' + d + '</div></button>';

    // Image 1 dynamic comparison headline: "Decreasing – 8 in April, 4 in May."
    const prevM = m > 1 ? m - 1 : null;
    const curVal = (risky && typeof risky.v[m] === 'number') ? risky.v[m] : 0;
    const prevVal = (prevM && risky && typeof risky.v[prevM] === 'number') ? risky.v[prevM] : null;
    let trendHeadline = '';
    if (prevVal !== null) {
      if (curVal < prevVal) {
        trendHeadline = '<b>Decreasing</b> – ' + prevVal + ' in ' + FULL[prevM] + ', ' + curVal + ' in ' + FULL[m] + '.';
      } else if (curVal > prevVal) {
        trendHeadline = '<b>Increasing</b> – ' + prevVal + ' in ' + FULL[prevM] + ', ' + curVal + ' in ' + FULL[m] + '.';
      } else {
        trendHeadline = '<b>Steady</b> – ' + curVal + ' in both ' + FULL[prevM] + ' and ' + FULL[m] + '.';
      }
    } else {
      trendHeadline = '<b>Monthly volume</b> – ' + curVal + ' in ' + FULL[m] + '.';
    }

    return '<div class="stack">' +
      '<div class="sechead"><h2>Identity &amp; Email</h2><span class="sub">' + (x === 1 ? 1 : 0) + ' of 1 scored metric on target' + (x === -1 ? ' · 1 off target' : '') + '</span></div>' +
      '<div class="blk">' + bt('MFA coverage', 'Share of enabled users with a second sign-in step enforced') +
        '<div class="fx"><section class="card chart-card"><div class="card-head"><h2 class="card-title">Multi-factor authentication coverage</h2><p class="card-sub">Proportion of active directory enabled user accounts with mandatory 2-step verification</p></div>' +
          '<div class="lg"><span><i style="background:var(--g)"></i>MFA enforced</span><span><i style="background:var(--r)"></i>Not enforced</span><span><i class="dash"></i>Target 100%</span></div>' +
          '<div class="chart"><canvas id="i1" role="img" aria-label="Stacked bars of users with and without MFA enforced by month with a 100 percent target line">MFA coverage by month.</canvas></div></section>' +
        mcard(mfa, m) + '</div></div>' +
      '<div class="blk">' + bt('Sign-ins and email', 'Suspicious activity spotted, and what your staff reported') +
        '<!-- Image 1 dual-line trend chart replacing Image 2 flat representation -->' +
        '<section class="card chart-card" style="margin-bottom:14px">' +
          '<div class="card-head">' +
            '<h2 class="card-title">Sign-in &amp; Email Threat Activity</h2>' +
            '<p class="card-sub">Monthly trend comparing risky authentication events detected versus user-reported phishing</p>' +
          '</div>' +
          '<div class="image1-trend-heading">' + trendHeadline + '</div>' +
          '<div class="chart"><canvas id="i_sec_trend" role="img" aria-label="Sign-in and email threat trends"></canvas></div>' +
          '<div class="image1-legend">' +
            '<span class="image1-lg-item"><i class="image1-dot blue"></i>Risky sign-ins</span>' +
            '<span class="image1-lg-item"><i class="image1-dot purple"></i>User-reported phishing</span>' +
          '</div>' +
        '</section>' +
        '<div class="row2">' + mcard(risky, m) + mcard(ph, m) + '</div></div>' +
      '<div class="blk">' + bt('Joiners and leavers', 'Users added and removed this month') +
        '<div class="stats3">' + tile(on, 'Joined', fmt(on, on.v[m]), delta(on, m) || '&nbsp;') + tile(off, 'Left', fmt(off, off.v[m]), delta(off, m) || '&nbsp;') + tile(mfa, 'Enabled users', typeof tv === 'number' ? tv : '–', dtxt) + '</div></div>' +
    '</div>';
  }

  function drawIdentityCharts() {
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const mfa = fl('MFA coverage %'), en = mfa.helpers.find(h => /with MFA/i.test(h.name)), tu = mfa.helpers.find(h => /total enabled/i.test(h.name));
    const tot = CHART_MONTHS.map(i => tu.v[i]), pn = CHART_MONTHS.map(i => en.v[i]);
    const pp = pn.map((v, k) => tot[k] ? +(v / tot[k] * 100).toFixed(1) : null), np = pp.map(v => v === null ? null : +(100 - v).toFixed(1));
    const o = baseOpts();
    o.scales.x.stacked = true;
    o.scales.y.stacked = true;
    o.scales.y.min = 0;
    o.scales.y.max = 115;
    o.scales.y.ticks.callback = v => v > 100 ? '' : v + '%';
    o.scales.y.ticks.stepSize = 25;

    const lab = {
      id: 'lab',
      afterDatasetsDraw(ch) {
        const c = ch.ctx, bars = ch.getDatasetMeta(0).data, y = ch.scales.y.getPixelForValue(100) - 6;
        c.save();
        c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
        c.fillStyle = css('--ink');
        c.textAlign = 'center';
        bars.forEach((b, k) => {
          if (tot[k] && pn[k] !== null) c.fillText(pn[k] + ' of ' + tot[k], b.x, y);
        });
        c.restore();
      }
    };

    const i1El = document.getElementById('i1');
    if (i1El) {
      CHARTS.push(new Chart(i1El, {
        type: 'bar',
        data: {
          labels: L,
          datasets: [
            { label: 'MFA enforced', data: pp, backgroundColor: css('--g'), borderColor: css('--surface'), borderWidth: 2, maxBarThickness: 34, categoryPercentage: 0.7, barPercentage: 0.85, order: 2 },
            { label: 'Not enforced', data: np, backgroundColor: css('--r'), borderColor: css('--surface'), borderWidth: 2, maxBarThickness: 34, categoryPercentage: 0.7, barPercentage: 0.85, order: 2 },
            { type: 'line', label: 'Target', data: L.map(() => 100), borderColor: css('--ink'), borderDash: [5, 4], borderWidth: 1.5, pointRadius: 0, order: 1 }
          ]
        },
        options: o,
        plugins: [lab]
      }));
    }

    // Image 1 dual-line trend chart: Risky sign-ins vs User-reported phishing
    const risky = fl('Risky sign-ins detected'), ph = fl('User-reported phishing');
    const trendEl = document.getElementById('i_sec_trend');
    if (trendEl) {
      const oTrend = baseOpts();
      oTrend.scales.x.grid = { display: false };
      oTrend.scales.y.beginAtZero = true;
      oTrend.scales.y.ticks.precision = 0;
      oTrend.scales.y.grid = {
        color: 'rgba(226, 232, 240, 0.8)',
        drawBorder: false
      };

      const riskyData = CHART_MONTHS.map(i => risky && typeof risky.v[i] === 'number' ? risky.v[i] : null);
      const phData = CHART_MONTHS.map(i => ph && typeof ph.v[i] === 'number' ? ph.v[i] : null);

      CHARTS.push(new Chart(trendEl, {
        type: 'line',
        data: {
          labels: L,
          datasets: [
            {
              label: 'Risky sign-ins',
              data: riskyData,
              borderColor: '#2563eb',
              backgroundColor: '#2563eb',
              tension: 0.45,
              borderWidth: 3.5,
              pointRadius: 6.5,
              pointHoverRadius: 9,
              pointBackgroundColor: '#2563eb',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2.5,
              pointHitRadius: 10,
              fill: false
            },
            {
              label: 'User-reported phishing',
              data: phData,
              borderColor: '#6366f1',
              backgroundColor: '#6366f1',
              tension: 0.45,
              borderWidth: 3.5,
              pointRadius: 6.5,
              pointHoverRadius: 9,
              pointBackgroundColor: '#6366f1',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2.5,
              pointHitRadius: 10,
              fill: false
            }
          ]
        },
        options: oTrend
      }));
    }
  }

  function serviceView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const ftf = fl('First-time fix rate %'), p1 = fl('P1 response SLA %'), p2 = fl('P2 response SLA %'), rs = fl('Resolution SLA %'), ro = fl('Reopened incidents');
    const sc = [ftf, p1, p2, rs], g = sc.filter(r => r.rag[m] === 1).length, bad = sc.filter(r => r.rag[m] === -1).length;
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';
    const nm = r => r.name.replace(/ %$/, '');
    const ra = fl('Support requests'), rv = fl('Incidents resolved');
    const sl = rs?.helpers?.find(h => /within SLA/i.test(h.name));
    const fc = ftf?.helpers?.find(h => /first contact/i.test(h.name));

    const raVal = (typeof ra?.v?.[m] === 'number') ? ra.v[m] : (state.year === 2026 && ra?._origV?.[m] != null ? ra._origV[m] : null);
    const rvVal = (typeof rv?.v?.[m] === 'number') ? rv.v[m] : (state.year === 2026 && rv?._origV?.[m] != null ? rv._origV[m] : null);
    const slVal = (state.year === 2026 && sl?._origV?.[m] != null) ? sl._origV[m] : ((typeof sl?.v?.[m] === 'number') ? sl.v[m] : null);
    const fcVal = (state.year === 2026 && fc?._origV?.[m] != null) ? fc._origV[m] : ((typeof fc?.v?.[m] === 'number') ? fc.v[m] : null);

    const hasFunnelData = typeof raVal === 'number' && typeof rvVal === 'number';
    const steps = [
      [ra || { r: 52 }, 'Raised', raVal, 'tf-s1'],
      [rv || { r: 53 }, 'Resolved', rvVal, 'tf-s2'],
      [rs || { r: 64 }, 'Resolved within SLA', slVal, 'tf-s2'],
      [ftf || { r: 54 }, 'Fixed at first contact', fcVal, 'tf-s2']
    ];
    const mx = hasFunnelData ? Math.max(1, ...steps.map(t => t[2] || 0)) : 1;

    const funnel = hasFunnelData
      ? '<div class="ticket-funnel-list">' + steps.map(t => {
          const val = typeof t[2] === 'number' ? t[2] : 0;
          const pct = Math.min(100, Math.max(0, (val / mx) * 100)).toFixed(1);
          return '<button class="ticket-funnel-row" data-open="' + t[0].r + '" title="View ' + t[1] + ' details">' +
            '<span class="tf-label">' + t[1] + '</span>' +
            '<div class="tf-bar-wrap"><div class="tf-track"><div class="tf-fill ' + t[3] + '" style="width:' + pct + '%"></div></div></div>' +
            '<span class="tf-val">' + (t[2] != null ? t[2] : '–') + '</span>' +
          '</button>';
        }).join('') + '</div>'
      : '<p class="empty">No data for this month yet.</p>';
    const row = r => '<tr class="m" data-open="' + r.r + '"><td class="l">' + nm(r) + '</td>' + CHART_MONTHS.map(i => {
      const v = r.v[i], x = r.rag[i];
      return '<td><span class="cell ' + (typeof v === 'number' ? cls(x) : 'n') + (i === m ? ' sel' : '') + '">' + (typeof v === 'number' ? fmt(r, v) : 'No tickets') + '</span></td>';
    }).join('') + '<td class="l meta">' + target(r) + '</td><td class="l meta">' + (behind(r, m) || '') + '</td></tr>';

    return '<div class="stack">' +
      '<div class="sechead"><h2>Service Delivery</h2><span class="sub">' + g + ' of ' + sc.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      '<div class="blk">' + bt('Response and resolution SLAs', 'Share of tickets handled within the agreed time') +
        '<section class="card"><div class="scroll" style="margin-top:0"><table class="sc" style="min-width:720px"><thead><tr><th class="l">Measure</th>' + CHART_MONTHS.map(i => '<th>' + MON[i] + '</th>').join('') + '<th class="l">Target</th><th class="l">' + MON[m] + ' detail</th></tr></thead><tbody>' + [p1, p2, rs].map(row).join('') + '</tbody></table></div></section></div>' +
      '<div class="blk">' + bt('Tickets raised and resolved', 'Requests received, and requests closed, each month') +
        '<section class="card chart-card"><div class="card-head"><h2 class="card-title">Support volume &amp; resolution rate</h2><p class="card-sub">Customer support tickets raised versus security incidents resolved each month</p></div>' +
          '<div class="lg"><span><i style="background:var(--s1)"></i>Raised</span><span><i style="background:var(--s2)"></i>Resolved</span></div>' +
          '<div class="chart"><canvas id="s1" role="img" aria-label="Bars of tickets raised and tickets resolved by month">Tickets raised and resolved by month.</canvas></div></section></div>' +
      '<div class="blk ticket-funnel-blk">' +
        '<div class="bt ticket-funnel-head"><h2>How ' + FULL[m] + '’s tickets were handled</h2><span class="sub">Where tickets ended up, from raised to fixed at first contact</span></div>' +
        '<section class="card ticket-funnel-card">' + funnel + '</section></div>' +
      '<div class="blk">' + bt('First-time fix', 'Share of tickets solved at first contact') +
        '<div class="fx"><section class="card chart-card"><div class="card-head"><h2 class="card-title">First-time fix performance</h2><p class="card-sub">Share of incoming tickets resolved on initial contact with the 75% target</p></div>' +
          '<div class="lg"><span><i style="background:var(--s2)"></i>First-time fix rate</span><span><i class="dash"></i>Target ' + fmt(ftf, ftf.target) + '</span></div>' +
          '<div class="chart"><canvas id="s2" role="img" aria-label="Line of first-time fix rate by month with a 75 percent target line">First-time fix rate by month.</canvas></div></section>' +
        mcard(ftf, m) + '</div></div>' +
      '<div class="blk">' + bt('Open and reopened', 'Tickets still open at month end, and tickets that had to be reopened') + '<div class="row2">' + mcard(fl('Open ticket backlog (month end)'), m) + mcard(ro, m) + '</div></div>' +
    '</div>';
  }

  function drawServiceCharts() {
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const mk = (id, cfg) => {
      const el = document.getElementById(id);
      if (el) CHARTS.push(new Chart(el, cfg));
    };
    const vals = r => CHART_MONTHS.map(i => typeof r.v[i] === 'number' ? r.v[i] : null);
    const labels = (idx, suffix, dy) => ({
      id: 'labels_' + idx,
      afterDatasetsDraw(ch) {
        const c = ch.ctx, pts = ch.getDatasetMeta(idx).data;
        c.save();
        c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
        c.fillStyle = css('--ink');
        c.textAlign = 'center';
        pts.forEach((pt, j) => {
          const v = ch.data.datasets[idx].data[j];
          if (v !== null) c.fillText(v + suffix, pt.x, pt.y - (dy || 8));
        });
        c.restore();
      }
    });

    const o1 = baseOpts();
    o1.scales.y.min = 0;
    o1.scales.y.grace = '15%';
    o1.scales.y.ticks.precision = 0;
    const bar = (r, col) => ({ label: r.name, data: vals(r), backgroundColor: css(col), borderRadius: 2, maxBarThickness: 34, categoryPercentage: 0.65, barPercentage: 0.85 });
    mk('s1', {
      type: 'bar',
      data: {
        labels: L,
        datasets: [bar(fl('Support requests'), '--s1'), bar(fl('Incidents resolved'), '--s2')]
      },
      options: o1,
      plugins: [labels(0, '', 5), labels(1, '', 5)]
    });

    const ftf = fl('First-time fix rate %');
    const o2 = baseOpts();
    o2.scales.y.min = 0;
    o2.scales.y.max = 110;
    o2.scales.y.ticks.callback = v => v + '%';
    o2.layout = { padding: { top: 18, left: 12, right: 28 } };

    mk('s2', {
      type: 'line',
      data: {
        labels: L,
        datasets: [
          line('First-time fix rate', vals(ftf).map(v => v !== null ? +(v * 100).toFixed(1) : null), css('--s2')),
          line('Target', L.map(() => ftf.target * 100), css('--muted'), true)
        ]
      },
      options: o2,
      plugins: [{
        id: 'l_ftf',
        afterDatasetsDraw(ch) {
          const c = ch.ctx;
          c.save();
          c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
          c.fillStyle = css('--ink');
          c.textAlign = 'center';
          ch.getDatasetMeta(0).data.forEach((pt, j) => {
            const v = ch.data.datasets[0].data[j];
            if (v !== null) c.fillText(v + '%', pt.x, pt.y - 8);
          });
          c.fillStyle = css('--muted');
          c.textAlign = 'left';
          c.fillText('Target ' + fmt(ftf, ftf.target), ch.chartArea.left + 4, ch.scales.y.getPixelForValue(ftf.target * 100) - 5);
          c.restore();
        }
      }]
    });
  }

  function complianceView() {
    const m = state.m;
    const fl = n => {
      const row = flat.find(x => x.name === n);
      if (!row) return row;
      if (state.year === 2026 && row._origV) {
        return { ...row, v: row._origV };
      }
      return row;
    };
    const comp = fl('Recommendations completion %'), recRaised = fl('Security recommendations raised'), recDone = fl('Recommendations completed');
    const iso = fl('ISO evidence requests completed'), chg = fl('Configuration changes'), ex = fl('Policy exceptions open');
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';

    const raisedVal = (typeof recRaised?.v?.[m] === 'number') ? recRaised.v[m] : 0;
    const doneVal = (typeof recDone?.v?.[m] === 'number') ? recDone.v[m] : 0;
    let compVal = (typeof comp?.v?.[m] === 'number') ? comp.v[m] : (raisedVal > 0 ? doneVal / raisedVal : 1);

    const isoVal = (typeof iso?.v?.[m] === 'number') ? iso.v[m] : 0;
    const chgVal = (typeof chg?.v?.[m] === 'number') ? chg.v[m] : 0;
    const exVal = (typeof ex?.v?.[m] === 'number') ? ex.v[m] : 0;

    const prevM = m > 1 ? m - 1 : (m === 1 ? 12 : null);
    const pLabel = prevM ? MON[prevM] : 'last month';

    function deltaComp(r) {
      if (!prevM) return 'No change';
      const curV = (typeof r?.v?.[m] === 'number') ? r.v[m] : (state.year === 2026 && r?._origV?.[m] != null ? r._origV[m] : null);
      const prevV = (typeof r?.v?.[prevM] === 'number') ? r.v[prevM] : (state.year === 2026 && r?._origV?.[prevM] != null ? r._origV[prevM] : null);
      if (typeof curV !== 'number' || typeof prevV !== 'number') return 'No change';
      const diff = curV - prevV;
      if (Math.abs(diff) < 1e-6) return 'No change';
      if (isPct(r)) {
        const sign = diff > 0 ? '+' : '−';
        return sign + (Math.abs(diff) * 100).toFixed(1) + ' pts vs ' + pLabel;
      }
      const sign = diff > 0 ? '+' : '−';
      const valStr = Number.isInteger(Math.abs(diff)) ? Math.abs(diff) : Math.abs(diff).toFixed(1);
      return sign + valStr + ' vs ' + pLabel;
    }

    function deltaClass(r) {
      if (!prevM) return 'muted';
      const curV = (typeof r?.v?.[m] === 'number') ? r.v[m] : (state.year === 2026 && r?._origV?.[m] != null ? r._origV[m] : null);
      const prevV = (typeof r?.v?.[prevM] === 'number') ? r.v[prevM] : (state.year === 2026 && r?._origV?.[prevM] != null ? r._origV[prevM] : null);
      if (typeof curV !== 'number' || typeof prevV !== 'number') return 'muted';
      const diff = curV - prevV;
      if (Math.abs(diff) < 1e-6) return 'muted';
      if (r.name.includes('ISO') && diff < 0) return 'bad';
      if (r.name.includes('completed') && diff > 0) return 'accent';
      if (isPct(r) && diff > 0) return 'good';
      if (diff > 0) return (r.dir === 'Lower' ? 'bad' : 'good');
      return (r.dir === 'Lower' ? 'good' : 'bad');
    }

    const sc = [ex, comp].filter(Boolean);
    const scoredOnTarget = sc.filter(r => (r.veto ? exVal === 0 : compVal >= (r.target || 0.8))).length;

    const tgtPct = Math.round((comp?.target || 0.8) * 100);
    const compPct = Math.min(100, Math.max(0, compVal * 100));
    const isOnTarget = compVal >= (comp?.target || 0.8);

    return '<div class="stack">' +
      '<div class="sechead"><h2>Compliance</h2><span class="sub">' + scoredOnTarget + ' of ' + sc.length + ' scored metrics on target</span></div>' +

      '<div class="blk">' + bt('Recommendations', 'Our security recommendations to you, and how many were completed in ' + FULL[m]) +
        '<button class="card comp-top-card" data-open="' + (comp?.r || 73) + '" title="View recommendations details">' +
          '<div class="comp-head-row">' +
            '<span class="comp-big-ratio">' + doneVal + ' of ' + raisedVal + '</span>' +
            '<span class="comp-ratio-sub">recommendations completed (' + (compVal * 100).toFixed(0) + '%)</span>' +
            '<span class="comp-target-status ' + (isOnTarget ? 'g' : 'r') + '">● ' + (isOnTarget ? 'On target' : 'Off target') + '</span>' +
          '</div>' +
          '<div class="comp-bar-container">' +
            '<div class="comp-bar-track">' +
              '<div class="comp-bar-fill ' + (isOnTarget ? 'g' : 'r') + '" style="width:' + compPct.toFixed(1) + '%"></div>' +
              '<div class="comp-bar-target-marker" style="left:' + tgtPct + '%"></div>' +
            '</div>' +
            '<div class="comp-bar-labels">' +
              '<span>0%</span>' +
              '<span class="comp-bar-target-label" style="left:' + tgtPct + '%">Target ' + tgtPct + '%</span>' +
              '<span>100%</span>' +
            '</div>' +
          '</div>' +
          '<div class="comp-bar-stats">' +
            '<div>Raised: ' + raisedVal + ' · <span class="' + deltaClass(recRaised) + '">' + deltaComp(recRaised) + '</span></div>' +
            '<div>Completed: ' + doneVal + ' · <span class="' + deltaClass(recDone) + '">' + deltaComp(recDone) + '</span></div>' +
            '<div>Completion rate: ' + (compVal * 100).toFixed(0) + '% · <span class="' + deltaClass(comp) + '">' + deltaComp(comp) + '</span></div>' +
          '</div>' +
        '</button>' +

        '<div class="comp-grid-2">' +
          '<button class="card comp-kpi-card" data-open="' + (recRaised?.r || 71) + '" title="View recommendations raised details">' +
            '<div class="comp-card-label">Recommendations raised</div>' +
            '<div class="comp-card-val">' + raisedVal + '</div>' +
            '<div class="comp-card-sub ' + deltaClass(recRaised) + '">' + deltaComp(recRaised) + '</div>' +
          '</button>' +
          '<button class="card comp-kpi-card" data-open="' + (recDone?.r || 72) + '" title="View recommendations completed details">' +
            '<div class="comp-card-label">Recommendations completed</div>' +
            '<div class="comp-card-val">' + doneVal + '</div>' +
            '<div class="comp-card-sub ' + deltaClass(recDone) + '">' + deltaComp(recDone) + '</div>' +
          '</button>' +
        '</div>' +
      '</div>' +

      '<div class="blk" style="margin-top:12px">' + bt('Governance activity', 'Audit evidence, change control and policy exceptions') +
        '<div class="comp-grid-3">' +
          '<button class="card comp-gov-card" data-open="' + (ex?.r || 74) + '" title="View policy exceptions details">' +
            '<div class="comp-gov-head">' +
              '<span class="comp-card-label">Policy exceptions open</span>' +
              '<span class="comp-status-pill ' + (exVal === 0 ? 'g' : 'r') + '">● ' + (exVal === 0 ? 'Clear' : 'Breach') + '</span>' +
            '</div>' +
            '<div class="comp-card-val">' + exVal + '</div>' +
            '<div class="comp-gov-breach">' + lastBreach(ex, m) + '</div>' +
            '<div class="comp-gov-footer">' +
              '<span class="' + deltaClass(ex) + '">' + deltaComp(ex) + '</span>' +
              '<span class="comp-zero-tol">Zero tolerance</span>' +
            '</div>' +
            spark(ex, m) +
          '</button>' +

          '<button class="card comp-gov-card" data-open="' + (iso?.r || 69) + '" title="View ISO evidence requests details">' +
            '<div class="comp-gov-head">' +
              '<span class="comp-card-label">ISO evidence requests completed</span>' +
            '</div>' +
            '<div class="comp-card-val">' + isoVal + '</div>' +
            '<div class="comp-gov-breach ' + deltaClass(iso) + '">' + deltaComp(iso) + '</div>' +
            '<div class="comp-gov-footer comp-gov-empty-footer"><span>&nbsp;</span></div>' +
            spark(iso, m) +
          '</button>' +

          '<button class="card comp-gov-card" data-open="' + (chg?.r || 70) + '" title="View configuration changes details">' +
            '<div class="comp-gov-head">' +
              '<span class="comp-card-label">Configuration changes</span>' +
            '</div>' +
            '<div class="comp-card-val">' + chgVal + '</div>' +
            '<div class="comp-gov-breach ' + deltaClass(chg) + '">' + deltaComp(chg) + '</div>' +
            '<div class="comp-gov-footer comp-gov-empty-footer"><span>&nbsp;</span></div>' +
            spark(chg, m) +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function baseOpts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || (matchMedia('(prefers-color-scheme: dark)').matches && !document.documentElement.getAttribute('data-theme'));
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const textColor = isDark ? '#a3b0cc' : '#576275';
    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { top: 22, bottom: 6, left: 10, right: 18 }
      },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1a2744' : '#ffffff',
          titleColor: isDark ? '#ffffff' : '#0b1428',
          bodyColor: isDark ? '#dbe4ff' : '#222d3d',
          borderColor: isDark ? '#2a3d66' : '#d2d9e8',
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          cornerRadius: 6,
          usePointStyle: true,
          clip: false,
          position: 'nearest'
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: textColor,
            font: { family: "'IBM Plex Sans', sans-serif", size: 11, weight: '500' },
            padding: 6,
            maxRotation: 0,
            autoSkip: false
          },
          border: { display: false }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: "'IBM Plex Sans', sans-serif", size: 11 },
            padding: 8
          },
          border: { display: false }
        }
      }
    };
  }

  function line(label, data, color, isDashed = false) {
    return {
      label,
      data,
      borderColor: color,
      backgroundColor: color,
      borderDash: isDashed ? [5, 4] : [],
      borderWidth: isDashed ? 1.5 : 2.2,
      tension: 0,
      spanGaps: false,
      pointRadius: isDashed ? 0 : 5,
      pointHoverRadius: isDashed ? 0 : 7,
      pointBackgroundColor: color
    };
  }

  function drawCharts() {
    // Overview charts if needed
  }

  const PLAIN = {
    'Devices not reporting % of estate': ['Share of managed devices that have not checked in for more than 7 days.', 'A silent device may be unmonitored or unpatched.'],
    'Endpoint protection coverage %': ['Share of devices with every protection layer working: antivirus, patching, VPN and MFA.', 'Any gap leaves a device easier to attack.'],
    'Patch compliance %': ['Share of devices fully up to date with security patches.', 'Unpatched devices are the most common way in for attackers.'],
    'Critical patches outstanding': ['Critical security patches not yet installed.', 'These fix flaws attackers actively exploit, so the target is zero.'],
    'High patches outstanding': ['High-priority patches not yet installed.', 'Left open, they build up risk over time.'],
    'Patch deployment success rate %': ['Share of patch installs that completed without failing.', 'Failed installs leave devices exposed until retried.'],
    'Avg days to critical patch': ['Average days from a critical patch being released to it being installed.', 'The faster it is installed, the shorter the window for attackers.'],
    'Ransomware detections': ['Ransomware attacks detected on your devices.', 'Even a blocked attempt needs review, so the target is zero.'],
    'Devices with outdated protection % of estate': ['Share of devices running out-of-date security software.', 'Old protection can miss new threats.'],
    'P1 security incidents': ['The most serious security incidents (severity 1).', 'Each one needs a full review, so the target is zero.'],
    'Mean time to detect (hours)': ['Average hours from an alert firing to us confirming a threat.', 'Faster detection means less time for damage.'],
    'Mean time to respond (hours)': ['Average hours from confirming a threat to containing it.', 'Quick containment limits the damage.'],
    'Critical vulnerabilities open': ['Serious weaknesses found in your systems and not yet fixed.', 'They can be exploited, so the target is zero.'],
    'High vulnerabilities open': ['High-risk weaknesses found and not yet fixed.', 'Keeping the number low reduces exposure.'],
    'Mean time to remediate critical (days)': ['Average days from finding a critical weakness to fixing it.', 'Faster fixes shrink the time you are exposed.'],
    'Open >30 days past SLA': ['Weaknesses still open 30 or more days beyond the agreed fix time.', 'Overdue fixes mean a missed commitment, so the target is zero.'],
    'Open >60 days past SLA': ['Weaknesses still open 60 or more days beyond the agreed fix time.', 'Overdue fixes mean a missed commitment, so the target is zero.'],
    'Open >90 days past SLA': ['Weaknesses still open 90 or more days beyond the agreed fix time.', 'Overdue fixes mean a missed commitment, so the target is zero.'],
    'MFA coverage %': ['Share of user accounts that must use a second sign-in step.', 'MFA blocks most account takeovers.'],
    'First-time fix rate %': ['Share of tickets solved on first contact.', 'Fewer hand-offs means less disruption for your staff.'],
    'P1 response SLA %': ['Share of highest-priority tickets answered within the agreed time.', 'Urgent issues need a fast response.'],
    'P2 response SLA %': ['Share of high-priority tickets answered within the agreed time.', 'Keeps important issues moving.'],
    'Resolution SLA %': ['Share of tickets resolved within the agreed time.', 'It shows we deliver on our service commitments.'],
    'Recommendations completion %': ['Share of our security recommendations that have been completed.', 'Shows improvements are actually being made.'],
    'Policy exceptions open': ['Approved exceptions to security policy that are still open.', 'Each one is a known gap, so the target is zero.'],
    'Managed endpoints': ['Devices we manage, at month end.'],
    'Mobile devices - VPN': ['Mobile devices enrolled for management and VPN.'],
    'New endpoints': ['Devices added this month.'],
    'Removed endpoints': ['Devices retired this month.'],
    'Devices not reporting': ['Devices that have not checked in for more than 7 days.'],
    'Failed patch deployments': ['Patch installs that failed this month.'],
    'Successful patch deployments': ['Patch installs completed this month.'],
    'Threats blocked': ['Threats stopped by your endpoint protection this month.'],
    'Malware detections': ['Malware found and handled this month.'],
    'Policy violations': ['Times a protection policy was broken this month.'],
    'Devices with outdated protection': ['Devices running out-of-date security software.'],
    'Security incidents raised': ['Confirmed security incidents logged this month.'],
    'Medium vulnerabilities open': ['Medium-risk weaknesses still open at month end.'],
    'Vulnerabilities remediated': ['Weaknesses fixed this month.'],
    'Risky sign-ins detected': ['Sign-ins flagged as suspicious.'],
    'User-reported phishing': ['Suspicious emails reported by your staff.'],
    'Support requests': ['Tickets raised this month.'],
    'Incidents resolved': ['Tickets closed this month.'],
    'Reopened incidents': ['Tickets reopened after being closed.'],
    'Open ticket backlog (month end)': ['Tickets still open at month end.'],
    'Onboarding completed': ['New users set up this month.'],
    'Offboarding completed': ['Leavers removed this month.'],
    'ISO evidence requests completed': ['Evidence requests for your ISO audit that we fulfilled.'],
    'Configuration changes': ['Changes made under change control this month.'],
    'Security recommendations raised': ['New recommendations we gave you this month.'],
    'Recommendations completed': ['Recommendations closed this month.']
  };

  function plainHtml(r) {
    const p = PLAIN[r.name];
    if (!p) return '<p style="margin:0">' + (r.desc || '') + '</p>';
    return '<div><p style="margin:0">' + p[0] + '</p></div>';
  }

  function behind(r, m) {
    const f = n => {
      const x = flat.find(q => q.name === n);
      return x ? x.v[m] : null;
    };
    const h = re => {
      const x = r.helpers.find(y => re.test(y.name));
      return x ? x.v[m] : null;
    };
    const of = (a, b, t) => (typeof a === 'number' && typeof b === 'number' && b > 0) ? a + ' of ' + b + ' ' + t : '';
    const two = (a, b, t) => (typeof a === 'number' && typeof b === 'number') ? a + ' ' + t + ', ' + b + ' days in total' : '';

    switch (r.name) {
      case 'Endpoint protection coverage %': return of(h(/fully protected/i), f('Managed endpoints'), 'endpoints fully protected');
      case 'Patch compliance %': return of(h(/fully patched/i), f('Managed endpoints'), 'endpoints fully patched');
      case 'MFA coverage %': return of(h(/with MFA/i), h(/total enabled/i), 'users have MFA enforced');
      case 'Devices not reporting % of estate': return of(f('Devices not reporting'), f('Managed endpoints'), 'endpoints not reporting');
      case 'Devices with outdated protection % of estate': return of(f('Devices with outdated protection'), f('Managed endpoints'), 'endpoints with outdated protection');
      case 'Patch deployment success rate %': {
        const s = f('Successful patch deployments'), x = f('Failed patch deployments');
        return of(s, (typeof s === 'number' && typeof x === 'number') ? s + x : null, 'patch deployments succeeded');
      }
      case 'P1 response SLA %': return of(h(/within SLA/i), h(/total/i), 'P1 tickets responded to in time');
      case 'P2 response SLA %': return of(h(/within SLA/i), h(/total/i), 'P2 tickets responded to in time');
      case 'Resolution SLA %': return of(h(/within SLA/i), f('Incidents resolved'), 'resolved tickets met SLA');
      case 'First-time fix rate %': return of(h(/first contact/i), f('Incidents resolved'), 'tickets fixed at first contact');
      case 'Recommendations completion %': return of(f('Recommendations completed'), f('Security recommendations raised'), 'recommendations completed');
      case 'Avg days to critical patch': return two(h(/patches deployed/i), h(/total days/i), 'critical patches');
      case 'Mean time to remediate critical (days)': return two(h(/items remediated/i), h(/total days/i), 'critical items fixed');
    }
    return '';
  }

  let drawerChart = null, lastFocus = null;

  function openDrawer(id) {
    const r = byId[id];
    if (!r) return;
    lastFocus = document.activeElement;
    const m = state.m;
    const x = r.scored ? r.rag[m] : null;

    const rowsHtml = CHART_MONTHS.map(i => '<tr><td>' + MON[i] + '</td><td>' + fmt(r, r.v[i]) + '</td><td>' + (r.scored && r.rag[i] !== null && r.rag[i] !== undefined ? '<span class="pill ' + cls(r.rag[i]) + '">' + label(r, r.rag[i]) + '</span>' : '<span class="sub">–</span>') + '</td></tr>').join('') +
      '<tr><td><strong>Year to date</strong></td><td><strong>' + fmt(r, r.ytd) + '</strong></td><td>' + (r.scored && r.ytdrag !== null && r.ytdrag !== undefined ? '<span class="pill ' + cls(r.ytdrag) + '">' + label(r, r.ytdrag) + '</span>' : '') + '</td></tr>';

    const help = r.helpers.length ? '<div><h2 class="h2">Behind this figure</h2><p class="sub">The counts used to work it out</p><div class="scroll"><table class="mini"><thead><tr><th>Input</th>' + CHART_MONTHS.map(i => '<th>' + MON[i] + '</th>').join('') + '</tr></thead><tbody>' + r.helpers.map(h => '<tr><td>' + h.name + '</td>' + CHART_MONTHS.map(i => '<td>' + (typeof h.v[i] === 'number' ? (Number.isInteger(h.v[i]) ? h.v[i] : h.v[i].toFixed(1)) : '–') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div></div>' : '';

    const v0 = r.v[m];
    const gap = (function () {
      if (!r.scored || typeof v0 !== 'number') return '';
      const t = r.target;
      if (r.veto) return v0 === 0 ? 'No breach this month' : fmt(r, v0) + ' against a target of zero';
      const d = r.dir === 'Higher' ? t - v0 : v0 - t;
      if (d <= 1e-9) return 'Meets target';
      const ad = isPct(r) ? (d * 100).toFixed(1) + ' points' : (Number.isInteger(d) ? d : d.toFixed(1)) + unitOf(r);
      return ad + ' ' + (r.dir === 'Higher' ? 'below' : 'above') + ' target';
    })();

    const wtxt = tier(r);
    const facts = r.scored ? '<div class="facts"><div><div class="t">Target</div><div class="v">' + target(r) + '</div></div><div><div class="t">Direction</div><div class="v">' + (r.dir === 'Higher' ? 'Higher is better' : 'Lower is better') + '</div></div><div><div class="t">Weight</div><div class="v">' + wtxt + '</div></div></div>' : '<div class="note">Information only. Shown for context and not scored against a target.</div>';
    const cl = behind(r, m);
    const line = [gap, delta(r, m)].filter(Boolean).join(' · ');

    document.getElementById('layer').innerHTML = '<div class="scrim" data-close></div><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="dt">' +
      '<div class="dh"><div><h3 id="dt">' + r.name + '</h3><p class="sub">' + r.sec + '</p></div><button class="x" data-close aria-label="Close">✕</button></div>' +
      '<div class="db">' +
        '<div><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="num" style="font-size:34px;font-weight:600;letter-spacing:-.02em;line-height:1.2">' + fmt(r, v0) + '</span>' + (r.scored ? (x !== null && x !== undefined ? pill(r, x) : '') : '<span class="pill n">Information only</span>') + '</div>' +
        (cl ? '<p style="margin:2px 0 0;font-weight:500">' + cl + '</p>' : '') +
        '<p class="sub" style="margin-top:2px">' + MON[m] + ' ' + state.year + (line ? ' · ' + line : '') + '</p></div>' +
        plainHtml(r) +
        facts +
        '<div><h2 class="h2">Monthly trend</h2><div class="chart" style="height:170px;margin-top:8px"><canvas id="dc" role="img" aria-label="Monthly values for ' + r.name + '">Monthly values.</canvas></div></div>' +
        '<div><h2 class="h2">By month</h2><div class="scroll"><table class="mini"><thead><tr><th>Month</th><th>Value</th><th>Status</th></tr></thead><tbody>' + rowsHtml + '</tbody></table></div></div>' +
        help +
      '</div></aside>';

    const vals = CHART_MONTHS.map(i => typeof r.v[i] === 'number' ? (isPct(r) ? +(r.v[i] * 100).toFixed(1) : r.v[i]) : null);
    const o = baseOpts();
    if (isPct(r)) o.scales.y.ticks.callback = v => v + '%';
    else if (unitOf(r)) o.scales.y.ticks.callback = v => v + unitOf(r);

    const ds = [{
      label: r.name,
      data: vals,
      borderColor: css('--accent'),
      backgroundColor: css('--accent'),
      borderWidth: 2.2,
      tension: 0,
      spanGaps: false,
      pointRadius: 5,
      pointBackgroundColor: CHART_MONTHS.map(i => r.scored && r.rag[i] !== null && r.rag[i] !== undefined ? css(r.rag[i] === 1 ? '--g' : r.rag[i] === 0 ? '--a' : '--r') : css('--accent'))
    }];

    if (r.scored && !r.veto) ds.push({
      label: 'Target',
      data: CHART_MONTHS.map(() => isPct(r) ? r.target * 100 : r.target),
      borderColor: css('--muted'),
      borderDash: [5, 4],
      borderWidth: 1.5,
      pointRadius: 0
    });

    if (r.veto) o.scales.y.min = 0;
    const tgt = r.scored ? (isPct(r) ? r.target * 100 : r.target) : null;

    const band = {
      id: 'band',
      beforeDatasetsDraw(ch) {
        if (!r.scored || r.veto) return;
        const ca = ch.chartArea, y = ch.scales.y;
        const lo = r.dir === 'Higher' ? tgt * 0.9 : tgt, hi = r.dir === 'Higher' ? tgt : tgt * 1.1, a = y.getPixelForValue(hi), b = y.getPixelForValue(lo);
        const c = ch.ctx;
        c.save();
        c.beginPath();
        c.rect(ca.left, ca.top, ca.right - ca.left, ca.bottom - ca.top);
        c.clip();
        c.fillStyle = css('--a-soft');
        c.fillRect(ca.left, Math.min(a, b), ca.right - ca.left, Math.abs(b - a));
        c.restore();
      }
    };

    const lab = {
      id: 'lab',
      afterDatasetsDraw(ch) {
        const c = ch.ctx, pts = ch.getDatasetMeta(0).data;
        c.save();
        c.font = '600 11px IBM Plex Sans, system-ui, sans-serif';
        c.fillStyle = css('--ink');
        c.textAlign = 'center';
        pts.forEach((pt, i) => {
          const v = vals[i];
          if (v === null) return;
          c.fillText(fmt(r, isPct(r) ? v / 100 : v), pt.x, pt.y - 10);
        });
        if (r.scored && !r.veto) {
          c.fillStyle = css('--muted');
          c.textAlign = 'left';
          c.fillText('Target ' + target(r), ch.chartArea.left + 4, ch.scales.y.getPixelForValue(tgt) - 5);
        }
        c.restore();
      }
    };

    o.layout = { padding: { top: 18, left: 12, right: 28 } };
    if (drawerChart) drawerChart.destroy();
    drawerChart = new Chart(document.getElementById('dc'), {
      type: 'line',
      data: { labels: CHART_MONTHS.map(i => MON[i]), datasets: ds },
      options: o,
      plugins: [band, lab]
    });

    const closeBtn = document.querySelector('.drawer .x');
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (drawerChart) {
      drawerChart.destroy();
      drawerChart = null;
    }
    const layer = document.getElementById('layer');
    if (layer) layer.innerHTML = '';
    if (lastFocus && lastFocus.focus) {
      try { lastFocus.focus(); } catch (e) {}
    }
  }

  /* render */
  function render() {
    if (window._patchRotationAnimId) { cancelAnimationFrame(window._patchRotationAnimId); window._patchRotationAnimId = null; }
    CHARTS.forEach(c => { try { c.destroy(); } catch (e) {} });
    CHARTS.length = 0;
    renderHeader();

    const tab = TABS.find(t => t.id === state.tab);
    const view = document.getElementById('view');
    if (!view) return;

    view.innerHTML = tab.id === 'overview' ? overview() :
      tab.id === 'scorecard' ? scorecard() :
      tab.id === 'endpoints' ? endpointsView() :
      tab.id === 'threats' ? threatsView() :
      tab.id === 'vuln' ? vulnView() :
      tab.id === 'identity' ? identityView() :
      tab.id === 'service' ? serviceView() :
      tab.id === 'compliance' ? complianceView() :
      section(tab);

    if (tab.id === 'overview') {
      drawCharts();
    } else if (tab.id === 'endpoints') {
      drawEndpointCharts();
    } else if (tab.id === 'threats') {
      drawThreatCharts();
    } else if (tab.id === 'vuln') {
      drawVulnCharts();
    } else if (tab.id === 'identity') {
      drawIdentityCharts();
    } else if (tab.id === 'service') {
      drawServiceCharts();
    }
  }

  function changeYear(newYear) {
    if (!newYear || isNaN(newYear)) return;
    const y = parseInt(newYear, 10);
    if (y && y !== state.year) {
      state.year = y;
      const yearDisp = document.getElementById('year-display');
      if (yearDisp) yearDisp.textContent = y;
      const monthKey = y + '-' + String(state.m).padStart(2, '0');
      fetchClientData(monthKey);
    }
  }

  // Top Action Year buttons
  const prevYearBtn = document.getElementById('year-prev-btn');
  if (prevYearBtn) {
    prevYearBtn.addEventListener('click', () => changeYear(state.year - 1));
  }
  const nextYearBtn = document.getElementById('year-next-btn');
  if (nextYearBtn) {
    nextYearBtn.addEventListener('click', () => changeYear(state.year + 1));
  }

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeBtnText = document.getElementById('theme-btn-text');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      if (themeBtnText) themeBtnText.textContent = next === 'dark' ? 'Light Theme' : 'Dark Theme';
      closeDrawer();
      render();
    });
  }

  // Print button
  const printBtn = document.getElementById('print-portal-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  // Download standalone HTML
  const dlBtn = document.getElementById('download-self-btn');
  if (dlBtn) {
    dlBtn.addEventListener('click', () => {
      const fullHtml = '<!doctype html>\n' + document.documentElement.outerHTML;
      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Brysa_Security_Report_' + state.year + '_' + String(state.m).padStart(2, '0') + '.html';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 600);
    });
  }

  // Live Sync Badge Flash
  let syncTimer = null;
  function flashSyncBadge(msg = 'SYNCED WITH MAIN PAGE') {
    const badge = document.getElementById('telemetry-sync-badge');
    const badgeText = document.getElementById('telemetry-sync-text');
    if (badgeText) badgeText.textContent = msg;
    if (badge) {
      badge.style.background = 'rgba(16, 185, 129, 0.25)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.6)';
    }
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      if (badgeText) badgeText.textContent = 'LIVE TELEMETRY VERIFIED';
      if (badge) {
        badge.style.background = '';
        badge.style.borderColor = '';
      }
    }, 3200);
  }

  // Real-time synchronization engine
  let lastSeenVersion = 1;
  function initLiveSync() {
    if (typeof EventSource !== 'undefined') {
      try {
        const es = new EventSource('/api/public/live-events');
        es.onmessage = e => {
          try {
            const p = JSON.parse(e.data);
            if (p && p.type === 'data_updated') {
              if (p.version && p.version > lastSeenVersion) {
                lastSeenVersion = p.version;
                const mKey = p.month || (state.year + '-' + String(state.m).padStart(2, '0'));
                fetchClientData(mKey);
                flashSyncBadge('LIVE SYNC: UPDATED FROM MAIN PAGE');
              }
            }
          } catch (err) {}
        };
      } catch (err) {}
    }

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const bc = new BroadcastChannel('brysa_mss_channel');
        bc.onmessage = e => {
          if (e.data && e.data.type === 'main_page_updated') {
            const mKey = e.data.month || (state.year + '-' + String(state.m).padStart(2, '0'));
            fetchClientData(mKey);
            flashSyncBadge('LIVE SYNC: UPDATED FROM MAIN PAGE');
          }
        };
      } catch (err) {}
    }

    window.addEventListener('storage', e => {
      if (e.key === 'brysa_data_version' || e.key === 'brysa_active_month') {
        const mKey = localStorage.getItem('brysa_active_month') || (state.year + '-' + String(state.m).padStart(2, '0'));
        fetchClientData(mKey);
        flashSyncBadge('LIVE SYNC: UPDATED FROM MAIN PAGE');
      }
    });

    setInterval(async () => {
      try {
        const res = await fetch('/api/public/version');
        if (!res.ok) return;
        const vData = await res.json();
        if (vData && vData.version && vData.version > lastSeenVersion) {
          lastSeenVersion = vData.version;
          const mKey = vData.activeMonth || (state.year + '-' + String(state.m).padStart(2, '0'));
          fetchClientData(mKey);
          flashSyncBadge('LIVE SYNC: UPDATED FROM MAIN PAGE');
        }
      } catch (err) {}
    }, 2500);
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-m],[data-tab],[data-open],[data-close]');
    if (!t) return;
    if (t.dataset.close !== undefined) return closeDrawer();
    if (t.dataset.m) {
      const newM = +t.dataset.m;
      if (newM && newM !== state.m) {
        state.m = newM;
        closeDrawer();
        const monthKey = state.year + '-' + String(state.m).padStart(2, '0');
        fetchClientData(monthKey);
      }
      return;
    }
    if (t.dataset.tab) {
      state.tab = t.dataset.tab;
      closeDrawer();
      render();
      window.scrollTo(0, 0);
      return;
    }
    if (t.dataset.open) openDrawer(+t.dataset.open);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  try {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      closeDrawer();
      render();
    });
  } catch (e) {}

  try {
    new MutationObserver(() => {
      closeDrawer();
      render();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  } catch (e) {}

  
  if (window.Chart) {
    Chart.defaults.font.family = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.font.weight = '600';
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.layout = {
      padding: { top: 22, right: 20, bottom: 12, left: 14 }
    };
  }


  // Initial immediate render with baseline, followed immediately by live fetch
  render();
  const initKey = state.year + '-' + String(state.m).padStart(2, '0');
  fetchClientData(initKey);
  initLiveSync();

})();
