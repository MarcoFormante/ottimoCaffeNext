import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host');

 
  if (url.pathname.startsWith('/admin') && host !== 'admin.miosito.com') {
    return NextResponse.redirect(new URL('/404', request.url)); 
  }

  return NextResponse.next();
}