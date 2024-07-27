import { NextTags } from '@/enums/next-tags'

import { api } from './api-client'

interface GetOrganizationsResponse {
  organizations: {
    id: number
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getOrganizations() {
  const result = await api
    .get('organizations', { next: { tags: [NextTags.ORGANIZATIONS] } })
    .json<GetOrganizationsResponse>()

  return result
}
