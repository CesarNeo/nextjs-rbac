import { api } from './api-client'

interface ICreateProjectRequest {
  organizationSlug: string
  name: string
  description: string | null
}

type CreateProjectResponseType = void

export async function createProject({
  organizationSlug,
  name,
  description,
}: ICreateProjectRequest): Promise<CreateProjectResponseType> {
  await api.post(`organizations/${organizationSlug}/projects`, {
    json: { name, description },
  })
}
