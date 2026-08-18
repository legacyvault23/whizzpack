import { NextResponse } from 'next/server';

function isPublicPortal(pathname) {
  return pathname === '/portal/login' || pathname.startsWith('/portal/login');
}

async function verifySession(token) {
  if (!token) return false;
  try {
    const [payloadB64, sigB64] = token.split('.');
    if (!payloadB64 || !sigB64) return false;
    const payload = JSON.parse(atob(payloadB64));
    if (payload.exp < Date.now()) return false;
    const secret = process.env.WP_CRM_SECRET;
    if (!secret) return false;
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const sigBytes = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));
    return await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payloadB64));
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';

  if (host === 'whizzpack.in') {
    const url = request.url.replace('://whizzpack.in', '://www.whizzpack.in');
    return NextResponse.redirect(url, { status: 301 });
  }

  if (pathname.startsWith('/portal')) {
    if (!isPublicPortal(pathname)) {
      const token = request.cookies.get('wp_crm_session')?.value;
      const valid = await verifySession(token);
      if (!valid) {
        const loginUrl = new URL('/portal/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: '/((?!_next/static|_next/image|favicon.ico).*)'  };
