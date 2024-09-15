import type { IMember } from '@/types'

import { api } from './api-client'

interface IGetMembersResponse {
  members: IMember[]
}

export async function getMembers(slug: string) {
  const result = await api
    .get(`organizations/${slug}/members`)
    .json<IGetMembersResponse>()

  return result
}
