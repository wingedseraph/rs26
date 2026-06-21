import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  if (!request.nextUrl.searchParams.has('page') && request.nextUrl.pathname === '/') {
    request.nextUrl.searchParams.set('page', '1')
    return NextResponse.redirect(request.nextUrl)
  }
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
