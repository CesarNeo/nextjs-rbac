import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

const isAuthenticated = !!cookies().get('token')?.value

async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {}

  redirect('api/auth/sign-out')
}

export { isAuthenticated, auth }
