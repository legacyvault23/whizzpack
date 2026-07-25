import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  if (host === 'whizzpack.in') {
    const url = request.url.replace('://whizzpack.in', '://www.whizzpack.in');
    return NextResponse.redirect(url, { status: 301 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/(.*)',
};
