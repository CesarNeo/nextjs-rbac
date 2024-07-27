import type { ReactNode } from 'react'

import Header from '@/components/header'
import Tabs from '@/components/tabs'

function OrganizationLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>

      <main className="mx-auto w-full max-w-[75rem] py-4">{children}</main>
    </div>
  )
}

export default OrganizationLayout
