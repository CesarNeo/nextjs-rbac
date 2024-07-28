import { NextTags } from '@/enums/next-tags'

import { api } from './api-client'

interface IRemoveMemberRequest {
  organizationSlug: string
  memberId: string
}

export async function removeMember({
  organizationSlug,
  memberId,
}: IRemoveMemberRequest) {
  await api.delete(`organizations/${organizationSlug}/members/${memberId}`, {
    next: { tags: [`${organizationSlug}/${NextTags.MEMBERS}`] },
  })
}
