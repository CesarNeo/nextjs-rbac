import { api } from './api-client'

interface IUpdateOrganizationRequest {
  slug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponseType = void

export async function updateOrganization({
  slug,
  name,
  domain,
  shouldAttachUsersByDomain,
}: IUpdateOrganizationRequest): Promise<UpdateOrganizationResponseType> {
  await api.put(`organizations/${slug}`, {
    json: { name, domain, shouldAttachUsersByDomain },
  })
}
