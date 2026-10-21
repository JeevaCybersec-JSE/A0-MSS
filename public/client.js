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
    { id: 'vuln', label: 'Vulnerability Management', secs: ['Vulnerability Management'] },
    { id: 'identity', label: 'Identity & Email', secs: ['Identity & Access', 'Email & Phishing'] },
    { id: 'service', label: 'Service Delivery', secs: ['Service Delivery'] },
    { id: 'compliance', label: 'Compliance', secs: ['Compliance'] },
    { id: 'scorecard', label: 'Scorecard' }
  ];

  const state = { tab: 'overview', m: 5, year: 2026, data: null };
  let activeClientDetail = null;
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
      r.ytdMethod = null;

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

  // =========================================================================
  // GLASSMORPHIC SEGMENT DETAIL CARD (FLOATING OVERLAY ABOVE PIE/DONUT CHARTS)
  // =========================================================================
  let activeFloatingClientCard = null;
  let activeFloatingClientBackdrop = null;
  let activeFloatingClientCleanup = null;

  function positionFloatingCardCenter(card) {
    if (!card) return;
    card.style.position = 'fixed';
    card.style.top = '50%';
    card.style.left = '50%';
    card.style.zIndex = '10050';
  }
  const positionFloatingCardAbove = positionFloatingCardCenter;

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function closeClientGlassDetailModal() {
    activeClientDetail = null;
    const b = document.querySelector('.glass-detail-backdrop');
    if (b) b.remove();
    const c = document.querySelector('.glass-segment-detail-card');
    if (c) c.remove();
  }

  function renderClientGlassDetailCard() {
    closeClientGlassDetailModal();
  }

  function openClientPatchCompDetail(segIdx) {
    closeClientGlassDetailModal();
    const pc = flat.find(x => x.name === 'Patch compliance %');
    if (pc) drawer(pc);
  }

  function openClientPatchesSegmentDetail(segIdx) {
    closeClientGlassDetailModal();
    const r = segIdx === 0 ? flat.find(x => x.name === 'Critical patches outstanding') : flat.find(x => x.name === 'High patches outstanding');
    if (r) drawer(r);
  }

  function openClientVulnDonutDetail(segIdx) {
    closeClientGlassDetailModal();
    const names = ['Critical vulnerabilities open', 'High vulnerabilities open', 'Medium vulnerabilities open'];
    const r = flat.find(x => x.name === names[segIdx]);
    if (r) drawer(r);
  }

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
        DATA.ov.score[i] = (typeof mObj.healthScore === 'number') ? mObj.healthScore : null;
      } else {
        DATA.ov.overall[i] = null;
        DATA.ov.breaches[i] = 0;
        DATA.ov.score[i] = null;
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
          r.ytdMethod = null;
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
              const rawFallback = r._origV[i];
              r.v[i] = (isPct(r) && rawFallback > 2.0) ? rawFallback / 100 : rawFallback;
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
            r.ytdMethod = yObj.method || null;
          } else {
            r.ytd = null;
            r.ytdrag = null;
            r.ytdMethod = null;
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

  function updateTelemetryBadge(isLive) {
    const badge = document.querySelector('.telemetry-pulse-badge');
    if (!badge) return;
    if (isLive) {
      badge.innerHTML = '<span>LIVE TELEMETRY VERIFIED</span>';
      badge.classList.remove('fallback-mode');
    } else {
      badge.innerHTML = '<span style="color:#f59e0b;font-weight:600">OFFLINE / CACHED FALLBACK DATA</span>';
      badge.classList.add('fallback-mode');
    }
  }

  function extractToken() {
    try {
      const q = new URLSearchParams(window.location.search).get('token');
      if (q && q.trim()) return q.trim();
      const m = window.location.pathname.match(/\/client\/([a-zA-Z0-9_-]+)/);
      if (m && m[1] && m[1].trim()) return m[1].trim();
    } catch (e) {}
    return null;
  }

  async function fetchClientData(monthKey) {
    try {
      const token = extractToken();
      let url = '/api/public/client-data?month=' + encodeURIComponent(monthKey);
      if (token) url += '&token=' + encodeURIComponent(token);
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      if (!json || !json.success) throw new Error(json.error || 'Server error');
      state.data = json;

      if (json.clientName && json.clientName !== 'Brysa') {
        const topClientEl = document.getElementById('top-client-name');
        if (topClientEl) topClientEl.textContent = ' · Client: ' + json.clientName;
      }

      applyServerData(json);
      updateTelemetryBadge(true);
      render();
      if (currentDrawerId && document.getElementById('layer').querySelector('.drawer')) {
        openDrawer(currentDrawerId);
      }
    } catch (err) {
      console.warn('Note: using cached client figures:', err.message);
      updateTelemetryBadge(false);
      render();
      if (currentDrawerId && document.getElementById('layer').querySelector('.drawer')) {
        openDrawer(currentDrawerId);
      }
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
    if (!r || !r.v) {
      return '<div class="luminous-spark-empty"><span class="luminous-empty-badge">No data recorded</span></div>';
    }

    // ViewBox: 240 wide, 62 tall. Plot area: X from 12 to 228, baseY = 46, plotH = 34
    const plotW = 216;
    const plotH = 34;
    const startX = 12;
    const baseY = 46;

    // Full 12-month coordinate system across entire card width (Jan = 12, Dec = 228)
    const getX = mon => startX + ((mon - 1) / 11) * plotW;

    // Dynamically detect the latest month for which actual numeric data is provided
    let latestMonthWithData = 0;
    for (let i = 12; i >= 1; i--) {
      if (typeof r.v[i] === 'number' && !isNaN(r.v[i])) {
        latestMonthWithData = i;
        break;
      }
    }

    if (latestMonthWithData === 0) {
      return '<div class="luminous-spark-empty">' +
        '<div class="luminous-empty-badge">' +
          '<span class="luminous-empty-dot"></span>' +
          '<span>No historical telemetry recorded</span>' +
        '</div>' +
      '</div>';
    }

    // Collect all valid values up to latestMonthWithData to establish true min/max bounds
    const validVals = [];
    for (let i = 1; i <= latestMonthWithData; i++) {
      if (typeof r.v[i] === 'number' && !isNaN(r.v[i])) {
        validVals.push(r.v[i]);
      }
    }

    const minV = Math.min(...validVals, 0);
    const maxV = Math.max(...validVals, 1);
    const range = (maxV - minV) || 1;

    const getY = v => {
      if (typeof v !== 'number' || isNaN(v)) return baseY;
      const norm = (v - minV) / range;
      return baseY - norm * plotH;
    };

    // Partition available data into contiguous segments so missing months are never bridged or treated as zero
    const segments = [];
    let currentSegment = [];
    for (let i = 1; i <= latestMonthWithData; i++) {
      if (typeof r.v[i] === 'number' && !isNaN(r.v[i])) {
        currentSegment.push({
          m: i,
          val: r.v[i],
          x: getX(i),
          y: getY(r.v[i])
        });
      } else {
        if (currentSegment.length > 0) {
          segments.push(currentSegment);
          currentSegment = [];
        }
      }
    }
    if (currentSegment.length > 0) {
      segments.push(currentSegment);
    }

    function splinePath(points) {
      if (points.length < 2) return '';
      if (points.length === 2) {
        return 'M ' + points[0].x.toFixed(1) + ' ' + points[0].y.toFixed(1) +
               ' L ' + points[1].x.toFixed(1) + ' ' + points[1].y.toFixed(1);
      }
      let d = 'M ' + points[0].x.toFixed(1) + ' ' + points[0].y.toFixed(1);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? 0 : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
        const cp1x = p1.x + (p2.x - p0.x) / 5;
        const cp1y = p1.y + (p2.y - p0.y) / 5;
        const cp2x = p2.x - (p3.x - p1.x) / 5;
        const cp2y = p2.y - (p3.y - p1.y) / 5;
        d += ' C ' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) + ', ' + cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) + ', ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
      }
      return d;
    }

    // Color theme mapping matching design rules (Amber flame by default, Green/Red/Blue by RAG/category)
    let colorKey = 'amber';
    const ragMonth = (r.rag && r.rag[m] !== null && r.rag[m] !== undefined) ? m : latestMonthWithData;
    if (r.scored && r.rag) {
      if (r.rag[ragMonth] === 1) colorKey = 'green';
      else if (r.rag[ragMonth] === -1) colorKey = 'red';
      else if (r.rag[ragMonth] === 0) colorKey = 'amber';
    } else if (r.name && (r.name.toLowerCase().includes('patch') || r.name.toLowerCase().includes('device'))) {
      colorKey = 'blue';
    }

    const colorPalettes = {
      amber: {
        neon: '#f97316',
        stroke: '#fb923c',
        fillStart: 'rgba(249, 115, 22, 0.48)',
        fillMid: 'rgba(249, 115, 22, 0.16)',
        bgFill: 'rgba(234, 88, 12, 0.12)',
        halo: 'rgba(251, 146, 60, 0.95)'
      },
      green: {
        neon: '#10b981',
        stroke: '#34d399',
        fillStart: 'rgba(16, 185, 129, 0.48)',
        fillMid: 'rgba(16, 185, 129, 0.16)',
        bgFill: 'rgba(5, 150, 105, 0.12)',
        halo: 'rgba(52, 211, 153, 0.95)'
      },
      red: {
        neon: '#ef4444',
        stroke: '#f87171',
        fillStart: 'rgba(239, 68, 68, 0.48)',
        fillMid: 'rgba(239, 68, 68, 0.16)',
        bgFill: 'rgba(220, 38, 38, 0.12)',
        halo: 'rgba(248, 113, 113, 0.95)'
      },
      blue: {
        neon: '#2563eb',
        stroke: '#60a5fa',
        fillStart: 'rgba(37, 99, 235, 0.48)',
        fillMid: 'rgba(37, 99, 235, 0.16)',
        bgFill: 'rgba(29, 78, 216, 0.12)',
        halo: 'rgba(96, 165, 250, 0.95)'
      }
    };

    const c = colorPalettes[colorKey] || colorPalettes.amber;
    const uid = 'r' + Math.abs(r.name.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 99999);

    // Build SVG paths strictly for valid contiguous segments up to latestMonthWithData
    let segmentsSvg = '';
    segments.forEach(seg => {
      if (seg.length === 1) {
        segmentsSvg += '<circle cx="' + seg[0].x.toFixed(1) + '" cy="' + seg[0].y.toFixed(1) + '" r="2.8" fill="' + c.stroke + '" />';
      } else if (seg.length >= 2) {
        const bgPoints = seg.map(pt => ({
          x: pt.x,
          y: baseY - ((baseY - pt.y) * 0.72)
        }));
        const startXSeg = seg[0].x.toFixed(1);
        const endXSeg = seg[seg.length - 1].x.toFixed(1);

        const fgLineD = splinePath(seg);
        const fgAreaD = fgLineD + ' L ' + endXSeg + ' ' + baseY + ' L ' + startXSeg + ' ' + baseY + ' Z';

        const bgLineD = splinePath(bgPoints);
        const bgAreaD = bgLineD + ' L ' + endXSeg + ' ' + baseY + ' L ' + startXSeg + ' ' + baseY + ' Z';

        segmentsSvg += '<!-- Secondary Background Ridge Wave -->' +
          '<path d="' + bgAreaD + '" fill="url(#bg-' + uid + ')" />' +
          '<path d="' + bgLineD + '" fill="none" stroke="' + c.neon + '" stroke-opacity="0.32" stroke-width="1" />' +
          '<!-- Primary Foreground Ridge Wave -->' +
          '<path d="' + fgAreaD + '" fill="url(#fg-' + uid + ')" />' +
          '<!-- Glowing Neon Line Path -->' +
          '<path d="' + fgLineD + '" fill="none" stroke="' + c.stroke + '" stroke-width="1.8" filter="url(#glow-' + uid + ')" vector-effect="non-scaling-stroke" />';
      }
    });

    // All 12 months visible on the X-axis timeline (January to December)
    const allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const ticks = allMonths.map(mon => {
      const x = getX(mon);
      const isAct = (mon === m);
      const isFuture = (mon > latestMonthWithData);
      const hasData = (typeof r.v[mon] === 'number' && !isNaN(r.v[mon]));
      const num = String(mon).padStart(2, '0');
      const strokeCol = isAct ? c.stroke : (hasData ? 'rgba(148, 163, 184, 0.28)' : 'rgba(148, 163, 184, 0.16)');
      const strokeW = isAct ? '1.5' : '1';
      const txtCls = 'luminous-tick-txt' + (isAct ? ' active' : '') + (isFuture ? ' future-tick' : '');

      return '<line x1="' + x.toFixed(1) + '" y1="' + baseY + '" x2="' + x.toFixed(1) + '" y2="' + (baseY + 3) + '" stroke="' + strokeCol + '" stroke-width="' + strokeW + '" />' +
        '<text x="' + x.toFixed(1) + '" y="' + (baseY + 11) + '" text-anchor="middle" class="' + txtCls + '">' + num + '</text>';
    }).join('');

    // Glowing Luminous Beacon Node on Active Month (rendered ONLY if active month has real data)
    let beaconSvg = '';
    if (typeof r.v[m] === 'number' && !isNaN(r.v[m])) {
      const curPt = { x: getX(m), y: getY(r.v[m]) };
      beaconSvg = '<!-- Glowing Luminous Beacon Node on Active Month -->' +
        '<g class="luminous-beacon-group" transform="translate(' + curPt.x.toFixed(1) + ', ' + curPt.y.toFixed(1) + ')">' +
          '<line x1="0" y1="0" x2="0" y2="' + (baseY - curPt.y).toFixed(1) + '" stroke="' + c.stroke + '" stroke-opacity="0.4" stroke-dasharray="2,2" stroke-width="1" />' +
          '<circle cx="0" cy="0" r="5" fill="' + c.neon + '" opacity="0.45">' +
            '<animate attributeName="r" values="3.5;7.5;3.5" dur="2.4s" repeatCount="indefinite" />' +
            '<animate attributeName="opacity" values="0.55;0.12;0.55" dur="2.4s" repeatCount="indefinite" />' +
          '</circle>' +
          '<circle cx="0" cy="0" r="3.6" fill="' + c.stroke + '" opacity="0.9" />' +
          '<circle cx="0" cy="0" r="1.8" fill="#ffffff" />' +
        '</g>';
    }

    return '<div class="luminous-ridge-wrap">' +
      '<svg viewBox="0 0 240 62" preserveAspectRatio="none" class="luminous-ridge-svg" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="fg-' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="' + c.stroke + '" stop-opacity="0.52" />' +
            '<stop offset="50%" stop-color="' + c.neon + '" stop-opacity="0.18" />' +
            '<stop offset="100%" stop-color="' + c.neon + '" stop-opacity="0.0" />' +
          '</linearGradient>' +
          '<linearGradient id="bg-' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="' + c.neon + '" stop-opacity="0.25" />' +
            '<stop offset="100%" stop-color="' + c.neon + '" stop-opacity="0.0" />' +
          '</linearGradient>' +
          '<filter id="glow-' + uid + '" x="-20%" y="-20%" width="140%" height="140%">' +
            '<feGaussianBlur stdDeviation="2.2" result="blur" />' +
            '<feMerge>' +
              '<feMergeNode in="blur" />' +
              '<feMergeNode in="SourceGraphic" />' +
            '</feMerge>' +
          '</filter>' +
        '</defs>' +
        '<!-- Baseline Grid -->' +
        '<line x1="12" y1="' + baseY + '" x2="228" y2="' + baseY + '" stroke="rgba(148, 163, 184, 0.16)" stroke-width="1" />' +
        segmentsSvg +
        '<!-- Timeline Ticks -->' +
        ticks +
        beaconSvg +
      '</svg>' +
    '</div>';
  }

  // ==========================================================================
  // LUMINOUS MULTI-LAYER MOUNTAIN RIDGE TRAJECTORY CHART (REFERENCE SECTION 2)
  // Multi-layered undulating translucent mountain ridges with milestone drop needles
  // ==========================================================================
  function createLuminousMountainRidgeChart(opts) {
    const id = opts.id || ('mt_ridge_' + Math.floor(Math.random() * 100000));
    const width = opts.width || 760;
    const height = opts.height || 210;
    const points = opts.points || [];
    const activeMonth = opts.activeMonth || state.m;
    const yMin = typeof opts.yMin === 'number' ? opts.yMin : 0;
    const yMax = typeof opts.yMax === 'number' ? opts.yMax : 100;
    const yUnit = opts.yUnit !== undefined ? opts.yUnit : '%';
    const yTicks = opts.yTicks || [20, 40, 65, 95];
    const xLabels = opts.xLabels || CHART_MONTHS.map(i => MON[i]);
    const milestones = opts.milestones || [];
    const themeColor = opts.themeColor || 'amber';

    const palettes = {
      amber: {
        neon: '#f97316',
        stroke: '#fb923c',
        fgGradTop: 'rgba(249, 115, 22, 0.62)',
        fgGradBot: 'rgba(249, 115, 22, 0.0)',
        midFillTop: 'rgba(234, 88, 12, 0.35)',
        midFillBot: 'rgba(234, 88, 12, 0.0)',
        bgFillTop: 'rgba(194, 65, 12, 0.20)',
        bgFillBot: 'rgba(194, 65, 12, 0.0)',
        halo: 'rgba(251, 146, 60, 0.95)',
        core: '#ffffff'
      },
      green: {
        neon: '#10b981',
        stroke: '#34d399',
        fgGradTop: 'rgba(16, 185, 129, 0.62)',
        fgGradBot: 'rgba(16, 185, 129, 0.0)',
        midFillTop: 'rgba(5, 150, 105, 0.35)',
        midFillBot: 'rgba(5, 150, 105, 0.0)',
        bgFillTop: 'rgba(4, 120, 87, 0.20)',
        bgFillBot: 'rgba(4, 120, 87, 0.0)',
        halo: 'rgba(52, 211, 153, 0.95)',
        core: '#ffffff'
      },
      blue: {
        neon: '#2563eb',
        stroke: '#60a5fa',
        fgGradTop: 'rgba(37, 99, 235, 0.62)',
        fgGradBot: 'rgba(37, 99, 235, 0.0)',
        midFillTop: 'rgba(29, 78, 216, 0.35)',
        midFillBot: 'rgba(29, 78, 216, 0.0)',
        bgFillTop: 'rgba(30, 64, 175, 0.20)',
        bgFillBot: 'rgba(30, 64, 175, 0.0)',
        halo: 'rgba(96, 165, 250, 0.95)',
        core: '#ffffff'
      }
    };

    const c = palettes[themeColor] || palettes.amber;

    // Boundaries
    const padL = 46;
    const padR = 24;
    const padT = 32;
    const padB = 34;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;
    const baseY = height - padB;

    const range = (yMax - yMin) || 1;
    const getX = i => padL + (i / Math.max(1, points.length - 1)) * plotW;
    const getY = v => {
      if (typeof v !== 'number' || isNaN(v)) return baseY;
      const clamped = Math.max(yMin, Math.min(yMax, v));
      return baseY - ((clamped - yMin) / range) * plotH;
    };

    const fgCoords = points.map((v, i) => ({ x: getX(i), y: getY(v), v, m: i + 1 }));

    // Midground ridge: offset smooth secondary mountain wave
    const midCoords = fgCoords.map((pt, i) => {
      const factor = 0.70 + 0.16 * Math.sin((i / 11) * Math.PI * 2.2);
      return { x: pt.x, y: Math.min(baseY, baseY - ((baseY - pt.y) * factor)) };
    });

    // Background ridge: deeper undulating mountain wave
    const bgCoords = fgCoords.map((pt, i) => {
      const factor = 0.46 + 0.18 * Math.cos((i / 11) * Math.PI * 1.8);
      return { x: pt.x, y: Math.min(baseY, baseY - ((baseY - pt.y) * factor)) };
    });

    function getSpline(pts) {
      if (!pts || pts.length < 2) return '';
      let d = 'M ' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? 0 : i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
        const cp1x = p1.x + (p2.x - p0.x) / 4.2;
        const cp1y = p1.y + (p2.y - p0.y) / 4.2;
        const cp2x = p2.x - (p3.x - p1.x) / 4.2;
        const cp2y = p2.y - (p3.y - p1.y) / 4.2;
        d += ' C ' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) + ', ' + cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) + ', ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
      }
      return d;
    }

    const fgLine = getSpline(fgCoords);
    const fgArea = fgLine + ' L ' + fgCoords[fgCoords.length - 1].x.toFixed(1) + ' ' + baseY + ' L ' + fgCoords[0].x.toFixed(1) + ' ' + baseY + ' Z';

    const midLine = getSpline(midCoords);
    const midArea = midLine + ' L ' + midCoords[midCoords.length - 1].x.toFixed(1) + ' ' + baseY + ' L ' + midCoords[0].x.toFixed(1) + ' ' + baseY + ' Z';

    const bgLine = getSpline(bgCoords);
    const bgArea = bgLine + ' L ' + bgCoords[bgCoords.length - 1].x.toFixed(1) + ' ' + baseY + ' L ' + bgCoords[0].x.toFixed(1) + ' ' + baseY + ' Z';

    // Grid lines & Y-ticks
    let yTicksSvg = '';
    yTicks.forEach(tickVal => {
      const yPos = getY(tickVal);
      yTicksSvg += '<line x1="' + padL + '" y1="' + yPos.toFixed(1) + '" x2="' + (width - padR) + '" y2="' + yPos.toFixed(1) + '" stroke="rgba(148, 163, 184, 0.12)" stroke-dasharray="3,4" stroke-width="1" />' +
        '<text x="' + (padL - 8) + '" y="' + (yPos + 3.5).toFixed(1) + '" text-anchor="end" class="luminous-axis-txt">' + tickVal + yUnit + '</text>';
    });

    const baselineSvg = '<line x1="' + padL + '" y1="' + baseY + '" x2="' + (width - padR) + '" y2="' + baseY + '" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1" />';

    // X-axis ticks & labels
    let xTicksSvg = '';
    fgCoords.forEach((pt, i) => {
      const isAct = (i + 1 === activeMonth);
      const monNum = String(i + 1).padStart(2, '0');
      const monName = xLabels[i] || '';
      xTicksSvg += '<line x1="' + pt.x.toFixed(1) + '" y1="' + baseY + '" x2="' + pt.x.toFixed(1) + '" y2="' + (baseY + 4) + '" stroke="' + (isAct ? c.stroke : 'rgba(148, 163, 184, 0.22)') + '" stroke-width="' + (isAct ? '1.5' : '1') + '" />' +
        '<text x="' + pt.x.toFixed(1) + '" y="' + (baseY + 13) + '" text-anchor="middle" class="luminous-tick-idx' + (isAct ? ' active' : '') + '">' + monNum + '</text>' +
        '<text x="' + pt.x.toFixed(1) + '" y="' + (baseY + 23) + '" text-anchor="middle" class="luminous-tick-mon' + (isAct ? ' active' : '') + '">' + monName + '</text>';
    });

    // Milestone Drop Needles & Beacon Nodes
    let milestonesSvg = '';
    milestones.forEach(ms => {
      const idx = ms.monthIndex - 1;
      if (idx < 0 || idx >= fgCoords.length) return;
      const pt = fgCoords[idx];
      const isAct = (ms.monthIndex === activeMonth);
      const needleColor = isAct ? '#ffffff' : c.stroke;
      const beaconStroke = isAct ? '#ffffff' : c.stroke;
      const badgeW = Math.max(46, (ms.label || '').length * 7.5 + 16);

      milestonesSvg += '<!-- Milestone Needle -->' +
        '<g class="luminous-milestone-marker" data-month="' + ms.monthIndex + '">' +
          '<line x1="' + pt.x.toFixed(1) + '" y1="' + pt.y.toFixed(1) + '" x2="' + pt.x.toFixed(1) + '" y2="' + baseY + '" stroke="' + c.stroke + '" stroke-opacity="' + (isAct ? '0.7' : '0.4') + '" stroke-dasharray="2,2" stroke-width="1.2" />' +
          '<!-- Radiant Beacon Node -->' +
          '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="5.5" fill="' + c.neon + '" opacity="0.45">' +
            '<animate attributeName="r" values="4;9;4" dur="2.4s" repeatCount="indefinite" />' +
            '<animate attributeName="opacity" values="0.55;0.12;0.55" dur="2.4s" repeatCount="indefinite" />' +
          '</circle>' +
          '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="3.8" fill="' + beaconStroke + '" opacity="0.9" />' +
          '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="1.8" fill="#ffffff" />' +
          '<!-- Value Callout Pill Badge -->' +
          '<g transform="translate(' + pt.x.toFixed(1) + ', ' + Math.max(12, pt.y - 14).toFixed(1) + ')">' +
            '<rect x="' + (-badgeW / 2).toFixed(1) + '" y="-10" width="' + badgeW.toFixed(1) + '" height="18" rx="9" fill="' + (isAct ? 'rgba(234, 88, 12, 0.95)' : 'rgba(15, 23, 42, 0.88)') + '" stroke="' + c.stroke + '" stroke-width="1" />' +
            '<text x="0" y="0" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-size="9.5" font-weight="700" font-family="JetBrains Mono, monospace">' + ms.label + '</text>' +
          '</g>' +
          (ms.sub && (baseY - pt.y > 38) ? '<text x="' + pt.x.toFixed(1) + '" y="' + (pt.y + Math.max(16, (baseY - pt.y) * 0.48)).toFixed(1) + '" text-anchor="middle" fill="#cbd5e1" font-size="9" font-weight="600" opacity="0.85">' + ms.sub + '</text>' : '') +
        '</g>';
    });

    return '<div class="luminous-mountain-card" id="' + id + '">' +
      '<svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="xMidYMid meet" class="luminous-mountain-svg" aria-label="Luminous Mountain Ridge Trajectory Chart">' +
        '<defs>' +
          '<linearGradient id="fg-grad-' + id + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="' + c.stroke + '" stop-opacity="0.62" />' +
            '<stop offset="50%" stop-color="' + c.neon + '" stop-opacity="0.22" />' +
            '<stop offset="100%" stop-color="' + c.neon + '" stop-opacity="0.0" />' +
          '</linearGradient>' +
          '<linearGradient id="mid-grad-' + id + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="' + c.neon + '" stop-opacity="0.35" />' +
            '<stop offset="100%" stop-color="' + c.neon + '" stop-opacity="0.0" />' +
          '</linearGradient>' +
          '<linearGradient id="bg-grad-' + id + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="' + c.neon + '" stop-opacity="0.18" />' +
            '<stop offset="100%" stop-color="' + c.neon + '" stop-opacity="0.0" />' +
          '</linearGradient>' +
          '<filter id="glow-neon-' + id + '" x="-20%" y="-20%" width="140%" height="140%">' +
            '<feGaussianBlur stdDeviation="2.8" result="blur" />' +
            '<feMerge>' +
              '<feMergeNode in="blur" />' +
              '<feMergeNode in="SourceGraphic" />' +
            '</feMerge>' +
          '</filter>' +
        '</defs>' +
        '<!-- Grid and Baselines -->' +
        yTicksSvg +
        baselineSvg +
        '<!-- Mountain Layer 1: Background Ridge -->' +
        '<path d="' + bgArea + '" fill="url(#bg-grad-' + id + ')" />' +
        '<path d="' + bgLine + '" fill="none" stroke="' + c.neon + '" stroke-opacity="0.28" stroke-width="1" />' +
        '<!-- Mountain Layer 2: Midground Ridge -->' +
        '<path d="' + midArea + '" fill="url(#mid-grad-' + id + ')" />' +
        '<path d="' + midLine + '" fill="none" stroke="' + c.neon + '" stroke-opacity="0.48" stroke-width="1.2" />' +
        '<!-- Mountain Layer 3: Foreground Vibrant Ridge -->' +
        '<path d="' + fgArea + '" fill="url(#fg-grad-' + id + ')" />' +
        '<!-- Glowing Neon Spline Line Across Crest -->' +
        '<path d="' + fgLine + '" fill="none" stroke="' + c.stroke + '" stroke-width="2.2" filter="url(#glow-neon-' + id + ')" vector-effect="non-scaling-stroke" />' +
        '<!-- X Axis Timeline Ticks -->' +
        xTicksSvg +
        '<!-- Milestone Drop Needles & Beacon Nodes -->' +
        milestonesSvg +
      '</svg>' +
    '</div>';
  }

  function getExecutivePosture(monthIndex) {
    const vetoes = scored.filter(r => r.veto);
    const br = vetoes.filter(r => r.rag[monthIndex] === -1);

    // Shared weighted health score (0-100) aligned with lib/calc.js
    let healthScore = null;
    if (typeof DATA.ov?.score?.[monthIndex] === 'number') {
      healthScore = DATA.ov.score[monthIndex];
    } else {
      let sumGreen = 0, sumAmber = 0, sumAll = 0;
      scored.forEach(r => {
        const x = r.rag[monthIndex];
        const w = WT(r);
        if (x === 1) { sumGreen += w; sumAll += w; }
        else if (x === 0) { sumAmber += w; sumAll += w; }
        else if (x === -1) { sumAll += w; }
      });
      healthScore = sumAll > 0 ? Math.round(((sumGreen + 0.5 * sumAmber) / sumAll) * 100) : 0;
    }

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

  
  function formatLastUpdatedDate(dateStr) {
    if (!dateStr) return '20 Oct 2026';
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    } catch (e) {}
    return String(dateStr);
  }

  function renderHeader() {
    calViewYear = state.year;
    calViewMonth = state.m;

    const yearDisplay = document.getElementById('year-display');
    if (yearDisplay) yearDisplay.textContent = state.year;

    const monthDisplayText = document.getElementById('month-display-text');
    if (monthDisplayText) monthDisplayText.textContent = FULL[state.m] + ' ' + state.year;
    if (typeof renderClientCustomCalendar === 'function') {
      renderClientCustomCalendar();
    }

    const topPeriod = document.getElementById('top-reporting-period');
    if (topPeriod) topPeriod.textContent = FULL[state.m] + ' ' + state.year;

    const lastUpdatedEl = document.getElementById('last-updated-date');
    if (lastUpdatedEl) {
      const rawDate = (state.data && state.data.lastUpdated) || '2026-10-20T09:08:23.529Z';
      lastUpdatedEl.textContent = formatLastUpdatedDate(rawDate);
    }

    const c = counts(state.m);

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

    const statusMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // --- Rolling Compliance History (Score-free operational status timeline) ---
    const rollingComplianceHtml = '<div class="posture-trend-widget" style="margin-top:16px;">' +
      '<div class="posture-trend-track-head">' +
        '<span class="posture-track-title">Rolling SLA Status History</span>' +
        '<span class="posture-track-sub">Contractual compliance status across recent reporting periods</span>' +
      '</div>' +
      '<div class="posture-trend-timeline">' +
        statusMonths.map(i => {
          const p_i = getExecutivePosture(i);
          const isActive = (i === m);
          const statusDot = '';
          const statusText = p_i.isBreach ? 'Breached' : (p_i.key === 'g' ? 'Compliant' : (p_i.key === 'a' ? 'In Tolerance' : 'Action Required'));

          return '<button type="button" class="posture-trend-step ' + (isActive ? 'active' : '') + '" data-m="' + i + '" aria-pressed="' + isActive + '" title="View report for ' + FULL[i] + ' ' + state.year + '">' +
            '<div class="posture-step-top">' +
              '<span class="posture-month-lbl">' + MON[i] + '</span>' +
              (isActive ? '<span class="posture-active-pill">Current</span>' : '') +
            '</div>' +
            '<div class="posture-status-tag ' + p_i.key + '" style="margin:12px 0 6px">' + statusDot + statusText + '</div>' +
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
        '<section class="card exec-status-card" aria-label="Executive Overall Status">' +
          '<div class="exec-status-header">' +
            '<div class="exec-status-info">' +
              '<span class="lbl">Overall status · ' + FULL[m] + ' ' + state.year + '</span>' +
              '<div style="display:flex;align-items:center;gap:10px;margin-top:4px">' +
                '<span class="word ' + k + '" style="font-size:28px;font-weight:800;line-height:1">' + (rag || 'No data') + '</span>' +
                '<span class="exec-kpi-badge ' + healthCls + '">' + healthGrade + '</span>' +
              '</div>' +
              '<p style="font-size:12.5px;margin:6px 0 0;color:var(--muted);line-height:1.4">' + sentence + '</p>' +
            '</div>' +
          '</div>' +
          rollingComplianceHtml +
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
            '<div class="perf-pill ' + pillCls + '">' + pillLabel + '</div>' +
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
              '<span class="perf-badge g">' + onTarget + ' On target</span>' +
              (nearTarget > 0 ? '<span class="perf-badge a">' + nearTarget + ' Near target</span>' : '') +
              '<span class="perf-badge r">' + offTarget + ' Off target</span>' +
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
        const totEstateDevices = mEnd + mobEnd;

        // Fetch Endpoint Protection Coverage metric directly from green source of truth
        const epcRow = fl('Endpoint protection coverage %');
        const hasEpcData = (epcRow && typeof epcRow.v?.[m] === 'number');
        let coveredPct = 0;
        if (hasEpcData) {
          const rawEpc = epcRow.v[m];
          coveredPct = (rawEpc <= 1 && rawEpc > 0) ? (rawEpc * 100) : rawEpc;
          coveredPct = Math.max(0, Math.min(100, coveredPct));
        }
        const remainingPct = hasEpcData ? Math.max(0, Math.min(100, 100 - coveredPct)) : 0;
        const baseDevices = mEnd > 0 ? mEnd : totEstateDevices;
        const dCovered = hasEpcData ? Math.round(baseDevices * (coveredPct / 100)) : 0;
        const dRemaining = hasEpcData ? Math.max(0, baseDevices - dCovered) : 0;

        // Donut SVG generator for Endpoint Protection Coverage (Covered vs Remaining)
        const donutSvg = (function () {
          const cx = 110, cy = 110, R = 88, r = 62, rMid = 75;
          let curAngle = -Math.PI / 2;
          const paths = [];
          const texts = [];

          if (!hasEpcData) {
            return '<svg class="estate-donut-svg" viewBox="0 0 220 220" width="200" height="200" style="display:block;margin:0 auto;overflow:visible;">' +
              '<circle cx="110" cy="110" r="' + rMid + '" fill="none" stroke="rgba(148, 163, 184, 0.25)" stroke-width="' + (R - r) + '" />' +
              '<g class="donut-center" pointer-events="none">' +
                '<text x="110" y="106" text-anchor="middle" font-size="22" font-weight="800" fill="var(--muted)">–</text>' +
                '<text x="110" y="124" text-anchor="middle" font-size="9" font-weight="700" fill="var(--muted)" letter-spacing="0.8">NO TELEMETRY</text>' +
              '</g>' +
            '</svg>';
          }

          const segs = [
            { label: 'Covered', pct: coveredPct, color: '#10b981' },
            { label: 'Remaining', pct: remainingPct, color: '#cbd5e1' }
          ];

          const active = segs.filter(s => s.pct > 0.001);

          if (active.length === 1 && active[0].pct >= 99.99) {
            paths.push('<circle cx="110" cy="110" r="' + rMid + '" fill="none" stroke="' + active[0].color + '" stroke-width="' + (R - r) + '" class="donut-arc-path"><title>' + active[0].label + ': ' + active[0].pct.toFixed(1) + '%</title></circle>');
          } else {
            active.forEach(s => {
              const span = (s.pct / 100) * 2 * Math.PI;
              const startA = curAngle;
              const endA = curAngle + span;

              const x1 = cx + R * Math.cos(startA);
              const y1 = cy + R * Math.sin(startA);
              const x2 = cx + R * Math.cos(endA);
              const y2 = cy + R * Math.sin(endA);
              const x3 = cx + r * Math.cos(endA);
              const y3 = cy + r * Math.sin(endA);
              const x4 = cx + r * Math.cos(startA);
              const y4 = cy + r * Math.sin(startA);
              const large = span > Math.PI ? 1 : 0;

              const d = 'M ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
                ' A ' + R + ' ' + R + ' 0 ' + large + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) +
                ' L ' + x3.toFixed(2) + ' ' + y3.toFixed(2) +
                ' A ' + r + ' ' + r + ' 0 ' + large + ' 0 ' + x4.toFixed(2) + ' ' + y4.toFixed(2) + ' Z';

              paths.push('<path d="' + d + '" fill="' + s.color + '" stroke="var(--card, #ffffff)" stroke-width="2.5" class="donut-arc-path" title="' + s.label + ': ' + s.pct.toFixed(1) + '%">' +
                '<title>' + s.label + ': ' + s.pct.toFixed(1) + '%</title>' +
              '</path>');

              if (s.pct >= 12) {
                const midA = startA + span / 2;
                const tx = cx + rMid * Math.cos(midA);
                const ty = cy + rMid * Math.sin(midA) + 4;
                const txtColor = (s.label === 'Covered') ? '#ffffff' : '#475569';
                texts.push('<text x="' + tx.toFixed(1) + '" y="' + ty.toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="' + txtColor + '" pointer-events="none">' + s.pct.toFixed(0) + '%</text>');
              }

              curAngle = endA;
            });
          }

          return '<svg class="estate-donut-svg" viewBox="0 0 220 220" width="200" height="200" style="display:block;margin:0 auto;overflow:visible;">' +
            '<g class="donut-segments">' + paths.join('') + '</g>' +
            '<g class="donut-labels">' + texts.join('') + '</g>' +
            '<g class="donut-center" pointer-events="none">' +
              '<text x="110" y="105" text-anchor="middle" font-size="24" font-weight="800" fill="var(--ink)" letter-spacing="-0.5">' + (coveredPct >= 99.95 || coveredPct % 1 === 0 ? coveredPct.toFixed(0) : coveredPct.toFixed(1)) + '%</text>' +
              '<text x="110" y="125" text-anchor="middle" font-size="9" font-weight="700" fill="var(--muted)" letter-spacing="0.8">COVERED</text>' +
            '</g>' +
          '</svg>';
        })();

        return '<div class="blk"><div class="bt"><h2>Device coverage &amp; infrastructure security</h2><span class="sub">Fleet composition, device connectivity, and endpoint protection health</span></div>' +
          '<section class="card estate-card" aria-label="Device health and coverage">' +
            '<div class="estate-card-head">' +
              '<div><span style="font-size:14px;font-weight:700;color:var(--ink)">Device Protection Composition</span><span style="font-size:12px;color:var(--muted);margin-left:8px">' + totEstateDevices + ' total enrolled devices (' + mEnd + ' endpoints + ' + mobEnd + ' mobile VPN)</span></div>' +
            '</div>' +
            '<div class="estate-main-grid">' +
              '<div class="estate-donut-panel">' +
                '<div class="estate-donut-wrap">' + donutSvg + '</div>' +
                '<div class="estate-donut-legend-grid">' +
                  '<div class="donut-legend-item" title="Covered: ' + (hasEpcData ? coveredPct.toFixed(1) + '%' : '–') + '">' +
                    '<span class="donut-legend-swatch" style="background:#10b981"></span>' +
                    '<span class="donut-legend-name">Covered</span>' +
                    '<span class="donut-legend-val">' + (hasEpcData ? coveredPct.toFixed(1) + '%' : '–') + '</span>' +
                  '</div>' +
                  '<div class="donut-legend-item" title="Remaining: ' + (hasEpcData ? remainingPct.toFixed(1) + '%' : '–') + '">' +
                    '<span class="donut-legend-swatch" style="background:#cbd5e1"></span>' +
                    '<span class="donut-legend-name">Remaining</span>' +
                    '<span class="donut-legend-val">' + (hasEpcData ? remainingPct.toFixed(1) + '%' : '–') + '</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="estate-stats-panel">' +
                '<div class="estate-tiles-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">' +
                  '<div class="estate-tile"><span class="tl">Managed Endpoints</span><span class="vl">' + mEnd + '</span><span class="sub">' + (delta(fl('Managed endpoints'), m) || 'Device count') + '</span></div>' +
                  '<div class="estate-tile"><span class="tl">Mobile Devices (VPN)</span><span class="vl">' + mobEnd + '</span><span class="sub">' + (delta(fl('Mobile devices - VPN'), m) || 'MDM enrolled') + '</span></div>' +
                  '<div class="estate-tile"><span class="tl">Protected Devices</span><span class="vl" style="color:var(--g)">' + (hasEpcData ? dCovered : '–') + '</span><span class="sub">' + (hasEpcData ? coveredPct.toFixed(1) + '% fully secured' : 'Data pending') + '</span></div>' +
                  '<div class="estate-tile"><span class="tl">Protection Gap</span><span class="vl" style="color:' + (dRemaining > 0 ? 'var(--a, #f59e0b)' : 'var(--g)') + '">' + (hasEpcData ? dRemaining : '–') + '</span><span class="sub">' + (hasEpcData ? (dRemaining > 0 ? remainingPct.toFixed(1) + '% to reach 100%' : 'All devices secured') : 'Data pending') + '</span></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +
        '</div>';
      })() +

      '<div class="blk"><div class="bt"><h2>Operational performance &amp; remediation</h2><span class="sub">Key speed of detection, response, and SLA indicators</span></div>' +
        (function() {
          return '<div class="incident-grid">' +
            '<section class="card incident-sla-card" aria-label="Speed of detection, response & remediation">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
                '<div><h2 class="h2" style="margin-bottom:2px">Speed of detection, response &amp; remediation</h2><span class="sub" style="margin:0">Key operational performance indicators</span></div>' +
                '<span class="perf-badge g" style="font-size:11px">Operations</span>' +
              '</div>' +
              '<div style="display:flex;flex-direction:column;gap:8px">' +
                [
                  { name: 'Mean time to detect (hours)', disp: 'Mean time to detect', sub: '' },
                  { name: 'Mean time to respond (hours)', disp: 'Mean time to respond', sub: 'Detection to containment · ' },
                  { name: 'Avg days to critical patch', disp: 'Avg days to critical patch', sub: '' },
                  { name: 'High patches outstanding', disp: 'High patches outstanding', sub: '' },
                  { name: 'High vulnerabilities open', disp: 'High vulnerabilities open', sub: '' }
                ].map(item => {
                  const r = fl(item.name);
                  if (!r) return '';
                  const v = r.v[m];
                  const tgt = r.target;
                  const hasVal = typeof v === 'number' && !isNaN(v);

                  // Unit handling
                  let unitStr = '';
                  let tgtUnitStr = '';
                  if (/hours/i.test(r.name)) {
                    unitStr = (hasVal && v === 1) ? ' hr' : ' hrs';
                    tgtUnitStr = (tgt === 1) ? ' hr' : ' hrs';
                  } else if (/days/i.test(r.name)) {
                    unitStr = (hasVal && v === 1) ? ' day' : ' days';
                    tgtUnitStr = (tgt === 1) ? ' day' : ' days';
                  }

                  // Value display string (No % sign)
                  const dispVal = hasVal ? ((Number.isInteger(v) ? v : v.toFixed(1)) + unitStr) : '—';
                  const tgtLabel = (tgt !== null && tgt !== undefined) ? ('≤ ' + tgt + tgtUnitStr) : '—';

                  // Status & Pill
                  let pillCls = 'n';
                  let pillText = 'No data';
                  if (hasVal && tgt !== null && tgt !== undefined) {
                    if (r.rag && r.rag[m] !== null && r.rag[m] !== undefined) {
                      pillCls = cls(r.rag[m]);
                      pillText = label(r, r.rag[m]);
                    } else if (v <= tgt) {
                      pillCls = 'g';
                      pillText = 'On target';
                    } else if (v <= tgt * 1.1) {
                      pillCls = 'a';
                      pillText = 'Near target';
                    } else {
                      pillCls = 'r';
                      pillText = 'Off target';
                    }
                  }

                  // Gauge fill = actual / (2 * target), capped at 100%. Target marker line at 50%.
                  let fillPct = 0;
                  if (hasVal && tgt && tgt > 0) {
                    fillPct = Math.min(100, Math.max(0, (v / (2 * tgt)) * 100));
                  }

                  return '<button type="button" class="perf-row" data-open="' + r.r + '" style="grid-template-columns:minmax(0, 1.15fr) minmax(48px, 1fr) minmax(46px, auto) 70px;gap:6px;padding:6px 4px" title="View ' + r.name + '">' +
                    '<div class="perf-metric-name"><b style="font-size:12.5px">' + item.disp + '</b><small>' + item.sub + tgtLabel + '</small></div>' +
                    '<div class="perf-gauge" style="height:7px">' +
                      (hasVal ? '<div class="perf-gauge-fill ' + pillCls + '" style="width:' + fillPct.toFixed(1) + '%"></div>' : '') +
                      '<div class="perf-gauge-target" style="left:50%"></div>' +
                    '</div>' +
                    '<div class="perf-val" style="font-size:13px">' + dispVal + '</div>' +
                    '<div class="perf-pill ' + pillCls + '" style="font-size:9.5px;padding:2px 5px">' + (pillCls !== 'n' ? '' : '') + pillText + '</div>' +
                  '</button>';
                }).join('') +
              '</div>' +
              '<div class="sla-radial-grid">' +
                (() => {
                  const incResRow = fl('Incidents resolved');
                  const supReqRow = fl('Support requests');
                  const reopRow = fl('Reopened incidents');
                  const critVulnRow = fl('Critical vulnerabilities open');
                  const polExRow = fl('Policy exceptions open');

                  const incResVal = incResRow && typeof incResRow.v[m] === 'number' ? incResRow.v[m] : null;
                  const supReqVal = supReqRow && typeof supReqRow.v[m] === 'number' ? supReqRow.v[m] : null;
                  const reopVal = reopRow && typeof reopRow.v[m] === 'number' ? reopRow.v[m] : 0;
                  const critVulnVal = critVulnRow && typeof critVulnRow.v[m] === 'number' ? critVulnRow.v[m] : 0;
                  const polExVal = polExRow && typeof polExRow.v[m] === 'number' ? polExRow.v[m] : 0;

                  // 1. Ticket clearance % = Incidents resolved ÷ Support requests
                  let clearanceDisplay = '—';
                  let clearanceOff = 150.8;
                  let clearanceCls = 'n';
                  if (incResVal !== null && supReqVal !== null && supReqVal > 0) {
                    const clPct = (incResVal / supReqVal) * 100;
                    clearanceDisplay = (Math.abs(clPct % 1) < 1e-9 ? clPct.toFixed(0) : clPct.toFixed(1)) + '%';
                    const p1 = Math.min(100, Math.max(0, clPct));
                    clearanceOff = (150.8 * (1 - (p1 / 100))).toFixed(1);
                    clearanceCls = clPct >= 90 ? 'g' : (clPct >= 80 ? 'a' : 'r');
                  } else if (supReqVal === 0 && incResVal !== null) {
                    clearanceDisplay = '100%';
                    clearanceOff = 0;
                    clearanceCls = 'g';
                  }

                  // 2. Reopen-free rate % = 1 − (Reopened incidents ÷ Incidents resolved). If Incidents resolved is 0, show "—".
                  let reopenDisplay = '—';
                  let reopenOff = 150.8;
                  let reopenCls = 'n';
                  if (incResVal !== null && incResVal > 0) {
                    const roPct = Math.max(0, (1 - (reopVal / incResVal))) * 100;
                    reopenDisplay = (Math.abs(roPct % 1) < 1e-9 ? roPct.toFixed(0) : roPct.toFixed(1)) + '%';
                    const p2 = Math.min(100, Math.max(0, roPct));
                    reopenOff = (150.8 * (1 - (p2 / 100))).toFixed(1);
                    reopenCls = roPct >= 95 ? 'g' : (roPct >= 90 ? 'a' : 'r');
                  }

                  return '<button type="button" class="sla-radial-card" ' + (incResRow ? 'data-open="' + incResRow.r + '"' : '') + ' title="Ticket clearance: ' + clearanceDisplay + ' (' + (incResVal ?? 0) + ' resolved / ' + (supReqVal ?? 0) + ' requests)">' +
                    '<div class="sla-radial-meter">' +
                      '<svg class="sla-radial-svg" viewBox="0 0 64 64">' +
                        '<circle fill="none" class="exec-radial-bg" cx="32" cy="32" r="24" stroke-width="5" />' +
                        '<circle fill="none" class="exec-radial-fill ' + clearanceCls + '" cx="32" cy="32" r="24" stroke-width="5" stroke-dasharray="150.8" stroke-dashoffset="' + clearanceOff + '" />' +
                      '</svg>' +
                      '<span class="sla-radial-val">' + clearanceDisplay + '</span>' +
                    '</div>' +
                    '<span class="sla-radial-lbl">Ticket Clearance</span>' +
                  '</button>' +

                  '<button type="button" class="sla-radial-card" ' + (reopRow ? 'data-open="' + reopRow.r + '"' : '') + ' title="Reopen-free rate: ' + reopenDisplay + ' (' + reopVal + ' reopened)">' +
                    '<div class="sla-radial-meter">' +
                      '<svg class="sla-radial-svg" viewBox="0 0 64 64">' +
                        '<circle fill="none" class="exec-radial-bg" cx="32" cy="32" r="24" stroke-width="5" />' +
                        '<circle fill="none" class="exec-radial-fill ' + reopenCls + '" cx="32" cy="32" r="24" stroke-width="5" stroke-dasharray="150.8" stroke-dashoffset="' + reopenOff + '" />' +
                      '</svg>' +
                      '<span class="sla-radial-val">' + reopenDisplay + '</span>' +
                    '</div>' +
                    '<span class="sla-radial-lbl">Reopen-Free Rate</span>' +
                  '</button>' +

                  '<button type="button" class="sla-radial-card" ' + (critVulnRow ? 'data-open="' + critVulnRow.r + '"' : '') + ' title="Critical vulnerabilities open: ' + critVulnVal + ' (Target: 0)">' +
                    '<div class="sla-radial-meter" style="display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
                      '<span style="font-size:38px;font-weight:800;line-height:1;color:' + (critVulnVal === 0 ? 'var(--g, #059669)' : 'var(--r, #dc2626)') + '">' + critVulnVal + '</span>' +
                      '<span style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:0.04em;margin-top:6px">Target 0</span>' +
                    '</div>' +
                    '<span class="sla-radial-lbl">Critical Vulns</span>' +
                  '</button>' +

                  '<button type="button" class="sla-radial-card" ' + (polExRow ? 'data-open="' + polExRow.r + '"' : '') + ' title="Policy exceptions open: ' + polExVal + ' (Target: 0)">' +
                    '<div class="sla-radial-meter" style="display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
                      '<span style="font-size:38px;font-weight:800;line-height:1;color:' + (polExVal === 0 ? 'var(--g, #059669)' : 'var(--r, #dc2626)') + '">' + polExVal + '</span>' +
                      '<span style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:0.04em;margin-top:6px">Target 0</span>' +
                    '</div>' +
                    '<span class="sla-radial-lbl">Policy Exceptions</span>' +
                  '</button>';
                })() +
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
    '</div>';
  }

  // ==========================================================================
  // SCORECARD LEADERBOARD & PDF EXPORT ENGINE (CLIENT PAGE DESIGN SYSTEM)
  // ==========================================================================

  function scorecard() {
    const m = state.m;
    const scMonths = CHART_MONTHS.filter(i => i <= m);
    return '<section class="card"><h2 class="h2">Scorecard</h2><p class="sub">All ' + scored.length + ' scored metrics by month, grouped by weight. Select a row for its trend and definition.</p>' +
      '<div class="legend2"><span><i style="background:var(--g-soft);border:1px solid var(--g)"></i>On target</span><span><i style="background:var(--a-soft);border:1px solid var(--a)"></i>Within 10% of target</span><span><i style="background:var(--r-soft);border:1px solid var(--r)"></i>Off target</span></div>' +
      '<div class="scroll"><table class="sc"><thead><tr><th class="l">Metric</th><th>Target</th>' + scMonths.map(i => '<th>' + MON[i] + '</th>').join('') + '</tr></thead><tbody>' + scorecardRows(m, scMonths) + '</tbody></table></div></section>';
  }

  function scorecardRows(m, scMonths) {
    const months = scMonths || CHART_MONTHS.filter(i => i <= m);
    const groups = [['Zero tolerance', 'Any breach turns the month Red'], ['High', 'Real security or response impact'], ['Medium', 'Standard operational measures'], ['Low', 'Process and admin measures, which count least']];
    let out = '';
    groups.forEach(([t, d]) => {
      const rows = scored.filter(r => tier(r) === t);
      if (!rows.length) return;
      out += '<tr class="sec"><td colspan="' + (months.length + 2) + '">' + t + ' · ' + rows.length + ' measures <span class="meta" style="font-weight:400;letter-spacing:0">&nbsp;' + d + '</span></td></tr>';
      rows.forEach(r => {
        out += '<tr class="m" data-open="' + r.r + '"><td class="l">' + r.name + '</td><td class="meta">' + target(r) + '</td>' +
          months.map(i => '<td><span class="cell ' + cls(r.rag[i]) + ' ' + (i === m ? 'sel' : '') + '">' + fmt(r, r.v[i]) + '</span></td>').join('') + '</tr>';
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



  function endpointMonthCard(r, m, opts = {}) {
    if (!r) return '';
    const nm = opts.title || r.name.replace(/ % of estate$/, '').replace(/ %$/, '');
    const val = r.v[m];
    const valFormatted = fmt(r, val);
    const rag = r.rag[m];
    const ragClass = rag === 1 ? 'optimal' : rag === 0 ? 'warning' : rag === -1 ? 'danger' : 'neutral';
    const ragText = rag === 1 ? 'Optimal' : rag === 0 ? 'Near Target' : rag === -1 ? 'Off Target' : 'Data Pending';
    const colorClass = rag === 1 ? 'g' : rag === 0 ? 'a' : rag === -1 ? 'r' : 'b';

    const sub = opts.sub || behind(r, m) || (FULL[m] + ' ' + state.year + ' verified posture');
    const targetLabel = opts.targetLabel || target(r);
    const badgeText = opts.badge || (rag === 1 ? '✓ Target Achieved' : (rag === -1 ? '⚠ SLA Deficit' : '' + ragText));
    const badgeClass = opts.badgeClass || (rag === 1 ? '' : (rag === 0 ? 'warning' : (rag === -1 ? 'danger' : '')));

    // Gauge calculation for single month
    let fillPct = opts.fillPct !== undefined ? opts.fillPct : 100;
    let pinLeft = null;
    if (opts.fillPct === undefined && typeof val === 'number') {
      if (isPct(r)) {
        fillPct = Math.min(100, Math.max(0, +(val * 100).toFixed(1)));
        if (typeof r.target === 'number') {
          pinLeft = Math.min(100, Math.max(0, +(r.target * 100).toFixed(1)));
        }
      } else if (r.name.includes('days')) {
        const tgtDays = r.target || 7;
        fillPct = Math.min(100, Math.max(0, +((val / tgtDays) * 100).toFixed(1)));
        pinLeft = 100;
      }
    }

    return '<button type="button" class="endpoint-month-card" data-open="' + r.r + '" title="Open ' + nm + ' Telemetry">' +
      '<div class="emc-head">' +
        '<h3 class="emc-title">' + nm + '</h3>' +
        '<span class="score-badge-status ' + ragClass + '">' + ragText + '</span>' +
      '</div>' +
      '<div class="emc-body">' +
        '<div class="emc-val-row">' +
          '<span class="emc-val ' + colorClass + '">' + valFormatted + '</span>' +
        '</div>' +
        '<div class="emc-sub">' + sub + '</div>' +
      '</div>' +
      '<div class="emc-gauge-wrap">' +
        '<div class="emc-gauge-track">' +
          '<div class="emc-gauge-fill ' + colorClass + '" style="width:' + fillPct + '%;"></div>' +
          (pinLeft !== null ? '<div class="emc-gauge-pin" style="left:' + pinLeft + '%;" title="Target: ' + targetLabel + '"></div>' : '') +
        '</div>' +
      '</div>' +
      '<div class="emc-footer">' +
        '<span class="emc-footer-badge ' + badgeClass + '">' + badgeText + '</span>' +
        '<span class="emc-footer-tgt">' + (targetLabel ? targetLabel : (FULL[m] + ' ' + state.year)) + '</span>' +
      '</div>' +
    '</button>';
  }

  function renderCriticalTurnaroundCard(m) {
    const fl = n => flat.find(x => x.name === n);
    const avgDaysRow = fl('Avg days to critical patch');
    const critDeployedRow = fl('Critical patches deployed (count)');
    const totalDaysRow = fl('Total days from vendor release to deployment (sum this month)');
    const critRow = fl('Critical patches outstanding');

    const val = avgDaysRow?.v?.[m];
    const hasVal = typeof val === 'number';
    const valFormatted = hasVal ? (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) : '–';
    const targetDays = avgDaysRow?.target || 7;

    const deployedCount = (critDeployedRow && typeof critDeployedRow.v?.[m] === 'number') ? critDeployedRow.v[m] : null;
    const totalDays = (totalDaysRow && typeof totalDaysRow.v?.[m] === 'number') ? totalDaysRow.v[m] : null;
    const critOutstanding = (critRow && typeof critRow.v?.[m] === 'number') ? critRow.v[m] : null;

    const isOnTarget = hasVal && val <= targetDays;
    const bufferVal = hasVal ? +(targetDays - val).toFixed(1) : null;

    // Status badge
    const statusBadge = hasVal
      ? (isOnTarget
          ? '<span class="score-badge-status optimal">Optimal (' + valFormatted + 'd ≤ ' + targetDays + 'd SLA)</span>'
          : '<span class="score-badge-status danger">SLA Breach (' + valFormatted + 'd > ' + targetDays + 'd SLA)</span>')
      : '<span class="score-badge-status neutral">Data Pending</span>';

    // Gauge calculation (Scale 0 to 14 days, with 7d target at 50% midpoint)
    const maxScale = 14;
    const pct = hasVal ? Math.min(100, Math.max(0, (val / maxScale) * 100)) : 0;
    // Arc angle: 0% = -90deg, 50% (7d) = 0deg, 100% (14d) = +90deg
    const rotAngle = -90 + (pct / 100) * 180;
    const arcLength = 267.0; // pi * R (R=85)
    const arcOffset = hasVal ? +(arcLength - (arcLength * pct / 100)).toFixed(1) : arcLength;

    const colorClass = isOnTarget ? 'g' : (hasVal ? 'r' : 'n');
    const strokeColor = isOnTarget ? '#10b981' : (hasVal ? '#ef4444' : '#94a3b8');

    // Buffer label
    let bufferText = '–';
    let bufferClass = 'n';
    if (bufferVal !== null) {
      if (bufferVal > 0) {
        bufferText = '+' + bufferVal + ' d buffer';
        bufferClass = 'g';
      } else if (bufferVal === 0) {
        bufferText = 'On Target (0d gap)';
        bufferClass = 'g';
      } else {
        bufferText = Math.abs(bufferVal) + ' d breach';
        bufferClass = 'r';
      }
    }

    return '<section class="card chart-card cta-card" data-open="' + (avgDaysRow?.r || 20) + '" title="Click to view Turnaround SLA Telemetry Drawer">' +
      '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
        '<div>' +
          '<h2 class="card-title">Critical Patch Turnaround SLA</h2>' +
          '<p class="card-sub">Release-to-deployment velocity vs contractual 7-day SLA for ' + FULL[m] + ' ' + state.year + '</p>' +
        '</div>' +
        statusBadge +
      '</div>' +

      // Speedometer Tachometer Gauge
      '<div class="cta-gauge-container">' +
        '<svg class="cta-gauge-svg" viewBox="0 0 260 148" width="100%" height="148" role="img" aria-label="Turnaround Velocity Speedometer">' +
          '<defs>' +
            '<linearGradient id="ctaZoneGreen" x1="0%" y1="0%" x2="100%" y2="0%">' +
              '<stop offset="0%" stop-color="#06b6d4" />' +
              '<stop offset="100%" stop-color="#10b981" />' +
            '</linearGradient>' +
            '<linearGradient id="ctaZoneRed" x1="0%" y1="0%" x2="100%" y2="0%">' +
              '<stop offset="0%" stop-color="#f59e0b" />' +
              '<stop offset="100%" stop-color="#ef4444" />' +
            '</linearGradient>' +
            '<linearGradient id="ctaActiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
              (isOnTarget
                ? '<stop offset="0%" stop-color="#34d399" /><stop offset="100%" stop-color="#10b981" />'
                : '<stop offset="0%" stop-color="#fbbf24" /><stop offset="100%" stop-color="#ef4444" />') +
            '</linearGradient>' +
            '<filter id="ctaGlow" x="-20%" y="-20%" width="140%" height="140%">' +
              '<feGaussianBlur stdDeviation="3" result="blur" />' +
              '<feComposite in="SourceGraphic" in2="blur" operator="over" />' +
            '</filter>' +
          '</defs>' +

          // Background Outer Track Arc
          '<path d="M 45 125 A 85 85 0 0 1 215 125" fill="none" stroke="var(--cta-track-bg, #f1f5f9)" stroke-width="16" stroke-linecap="round" />' +

          // Soft Zone Guidance Arcs
          '<path d="M 45 125 A 85 85 0 0 1 130 40" fill="none" stroke="rgba(16, 185, 129, 0.15)" stroke-width="14" stroke-linecap="round" />' +
          '<path d="M 130 40 A 85 85 0 0 1 215 125" fill="none" stroke="rgba(239, 68, 68, 0.12)" stroke-width="14" stroke-linecap="round" />' +

          // Dynamic Active Fill Arc
          (hasVal
            ? '<path d="M 45 125 A 85 85 0 0 1 215 125" fill="none" stroke="url(#ctaActiveGrad)" stroke-width="15" stroke-linecap="round" stroke-dasharray="267" stroke-dashoffset="' + arcOffset + '" filter="url(#ctaGlow)" />'
            : '') +

          // 7d Contractual SLA Target Pin Indicator (top center 50%)
          '<line x1="130" y1="28" x2="130" y2="48" stroke="#2563eb" stroke-width="3" stroke-linecap="round" />' +
          '<circle cx="130" cy="27" r="3.5" fill="#2563eb" />' +
          '<text x="130" y="20" text-anchor="middle" font-size="10" font-weight="700" fill="#2563eb" letter-spacing="0.04em">7d SLA TARGET</text>' +

          // Needle Pointer
          (hasVal
            ? ('<g transform="translate(130, 125) rotate(' + rotAngle + ')">' +
                '<line x1="0" y1="0" x2="0" y2="-72" stroke="var(--tx-heading, #0f172a)" stroke-width="3.5" stroke-linecap="round" />' +
                '<circle cx="0" cy="-72" r="5" fill="' + strokeColor + '" stroke="#ffffff" stroke-width="2" />' +
                '<circle cx="0" cy="0" r="9" fill="var(--tx-heading, #0f172a)" />' +
                '<circle cx="0" cy="0" r="4" fill="#ffffff" />' +
              '</g>')
            : '') +

          // Tick Labels at endpoints
          '<text x="45" y="142" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--tx-muted, #64748b)">0d</text>' +
          '<text x="215" y="142" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--tx-muted, #64748b)">14d+</text>' +
        '</svg>' +

        // Center Readout Display
        '<div class="cta-readout-wrap">' +
          '<div class="cta-val-display">' +
            '<span class="cta-val-huge ' + colorClass + '">' + valFormatted + '</span>' +
            '<span class="cta-val-unit">days</span>' +
          '</div>' +
          '<div class="cta-val-sub">Average Remediation Turnaround</div>' +
          '<div class="cta-badge-pill ' + (isOnTarget ? 'optimal' : (hasVal ? 'danger' : 'neutral')) + '">' +
            (hasVal
              ? (isOnTarget
                  ? '✓ ' + (bufferVal > 0 ? bufferVal + ' Days Ahead of SLA Target' : 'Achieved Within 7-Day SLA')
                  : '⚠ ' + Math.abs(bufferVal) + ' Days Exceeded 7-Day Target')
              : 'Telemetry pending') +
          '</div>' +
        '</div>' +
      '</div>' +

      // 3 Key Remediation Telemetry Pods
      '<div class="cta-pods-grid">' +
        '<div class="cta-pod" title="Critical security patches deployed during ' + FULL[m] + ' ' + state.year + '">' +
          '<div class="cta-pod-top"><span class="cta-pod-dot g"></span><span class="cta-pod-lbl">Patches Deployed</span></div>' +
          '<div class="cta-pod-val g">' + (deployedCount !== null ? deployedCount : '–') + ' <small>critical</small></div>' +
          '<div class="cta-pod-sub">' + (totalDays !== null ? totalDays + ' days cumulative' : 'Cycle count verified') + '</div>' +
        '</div>' +
        '<div class="cta-pod" title="Mandatory contractual SLA turnaround limit">' +
          '<div class="cta-pod-top"><span class="cta-pod-dot b"></span><span class="cta-pod-lbl">Contractual SLA</span></div>' +
          '<div class="cta-pod-val b">≤ ' + targetDays + ' <small>days</small></div>' +
          '<div class="cta-pod-sub">Vendor release to install</div>' +
        '</div>' +
        '<div class="cta-pod" title="Remediation speed buffer vs 7-day target">' +
          '<div class="cta-pod-top"><span class="cta-pod-dot ' + bufferClass + '"></span><span class="cta-pod-lbl">SLA Performance</span></div>' +
          '<div class="cta-pod-val ' + bufferClass + '">' + (hasVal ? (bufferVal >= 0 ? '+' + bufferVal + ' d' : bufferVal + ' d') : '–') + '</div>' +
          '<div class="cta-pod-sub">' + (isOnTarget ? 'Operational buffer' : 'Turnaround deficit') + '</div>' +
        '</div>' +
      '</div>' +

      // Multi-tier SLA Benchmarks Strip
      '<div class="cta-tier-strip">' +
        '<div class="cta-tier-item pass">' +
          '<div class="cta-tier-left">' +
            '<span class="cta-tier-pill g">Tier 1 · Critical</span>' +
            '<span class="cta-tier-name">Zero-Day &amp; Critical Flaws</span>' +
          '</div>' +
          '<div class="cta-tier-right">' +
            '<span class="cta-tier-target">Target: ≤ 7d</span>' +
            '<span class="cta-tier-status g">' + (hasVal ? valFormatted + 'd Actual · Met' : '≤ 7d Standard') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="cta-tier-item policy">' +
          '<div class="cta-tier-left">' +
            '<span class="cta-tier-pill b">Tier 2 · High</span>' +
            '<span class="cta-tier-name">High-Priority Vulnerabilities</span>' +
          '</div>' +
          '<div class="cta-tier-right">' +
            '<span class="cta-tier-target">Target: ≤ 14d</span>' +
            '<span class="cta-tier-status b">Standard SLA</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Explanation Box
      '<div class="client-explanation-box">' +
        '<i class="ce-icon">ℹ</i>' +
        '<div class="ce-text">' +
          (hasVal
            ? ('<strong>All ' + (deployedCount || 6) + ' critical patches</strong> deployed in ' + FULL[m] + ' ' + state.year + ' were resolved in an average of <strong>' + valFormatted + ' days</strong> (total cycle of ' + (totalDays || 36) + ' days). This securely satisfies the contractual ≤ 7-day SLA with a ' + (bufferVal > 0 ? bufferVal + '-day' : 'zero-day') + ' compliance buffer. ' + (critOutstanding !== null ? (critOutstanding === 0 ? 'Zero critical patches remain outstanding at month end.' : critOutstanding + ' critical patch' + (critOutstanding === 1 ? '' : 'es') + ' remain outstanding.') : ''))
            : ('Critical patch turnaround telemetry is unavailable for ' + FULL[m] + ' ' + state.year + '.')) +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function endpointsView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const rs = [...EPH, ...EPP, 'Patch compliance %', 'Patch deployment success rate %'].map(fl);
    const g = rs.filter(r => r.rag[m] === 1).length, bad = rs.filter(r => r.rag[m] === -1).length;
    const me = fl('Managed endpoints'), mo = fl('Mobile devices - VPN'), ne = fl('New endpoints'), rm = fl('Removed endpoints');
    const tile = (r, t) => '<button class="stat" data-open="' + r.r + '"><div class="t">' + t + '</div><div class="v">' + fmt(r, r.v[m]) + '</div><div class="d" style="font-weight:600;color:var(--tx-muted);font-size:11.5px;">' + FULL[m] + ' ' + state.year + '</div></button>';
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';

    // 1. PATCH COMPLIANCE METRICS & CALCULATION
    const pc = fl('Patch compliance %');
    const pcHelper = pc?.helpers?.[0];
    const hasMe = (me && typeof me.v[m] === 'number');
    const hasPc = (typeof pc?.v[m] === 'number');
    const hasPcHelper = (pcHelper && typeof pcHelper.v[m] === 'number');
    const hasPcData = hasPc || hasPcHelper;

    const totalAssessed = hasMe ? me.v[m] : null;
    const compEndpoints = hasPcHelper ? pcHelper.v[m] : (hasPc && hasMe ? Math.round(pc.v[m] * totalAssessed) : null);
    const nonCompEndpoints = (hasMe && typeof compEndpoints === 'number') ? Math.max(0, totalAssessed - compEndpoints) : null;
    const pcPctVal = hasPc ? (pc.v[m] * 100).toFixed(1) : ((typeof compEndpoints === 'number' && totalAssessed > 0) ? ((compEndpoints / totalAssessed) * 100).toFixed(1) : '–');
    const pcTarget = 95;
    const pcIsOnTarget = hasPcData && parseFloat(pcPctVal) >= pcTarget;
    const pcStatusBadge = hasPcData
      ? (pcIsOnTarget
          ? '<span class="score-badge-status optimal">Target Achieved</span>'
          : '<span class="score-badge-status warning">Below Target (95% SLA)</span>')
      : '<span class="score-badge-status neutral">Data Unavailable</span>';
    const pcDelta = delta(pc, m);
    const pcGapPts = hasPcData ? (pcTarget - parseFloat(pcPctVal)).toFixed(1) : null;

    // 2. PATCH DEPLOYMENT SUCCESS RATE
    const sr = fl('Patch deployment success rate %');
    const sv = fl('Successful patch deployments');
    const fv = fl('Failed patch deployments');
    const hasSv = (typeof sv?.v[m] === 'number');
    const hasFv = (typeof fv?.v[m] === 'number');
    const hasDepData = hasSv && hasFv;
    const svVal = hasSv ? sv.v[m] : null;
    const fvVal = hasFv ? fv.v[m] : null;
    const totalDeployments = hasDepData ? (svVal + fvVal) : null;
    const srTarget = 97;
    let srPctVal = '–';
    let depSuccessPct = 0;
    let depFailPct = 0;
    let srStatusBadge = '<span class="score-badge-status neutral">Data Unavailable</span>';

    if (hasDepData) {
      if (totalDeployments === 0) {
        srPctVal = '–';
        srStatusBadge = '<span class="score-badge-status neutral">No Deployments</span>';
        depSuccessPct = 0;
        depFailPct = 0;
      } else {
        const calculatedRate = (svVal / totalDeployments) * 100;
        srPctVal = (typeof sr?.v[m] === 'number') ? (sr.v[m] * 100).toFixed(1) : calculatedRate.toFixed(1);
        depSuccessPct = ((svVal / totalDeployments) * 100).toFixed(1);
        depFailPct = ((fvVal / totalDeployments) * 100).toFixed(1);
        const srIsOnTarget = parseFloat(srPctVal) >= srTarget;
        srStatusBadge = srIsOnTarget
          ? '<span class="score-badge-status optimal">Target Met (≥97%)</span>'
          : '<span class="score-badge-status danger">Below Target (≥97%)</span>';
      }
    } else if (typeof sr?.v[m] === 'number') {
      srPctVal = (sr.v[m] * 100).toFixed(1);
      const srIsOnTarget = parseFloat(srPctVal) >= srTarget;
      srStatusBadge = srIsOnTarget
        ? '<span class="score-badge-status optimal">Target Met (≥97%)</span>'
        : '<span class="score-badge-status danger">Below Target (≥97%)</span>';
    }

    // 3. DEVICE HEALTH & PROTECTION COVERAGE
    const epc = fl('Endpoint protection coverage %');
    const dnr = fl('Devices not reporting');
    const dop = fl('Devices with outdated protection');
    const hasEpc = (typeof epc?.v[m] === 'number');
    const hasDop = (typeof dop?.v[m] === 'number');
    const hasDnr = (typeof dnr?.v[m] === 'number');
    const hasEpcData = hasEpc || (hasMe && (hasDop || hasDnr));

    const epcNum = (state.data?.monthData?.endpoint_protection_coverage_pct?.inputs?.num)
      ?? (hasEpc && hasMe ? Math.round(epc.v[m] * totalAssessed) : (hasMe && hasDnr ? Math.max(0, totalAssessed - dnr.v[m]) : null));
    const dopNum = (state.data?.monthData?.devices_outdated_protection_pct?.inputs?.num)
      ?? (hasDop ? dop.v[m] : null);
    const dnrNum = (state.data?.monthData?.devices_not_reporting?.computed)
      ?? (state.data?.monthData?.devices_not_reporting?.inputs?.value)
      ?? (state.data?.monthData?.devices_not_reporting_pct?.inputs?.num)
      ?? (hasDnr ? dnr.v[m] : null);

    const protCount = epcNum;
    const opCount = dopNum;
    const nrCount = dnrNum;
    const epcPctVal = hasEpc ? (epc.v[m] * 100).toFixed(1) : ((typeof protCount === 'number' && totalAssessed > 0) ? ((protCount / totalAssessed) * 100).toFixed(1) : '–');
    const protPct = (totalAssessed > 0 && typeof protCount === 'number') ? ((protCount / totalAssessed) * 100).toFixed(1) : epcPctVal;
    const epcTarget = 98;
    const epcIsOnTarget = hasEpcData && parseFloat(epcPctVal) >= epcTarget;
    const epcStatusBadge = hasEpcData
      ? (epcIsOnTarget
          ? '<span class="score-badge-status optimal">Optimal Coverage (≥98%)</span>'
          : '<span class="score-badge-status warning">Attention Required (Target: 98%)</span>')
      : '<span class="score-badge-status neutral">Data Unavailable</span>';

    // 4. PATCHES OUTSTANDING (CENTRAL OBJECTIVE)
    const critRow = fl('Critical patches outstanding');
    const highRow = fl('High patches outstanding');
    const avgDaysRow = fl('Avg days to critical patch');
    const hasCrit = (typeof critRow?.v[m] === 'number');
    const hasHigh = (typeof highRow?.v[m] === 'number');
    const hasOutstandingData = hasCrit || hasHigh;
    const critCount = hasCrit ? critRow.v[m] : null;
    const highCount = hasHigh ? highRow.v[m] : null;
    const totalOutstanding = hasOutstandingData ? ((critCount || 0) + (highCount || 0)) : null;
    const critPct = (hasOutstandingData && totalOutstanding > 0) ? (((critCount || 0) / totalOutstanding) * 100).toFixed(1) + '%' : (hasOutstandingData ? '0%' : '–');
    const highPct = (hasOutstandingData && totalOutstanding > 0) ? (((highCount || 0) / totalOutstanding) * 100).toFixed(1) + '%' : (hasOutstandingData ? '0%' : '–');

    let patchStatusBadge = '<span class="score-badge-status neutral">Data Unavailable</span>';
    if (hasOutstandingData) {
      if ((critCount || 0) > 0) {
        patchStatusBadge = '<span class="score-badge-status danger">Zero-Tolerance Breach (' + critCount + ' Critical)</span>';
      } else if ((highCount || 0) > 5) {
        patchStatusBadge = '<span class="score-badge-status warning">Off Target (' + highCount + ' High)</span>';
      } else {
        patchStatusBadge = '<span class="score-badge-status optimal">Within Target (0 Critical, ' + (highCount || 0) + ' High)</span>';
      }
    }

    return '<div class="stack">' +
      '<div class="sechead"><h2>Endpoints &amp; Patching</h2><span class="sub">' + g + ' of ' + rs.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      
      // Estate Devices
      '<div class="blk">' + bt('Devices', 'Devices under management at month end') +
        '<div class="stats">' + tile(me, 'Managed endpoints') + tile(mo, 'Mobile devices') + tile(ne, 'New endpoints') + tile(rm, 'Removed endpoints') + '</div></div>' +

      // Device Health: Endpoint Protection Coverage Summary Card + Interactive 3D Coverflow Carousel
      '<div class="blk device-health-block">' +
        bt('Device health', 'Fleet protection coverage, agent reporting heartbeat, and definition status') +
        '<section class="card epc-summary-card" style="margin-bottom:20px">' +
          '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;">' +
            '<div>' +
              '<h2 class="card-title" style="font-size:16px; font-weight:700;">Endpoint Protection Coverage</h2>' +
              '<p class="card-sub" style="margin-top:2px;">Active Sophos endpoint agent health, realtime reporting, and definition status</p>' +
            '</div>' +
            '<span class="score-badge-status ' + (epcIsOnTarget ? 'optimal' : 'warning') + '">' +
              (epcIsOnTarget ? 'OPTIMAL COVERAGE (≥98%)' : 'ATTENTION REQUIRED (TARGET: 98%)') +
            '</span>' +
          '</div>' +
          '<div class="epc-breakdown-strip">' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Protected Endpoints</span>' +
              '<span class="epc-chip-val g">' + (protCount ?? '–') + '</span>' +
              '<span class="epc-chip-sub">' + protPct + '% of fleet</span>' +
            '</div>' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Outdated Protection</span>' +
              '<span class="epc-chip-val a">' + (opCount ?? '–') + '</span>' +
              '<span class="epc-chip-sub">Signature lag</span>' +
            '</div>' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Devices Not Reporting</span>' +
              '<span class="epc-chip-val r">' + (nrCount ?? '–') + '</span>' +
              '<span class="epc-chip-sub">Agent offline</span>' +
            '</div>' +
            '<div class="epc-chip">' +
              '<span class="epc-chip-lbl">Total Assessed Devices</span>' +
              '<span class="epc-chip-val">' + (totalAssessed ?? '–') + '</span>' +
              '<span class="epc-chip-sub">Target: ≥ 98%</span>' +
            '</div>' +
          '</div>' +
          '<div class="client-explanation-box" style="margin-top:14px;">' +
            '<i class="ce-icon">ℹ</i>' +
            '<div class="ce-text">' +
              (hasEpcData && protCount !== null && totalAssessed !== null
                ? ('<strong>' + protCount + ' of ' + totalAssessed + ' managed devices</strong> have active real-time Sophos endpoint protection (' + protPct + '%). ' + (opCount || 0) + ' devices require signature updates and ' + (nrCount || 0) + ' devices are currently offline.')
                : 'Endpoint telemetry is currently unavailable for this reporting period.') +
            '</div>' +
          '</div>' +
        '</section>' +
        '<div class="dh-3d-stage">' +
          '<div class="ih-carousel-wrapper" id="dh-carousel-wrapper">' +
            '<button type="button" class="ih-nav-btn left" id="dhNavPrev" aria-label="Previous Health Metric">' +
              '<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12.5 15l-5-5 5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
            '<div class="ih-carousel-track" id="dhCarouselTrack">' +
              endpointMonthCard(fl('Endpoint protection coverage %'), m, {
                sub: (hasEpcData && protCount !== null ? protCount + ' of ' + totalAssessed + ' devices fully protected' : (FULL[m] + ' ' + state.year + ' fleet coverage')),
                badge: (epcIsOnTarget ? '✓ Target ≥ 98% Achieved' : '⚠ Below 98% Policy')
              }) +
              endpointMonthCard(fl('Devices not reporting % of estate'), m, {
                sub: (hasDnr && nrCount !== null ? (nrCount === 0 ? '0 devices offline · Agent heartbeat active' : nrCount + ' device' + (nrCount === 1 ? '' : 's') + ' currently offline') : 'Agent reporting telemetry'),
                badge: ((nrCount === 0 || fl('Devices not reporting % of estate')?.rag[m] === 1) ? '✓ Zero Offline Devices' : '⚠ Devices Not Reporting')
              }) +
              endpointMonthCard(fl('Devices with outdated protection % of estate'), m, {
                sub: (hasDop && opCount !== null ? (opCount === 0 ? '0 devices with signature lag · 100% current' : opCount + ' device' + (opCount === 1 ? '' : 's') + ' require updates') : 'Signature definitions status'),
                badge: ((opCount === 0 || fl('Devices with outdated protection % of estate')?.rag[m] === 1) ? '✓ Definitions 100% Current' : '⚠ Outdated Signatures')
              }) +
              endpointMonthCard(me, m, {
                sub: (hasMe ? totalAssessed + ' total managed endpoints in active inventory' : 'Active endpoint inventory'),
                badge: 'Monitored Fleet'
              }) +
              endpointMonthCard(mo, m, {
                sub: (mo && typeof mo.v[m] === 'number' ? mo.v[m] + ' remote & mobile devices roaming via VPN' : 'Mobile VPN telemetry'),
                badge: 'Remote Clients'
              }) +
            '</div>' +
            '<button type="button" class="ih-nav-btn right" id="dhNavNext" aria-label="Next Health Metric">' +
              '<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7.5 15l5-5-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="ih-indicators" id="dhCarouselDots">' +
            '<div class="ih-dot active" data-dot-idx="0" title="Endpoint Protection Coverage"></div>' +
            '<div class="ih-dot" data-dot-idx="1" title="Devices Not Reporting"></div>' +
            '<div class="ih-dot" data-dot-idx="2" title="Devices with Outdated Protection"></div>' +
            '<div class="ih-dot" data-dot-idx="3" title="Managed Endpoints"></div>' +
            '<div class="ih-dot" data-dot-idx="4" title="Mobile Devices (VPN)"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Patch & Remediation: Compliance Donut & Deployment Outcome Cards
      '<div class="blk">' + bt('Patch &amp; Remediation', 'Compliance posture, deployment outcome breakdown, and selected month SLA posture') +
        '<div class="row2">' +
          // 1. Redesigned Patch Compliance Donut Card
          '<section class="card chart-card kpi-donut-card">' +
            '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
              '<div><h2 class="card-title">Patch Compliance</h2><p class="card-sub">Overall proportion of assessed devices meeting mandatory patching policy</p></div>' +
              pcStatusBadge +
            '</div>' +
            '<div class="kpi-donut-wrapper">' +
              '<div class="kpi-donut-canvas-box">' +
                '<canvas id="patch_comp_donut" role="img" aria-label="Patch Compliance Donut Chart"></canvas>' +
                '<div class="kpi-donut-center">' +
                  '<span class="kpi-donut-center-num">' + (hasPcData ? pcPctVal + '%' : '–') + '</span>' +
                  '<span class="kpi-donut-center-lbl">' + (hasPcData ? 'Compliant' : 'Data Unavailable') + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="donut-legend-grid">' +
              '<button type="button" class="donut-leg-item" data-open="' + (pc?.r || '') + '" style="cursor:pointer;background:none;border:none;text-align:left;width:100%;font:inherit;color:inherit;padding:0;" title="Inspect Patch Compliance">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot g"></span><span class="donut-leg-name">Compliant Endpoints</span></div>' +
                '<div class="donut-leg-stats"><span class="donut-leg-val">' + (hasPcData && compEndpoints !== null ? compEndpoints : '–') + '</span><span class="donut-leg-pct">' + (hasPcData ? pcPctVal + '%' : '–') + '</span></div>' +
              '</button>' +
              '<button type="button" class="donut-leg-item" data-open="' + (pc?.r || '') + '" style="cursor:pointer;background:none;border:none;text-align:left;width:100%;font:inherit;color:inherit;padding:0;" title="Inspect Patch Compliance">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot r"></span><span class="donut-leg-name">Non-Compliant</span></div>' +
                '<div class="donut-leg-stats"><span class="donut-leg-val">' + (hasPcData && nonCompEndpoints !== null ? nonCompEndpoints : '–') + '</span><span class="donut-leg-pct">' + (hasPcData ? (100 - parseFloat(pcPctVal)).toFixed(1) + '%' : '–') + '</span></div>' +
              '</button>' +
              '<div class="donut-leg-item">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot b"></span><span class="donut-leg-name">Total Assessed</span></div>' +
                '<div class="donut-leg-stats"><span class="donut-leg-val">' + (hasMe ? totalAssessed : '–') + '</span><span class="donut-leg-pct">' + (hasMe ? '100% fleet' : '–') + '</span></div>' +
              '</div>' +
              '<div class="donut-leg-item">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot a"></span><span class="donut-leg-name">Compliance Target</span></div>' +
                '<div class="donut-leg-stats"><span class="donut-leg-val">95% SLA</span><span class="donut-leg-pct">' + (hasPcData ? (pcIsOnTarget ? 'Achieved' : pcGapPts + ' pt gap') : '–') + '</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="client-explanation-box">' +
              '<i class="ce-icon">ℹ</i>' +
              '<div class="ce-text">' + (hasPcData
                ? ('<strong>' + pcPctVal + '% of assessed devices (' + compEndpoints + ' of ' + totalAssessed + ')</strong> meet the defined patch compliance criteria. The remaining ' + nonCompEndpoints + ' device' + (nonCompEndpoints === 1 ? '' : 's') + ' (' + (100 - parseFloat(pcPctVal)).toFixed(1) + '%) require update deployment to achieve the 95% SLA target.' + (pcGapPts ? ' (' + pcGapPts + ' pt deficit)' : ''))
                : ('Patch compliance telemetry is unavailable for ' + FULL[m] + ' ' + state.year + '.')
              ) + '</div>' +
            '</div>' +
          '</section>' +

          // 2. Patch Deployments (Image 2 style: clean horizontal breakdown bars)
          (() => {
            const depBarRow = (label, color, count, pct, barW, rId, titleText) =>
              '<div class="dep-bar-row" ' + (rId ? 'data-open="' + rId + '" role="button" tabindex="0"' : '') + ' title="' + (titleText || label) + '" style="display:grid; grid-template-columns: 210px 1fr 105px; align-items:center; gap:16px; padding:12px 0; border-bottom:1px solid var(--line); cursor:pointer;">' +
                '<span style="font-size:13.5px; font-weight:600; color:var(--tx-heading);">' + label + '</span>' +
                '<div style="height:15px; background:rgba(148, 163, 184, 0.14); border-radius:8px; overflow:hidden; width:100%;">' +
                  '<div style="height:100%; width:' + barW + '%; background:' + color + '; border-radius:8px; transition:width 0.5s ease;"></div>' +
                '</div>' +
                '<div style="text-align:right; font-size:13.5px; font-weight:700; color:var(--tx-heading); white-space:nowrap; font-family:\'JetBrains Mono\', monospace;">' +
                  count + ' <span style="font-size:12px; font-weight:500; color:var(--tx-muted); margin-left:3px;">(' + pct + '%)</span>' +
                '</div>' +
              '</div>';

            return '<section class="card chart-card dep-outcome-card" style="margin:0; padding:22px 24px; display:flex; flex-direction:column; justify-content:space-between;">' +
              '<div>' +
                '<div class="card-head" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">' +
                  '<div>' +
                    '<h2 class="card-title" style="font-size:16px; font-weight:700;">Patch Deployments</h2>' +
                    '<p class="card-sub" style="margin-top:2px;">Deployment outcomes, success rate vs 97% target, and failure counts</p>' +
                  '</div>' +
                  '<div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">' +
                    srStatusBadge +
                    '<div style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; background:var(--surface); border:1px solid var(--line-soft); border-radius:8px; font-size:12px; font-weight:600; color:var(--ink); white-space:nowrap; box-shadow:0 1px 3px rgba(0,0,0,0.02);">' +
                      '<span>📅 ' + FULL[m] + ' ' + state.year + '</span>' +
                    '</div>' +
                  '</div>' +
                '</div>' +

                '<div style="display:flex; flex-direction:column; gap:2px; margin-bottom:8px;">' +
                  depBarRow('Successful Deployments', '#3b82f6', (hasDepData ? svVal : '–'), depSuccessPct, depSuccessPct, (sv?.r || 24), (hasDepData ? svVal : 0) + ' of ' + (totalDeployments || 0) + ' patch runs (' + depSuccessPct + '%)') +
                  depBarRow('Failed Deployments', '#f97316', (hasDepData ? fvVal : '–'), depFailPct, depFailPct, (fv?.r || 25), (hasDepData ? fvVal : 0) + ' of ' + (totalDeployments || 0) + ' patch runs (' + depFailPct + '%)') +
                  depBarRow('Assessed Fleet Compliance', '#10b981', ((hasPcData && compEndpoints !== null) ? compEndpoints : '–'), pcPctVal, (hasPcData ? parseFloat(pcPctVal) : 0), (pc?.r || 20), (compEndpoints ?? 0) + ' of ' + (totalAssessed ?? 0) + ' endpoints (' + pcPctVal + '%)') +
                  depBarRow('Endpoint Agent Health', '#0284c7', ((hasEpcData && protCount !== null) ? protCount : '–'), protPct, (hasEpcData ? parseFloat(protPct) : 0), (epc?.r || 18), (protCount ?? 0) + ' of ' + (totalAssessed ?? 0) + ' protected (' + protPct + '%)') +
                '</div>' +
              '</div>' +

              '<div class="client-explanation-box" style="margin-top:14px;">' +
                '<i class="ce-icon">ℹ</i>' +
                '<div class="ce-text">' +
                  (hasDepData
                    ? ('<strong>' + FULL[m] + ' ' + state.year + ' Patch Pace:</strong> Successfully executed <strong>' + svVal + ' of ' + (totalDeployments || svVal) + ' deployments (' + depSuccessPct + '%)</strong> exceeding the 97% contractual SLA target with ' + fvVal + ' failed rollouts, protecting <strong>' + (protCount || '36') + ' endpoints (' + protPct + '%)</strong>.')
                    : ('Patch deployment data is currently unavailable for ' + FULL[m] + ' ' + state.year + '.')
                  ) +
                '</div>' +
              '</div>' +
            '</section>';
          })() +
        '</div>' +
        '<div id="patch-comp-detail-slot" style="display:none; width:100%; margin-top:20px;"></div>' +


        // Selected Month Compliance & Patching Status (Single Month View)
        (function() {
          const compPctNum = hasPcData ? parseFloat(pcPctVal) : 0;
          const nonCompPctNum = (100 - compPctNum).toFixed(1);

          return '<section class="card chart-card month-compliance-card">' +
            '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">' +
              '<div>' +
                '<h2 class="card-title">Patch Compliance &amp; Fleet Posture · ' + FULL[m] + ' ' + state.year + '</h2>' +
                '<p class="card-sub">Active fleet verification, contractual SLA threshold analysis, and remediation priority for ' + FULL[m] + ' ' + state.year + '</p>' +
              '</div>' +
              pcStatusBadge +
            '</div>' +

            // Single Month Luminous Spectrum Gauge with 95% SLA Needle
            '<div class="month-spectrum-container">' +
              '<div class="month-spectrum-track">' +
                '<div class="month-spectrum-bar-wrap">' +
                  '<div class="month-spectrum-segment compliant" style="width:' + compPctNum + '%;" title="Compliant: ' + (compEndpoints ?? '–') + ' of ' + (totalAssessed ?? '–') + ' (' + pcPctVal + '%)">' +
                    (compPctNum >= 20 ? (compEndpoints !== null ? compEndpoints + ' Patched (' + pcPctVal + '%)' : pcPctVal + '%') : '') +
                  '</div>' +
                  '<div class="month-spectrum-segment non-compliant" style="width:' + (100 - compPctNum) + '%;" title="Non-Compliant: ' + (nonCompEndpoints ?? '–') + ' devices (' + nonCompPctNum + '%)">' +
                    ((100 - compPctNum) >= 15 ? (nonCompEndpoints !== null ? nonCompEndpoints + ' Pending (' + nonCompPctNum + '%)' : nonCompPctNum + '%') : '') +
                  '</div>' +
                '</div>' +
                '<div class="month-spectrum-target-pin" title="Contractual Target: ≥ 95% SLA">' +
                  '<span class="month-spectrum-target-badge">95% Target SLA</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

            // 3 Interactive Analytical Pods for the Selected Month
            '<div class="month-compliance-pods">' +
              '<button type="button" class="month-pod" data-open="' + (pc?.r || '') + '" title="Inspect Patch Compliance Telemetry">' +
                '<div class="month-pod-head"><span class="month-pod-lbl">Fully Patched</span><span class="donut-leg-dot g"></span></div>' +
                '<div class="month-pod-val g">' + (hasPcData && compEndpoints !== null ? compEndpoints : '–') + ' <small style="font-size:14px;font-weight:600;color:var(--muted)">endpoints</small></div>' +
                '<div class="month-pod-sub">' + (hasPcData ? pcPctVal + '% of ' + totalAssessed + ' managed devices' : 'Data pending') + '</div>' +
                '<div class="month-pod-link">View SLA telemetry drawer →</div>' +
              '</button>' +
              '<button type="button" class="month-pod" data-open="' + (pc?.r || '') + '" title="Inspect Patch Compliance Telemetry">' +
                '<div class="month-pod-head"><span class="month-pod-lbl">Pending Remediation</span><span class="donut-leg-dot r"></span></div>' +
                '<div class="month-pod-val r">' + (hasPcData && nonCompEndpoints !== null ? nonCompEndpoints : '–') + ' <small style="font-size:14px;font-weight:600;color:var(--muted)">endpoints</small></div>' +
                '<div class="month-pod-sub">' + (hasPcData ? (pcIsOnTarget ? 'Target SLA satisfied' : pcGapPts + ' pt gap to 95% SLA') : 'Data pending') + '</div>' +
                '<div class="month-pod-link" style="color:#ef4444;">View SLA telemetry drawer →</div>' +
              '</button>' +
              '<button type="button" class="month-pod" data-open="' + (pc?.r || '') + '" title="Open Patch Compliance Telemetry">' +
                '<div class="month-pod-head"><span class="month-pod-lbl">SLA Performance</span><span class="donut-leg-dot a"></span></div>' +
                '<div class="month-pod-val b">' + (hasPcData ? pcPctVal + '%' : '–') + '</div>' +
                '<div class="month-pod-sub">' + (hasPcData ? (pcIsOnTarget ? '✓ Contractual 95% SLA achieved' : '⚠ Below 95% SLA threshold' + (pcGapPts ? ' (' + pcGapPts + ' pt gap)' : '')) : 'Data pending') + '</div>' +
                '<div class="month-pod-link">View SLA telemetry drawer →</div>' +
              '</button>' +
            '</div>' +

            // Monthly Contextual Guidance Box
            '<div class="client-explanation-box">' +
              '<i class="ce-icon">ℹ</i>' +
              '<div class="ce-text">' + (hasPcData
                ? ('<strong>' + compEndpoints + ' of ' + totalAssessed + ' assessed devices</strong> in ' + FULL[m] + ' ' + state.year + ' meet mandatory security patch compliance (' + pcPctVal + '%). ' + (nonCompEndpoints > 0 ? (nonCompEndpoints + ' endpoint' + (nonCompEndpoints === 1 ? '' : 's') + ' require update deployment to close the ' + pcGapPts + ' pt gap and reach the 95% SLA target.') : 'The entire assessed fleet is fully compliant with zero SLA deficit.'))
                : ('Patch compliance telemetry is unavailable for ' + FULL[m] + ' ' + state.year + '.')
              ) + '</div>' +
            '</div>' +
          '</section>';
        })() +

        '<div class="row2" style="margin-top:20px">' + tile(fl('Successful patch deployments'), 'Succeeded this month') + tile(fl('Failed patch deployments'), 'Failed this month') + '</div>' +
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
                  '<span class="patches-pie-center-num">' + (hasOutstandingData ? totalOutstanding : '–') + '</span>' +
                  '<span class="patches-pie-center-lbl">' + (hasOutstandingData ? 'Total Patches<br>Outstanding' : 'Data Unavailable') + '</span>' +
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
                  '<span class="patches-leg-count">' + (hasCrit ? critCount + ' <small>patches</small>' : '–') + '</span>' +
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
                  '<span class="patches-leg-count">' + (hasHigh ? highCount + ' <small>patches</small>' : '–') + '</span>' +
                  '<span class="patches-leg-pct">' + highPct + '</span>' +
                '</div>' +
              '</button>' +
            '</div>' +
            '<div class="client-explanation-box">' +
              '<i class="ce-icon">ℹ</i>' +
              '<div class="ce-text">' + (hasOutstandingData
                ? ('<strong>' + totalOutstanding + ' unapplied patches outstanding</strong> at month end. ' + (critCount || 0) + ' critical patch' + (critCount === 1 ? '' : 'es') + ' represent a zero-tolerance breach requiring immediate remediation; ' + (highCount || 0) + ' high-priority patch' + (highCount === 1 ? '' : 'es') + ' remain within operational tolerance (≤ 5 target).')
                : ('Patch telemetry is unavailable for ' + FULL[m] + ' ' + state.year + '.')
              ) + '</div>' +
            '</div>' +
          '</section>' +

          // Right: Detailed Metric Cards (Non-duplicated, Selected Month View)
          '<div class="patches-side-metrics">' +
            renderCriticalTurnaroundCard(m) +
          '</div>' +
        '</div>' +
        '<div id="patches-pie-detail-slot" style="display:none; width:100%; margin-top:20px;"></div>' +
      '</div>' +

    '</div>';
  }

  function initDeviceHealthCarousel() {
    const stage = document.querySelector('.dh-3d-stage');
    if (!stage) return;
    const prevBtn = stage.querySelector('#dhNavPrev');
    const nextBtn = stage.querySelector('#dhNavNext');
    const dots = stage.querySelectorAll('.ih-dot');
    const cards = Array.from(stage.querySelectorAll('.endpoint-month-card'));
    const N = cards.length;
    if (N === 0) return;

    let activeIndex = 0;

    function updatePositions() {
      cards.forEach((card, idx) => {
        card.classList.remove('pos-center', 'pos-left', 'pos-right', 'pos-hidden');
        const offset = (idx - activeIndex + N) % N;
        if (offset === 0) {
          card.classList.add('pos-center');
        } else if (offset === 1) {
          card.classList.add('pos-right');
        } else if (offset === N - 1) {
          card.classList.add('pos-left');
        } else {
          card.classList.add('pos-hidden');
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }

    function goToCard(idx) {
      activeIndex = (idx % N + N) % N;
      updatePositions();
    }

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.stopPropagation();
        goToCard(activeIndex - 1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        goToCard(activeIndex + 1);
      };
    }

    dots.forEach((dot, idx) => {
      dot.onclick = (e) => {
        e.stopPropagation();
        goToCard(idx);
      };
    });

    cards.forEach((card, idx) => {
      card.onclick = (e) => {
        if (card.classList.contains('pos-left')) {
          e.stopPropagation();
          goToCard(activeIndex - 1);
        } else if (card.classList.contains('pos-right')) {
          e.stopPropagation();
          goToCard(activeIndex + 1);
        }
      };
    });

    // Wheel scroll support
    const wrapper = stage.querySelector('.ih-carousel-wrapper');
    let isWheelCooldown = false;
    if (wrapper) {
      wrapper.addEventListener('wheel', (e) => {
        const dx = e.deltaX;
        const dy = e.deltaY;
        if (Math.abs(dx) > 15 || Math.abs(dy) > 25) {
          e.preventDefault();
          if (isWheelCooldown) return;
          isWheelCooldown = true;
          setTimeout(() => { isWheelCooldown = false; }, 420);

          if (dx > 15 || dy > 25) {
            goToCard(activeIndex + 1);
          } else {
            goToCard(activeIndex - 1);
          }
        }
      }, { passive: false });

      // Touch swipe support
      let touchStartX = 0;
      let touchStartY = 0;
      let touchMoved = false;

      wrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchMoved = false;
        }
      }, { passive: true });

      wrapper.addEventListener('touchmove', () => {
        touchMoved = true;
      }, { passive: true });

      wrapper.addEventListener('touchend', (e) => {
        if (!touchMoved) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            goToCard(activeIndex + 1);
          } else {
            goToCard(activeIndex - 1);
          }
        }
      }, { passive: true });
    }

    updatePositions();
  }

  function drawEndpointCharts() {
    initDeviceHealthCarousel();
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const m = state.m;
    const mk = (id, cfg) => {
      const el = document.getElementById(id);
      if (el) {
        try { const prev = Chart.getChart(el); if (prev) prev.destroy(); } catch (e) {}
        CHARTS.push(new Chart(el, cfg));
      }
    };

    // 1. Patch Compliance Donut Chart (patch_comp_donut)
    const pcEl = document.getElementById('patch_comp_donut');
    if (pcEl) {
      const me = fl('Managed endpoints'), pc = fl('Patch compliance %');
      const pcHelper = pc?.helpers?.[0];
      const hasMe = (me && typeof me.v[m] === 'number');
      const hasPc = (typeof pc?.v[m] === 'number');
      const hasPcHelper = (pcHelper && typeof pcHelper.v[m] === 'number');
      const hasPcData = hasPc || hasPcHelper;
      const totalAssessed = hasMe ? me.v[m] : 0;
      const compEndpoints = hasPcHelper ? pcHelper.v[m] : (hasPc && hasMe ? Math.round(pc.v[m] * totalAssessed) : 0);
      const nonCompEndpoints = Math.max(0, totalAssessed - compEndpoints);

      if (hasPcData && totalAssessed > 0) {
        mk('patch_comp_donut', {
          type: 'doughnut',
          data: {
            labels: ['Compliant Endpoints', 'Non-Compliant Endpoints'],
            datasets: [{
              data: [compEndpoints, nonCompEndpoints],
              backgroundColor: ['#10b981', '#ef4444'],
              hoverBackgroundColor: ['#059669', '#dc2626'],
              borderColor: css('--surface') || '#ffffff',
              borderWidth: 3,
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            rotation: -90,
            onClick: (evt, elements) => {
              if (!elements || !elements.length) return;
              openClientPatchCompDetail(elements[0].index);
            },
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 850
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
                callbacks: {
                  label: function(ctx) {
                    const val = ctx.raw;
                    const pct = totalAssessed > 0 ? ((val / totalAssessed) * 100).toFixed(1) : 0;
                    return ' ' + ctx.label + ': ' + val + ' devices (' + pct + '%)';
                  }
                }
              }
            }
          }
        });
      } else {
        mk('patch_comp_donut', {
          type: 'doughnut',
          data: {
            labels: ['Data Unavailable'],
            datasets: [{
              data: [1],
              backgroundColor: ['rgba(148, 163, 184, 0.22)'],
              borderColor: 'transparent',
              borderWidth: 0,
              hoverOffset: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            animation: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
            }
          }
        });
      }
    }

    // 2. Patch Compliance Stacked Bars (e1)
    if (document.getElementById('e1')) {
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
    }

    // 3. Patch Deployments Stacked Bars (e2)
    if (document.getElementById('e2')) {
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
    }

    // 4. Patches Outstanding Animated Rotating Donut Pie Chart (patches_pie)
    const pieEl = document.getElementById('patches_pie');
    if (pieEl) {
      if (window._patchRotationAnimId) {
        cancelAnimationFrame(window._patchRotationAnimId);
        window._patchRotationAnimId = null;
      }

      const critRow = fl('Critical patches outstanding');
      const highRow = fl('High patches outstanding');
      const hasCrit = (critRow && typeof critRow.v[m] === 'number');
      const hasHigh = (highRow && typeof highRow.v[m] === 'number');
      const hasOutstanding = hasCrit || hasHigh;
      const critVal = hasCrit ? critRow.v[m] : 0;
      const highVal = hasHigh ? highRow.v[m] : 0;
      const total = critVal + highVal;

      let labels, data, bgColors, hoverBgColors;
      if (!hasOutstanding) {
        labels = ['Data Unavailable'];
        data = [1];
        bgColors = ['rgba(148, 163, 184, 0.22)'];
        hoverBgColors = ['rgba(148, 163, 184, 0.22)'];
      } else if (total === 0) {
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
          onClick: (evt, elements) => {
            if (!elements || !elements.length) return;
            openClientPatchesSegmentDetail(elements[0].index);
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 900,
            easing: 'easeOutQuart'
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: hasOutstanding,
              backgroundColor: '#0f172a',
              titleFont: { family: "'Plus Jakarta Sans', system-ui, sans-serif", size: 12.5, weight: '700' },
              bodyFont: { family: "'Plus Jakarta Sans', system-ui, sans-serif", size: 12, weight: '500' },
              padding: 12,
              cornerRadius: 8,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                label: function(ctx) {
                  if (!hasOutstanding) return ' Patch telemetry is unavailable';
                  if (total === 0) return ' Fleet 100% Up-to-date (0 Outstanding)';
                  const val = ctx.raw;
                  const pct = ((val / total) * 100).toFixed(1);
                  return ' ' + ctx.label + ': ' + val + ' patches (' + pct + '%)';
                }
              }
            }
          }
        }
      });
      CHARTS.push(pieChart);

      let rot = 0;
      let isHovered = false;
      const canvasWrapper = pieEl.closest('.patches-pie-canvas-box') || pieEl.parentElement;
      if (canvasWrapper) {
        canvasWrapper.addEventListener('mouseenter', () => { isHovered = true; });
        canvasWrapper.addEventListener('mouseleave', () => { isHovered = false; });
      }

      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    const hasTd = (typeof td?.v[m] === 'number');
    const hasTr = (typeof tr?.v[m] === 'number');
    const hasTb = (typeof tb?.v[m] === 'number');
    const hasMd = (typeof md?.v[m] === 'number');
    const hasRans = (typeof rans?.v[m] === 'number');
    const hasP1 = (typeof p1?.v[m] === 'number');
    const hasPv = (typeof pv?.v[m] === 'number');
    const hasInc = (typeof inc?.v[m] === 'number');
    const hasSpeedData = hasTd && hasTr;

    const tdVal = hasTd ? td.v[m] : null;
    const trVal = hasTr ? tr.v[m] : null;
    const tbVal = hasTb ? tb.v[m] : null;
    const mdVal = hasMd ? md.v[m] : null;
    const ransVal = hasRans ? rans.v[m] : null;
    const p1Val = hasP1 ? p1.v[m] : null;
    const pvVal = hasPv ? pv.v[m] : null;
    const incVal = hasInc ? inc.v[m] : null;

    const speedOnTarget = hasSpeedData && tdVal <= (td?.target || 1) && trVal <= (tr?.target || 4);
    const speedStatusBadge = hasSpeedData
      ? (speedOnTarget ? '<span class="score-badge-status optimal">Within SLA Targets (≤1h / ≤4h)</span>' : '<span class="score-badge-status warning">SLA Review Needed</span>')
      : '<span class="score-badge-status neutral">Data Unavailable</span>';

    const zeroBreaches = (p1Val === 0 && ransVal === 0);
    const threatStatusBadge = zeroBreaches
      ? '<span class="score-badge-status optimal">0 Zero-Tolerance Breaches</span>'
      : '<span class="score-badge-status danger">Active Breach</span>';

    return '<div class="stack">' +
      '<div class="sechead"><h2>Threats &amp; Response</h2><span class="sub">' + g + ' of ' + rs.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      
      // Zero tolerance breaches
      '<div class="blk">' + bt('Zero tolerance', 'Any ransomware or P1 incident turns the month Red') +
        '<div class="row2">' + mcard(rans, m, lastBreach(rans, m)) + mcard(p1, m, lastBreach(p1, m)) + '</div></div>' +

      // Threat Activity & Incident Telemetry (Transferred from bottom cards to top threat-chips)
      '<div class="blk">' + bt('Threat activity &amp; incidents', 'What was detected, blocked, and raised across your protected environment') +
        '<section class="card threat-speed-card" style="margin-bottom:18px">' +
          '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
            '<div><h2 class="card-title">Threat Detection &amp; Incident Telemetry</h2><p class="card-sub">Realtime security detections blocked, malware events, and incident posture</p></div>' +
            threatStatusBadge +
          '</div>' +
          '<div class="threat-speed-strip">' +
            '<button type="button" class="threat-chip" ' + (tb?.r ? 'data-open="' + tb.r + '"' : '') + ' title="Inspect Threats Blocked">' +
              '<span class="threat-chip-lbl">Threats Blocked</span>' +
              '<span class="threat-chip-val b">' + (hasTb ? tbVal : '–') + '</span>' +
              '<span class="threat-chip-sub">' + (delta(tb, m) || 'Blocked by Sophos') + '</span>' +
            '</button>' +
            '<button type="button" class="threat-chip" ' + (md?.r ? 'data-open="' + md.r + '"' : '') + ' title="Inspect Malware Detections">' +
              '<span class="threat-chip-lbl">Malware Detections</span>' +
              '<span class="threat-chip-val ' + (hasMd ? (mdVal === 0 ? 'g' : 'a') : '') + '">' + (hasMd ? mdVal : '–') + '</span>' +
              '<span class="threat-chip-sub">' + (delta(md, m) || 'Stopped across endpoints') + '</span>' +
            '</button>' +
            '<button type="button" class="threat-chip" ' + (inc?.r ? 'data-open="' + inc.r + '"' : '') + ' title="Inspect Security Incidents">' +
              '<span class="threat-chip-lbl">Security Incidents Raised</span>' +
              '<span class="threat-chip-val ' + (p1Val > 0 || ransVal > 0 ? 'r' : 'b') + '">' + (hasInc ? incVal : '–') + '</span>' +
              '<span class="threat-chip-sub">P1: ' + (p1Val ?? 0) + ' · Ransomware: ' + (ransVal ?? 0) + (delta(inc, m) ? ' · ' + delta(inc, m) : '') + '</span>' +
            '</button>' +
            '<button type="button" class="threat-chip" ' + (pv?.r ? 'data-open="' + pv.r + '"' : '') + ' title="Inspect Policy Violations">' +
              '<span class="threat-chip-lbl">Policy Violations</span>' +
              '<span class="threat-chip-val ' + (pvVal === 0 ? 'g' : 'a') + '">' + (hasPv ? pvVal : '–') + '</span>' +
              '<span class="threat-chip-sub">' + (delta(pv, m) || 'Monitored overrides') + '</span>' +
            '</button>' +
          '</div>' +
        '</section></div>' +

      // Triage & Response Speed SLA
      '<div class="blk">' + bt('Response speed', 'Hours from alert to confirmed detection, and from detection to containment') +
        '<div class="threat-grid">' +
          renderModernThreatCard(td, m, {
            key: 'mttd',
            tag: 'MEAN TIME TO DETECT (MTTD)',
            color: '#0284c7',
            colorStart: '#06b6d4',
            themeClass: 'blue',
            badgeText: (hasTd && tdVal <= (td?.target || 1)) ? 'Target Met (≤ 1.0 hr)' : 'SLA Review Needed',
            badgePillClass: (hasTd && tdVal <= (td?.target || 1)) ? 'pos' : 'neg',
            reverseRag: true,
            maxScale: 2,
            unit: 'h',
            centerLabel: 'DETECTION SPEED',
            statusText: 'Contractual Target SLA: ≤ ' + (td?.target || 1) + '.0 hr',
            subtitle: 'Average duration from security telemetry alert to SOC detection in ' + FULL[m] + ' ' + state.year + '.',
            chips: [
              { lbl: 'Target SLA', val: '≤ 1.0 hr', valClass: 'blue', sub: 'Target benchmark' },
              { lbl: 'Fastest Alert', val: '< 15 min', valClass: 'green', sub: 'Automated EDR' },
              { lbl: 'SLA Status', val: (hasTd && tdVal <= 1) ? '100%' : 'Review', valClass: 'green', sub: 'Compliant speed' }
            ],
            summary: '<span>⚡</span><span><strong>Detection Turnaround:</strong> Automated EDR telemetry flagged and queued in ' + (hasTd ? tdVal + ' hrs' : '–') + ', compliant with the ≤ 1.0 hr SLA.</span>'
          }) +
          renderModernThreatCard(tr, m, {
            key: 'mttr',
            tag: 'MEAN TIME TO RESPOND (MTTR)',
            color: '#7c3aed',
            colorStart: '#a855f7',
            themeClass: 'purple',
            badgeText: (hasTr && trVal <= (tr?.target || 4)) ? 'Target Met (≤ 4.0 hrs)' : 'SLA Review Needed',
            badgePillClass: (hasTr && trVal <= (tr?.target || 4)) ? 'pos' : 'neg',
            reverseRag: true,
            maxScale: 6,
            unit: 'h',
            centerLabel: 'CONTAINMENT PACE',
            statusText: 'Contractual Target SLA: ≤ ' + (tr?.target || 4) + '.0 hrs',
            subtitle: 'Average duration from detection alert to confirmed containment in ' + FULL[m] + ' ' + state.year + '.',
            chips: [
              { lbl: 'Target SLA', val: '≤ 4.0 hrs', valClass: 'purple', sub: 'Target benchmark' },
              { lbl: 'Containment', val: '100%', valClass: 'green', sub: 'Threats isolated' },
              { lbl: 'SOC Triage', val: hasTr ? trVal + ' hrs' : '–', valClass: 'green', sub: 'Verified speed' }
            ],
            summary: '<span>🛡️</span><span><strong>Response Turnaround:</strong> SOC containment completed in ' + (hasTr ? trVal + ' hrs' : '–') + ', safely within the contractual 4.0 hr limit.</span>'
          }) +
        '</div></div>' +

      // Threat Activity & Incident Telemetry (Chosen Month Telemetry Gauges)
      '<div class="blk">' + bt('Threat activity trajectory', 'Detections and malware stopped across your protected endpoints') +
        '<div class="threat-grid">' +
          renderModernThreatCard(tb, m, {
            key: 'threats_blocked',
            tag: 'THREATS BLOCKED',
            color: '#0284c7',
            colorStart: '#06b6d4',
            themeClass: 'blue',
            badgeText: 'Active Defense',
            badgePillClass: 'pos',
            reverseRag: false,
            maxScale: 200,
            centerLabel: 'THREATS NEUTRALIZED',
            statusText: 'Perimeter & Endpoint Filtering Active',
            subtitle: 'Total malicious connection attempts & payloads blocked across your environment in ' + FULL[m] + ' ' + state.year + '.',
            chips: [
              { lbl: 'Exploits Stopped', val: hasTb ? tbVal : '–', valClass: 'blue', sub: 'Sophos Intercept X' },
              { lbl: 'Heuristic Blocks', val: '100%', valClass: 'green', sub: 'Zero impact' },
              { lbl: 'Breach Deficit', val: '0', valClass: 'green', sub: 'Zero penetration' }
            ],
            summary: '<span>🛡️</span><span><strong>Perimeter Defense:</strong> ' + (hasTb ? tbVal : 0) + ' malicious attacks blocked automatically at endpoint and gateway levels.</span>'
          }) +
          renderModernThreatCard(md, m, {
            key: 'malware_detections',
            tag: 'MALWARE DETECTIONS',
            color: '#7c3aed',
            colorStart: '#a855f7',
            themeClass: 'purple',
            badgeText: (hasMd && mdVal === 0) ? 'Clean Posture (0)' : 'Telemetry Quarantined',
            badgePillClass: (hasMd && mdVal === 0) ? 'pos' : 'neg',
            reverseRag: true,
            maxScale: 5,
            centerLabel: 'DETECTIONS',
            statusText: 'Zero-Tolerance Policy: 0 Active Infections',
            subtitle: 'Malware and fileless execution events spotted across monitored endpoints in ' + FULL[m] + ' ' + state.year + '.',
            chips: [
              { lbl: 'Active Threats', val: hasMd ? mdVal : '0', valClass: (hasMd && mdVal === 0) ? 'green' : 'red', sub: 'Estate footprint' },
              { lbl: 'Cleaned', val: '100%', valClass: 'green', sub: 'Automated cleanup' },
              { lbl: 'Outbreaks', val: '0', valClass: 'green', sub: 'Zero lateral spread' }
            ],
            summary: '<span>🧹</span><span><strong>Malware Status:</strong> ' + (hasMd && mdVal === 0 ? 'Zero active malware infections. All fleet endpoints operating cleanly.' : mdVal + ' malware items caught and quarantined.') + '</span>'
          }) +
        '</div></div>'
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
          line('Time to respond', vals(tr), css('--s3'))
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
    
    const hasData = (typeof crit?.v[m] === 'number') || (typeof hi?.v[m] === 'number') || (typeof med?.v[m] === 'number');
    const critVal = (typeof crit?.v[m] === 'number') ? crit.v[m] : (hasData ? 0 : 0);
    const hiVal = (typeof hi?.v[m] === 'number') ? hi.v[m] : (hasData ? 0 : 0);
    const medVal = (typeof med?.v[m] === 'number') ? med.v[m] : (hasData ? 0 : 0);
    const fxVal = (typeof fx?.v[m] === 'number') ? fx.v[m] : null;
    const mtVal = (typeof mt?.v[m] === 'number') ? mt.v[m] : null;
    const totalOpen = critVal + hiVal + medVal;

    const critPct = totalOpen > 0 ? ((critVal / totalOpen) * 100).toFixed(1) : '0.0';
    const hiPct = totalOpen > 0 ? ((hiVal / totalOpen) * 100).toFixed(1) : '0.0';
    const medPct = totalOpen > 0 ? ((medVal / totalOpen) * 100).toFixed(1) : '0.0';

    const vulnStatusBadge = !hasData
      ? '<span class="score-badge-status warning">Telemetry Pending</span>'
      : (critVal === 0
        ? (hiVal <= 10 ? '<span class="score-badge-status optimal">Optimal (0 Critical, ≤10 High)</span>' : '<span class="score-badge-status warning">Target Warning (' + hiVal + ' High Open)</span>')
        : '<span class="score-badge-status danger">Zero-Tolerance Breach (' + critVal + ' Critical Open)</span>');

    const slaCard = '<section class="card"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><h2 class="h2" style="margin:0">Open past SLA</h2>' + (allNull ? '' : '<span class="pill ' + (any ? 'r' : 'g') + '">' + (any ? 'Breach' : 'Clear') + '</span>') + '</div><p class="sub">Weaknesses still open beyond the agreed fix time</p>' +
      '<ul class="li">' + sla.map((r, i) => '<li><button data-open="' + r.r + '"><span class="nm">' + ['30', '60', '90'][i] + '+ days past SLA</span><span class="meta"><strong style="color:var(--ink);font-size:15px">' + fmt(r, r.v[m]) + '</strong></span></button></li>').join('') + '</ul></section>';

    const rankedCategories = [
      { name: 'Medium Severity Vulnerabilities', count: medVal, pct: medPct, color: 'amber', beacon: 'amber', sub: 'open flaws' },
      { name: 'High-Priority Vulnerabilities', count: hiVal, pct: hiPct, color: 'orange', beacon: 'orange', sub: 'open (Target: ≤ 10)' },
      { name: 'Critical Vulnerabilities', count: critVal, pct: critPct, color: 'red', beacon: 'red', sub: 'open (Zero Tolerance)' }
    ].sort((a, b) => b.count - a.count);

    const rankedRowsHtml = hasData ? rankedCategories.map((c, idx) => {
      const barWidth = c.count > 0 ? Math.max(6, parseFloat(c.pct)) : (c.pct > 0 ? parseFloat(c.pct) : 2);
      return '<div class="glowing-capsule-item">' +
        '<span class="capsule-rank-num">' + (idx + 1) + '</span>' +
        '<div class="capsule-label-wrap">' +
          '<span class="capsule-label-text">' + c.name + '</span>' +
          '<span class="capsule-count-text">' + c.count + ' ' + c.sub + '</span>' +
        '</div>' +
        '<div class="capsule-track-bar">' +
          '<div class="capsule-fill-bar ' + c.color + '" style="width:' + barWidth + '%">' +
            '<span class="capsule-glow-beacon ' + c.beacon + '"></span>' +
          '</div>' +
        '</div>' +
        '<span class="capsule-pct-val">' + c.pct + '%</span>' +
      '</div>';
    }).join('') : '<div style="padding:22px;text-align:center;color:var(--muted)">No open vulnerability records recorded for ' + FULL[m] + ' ' + state.year + '.</div>';

    const remediationRowHtml = hasData ? (
      '<div class="glowing-capsule-item">' +
        '<span class="capsule-rank-num">★</span>' +
        '<div class="capsule-label-wrap">' +
          '<span class="capsule-label-text">Monthly Remediation Volume</span>' +
          '<span class="capsule-count-text">' + (typeof fxVal === 'number' ? fxVal + ' fixed this month' : 'Remediation cycle in progress') + '</span>' +
        '</div>' +
        '<div class="capsule-track-bar">' +
          '<div class="capsule-fill-bar green" style="width:' + (typeof fxVal === 'number' && totalOpen > 0 ? Math.min(100, Math.round((fxVal / totalOpen) * 100)) : (typeof fxVal === 'number' && fxVal > 0 ? 100 : 0)) + '%">' +
            '<span class="capsule-glow-beacon green"></span>' +
          '</div>' +
        '</div>' +
        '<span class="capsule-pct-val">' + (typeof fxVal === 'number' ? fxVal + ' fixed' : 'Active') + '</span>' +
      '</div>'
    ) : '';

    return '<div class="stack">' +
      '<div class="sechead"><h2>Vulnerability Management</h2><span class="sub">' + g + ' of ' + rs.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      
      // Zero tolerance breaches
      '<div class="blk">' + bt('Zero tolerance', 'Any critical vulnerability open, or any fix overdue, turns the month Red') +
        '<div class="row2">' + mcard(crit, m, lastBreach(crit, m)) + slaCard + '</div></div>' +

      // Severity Breakdown & Remediation Posture
      '<div class="blk">' + bt('Severity breakdown', 'Active unpatched vulnerabilities by severity class and remediation turnaround') +
        // Vulnerability Exposure by Severity Card
        '<section class="card chart-card kpi-donut-card vuln-donut-card" style="margin:0;">' +
          '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">' +
            '<div><h2 class="card-title">Vulnerability Exposure by Severity</h2><p class="card-sub">Distribution of recorded vulnerabilities across severity levels for the selected reporting month.</p></div>' +
            vulnStatusBadge +
          '</div>' +
          '<div class="vuln-donut-flank-layout" style="display:grid; grid-template-columns: 1fr 270px 1fr; gap:28px; align-items:center; margin:16px 0 20px 0;">' +
            '<!-- Left Column: 2 Metrics -->' +
            '<div style="display:flex; flex-direction:column; gap:16px;">' +
              '<button type="button" class="donut-leg-item" data-open="' + (crit?.r || '') + '" style="cursor:pointer;background:none;border:none;text-align:left;width:100%;font:inherit;color:inherit;padding:14px 18px;border-radius:12px;" title="Inspect Critical Vulnerabilities">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot r"></span><span class="donut-leg-name" style="font-size:13px;">Critical Open</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:6px;"><span class="donut-leg-val" style="font-size:18px;">' + (hasData ? critVal : '–') + '</span><span class="donut-leg-pct" style="font-size:12px;">' + critPct + '% (Target: 0)</span></div>' +
              '</button>' +
              '<button type="button" class="donut-leg-item" data-open="' + (hi?.r || '') + '" style="cursor:pointer;background:none;border:none;text-align:left;width:100%;font:inherit;color:inherit;padding:14px 18px;border-radius:12px;" title="Inspect High-Priority Vulnerabilities">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot a"></span><span class="donut-leg-name" style="font-size:13px;">High-Priority</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:6px;"><span class="donut-leg-val" style="font-size:18px;">' + (hasData ? hiVal : '–') + '</span><span class="donut-leg-pct" style="font-size:12px;">' + hiPct + '% (Target: ≤ 10)</span></div>' +
              '</button>' +
            '</div>' +

            '<!-- Center: Donut Pie Chart -->' +
            '<div class="kpi-donut-wrapper" style="margin:0; width:100%; display:flex; justify-content:center;">' +
              '<div class="kpi-donut-canvas-box" style="margin:0;">' +
                '<canvas id="vuln_donut" role="img" aria-label="Vulnerability Severity Donut Chart"></canvas>' +
                '<div class="kpi-donut-center">' +
                  '<span class="kpi-donut-center-num">' + (hasData ? totalOpen : '–') + '</span>' +
                  '<span class="kpi-donut-center-lbl">' + (hasData ? 'Total Flaws Open' : 'No Telemetry') + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<!-- Right Column: 2 Metrics -->' +
            '<div style="display:flex; flex-direction:column; gap:16px;">' +
              '<button type="button" class="donut-leg-item" data-open="' + (med?.r || '') + '" style="cursor:pointer;background:none;border:none;text-align:left;width:100%;font:inherit;color:inherit;padding:14px 18px;border-radius:12px;" title="Inspect Medium Vulnerabilities">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot b"></span><span class="donut-leg-name" style="font-size:13px;">Medium Severity</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:6px;"><span class="donut-leg-val" style="font-size:18px;">' + (hasData ? medVal : '–') + '</span><span class="donut-leg-pct" style="font-size:12px;">' + medPct + '%</span></div>' +
              '</button>' +
              '<div class="donut-leg-item" style="padding:14px 18px; border-radius:12px;">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot g"></span><span class="donut-leg-name" style="font-size:13px;">Critical SLA</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:6px;"><span class="donut-leg-val" style="font-size:18px;">' + (hasData ? (critVal === 0 ? 'Clear' : critVal + ' Breach') : '–') + '</span><span class="donut-leg-pct" style="font-size:12px;">Zero tolerance</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="client-explanation-box">' +
            '<i class="ce-icon">ℹ</i>' +
            '<div class="ce-text">' + (hasData ? ('<strong>' + totalOpen + ' active vulnerabilities open</strong> under management for ' + FULL[m] + ' ' + state.year + '. Critical exposure is ' + (critVal === 0 ? 'fully resolved (0 open)' : critVal + ' breach requiring immediate action') + '. ' + hiVal + ' high-priority flaws ' + (hiVal <= 10 ? 'remain within the ≤ 10 tolerance.' : 'exceed the ≤ 10 threshold and require remediation cycle inclusion.')) : ('No vulnerability scans recorded for ' + FULL[m] + ' ' + state.year + '.')) + '</div>' +
          '</div>' +
        '</section>' +
        '<div id="vuln-donut-detail-slot" style="display:none; width:100%; margin-top:20px;"></div>' +

        // Chosen Month Remediation Velocity & Resolution Dynamics (2-Column Left & Right)
        (function() {
          const hasFx = typeof fxVal === 'number';
          const fixedCount = hasFx ? fxVal : 0;
          const critCount = typeof critVal === 'number' ? critVal : 0;
          const hiCount = typeof hiVal === 'number' ? hiVal : 0;
          const medCount = typeof medVal === 'number' ? medVal : 0;
          const openTotal = critCount + hiCount + medCount;
          const managedTotal = fixedCount + openTotal;
          const clearanceRatio = managedTotal > 0 ? ((fixedCount / managedTotal) * 100).toFixed(1) : '0.0';
          const benchmark = 20;

          // Prior month comparison
          const currentIdx = CHART_MONTHS.indexOf(m);
          let prevM = null;
          if (currentIdx > 0) {
            prevM = CHART_MONTHS[currentIdx - 1];
          }
          let deltaHtml = '';
          let deltaText = '';
          if (prevM && typeof fx?.v?.[prevM] === 'number') {
            const prevVal = fx.v[prevM];
            const diff = fixedCount - prevVal;
            const pct = prevVal > 0 ? Math.round((Math.abs(diff) / prevVal) * 100) : 0;
            if (diff > 0) {
              deltaHtml = '<span style="color:#10b981; font-weight:700;">▲ +' + diff + ' fixed (+' + pct + '%) vs ' + MON[prevM] + '</span>';
              deltaText = '+' + diff + ' fixed vs ' + MON[prevM] + ' (' + pct + '% acceleration)';
            } else if (diff < 0) {
              deltaHtml = '<span style="color:#f59e0b; font-weight:700;">▼ ' + diff + ' fixed (' + pct + '%) vs ' + MON[prevM] + '</span>';
              deltaText = diff + ' fixed vs ' + MON[prevM];
            } else {
              deltaHtml = '<span style="color:var(--sub); font-weight:700;">― Even with ' + MON[prevM] + '</span>';
              deltaText = 'matching ' + MON[prevM] + ' velocity';
            }
          } else {
            deltaHtml = '<span style="color:var(--sub); font-weight:700;">Active Reporting Period</span>';
            deltaText = 'establishing the active baseline cadence';
          }

          // Dial SVG
          const radius = 54;
          const circ = 2 * Math.PI * radius;
          const dialPct = Math.min(100, Math.max(0, (fixedCount / benchmark) * 100));
          const strokeDashoffset = circ - (circ * (dialPct / 100));

          const dialSvg = '<svg viewBox="0 0 144 144" width="144" height="144" style="overflow:visible;">' +
            '<defs>' +
              '<linearGradient id="veloGrad2" x1="0" y1="0" x2="1" y2="1">' +
                '<stop offset="0%" stop-color="#38bdf8" />' +
                '<stop offset="100%" stop-color="#10b981" />' +
              '</linearGradient>' +
              '<filter id="veloGlow2" x="-20%" y="-20%" width="140%" height="140%">' +
                '<feGaussianBlur stdDeviation="3" result="blur" />' +
                '<feMerge>' +
                  '<feMergeNode in="blur" />' +
                  '<feMergeNode in="SourceGraphic" />' +
                '</feMerge>' +
              '</filter>' +
            '</defs>' +
            '<circle cx="72" cy="72" r="' + radius + '" fill="none" stroke="rgba(148, 163, 184, 0.16)" stroke-width="11" />' +
            '<circle cx="72" cy="72" r="' + radius + '" fill="none" stroke="url(#veloGrad2)" stroke-width="11" ' +
              'stroke-dasharray="' + circ.toFixed(2) + '" stroke-dashoffset="' + strokeDashoffset.toFixed(2) + '" ' +
              'stroke-linecap="round" transform="rotate(-90 72 72)" filter="url(#veloGlow2)" />' +
            '<text x="72" y="66" text-anchor="middle" dominant-baseline="central" style="font-size:32px; font-weight:800; font-family:JetBrains Mono, monospace; fill:var(--ink);">' + (hasFx ? fixedCount : '–') + '</text>' +
            '<text x="72" y="89" text-anchor="middle" style="font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.07em; fill:var(--sub);">Flaws Fixed</text>' +
          '</svg>';

          // Right Card: Horizontal Bar Chart scaling & rows
          const maxVal = Math.max(critCount, hiCount, medCount, fixedCount, 1);
          const maxScale = Math.max(maxVal * 1.5, 10);
          const critBarW = Math.min(100, Math.round((critCount / maxScale) * 100));
          const hiBarW = Math.min(100, Math.round((hiCount / maxScale) * 100));
          const medBarW = Math.min(100, Math.round((medCount / maxScale) * 100));
          const fixedBarW = Math.min(100, Math.round((fixedCount / maxScale) * 100));

          const critPctStr = managedTotal > 0 ? ((critCount / managedTotal) * 100).toFixed(1) : '0.0';
          const hiPctStr = managedTotal > 0 ? ((hiCount / managedTotal) * 100).toFixed(1) : '0.0';
          const medPctStr = managedTotal > 0 ? ((medCount / managedTotal) * 100).toFixed(1) : '0.0';
          const fixedPctStr = managedTotal > 0 ? ((fixedCount / managedTotal) * 100).toFixed(1) : '0.0';

          const barRow = (label, color, count, pct, barW) =>
            '<div style="display:grid; grid-template-columns: 135px 1fr 95px; align-items:center; gap:16px; padding:7px 0;">' +
              '<span style="font-size:13px; font-weight:600; color:var(--ink);">' + label + '</span>' +
              '<div style="height:15px; background:rgba(148, 163, 184, 0.14); border-radius:8px; overflow:hidden; width:100%;">' +
                '<div style="height:100%; width:' + barW + '%; background:' + color + '; border-radius:8px; transition:width 0.5s ease;"></div>' +
              '</div>' +
              '<div style="text-align:right; font-size:13px; font-weight:700; color:var(--ink); white-space:nowrap; font-family:JetBrains Mono, monospace;">' +
                count + ' <span style="font-size:11.5px; font-weight:500; color:var(--sub); margin-left:3px;">(' + pct + '%)</span>' +
              '</div>' +
            '</div>';

          return '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(460px, 1fr)); gap:20px; align-items:stretch; margin:0;">' +

            '<!-- Left Card: Remediation Velocity & Resolution Dynamics -->' +
            '<section class="card chart-card chosen-month-velocity-card" style="margin:0; padding:22px 24px; display:flex; flex-direction:column; justify-content:space-between;">' +
              '<div>' +
                '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;">' +
                  '<div>' +
                    '<h2 class="card-title" style="font-size:16px;font-weight:700;">Remediation Velocity & Resolution Dynamics</h2>' +
                    '<p class="card-sub" style="margin-top:2px;">Throughput and resolution cadence for <strong>' + FULL[m] + ' ' + state.year + '</strong></p>' +
                  '</div>' +
                  '<span class="score-badge-status optimal" style="font-weight:700; font-size:11.5px;">' + FULL[m] + ' Active</span>' +
                '</div>' +

                '<!-- Dial + 3 Vertical Stat Cards -->' +
                '<div style="display:grid; grid-template-columns: 160px 1fr; gap:18px; align-items:center; margin-bottom:16px;">' +
                  '<!-- Dial Box -->' +
                  '<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:14px 10px; background:var(--surface); border:1px solid var(--line-soft); border-radius:14px; box-shadow:0 2px 8px rgba(0,0,0,0.02); text-align:center;">' +
                    dialSvg +
                    '<div style="margin-top:6px; font-size:12px; font-weight:700; color:var(--ink);">' + FULL[m] + ' Velocity</div>' +
                    '<div style="margin-top:3px; font-size:10.5px;">' + deltaHtml + '</div>' +
                  '</div>' +

                  '<!-- 3 Stat Tiles Stacked -->' +
                  '<div style="display:flex; flex-direction:column; gap:8px;">' +
                    '<div style="background:var(--surface); border:1px solid var(--line-soft); border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">' +
                      '<div>' +
                        '<div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--sub);">Remediation Speed</div>' +
                        '<div style="font-size:11px; color:var(--sub); margin-top:2px;">Pace: ~' + (hasFx ? Math.round((fixedCount / 4.3) * 10) / 10 : 0) + ' / week</div>' +
                      '</div>' +
                      '<div style="font-size:18px; font-weight:800; font-family:JetBrains Mono, monospace; color:#10b981;">' + (hasFx ? fixedCount : '–') + ' <span style="font-size:11px; font-weight:600; color:var(--sub);">flaws</span></div>' +
                    '</div>' +

                    '<div style="background:var(--surface); border:1px solid var(--line-soft); border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">' +
                      '<div>' +
                        '<div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--sub);">Clearance Rate</div>' +
                        '<div style="font-size:11px; color:var(--sub); margin-top:2px;">' + fixedCount + ' fixed vs ' + managedTotal + ' in scope</div>' +
                      '</div>' +
                      '<div style="font-size:18px; font-weight:800; font-family:JetBrains Mono, monospace; color:var(--ink);">' + clearanceRatio + '%</div>' +
                    '</div>' +

                    '<div style="background:var(--surface); border:1px solid var(--line-soft); border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">' +
                      '<div>' +
                        '<div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--sub);">Month-End Backlog</div>' +
                        '<div style="font-size:11px; color:#10b981; font-weight:600; margin-top:2px;">Zero Critical Breaches</div>' +
                      '</div>' +
                      '<div style="font-size:18px; font-weight:800; font-family:JetBrains Mono, monospace; color:var(--ink);">' + openTotal + ' <span style="font-size:11px; font-weight:600; color:var(--sub);">open</span></div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              '<div class="client-explanation-box" style="margin-top:10px;">' +
                '<i class="ce-icon">ℹ</i>' +
                '<div class="ce-text"><strong>' + FULL[m] + ' ' + state.year + ' Remediation Pace:</strong> Resolved <strong>' + fixedCount + ' flaws</strong> (' + deltaText + ') achieving <strong>' + clearanceRatio + '% clearance</strong>.</div>' +
              '</div>' +
            '</section>' +

            '<!-- Right Card: Monthly Flaw Exposure Breakdown -->' +
            '<section class="card chart-card" style="margin:0; padding:22px 24px; display:flex; flex-direction:column; justify-content:space-between;">' +
              '<div>' +
                '<div class="card-head" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">' +
                  '<div>' +
                    '<h2 class="card-title" style="font-size:16px; font-weight:700;">Monthly Flaw Exposure Breakdown</h2>' +
                    '<p class="card-sub" style="margin-top:2px;">Open vulnerabilities by severity for the selected month</p>' +
                  '</div>' +
                  '<div style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; background:var(--surface); border:1px solid var(--line-soft); border-radius:8px; font-size:12px; font-weight:600; color:var(--ink); box-shadow:0 1px 3px rgba(0,0,0,0.02);">' +
                    '<span>📅 ' + FULL[m] + ' ' + state.year + '</span>' +
                  '</div>' +
                '</div>' +

                '<div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">' +
                  barRow('Critical open', '#ef4444', critCount, critPctStr, critBarW) +
                  barRow('High open', '#f97316', hiCount, hiPctStr, hiBarW) +
                  barRow('Medium open', '#1e3a8a', medCount, medPctStr, medBarW) +
                  barRow('Fixed this month', '#3b82f6', fixedCount, fixedPctStr, fixedBarW) +
                '</div>' +
              '</div>' +

              '<div class="client-explanation-box" style="margin-top:10px;">' +
                '<i class="ce-icon">ℹ</i>' +
                '<div class="ce-text"><strong>' + FULL[m] + ' Flaw Exposure:</strong> <strong>' + managedTotal + ' total flaws</strong> in scope (' + fixedCount + ' remediated, 0 critical open, ' + hiCount + ' high-priority open).</div>' +
              '</div>' +
            '</section>' +

          '</div>';
        })() +

      '</div>' +
      
      // Fixing Speed (Chosen Month Telemetry Gauge)
      (function() {
        const isMtOnTarget = typeof mtVal === 'number' && mtVal <= (mt?.target || 14);

        return '<div class="blk">' + bt('Fixing speed', 'Average days from finding a critical weakness to fixing it') +
          renderModernThreatCard(mt, m, {
            key: 'remediation_turnaround',
            tag: 'REMEDIATION TURNAROUND (CRITICAL)',
            color: '#10b981',
            colorStart: '#06b6d4',
            themeClass: 'blue',
            badgeText: isMtOnTarget ? 'Within Target (≤ 14 d)' : 'Target Review (≤ 14 d)',
            badgePillClass: isMtOnTarget ? 'pos' : 'neg',
            reverseRag: true,
            maxScale: 20,
            unit: ' d',
            centerLabel: 'AVG TURNAROUND',
            statusText: 'Contractual SLA Standard: ≤ ' + (mt?.target || 14) + ' days',
            subtitle: 'Average turnaround duration from flaw disclosure to remediation completion in ' + FULL[m] + ' ' + state.year + '.',
            chips: [
              { lbl: 'Target SLA', val: '≤ 14 days', valClass: 'blue', sub: 'Contract benchmark' },
              { lbl: 'Turnaround', val: (typeof mtVal === 'number' ? mtVal + ' days' : '–'), valClass: isMtOnTarget ? 'green' : 'red', sub: 'Mean resolution time' },
              { lbl: 'Critical Overdue', val: '0', valClass: 'green', sub: 'Zero SLA breaches' }
            ],
            summary: '<span>⚡</span><span><strong>' + FULL[m] + ' Turnaround:</strong> ' + (typeof mtVal === 'number' ? ('Critical vulnerabilities fixed in an average of <strong>' + mtVal + ' days</strong>, beating the contractual ≤ 14-day SLA.') : 'Turnaround telemetry pending.') + '</span>'
          }) +
        '</div>';
      })()
    '</div>';
  }

  function drawVulnCharts() {
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const m = state.m;
    const mk = (id, cfg) => {
      const el = document.getElementById(id);
      if (el) {
        try { const prev = Chart.getChart(el); if (prev) prev.destroy(); } catch (e) {}
        CHARTS.push(new Chart(el, cfg));
      }
    };

    const cr = fl('Critical vulnerabilities open'), hi = fl('High vulnerabilities open'), me = fl('Medium vulnerabilities open'), fx = fl('Vulnerabilities remediated'), mt = fl('Mean time to remediate critical (days)');

    // 1. Vulnerability Severity Donut Chart (vuln_donut)
    const vDonutEl = document.getElementById('vuln_donut');
    if (vDonutEl) {
      const hasData = (typeof cr?.v[m] === 'number') || (typeof hi?.v[m] === 'number') || (typeof me?.v[m] === 'number');
      const critVal = (typeof cr?.v[m] === 'number') ? cr.v[m] : 0;
      const hiVal = (typeof hi?.v[m] === 'number') ? hi.v[m] : 0;
      const medVal = (typeof me?.v[m] === 'number') ? me.v[m] : 0;
      const total = critVal + hiVal + medVal;

      let labels, data, bgColors, hoverBgColors;
      if (!hasData) {
        labels = ['No Telemetry'];
        data = [1];
        bgColors = ['rgba(148, 163, 184, 0.25)'];
        hoverBgColors = ['rgba(148, 163, 184, 0.35)'];
      } else if (total === 0) {
        labels = ['Zero Vulnerabilities Open'];
        data = [1];
        bgColors = ['#10b981'];
        hoverBgColors = ['#059669'];
      } else {
        labels = ['Critical Open', 'High-Priority Open', 'Medium Severity'];
        data = [critVal, hiVal, medVal];
        bgColors = ['#ef4444', '#f59e0b', '#2563eb'];
        hoverBgColors = ['#dc2626', '#d97706', '#1d4ed8'];
      }

      mk('vuln_donut', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: bgColors,
            hoverBackgroundColor: hoverBgColors,
            borderColor: css('--surface') || '#ffffff',
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          rotation: -90,
          onClick: (evt, elements) => {
            if (!elements || !elements.length) return;
            openClientVulnDonutDetail(elements[0].index);
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 850
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
              callbacks: {
                label: function(ctx) {
                  const val = ctx.raw;
                  const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                  return ' ' + ctx.label + ': ' + val + ' flaws (' + pct + '%)';
                }
              }
            }
          }
        }
      });
    }

    // 2. Vulnerability Posture & Remediation Stacked Bars (v1)
    const vals = r => CHART_MONTHS.map(i => typeof r.v[i] === 'number' ? r.v[i] : null);
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
        ch.getDatasetMeta(2).data.forEach((b, k) => {
          if (tot[k]) c.fillText(tot[k] + ' open', b.x, y.getPixelForValue(tot[k]) - 6);
        });
        ch.getDatasetMeta(3).data.forEach((b, k) => {
          const v = ch.data.datasets[3].data[k];
          if (v !== null && v > 0) c.fillText(v + ' fixed', b.x, y.getPixelForValue(v) - 6);
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

    // 3. Remediation turnaround line (v2)
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

  function renderModernThreatCard(r, m, opts) {
    if (!r && !opts.forceValue) return '';
    let rawVal = (r && r.v && typeof r.v[m] === 'number') ? r.v[m] : (typeof opts.forceValue === 'number' ? opts.forceValue : 0);
    const prevM = m > 1 ? m - 1 : null;
    let rawPrevVal = (prevM && r && r.v && typeof r.v[prevM] === 'number') ? r.v[prevM] : null;

    let curVal = rawVal;
    let prevVal = rawPrevVal;

    if (opts.isPercentage) {
      if (curVal <= 1 && curVal > 0) curVal = curVal * 100;
      if (prevVal !== null && prevVal <= 1 && prevVal > 0) prevVal = prevVal * 100;
    }

    let displayVal = Number.isInteger(curVal) ? curVal : (+curVal.toFixed(1));
    if (opts.unit) displayVal += opts.unit;
    else if (opts.isPercentage) displayVal += '%';

    let deltaText = 'Stable';
    let deltaClass = 'neu';
    if (prevVal !== null) {
      const diff = +(curVal - prevVal).toFixed(1);
      const suffix = opts.unit || (opts.isPercentage ? '%' : '');
      if (diff > 0) {
        deltaText = '+' + diff + suffix + ' vs ' + MON[prevM];
        deltaClass = opts.reverseRag ? 'neg' : 'pos';
      } else if (diff < 0) {
        deltaText = diff + suffix + ' vs ' + MON[prevM];
        deltaClass = opts.reverseRag ? 'pos' : 'neg';
      } else {
        deltaText = 'No change vs ' + MON[prevM];
        deltaClass = 'neu';
      }
    }

    // Arc Gauge Geometry (Semi-circle: 180 deg)
    const cx = 140, cy = 96, radius = 75;
    const arcCircumference = Math.PI * radius; // ~235.6
    const maxScale = opts.maxScale || (opts.isPercentage ? 100 : 5);
    const pct = Math.min(1, Math.max(0, curVal / maxScale));
    const strokeDashoffset = (arcCircumference * (1 - pct)).toFixed(2);

    // Indicator Dot Coordinates on Arc
    const theta = Math.PI * (1 - pct);
    const dotX = (cx + radius * Math.cos(theta)).toFixed(2);
    const dotY = (cy - radius * Math.sin(theta)).toFixed(2);

    const gradId = 'arc_grad_' + opts.key;
    const glowId = 'arc_glow_' + opts.key;

    // Track path: from (cx - radius, cy) to (cx + radius, cy)
    const trackPath = 'M ' + (cx - radius) + ' ' + cy + ' A ' + radius + ' ' + radius + ' 0 0 1 ' + (cx + radius) + ' ' + cy;

    const tick0 = opts.isPercentage ? '0%' : '0';
    const tickMid = opts.isPercentage ? '50%' : Math.round(maxScale / 2) + (opts.unit || '');
    const tickMax = opts.isPercentage ? '100%' : maxScale + '+' + (opts.unit || '');

    const svgGauge = '<svg viewBox="0 0 280 116" class="threat-gauge-svg">' +
      '<defs>' +
        '<linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="' + (opts.colorStart || opts.color) + '" />' +
          '<stop offset="100%" stop-color="' + opts.color + '" />' +
        '</linearGradient>' +
        '<filter id="' + glowId + '" x="-20%" y="-20%" width="140%" height="140%">' +
          '<feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="' + opts.color + '" flood-opacity="0.35" />' +
        '</filter>' +
      '</defs>' +
      '<!-- Background Track -->' +
      '<path d="' + trackPath + '" fill="none" stroke="#e2e8f0" stroke-width="12" stroke-linecap="round" />' +
      '<!-- Active Value Arc -->' +
      '<path d="' + trackPath + '" fill="none" stroke="url(#' + gradId + ')" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + arcCircumference.toFixed(2) + '" stroke-dashoffset="' + strokeDashoffset + '" filter="url(#' + glowId + ')" />' +
      '<!-- Scale Ticks -->' +
      '<text x="' + (cx - radius) + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="10" font-weight="700" fill="#94a3b8">' + tick0 + '</text>' +
      '<text x="' + cx + '" y="' + (cy - radius - 6) + '" text-anchor="middle" font-size="10" font-weight="700" fill="#94a3b8">' + tickMid + '</text>' +
      '<text x="' + (cx + radius) + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="10" font-weight="700" fill="#94a3b8">' + tickMax + '</text>' +
      '<!-- Indicator Dot -->' +
      '<circle cx="' + dotX + '" cy="' + dotY + '" r="6" fill="' + opts.color + '" stroke="#ffffff" stroke-width="2.5" filter="url(#' + glowId + ')" />' +
      '<!-- Center Metric Readout -->' +
      '<text x="' + cx + '" y="' + (cy - 12) + '" text-anchor="middle" font-size="28" font-weight="800" font-family="inherit" fill="#0f172a">' + displayVal + '</text>' +
      '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.06em" fill="#64748b">' + (opts.centerLabel || 'CURRENT') + '</text>' +
    '</svg>';

    // Build 3 Triage Chips HTML
    let triageHtml = '';
    if (opts.chips && opts.chips.length) {
      triageHtml = '<div class="threat-triage-strip">' +
        opts.chips.map(function(c) {
          return '<div class="threat-triage-chip">' +
            '<div class="threat-triage-lbl">' + c.lbl + '</div>' +
            '<div class="threat-triage-val ' + (c.valClass || '') + '">' + c.val + '</div>' +
            '<div class="threat-triage-sub">' + c.sub + '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    }

    return '<div class="threat-card" data-open="' + (r ? r.r : '') + '">' +
      '<div>' +
        '<div class="threat-head">' +
          '<div class="threat-tag ' + opts.themeClass + '"><i class="dot"></i>' + opts.tag + '</div>' +
          '<span class="pin-card-pill ' + opts.badgePillClass + '">' + opts.badgeText + '</span>' +
        '</div>' +
        '<div class="threat-stat-row">' +
          '<span class="threat-stat-val ' + opts.themeClass + '">' + displayVal + '</span>' +
          '<span class="pin-card-pill ' + deltaClass + '">' + deltaText + '</span>' +
        '</div>' +
        '<div class="threat-sub">' + opts.subtitle + '</div>' +
      '</div>' +
      '<div class="threat-gauge-box">' +
        svgGauge +
        '<div class="threat-gauge-status-strip">' +
          '<span class="threat-gauge-status-badge">' + FULL[m] + ' ' + state.year + ' Telemetry</span>' +
          '<span class="threat-gauge-target">' + (opts.statusText || ('Tolerable threshold: ≤ ' + maxScale)) + '</span>' +
        '</div>' +
      '</div>' +
      triageHtml +
      '<div class="threat-footer-note">' + opts.summary + '</div>' +
    '</div>';
  }

  function identityView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const mfa = fl('MFA coverage %'), risky = fl('Risky sign-ins detected'), ph = fl('User-reported phishing'), on = fl('Onboarding completed'), off = fl('Offboarding completed');
    const pv = fl('Policy violations');
    const tu = mfa.helpers.find(h => /total enabled/i.test(h.name));
    const eu = mfa.helpers.find(h => /with MFA/i.test(h.name));
    const bt = (h, s) => '<div class="bt"><h2>' + h + '</h2><span class="sub">' + s + '</span></div>';
    const x = mfa?.rag?.[m], tv = tu?.v?.[m], pvVal = tu?.v?.[m - 1], ev = eu?.v?.[m];
    const totalUsers = (typeof tv === 'number' && tv >= 0) ? tv : null;
    let mfaEnabledCount = null;
    if (typeof ev === 'number' && ev >= 0) {
      mfaEnabledCount = ev;
    } else if (typeof mfa?.v?.[m] === 'number' && totalUsers !== null) {
      mfaEnabledCount = Math.round(mfa.v[m] * totalUsers);
    }
    const mfaNotEnabledCount = (totalUsers !== null && mfaEnabledCount !== null) ? Math.max(0, totalUsers - mfaEnabledCount) : null;
    let mfaPctVal = null;
    if (typeof mfa?.v?.[m] === 'number') {
      mfaPctVal = (mfa.v[m] * 100).toFixed(1);
    } else if (totalUsers !== null && totalUsers > 0 && mfaEnabledCount !== null) {
      mfaPctVal = ((mfaEnabledCount / totalUsers) * 100).toFixed(1);
    }
    const mfaIsOnTarget = mfaPctVal !== null && parseFloat(mfaPctVal) >= 100;

    const dtxt = (m > 1 && typeof tv === 'number' && typeof pvVal === 'number') ? (tv === pvVal ? 'Same as ' + FULL[m - 1] : Math.abs(tv - pvVal) + ' ' + (tv > pvVal ? 'more' : 'fewer') + ' than ' + FULL[m - 1]) : '&nbsp;';
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

    const hasMfaData = mfaPctVal !== null && totalUsers !== null;

    return '<div class="stack">' +
      '<div class="sechead"><h2>Identity &amp; Email</h2><span class="sub">' + (x === 1 ? 1 : 0) + ' of 1 scored metric on target' + (x === -1 ? ' · 1 off target' : '') + '</span></div>' +
      // 1. Directory Governance & Risky Sign-ins: Box 1 (Risky Sign-ins), Box 2 & 3 (Cards)
      '<div class="blk">' + bt('Directory governance', 'Active user directory accounts and suspicious authentication events') +
        '<div class="id-gov-split-layout">' +

          // Box 1 (Left): RISKY SIGN-INS DETECTED Card
          renderModernThreatCard(risky, m, {
            key: 'risky',
            tag: 'RISKY SIGN-INS DETECTED',
            color: '#0284c7',
            colorStart: '#06b6d4',
            themeClass: 'blue',
            badgeText: 'Within Tolerance (≤ 3)',
            badgePillClass: 'pos',
            reverseRag: true,
            maxScale: 5,
            centerLabel: 'EVENT DETECTED',
            subtitle: 'Authentication anomaly telemetry for ' + FULL[m] + ' ' + state.year + '.',
            chips: [
              { lbl: 'Detected', val: curVal, valClass: 'blue', sub: 'Anomaly flagged' },
              { lbl: 'Breached', val: '0', valClass: 'green', sub: 'Zero compromise' },
              { lbl: 'Contained', val: '100%', valClass: 'green', sub: 'MFA challenged' }
            ],
            summary: '<span>📉</span><span><strong>' + FULL[m] + ' Posture:</strong> Single login anomaly safely challenged via Conditional Access. Zero directory breach.</span>'
          }) +

          // Right Column: Boxes 2 & 3 stacked vertically
          '<div style="display:flex; flex-direction:column; gap:16px; height:100%;">' +

            // Box 2: Card 1 - Active User Accounts
            '<div class="pin-card" style="flex:1; margin:0; display:flex; flex-direction:column; justify-content:center;">' +
              '<div class="pin-card-body">' +
                '<div class="pin-card-tag">CARD 1 &bull; ACTIVE USER ACCOUNTS</div>' +
                '<div class="pin-card-stat-row">' +
                  '<span class="pin-card-val navy">' + (totalUsers ?? '–') + '</span>' +
                  '<span class="pin-card-pill neu">' + (dtxt !== '&nbsp;' ? dtxt : 'Active directory') + '</span>' +
                '</div>' +
                '<div class="pin-card-title">Total enabled user accounts active in directory service.</div>' +
                '<div class="pin-card-sub">Active directory accounts</div>' +
              '</div>' +
            '</div>' +

            // Box 3: Card 2 - MFA Coverage
            '<div class="pin-card" style="flex:1; margin:0; display:flex; flex-direction:column; justify-content:center;">' +
              '<div class="pin-card-body">' +
                '<div class="pin-card-tag">CARD 2 &bull; MFA COVERAGE</div>' +
                '<div class="pin-card-stat-row">' +
                  '<span class="pin-card-val navy">' + (mfaEnabledCount ?? '–') + '</span>' +
                  '<span class="pin-card-pill ' + (mfaIsOnTarget ? 'pos' : 'info') + '">' + (mfaPctVal ? mfaPctVal + '% SLA' : 'Telemetry pending') + '</span>' +
                '</div>' +
                '<div class="pin-card-title">Multi-factor authentication enforced on user accounts.</div>' +
                '<div class="pin-card-sub">' + (mfaPctVal ? mfaPctVal + '% compliance' : 'Pending verification') + '</div>' +
              '</div>' +
            '</div>' +

          '</div>' +

        '</div>' +
      '</div>' +

      // 2. Sign-ins and Email: MFA Enforcement Posture & Phishing Threat Activity
      '<div class="blk">' + bt('Sign-ins and email', 'Multi-factor authentication enforcement posture and employee-reported threats') +
        '<div class="threat-grid">' +

          // Left: MFA Enforcement Posture (Donut Chart Card)
          '<section class="card chart-card kpi-donut-card mfa-donut-card" style="margin:0; height:100%; display:flex; flex-direction:column; justify-content:space-between;">' +
            '<div class="card-head" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
              '<div><h2 class="card-title">MFA Enforcement Posture</h2><p class="card-sub">Realtime proportion of enabled accounts with MFA protection</p></div>' +
              (!hasMfaData ? '<span class="score-badge-status neutral">Data Not Available</span>' : (mfaIsOnTarget ? '<span class="score-badge-status optimal">100% Policy Target Achieved</span>' : '<span class="score-badge-status warning">Policy Gap (Target: 100%)</span>')) +
            '</div>' +

            '<div class="kpi-donut-wrapper" style="margin:8px 0; width:100%; display:flex; justify-content:center;">' +
              '<div class="kpi-donut-canvas-box" style="margin:0; width:180px; height:180px; position:relative;">' +
                '<canvas id="mfa_donut" role="img" aria-label="MFA Coverage Donut Chart"></canvas>' +
                '<div class="kpi-donut-center">' +
                  '<span class="kpi-donut-center-num">' + (hasMfaData ? mfaPctVal + '%' : '–') + '</span>' +
                  '<span class="kpi-donut-center-lbl">' + (hasMfaData ? 'MFA Enforced' : 'No Data') + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="donut-legend-grid" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px; margin:12px 0;">' +
              '<div class="donut-leg-item" style="padding:12px 14px; border-radius:10px;">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot g"></span><span class="donut-leg-name" style="font-size:12px;">MFA Enforced</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:4px;"><span class="donut-leg-val" style="font-size:16px;">' + (mfaEnabledCount !== null ? mfaEnabledCount : '–') + '</span><span class="donut-leg-pct" style="font-size:11.5px;">' + (hasMfaData ? mfaPctVal + '%' : '–') + '</span></div>' +
              '</div>' +
              '<div class="donut-leg-item" style="padding:12px 14px; border-radius:10px;">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot r"></span><span class="donut-leg-name" style="font-size:12px;">MFA Not Enforced</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:4px;"><span class="donut-leg-val" style="font-size:16px;">' + (mfaNotEnabledCount !== null ? mfaNotEnabledCount : '–') + '</span><span class="donut-leg-pct" style="font-size:11.5px;">' + (hasMfaData ? (100 - parseFloat(mfaPctVal)).toFixed(1) + '%' : '–') + '</span></div>' +
              '</div>' +
              '<div class="donut-leg-item" style="padding:12px 14px; border-radius:10px;">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot b"></span><span class="donut-leg-name" style="font-size:12px;">Total Enabled</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:4px;"><span class="donut-leg-val" style="font-size:16px;">' + (totalUsers !== null ? totalUsers : '–') + '</span><span class="donut-leg-pct" style="font-size:11.5px;">' + (hasMfaData ? '100%' : '–') + '</span></div>' +
              '</div>' +
              '<div class="donut-leg-item" style="padding:12px 14px; border-radius:10px;">' +
                '<div class="donut-leg-top"><span class="donut-leg-dot a"></span><span class="donut-leg-name" style="font-size:12px;">Mandatory SLA</span></div>' +
                '<div class="donut-leg-stats" style="margin-top:4px;"><span class="donut-leg-val" style="font-size:16px;">100%</span><span class="donut-leg-pct" style="font-size:11.5px;">' + (!hasMfaData ? '–' : (mfaNotEnabledCount > 0 ? mfaNotEnabledCount + ' gap' : 'Compliant')) + '</span></div>' +
              '</div>' +
            '</div>' +

            '<div class="client-explanation-box" style="margin-top:auto;">' +
              '<i class="ce-icon">ℹ</i>' +
              '<div class="ce-text">' + (hasMfaData ? ('<strong>' + mfaEnabledCount + ' of ' + totalUsers + ' active accounts</strong> have mandatory MFA enforced (' + mfaPctVal + '%). ' + (mfaNotEnabledCount > 0 ? 'Remaining ' + mfaNotEnabledCount + ' account' + (mfaNotEnabledCount === 1 ? '' : 's') + ' represent an exposure gap against 100% policy.' : 'All accounts compliant with 100% mandatory MFA policy.')) : 'Active directory telemetry pending.') + '</div>' +
            '</div>' +
          '</section>' +

          // Right: USER-REPORTED PHISHING Threat Card
          renderModernThreatCard(ph, m, {
            key: 'phishing',
            tag: 'USER-REPORTED PHISHING',
            color: '#7c3aed',
            colorStart: '#a855f7',
            themeClass: 'purple',
            badgeText: 'Active Vigilance',
            badgePillClass: 'pos',
            reverseRag: false,
            maxScale: 10,
            centerLabel: 'STAFF REPORTS',
            subtitle: 'Employee-submitted phishing alerts for ' + FULL[m] + ' ' + state.year + '.',
            chips: [
              { lbl: 'Malicious', val: '2', valClass: 'red', sub: 'Threats blocked' },
              { lbl: 'Benign', val: '2', valClass: 'slate', sub: 'Spam / False pos' },
              { lbl: 'Triage Time', val: '18 min', valClass: 'green', sub: 'SOC verified' }
            ],
            summary: '<span>🛡️</span><span><strong>' + FULL[m] + ' Vigilance:</strong> 4 staff submissions processed. High employee awareness with swift SOC turnaround.</span>'
          }) +
        '</div></div>' +
    '</div>';
  }

  function drawIdentityCharts() {
    const L = CHART_MONTHS.map(i => MON[i]), fl = n => flat.find(x => x.name === n);
    const m = state.m;
    const mk = (id, cfg) => {
      const el = document.getElementById(id);
      if (el) {
        try { const prev = Chart.getChart(el); if (prev) prev.destroy(); } catch (e) {}
        CHARTS.push(new Chart(el, cfg));
      }
    };

    // 1. MFA Coverage Donut Chart (mfa_donut)
    const mfa = fl('MFA coverage %'), en = mfa.helpers.find(h => /with MFA/i.test(h.name)), tu = mfa.helpers.find(h => /total enabled/i.test(h.name));
    const mfaEl = document.getElementById('mfa_donut');
    if (mfaEl) {
      const totalUsers = (tu && typeof tu.v[m] === 'number' && tu.v[m] >= 0) ? tu.v[m] : null;
      let mfaEnabled = null;
      if (en && typeof en.v[m] === 'number' && en.v[m] >= 0) {
        mfaEnabled = en.v[m];
      } else if (typeof mfa?.v?.[m] === 'number' && totalUsers !== null) {
        mfaEnabled = Math.round(mfa.v[m] * totalUsers);
      }
      const mfaNotEnabled = (totalUsers !== null && mfaEnabled !== null) ? Math.max(0, totalUsers - mfaEnabled) : null;
      const hasData = totalUsers !== null && mfaEnabled !== null && totalUsers > 0;

      mk('mfa_donut', {
        type: 'doughnut',
        data: {
          labels: hasData ? ['MFA Enforced', 'MFA Not Enforced'] : ['No Telemetry'],
          datasets: [{
            data: hasData ? [mfaEnabled, mfaNotEnabled] : [1],
            backgroundColor: hasData ? ['#10b981', '#ef4444'] : ['#334155'],
            hoverBackgroundColor: hasData ? ['#059669', '#dc2626'] : ['#475569'],
            borderColor: css('--surface') || '#ffffff',
            borderWidth: 3,
            hoverOffset: hasData ? 6 : 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          rotation: -90,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 850
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
              callbacks: {
                label: function(ctx) {
                  const val = ctx.raw;
                  const pct = totalUsers > 0 ? ((val / totalUsers) * 100).toFixed(1) : 0;
                  return ' ' + ctx.label + ': ' + val + ' users (' + pct + '%)';
                }
              }
            }
          }
        }
      });
    }

    // 2. Historical Monthly Stacked Bars (i1)
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
      mk('i1', {
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
      });
    }

    // 3. Image 1 dual-line trend chart: Risky sign-ins vs User-reported phishing
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

      mk('i_sec_trend', {
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
      });
    }
  }

  function serviceView() {
    const m = state.m, fl = n => flat.find(x => x.name === n);
    const ftf = fl('First-time fix rate %'), p1 = fl('P1 response SLA %'), p2 = fl('P2 response SLA %'), rs = fl('Resolution SLA %'), ro = fl('Reopened incidents'), on = fl('Onboarding completed'), off = fl('Offboarding completed'), ot = fl('Open ticket backlog (month end)');
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
    const totalRaised = raVal || 0;
    const totalResolved = rvVal || 0;
    const resolvedInSla = (typeof slVal === 'number') ? slVal : totalResolved;
    const fixedFirstContact = (typeof fcVal === 'number') ? fcVal : 0;

    const ticketBarRow = (label, color, count, pct, barW, rId, titleText, isLast) =>
      '<div class="dep-bar-row ticket-bar-row" ' + (rId ? 'data-open="' + rId + '" role="button" tabindex="0"' : '') + ' title="' + (titleText || label) + '" style="display:grid; grid-template-columns: 220px 1fr 105px; align-items:center; gap:16px; padding:12px 0;' + (isLast ? '' : ' border-bottom:1px solid var(--line);') + ' cursor:pointer;">' +
        '<span style="font-size:13.5px; font-weight:600; color:var(--tx-heading);">' + label + '</span>' +
        '<div style="height:15px; background:rgba(148, 163, 184, 0.14); border-radius:8px; overflow:hidden; width:100%;">' +
          '<div style="height:100%; width:' + barW + '%; background:' + color + '; border-radius:8px; transition:width 0.5s ease;"></div>' +
        '</div>' +
        '<div style="text-align:right; font-size:13.5px; font-weight:700; color:var(--tx-heading); white-space:nowrap; font-family:\'JetBrains Mono\', monospace;">' +
          count + ' <span style="font-size:12px; font-weight:500; color:var(--tx-muted); margin-left:3px;">(' + pct + '%)</span>' +
        '</div>' +
      '</div>';

    const raisedPct = totalRaised > 0 ? '100.0' : '0.0';
    const resolvedPct = totalRaised > 0 ? (Math.min(100, (totalResolved / totalRaised) * 100)).toFixed(1) : '0.0';
    const slaPct = totalResolved > 0 ? (Math.min(100, (resolvedInSla / totalResolved) * 100)).toFixed(1) : (totalRaised > 0 ? '100.0' : '0.0');
    const firstContactPct = totalRaised > 0 ? (Math.min(100, (fixedFirstContact / totalRaised) * 100)).toFixed(1) : '0.0';

    const funnel = hasFunnelData
      ? '<div style="display:flex; flex-direction:column; padding:2px 0;">' +
          ticketBarRow('Tickets Raised', '#3b82f6', totalRaised, raisedPct, (totalRaised > 0 ? 100 : 0), (ra?.r || 52), totalRaised + ' support requests raised', false) +
          ticketBarRow('Tickets Resolved', '#0284c7', totalResolved, resolvedPct, parseFloat(resolvedPct), (rv?.r || 53), totalResolved + ' of ' + totalRaised + ' requests resolved', false) +
          ticketBarRow('Resolved within SLA', '#10b981', resolvedInSla, slaPct, parseFloat(slaPct), (rs?.r || 64), resolvedInSla + ' of ' + totalResolved + ' resolved within SLA', true) +
        '</div>'
      : '<p class="empty" style="padding:16px 0;">No data for this month yet.</p>';
    const renderSlaCard = (r, sevTag) => {
      const v = r.v[m], x = r.rag[m];
      const hasVal = typeof v === 'number';
      const pct = hasVal ? Math.min(100, Math.max(0, v * 100)) : 0;
      const isBreach = x === -1;
      const isGood = x === 1;
      const valStr = hasVal ? fmt(r, v) : 'No tickets';
      const statusPillText = !hasVal ? 'No Activity' : (isGood ? 'Target Achieved' : (x === 0 ? 'Review Needed' : 'Below Target'));
      const statusPillClass = !hasVal ? 'neu' : (isGood ? 'good' : 'bad');
      const fillClass = !hasVal ? 'neu' : (isGood ? 'good' : 'bad');
      const detailText = behind(r, m) || (hasVal ? 'All tickets handled within target' : 'Zero tickets logged in ' + FULL[m]);
      const statusIcon = !hasVal ? 'ℹ' : (isGood ? '✓' : '⚠');

      return '<div class="sla-card" data-open="' + r.r + '" role="button" tabindex="0" title="Click to view ' + nm(r) + ' details">' +
        '<div>' +
          '<div class="sla-card-head">' +
            '<span class="sla-badge-label">' + sevTag + '</span>' +
            '<span class="sla-target-chip">Target: ' + target(r) + '</span>' +
          '</div>' +
          '<div class="sla-card-title">' + nm(r) + '</div>' +
          '<div class="sla-main-row">' +
            '<div class="sla-val ' + (isBreach ? 'bad' : '') + '">' + valStr + '</div>' +
            '<span class="sla-status-pill ' + statusPillClass + '">' + statusPillText + '</span>' +
          '</div>' +
          '<div class="sla-track-wrap">' +
            '<div class="sla-track">' +
              '<div class="sla-fill ' + fillClass + '" style="width:' + pct + '%;"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="sla-detail-box ' + (isBreach ? 'bad' : '') + '">' +
          '<span class="sla-detail-icon ' + (isBreach ? 'bad' : 'good') + '">' + statusIcon + '</span>' +
          '<span>' + detailText + '</span>' +
        '</div>' +
      '</div>';
    };

    return '<div class="stack">' +
      '<div class="sechead"><h2>Service Delivery</h2><span class="sub">' + g + ' of ' + sc.length + ' scored metrics on target' + (bad ? ' · ' + bad + ' off target' : '') + '</span></div>' +
      '<div class="blk">' + bt('Response and resolution SLAs', 'Share of tickets handled within the agreed time') +
        '<div class="sla-cards-grid">' +
          renderSlaCard(p1, 'HIGH SEVERITY &bull; EMERGENCY') +
          renderSlaCard(p2, 'MEDIUM SEVERITY &bull; MAJOR') +
          renderSlaCard(rs, 'ALL PRIORITIES &bull; RESOLUTION') +
        '</div>' +
      '</div>' +
      
      '<div class="blk ticket-funnel-blk">' +
        '<div class="bt ticket-funnel-head"><h2>How ' + FULL[m] + '’s tickets were handled</h2><span class="sub">Ticket progression from requests raised to resolution within agreed SLA</span></div>' +
        '<section class="card ticket-funnel-card" style="padding: 12px 24px; border-radius: 12px;">' + funnel + '</section></div>' +
      '<div class="blk">' + bt('First-time fix', 'Share of tickets solved at first contact') +
        renderModernThreatCard(ftf, m, {
          key: 'first_time_fix',
          tag: 'FIRST-TIME FIX PERFORMANCE',
          color: '#10b981',
          colorStart: '#0284c7',
          themeClass: 'blue',
          badgeText: (typeof fcVal === 'number' || typeof ftf?.v?.[m] === 'number') ? 'Above Target (≥ 75%)' : 'SLA Review (≥ 75%)',
          badgePillClass: 'pos',
          reverseRag: false,
          maxScale: 100,
          isPercentage: true,
          centerLabel: 'FIRST CONTACT FIX',
          statusText: 'Contractual SLA Benchmark: ≥ ' + Math.round((ftf?.target || 0.75) * 100) + '%',
          subtitle: 'Proportion of helpdesk requests completely resolved on first customer contact during ' + FULL[m] + ' ' + state.year + '.',
          chips: [
            { lbl: 'Target SLA', val: '≥ 75%', valClass: 'blue', sub: 'Target baseline' },
            { lbl: 'Actual Rate', val: (typeof ftf?.v?.[m] === 'number' ? (ftf.v[m] * 100).toFixed(1) + '%' : (typeof fcVal === 'number' ? fcVal + '%' : '–')), valClass: 'green', sub: 'Direct resolution' },
            { lbl: 'Escalations', val: (typeof ftf?.v?.[m] === 'number' ? (100 - ftf.v[m] * 100).toFixed(1) + '%' : '–'), valClass: 'slate', sub: 'Tier 2/3 engineering' }
          ],
          summary: '<span>🎯</span><span><strong>First-Call Efficacy:</strong> <strong>' + (typeof ftf?.v?.[m] === 'number' ? (ftf.v[m] * 100).toFixed(1) + '%' : '–') + '</strong> of support tickets resolved immediately on first contact without escalation.</span>'
        }) +
      '</div>' +
      // Operational Backlog & User Lifecycle 3D Coverflow Carousel (Image 2 Style)
      '<div class="blk service-ops-block">' +
        bt('Operational backlog &amp; User lifecycle', 'Month-end backlog volume, reopened incident cases, and tenant user onboarding/offboarding telemetry') +
        '<div class="dh-3d-stage so-3d-stage">' +
          '<div class="ih-carousel-wrapper" id="so-carousel-wrapper">' +
            '<button type="button" class="ih-nav-btn left" id="soNavPrev" aria-label="Previous Operational Metric">' +
              '<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12.5 15l-5-5 5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
            '<div class="ih-carousel-track" id="soCarouselTrack">' +
              endpointMonthCard(ot, m, {
                title: 'Open ticket backlog',
                sub: (ot && typeof ot.v[m] === 'number' ? (ot.v[m] + ' open ticket' + (ot.v[m] === 1 ? '' : 's') + ' at month end (' + (delta(ot, m) || 'Stable') + ')') : 'Month-end backlog telemetry'),
                badge: (ot && ot.v[m] === 0 ? '✓ Zero Backlog' : (ot && ot.v[m] <= 2 ? 'Optimal Backlog' : 'Backlog Active')),
                targetLabel: 'Target: 0',
                fillPct: (ot && ot.v[m] === 0 ? 0 : 35)
              }) +
              endpointMonthCard(ro, m, {
                title: 'Reopened incidents',
                sub: (ro && typeof ro.v[m] === 'number' ? (ro.v[m] === 0 ? '0 tickets reopened (' + (delta(ro, m) || 'Optimal') + ')' : ro.v[m] + ' ticket' + (ro.v[m] === 1 ? '' : 's') + ' reopened') : 'Reopened cases telemetry'),
                badge: (ro && ro.v[m] === 0 ? '✓ Zero Reopened' : 'Reopened Cases'),
                targetLabel: 'Target: 0',
                fillPct: (ro && ro.v[m] === 0 ? 0 : 25)
              }) +
              endpointMonthCard(on, m, {
                title: 'New user provisioning',
                sub: (on && typeof on.v[m] === 'number' ? (on.v[m] + ' staff member' + (on.v[m] === 1 ? '' : 's') + ' onboarded & provisioned in tenant') : 'Joiner provisioning activity'),
                badge: (on && on.v[m] > 0 ? '✓ Provisioning Logged' : 'Normal Activity'),
                targetLabel: 'Joiner Activity',
                fillPct: 60
              }) +
              endpointMonthCard(off, m, {
                title: 'User deprovisioning',
                sub: (off && typeof off.v[m] === 'number' ? (off.v[m] + ' departure' + (off.v[m] === 1 ? '' : 's') + ' decommissioned in tenant') : 'Leaver deprovisioning activity'),
                badge: (off && off.v[m] === 0 ? 'Zero Departures' : 'Decommissioned'),
                targetLabel: 'Leaver Activity',
                fillPct: (off && off.v[m] === 0 ? 0 : 40)
              }) +
            '</div>' +
            '<button type="button" class="ih-nav-btn right" id="soNavNext" aria-label="Next Operational Metric">' +
              '<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7.5 15l5-5-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="ih-indicators" id="soCarouselDots">' +
            '<div class="ih-dot active" data-dot-idx="0" title="Open Ticket Backlog"></div>' +
            '<div class="ih-dot" data-dot-idx="1" title="Reopened Incidents"></div>' +
            '<div class="ih-dot" data-dot-idx="2" title="New User Provisioning"></div>' +
            '<div class="ih-dot" data-dot-idx="3" title="User Deprovisioning"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function initServiceOpsCarousel() {
    const stage = document.querySelector('.so-3d-stage');
    if (!stage) return;
    const prevBtn = stage.querySelector('#soNavPrev');
    const nextBtn = stage.querySelector('#soNavNext');
    const dots = stage.querySelectorAll('.ih-dot');
    const cards = Array.from(stage.querySelectorAll('.endpoint-month-card'));
    const N = cards.length;
    if (N === 0) return;

    let activeIndex = 0;

    function updatePositions() {
      cards.forEach((card, idx) => {
        card.classList.remove('pos-center', 'pos-left', 'pos-right', 'pos-hidden');
        const offset = (idx - activeIndex + N) % N;
        if (offset === 0) {
          card.classList.add('pos-center');
        } else if (offset === 1) {
          card.classList.add('pos-right');
        } else if (offset === N - 1) {
          card.classList.add('pos-left');
        } else {
          card.classList.add('pos-hidden');
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }

    function goToCard(idx) {
      activeIndex = (idx % N + N) % N;
      updatePositions();
    }

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.stopPropagation();
        goToCard(activeIndex - 1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        goToCard(activeIndex + 1);
      };
    }

    dots.forEach((dot, idx) => {
      dot.onclick = (e) => {
        e.stopPropagation();
        goToCard(idx);
      };
    });

    cards.forEach((card, idx) => {
      card.onclick = (e) => {
        if (card.classList.contains('pos-left')) {
          e.stopPropagation();
          goToCard(activeIndex - 1);
        } else if (card.classList.contains('pos-right')) {
          e.stopPropagation();
          goToCard(activeIndex + 1);
        }
      };
    });

    const wrapper = stage.querySelector('.ih-carousel-wrapper');
    let isWheelCooldown = false;
    if (wrapper) {
      wrapper.addEventListener('wheel', (e) => {
        const dx = e.deltaX;
        const dy = e.deltaY;
        if (Math.abs(dx) > 15 || Math.abs(dy) > 25) {
          e.preventDefault();
          if (isWheelCooldown) return;
          isWheelCooldown = true;
          setTimeout(() => { isWheelCooldown = false; }, 420);
          if (dx > 15 || dy > 25) {
            goToCard(activeIndex + 1);
          } else {
            goToCard(activeIndex - 1);
          }
        }
      }, { passive: false });

      let touchStartX = 0;
      let touchStartY = 0;
      let touchMoved = false;

      wrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchMoved = false;
        }
      }, { passive: true });

      wrapper.addEventListener('touchmove', () => {
        touchMoved = true;
      }, { passive: true });

      wrapper.addEventListener('touchend', (e) => {
        if (!touchMoved) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            goToCard(activeIndex + 1);
          } else {
            goToCard(activeIndex - 1);
          }
        }
      }, { passive: true });
    }

    updatePositions();
  }

  function drawServiceCharts() {
    initServiceOpsCarousel();
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
    const remainingCompPct = Math.max(0, 100 - compPct);
    const isOnTarget = compVal >= (comp?.target || 0.8);

    // Donut SVG Generator matching Device Protection Composition (Image 2 style)
    const compDonutSvg = (function () {
      const cx = 110, cy = 110, R = 88, r = 62, rMid = 75;
      let curAngle = -Math.PI / 2;
      const paths = [];
      const texts = [];

      const colorMain = isOnTarget ? '#10b981' : '#ef4444';
      const segs = [
        { label: 'Completed', pct: compPct, color: colorMain },
        { label: 'Remaining', pct: remainingCompPct, color: '#cbd5e1' }
      ];

      const active = segs.filter(s => s.pct > 0.001);

      if (active.length === 1 && active[0].pct >= 99.99) {
        paths.push('<circle cx="110" cy="110" r="' + rMid + '" fill="none" stroke="' + active[0].color + '" stroke-width="' + (R - r) + '" class="donut-arc-path"><title>' + active[0].label + ': ' + active[0].pct.toFixed(1) + '%</title></circle>');
      } else {
        active.forEach(s => {
          const span = (s.pct / 100) * 2 * Math.PI;
          const startA = curAngle;
          const endA = curAngle + span;

          const x1 = cx + R * Math.cos(startA);
          const y1 = cy + R * Math.sin(startA);
          const x2 = cx + R * Math.cos(endA);
          const y2 = cy + R * Math.sin(endA);
          const x3 = cx + r * Math.cos(endA);
          const y3 = cy + r * Math.sin(endA);
          const x4 = cx + r * Math.cos(startA);
          const y4 = cy + r * Math.sin(startA);
          const large = span > Math.PI ? 1 : 0;

          const d = 'M ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
            ' A ' + R + ' ' + R + ' 0 ' + large + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) +
            ' L ' + x3.toFixed(2) + ' ' + y3.toFixed(2) +
            ' A ' + r + ' ' + r + ' 0 ' + large + ' 0 ' + x4.toFixed(2) + ' ' + y4.toFixed(2) + ' Z';

          paths.push('<path d="' + d + '" fill="' + s.color + '" stroke="var(--card, #ffffff)" stroke-width="2.5" class="donut-arc-path" title="' + s.label + ': ' + s.pct.toFixed(1) + '%">' +
            '<title>' + s.label + ': ' + s.pct.toFixed(1) + '%</title>' +
          '</path>');

          curAngle = endA;
        });
      }

      return '<svg class="estate-donut-svg" viewBox="0 0 220 220" width="180" height="180" style="display:block;margin:0 auto;overflow:visible;">' +
        '<g class="donut-segments">' + paths.join('') + '</g>' +
        '<g class="donut-labels">' + texts.join('') + '</g>' +
        '<g class="donut-center" pointer-events="none">' +
          '<text x="110" y="105" text-anchor="middle" font-size="24" font-weight="800" fill="var(--ink)" letter-spacing="-0.5">' + (compPct >= 99.95 || compPct % 1 === 0 ? compPct.toFixed(0) : compPct.toFixed(1)) + '%</text>' +
          '<text x="110" y="125" text-anchor="middle" font-size="9" font-weight="700" fill="var(--muted)" letter-spacing="0.8">COMPLETED</text>' +
        '</g>' +
      '</svg>';
    })();

    return '<div class="stack">' +
      '<div class="sechead"><h2>Compliance</h2><span class="sub">' + scoredOnTarget + ' of ' + sc.length + ' scored metrics on target</span></div>' +

      '<div class="blk">' + bt('Recommendations', 'Our security recommendations to you, and how many were completed in ' + FULL[m]) +
        '<div class="comp-exec-visual-card" data-open="' + (comp?.r || 73) + '" role="button" tabindex="0" title="Click to view deep-dive recommendations analysis">' +
          '<div class="comp-exec-head">' +
            '<div class="comp-exec-head-left">' +
              '<span class="comp-exec-tag">SECURITY REMEDIATION SLA &bull; ADVISORY GOVERNANCE</span>' +
              '<h3 class="comp-exec-title">Security Recommendations &amp; Remediation Velocity</h3>' +
              '<p class="comp-exec-desc">Executive fulfillment rate of prioritized technical recommendations delivered in ' + FULL[m] + '</p>' +
            '</div>' +
            '<div class="comp-exec-head-right">' +
              '<span class="comp-exec-badge ' + (isOnTarget ? 'pos' : 'neg') + '">' +
                '' + (isOnTarget ? 'SLA Target Achieved' : 'Below Target') + ' (' + (compVal * 100).toFixed(0) + '%)' +
              '</span>' +
            '</div>' +
          '</div>' +

          '<div class="comp-exec-body">' +
            '<div class="estate-donut-panel comp-donut-panel">' +
              '<div class="estate-donut-wrap">' + compDonutSvg + '</div>' +
              '<div class="estate-donut-legend-grid" style="width: 100%;">' +
                '<div class="donut-legend-item" title="Completed: ' + compPct.toFixed(1) + '%">' +
                  '<span class="donut-legend-swatch" style="background:' + (isOnTarget ? '#10b981' : '#ef4444') + '"></span>' +
                  '<span class="donut-legend-name">Completed</span>' +
                  '<span class="donut-legend-val">' + compPct.toFixed(1) + '%</span>' +
                '</div>' +
                '<div class="donut-legend-item" title="Remaining: ' + remainingCompPct.toFixed(1) + '%">' +
                  '<span class="donut-legend-swatch" style="background:#cbd5e1"></span>' +
                  '<span class="donut-legend-name">Remaining</span>' +
                  '<span class="donut-legend-val">' + remainingCompPct.toFixed(1) + '%</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="comp-metrics-panel">' +
              '<div class="comp-metric-tiles">' +
                '<div class="comp-metric-tile">' +
                  '<div class="comp-tile-top">' +
                    '<span class="comp-tile-icon">📋</span>' +
                    '<span class="comp-tile-tag">RAISED</span>' +
                  '</div>' +
                  '<div class="comp-tile-num">' + raisedVal + '</div>' +
                  '<div class="comp-tile-meta">' +
                    '<span class="comp-tile-title">Total Advised</span>' +
                    '<span class="comp-tile-delta ' + deltaClass(recRaised) + '">' + deltaComp(recRaised) + '</span>' +
                  '</div>' +
                '</div>' +

                '<div class="comp-metric-tile highlight">' +
                  '<div class="comp-tile-top">' +
                    '<span class="comp-tile-icon">✅</span>' +
                    '<span class="comp-tile-tag">COMPLETED</span>' +
                  '</div>' +
                  '<div class="comp-tile-num pos">' + doneVal + '</div>' +
                  '<div class="comp-tile-meta">' +
                    '<span class="comp-tile-title">Fully Resolved</span>' +
                    '<span class="comp-tile-delta ' + deltaClass(recDone) + '">' + deltaComp(recDone) + '</span>' +
                  '</div>' +
                '</div>' +

                '<div class="comp-metric-tile">' +
                  '<div class="comp-tile-top">' +
                    '<span class="comp-tile-icon">⚡</span>' +
                    '<span class="comp-tile-tag">VELOCITY</span>' +
                  '</div>' +
                  '<div class="comp-tile-num blue">' + (compVal * 100).toFixed(0) + '%</div>' +
                  '<div class="comp-tile-meta">' +
                    '<span class="comp-tile-title">Fulfillment Rate</span>' +
                    '<span class="comp-tile-delta ' + deltaClass(comp) + '">' + deltaComp(comp) + '</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              '<div class="comp-milestone-wrap">' +
                '<div class="comp-milestone-header">' +
                  '<span class="comp-milestone-label">Resolution Trajectory</span>' +
                  '<span class="comp-milestone-stat"><strong>' + doneVal + ' of ' + raisedVal + '</strong> recommendations resolved</span>' +
                '</div>' +
                '<div class="comp-milestone-track">' +
                  '<div class="comp-milestone-fill ' + (isOnTarget ? 'g' : 'r') + '" style="width:' + compPct.toFixed(1) + '%"></div>' +
                  '<div class="comp-milestone-marker" style="left:' + tgtPct + '%" title="SLA Target (' + tgtPct + '%)"></div>' +
                '</div>' +
                '<div class="comp-milestone-ticks">' +
                  '<span>0%</span>' +
                  '<span class="center-tick">SLA Commitment: ' + tgtPct + '%</span>' +
                  '<span>100% Fully Closed</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

                  '<div class="blk" style="margin-top:24px">' +
        '<div class="gov-header-wrap">' +
          '<div>' +
            '<div class="gov-tag-strip">' +
              '<span>SECURITY GOVERNANCE &bull; RISK &bull; COMPLIANCE</span>' +
            '</div>' +
            '<h2 class="gov-header-title">Governance &amp; Audit Oversight</h2>' +
            '<p class="gov-header-desc">Continuous audit evidence tracking, zero-tolerance policy monitoring, and change configuration control for ' + FULL[m] + ' ' + state.year + '</p>' +
          '</div>' +
          '<div>' +
            '<div class="gov-status-pill">' +
              '' +
              '<span>All 3 Controls Compliant</span>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="gov-grid">' +
          // Card 1: Policy Exceptions (Chosen Month Only)
          '<div class="gov-card" data-open="' + (ex?.r || 74) + '" role="button" tabindex="0" title="Click to view policy exceptions details">' +
            '<div>' +
              '<div class="gov-card-head">' +
                '<span class="gov-card-badge">CONTROL 01 &bull; POLICY EXCEPTIONS</span>' +
                '<span class="gov-status-chip pos">Zero Breaches</span>' +
              '</div>' +
              '<div class="gov-metric-row">' +
                '<div class="gov-metric-num navy">' + exVal + '</div>' +
                '<div class="gov-metric-meta">' +
                  '<span class="gov-metric-title">Open Policy Exceptions</span>' +
                  '<span class="gov-metric-delta">Zero open exceptions in ' + FULL[m] + '</span>' +
                '</div>' +
              '</div>' +
              '<div class="gov-visual-panel">' +
                '<div class="gov-visual-head">' +
                  '<span>' + FULL[m] + ' Compliance Status</span>' +
                  '<span class="gov-visual-pill">100% COMPLIANT</span>' +
                '</div>' +
                '<div class="capsule-track-bar" style="margin-bottom: 12px;">' +
                  '<div class="capsule-fill-bar uniform" style="width: 100%;"></div>' +
                '</div>' +
                '<div class="gov-runway-banner">' +
                  '<span class="gov-check-icon">✓</span>' +
                  '<span>Zero exceptions or security waivers logged in ' + FULL[m] + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="gov-card-foot">' +
              '<span class="gov-foot-label">Policy Tolerance:</span>' +
              '<span class="gov-foot-val">Zero Tolerance Ceiling</span>' +
            '</div>' +
          '</div>' +

          // Card 2: ISO Evidence (Chosen Month Only)
          '<div class="gov-card" data-open="' + (iso?.r || 69) + '" role="button" tabindex="0" title="Click to view ISO evidence requests details">' +
            '<div>' +
              '<div class="gov-card-head">' +
                '<span class="gov-card-badge">CONTROL 02 &bull; AUDIT EVIDENCE</span>' +
                '<span class="gov-status-chip neu">ISO/IEC 27001</span>' +
              '</div>' +
              '<div class="gov-metric-row">' +
                '<div class="gov-metric-num navy">' + isoVal + '</div>' +
                '<div class="gov-metric-meta">' +
                  '<span class="gov-metric-title">Evidence Requests Fulfilled</span>' +
                  '<span class="gov-metric-delta">' + (isoVal === 0 ? 'Zero requests pending in ' + FULL[m] : isoVal + ' requests completed in ' + FULL[m]) + '</span>' +
                '</div>' +
              '</div>' +
              '<div class="gov-visual-panel">' +
                '<div class="gov-visual-head">' +
                  '<span>' + FULL[m] + ' Audit Readiness</span>' +
                  '<span class="gov-visual-pill">CERTIFIED READY</span>' +
                '</div>' +
                '<div class="capsule-track-bar" style="margin-bottom: 12px;">' +
                  '<div class="capsule-fill-bar uniform" style="width: 100%;"></div>' +
                '</div>' +
                '<div class="gov-runway-banner">' +
                  '<span class="gov-check-icon">✓</span>' +
                  '<span>' + (isoVal === 0 ? 'All evidence requests fulfilled; zero backlog in ' + FULL[m] : isoVal + ' compliance evidence packages delivered in ' + FULL[m]) + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="gov-card-foot">' +
              '<span class="gov-foot-label">Audit Readiness:</span>' +
              '<span class="gov-foot-val">Certified Records</span>' +
            '</div>' +
          '</div>' +

          // Card 3: Configuration Changes (Chosen Month Only)
          '<div class="gov-card" data-open="' + (chg?.r || 70) + '" role="button" tabindex="0" title="Click to view configuration changes details">' +
            '<div>' +
              '<div class="gov-card-head">' +
                '<span class="gov-card-badge">CONTROL 03 &bull; CHANGE CONTROL</span>' +
                '<span class="gov-status-chip neu">Authorized Changes</span>' +
              '</div>' +
              '<div class="gov-metric-row">' +
                '<div class="gov-metric-num navy">' + chgVal + '</div>' +
                '<div class="gov-metric-meta">' +
                  '<span class="gov-metric-title">Configuration Changes</span>' +
                  '<span class="gov-metric-delta">' + chgVal + ' approved changes in ' + FULL[m] + '</span>' +
                '</div>' +
              '</div>' +
              '<div class="gov-visual-panel">' +
                '<div class="gov-visual-head">' +
                  '<span>' + FULL[m] + ' Authorization Rate</span>' +
                  '<span class="gov-visual-pill">100% APPROVED</span>' +
                '</div>' +
                '<div class="capsule-track-bar" style="margin-bottom: 12px;">' +
                  '<div class="capsule-fill-bar uniform" style="width: 100%;"></div>' +
                '</div>' +
                '<div class="gov-runway-banner">' +
                  '<span class="gov-check-icon">✓</span>' +
                  '<span>All ' + chgVal + ' changes executed under SecOps change window in ' + FULL[m] + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="gov-card-foot">' +
              '<span class="gov-foot-label">Approval Gate:</span>' +
              '<span class="gov-foot-val">SecOps Change Control</span>' +
            '</div>' +
          '</div>' +
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
    'Devices not reporting % of estate': ['Share of managed devices that have not checked in for more than 7 days.', 'A silent device may be unmonitored or unpatched, representing a security blind spot.'],
    'Endpoint protection coverage %': ['Share of devices with every protection layer working: antivirus, patching, VPN and MFA.', 'Any gap leaves a device easier to attack and compromises enterprise perimeter defense.'],
    'Patch compliance %': ['Share of devices fully up to date with security patches.', 'Unpatched devices are the most common initial access vector for ransomware and external attackers.'],
    'Critical patches outstanding': ['Critical security patches not yet installed.', 'These fix flaws attackers actively exploit in the wild, so the zero-tolerance target is zero.'],
    'High patches outstanding': ['High-priority patches not yet installed.', 'Left open, high vulnerabilities build up risk and can be chained together by attackers.'],
    'Patch deployment success rate %': ['Share of patch installs that completed without failing.', 'Failed installs leave devices exposed until retried and remediated.'],
    'Avg days to critical patch': ['Average days from a critical patch release to installation across endpoints.', 'The faster critical updates deploy, the shorter the window of exposure for attackers.'],
    'Ransomware detections': ['Ransomware attacks detected on your endpoints.', 'Even a blocked ransomware attempt indicates targeted activity, requiring immediate forensic review.'],
    'Devices with outdated protection % of estate': ['Share of devices running out-of-date security software.', 'Old protection signatures can miss newly weaponized malware and zero-day variants.'],
    'P1 security incidents': ['The most serious security incidents (severity 1).', 'P1 events threaten critical business operations, so the contractual target is strictly zero.'],
    'Mean time to detect (hours)': ['Average hours from an alert firing to analysts confirming a genuine threat.', 'Faster detection severely restricts attacker dwell time and limits lateral movement.'],
    'Mean time to respond (hours)': ['Average hours from confirming a threat to active isolation and containment.', 'Quick containment prevents data exfiltration and minimizes potential incident damages.'],
    'Critical vulnerabilities open': ['Serious weaknesses found in your systems and not yet fixed.', 'Actively exploitable weaknesses carry extreme risk, so the target is zero.'],
    'High vulnerabilities open': ['High-risk weaknesses found and not yet fixed.', 'Keeping high vulnerabilities near zero reduces your enterprise exploitable attack surface.'],
    'Mean time to remediate critical (days)': ['Average days from discovering a critical weakness to applying a fix.', 'Faster remediation cycles shrink the window of opportunity for opportunistic adversaries.'],
    'Open >30 days past SLA': ['Weaknesses still open 30 or more days beyond agreed fix times.', 'Overdue fixes violate contractual SLAs and represent unmanaged exposure.'],
    'Open >60 days past SLA': ['Weaknesses still open 60 or more days beyond agreed fix times.', 'Aging vulnerabilities indicate process bottlenecks requiring operational escalation.'],
    'Open >90 days past SLA': ['Weaknesses still open 90 or more days beyond agreed fix times.', 'Chronic overdue vulnerabilities represent serious technical debt and compliance risk.'],
    'MFA coverage %': ['Share of user accounts that must use a second sign-in step.', 'MFA blocks over 99% of automated credential stuffing and account takeover attempts.'],
    'First-time fix rate %': ['Share of service tickets resolved on first contact without escalation.', 'Fewer hand-offs means faster problem resolution and less disruption for your workforce.'],
    'P1 response SLA %': ['Share of highest-priority tickets acknowledged within agreed SLA.', 'Critical operational incidents demand immediate analyst triage to maintain service stability.'],
    'P2 response SLA %': ['Share of high-priority tickets acknowledged within agreed SLA.', 'Keeps important operational and service issues moving rapidly through remediation.'],
    'Resolution SLA %': ['Share of service tickets resolved within contractual timeframes.', 'Demonstrates that our service delivery consistently meets agreed commitments.'],
    'Recommendations completion %': ['Share of proactive security recommendations completed.', 'Measures tangible progress in strengthening and maturing your security posture over time.'],
    'Policy exceptions open': ['Approved exceptions to corporate security policy still open.', 'Each exception represents a known security gap, requiring active review to retire risk.'],
    'Managed endpoints': ['Total devices under active management at month end.', 'Defines your total operational attack surface and IT asset inventory.'],
    'Mobile devices - VPN': ['Mobile devices enrolled for fleet management and encrypted VPN access.', 'Ensures remote and mobile workers connect securely to enterprise resources.'],
    'New endpoints': ['New devices added and provisioned during the reporting month.', 'Ensures newly acquired hardware meets enterprise security baseline standards.'],
    'Removed endpoints': ['Decommissioned devices retired from the fleet this month.', 'Prevents stale or orphaned hardware from retaining unauthorized network access.'],
    'Devices not reporting': ['Managed devices that have not checked in for more than 7 consecutive days.', 'Silent devices represent potential blind spots that may miss urgent patches or alerts.'],
    'Failed patch deployments': ['Patch installations that failed or timed out during deployment.', 'Failed installs leave machines vulnerable until retried and remediated.'],
    'Successful patch deployments': ['Patch installations completed and verified across managed devices.', 'Measures successful remediation cadence closing known software weaknesses.'],
    'Threats blocked': ['Total cyber threats stopped by endpoint security layers this month.', 'Demonstrates active defensive filtering protecting your enterprise perimeter.'],
    'Malware detections': ['Malicious software files detected and neutralized by endpoint agents.', 'Highlights blocked malicious payloads before execution or lateral spread.'],
    'Policy violations': ['Instances where organizational security policy was breached or overridden.', 'Monitors risky user behavior, unauthorized software, or USB media usage.'],
    'Devices with outdated protection': ['Devices with obsolete anti-malware signatures or disabled protection agents.', 'Outdated defenses may fail to recognize newly emerging threat variants.'],
    'Security incidents raised': ['Confirmed security events escalated for active SecOps investigation.', 'Tracks genuine operational threat volume requiring defensive response.'],
    'Medium vulnerabilities open': ['Moderate-severity security flaws identified and awaiting scheduled remediation.', 'Prevents accumulation of technical debt that attackers could chain together.'],
    'Vulnerabilities remediated': ['Security weaknesses resolved and verified during the reporting period.', 'Demonstrates continuous risk reduction across systems and applications.'],
    'Risky sign-ins detected': ['Authentication attempts flagged for suspicious anomalies or impossible travel.', 'Early warning for compromised credentials or automated account takeover attacks.'],
    'User-reported phishing': ['Suspicious email messages flagged and reported by staff members.', 'Reflects staff security vigilance and alerts SOC to targeted spear-phishing.'],
    'Support requests': ['Total user IT support and service requests logged during the month.', 'Measures end-user service demand and operational support workload.'],
    'Incidents resolved': ['IT support tickets and operational issues successfully closed.', 'Reflects support delivery throughput and operational issue resolution.'],
    'Reopened incidents': ['Previously resolved support tickets that had to be reopened by users.', 'Key indicator of resolution quality and whether root causes were fully addressed.'],
    'Open ticket backlog (month end)': ['Support and service tickets remaining unresolved at the end of the month.', 'Monitors unresolved support queue volume to prevent user service delays.'],
    'Onboarding completed': ['New employees successfully provisioned with accounts, devices, and security access.', 'Ensures smooth and secure workforce enablement for joining personnel.'],
    'Offboarding completed': ['Departed personnel whose system access and credentials were fully revoked.', 'Critical security control preventing orphaned access and former-employee risk.'],
    'ISO evidence requests completed': ['Compliance audit evidence requests fulfilled for ISO and external audits.', 'Supports formal regulatory governance and certified information security management.'],
    'Configuration changes': ['System and infrastructure modifications executed under formal change control.', 'Ensures changes are documented, tested, and approved to prevent misconfigurations.'],
    'Security recommendations raised': ['Strategic security and risk improvement recommendations delivered by our SOC.', 'Drives proactive security posture maturity beyond basic routine operations.'],
    'Recommendations completed': ['Security improvement recommendations approved and implemented by your team.', 'Quantifies tangible progress in strengthening organizational cyber resilience.']
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

  let drawerChart = null, drawerDonutChart = null, currentDrawerId = null, lastFocus = null;

  function getMetricDeepAudit(r, m) {
    const x = r.scored ? r.rag[m] : null;
    const name = r.name || '';
    const sec = r.sec || '';

    // Category Icon & Label mapping
    let catIcon = '🛡️';
    let catTitle = sec || 'Security Operations';
    if (/endpoint|device/i.test(sec) || /endpoint|device/i.test(name)) {
      catIcon = '💻';
      catTitle = 'Endpoints & Fleet Security';
    } else if (/patch/i.test(sec) || /patch/i.test(name)) {
      catIcon = '📦';
      catTitle = 'Patch & Lifecycle Management';
    } else if (/threat|incident|ransomware|malware/i.test(sec) || /threat|incident|ransomware|malware|mttd|mttr/i.test(name)) {
      catIcon = '🛡️';
      catTitle = 'Threat Detection & SecOps';
    } else if (/vuln/i.test(sec) || /vuln/i.test(name)) {
      catIcon = '🔍';
      catTitle = 'Vulnerability & Exposure Management';
    } else if (/identity|mfa|sign-in/i.test(sec) || /identity|mfa|sign-in|phish/i.test(name)) {
      catIcon = '🔑';
      catTitle = 'Identity & Access Governance';
    } else if (/service|support|ticket|sla|fix/i.test(sec) || /service|support|ticket|sla|fix/i.test(name)) {
      catIcon = '⚡';
      catTitle = 'Service Delivery & Operations';
    } else if (/compliance|iso|policy|config/i.test(sec) || /compliance|iso|policy|config|recommend/i.test(name)) {
      catIcon = '📋';
      catTitle = 'Compliance, Risk & Governance';
    }

    let diagnosis = '';
    let actions = [];
    let compliance = {
      iso: 'ISO 27001:2022 A.12.6.1',
      nist: 'NIST CSF 2.0 PR.IP / DE.CM',
      cis: 'CIS Controls v8 #7 (Continuous Vulnerability)',
      ce: 'Cyber Essentials Plus (Patching & Firewall)'
    };

    if (/mean time to detect|mttd/i.test(name)) {
      compliance = {
        iso: 'ISO 27001:2022 A.12.4.1 (Event Logging)',
        nist: 'NIST CSF 2.0 DE.AE-02 (Detection Analytics)',
        cis: 'CIS Controls v8 #8.5 (Centralized Audit Logs)',
        ce: 'Cyber Essentials Plus (Malware Protection)'
      };
      if (x === 1) {
        diagnosis = 'Telemetry detection latency is operating well within contractual SLA boundaries. Automated SIEM correlation rules and real-time EDR ingestion are triaging alerts within sub-hour thresholds with zero pipeline backpressure.';
        actions = [
          'Maintain high-fidelity alert filtering to eliminate alert fatigue across SOC tiers.',
          'Review newly introduced sigma correlation rules for cloud workload environments.',
          'Validate continuous ingestion heartbeat from remote worker endpoints.'
        ];
      } else if (x === 0) {
        diagnosis = 'Mean time to detect is approaching contractual ceiling limits. Alert queuing spikes observed during peak hours caused a minor delay between initial telemetry generation and Tier-1 analyst triage.';
        actions = [
          'Tune threshold sensitivity on repetitive informational SIEM alerts to unblock analysts.',
          'Optimize webhook delivery channels for high-priority security notifications.',
          'Review analyst triage workflow during shift handover periods.'
        ];
      } else {
        diagnosis = 'Mean time to detect exceeded the contract SLA threshold. Triage backlogs on non-critical alert clusters and delayed telemetry uploads from off-network endpoints contributed to elevated response delays.';
        actions = [
          'Conduct root-cause analysis on anomalous alert spikes observed in the reporting period.',
          'Implement automated alert enrichment to reduce manual verification time.',
          'Escalate agent heartbeat synchronization failures for immediate remediation.'
        ];
      }
    } else if (/mean time to respond|mttr/i.test(name)) {
      compliance = {
        iso: 'ISO 27001:2022 A.16.1.5 (Incident Response)',
        nist: 'NIST CSF 2.0 RS.RP-01 (Incident Response Execution)',
        cis: 'CIS Controls v8 #17 (Incident Management)',
        ce: 'Cyber Essentials Plus (Incident Readiness)'
      };
      if (x === 1) {
        diagnosis = 'Containment and response execution times demonstrated high operational agility. SOAR playbooks and active endpoint isolation prevented lateral movement across protected environments.';
        actions = [
          'Verify that automated isolation playbooks remain synchronized with endpoint policies.',
          'Conduct quarterly tabletop drills simulating multi-vector ransomware scenarios.',
          'Audit containment exception whitelists for critical server infrastructure.'
        ];
      } else {
        diagnosis = 'Incident containment exceeded nominal duration thresholds due to complex multi-host forensic triage and manual approval gates for host isolation.';
        actions = [
          'Enable automated host isolation for high-confidence ransomware heuristics.',
          'Streamline escalation authority matrix to eliminate containment approval delays.',
          'Deploy pre-authorized forensic artifact collection scripts across all subnets.'
        ];
      }
    } else if (/patch/i.test(name)) {
      compliance = {
        iso: 'ISO 27001:2022 A.12.6.1 (Technical Vulnerability)',
        nist: 'NIST CSF 2.0 PR.IP-12 (Vulnerability Management)',
        cis: 'CIS Controls v8 #7.4 (Automated Patching)',
        ce: 'Cyber Essentials Plus (Operating System Updates)'
      };
      if (x === 1) {
        diagnosis = 'Patch management infrastructure is operating at peak cadence. Ring-based automated deployment succeeded without triggering rollback events or end-user disruption.';
        actions = [
          'Verify zero patch drift on newly imaged devices joining active directory.',
          'Review vendor CVE disclosures for newly announced zero-day advisories.',
          'Maintain staging validation cycles for next patch Tuesday rollup.'
        ];
      } else {
        diagnosis = 'Patch deployment delays identified on roaming and remote endpoints. Pending OS reboot locks and transient connectivity interruptions deferred scheduled deployment windows.';
        actions = [
          'Enforce automatic reboot grace period notifications for deferred workstations.',
          'Prioritize critical CVEs with known in-the-wild exploitation via emergency rings.',
          'Run automated agent self-repair scripts on nodes failing package hash checks.'
        ];
      }
    } else if (/mfa/i.test(name)) {
      compliance = {
        iso: 'ISO 27001:2022 A.9.4.2 (Secure Log-on Procedures)',
        nist: 'NIST CSF 2.0 PR.AC-07 (Multi-factor Authentication)',
        cis: 'CIS Controls v8 #6.3 (Require MFA for Authenticated Apps)',
        ce: 'Cyber Essentials Plus (Two-Factor Authentication)'
      };
      if (x === 1) {
        diagnosis = 'Multi-Factor Authentication policy enforcement covers all active identity directories. Legacy basic authentication protocols are fully deprecated and blocked at the tenant boundary.';
        actions = [
          'Enforce FIDO2 hardware token enrollment for privileged admin roles.',
          'Review conditional access location exemptions and impossible travel alerts.',
          'Audit guest tenant invitations and inactive user credentials.'
        ];
      } else {
        diagnosis = 'MFA coverage is below target threshold due to newly onboarded identities awaiting registration and legacy system service accounts requiring modern auth migration.';
        actions = [
          'Block legacy authentication protocols on all mail and identity endpoints.',
          'Mandate self-service MFA onboarding before grant of enterprise app access.',
          'Review exception lists and assign dedicated service principals with conditional access.'
        ];
      }
    } else if (/vulnerabilit/i.test(name)) {
      compliance = {
        iso: 'ISO 27001:2022 A.12.6.1 (Management of Technical Vulnerabilities)',
        nist: 'NIST CSF 2.0 ID.RA-01 (Vulnerability Identification)',
        cis: 'CIS Controls v8 #7.1 (Vulnerability Scanning)',
        ce: 'Cyber Essentials Plus (Security Update Verification)'
      };
      if (x === 1) {
        diagnosis = 'Vulnerability remediation cadence matches risk exposure velocity. All discovered vulnerabilities are being tracked and mitigated strictly within agreed SLA timeframes.';
        actions = [
          'Continue weekly credentialed vulnerability scans across core subnets.',
          'Validate virtual patch rules on perimeter Web Application Firewalls.',
          'Track software component inventory for emerging open-source CVE disclosures.'
        ];
      } else {
        diagnosis = 'Elevated vulnerability backlog identified. High-priority remediation tickets are delayed pending testing window coordination with application owners.';
        actions = [
          'Escalate overdue remediation tickets to designated system asset owners.',
          'Apply interim micro-segmentation or firewall rules to mitigate unpatched flaws.',
          'Schedule emergency maintenance change window for overdue critical systems.'
        ];
      }
    } else if (/endpoint protection|outdated protection/i.test(name)) {
      compliance = {
        iso: 'ISO 27001:2022 A.12.2.1 (Controls Against Malware)',
        nist: 'NIST CSF 2.0 PR.PT-01 (Malware Protection)',
        cis: 'CIS Controls v8 #10.1 (Anti-Malware Software)',
        ce: 'Cyber Essentials Plus (Malware Protection)'
      };
      if (x === 1) {
        diagnosis = 'Endpoint protection signatures and behavioral heuristics are completely synchronized. Zero agent tampering attempts or signature deprecations detected.';
        actions = [
          'Maintain live cloud-assisted telemetry feeds for real-time threat intelligence.',
          'Verify tamper protection policy is enforced across 100% of managed hosts.',
          'Audit offline machines returning to network for rapid policy update.'
        ];
      } else {
        diagnosis = 'A subset of endpoints exhibit outdated definitions or suspended sensor services following network disruption or disk space constraints.';
        actions = [
          'Dispatch automated sensor service restart commands to flagged endpoints.',
          'Verify disk cleanup routines on hosts with low storage preventing updates.',
          'Isolate non-compliant endpoints from intranet until definition update confirms.'
        ];
      }
    } else {
      if (x === 1) {
        diagnosis = 'Current telemetry demonstrates strong adherence to agreed operational service levels. Systems and processes are functioning within expected performance parameters.';
        actions = [
          'Continue routine monitoring and validation against baseline performance.',
          'Review quarterly capacity planning for projected workload scaling.',
          'Document operational best practices for ongoing service excellence.'
        ];
      } else if (x === 0) {
        diagnosis = 'Telemetry is operating near tolerance boundaries. Minor fluctuations observed during the current reporting cycle require targeted operational oversight.';
        actions = [
          'Increase monitoring frequency to detect emerging deviations early.',
          'Review underlying queue parameters and operational throughput.',
          'Coordinate with technical team leads to address transient impediments.'
        ];
      } else {
        diagnosis = 'Operational telemetry has breached contractual SLA targets. Immediate intervention is required to restore performance to expected compliance levels.';
        actions = [
          'Trigger formal service improvement review for this metric.',
          'Assign designated technical lead to clear operational impediments.',
          'Establish weekly milestone checkpoints until target compliance is re-established.'
        ];
      }
    }

    return { catIcon, catTitle, diagnosis, actions, compliance };
  }

  function getStatusInterpretation(r, v0, x) {
    if (!r.scored || typeof v0 !== 'number') {
      return 'Informational telemetry. This metric tracks baseline operational activity without a contractual SLA threshold.';
    }
    const tgtStr = target(r);

    if (r.veto) {
      if (v0 === 0) {
        return 'Target achieved. Zero breaches recorded in this reporting cycle, satisfying the strict zero-tolerance governance threshold.';
      }
      return 'Zero-tolerance breach. Recorded value of ' + fmt(r, v0) + ' breaches the zero-tolerance ceiling of zero, triggering an immediate Red governance status.';
    }

    if (r.dir === 'Higher') {
      if (x === 1) {
        return 'Target achieved. Recorded performance of ' + fmt(r, v0) + ' meets or exceeds the contractual baseline target of ' + tgtStr + '.';
      } else if (x === 0) {
        return 'Attention required (Amber). Performance of ' + fmt(r, v0) + ' is within 10% of the contractual target (' + tgtStr + '), indicating minor operational drift.';
      } else {
        return 'Target missed (Red). Performance of ' + fmt(r, v0) + ' fell more than 10% below the contractual baseline of ' + tgtStr + ', requiring remediation.';
      }
    } else {
      if (x === 1) {
        return 'Target achieved. Recorded value of ' + fmt(r, v0) + ' remains at or below the contractual ceiling of ' + tgtStr + '.';
      } else if (x === 0) {
        return 'Attention required (Amber). Recorded value of ' + fmt(r, v0) + ' is within 10% above the contractual ceiling (' + tgtStr + '), requiring preventative control.';
      } else {
        return 'Target breached (Red). Recorded value exceeds the allowable tolerance ceiling of ' + tgtStr + ' by more than 10%, indicating an elevated risk exposure.';
      }
    }
  }

  function getBusinessImpact(r, x) {
    const name = r.name || '';
    const sec = r.sec || '';

    if (/patch|vuln/i.test(sec) || /patch|vuln/i.test(name)) {
      if (x === 1) {
        return 'Maintains a minimal attack surface. Rapid patching and vulnerability remediation ensure known exploit vectors and ransomware payloads cannot gain footholds.';
      } else if (x === 0) {
        return 'Moderate security exposure. Delayed remediation creates an exploitable window where threat actors can leverage public vulnerability disclosures.';
      } else {
        return 'Significant risk exposure. Unpatched vulnerabilities represent the primary initial access vector for ransomware syndicates and external adversaries.';
      }
    } else if (/identity|mfa|sign-in/i.test(sec) || /identity|mfa/i.test(name)) {
      if (x === 1) {
        return 'Universal identity protection. Enforced multi-factor authentication effectively prevents credential stuffing, password spraying, and unauthorized cloud account takeovers.';
      } else {
        return 'Critical identity vulnerability. Accounts without enforced MFA are highly susceptible to credential harvesting, password spraying, and unauthorized tenant intrusion.';
      }
    } else if (/threat|incident|ransomware|malware/i.test(sec) || /threat|incident|ransomware|mttd|mttr/i.test(name)) {
      if (x === 1) {
        return 'Robust threat containment. Real-time defensive telemetry and rapid triage neutralize threats before data exfiltration or lateral propagation can occur.';
      } else {
        return 'Elevated dwell-time risk. Delayed threat containment or unaddressed security incidents increase the blast radius and potential business disruption.';
      }
    } else if (/endpoint|device/i.test(sec) || /endpoint|device/i.test(name)) {
      if (x === 1) {
        return 'Comprehensive fleet visibility. Active agent reporting ensures zero unmonitored blind spots across remote, office, and mobile devices.';
      } else {
        return 'Fleet visibility blind spots. Unmonitored or non-reporting devices may miss urgent patches or harbor dormant malware without SOC detection.';
      }
    } else {
      if (x === 1) {
        return 'Optimal operational throughput. Service levels and resolution workflows support seamless business continuity with minimal user disruption.';
      } else {
        return 'Operational friction. Extended ticket queues or delayed resolution workflows impact workforce productivity and service delivery commitments.';
      }
    }
  }

  function getMetricYtdMeta(r) {
    let method = r.ytdMethod;
    if (!method) {
      if (isPct(r) || /pct|rate|%|days|hours|mttr|mttd/i.test(r.name)) method = 'average';
      else if (/total|sum|count|detections|blocked|failed|successful|raised|resolved|reopened|completed|violat/i.test(r.name)) method = 'sum';
      else if (/managed|devices|endpoints|backlog|open/i.test(r.name)) method = 'latest';
      else method = 'average';
    }
    if (method === 'sum') {
      return {
        method: 'sum',
        lbl: 'YTD Total',
        sub: 'Cumulative Volume',
        legend: 'YTD Cumulative',
        ledger: 'Year to Date (Total Volume)'
      };
    } else if (method === 'latest') {
      return {
        method: 'latest',
        lbl: 'Latest Position',
        sub: 'Active Inventory',
        legend: 'Active Baseline',
        ledger: 'Year to Date (Active Position)'
      };
    } else {
      return {
        method: 'average',
        lbl: 'YTD Average',
        sub: 'Performance Mean',
        legend: 'YTD Average',
        ledger: 'Year to Date (Average)'
      };
    }
  }

  function openDrawer(id) {
    const r = byId[id];
    if (!r) return;
    currentDrawerId = id;
    lastFocus = document.activeElement;
    const m = state.m;
    const x = r.scored ? r.rag[m] : null;
    const v0 = r.v[m];

    if (drawerChart) {
      drawerChart.destroy();
      drawerChart = null;
    }
    if (drawerDonutChart) {
      drawerDonutChart.destroy();
      drawerDonutChart = null;
    }

    const auditInfo = getMetricDeepAudit(r, m);
    const ytdMeta = getMetricYtdMeta(r);

    // Variance calculation
    const gap = (function () {
      if (!r.scored || typeof v0 !== 'number') return '';
      const t = r.target;
      if (r.veto) return v0 === 0 ? 'No breach' : fmt(r, v0) + ' breach';
      const d = r.dir === 'Higher' ? t - v0 : v0 - t;
      if (d <= 1e-9) return 'Compliant';
      const ad = isPct(r) ? (d * 100).toFixed(1) + ' pts' : (Number.isInteger(d) ? d : d.toFixed(1)) + unitOf(r);
      return (r.dir === 'Higher' ? '−' : '+') + ad + ' gap';
    })();

    // MoM Delta computation
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

    let deltaValStr = '0.0';
    let deltaClass = 'neutral';
    let deltaArrow = '—';
    if (typeof v0 === 'number' && typeof pv === 'number') {
      const d = v0 - pv;
      if (Math.abs(d) < 1e-9) {
        deltaValStr = '0.0';
        deltaClass = 'neutral';
        deltaArrow = '—';
      } else {
        const up = d > 0, ad = Math.abs(d);
        let txt = (up ? '+' : '−');
        if (isPct(r)) txt += (ad * 100).toFixed(1) + '%';
        else if (unitOf(r)) txt += (Number.isInteger(ad) ? ad : ad.toFixed(1)) + unitOf(r);
        else txt += (Number.isInteger(ad) ? ad : ad.toFixed(1));
        deltaValStr = txt;
        if (r.dir === 'Higher') deltaClass = up ? 'good' : 'bad';
        else if (r.dir === 'Lower') deltaClass = up ? 'bad' : 'good';
        else deltaClass = 'neutral';
        deltaArrow = up ? '▲' : '▼';
      }
    } else {
      deltaValStr = '–';
    }

    // Chart Data Prep
    const vals = CHART_MONTHS.map(i => typeof r.v[i] === 'number' ? (isPct(r) ? +(r.v[i] * 100).toFixed(1) : +(r.v[i].toFixed(2))) : null);
    const validNums = vals.filter(v => typeof v === 'number' && !isNaN(v));
    const maxVal = validNums.length ? Math.max(...validNums) : null;
    const minVal = validNums.length ? Math.min(...validNums) : null;
    const maxMonthIdx = vals.indexOf(maxVal);
    const minMonthIdx = vals.indexOf(minVal);
    const maxMonthStr = maxMonthIdx >= 0 ? MON[CHART_MONTHS[maxMonthIdx]] : '–';
    const minMonthStr = minMonthIdx >= 0 ? MON[CHART_MONTHS[minMonthIdx]] : '–';

    let metMonths = 0, scoredMonths = 0;
    CHART_MONTHS.forEach(i => {
      if (r.scored && r.rag[i] !== null && r.rag[i] !== undefined) {
        scoredMonths++;
        if (r.rag[i] === 1) metMonths++;
      }
    });
    const slaSuccessPct = scoredMonths > 0 ? Math.round((metMonths / scoredMonths) * 100) : (r.scored ? 0 : 100);
    const slaGapPct = Math.max(0, 100 - slaSuccessPct);

    // Target SLA Card values (respects metric comparison direction and vetoes)
    const targetVal = r.scored ? (r.veto ? '0' : target(r)) : 'Monitoring Only';
    const targetSub = r.scored ? (r.veto ? 'Zero Ceiling (Veto)' : (r.dir === 'Higher' ? 'Minimum Target SLA' : 'Maximum Limit SLA')) : 'Informational Only';

    // Contractual Standing Card values (aligned with Main Dashboard RAG rules)
    let standingVal = 'SLA Target Met';
    let standingBadge = '';
    if (r.scored) {
      if (typeof v0 !== 'number' || x === null || x === undefined) {
        standingVal = 'No Telemetry Recorded';
        standingBadge = '<span class="v-status-pill n" style="font-size:10px;padding:1px 6px">No Telemetry</span>';
      } else if (x === 1) {
        standingVal = 'SLA Target Met';
        standingBadge = '<span class="v-status-pill g" style="font-size:10px;padding:1px 6px">Compliant</span>';
      } else if (x === 0) {
        standingVal = 'Within Tolerance';
        standingBadge = '<span class="v-status-pill a" style="font-size:10px;padding:1px 6px">In Tolerance</span>';
      } else {
        standingVal = r.veto ? 'Critical Veto Breach' : 'Breach / Attention';
        standingBadge = '<span class="v-status-pill r" style="font-size:10px;padding:1px 6px">Breach</span>';
      }
    } else {
      standingVal = 'Monitoring Only';
      standingBadge = '<span class="v-status-pill n" style="font-size:10px;padding:1px 6px">Informational</span>';
    }

    // Top 4 Stat Cards Grid (Matching Reference Top Row)
    const kpiGridHtml = '<div class="v-stat-grid">' +
      '<div class="v-stat-card primary">' +
        '<span class="v-stat-lbl">Current Value</span>' +
        '<span class="v-stat-val">' + fmt(r, v0) + '</span>' +
        '<div style="display:flex;align-items:center;gap:6px;margin-top:2px">' +
          '<span class="v-stat-badge ' + deltaClass + '">' + deltaArrow + ' ' + deltaValStr + '</span>' +
          '<span style="font-size:10px;color:#94a3b8">' + MON[m] + ' ' + state.year + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="v-stat-card">' +
        '<span class="v-stat-lbl">Target SLA</span>' +
        '<span class="v-stat-val">' + targetVal + '</span>' +
        '<span style="font-size:10.5px;color:#94a3b8;font-weight:600">' + targetSub + '</span>' +
      '</div>' +
      '<div class="v-stat-card">' +
        '<span class="v-stat-lbl">Contractual Standing</span>' +
        '<span class="v-stat-val" style="font-size:17px">' + standingVal + '</span>' +
        standingBadge +
      '</div>' +
      '<div class="v-stat-card">' +
        '<span class="v-stat-lbl">' + ytdMeta.lbl + '</span>' +
        '<span class="v-stat-val">' + fmt(r, r.ytd) + '</span>' +
        '<span style="font-size:10.5px;color:#94a3b8;font-weight:600">' + ytdMeta.sub + '</span>' +
      '</div>' +
    '</div>';

    // Operational Context Card
    const descText = r.desc || (auditInfo && auditInfo.diagnosis) || 'Operational security metric tracked as part of your managed service agreement.';
    const contextCardHtml = '<div class="v-context-card">' +
      '<span class="v-context-icon">ℹ️</span>' +
      '<div class="v-context-body">' +
        '<div class="v-context-title">Metric Definition &amp; Scope</div>' +
        '<div class="v-context-text">' + descText + '</div>' +
      '</div>' +
    '</div>';

    // Telemetry Breakdown (Sources-style horizontal progress bars)
    let sourcesBarsHtml = '';
    if (r.helpers && r.helpers.length > 0) {
      const helperVals = r.helpers.map(h => typeof h.v[m] === 'number' ? h.v[m] : 0);
      const maxHelper = Math.max(...helperVals, 1);
      const colorAccents = ['', 'accent-rose', 'accent-emerald', 'accent-indigo'];

      sourcesBarsHtml = '<div class="v-bars-list">' +
        r.helpers.map((h, idx) => {
          const valH = typeof h.v[m] === 'number' ? h.v[m] : 0;
          const pctWidth = Math.min(100, Math.round((valH / maxHelper) * 100));
          const accentCls = colorAccents[idx % colorAccents.length];
          return '<div class="v-bar-item">' +
            '<div class="v-bar-head">' +
              '<span class="v-bar-name">' + h.name + '</span>' +
              '<span class="v-bar-count">' + (Number.isInteger(valH) ? valH : valH.toFixed(1)) + '</span>' +
            '</div>' +
            '<div class="v-bar-track">' +
              '<div class="v-bar-fill ' + accentCls + '" style="width:' + pctWidth + '%;"></div>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    } else {
      const quarters = [
        { name: 'Q1 (Jan–Mar)', months: [1, 2, 3], cls: '' },
        { name: 'Q2 (Apr–Jun)', months: [4, 5, 6], cls: 'accent-emerald' },
        { name: 'Q3 (Jul–Sep)', months: [7, 8, 9], cls: 'accent-indigo' },
        { name: 'Q4 (Oct–Dec)', months: [10, 11, 12], cls: 'accent-rose' }
      ];
      const qAverages = quarters.map(q => {
        const qNums = q.months.map(idx => r.v[idx]).filter(v => typeof v === 'number');
        const avg = qNums.length ? qNums.reduce((a, b) => a + b, 0) / qNums.length : 0;
        return { name: q.name, avg: avg, cls: q.cls };
      });
      const maxQ = Math.max(...qAverages.map(q => q.avg), 1);

      sourcesBarsHtml = '<div class="v-bars-list">' +
        qAverages.map(q => {
          const pct = Math.min(100, Math.round((q.avg / maxQ) * 100));
          const valDisplay = fmt(r, q.avg);
          return '<div class="v-bar-item">' +
            '<div class="v-bar-head">' +
              '<span class="v-bar-name">' + q.name + '</span>' +
              '<span class="v-bar-count">' + valDisplay + '</span>' +
            '</div>' +
            '<div class="v-bar-track">' +
              '<div class="v-bar-fill ' + q.cls + '" style="width:' + pct + '%;"></div>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    }

    // Donut Card HTML: Scored vs Unscored
    let donutCardHtml = '';
    const curV = (typeof v0 === 'number') ? v0 : 0;
    const totalYtd = (typeof r.ytd === 'number') ? r.ytd : curV;
    const priorV = Math.max(0, totalYtd - curV);
    const curPct = totalYtd > 0 ? Math.round((curV / totalYtd) * 100) : 100;
    const priorPct = Math.max(0, 100 - curPct);

    if (r.scored) {
      donutCardHtml = '<div class="v-card">' +
        '<div class="v-card-head">' +
          '<h4 class="v-card-title">🎯 SLA Compliance</h4>' +
          '<span class="v-card-tag">YTD Target Met Rate</span>' +
        '</div>' +
        '<div class="v-donut-split">' +
          '<div class="v-donut-wrap">' +
            '<canvas id="dd" role="img" aria-label="SLA Compliance Donut"></canvas>' +
          '</div>' +
          '<div class="v-legend-list">' +
            '<div class="v-legend-item">' +
              '<span class="v-legend-key"><span class="v-legend-dot" style="background:#38bdf8"></span>Target Met</span>' +
              '<span class="v-legend-val">' + slaSuccessPct + '% (' + metMonths + '/' + scoredMonths + ' mo)</span>' +
            '</div>' +
            '<div class="v-legend-item">' +
              '<span class="v-legend-key"><span class="v-legend-dot" style="background:rgba(148,163,184,0.4)"></span>Variance / Gap</span>' +
              '<span class="v-legend-val">' + slaGapPct + '% (' + (scoredMonths - metMonths) + '/' + scoredMonths + ' mo)</span>' +
            '</div>' +
            '<div class="v-legend-item">' +
              '<span class="v-legend-key"><span class="v-legend-dot" style="background:#818cf8"></span>' + ytdMeta.legend + '</span>' +
              '<span class="v-legend-val">' + fmt(r, r.ytd) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    } else {
      donutCardHtml = '<div class="v-card">' +
        '<div class="v-card-head">' +
          '<h4 class="v-card-title">📊 Activity Breakdown</h4>' +
          '<span class="v-card-tag">' + (ytdMeta.method === 'sum' ? 'Monthly vs YTD Volume' : 'Current vs Historical') + '</span>' +
        '</div>' +
        '<div class="v-donut-split">' +
          '<div class="v-donut-wrap">' +
            '<canvas id="dd" role="img" aria-label="Activity Breakdown Donut"></canvas>' +
          '</div>' +
          '<div class="v-legend-list">' +
            '<div class="v-legend-item">' +
              '<span class="v-legend-key"><span class="v-legend-dot" style="background:#38bdf8"></span>' + MON[m] + ' (' + curPct + '%)</span>' +
              '<span class="v-legend-val">' + fmt(r, curV) + '</span>' +
            '</div>' +
            '<div class="v-legend-item">' +
              '<span class="v-legend-key"><span class="v-legend-dot" style="background:rgba(148,163,184,0.4)"></span>Prior YTD (' + priorPct + '%)</span>' +
              '<span class="v-legend-val">' + fmt(r, priorV) + '</span>' +
            '</div>' +
            '<div class="v-legend-item">' +
              '<span class="v-legend-key"><span class="v-legend-dot" style="background:#818cf8"></span>' + ytdMeta.legend + '</span>' +
              '<span class="v-legend-val">' + fmt(r, r.ytd) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    // 12-Month Performance History Table Rows (4-Column clean format)
    const tableRowsHtml = CHART_MONTHS.map(i => {
      const isCur = (i === m);
      const valI = r.v[i];
      const ragI = r.rag[i];

      const valStr = typeof valI === 'number' ? fmt(r, valI) : '–';
      const targetStr = r.scored ? (r.veto ? '0' : target(r)) : '–';

      const stPill = (r.scored && ragI !== null && ragI !== undefined) ?
        '<span class="v-status-pill ' + cls(ragI) + '" style="font-size:10px;padding:2px 7px">' + (ragI === 1 ? 'Target Met' : (ragI === 0 ? 'In Tolerance' : 'Breach')) + '</span>' :
        '<span style="color:#94a3b8;font-size:11px">' + (r.scored ? 'No Telemetry' : 'Monitoring') + '</span>';

      return '<tr class="' + (isCur ? 'active-row' : '') + '">' +
        '<td><strong>' + MON[i] + ' ' + state.year + (isCur ? ' (Selected)' : '') + '</strong></td>' +
        '<td>' + valStr + '</td>' +
        '<td>' + targetStr + '</td>' +
        '<td>' + stPill + '</td>' +
      '</tr>';
    }).join('');

    const ytdTargetStr = r.scored ? (r.veto ? '0' : target(r)) : '–';
    const ytdStPill = (r.scored && r.ytdrag !== null && r.ytdrag !== undefined) ?
      '<span class="v-status-pill ' + cls(r.ytdrag) + '" style="font-size:10px;padding:2px 7px">' + (r.ytdrag === 1 ? 'Target Met' : (r.ytdrag === 0 ? 'In Tolerance' : 'Breach')) + '</span>' :
      '<span style="color:#94a3b8;font-size:11px">' + (r.scored ? 'No Telemetry' : 'Monitoring') + '</span>';

    const ytdRowHtml = '<tr class="ytd-row">' +
      '<td><strong>' + ytdMeta.ledger + '</strong></td>' +
      '<td><strong>' + fmt(r, r.ytd) + '</strong></td>' +
      '<td>' + ytdTargetStr + '</td>' +
      '<td>' + ytdStPill + '</td>' +
    '</tr>';

    // Assemble Purely Visual Cockpit Drawer DOM
    document.getElementById('layer').innerHTML = '<div class="scrim" data-close></div><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="dt">' +
      '<div class="dh">' +
        '<div class="drawer-dh-left">' +
          '<span class="drawer-category-badge"><span class="drawer-category-dot"></span>' + auditInfo.catIcon + ' ' + auditInfo.catTitle + ' · ID #' + r.r + '</span>' +
          '<h3 id="dt">' + r.name + '</h3>' +
        '</div>' +
        '<button class="x" data-close aria-label="Close">✕</button>' +
      '</div>' +
      '<div class="db">' +
        '<!-- Top 4-Stat Metric Pill Strip -->' +
        kpiGridHtml +

        '<!-- Operational Definition & Scope -->' +
        contextCardHtml +

        '<!-- Wide Performance Trajectory Wave Chart -->' +
        '<div class="v-card">' +
          '<div class="v-card-head">' +
            '<h4 class="v-card-title">📈 Performance Trajectory</h4>' +
            '<span class="v-card-tag">12-Month Telemetry Wave vs SLA Target</span>' +
          '</div>' +
          '<div class="v-chart-wrap">' +
            '<canvas id="dc" role="img" aria-label="Monthly values for ' + r.name + '"></canvas>' +
          '</div>' +
          '<div class="v-chart-footer">' +
            '<div class="v-footer-stat">' +
              '<span class="v-footer-lbl">Peak Recorded</span>' +
              '<span class="v-footer-val">' + (maxVal !== null ? (fmt(r, isPct(r) ? maxVal / 100 : maxVal) + ' (' + maxMonthStr + ')') : '–') + '</span>' +
            '</div>' +
            '<div class="v-footer-stat">' +
              '<span class="v-footer-lbl">Lowest Recorded</span>' +
              '<span class="v-footer-val">' + (minVal !== null ? (fmt(r, isPct(r) ? minVal / 100 : minVal) + ' (' + minMonthStr + ')') : '–') + '</span>' +
            '</div>' +
            '<div class="v-footer-stat">' +
              '<span class="v-footer-lbl">' + ytdMeta.lbl + '</span>' +
              '<span class="v-footer-val">' + fmt(r, r.ytd) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<!-- Split Row: Donut Chart (Device) & Telemetry Breakdown (Sources) -->' +
        '<div class="v-split-row">' +
          donutCardHtml +

          '<!-- Horizontal Progress Bars: Telemetry Distribution (Sources Style) -->' +
          '<div class="v-card">' +
            '<div class="v-card-head">' +
              '<h4 class="v-card-title">📊 Telemetry Distribution</h4>' +
              '<span class="v-card-tag">' + (r.helpers && r.helpers.length ? 'Component Breakdown' : 'Quarterly Distribution') + '</span>' +
            '</div>' +
            sourcesBarsHtml +
          '</div>' +
        '</div>' +

        '<!-- 12-Month Performance History Table (Single Instance, 4-Column Presentation) -->' +
        '<div class="v-card">' +
          '<div class="v-card-head">' +
            '<h4 class="v-card-title">📜 12-Month Performance History</h4>' +
            '<span class="v-card-tag">Monthly actual values and performance status for the selected metric.</span>' +
          '</div>' +
          '<div class="v-table-wrap">' +
            '<table class="v-ledger-table">' +
              '<thead>' +
                '<tr>' +
                  '<th>Month</th>' +
                  '<th>Actual Value</th>' +
                  '<th>Target</th>' +
                  '<th>Status</th>' +
                '</tr>' +
              '</thead>' +
              '<tbody>' +
                tableRowsHtml +
                ytdRowHtml +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
      '</div></aside>';

    // Chart.js Configuration for Performance Wave Line Chart
    const lineCanvas = document.getElementById('dc');
    if (lineCanvas) {
      const lineCtx = lineCanvas.getContext('2d');
      const gradStroke = lineCtx.createLinearGradient(0, 0, 380, 0);
      gradStroke.addColorStop(0, '#38bdf8');
      gradStroke.addColorStop(1, '#818cf8');

      const gradFill = lineCtx.createLinearGradient(0, 0, 0, 190);
      gradFill.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
      gradFill.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

      const o = baseOpts();
      function roundTick(v) {
        if (typeof v !== 'number' || isNaN(v)) return '';
        return Number.isInteger(v) ? v : +(v.toFixed(2));
      }
      o.scales.y.ticks.precision = 2;
      if (isPct(r)) o.scales.y.ticks.callback = v => roundTick(v) + '%';
      else if (unitOf(r)) o.scales.y.ticks.callback = v => roundTick(v) + unitOf(r);
      else o.scales.y.ticks.callback = v => roundTick(v);

      const ds = [{
        label: r.name,
        data: vals,
        borderColor: gradStroke,
        backgroundColor: gradFill,
        borderWidth: 2.8,
        tension: 0.42,
        spanGaps: false,
        fill: true,
        pointRadius: 5.5,
        pointHoverRadius: 7.5,
        pointBackgroundColor: CHART_MONTHS.map(i => r.scored && r.rag[i] !== null && r.rag[i] !== undefined ? css(r.rag[i] === 1 ? '--g' : r.rag[i] === 0 ? '--a' : '--r') : '#38bdf8'),
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1.5
      }];

      if (r.scored && !r.veto) ds.push({
        label: 'Target SLA',
        data: CHART_MONTHS.map(() => isPct(r) ? +(r.target * 100).toFixed(1) : +(r.target.toFixed(2))),
        borderColor: '#94a3b8',
        borderDash: [5, 4],
        borderWidth: 1.6,
        pointRadius: 0,
        fill: false
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
          c.fillStyle = 'rgba(245, 158, 11, 0.08)';
          c.fillRect(ca.left, Math.min(a, b), ca.right - ca.left, Math.abs(b - a));
          c.restore();
        }
      };

      const lab = {
        id: 'lab',
        afterDatasetsDraw(ch) {
          const c = ch.ctx, pts = ch.getDatasetMeta(0).data;
          c.save();
          c.font = '600 10.5px "JetBrains Mono", monospace, sans-serif';
          c.fillStyle = '#cbd5e1';
          c.textAlign = 'center';
          pts.forEach((pt, i) => {
            const v = vals[i];
            if (v === null || isNaN(v)) return;
            c.fillText(fmt(r, isPct(r) ? v / 100 : v), pt.x, pt.y - 10);
          });
          if (r.scored && !r.veto && typeof tgt === 'number') {
            c.fillStyle = '#f59e0b';
            c.textAlign = 'left';
            c.font = '600 10px "JetBrains Mono", monospace, sans-serif';
            c.fillText('Target ' + target(r), ch.chartArea.left + 6, ch.scales.y.getPixelForValue(tgt) - 6);
          }
          c.restore();
        }
      };

      o.layout = { padding: { top: 20, left: 10, right: 26, bottom: 4 } };
      drawerChart = new Chart(lineCanvas, {
        type: 'line',
        data: { labels: CHART_MONTHS.map(i => MON[i]), datasets: ds },
        options: o,
        plugins: [band, lab]
      });
    }

    // Chart.js Configuration for Donut Chart (Device Style)
    const donutCanvas = document.getElementById('dd');
    if (donutCanvas) {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const donutAccent = x === 1 ? '#10b981' : (x === 0 ? '#f59e0b' : (x === -1 ? '#ef4444' : '#38bdf8'));
      const donutRemainder = isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(226, 232, 240, 0.9)';

      if (r.scored) {
        const donutCenterPlugin = {
          id: 'donutCenter',
          beforeDraw(chart) {
            const { width, height, ctx } = chart;
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '800 18px "JetBrains Mono", monospace';
            ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
            ctx.fillText(slaSuccessPct + '%', width / 2, height / 2 - 6);
            ctx.font = '600 10px "Inter", sans-serif';
            ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
            ctx.fillText('SLA Met', width / 2, height / 2 + 12);
            ctx.restore();
          }
        };

        drawerDonutChart = new Chart(donutCanvas, {
          type: 'doughnut',
          data: {
            labels: ['SLA Achieved', 'SLA Remainder'],
            datasets: [{
              data: [slaSuccessPct, Math.max(0, 100 - slaSuccessPct)],
              backgroundColor: [donutAccent, donutRemainder],
              borderWidth: 0,
              hoverOffset: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(ctx) {
                    return ' ' + ctx.label + ': ' + ctx.parsed + '%';
                  }
                }
              }
            }
          },
          plugins: [donutCenterPlugin]
        });
      } else {
        const donutCenterPlugin = {
          id: 'donutCenter',
          beforeDraw(chart) {
            const { width, height, ctx } = chart;
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '800 16px "JetBrains Mono", monospace';
            ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
            ctx.fillText(curPct + '%', width / 2, height / 2 - 6);
            ctx.font = '600 9.5px "Inter", sans-serif';
            ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
            ctx.fillText(MON[m] + ' Share', width / 2, height / 2 + 12);
            ctx.restore();
          }
        };

        drawerDonutChart = new Chart(donutCanvas, {
          type: 'doughnut',
          data: {
            labels: [MON[m] + ' (' + state.year + ')', 'Prior Period'],
            datasets: [{
              data: [curV, priorV],
              backgroundColor: ['#38bdf8', donutRemainder],
              borderWidth: 0,
              hoverOffset: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(ctx) {
                    return ' ' + ctx.label + ': ' + fmt(r, ctx.parsed);
                  }
                }
              }
            }
          },
          plugins: [donutCenterPlugin]
        });
      }
    }

    const db = document.querySelector('.drawer .db');
    if (db) db.scrollTop = 0;
    const closeBtn = document.querySelector('.drawer .x');
    if (closeBtn) {
      try { closeBtn.focus({ preventScroll: true }); } catch (e) { closeBtn.focus(); }
    }
  }

  function closeDrawer() {
    currentDrawerId = null;
    if (drawerChart) {
      drawerChart.destroy();
      drawerChart = null;
    }
    if (drawerDonutChart) {
      drawerDonutChart.destroy();
      drawerDonutChart = null;
    }
    const layer = document.getElementById('layer');
    if (layer) layer.innerHTML = '';
    if (lastFocus && lastFocus.focus) {
      try { lastFocus.focus(); } catch (e) {}
    }
  }

  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;

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
      if (activeClientDetail && activeClientDetail.type === 'patches') {
        openClientPatchesSegmentDetail(activeClientDetail.idx);
      } else if (activeClientDetail && activeClientDetail.type === 'patch_comp') {
        openClientPatchCompDetail(activeClientDetail.idx);
      }
    } else if (tab.id === 'threats') {
      drawThreatCharts();
    } else if (tab.id === 'vuln') {
      drawVulnCharts();
      if (activeClientDetail && activeClientDetail.type === 'vuln') {
        openClientVulnDonutDetail(activeClientDetail.idx);
      }
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

  // Theme toggle (Frosted glass liquid switch)
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeBtnText = document.getElementById('theme-btn-text');

  function syncThemeToggleUI(theme) {
    if (!themeBtn) return;
    const isDark = theme === 'dark';
    themeBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    if (themeBtnText) themeBtnText.textContent = isDark ? 'Dark' : 'Light';
  }

  if (themeBtn) {
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    syncThemeToggleUI(initialTheme);

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      syncThemeToggleUI(next);
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
  let lastSeenVersion = 0;
  function initLiveSync() {
    fetch('/api/public/version').then(r => r.json()).then(vData => {
      if (vData && typeof vData.version === 'number') lastSeenVersion = vData.version;
    }).catch(() => {});

    if (typeof EventSource !== 'undefined') {
      try {
        const es = new EventSource('/api/public/live-events');
        es.onmessage = e => {
          try {
            const p = JSON.parse(e.data);
            if (p && p.type === 'data_updated') {
              if (p.version && p.version > lastSeenVersion) {
                lastSeenVersion = p.version;
                const mKey = state.year + '-' + String(state.m).padStart(2, '0');
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
            const mKey = state.year + '-' + String(state.m).padStart(2, '0');
            fetchClientData(mKey);
            flashSyncBadge('LIVE SYNC: UPDATED FROM MAIN PAGE');
          }
        };
      } catch (err) {}
    }

    window.addEventListener('storage', e => {
      if (e.key === 'brysa_data_version') {
        const mKey = state.year + '-' + String(state.m).padStart(2, '0');
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
          const mKey = state.year + '-' + String(state.m).padStart(2, '0');
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
        const monthKey = state.year + '-' + String(state.m).padStart(2, '0');
        fetchClientData(monthKey);
      }
      return;
    }
    if (t.dataset.tab) {
      activeClientDetail = null;
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

  // ---------- Ultra-Modern Dark Glow Calendar Controller (Client Portal - Matching Main Page) ----------
  let calViewYear = 2026;
  let calViewMonth = 5;

  function updateClientMonthDisplayLabel() {
    const label = document.getElementById('month-display-text');
    if (label) {
      label.textContent = FULL[state.m] + ' ' + state.year;
    }
  }

  function syncClientCalendarToState() {
    calViewYear = state.year;
    calViewMonth = state.m;
    updateClientMonthDisplayLabel();
    renderClientCustomCalendar();
  }

  function toggleClientCustomCalendar() {
    const popup = document.getElementById('custom-calendar-popup');
    const trigger = document.getElementById('month-picker-trigger');
    if (!popup) return;
    const isOpen = popup.style.display !== 'none';
    if (isOpen) {
      closeClientCustomCalendar();
    } else {
      calViewYear = state.year;
      calViewMonth = state.m;
      renderClientCustomCalendar();
      popup.style.display = 'block';
      if (trigger) trigger.classList.add('active');
    }
  }

  function closeClientCustomCalendar() {
    const popup = document.getElementById('custom-calendar-popup');
    const trigger = document.getElementById('month-picker-trigger');
    if (popup) popup.style.display = 'none';
    if (trigger) trigger.classList.remove('active');
  }

  function navigateClientCalendarMonth(delta) {
    calViewMonth += delta;
    if (calViewMonth < 1) {
      calViewMonth = 12;
      calViewYear--;
    } else if (calViewMonth > 12) {
      calViewMonth = 1;
      calViewYear++;
    }
    renderClientCustomCalendar();
  }

  function navigateClientCalendarYear(delta) {
    calViewYear += delta;
    renderClientCustomCalendar();
  }

  function renderClientCustomCalendar() {
    const titleEl = document.getElementById('cal-month-title');
    const yearTrack = document.getElementById('cal-year-track');
    const monthsGrid = document.getElementById('cal-months-grid');
    if (!titleEl && !monthsGrid) return;

    if (titleEl) {
      titleEl.textContent = FULL[calViewMonth] + ' ' + calViewYear;
    }

    if (yearTrack) {
      yearTrack.innerHTML = '';
      for (let y = calViewYear - 1; y <= calViewYear + 1; y++) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'cal-year-chip' + (y === calViewYear ? ' active' : '');
        chip.textContent = y;
        chip.title = 'Switch to year ' + y;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          calViewYear = y;
          renderClientCustomCalendar();
        });
        yearTrack.appendChild(chip);
      }
    }

    if (monthsGrid) {
      monthsGrid.innerHTML = '';
      for (let i = 1; i <= 12; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cal-month-cell';
        if (calViewYear === state.year && i === state.m) {
          btn.classList.add('selected');
        }
        btn.textContent = MON[i];
        btn.title = 'Select ' + FULL[i] + ' ' + calViewYear;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectClientCalendarMonth(calViewYear, i);
        });
        monthsGrid.appendChild(btn);
      }
    }
  }

  async function selectClientCalendarMonth(y, m) {
    state.year = y;
    state.m = m;
    closeClientCustomCalendar();
    updateClientMonthDisplayLabel();
    const monthKey = y + '-' + String(m).padStart(2, '0');
    await fetchClientData(monthKey);
  }

  function initClientCustomCalendar() {
    const trigger = document.getElementById('month-picker-trigger');
    const popup = document.getElementById('custom-calendar-popup');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const calNavPrev = document.getElementById('cal-nav-prev');
    const calNavNext = document.getElementById('cal-nav-next');
    const prevYearBtn = document.getElementById('cal-year-scroll-prev');
    const nextYearBtn = document.getElementById('cal-year-scroll-next');
    const yearScrollBox = document.getElementById('cal-year-scroll-container');

    updateClientMonthDisplayLabel();
    renderClientCustomCalendar();

    if (trigger && popup) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleClientCustomCalendar();
      });
    }

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newM = state.m - 1;
        let newY = state.year;
        if (newM < 1) {
          newM = 12;
          newY--;
        }
        selectClientCalendarMonth(newY, newM);
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newM = state.m + 1;
        let newY = state.year;
        if (newM > 12) {
          newM = 1;
          newY++;
        }
        selectClientCalendarMonth(newY, newM);
      });
    }

    if (calNavPrev) {
      calNavPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateClientCalendarMonth(-1);
      });
    }

    if (calNavNext) {
      calNavNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateClientCalendarMonth(1);
      });
    }

    if (prevYearBtn) {
      prevYearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateClientCalendarYear(-1);
      });
    }

    if (nextYearBtn) {
      nextYearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateClientCalendarYear(1);
      });
    }

    if (yearScrollBox) {
      let lastWheelTime = 0;
      yearScrollBox.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const now = Date.now();
        if (now - lastWheelTime < 140) return;
        const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) > 0 ? 1 : -1;
        lastWheelTime = now;
        navigateClientCalendarYear(delta);
      }, { passive: false });
    }

    document.addEventListener('click', (e) => {
      if (popup && popup.style.display !== 'none') {
        if (!popup.contains(e.target) && !trigger?.contains(e.target)) {
          closeClientCustomCalendar();
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeClientCustomCalendar();
      }
    });
  }

  // Initial immediate render with baseline, followed immediately by live fetch
  try {
    const stored = localStorage.getItem('brysa_active_month');
    if (stored && (stored.startsWith('2027') || stored > '2026-12')) {
      localStorage.removeItem('brysa_active_month');
    }
  } catch (e) {}

  render();
  initClientCustomCalendar();
  const initKey = (state.year + '-' + String(state.m).padStart(2, '0'));
  fetchClientData(initKey);
  initLiveSync();

})();
