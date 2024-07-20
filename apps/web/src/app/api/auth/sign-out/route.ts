import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { RoutesPath } from '@/enums/routes-path'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = RoutesPath.SIGN_IN

  cookies().delete('token')

  return NextResponse.redirect(redirectUrl)
}
