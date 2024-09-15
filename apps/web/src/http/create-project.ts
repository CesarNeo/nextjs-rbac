import { api } from './api-client'

interface ICreateProjectRequest {
  organizationSlug: string
  name: string
  description: string | null
}

export async function createProject({
  organizationSlug,
  name,
  description,
}: ICreateProjectRequest) {
  await api.post(`organizations/${organizationSlug}/projects`, {
    json: { name, description },
  })
}
