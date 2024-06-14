import { Slash } from 'lucide-react'

import OrganizationSwitcher from './components/organization-switcher'
import ProfileButton from './components/profile-button'

const Header = () => {
  return (
    <header className="mx-auto flex max-w-[75rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <strong className="text-2xl font-bold">NeoSaaS</strong>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}

export default Header
