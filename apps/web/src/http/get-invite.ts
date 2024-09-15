import type { IInvite } from '@/types'

import { api } from './api-client'

interface GetInviteResponse {
  invite: IInvite
}

export async function getInvite(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()

  return result
}
