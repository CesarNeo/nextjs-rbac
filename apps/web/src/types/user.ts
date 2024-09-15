type AvatarUrlType = string | null

interface IUser {
  id: number
  name: string | null
  email: string
  avatarUrl: AvatarUrlType
}

export type { IUser, AvatarUrlType }
