interface ISignUpRequest {
  name: string
  email: string
  password: string
}
type ISignUpResponse = void

export type { ISignUpRequest, ISignUpResponse }
