import { api } from './api-client'

interface ICreateOrganizationRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type CreateOrganizationResponseType = void

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: ICreateOrganizationRequest): Promise<CreateOrganizationResponseType> {
  await api.post('organizations', {
    json: { name, domain, shouldAttachUsersByDomain },
  })
}
