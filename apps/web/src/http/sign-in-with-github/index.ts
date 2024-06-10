import { api } from '@/lib/ky/api-client'

import type {
  ISignInWithGithubRequest,
  ISignInWithGithubResponse,
} from './types'

async function signInWithGithub({ code }: ISignInWithGithubRequest) {
  const result = await api
    .post('sessions/github', { json: { code } })
    .json<ISignInWithGithubResponse>()

  return result
}

export { signInWithGithub }
