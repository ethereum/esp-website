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

import { GranteeFinanceExceptionForm } from '../../components/forms/GranteeFinanceExceptionForm';
import { API_GRANTEE_FINANCE } from '../../components/forms/constants';
import { GRANTEE_FINANCE_THANK_YOU_PAGE_URL } from '../../constants';

const ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const ADDRESS_LOWER = ADDRESS.toLowerCase();

type User = ReturnType<typeof userEvent.setup>;

const submittedBody = (): Record<string, unknown> => {
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
  return JSON.parse(init.body as string);
};

const chooseStablecoin = (user: User) => user.click(screen.getByText('Receive Stablecoin'));
const chooseFiat = (user: User) => user.click(screen.getByText('Receive Fiat'));

const typeInto = async (user: User, label: RegExp, value: string) => {
  await user.type(screen.getByLabelText(label), value);
};

// Shared contact + record block present on both payment paths.
const fillCommonFields = async (user: User) => {
  await typeInto(user, /beneficiary name/i, 'Jane Doe');
  await typeInto(user, /contact email/i, 'jane@example.com');
  await typeInto(user, /contract id/i, '800000000000000001');
  await typeInto(user, /security id/i, 'secret-123');
  await user.click(screen.getByTestId('mock-hcaptcha'));
};

const submit = (user: User) => user.click(screen.getByRole('button', { name: /submit/i }));

beforeEach(() => {
  vi.clearAllMocks();
  fetchMock.mockResolvedValue({ ok: true, status: 200 } as Response);
  vi.stubGlobal('fetch', fetchMock);
  resolveMock.mockResolvedValue({ success: true, address: ADDRESS, inputType: 'ens' });
});

