import type { IUser } from '@/types'

import { api } from './api-client'

interface IGetProfileResponse {
  user: IUser
}

export async function getProfile() {
  const result = await api.get('profile').json<IGetProfileResponse>()

  return result
}
