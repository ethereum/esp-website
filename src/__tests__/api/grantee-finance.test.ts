import { describe, it, expect, beforeEach, vi } from 'vitest';

import type { GranteeFinanceNextApiRequest } from '../../types';

// Asserts the SF Contract update payload, focusing on the crypto/fiat presence guards.
const { getConnectionMock, retrieveMock, updateMock, resolveMock } = vi.hoisted(() => ({
  getConnectionMock: vi.fn(),
  retrieveMock: vi.fn(),
  updateMock: vi.fn(),
  resolveMock: vi.fn()
}));

// Pass middlewares through so the default export is the raw handler.
vi.mock('../../middlewares', () => ({
  sanitizeFields: (handler: unknown) => handler,
  verifyCaptcha: (handler: unknown) => handler,
  multipartyParse: (handler: unknown) => handler
}));

vi.mock('../../lib/sf', () => ({
  getAuthenticatedConnection: getConnectionMock
}));

vi.mock('../../lib/ens', () => ({
  resolveAddressOrEns: resolveMock
}));

import handler from '../../pages/api/grantee-finance';

// Valid EIP-55 checksummed address (vitalik.eth).
const ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

const COMMON = {
  beneficiaryName: 'Jane Doe',
  contactEmail: 'jane@example.com',
  notes: 'please confirm',
  contractID: '800000000000000001',
  securityID: 'secret-123',
  captchaToken: 'test-token'
};

const createRes = () => {
  const res: {
    statusCode: number;
    body: unknown;
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  } = {
    statusCode: 200,
    body: undefined,
    status: vi.fn((code: number) => {
      res.statusCode = code;
      return res;
    }),
    json: vi.fn((payload: unknown) => {
      res.body = payload;
      return res;
    })
  };
  return res;
};

const invoke = async (body: Record<string, unknown>) => {
  const req = { body } as unknown as GranteeFinanceNextApiRequest;
  const res = createRes();
  await handler(req, res as never);
  return res;
};

const lastPayload = (): Record<string, unknown> => {
  expect(updateMock).toHaveBeenCalledTimes(1);
  return updateMock.mock.calls[0][0] as Record<string, unknown>;
};

beforeEach(() => {
  vi.clearAllMocks();
  retrieveMock.mockResolvedValue({ Security_ID__c: 'secret-123' });
  updateMock.mockResolvedValue({ success: true });
  getConnectionMock.mockResolvedValue({
    sobject: () => ({ retrieve: retrieveMock, update: updateMock })
  });
});

describe('grantee-finance handler — default ETH (crypto) submission', () => {
  const ethBody = {
    ...COMMON,
    paymentPreference: 'Cryptocurrency',
    walletAddress: ADDRESS,
    walletAddressResolved: ADDRESS,
    walletAddressInputType: 'address',
    token: 'ETH',
    isCentralizedExchange: false
  };

  it('writes crypto fields with the network hardcoded to Ethereum Mainnet', async () => {
    const res = await invoke(ethBody);

    expect(res.statusCode).toBe(200);
    const payload = lastPayload();
    expect(payload.Contract_Wallet_Address__c).toBe(ADDRESS);
    expect(payload.Contract_Token__c).toBe('ETH');
    expect(payload.Contract_Network__c).toBe('Ethereum Mainnet');
    expect(payload.Centralized_Exchange_Address__c).toBe(false);
  });

  it('does NOT write any fiat fields', async () => {
    await invoke(ethBody);

    const payload = lastPayload();
    expect(payload).not.toHaveProperty('Beneficiary_Address__c');
    expect(payload).not.toHaveProperty('Bank_Name__c');
    expect(payload).not.toHaveProperty('Bank_Address__c');
    expect(payload).not.toHaveProperty('IBAN_Account_Number__c');
    expect(payload).not.toHaveProperty('SWIFT_Code_BIC__c');
    expect(payload).not.toHaveProperty('Fiat_Currency__c');
  });

  it('always writes the common fields', async () => {
    await invoke(ethBody);

    const payload = lastPayload();
    expect(payload.Id).toBe(COMMON.contractID);
    expect(payload.Beneficiary_Name__c).toBe('Jane Doe');
    expect(payload.User_Email__c).toBe('jane@example.com');
    expect(payload.Transfer_Notes__c).toBe('please confirm');
    expect(payload.Contract_Payment_Method__c).toBe('Cryptocurrency');
  });
});

