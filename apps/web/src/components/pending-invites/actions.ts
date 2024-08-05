'use server'

import { revalidateTag } from 'next/cache'

import { NextTags } from '@/enums/next-tags'
import { acceptInvite } from '@/http/accept-invite'
import { rejectInvite } from '@/http/reject-invite'

import { type IAcceptOrRejectInviteProps, InviteStatusEnum } from './types'

export async function acceptInviteOrRejectAction({
  inviteId,
  type,
}: IAcceptOrRejectInviteProps) {
  if (type === InviteStatusEnum.ACCEPT) {
    await acceptInvite(inviteId)
  }

  if (type === InviteStatusEnum.REJECT) {
    await rejectInvite(inviteId)
  }

  revalidateTag(NextTags.ORGANIZATIONS)
}
