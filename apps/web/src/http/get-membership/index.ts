import { api } from '@/lib/ky/api-client'

import type { IGetMembershipResponse } from './types'

async function getMembership(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/membership`)
    .json<IGetMembershipResponse>()

  return result
}

export { getMembership }
