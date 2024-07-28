'use server'

import type { Role } from '@neo-saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganizationSlug } from '@/auth/auth'
import { NextTags } from '@/enums/next-tags'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const orgSlug = getCurrentOrganizationSlug()

  await removeMember({
    organizationSlug: orgSlug!,
    memberId,
  })

  revalidateTag(`${orgSlug}/${NextTags.MEMBERS}`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const orgSlug = getCurrentOrganizationSlug()

  await updateMember({
    organizationSlug: orgSlug!,
    memberId,
    role,
  })

  revalidateTag(`${orgSlug}/${NextTags.MEMBERS}`)
}
