import { NextTags } from '@/enums/next-tags'

import { api } from './api-client'

interface IRevokeInviteRequest {
  organizationSlug: string
  inviteId: string
}

export async function revokeInvite({
  organizationSlug,
  inviteId,
}: IRevokeInviteRequest) {
  await api.delete(`organizations/${organizationSlug}/invites/${inviteId}`, {
    next: { tags: [`${organizationSlug}/${NextTags.INVITES}`] },
  })
}
