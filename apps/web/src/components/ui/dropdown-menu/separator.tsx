'use client'

import { Separator } from '@radix-ui/react-dropdown-menu'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof Separator> {}
interface IDropdownMenuSeparatorProps
  extends ComponentPropsWithoutRef<typeof Separator> {}

const DropdownMenuSeparator = forwardRef<
  IElementRef,
  IDropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator
    {...props}
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
  />
))

export default DropdownMenuSeparator
