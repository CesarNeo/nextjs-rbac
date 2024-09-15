import type { IBilling } from '@/types'

import { api } from './api-client'

interface IGetBillingResponse {
  billing: IBilling
}

export async function getBilling(slug: string) {
  const result = await api
    .get(`organizations/${slug}/billing`)
    .json<IGetBillingResponse>()

  return result
}
