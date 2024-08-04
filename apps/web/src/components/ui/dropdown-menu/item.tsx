'use client'

import { Item } from '@radix-ui/react-dropdown-menu'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof Item> {}
interface IDropdownMenuItemProps extends ComponentPropsWithoutRef<typeof Item> {
  inset?: boolean
}

const DropdownMenuItem = forwardRef<IElementRef, IDropdownMenuItemProps>(
  ({ className, inset, ...props }, ref) => (
    <Item
      {...props}
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className,
      )}
    />
  ),
)

export default DropdownMenuItem
