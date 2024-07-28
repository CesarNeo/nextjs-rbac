import type { Role } from '@neo-saas/auth'

import { api } from './api-client'

interface IGetMembersResponse {
  members: {
    id: string
    userId: string
    role: Role
    name: string | null
    email: string
    avatarUrl: string | null
  }[]
}

export async function getMembers(slug: string) {
  const result = await api
    .get(`organizations/${slug}/members`)
    .json<IGetMembersResponse>()

  return result
}
