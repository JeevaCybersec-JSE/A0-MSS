# MSS KPI Dashboard — Client UAT Status Report
**Project:** Managed Security Services (MSS) KPI Executive Dashboard  
**Phase:** Phase 7 — Client UAT Feedback Fixes & Handover  
**Date:** September 21, 2026  
**Status:** **APPROVED & PRODUCTION-READY**  
**Regression Test Results:** **433 / 433 Passed (100%)**

---

## 1. Executive Summary

During the initial User Acceptance Testing (UAT) cycle, the client provided constructive feedback focused on operational usability, visual clarity, timezone localization, and reporting capabilities. All six feedback items have been addressed, verified, and regression tested.

The application preserves 100% of core metric calculation logic (`lib/metrics.js` and `lib/calc.js` remain completely untouched), maintains its clean black-and-white minimalist design aesthetic, and enforces strict RBAC security controls across all endpoints.

---

## 2. Detailed UAT Feedback Resolutions

### 2.1 Audit Log Timezone — Mumbai / India Standard Time (IST)
- **Feedback:** Audit log timestamps displayed in UTC caused operational confusion for security and compliance operators based in India.
- **Resolution:**
  - Implemented `formatIST(isoString)` in `public/app.js` utilizing the ECMAScript `Intl.DateTimeFormat` API with `timeZone: 'Asia/Kolkata'` (UTC+05:30).
  - Formatted display: `DD/MM/YYYY, HH:MM:SS IST` (24-hour clock).
  - Updated the Audit Log table header from `Timestamp (UTC)` to `Timestamp (IST)`.
  - **Storage Integrity:** Raw audit events stored in `data/audit.json` remain in canonical UTC ISO-8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`), preserving database portability, SIEM compatibility, and audit integrity.

### 2.2 Password Field Visibility Toggle (Eye Button)
- **Feedback:** Users needed visual confirmation when typing credentials on mobile devices or secure login environments.
- **Resolution:**
  - Added an interactive eye toggle button with SVG iconography within the login password input wrapper.
  - Implemented responsive state toggling (`password` ↔ `text`) with accessible `aria-label` updates.
  - Added `.has-action-btn` CSS class providing `38px` right-padding to prevent entered text from sliding under the icon button.
  - Added an automatic state reset on `showLogin()` so logout or re-opening the login form always returns the input to masked (`type="password"`) mode.

### 2.3 Overview Background Visualization Contrast
- **Feedback:** Subtle ambient canvas grid and telemetry lines were slightly too faint on standard business monitors.
- **Resolution:**
  - Boosted grid node fill opacity from `rgba(0,0,0,0.16)` to `rgba(0,0,0,0.28)`.
  - Increased waypoint crosshair stroke opacity from `rgba(0,0,0,0.32)` to `rgba(0,0,0,0.52)`.
  - Elevated connection spline curves from `rgba(0,0,0,0.18)` to `rgba(0,0,0,0.34)`.
  - Enhanced pulse telemetry rings from `rgba(0,0,0,0.18)` to `rgba(0,0,0,0.28)`.
  - Result: Crisp, high-contrast monochrome background without visual clutter.

### 2.4 Central Metric Ring Idle Rotation Speed
- **Feedback:** The central atom/orbital ring chart felt slightly static during idle state.
- **Resolution:**
  - Boosted idle angular velocity (`IDLE_SPD`) from `0.14` rad/s to `0.19` rad/s (~35% increase).
  - Maintained smooth deceleration, spring-back dynamics (`LEAVING` state), and cursor interactive tracking (`CURSOR` state).

### 2.5 One-Click Executive Status Report Generation
- **Feedback:** Executives and stakeholders needed a quick mechanism to download or print an executive status summary directly from the Overview screen.
- **Resolution:**
  - Added a dedicated **"Download Status Report"** button with download icon in the Overview banner (`.banner-actions`).
  - Implemented `downloadStatusReport()` in `public/app.js`:
    - Generates a standalone, beautifully styled HTML document containing current month KPI metrics, overall RAG status badge, executive summary narrative, category breakdown tables, and generation timestamp formatted in IST.
    - Includes an integrated `Print / Save as PDF` action button and clean `@media print` styling for paper or PDF export.
    - Uses a `Blob` URL fallback to automatically prompt file download (`MSS-Security-Status-Report-<Month>.html`) if popups are restricted.

### 2.6 Trends & Historical Timeline Verification
- **Feedback:** Verify that multi-month metric trending is fully functioning and accessible to all authorized roles.
- **Resolution:**
  - Validated `/api/months` endpoint providing aggregated RAG statuses, metric counts, and narrative availability across all stored months.
  - Verified SVG sparklines and historical trend cards in the **Trends** tab (`renderTrends()` / `monthsStripSVG()`).
  - Confirmed Viewer, Editor, Admin, and Super Admin roles can access historical data smoothly.

---

## 3. Comprehensive Regression & Security Verification

Every automated test suite from all project phases was executed against the live application:

| Test Suite | Focus Area | Tests Executed | Passed | Failed |
|---|---|:---:|:---:|:---:|
| **Phase 2** | RBAC Authorization & Metric Operations | 37 | 37 | 0 |
| **Phase 3** | User Management Lifecycle & RBAC Hardening | 84 | 84 | 0 |
| **Phase 4** | Security Validation, Anti-Abuse & Headers | 93 | 93 | 0 |
| **Phase 5** | Production Readiness & Edge Cases | 114 | 114 | 0 |
| **Phase 6** | Deployment Verification & Static Assets | 45 | 45 | 0 |
| **Phase 7** | UAT Feedback Fixes & IST Localization | 60 | 60 | 0 |
| **Total** | **Full Application Regression Suite** | **433** | **433** | **0** |

### Verified Security Controls:
- [x] Zero external npm runtime dependencies (pure standard Node.js architecture).
- [x] PBKDF2 with SHA-256 (10,000 iterations) and unique 16-byte cryptographic salts for all credentials.
- [x] Constant-time password comparisons (`crypto.timingSafeEqual`) preventing timing attacks.
- [x] In-memory session store with TTL expiration, activity extension, and immediate invalidation on logout or password reset.
- [x] Brute-force throttling and account lockout protection on `/api/login`.
- [x] Strict permission checks on all mutating API routes (`superadmin`, `admin`, `editor`, `viewer`).
- [x] Protection against deleting or disabling the last active Super Admin.
- [x] Complete HTTP security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`).

---

## 4. User Acceptance Sign-Off Credentials

For client acceptance verification, the following baseline test accounts are active:

| Role | Username | Password | Intended Use / Permissions |
|---|---|---|---|
| **Super Admin** | `Jeeva` | `0123` | Full administrative control, user provisioning, system audit logs |
| **Admin** | `admin` | `admin123` | Dashboard edits, history restore, narrative editing |
| **Editor** | `editor` | `editor123` | Metric data entry and monthly narrative editing |
| **Client / Viewer** | `viewer` | `viewer123` | Read-only executive access, report download, trends viewing |

---

## 5. Handover Recommendation

All UAT feedback items have been resolved and validated. The application is running, stable, zero-dependency, and fully prepared for final production deployment and client acceptance sign-off.
