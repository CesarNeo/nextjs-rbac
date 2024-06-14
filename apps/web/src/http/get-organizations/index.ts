import { api } from '@/lib/ky/api-client'

import type { IGetOrganizationsResponse } from './types'

async function getOrganizations() {
  const result = await api
    .get('organizations')
    .json<IGetOrganizationsResponse>()

  return result
}

export { getOrganizations }
