import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  const userIsAuthenticated = isAuthenticated()

  if (userIsAuthenticated) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 antialiased">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}

export default AuthLayout
