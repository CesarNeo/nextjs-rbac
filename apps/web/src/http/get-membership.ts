import type { Role } from '@neo-saas/auth'

import { api } from './api-client'

interface GetMembershipResponse {
  membership: {
    id: number
    userId: string
    organizationId: string
    role: Role
  }
}

export async function getMembership(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/membership`)
    .json<GetMembershipResponse>()

  return result
}
