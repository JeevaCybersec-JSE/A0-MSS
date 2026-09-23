// ============================================================
// MSS KPI Dashboard — Share Token Service
// Isolated module for secure client share-link management.
// Zero external dependencies — pure Node.js crypto only.
//
// Usage pattern:
//   const shares = require('./lib/shares');
//   const { rawToken, record } = shares.createShare({ ... });
//   // Return rawToken to caller ONCE — never persist it.
//   // Store only record (contains tokenHash).
// ============================================================

'use strict';

const fs      = require('fs');
const path    = require('path');
const crypto  = require('crypto');

// ---- Storage path ----
const SHARES_PATH = path.join(__dirname, '..', 'data', 'shares.json');

// ---- Allowed expiry values (days) ----
const ALLOWED_EXPIRY_DAYS = [7, 30, 90];

// ---- Token format: 32 bytes = 64 hex chars ----
const TOKEN_BYTES = 32;

// ---- HMAC secret — derived from a stable machine-specific value ----
// We derive a consistent secret from the shares file path so we don't
// need an extra config file, while still preventing a raw SHA-256
// rainbow table attack on the tokenHash column.
const HMAC_SECRET = crypto
  .createHash('sha256')
  .update('mss-kpi-share-token-v1:' + SHARES_PATH)
  .digest('hex');

// ============================================================
// Internal: persistence helpers
// ============================================================

function loadShares() {
  try {
    const raw = fs.readFileSync(SHARES_PATH, 'utf8');
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.shares)) return { shares: [] };
    return data;
  } catch (e) {
    // If file missing or corrupt, initialise empty
    const defaults = { shares: [] };
    try {
      fs.writeFileSync(SHARES_PATH, JSON.stringify(defaults, null, 2), 'utf8');
    } catch (_) {}
    return defaults;
  }
}