describe('GranteeFinanceExceptionForm — payment preference gating', () => {
  it('does not submit until a payment preference is selected', async () => {
    renderForm(<GranteeFinanceExceptionForm />);

    // No preference picked: the submit button (and the rest of the form) is hidden. waitFor flushes
    // the post-mount effects (Fade transitions, field setValue) inside act so they don't warn.
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument()
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('GranteeFinanceExceptionForm — stablecoin (DAI) submission', () => {
  it('sends only crypto fields, hardcoding token DAI, and redirects on success', async () => {
    const { user } = renderForm(<GranteeFinanceExceptionForm />);

    await chooseStablecoin(user);
    await fillCommonFields(user);
    await user.type(screen.getByPlaceholderText('0x... or name.eth'), ADDRESS_LOWER);
    await screen.findByText('Valid address');
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(API_GRANTEE_FINANCE);
    expect(init.method).toBe('PUT');

    const body = submittedBody();
    expect(body).toMatchObject({
      paymentPreference: 'Cryptocurrency',
      token: 'DAI',
      beneficiaryName: 'Jane Doe',
      contactEmail: 'jane@example.com',
      walletAddress: ADDRESS_LOWER,
      walletAddressResolved: ADDRESS,
      walletAddressInputType: 'address',
      isCentralizedExchange: false, // default 'No' → boolean
      contractID: '800000000000000001',
      securityID: 'secret-123',
      captchaToken: 'test-captcha-token'
    });

    // Fiat-only keys must not leak into a crypto submission.
    expect(body).not.toHaveProperty('beneficiaryAddress');
    expect(body).not.toHaveProperty('bankName');
    expect(body).not.toHaveProperty('bankAddress');
    expect(body).not.toHaveProperty('IBAN');
    expect(body).not.toHaveProperty('SWIFTCode');
    expect(body).not.toHaveProperty('fiatCurrencyCode');

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith(GRANTEE_FINANCE_THANK_YOU_PAGE_URL));
  });

  it('resolves and submits an ENS wallet address', async () => {
    const { user } = renderForm(<GranteeFinanceExceptionForm />);

    await chooseStablecoin(user);
    await fillCommonFields(user);
    await user.type(screen.getByPlaceholderText('0x... or name.eth'), 'vitalik.eth');
    await screen.findByText(/Resolved:/);
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = submittedBody();
    expect(body.walletAddress).toBe('vitalik.eth');
    expect(body.walletAddressResolved).toBe(ADDRESS);
    expect(body.walletAddressInputType).toBe('ens');
  });

  it('does not submit when the wallet address is missing', async () => {
    const { user } = renderForm(<GranteeFinanceExceptionForm />);

    await chooseStablecoin(user);
    await fillCommonFields(user);
    await submit(user);

    await new Promise(r => setTimeout(r, 100));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('GranteeFinanceExceptionForm — fiat submission', () => {
  const fillFiatFields = async (user: User) => {
    await typeInto(user, /beneficiary address/i, '100 Main St, Chicago, IL');
    await typeInto(user, /bank name/i, 'Acme Bank');
    await typeInto(user, /bank address/i, '200 Bank St, New York, NY');
    await typeInto(user, /international bank account number/i, 'DE89370400440532013000');
    await typeInto(user, /bank swift code/i, 'DEUTDEFF');
    await typeInto(user, /fiat currency code/i, 'USD');
  };

  it('sends only fiat fields and no wallet/crypto keys', async () => {
    const { user } = renderForm(<GranteeFinanceExceptionForm />);

    await chooseFiat(user);
    await fillCommonFields(user);
    await fillFiatFields(user);
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const body = submittedBody();
    expect(body).toMatchObject({
      paymentPreference: 'Fiat',
      beneficiaryName: 'Jane Doe',
      contactEmail: 'jane@example.com',
      beneficiaryAddress: '100 Main St, Chicago, IL',
      bankName: 'Acme Bank',
      bankAddress: '200 Bank St, New York, NY',
      IBAN: 'DE89370400440532013000',
      SWIFTCode: 'DEUTDEFF',
      fiatCurrencyCode: 'USD',
      contractID: '800000000000000001',
      securityID: 'secret-123',
      captchaToken: 'test-captcha-token'
    });

    // Crypto-only keys must not leak into a fiat submission.
    expect(body).not.toHaveProperty('walletAddress');
    expect(body).not.toHaveProperty('walletAddressResolved');
    expect(body).not.toHaveProperty('walletAddressInputType');

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith(GRANTEE_FINANCE_THANK_YOU_PAGE_URL));
  });

  it('does not submit when a required fiat field (IBAN) is missing', async () => {
    const { user } = renderForm(<GranteeFinanceExceptionForm />);

    await chooseFiat(user);
    await fillCommonFields(user);
    await typeInto(user, /beneficiary address/i, '100 Main St, Chicago, IL');
    await typeInto(user, /bank name/i, 'Acme Bank');
    await typeInto(user, /bank address/i, '200 Bank St, New York, NY');
    await typeInto(user, /bank swift code/i, 'DEUTDEFF');
    await typeInto(user, /fiat currency code/i, 'USD');
    // IBAN intentionally left empty.
    await submit(user);

    await new Promise(r => setTimeout(r, 100));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('blocks submission on an invalid email', async () => {
    const { user } = renderForm(<GranteeFinanceExceptionForm />);

    await chooseFiat(user);
    await typeInto(user, /beneficiary name/i, 'Jane Doe');
    await typeInto(user, /contact email/i, 'not-an-email');
    await typeInto(user, /contract id/i, '800000000000000001');
    await typeInto(user, /security id/i, 'secret-123');
    await user.click(screen.getByTestId('mock-hcaptcha'));
    await fillFiatFields(user);
    await submit(user);

    await waitFor(() => expect(screen.getByText('Invalid email address')).toBeInTheDocument());
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('GranteeFinanceExceptionForm — switching payment preference', () => {
  it('clears the wallet address when switching from stablecoin to fiat', async () => {
    const { user } = renderForm(<GranteeFinanceExceptionForm />);

    await chooseStablecoin(user);
    await user.type(screen.getByPlaceholderText('0x... or name.eth'), ADDRESS_LOWER);
    await screen.findByText('Valid address');

    // Switch to fiat, then fill the fiat path completely.
    await chooseFiat(user);
    await fillCommonFields(user);
    await typeInto(user, /beneficiary address/i, '100 Main St');
    await typeInto(user, /bank name/i, 'Acme Bank');
    await typeInto(user, /bank address/i, '200 Bank St');
    await typeInto(user, /international bank account number/i, 'DE89370400440532013000');
    await typeInto(user, /bank swift code/i, 'DEUTDEFF');
    await typeInto(user, /fiat currency code/i, 'USD');
    await submit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = submittedBody();
    expect(body.paymentPreference).toBe('Fiat');
    expect(body).not.toHaveProperty('walletAddress');
  });
});
