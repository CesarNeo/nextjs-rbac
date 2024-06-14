import { redirect } from 'next/navigation'
import type { FC, ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

const AppLayout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}

export default AppLayout
