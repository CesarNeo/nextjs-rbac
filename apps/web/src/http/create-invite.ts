import type { Role } from '@neo-saas/auth'

import { api } from './api-client'

interface ICreateInviteRequest {
  organizationSlug: string
  email: string
  role: Role
}

type CreateInviteResponseType = void

export async function createInvite({
  organizationSlug,
  email,
  role,
}: ICreateInviteRequest): Promise<CreateInviteResponseType> {
  await api.post(`organizations/${organizationSlug}/invites`, {
    json: { email, role },
  })
}
