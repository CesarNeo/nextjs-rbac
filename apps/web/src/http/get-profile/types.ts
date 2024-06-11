type IUser = {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
}

interface IGetProfileResponse {
  user: IUser
}

export type { IGetProfileResponse }
