'use server'

import { env } from '@neo-saas/env'
import { redirect } from 'next/navigation'

function signInWithGithub() {
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')
  githubSignInURL.searchParams.append('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSignInURL.searchParams.append(
    'redirect_uri',
    env.GITHUB_OAUTH_REDIRECT_URI,
  )
  githubSignInURL.searchParams.append('scope', 'user')

  redirect(String(githubSignInURL))
}

export { signInWithGithub }
