interface ISignInWithGithubRequest {
  code: string
}
interface ISignInWithGithubResponse {
  token: string
}

export type { ISignInWithGithubRequest, ISignInWithGithubResponse }
