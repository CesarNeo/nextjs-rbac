import { api } from './api-client'

interface GetOrganizationResponse {
  organization: {
    id: number
    name: string
    slug: string
    avatarUrl: string | null
    domain: string | null
    shouldAttachUsersByDomain: boolean
    ownerId: string
    createdAt: string
    updatedAt: string
  }
}

export async function getOrganization(slug: string) {
  const result = await api
    .get(`organizations/${slug}`)
    .json<GetOrganizationResponse>()

  return result
}
