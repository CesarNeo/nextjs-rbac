interface ISignInWithPasswordRequest {
  email: string
  password: string
}
interface ISignInWithPasswordResponse {
  token: string
}

export type { ISignInWithPasswordRequest, ISignInWithPasswordResponse }
