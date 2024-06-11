import { api } from '@/lib/ky/api-client'

import type { ISignUpRequest, ISignUpResponse } from './types'

async function signUp({
  name,
  email,
  password,
}: ISignUpRequest): Promise<ISignUpResponse> {
  await api.post('users', { json: { name, email, password } })
}

export { signUp }
