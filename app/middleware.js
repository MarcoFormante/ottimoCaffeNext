import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();

  if (url.hostname === 'admin.novacreatives.org') {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}