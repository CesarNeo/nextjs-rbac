import type { Role } from '@neo-saas/auth'

import type { AvatarUrlType } from './user'

interface IMembership {
  id: number
  userId: string
  organizationId: string
  role: Role
}

interface IMember {
  id: string
  userId: string
  role: Role
  name: string | null
  email: string
  avatarUrl: AvatarUrlType
}

export type { IMember, IMembership }
