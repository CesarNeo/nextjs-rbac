import { Slash } from 'lucide-react'
import Link from 'next/link'

import { ability } from '@/auth/auth'

import OrganizationSwitcher from './organization-switcher'
import ProfileButton from './profile-button'
import ProjectSwitcher from './project-switcher'
import ThemeSwitcher from './theme/theme-switcher'
import { Separator } from './ui/separator'

async function Header() {
  const permissions = await ability()

  return (
    <header className="mx-auto flex max-w-[75rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <h1 className="text-2xl font-bold">NeoSaaS</h1>
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[24deg] text-border" />

            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Separator orientation="vertical" className="h-5" />

        <ProfileButton />
      </div>
    </header>
  )
}

export default Header
