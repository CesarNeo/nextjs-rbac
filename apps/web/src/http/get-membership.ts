import type { IMembership } from '@/types'

import { api } from './api-client'

interface GetMembershipResponse {
  membership: IMembership
}

export async function getMembership(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/membership`)
    .json<GetMembershipResponse>()

  return result
}
