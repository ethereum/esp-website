// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithChakra } from '../helpers/test-utils';

// Control ENS resolution so the tests are deterministic and offline. Direct hex addresses do NOT
// go through here — the component resolves them synchronously with viem — so a call to this mock is
// itself a signal that the input was treated as an ENS name.
const { resolveMock } = vi.hoisted(() => ({ resolveMock: vi.fn() }));
vi.mock('../../lib/ens', () => ({
  resolveAddressOrEns: resolveMock,
  isAvatarSafe: () => false
}));

import { WalletAddressInput } from '../../components/forms/fields';

// A valid EIP-55 checksummed address (vitalik.eth) and a second distinct address for subdomains.
const ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const SUBDOMAIN_ADDRESS = '0x983110309620D911731Ac0932219af06091b6744';
// Lowercased so we can assert the component checksums it on the way into the form.
const ADDRESS_LOWER = ADDRESS.toLowerCase();

// Captures live form values so assertions can read the hidden walletAddress* fields the component
// writes via setValue.
let latestValues: Record<string, unknown> = {};

const Harness: FC = () => {
  const methods = useForm({ mode: 'all' });
  latestValues = methods.watch();
  return (
    <FormProvider {...methods}>
      <WalletAddressInput id='walletAddress' label='Wallet Address' />
    </FormProvider>
  );
};

const setup = () => {
  const user = userEvent.setup();
  renderWithChakra(<Harness />);
  const input = screen.getByPlaceholderText('0x... or name.eth') as HTMLInputElement;
  return { user, input };
};

beforeEach(() => {
  vi.clearAllMocks();
  latestValues = {};
});

describe('WalletAddressInput — direct hex addresses', () => {
  it('accepts a valid address, checksums it, and stores inputType "address" without calling ENS', async () => {
    const { user, input } = setup();

    await user.type(input, ADDRESS_LOWER);

    expect(await screen.findByText('Valid address')).toBeInTheDocument();
    await waitFor(() => {
      expect(latestValues.walletAddressResolved).toBe(ADDRESS); // checksummed
    });
    expect(latestValues.walletAddress).toBe(ADDRESS_LOWER); // raw input preserved
    expect(latestValues.walletAddressInputType).toBe('address');
    expect(resolveMock).not.toHaveBeenCalled();
  });

  it('treats a malformed 0x string as invalid input', async () => {
    const { user, input } = setup();

    await user.type(input, '0x123');

    expect(
      await screen.findByText('Enter a valid address (0x...) or ENS name')
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(latestValues.walletAddressResolved).toBe('');
    });
    expect(latestValues.walletAddressInputType).toBe('');
  });
});

describe('WalletAddressInput — ENS names', () => {
  it('resolves a top-level .eth name and stores inputType "ens"', async () => {
    resolveMock.mockResolvedValue({ success: true, address: ADDRESS, inputType: 'ens' });
    const { user, input } = setup();

    await user.type(input, 'vitalik.eth');

    expect(await screen.findByText(/Resolved:/)).toBeInTheDocument();
    expect(resolveMock).toHaveBeenCalledWith('vitalik.eth');
    await waitFor(() => {
      expect(latestValues.walletAddressResolved).toBe(ADDRESS);
    });
    expect(latestValues.walletAddress).toBe('vitalik.eth');
    expect(latestValues.walletAddressInputType).toBe('ens');
  });

  // NOTE: resolution is mocked here — this only proves the component sends a multi-label name to
  // the resolver and stores its result. Whether real subdomains actually resolve on-chain is
  // covered by the network-gated unit test in src/__tests__/lib/ens.test.ts.
  it('treats a multi-label subdomain (a.b.eth) as an ENS lookup and stores the resolved address', async () => {
    resolveMock.mockResolvedValue({ success: true, address: SUBDOMAIN_ADDRESS, inputType: 'ens' });
    const { user, input } = setup();

    // A real, resolvable subdomain — used as a realistic fixture (resolution is still mocked).
    await user.type(input, '1.offchainexample.eth');

    expect(await screen.findByText(/Resolved:/)).toBeInTheDocument();
    expect(resolveMock).toHaveBeenCalledWith('1.offchainexample.eth');
    await waitFor(() => {
      expect(latestValues.walletAddressResolved).toBe(SUBDOMAIN_ADDRESS);
    });
    expect(latestValues.walletAddressInputType).toBe('ens');
  });

  it('shows an error and clears the resolved value when an ENS name cannot be resolved', async () => {
    resolveMock.mockResolvedValue({
      success: false,
      error: 'ENS name not found',
      inputType: 'ens'
    });
    const { user, input } = setup();

    await user.type(input, 'definitely-not-registered.eth');

    expect(
      await screen.findByText('Enter a valid address (0x...) or ENS name')
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(latestValues.walletAddressResolved).toBe('');
    });
    expect(latestValues.walletAddressInputType).toBe('');
  });

  it('surfaces a network-error message when ENS resolution throws', async () => {
    resolveMock.mockRejectedValue(new Error('boom'));
    const { user, input } = setup();

    await user.type(input, 'vitalik.eth');

    expect(await screen.findByText('Network error - please try again')).toBeInTheDocument();
    await waitFor(() => {
      expect(latestValues.walletAddressResolved).toBe('');
    });
  });
});

