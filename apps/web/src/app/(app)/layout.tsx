import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'
import Header from '@/components/header'
import { RoutesPath } from '@/enums/routes-path'

function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  const userIsAuthenticated = isAuthenticated()

  if (!userIsAuthenticated) {
    redirect(RoutesPath.SIGN_IN)
  }

  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[75rem]">{children}</main>
    </div>
  )
}

export default AppLayout
