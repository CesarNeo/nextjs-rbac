import { defineAbilityFor } from '@neo-saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { RoutesPath } from '@/enums/routes-path'
import { getMembership } from '@/http/get-membership'
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

export function getCurrentOrganizationSlug() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const organizationSlug = getCurrentOrganizationSlug()

  if (!organizationSlug) {
    return null
  }

  const { membership } = await getMembership(organizationSlug)
  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const { role, userId } = membership
  const ability = defineAbilityFor({
    id: userId,
    role,
  })

  return ability
}
