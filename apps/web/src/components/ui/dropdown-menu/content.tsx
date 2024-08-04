'use client'

import { Content, Portal } from '@radix-ui/react-dropdown-menu'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof Content> {}
interface IDropdownMenuContentProps
  extends ComponentPropsWithoutRef<typeof Content> {}

const DropdownMenuContent = forwardRef<IElementRef, IDropdownMenuContentProps>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Portal>
      <Content
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
      />
    </Portal>
  ),
)

export default DropdownMenuContent
