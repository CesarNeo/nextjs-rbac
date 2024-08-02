import type { Role } from '@neo-saas/auth'

import { api } from './api-client'

interface GetInviteResponse {
  invite: {
    id: string
    role: Role
    email: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    createdAt: string
  }
}

export async function getInvite(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()

  return result
}
