import { api } from './api-client'

interface ISignUpRequest {
  name: string
  email: string
  password: string
}

type SignUpResponseType = void

export async function signUp({
  name,
  email,
  password,
}: ISignUpRequest): Promise<SignUpResponseType> {
  await api.post('users', { json: { name, email, password } })
}
