import { cookies } from 'next/headers'

export function isAuthenticated() {
  return Boolean(cookies().get('token')?.value)
}
