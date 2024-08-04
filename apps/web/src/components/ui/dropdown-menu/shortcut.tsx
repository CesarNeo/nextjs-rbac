'use client'

import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface IDropdownMenuShortcutProps extends ComponentProps<'span'> {}

function DropdownMenuShortcut({
  className,
  ...props
}: IDropdownMenuShortcutProps) {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}

export default DropdownMenuShortcut
