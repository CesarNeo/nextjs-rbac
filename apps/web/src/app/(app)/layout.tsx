import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'
import { RoutesPath } from '@/enums/routes-path'

function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  const userIsAuthenticated = isAuthenticated()

  if (!userIsAuthenticated) {
    redirect(RoutesPath.SIGN_IN)
  }

  return <>{children}</>
}

export default AppLayout
