import { NextTags } from '@/enums/next-tags'
import type { IOrganizations } from '@/types'

import { api } from './api-client'

interface GetOrganizationsResponse {
  organizations: IOrganizations[]
}

export async function getOrganizations() {
  const result = await api
    .get('organizations', { next: { tags: [NextTags.ORGANIZATIONS] } })
    .json<GetOrganizationsResponse>()

  return result
}
