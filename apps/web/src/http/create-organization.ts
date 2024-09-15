import { api } from './api-client'

interface ICreateOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: ICreateOrganizationRequest) {
  await api.post('organizations', {
    json: { name, domain, shouldAttachUsersByDomain },
  })
}
