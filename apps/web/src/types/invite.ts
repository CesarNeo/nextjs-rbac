import type { Role } from '@neo-saas/auth'

import type { IOrganization } from './organization'
import type { IUser } from './user'

interface IInvite {
  id: string
  role: Role
  email: string
  organization: Pick<IOrganization, 'name'>
  author: IUser | null
  createdAt: string
}

export type { IInvite }
