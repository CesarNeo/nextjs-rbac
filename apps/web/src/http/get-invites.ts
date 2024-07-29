import type { Role } from '@neo-saas/auth'

import { NextTags } from '@/enums/next-tags'

import { api } from './api-client'

interface GetInvitesResponse {
  invites: {
    id: string
    role: Role
    email: string
    author: {
      id: string
      name: string | null
    } | null
    createdAt: string
  }[]
}

export async function getInvites(organizationSlug: string) {
  const result = await api
    .get(`organizations/${organizationSlug}/invites`, {
      next: { tags: [`${organizationSlug}/${NextTags.INVITES}`] },
    })
    .json<GetInvitesResponse>()

  return result
}
