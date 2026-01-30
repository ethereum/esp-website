import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/grants/internal')) {
    const token = request.cookies.get('esp-internal-auth');
    if (!token) {
      return NextResponse.redirect(new URL('/api/auth/google', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/grants/internal/:path*']
};
