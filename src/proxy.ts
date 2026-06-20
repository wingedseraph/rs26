import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  if (!request.nextUrl.searchParams.has('page') && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/?page=1', request.url))
  }
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
