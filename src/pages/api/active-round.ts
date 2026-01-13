import type { NextApiRequest, NextApiResponse } from 'next';
import { getActiveRounds } from '../../lib/rounds';
import { RoundFrontmatter } from '../../types';

type ResponseData = {
  round: RoundFrontmatter | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const activeRounds = getActiveRounds();

  // Return the first active round (assuming only one round is active at a time)
  const round = activeRounds.length > 0 ? activeRounds[0] : null;

  // Cache for 5 minutes
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  res.status(200).json({ round });
}
