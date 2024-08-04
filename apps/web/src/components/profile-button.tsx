import { auth } from '@/auth/auth'

import AvatarProfile from './avatar-profile'
import Icon from './icon'
import LogoutLink from './logout-link'
import DropdownMenu from './ui/dropdown-menu'

async function ProfileButton() {
  const { user } = await auth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>

        <AvatarProfile
          className="size-8"
          avatarUrl={user.avatarUrl}
          name={user.name}
        />

        <Icon name="chevron-down" className="text-muted-foreground" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        <DropdownMenu.Item asChild>
          <LogoutLink>Sign out</LogoutLink>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default ProfileButton
