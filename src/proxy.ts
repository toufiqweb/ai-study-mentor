import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenServer } from './lib/core/BetterAuthToken';

export async function proxy(request: NextRequest) {
  const token = await getTokenServer();

  if (!token) {
    const unauthUrl = new URL("/unauthorized", request.url);
    unauthUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(unauthUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all dashboard routes
    "/dashboard/:path*",
  ],
};