import { describe, it, expect } from 'vitest';

import { resolveAddressOrEns } from '../../lib/ens';

// Real ENS resolution hits external APIs (api.ensideas.com) and Ethereum RPC endpoints, so it's
// too slow/flaky for the default suite. Opt in with `RUN_ENS_NETWORK_TESTS=1 npm test` to verify
// resolution against live mainnet — useful when changing src/lib/ens.ts or debugging reports like
// "my subdomain.eth doesn't resolve".
const runNetwork = !!process.env.RUN_ENS_NETWORK_TESTS;

// Vitalik's well-known, stable address.
const VITALIK = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

describe.skipIf(!runNetwork)('resolveAddressOrEns (live network)', () => {
  it('resolves an apex .eth name', async () => {
    const result = await resolveAddressOrEns('vitalik.eth');
    expect(result.success).toBe(true);
    expect(result.inputType).toBe('ens');
    expect(result.address).toBe(VITALIK);
  });

  it('resolves a real subdomain (a.b.eth)', async () => {
    // 1.offchainexample.eth is a long-lived ENS subdomain used for resolution demos.
    const result = await resolveAddressOrEns('1.offchainexample.eth');
    expect(result.success).toBe(true);
    expect(result.inputType).toBe('ens');
    expect(result.address).toMatch(/^0x[0-9a-fA-F]{40}$/);
  });

  it('returns success: false for an unregistered name (no address record)', async () => {
    const result = await resolveAddressOrEns('pablo.eth.limo.eth');
    expect(result.success).toBe(false);
    expect(result.inputType).toBe('ens');
  });

  it('returns a checksummed address verbatim for a direct hex input (no network)', async () => {
    const result = await resolveAddressOrEns(VITALIK.toLowerCase());
    expect(result.success).toBe(true);
    expect(result.inputType).toBe('address');
    expect(result.address).toBe(VITALIK);
  });
});
