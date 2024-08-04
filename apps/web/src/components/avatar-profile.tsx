import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface IAvatarProfile extends ComponentProps<typeof Avatar> {
  name?: string | null
  avatarUrl?: string | null
}

function AvatarProfile({
  name,
  avatarUrl,
  className,
  ...props
}: IAvatarProfile) {
  const initials = name ? getInitials(name) : null

  return (
    <Avatar {...props} className={cn('size-4', className)}>
      {avatarUrl && <AvatarImage src={avatarUrl} />}
      {initials && <AvatarFallback>{initials}</AvatarFallback>}
    </Avatar>
  )
}

export default AvatarProfile
