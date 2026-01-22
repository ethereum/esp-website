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

// Private RPC with fallbacks for reliability and privacy
const transport = fallback([
  http('https://cloudflare-eth.com'), // Privacy-focused
  http('https://eth.llamarpc.com'), // Fallback
  http(), // Public RPC last resort
]);

export const publicClient = createPublicClient({
  chain: mainnet,
  transport,
  batch: { multicall: true },
});

const ENS_TIMEOUT_MS = 10000;

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

export async function resolveAddressOrEns(
  input: string
): Promise<EnsResolutionResult> {
  const trimmed = input.trim();

  if (!trimmed) {
    return { success: false, error: 'Empty input', inputType: 'invalid' };
  }

  // Direct hex address
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

      // Resolution with timeout
      const address = await Promise.race([
        publicClient.getEnsAddress({ name: normalized }),
        new Promise<null>((_, reject) =>
          setTimeout(
            () => reject(new Error('ENS resolution timeout')),
            ENS_TIMEOUT_MS
          )
        ),
      ]);

      if (address) {
        // Fetch avatar (non-blocking, best-effort)
        let avatar: string | undefined;
        try {
          const avatarUrl = await publicClient.getEnsAvatar({
            name: normalized,
          });
          if (avatarUrl && isAvatarSafe(avatarUrl)) {
            avatar = avatarUrl;
          }
        } catch {
          // Avatar fetch failed, continue without it
        }
        return { success: true, address, avatar, inputType: 'ens' };
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
