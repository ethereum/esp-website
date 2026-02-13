import {
  createPublicClient,
  http,
  isAddress,
  getAddress,
  fallback,
  type Address,
} from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

// RPC fallback for when metadata API fails
const transport = fallback([
  http('https://eth.drpc.org'),
  http('https://rpc.ankr.com/eth'),
  http('https://cloudflare-eth.com'),
]);

export const publicClient = createPublicClient({
  chain: mainnet,
  transport,
  batch: { multicall: true },
});

const ENS_TIMEOUT_MS = 4000;

export interface EnsResolutionResult {
  success: boolean;
  address?: Address;
  avatar?: string;
  error?: string;
  inputType: 'address' | 'ens' | 'invalid';
}

// Avatar URL validation - whitelist known providers
const ALLOWED_AVATAR_HOSTS = [
  'metadata.ens.domains',
  'i.imgur.com',
  'ipfs.io',
  'cloudflare-ipfs.com',
  'euc.li',
];

export function isAvatarSafe(url: string): boolean {
  try {
    const { hostname, protocol } = new URL(url);
    if (protocol !== 'https:') return false;
    return ALLOWED_AVATAR_HOSTS.some(
      host => hostname === host || hostname.endsWith('.' + host)
    );
  } catch {
    return false;
  }
}

// Fast path: Use ENS APIs (much faster than RPC)
async function resolveViaApi(name: string): Promise<{ address: Address; avatar?: string } | null> {
  try {
    // Run address and avatar checks in parallel
    const [addrResponse, avatarResponse] = await Promise.all([
      fetch(`https://api.ensideas.com/ens/resolve/${name}`, {
        signal: AbortSignal.timeout(2000)
      }),
      fetch(`https://metadata.ens.domains/mainnet/avatar/${name}`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(2000)
      }).catch(() => null), // Don't fail if avatar check fails
    ]);

    if (addrResponse.ok) {
      const data = await addrResponse.json();
      if (data.address && isAddress(data.address)) {
        return {
          address: getAddress(data.address),
          avatar: avatarResponse?.ok ? `https://metadata.ens.domains/mainnet/avatar/${name}` : undefined,
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Slow path: Direct RPC resolution
async function resolveViaRpc(name: string): Promise<{ address: Address; avatar?: string } | null> {
  const address = await Promise.race([
    publicClient.getEnsAddress({ name }),
    new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ENS_TIMEOUT_MS)
    ),
  ]);

  if (!address) return null;

  // Quick avatar check with short timeout
  let avatar: string | undefined;
  try {
    const avatarUrl = await Promise.race([
      publicClient.getEnsAvatar({ name }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500)),
    ]);
    if (avatarUrl && isAvatarSafe(avatarUrl)) {
      avatar = avatarUrl;
    }
  } catch {
    // Avatar fetch failed, continue without
  }

  return { address, avatar };
}

export async function resolveAddressOrEns(
  input: string
): Promise<EnsResolutionResult> {
  const trimmed = input.trim();

  if (!trimmed) {
    return { success: false, error: 'Empty input', inputType: 'invalid' };
  }

  // Direct hex address - instant
  if (isAddress(trimmed)) {
    return {
      success: true,
      address: getAddress(trimmed),
      inputType: 'address',
    };
  }

  // Potential ENS name
  if (trimmed.includes('.')) {
    try {
      const normalized = normalize(trimmed);

      // Try fast API first, fall back to RPC
      const result = await resolveViaApi(normalized)
        || await resolveViaRpc(normalized);

      if (result) {
        return {
          success: true,
          address: result.address,
          avatar: result.avatar,
          inputType: 'ens'
        };
      }
      return { success: false, error: 'ENS name not found', inputType: 'ens' };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'ENS resolution failed';
      return { success: false, error: message, inputType: 'ens' };
    }
  }

  return { success: false, error: 'Invalid address format', inputType: 'invalid' };
}
