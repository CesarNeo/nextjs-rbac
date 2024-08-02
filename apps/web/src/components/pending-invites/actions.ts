'use server'

import { revalidateTag } from 'next/cache'

import { NextTags } from '@/enums/next-tags'
import { acceptInvite } from '@/http/accept-invite'
import { rejectInvite } from '@/http/reject-invite'

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)

  revalidateTag(NextTags.ORGANIZATIONS)
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInvite(inviteId)

  revalidateTag(NextTags.ORGANIZATIONS)
}
