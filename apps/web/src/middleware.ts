import { type NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameStartsWithOrg = pathname.startsWith('/org')

  const response = NextResponse.next()

  if (pathnameStartsWithOrg) {
    const [, , slug] = pathname.split('/')

    response.cookies.set('org', slug)
  } else {
    response.cookies.delete('org')
  }

  return response
}
