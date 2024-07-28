'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrganizationSlug } from '@/auth/auth'
import { NextTags } from '@/enums/next-tags'
import { removeMember } from '@/http/remove-member'

export async function removeMemberAction(memberId: string) {
  const orgSlug = getCurrentOrganizationSlug()

  await removeMember({
    organizationSlug: orgSlug!,
    memberId,
  })

  revalidateTag(`${orgSlug}/${NextTags.MEMBERS}`)
}
