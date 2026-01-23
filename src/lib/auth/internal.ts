import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Cookie name for internal auth
 */
export const AUTH_COOKIE_NAME = 'esp-internal-auth';

/**
 * Authorized email domain for internal access
 */
const AUTHORIZED_DOMAIN = 'ethereum.org';

/**
 * Auth token payload structure
 */
export interface AuthPayload {
  email: string;
  name: string;
}

/**
 * Result of token verification
 */
export interface VerifyResult {
  valid: boolean;
  payload?: AuthPayload;
  error?: string;
}

/**
 * Create a signed auth token using HMAC-SHA256
 *
 * Format: base64(payload).base64(signature)
 *
 * @param payload - User data to encode
 * @param secret - Secret key for signing (min 32 chars recommended)
 * @returns Signed token string
 */
export function signAuthToken(payload: AuthPayload, secret: string): string {
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = Buffer.from(payloadStr).toString('base64url');

  const signature = createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify a signed auth token
 *
 * @param token - Token to verify
 * @param secret - Secret key used for signing
 * @returns Verification result with payload if valid
 */
export function verifyAuthToken(token: string, secret: string): VerifyResult {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token is empty or invalid' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Invalid token format' };
  }

  const [payloadB64, providedSignature] = parts;

  // Compute expected signature
  const expectedSignature = createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  // Use timing-safe comparison to prevent timing attacks
  let signaturesMatch = false;
  try {
    const providedBuf = Buffer.from(providedSignature, 'base64url');
    const expectedBuf = Buffer.from(expectedSignature, 'base64url');

    if (providedBuf.length === expectedBuf.length) {
      signaturesMatch = timingSafeEqual(
        new Uint8Array(providedBuf),
        new Uint8Array(expectedBuf)
      );
    }
  } catch {
    return { valid: false, error: 'Invalid signature format' };
  }

  if (!signaturesMatch) {
    return { valid: false, error: 'Invalid signature - token may be forged or tampered' };
  }

  // Decode payload
  try {
    const payloadStr = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(payloadStr) as AuthPayload;

    return { valid: true, payload };
  } catch {
    return { valid: false, error: 'Invalid payload format' };
  }
}

/**
 * Check if an email is authorized for internal access
 *
 * Only allows exact @ethereum.org domain (not subdomains)
 *
 * @param email - Email address to check
 * @returns true if authorized
 */
export function isAuthorizedEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Basic email format check
  const atIndex = email.lastIndexOf('@');
  if (atIndex <= 0) {
    return false;
  }

  const domain = email.slice(atIndex + 1).toLowerCase();

  // Must be exactly ethereum.org (not subdomains like sub.ethereum.org)
  return domain === AUTHORIZED_DOMAIN;
}
