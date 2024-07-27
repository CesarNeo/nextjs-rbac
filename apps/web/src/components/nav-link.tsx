'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

interface INavLinkProps extends ComponentProps<typeof Link> {}

function NavLink({ href, ...props }: INavLinkProps) {
  const pathname = usePathname()
  const isActive = String(href) === pathname

  return <Link {...props} href={href} data-active={isActive} />
}

export default NavLink
