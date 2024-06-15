import { defineAbilityFor } from '@neo-saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

const isAuthenticated = () => !!cookies().get('token')?.value
const getCurrentOrganizationSlugCookies = () => cookies().get('org-slug')?.value

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

async function getCurrentMembership() {
  const organizationSlug = getCurrentOrganizationSlugCookies()

  if (!organizationSlug) {
    return null
  }

  const { membership } = await getMembership(organizationSlug)
  return membership
}

async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })
  return ability
}

export { isAuthenticated, auth, ability, getCurrentOrganizationSlugCookies }
