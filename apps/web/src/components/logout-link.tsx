import type { ReactNode } from 'react'

import { RoutesPath } from '@/enums/routes-path'

import Icon from './icon'

function LogoutLink({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <a href={RoutesPath.API_SIGN_OUT}>
      <Icon name="log-out" className="mr-2" />
      {children}
    </a>
  )
}

export default LogoutLink
