import type { NextRequest } from 'next/server'

import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'

import { routing } from '@/i18n/routing'

export function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl
  const handleI18nRouting = createMiddleware(routing)
  const response = handleI18nRouting(request)
  const pathnameLocale = pathname.slice(1)

  if (response.ok && !searchParams.has('page') && routing.locales.includes(pathnameLocale)) {
    request.nextUrl.searchParams.set('page', '1')
    return NextResponse.redirect(request.nextUrl)
  }

  return response
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
