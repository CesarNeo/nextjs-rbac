import { type NextRequest, NextResponse } from 'next/server'

import { saveTokenInCookies } from '@/http/save-token-in-cookies'
import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code not found' },
      { status: 400 },
    )
  }

  const { token } = await signInWithGithub({ code })

  saveTokenInCookies(token)

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
