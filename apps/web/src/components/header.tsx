import Link from 'next/link'

import ProfileButton from './profile-button'

function Header() {
  return (
    <header className="mx-auto flex max-w-[75rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <h1 className="text-2xl font-bold">NeoSaaS</h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </header>
  )
}

export default Header
