import type { AvatarUrlType } from './user'

interface IOrganization {
  id: number
  name: string
  slug: string
  avatarUrl: AvatarUrlType
  domain: string | null
  shouldAttachUsersByDomain: boolean
  ownerId: string
  createdAt: string
  updatedAt: string
}

interface IOrganizations
  extends Pick<IOrganization, 'id' | 'name' | 'slug' | 'avatarUrl'> {}

export type { IOrganization, IOrganizations }