describe('grantee-finance handler — exception form, stablecoin (DAI) submission', () => {
  const daiBody = {
    ...COMMON,
    paymentPreference: 'Cryptocurrency',
    walletAddress: ADDRESS,
    walletAddressResolved: ADDRESS,
    walletAddressInputType: 'address',
    token: 'DAI',
    isCentralizedExchange: true
  };

  it('writes DAI token on Ethereum Mainnet and no fiat fields', async () => {
    const res = await invoke(daiBody);

    expect(res.statusCode).toBe(200);
    const payload = lastPayload();
    expect(payload.Contract_Token__c).toBe('DAI');
    expect(payload.Contract_Network__c).toBe('Ethereum Mainnet');
    expect(payload.Centralized_Exchange_Address__c).toBe(true);
    expect(payload).not.toHaveProperty('Bank_Name__c');
    expect(payload).not.toHaveProperty('IBAN_Account_Number__c');
  });
});

describe('grantee-finance handler — exception form, fiat submission', () => {
  const fiatBody = {
    ...COMMON,
    paymentPreference: 'Fiat',
    beneficiaryAddress: '100 Main St, Chicago, IL',
    fiatCurrencyCode: 'USD',
    bankName: 'Acme Bank',
    bankAddress: '200 Bank St, New York, NY',
    IBAN: 'DE89370400440532013000',
    SWIFTCode: 'DEUTDEFF'
  };

  it('writes fiat fields', async () => {
    const res = await invoke(fiatBody);

    expect(res.statusCode).toBe(200);
    const payload = lastPayload();
    expect(payload.Beneficiary_Address__c).toBe('100 Main St, Chicago, IL');
    expect(payload.Fiat_Currency__c).toBe('USD');
    expect(payload.Bank_Name__c).toBe('Acme Bank');
    expect(payload.Bank_Address__c).toBe('200 Bank St, New York, NY');
    expect(payload.IBAN_Account_Number__c).toBe('DE89370400440532013000');
    expect(payload.SWIFT_Code_BIC__c).toBe('DEUTDEFF');
    expect(payload.Contract_Payment_Method__c).toBe('Fiat');
  });

  it('does NOT write any crypto fields (including centralized exchange)', async () => {
    await invoke(fiatBody);

    const payload = lastPayload();
    expect(payload).not.toHaveProperty('Contract_Wallet_Address__c');
    expect(payload).not.toHaveProperty('Contract_Token__c');
    expect(payload).not.toHaveProperty('Contract_Network__c');
    expect(payload).not.toHaveProperty('ENS__c');
    expect(payload).not.toHaveProperty('Centralized_Exchange_Address__c');
  });
});

describe('grantee-finance handler — ENS resolution', () => {
  const ensBody = {
    ...COMMON,
    paymentPreference: 'Cryptocurrency',
    walletAddress: 'vitalik.eth',
    walletAddressResolved: ADDRESS,
    walletAddressInputType: 'ens',
    token: 'ETH',
    isCentralizedExchange: false
  };

  it('re-verifies the ENS server-side and stores the ENS name', async () => {
    resolveMock.mockResolvedValue({ success: true, address: ADDRESS });

    const res = await invoke(ensBody);

    expect(res.statusCode).toBe(200);
    expect(resolveMock).toHaveBeenCalledWith('vitalik.eth');
    const payload = lastPayload();
    expect(payload.Contract_Wallet_Address__c).toBe(ADDRESS);
    expect(payload.ENS__c).toBe('vitalik.eth');
  });

  it('rejects with 400 when server-side resolution mismatches the client', async () => {
    resolveMock.mockResolvedValue({
      success: true,
      address: '0x0000000000000000000000000000000000000001'
    });

    const res = await invoke(ensBody);

    expect(res.statusCode).toBe(400);
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('rejects with 400 on an invalid wallet address input type', async () => {
    const res = await invoke({ ...ensBody, walletAddressInputType: 'malicious' });

    expect(res.statusCode).toBe(400);
    expect(updateMock).not.toHaveBeenCalled();
  });
});

describe('grantee-finance handler — Contract/Security validation', () => {
  const fiatBody = {
    ...COMMON,
    paymentPreference: 'Fiat',
    beneficiaryAddress: '100 Main St',
    fiatCurrencyCode: 'USD',
    bankName: 'Acme Bank',
    bankAddress: '200 Bank St',
    IBAN: 'DE89370400440532013000',
    SWIFTCode: 'DEUTDEFF'
  };

  it('returns 404 when the Contract ID is not found', async () => {
    retrieveMock.mockRejectedValue(new Error('not found'));

    const res = await invoke(fiatBody);

    expect(res.statusCode).toBe(404);
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('returns 404 when the Security ID does not match', async () => {
    retrieveMock.mockResolvedValue({ Security_ID__c: 'a-different-secret' });

    const res = await invoke(fiatBody);

    expect(res.statusCode).toBe(404);
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('returns 500 when Salesforce authentication fails', async () => {
    getConnectionMock.mockRejectedValue(new Error('auth failed'));

    const res = await invoke(fiatBody);

    expect(res.statusCode).toBe(500);
    expect(updateMock).not.toHaveBeenCalled();
  });
});
