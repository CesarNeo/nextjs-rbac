'use client'

import { Label } from '@radix-ui/react-dropdown-menu'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof Label> {}
interface IDropdownMenuLabelProps
  extends ComponentPropsWithoutRef<typeof Label> {
  inset?: boolean
}

const DropdownMenuLabel = forwardRef<IElementRef, IDropdownMenuLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <Label
      {...props}
      ref={ref}
      className={cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className,
      )}
    />
  ),
)

export default DropdownMenuLabel
