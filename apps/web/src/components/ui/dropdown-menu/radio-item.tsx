'use client'

import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import Icon from '@/components/icon'
import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof RadioItem> {}
interface IDropdownMenuRadioItemProps
  extends ComponentPropsWithoutRef<typeof RadioItem> {}

const DropdownMenuRadioItem = forwardRef<
  IElementRef,
  IDropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <RadioItem
    {...props}
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Icon name="circle" className="size-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
))

export default DropdownMenuRadioItem
