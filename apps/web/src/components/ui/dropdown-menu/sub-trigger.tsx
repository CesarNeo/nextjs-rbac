'use client'

import { SubTrigger } from '@radix-ui/react-dropdown-menu'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import Icon from '@/components/icon'
import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof SubTrigger> {}

interface IDropdownSubTriggerProps
  extends ComponentPropsWithoutRef<typeof SubTrigger> {
  inset?: boolean
}

const DropdownSubTrigger = forwardRef<IElementRef, IDropdownSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => {
    return (
      <SubTrigger
        {...props}
        ref={ref}
        className={cn(
          'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
          inset && 'pl-8',
          className,
        )}
      >
        {children}
        <Icon name="chevron-right" className="ml-auto" />
      </SubTrigger>
    )
  },
)

export default DropdownSubTrigger
