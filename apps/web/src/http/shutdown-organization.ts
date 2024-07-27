import { api } from './api-client'

interface IShutdownOrganizationRequest {
  organizationSlug: string
}

export async function shutdownOrganization({
  organizationSlug,
}: IShutdownOrganizationRequest) {
  await api.delete(`organizations/${organizationSlug}`)
}
