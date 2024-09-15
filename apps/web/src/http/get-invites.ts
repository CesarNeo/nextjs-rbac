import { NextTags } from '@/enums/next-tags'
import type { IInvite } from '@/types'

import { api } from './api-client'

interface GetInvitesResponse {
  invites: IInvite[]
}

export async function getInvites(organizationSlug: string) {
  const result = await api
    .get(`organizations/${organizationSlug}/invites`, {
      next: { tags: [`${organizationSlug}/${NextTags.INVITES}`] },
    })
    .json<GetInvitesResponse>()

  return result
}
