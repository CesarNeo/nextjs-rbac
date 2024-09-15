import type { IOrganization } from '@/types'

import { api } from './api-client'

interface IGetOrganizationResponse {
  organization: IOrganization
}

export async function getOrganization(slug: string) {
  const result = await api
    .get(`organizations/${slug}`)
    .json<IGetOrganizationResponse>()

  return result
}
