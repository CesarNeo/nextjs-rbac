'use server'

import { redirect } from 'next/navigation'

function signInWithGithub() {
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')
  githubSignInURL.searchParams.append('client_id', '1754f5db2e0d1813cfb7')
  githubSignInURL.searchParams.append(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback',
  )
  githubSignInURL.searchParams.append('scope', 'user')

  redirect(String(githubSignInURL))
}

export { signInWithGithub }
