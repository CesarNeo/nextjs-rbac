import { api } from './api-client'

interface GetProjectsResponse {
  projects: {
    id: string
    slug: string
    description: string
    name: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    owner: {
      id: string
      name: string
      avatarUrl: string | null
    }
    createdAt: string
  }[]
}

export async function getProjects(organizationSlug: string) {
  const result = await api
    .get(`organizations/${organizationSlug}/projects`)
    .json<GetProjectsResponse>()

  return result
}
