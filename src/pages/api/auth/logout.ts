import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Clear the auth cookie
  res.setHeader(
    'Set-Cookie',
    'esp-internal-auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
  );

  res.redirect('/grants');
}