describe('WalletAddressInput — empty / cleared input', () => {
  it('leaves the resolved value empty for whitespace-only input and does not call ENS', async () => {
    const { user, input } = setup();

    await user.type(input, '   ');

    await waitFor(() => {
      expect(latestValues.walletAddressResolved).toBe('');
    });
    expect(latestValues.walletAddressInputType).toBe('');
    expect(resolveMock).not.toHaveBeenCalled();
  });

  it('clears a previously-resolved address when the input is emptied', async () => {
    const { user, input } = setup();

    await user.type(input, ADDRESS_LOWER);
    await waitFor(() => expect(latestValues.walletAddressResolved).toBe(ADDRESS));

    await user.clear(input);
    await waitFor(() => expect(latestValues.walletAddressResolved).toBe(''));
    expect(latestValues.walletAddressInputType).toBe('');
  });
});

// The bare harness above has no resolver, so the schema-level "required" error never fires. These
// tests wire a zodResolver (mirroring how the real forms validate walletAddressResolved) to cover
// when the required message should and shouldn't surface.
const REQUIRED_MESSAGE = 'Wallet address is required';

const schema = z.object({
  walletAddress: z.string(),
  walletAddressResolved: z.string().min(1, REQUIRED_MESSAGE),
  walletAddressInputType: z.string()
});

const SchemaHarness: FC = () => {
  const methods = useForm({ resolver: zodResolver(schema), mode: 'all' });
  return (
    <FormProvider {...methods}>
      <WalletAddressInput id='walletAddress' label='Wallet Address' />
    </FormProvider>
  );
};

const setupWithSchema = () => {
  const user = userEvent.setup();
  renderWithChakra(<SchemaHarness />);
  const input = screen.getByPlaceholderText('0x... or name.eth') as HTMLInputElement;
  return { user, input };
};

describe('WalletAddressInput — required-error timing (regression)', () => {
  // Regression: while an ENS name was resolving, walletAddressResolved is briefly empty, which used
  // to flash "Wallet address is required" under a field the user had just filled.
  it('does not show the "required" error while an ENS name is resolving', async () => {
    let completeResolution!: (value: unknown) => void;
    resolveMock.mockReturnValue(new Promise(resolve => (completeResolution = resolve)));
    const { user, input } = setupWithSchema();

    await user.type(input, 'vitalik.eth');

    // Resolution is in flight (promise still pending): no "required" error should be shown.
    await waitFor(() => expect(resolveMock).toHaveBeenCalledWith('vitalik.eth'));
    expect(screen.queryByText(REQUIRED_MESSAGE)).not.toBeInTheDocument();

    // Once it resolves, the green confirmation shows and the error stays hidden.
    completeResolution({ success: true, address: ADDRESS, inputType: 'ens' });
    expect(await screen.findByText(/Resolved:/)).toBeInTheDocument();
    expect(screen.queryByText(REQUIRED_MESSAGE)).not.toBeInTheDocument();
  });

  it('still shows the "required" error once the box is emptied after typing', async () => {
    resolveMock.mockResolvedValue({ success: true, address: ADDRESS, inputType: 'ens' });
    const { user, input } = setupWithSchema();

    await user.type(input, 'vitalik.eth');
    await screen.findByText(/Resolved:/);

    await user.clear(input);

    expect(await screen.findByText(REQUIRED_MESSAGE)).toBeInTheDocument();
  });
});
