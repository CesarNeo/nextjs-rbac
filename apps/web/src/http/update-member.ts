import type { Role } from '@neo-saas/auth'

import { NextTags } from '@/enums/next-tags'

import { api } from './api-client'

interface IUpdateMemberRequest {
  organizationSlug: string
  memberId: string
  role: Role
}

export async function updateMember({
  organizationSlug,
  memberId,
  role,
}: IUpdateMemberRequest) {
  await api.put(`organizations/${organizationSlug}/members/${memberId}`, {
    json: { role },
    next: { tags: [`${organizationSlug}/${NextTags.MEMBERS}`] },
  })
}
