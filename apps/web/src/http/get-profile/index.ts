import { api } from '@/lib/ky/api-client'

import type { IGetProfileResponse } from './types'

async function getProfile() {
  const result = await api.get('profile').json<IGetProfileResponse>()

  return result
}

export { getProfile }
