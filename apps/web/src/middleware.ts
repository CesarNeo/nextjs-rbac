import { type NextRequest, NextResponse } from 'next/server'

import { CookiesKeysEnum, RoutesPath } from './enums'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameStartsWithOrg = pathname.startsWith(RoutesPath.ORGANIZATION)

  const response = NextResponse.next()

  if (pathnameStartsWithOrg) {
    const [, , slug] = pathname.split(RoutesPath.HOME)

    response.cookies.set(CookiesKeysEnum.ORGANIZATION, slug)
  } else {
    response.cookies.delete(CookiesKeysEnum.ORGANIZATION)
  }

  return response
}
