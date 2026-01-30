import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, error } = req.query;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Handle OAuth errors (e.g., user denied consent)
  if (error) {
    return res.redirect('/grants/internal/unauthorized?error=oauth_denied');
  }

  if (!code || typeof code !== 'string') {
    return res.redirect('/grants/internal/unauthorized?error=no_code');
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${baseUrl}/api/auth/callback`,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenRes.ok) {
      console.error('Token exchange failed:', await tokenRes.text());
      return res.redirect('/grants/internal/unauthorized?error=token_exchange');
    }

    const { access_token } = await tokenRes.json();

    // Get user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    if (!userRes.ok) {
      console.error('User info fetch failed:', await userRes.text());
      return res.redirect('/grants/internal/unauthorized?error=user_info');
    }

    const user = await userRes.json();

    // Verify domain
    if (!user.email?.endsWith('@ethereum.org')) {
      return res.redirect('/grants/internal/unauthorized?error=invalid_domain');
    }

    // Set auth cookie (httpOnly, secure in production, 7 days)
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieValue = Buffer.from(
      JSON.stringify({ email: user.email, name: user.name })
    ).toString('base64');

    res.setHeader(
      'Set-Cookie',
      `esp-internal-auth=${cookieValue}; HttpOnly; ${isProduction ? 'Secure; ' : ''}Path=/; Max-Age=604800; SameSite=Lax`
    );

    res.redirect('/grants/internal');
  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.redirect('/grants/internal/unauthorized?error=unknown');
  }
}
