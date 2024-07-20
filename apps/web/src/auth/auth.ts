import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { RoutesPath } from '@/enums/routes-path'
import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return Boolean(cookies().get('token')?.value)
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    return redirect(RoutesPath.SIGN_IN)
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {}

  return redirect(RoutesPath.API_SIGN_OUT)
}
