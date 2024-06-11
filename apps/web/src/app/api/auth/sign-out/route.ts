import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const redirectURL = request.nextUrl.clone()
  redirectURL.pathname = '/auth/sign-in'

  cookies().delete('token')

  return NextResponse.redirect(redirectURL)
}

export { GET }
