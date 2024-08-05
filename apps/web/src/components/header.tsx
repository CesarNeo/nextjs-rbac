import Link from 'next/link'

import { ability } from '@/auth/auth'
import { RoutesPath } from '@/enums/routes-path'

import Icon from './icon'
import OrganizationSwitcher from './organization-switcher'
import PendingInvites from './pending-invites'
import ProfileButton from './profile-button'
import ProjectSwitcher from './project-switcher'
import ThemeSwitcher from './theme/theme-switcher'
import { Separator } from './ui/separator'

async function Header() {
  const permissions = await ability()
  const canListProjects = permissions?.can('get', 'Project')

  return (
    <header className="mx-auto flex max-w-[75rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href={RoutesPath.HOME}>
          <h1 className="text-2xl font-bold">NeoSaaS</h1>
        </Link>

        <Icon name="slash" className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {canListProjects && (
          <>
            <Icon name="slash" className="size-3 -rotate-[24deg] text-border" />

            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />

        <ThemeSwitcher />

        <Separator orientation="vertical" className="h-5" />

        <ProfileButton />
      </div>
    </header>
  )
}

export default Header
