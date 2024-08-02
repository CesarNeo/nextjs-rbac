import type { Role } from '@neo-saas/auth'

import { api } from './api-client'

interface GetPendingInvitesResponse {
  invites: {
    id: string
    role: Role
    email: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    organization: {
      name: string
    }
    createdAt: string
  }[]
}

export async function getPendingInvites() {
  const result = await api
    .get('pending-invites')
    .json<GetPendingInvitesResponse>()

  return result
}
