import { api } from '@/lib/ky/api-client'

import type {
  ISignInWithPasswordRequest,
  ISignInWithPasswordResponse,
} from './types'

async function signInWithPassword({
  email,
  password,
}: ISignInWithPasswordRequest) {
  const result = await api
    .post('sessions/password', { json: { email, password } })
    .json<ISignInWithPasswordResponse>()

  return result
}

export { signInWithPassword }
