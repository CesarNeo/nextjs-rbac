import { type NextRequest, NextResponse } from 'next/server'

function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const [, , slug] = pathname.split('/')

    response.cookies.set('org-slug', slug)
  } else {
    response.cookies.delete('org-slug')
  }

  return response
}

const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export { middleware, config }
