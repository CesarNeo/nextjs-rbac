import { cookies } from 'next/headers'

export function saveTokenInCookies(token: string) {
  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}
