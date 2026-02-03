import type { NextApiRequest, NextApiResponse } from 'next';
import { getActiveRounds } from '../../lib/rounds';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const activeRounds = getActiveRounds();

  // Cache for 1 hour (same as ISR revalidation)
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).json(activeRounds);
}