function saveShares(data) {
  fs.writeFileSync(SHARES_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// ============================================================
// Internal: cryptography helpers
// ============================================================

/**
 * Generate a cryptographically secure random token (256 bits, hex encoded).
 * NEVER call Math.random() or use predictable values.
 * @returns {string} 64-character hex string
 */
function generateRawToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}

/**
 * Hash a raw token using HMAC-SHA-256 with an internal secret.
 * This means knowing a tokenHash cannot reverse to the raw token
 * even if data/shares.json is exposed.
 * @param {string} rawToken  - 64-char hex string
 * @returns {string}          - 64-char hex HMAC-SHA-256 output
 */
function hashToken(rawToken) {
  return crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(rawToken)
    .digest('hex');
}

/**
 * Generate a unique internal record ID (non-sequential, non-predictable).
 * Prefix 'shr_' makes it obviously a share ID in audit logs.
 */
function generateId() {
  return 'shr_' + crypto.randomBytes(10).toString('hex');
}

// ============================================================
// Internal: status resolution helper
// ============================================================

/**
 * Resolve the effective display status of a share record.
 * Records are never deleted — status is computed at read-time.
 *
 * active   + not expired = "active"
 * active   + expired     = "expired"
 * revoked               = "revoked"
 *
 * @param {object} share - raw share record from storage
 * @returns {string}      effective status string
 */
function effectiveStatus(share) {
  if (share.status === 'revoked') return 'revoked';
  if (share.expiresAt && Date.now() > new Date(share.expiresAt).getTime()) {
    return 'expired';
  }
  return 'active';
}

// ============================================================
// Public API
// ============================================================

/**
 * Validate that a month string conforms to YYYY-MM format.
 * @param {string} month
 * @returns {boolean}
 */
function isValidMonth(month) {
  if (typeof month !== 'string') return false;
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(month.trim());
}

/**
 * Validate that expiresInDays is one of the allowed values.
 * @param {number} days
 * @returns {boolean}
 */
function isValidExpiryDays(days) {
  return ALLOWED_EXPIRY_DAYS.includes(Number(days));
}

/**
 * Create a new share record.
 *
 * Returns:
 *   { rawToken: string, record: object }
 *
 * IMPORTANT: rawToken is returned to the caller ONCE.
 * It must NEVER be persisted, logged, or written to audit logs.
 * Only record (containing tokenHash) is written to disk.
 *
 * @param {object} opts
 * @param {string} opts.month         - "YYYY-MM" reporting period
 * @param {number} opts.expiresInDays - must be in ALLOWED_EXPIRY_DAYS
 * @param {string} opts.clientName    - client/organisation display name
 * @param {string} opts.createdBy     - operator username
 * @returns {{ rawToken: string, record: object }}
 */
function createShare({ month, expiresInDays, clientName, createdBy }) {
  if (!isValidMonth(month)) {
    throw new Error('Invalid reporting month. Expected YYYY-MM format.');
  }
  if (!isValidExpiryDays(expiresInDays)) {
    throw new Error(
      `Invalid expiry. Allowed values: ${ALLOWED_EXPIRY_DAYS.join(', ')} days.`
    );
  }

  const rawToken   = generateRawToken();       // 256-bit secure random
  const tokenHash  = hashToken(rawToken);      // HMAC-SHA-256; this is what we store
  const now        = new Date();
  const expiresAt  = new Date(now.getTime() + Number(expiresInDays) * 24 * 60 * 60 * 1000);

  const record = {
    id:          generateId(),
    tokenHash,                                 // ONLY the hash — raw token is NOT stored
    clientName:  String(clientName || 'A0 MSS Dashboard').trim(),
    scope:       'month',
    month:       month.trim(),
    createdAt:   now.toISOString(),
    expiresAt:   expiresAt.toISOString(),
    createdBy:   String(createdBy || 'SYSTEM').trim(),
    status:      'active',
    revokedAt:   null,
  };

  const data = loadShares();
  data.shares.push(record);
  saveShares(data);

  // rawToken is returned to caller and MUST NOT be persisted anywhere else
  return { rawToken, record };
}

/**
 * Resolve a raw token string to its share record.
 *
 * Validates:
 *  1. Token format (must be 64 hex chars)
 *  2. Hash match against stored records
 *  3. status === "active"
 *  4. Not expired
 *
 * @param {string} rawToken
 * @returns {object|null} share record (with effectiveStatus injected), or null if invalid
 */
function resolveShareToken(rawToken) {
  // 1. Format guard: must be exactly 64 lowercase hex characters
  if (!rawToken || typeof rawToken !== 'string') return null;
  if (!/^[0-9a-f]{64}$/i.test(rawToken.trim())) return null;

  const tokenHash = hashToken(rawToken.trim());

  const data = loadShares();
  const share = data.shares.find(s => s.tokenHash === tokenHash);
  if (!share) return null;

  // 2. Status check
  if (share.status !== 'active') return null;

  // 3. Expiry check
  if (share.expiresAt && Date.now() > new Date(share.expiresAt).getTime()) {
    return null;
  }

  // Return a safe copy — never expose tokenHash to callers
  return {
    id:         share.id,
    clientName: share.clientName,
    scope:      share.scope,
    month:      share.month,
    createdAt:  share.createdAt,
    expiresAt:  share.expiresAt,
    createdBy:  share.createdBy,
    status:     'active',
  };
}

/**
 * Revoke a share by its internal record ID.
 * Sets status = "revoked" and revokedAt = now.
 * The record is NEVER deleted — revoked records are preserved for audit.
 *
 * @param {string} shareId
 * @returns {{ ok: boolean, error?: string }}
 */
function revokeShare(shareId) {
  if (!shareId || typeof shareId !== 'string') {
    return { ok: false, error: 'Invalid share ID.' };
  }

  const data = loadShares();
  const share = data.shares.find(s => s.id === shareId);

  if (!share) {
    return { ok: false, error: 'Share not found.' };
  }
  if (share.status === 'revoked') {
    return { ok: false, error: 'Share is already revoked.' };
  }

  share.status   = 'revoked';
  share.revokedAt = new Date().toISOString();
  saveShares(data);

  return { ok: true };
}

/**
 * List all share records with safe metadata only.
 * tokenHash is NEVER included in the output.
 * effectiveStatus is computed at read-time.
 *
 * @param {object} [opts]
 * @param {string} [opts.statusFilter] - optional: "active"|"expired"|"revoked"
 * @returns {object[]} array of safe share metadata objects
 */
function listShares({ statusFilter } = {}) {
  const data = loadShares();

  return data.shares
    .map(s => ({
      id:          s.id,
      clientName:  s.clientName,
      scope:       s.scope,
      month:       s.month,
      createdAt:   s.createdAt,
      expiresAt:   s.expiresAt,
      createdBy:   s.createdBy,
      status:      effectiveStatus(s),   // computed — never raw storage status
      revokedAt:   s.revokedAt || null,
      // tokenHash intentionally excluded
    }))
    .filter(s => !statusFilter || s.status === statusFilter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
}

/**
 * Expose allowed expiry days for validation in routes.
 */
const EXPIRY_OPTIONS = ALLOWED_EXPIRY_DAYS;

module.exports = {
  createShare,
  resolveShareToken,
  revokeShare,
  listShares,
  isValidMonth,
  isValidExpiryDays,
  EXPIRY_OPTIONS,
};
