import { Slash } from 'lucide-react'
import Link from 'next/link'

import { ability } from '@/auth/auth'

import OrganizationSwitcher from './components/organization-switcher'
import ProfileButton from './components/profile-button'

const Header = async () => {
  const permissions = await ability()

  return (
    <header className="mx-auto flex max-w-[75rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <strong className="text-2xl font-bold">NeoSaaS</strong>
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />
        {permissions?.can('get', 'Project') ? <p>Projetos</p> : null}
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}

export default Header
