// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderForm } from '../helpers/test-utils';

// --- Mocks -----------------------------------------------------------------------------------
const { pushMock, resolveMock, fetchMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  resolveMock: vi.fn(),
  fetchMock: vi.fn()
}));

vi.mock('next/router', () => ({
  useRouter: () => ({ push: pushMock })
}));

vi.mock('../../lib/ens', () => ({
  resolveAddressOrEns: resolveMock,
  isAvatarSafe: () => false
}));

// hCaptcha renders an iframe/script in the browser; swap it for a ref-forwarding button stand-in.
vi.mock('@hcaptcha/react-hcaptcha', () => import('../helpers/MockHCaptcha'));

import { GranteeFinanceForm } from '../../components/forms/GranteeFinanceForm';
import { API_GRANTEE_FINANCE } from '../../components/forms/constants';
import { GRANTEE_FINANCE_THANK_YOU_PAGE_URL } from '../../constants';

const ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const ADDRESS_LOWER = ADDRESS.toLowerCase();

const okResponse = { ok: true, status: 200 } as Response;

// Reads the JSON body of the (single) fetch call the form made.
const submittedBody = (): Record<string, unknown> => {
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
  return JSON.parse(init.body as string);
};

// Types into a TextField looked up by its (required-asterisked) label.
const typeInto = async (user: ReturnType<typeof userEvent.setup>, label: RegExp, value: string) => {
  await user.type(screen.getByLabelText(label), value);
};

// Fills every required field with valid values. `skip` omits one field so a test can assert that a
// single missing/invalid field blocks submission. `walletValue` overrides the wallet input.
const fillValidForm = async (
  user: ReturnType<typeof userEvent.setup>,
  opts: { skip?: string; walletValue?: string; email?: string } = {}
) => {
  if (opts.skip !== 'beneficiaryName') await typeInto(user, /beneficiary name/i, 'Jane Doe');
  if (opts.skip !== 'contactEmail')
    await typeInto(user, /contact email/i, opts.email ?? 'jane@example.com');

  if (opts.skip !== 'walletAddress') {
    await user.type(screen.getByPlaceholderText('0x... or name.eth'), opts.walletValue ?? ADDRESS_LOWER);
  }

  if (opts.skip !== 'contractID') await typeInto(user, /contract id/i, '800000000000000001');
  if (opts.skip !== 'securityID') await typeInto(user, /security id/i, 'secret-123');
  if (opts.skip !== 'captcha') await user.click(screen.getByTestId('mock-hcaptcha'));
};

const submit = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /submit/i }));
};

beforeEach(() => {
  vi.clearAllMocks();
  fetchMock.mockResolvedValue(okResponse);
  vi.stubGlobal('fetch', fetchMock);
  // Default form's wallet field is exercised with hex addresses (no ENS round-trip), but mock a
  // sensible default in case a test uses an ENS name.
  resolveMock.mockResolvedValue({ success: true, address: ADDRESS, inputType: 'ens' });
});

describe('GranteeFinanceForm (default ETH) — successful submission', () => {
  it('sends the correct payload, hardcoding crypto/ETH, and redirects to the thank-you page', async () => {
    const { user } = renderForm(<GranteeFinanceForm />);

    await fillValidForm(user);
    // Wait for the wallet field to resolve before submitting.
    await screen.findByText('Valid address');
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(API_GRANTEE_FINANCE);
    expect(init.method).toBe('PUT');

    const body = submittedBody();
    expect(body).toMatchObject({
      paymentPreference: 'Cryptocurrency',
      token: 'ETH',
      beneficiaryName: 'Jane Doe',
      contactEmail: 'jane@example.com',
      walletAddress: ADDRESS_LOWER,
      walletAddressResolved: ADDRESS, // checksummed by the wallet input
      walletAddressInputType: 'address',
      isCentralizedExchange: false, // 'No' default, converted to boolean by the api layer
      contractID: '800000000000000001',
      securityID: 'secret-123',
      captchaToken: 'test-captcha-token'
    });

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith(GRANTEE_FINANCE_THANK_YOU_PAGE_URL));
  });

  it('submits isCentralizedExchange as true when the grantee selects "Yes"', async () => {
    const { user } = renderForm(<GranteeFinanceForm />);

    await fillValidForm(user);
    await screen.findByText('Valid address');
    await user.click(screen.getByLabelText('Yes'));
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(submittedBody().isCentralizedExchange).toBe(true);
  });

  it('submits an ENS name with its resolved address and inputType "ens"', async () => {
    resolveMock.mockResolvedValue({ success: true, address: ADDRESS, inputType: 'ens' });
    const { user } = renderForm(<GranteeFinanceForm />);

    await fillValidForm(user, { walletValue: 'vitalik.eth' });
    await screen.findByText(/Resolved:/);
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = submittedBody();
    expect(body.walletAddress).toBe('vitalik.eth');
    expect(body.walletAddressResolved).toBe(ADDRESS);
    expect(body.walletAddressInputType).toBe('ens');
  });
});

describe('GranteeFinanceForm (default ETH) — required fields block submission', () => {
  it.each([
    ['beneficiary name', 'beneficiaryName'],
    ['contact email', 'contactEmail'],
    ['wallet address', 'walletAddress'],
    ['contract ID', 'contractID'],
    ['security ID', 'securityID'],
    ['captcha', 'captcha']
  ])('does not submit when %s is missing', async (_label, skip) => {
    const { user } = renderForm(<GranteeFinanceForm />);

    await fillValidForm(user, { skip });
    if (skip !== 'walletAddress') await screen.findByText('Valid address');
    await submit(user);

    // Give any async submit a chance to (not) fire.
    await new Promise(r => setTimeout(r, 100));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('does not submit a completely empty form', async () => {
    const { user } = renderForm(<GranteeFinanceForm />);

    await submit(user);

    await new Promise(r => setTimeout(r, 100));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });
});

describe('GranteeFinanceForm (default ETH) — invalid field values block submission', () => {
  it('blocks submission on an invalid email', async () => {
    const { user } = renderForm(<GranteeFinanceForm />);

    await fillValidForm(user, { email: 'not-an-email' });
    await screen.findByText('Valid address');
    await submit(user);

    await waitFor(() => expect(screen.getByText('Invalid email address')).toBeInTheDocument());
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('blocks submission when the wallet address never resolves', async () => {
    resolveMock.mockResolvedValue({ success: false, error: 'ENS name not found', inputType: 'ens' });
    const { user } = renderForm(<GranteeFinanceForm />);

    await fillValidForm(user, { walletValue: 'not-registered.eth' });
    await screen.findByText('Enter a valid address (0x...) or ENS name');
    await submit(user);

    await new Promise(r => setTimeout(r, 100));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('GranteeFinanceForm (default ETH) — submission failures', () => {
  it('does not redirect when the server responds with an error', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 } as Response);
    const { user } = renderForm(<GranteeFinanceForm />);

    await fillValidForm(user);
    await screen.findByText('Valid address');
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await new Promise(r => setTimeout(r, 100));
    expect(pushMock).not.toHaveBeenCalled();
  });
});
