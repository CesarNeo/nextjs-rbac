'use server'

import { env } from '@neo-saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_REDIRECT_URI } = env

  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')
  githubSignInURL.searchParams.set('client_id', GITHUB_OAUTH_CLIENT_ID)
  githubSignInURL.searchParams.set('redirect_uri', GITHUB_OAUTH_REDIRECT_URI)
  githubSignInURL.searchParams.set('scope', 'user')

  return redirect(String(githubSignInURL))
}
