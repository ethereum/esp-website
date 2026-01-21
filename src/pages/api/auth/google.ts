import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/auth/callback`,
    response_type: 'code',
    scope: 'email profile',
    hd: 'ethereum.org' // Restrict to ethereum.org domain
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
