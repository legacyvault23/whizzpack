import { NextResponse } from 'next/server';
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const htmlMap = {
    '/': '/index.html',
    '/corrugated-boxes': '/corrugated-boxes.html',
    '/cotton-seed-bags': '/cotton-seed-bags.html',
  };
  if (htmlMap[pathname]) {
    return NextResponse.rewrite(new URL(htmlMap[pathname], request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/corrugated-boxes', '/cotton-seed-bags'],
};