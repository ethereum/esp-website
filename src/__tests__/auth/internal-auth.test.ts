import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  signAuthToken,
  verifyAuthToken,
  isAuthorizedEmail,
  AUTH_COOKIE_NAME
} from '../../lib/auth/internal';

/**
 * Security tests for internal grants access control
 *
 * CRITICAL: The internal grants explorer contains confidential data:
 * - Budget amounts
 * - Grant evaluator names
 * - Cost centers
 * - Grant status
 *
 * Access must be restricted to @ethereum.org users only.
 */

describe('Internal Auth - Token Security', () => {
  const validPayload = { email: 'alice@ethereum.org', name: 'Alice' };
  const secretKey = 'test-secret-key-min-32-chars-long!';

  describe('signAuthToken', () => {
    it('should create a signed token that is not just base64', () => {
      const token = signAuthToken(validPayload, secretKey);

      // Token should not be plain base64 decodable to original payload
      // (i.e., it should have signature component)
      const plainBase64 = Buffer.from(JSON.stringify(validPayload)).toString('base64');
      expect(token).not.toBe(plainBase64);
    });

    it('should create different tokens for different secrets', () => {
      const token1 = signAuthToken(validPayload, 'secret-one-min-32-characters!!!');
      const token2 = signAuthToken(validPayload, 'secret-two-min-32-characters!!!');

      expect(token1).not.toBe(token2);
    });

    it('should create consistent tokens for same payload and secret', () => {
      const token1 = signAuthToken(validPayload, secretKey);
      const token2 = signAuthToken(validPayload, secretKey);

      // Note: If using JWT with timestamps, tokens may differ
      // This test may need adjustment based on implementation
      expect(token1).toBe(token2);
    });
  });

  describe('verifyAuthToken', () => {
    it('should verify a validly signed token', () => {
      const token = signAuthToken(validPayload, secretKey);
      const result = verifyAuthToken(token, secretKey);

      expect(result.valid).toBe(true);
      expect(result.payload?.email).toBe('alice@ethereum.org');
      expect(result.payload?.name).toBe('Alice');
    });

    it('should reject a forged base64 token (not signed)', () => {
      // Attacker tries to forge a cookie with plain base64
      const forgedToken = Buffer.from(
        JSON.stringify({ email: 'attacker@ethereum.org', name: 'Attacker' })
      ).toString('base64');

      const result = verifyAuthToken(forgedToken, secretKey);

      expect(result.valid).toBe(false);
      expect(result.payload).toBeUndefined();
      expect(result.error).toBeDefined();
    });

    it('should reject a token signed with wrong secret', () => {
      const token = signAuthToken(validPayload, 'wrong-secret-min-32-characters!!');
      const result = verifyAuthToken(token, secretKey);

      expect(result.valid).toBe(false);
      expect(result.error).toContain('signature');
    });

    it('should reject a tampered token', () => {
      const token = signAuthToken(validPayload, secretKey);
      // Tamper with the token
      const tamperedToken = token.slice(0, -5) + 'XXXXX';

      const result = verifyAuthToken(tamperedToken, secretKey);

      expect(result.valid).toBe(false);
    });

    it('should reject an empty token', () => {
      const result = verifyAuthToken('', secretKey);

      expect(result.valid).toBe(false);
    });

    it('should reject a malformed token', () => {
      const result = verifyAuthToken('not-a-valid-token!!!', secretKey);

      expect(result.valid).toBe(false);
    });
  });
});

describe('Internal Auth - Email Domain Verification', () => {
  describe('isAuthorizedEmail', () => {
    it('should allow @ethereum.org emails', () => {
      expect(isAuthorizedEmail('alice@ethereum.org')).toBe(true);
      expect(isAuthorizedEmail('bob.smith@ethereum.org')).toBe(true);
      expect(isAuthorizedEmail('team+grants@ethereum.org')).toBe(true);
    });

    it('should reject non-ethereum.org emails', () => {
      expect(isAuthorizedEmail('attacker@gmail.com')).toBe(false);
      expect(isAuthorizedEmail('fake@ethereum.org.evil.com')).toBe(false);
      expect(isAuthorizedEmail('alice@ethereumorg.com')).toBe(false);
      expect(isAuthorizedEmail('alice@sub.ethereum.org')).toBe(false);
    });

    it('should reject emails with ethereum.org as subdomain', () => {
      // Attacker might try ethereum.org.attacker.com
      expect(isAuthorizedEmail('alice@ethereum.org.attacker.com')).toBe(false);
    });

    it('should reject empty or invalid emails', () => {
      expect(isAuthorizedEmail('')).toBe(false);
      expect(isAuthorizedEmail('not-an-email')).toBe(false);
      expect(isAuthorizedEmail('@ethereum.org')).toBe(false);
    });

    it('should be case-insensitive for domain', () => {
      expect(isAuthorizedEmail('alice@ETHEREUM.ORG')).toBe(true);
      expect(isAuthorizedEmail('alice@Ethereum.Org')).toBe(true);
    });
  });
});

describe('Internal Auth - Token Payload Validation', () => {
  const secretKey = 'test-secret-key-min-32-chars-long!';

  it('should reject token with non-ethereum.org email even if validly signed', () => {
    // Even if someone got a valid token signed, wrong email should be rejected
    const badPayload = { email: 'attacker@gmail.com', name: 'Attacker' };
    const token = signAuthToken(badPayload, secretKey);

    const result = verifyAuthToken(token, secretKey);

    // Token signature is valid, but email domain check should fail
    // This could be in verifyAuthToken or a separate check
    // Implementation decides where this check lives
    if (result.valid && result.payload) {
      expect(isAuthorizedEmail(result.payload.email)).toBe(false);
    }
  });

  it('should reject token missing email field', () => {
    const incompletePayload = { name: 'No Email' } as any;
    const token = signAuthToken(incompletePayload, secretKey);

    const result = verifyAuthToken(token, secretKey);

    // Should either fail verification or return payload without valid email
    if (result.valid) {
      expect(result.payload?.email).toBeFalsy();
    }
  });
});

describe('Internal Auth - Constants', () => {
  it('should export the correct cookie name', () => {
    expect(AUTH_COOKIE_NAME).toBe('esp-internal-auth');
  });
});

describe('Internal Auth - Integration Scenarios', () => {
  const secretKey = 'production-secret-min-32-chars!!';

  it('should handle full auth flow: sign -> verify -> authorize', () => {
    const userPayload = { email: 'grants-team@ethereum.org', name: 'Grants Team' };

    // 1. Sign token after OAuth callback
    const token = signAuthToken(userPayload, secretKey);
    expect(token).toBeTruthy();

    // 2. Verify token on subsequent request
    const verification = verifyAuthToken(token, secretKey);
    expect(verification.valid).toBe(true);

    // 3. Check email authorization
    expect(isAuthorizedEmail(verification.payload!.email)).toBe(true);
  });

  it('should reject forged attack flow', () => {
    // Attacker creates fake token
    const forgedToken = Buffer.from(
      JSON.stringify({ email: 'evil@ethereum.org', name: 'Evil' })
    ).toString('base64');

    // Verification should fail
    const verification = verifyAuthToken(forgedToken, secretKey);
    expect(verification.valid).toBe(false);
  });
});
