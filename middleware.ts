// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  const path = request.nextUrl.pathname;

  if (host === 'admin.novacreatives.org' && path === '/') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Blocca l'accesso a /admin se non dal sottodominio
  if (path.startsWith('/admin') && host !== 'admin.novacreatives.org') {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  return NextResponse.next();
}