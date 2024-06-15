import type { Role } from '@neo-saas/auth'

interface IGetMembershipResponse {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export type { IGetMembershipResponse }
