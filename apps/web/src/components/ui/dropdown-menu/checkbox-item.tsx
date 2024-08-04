'use client'

import { CheckboxItem, ItemIndicator } from '@radix-ui/react-dropdown-menu'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import Icon from '@/components/icon'
import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof CheckboxItem> {}
interface IDropdownMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof CheckboxItem> {}

const DropdownMenuCheckboxItem = forwardRef<
  IElementRef,
  IDropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    {...props}
    ref={ref}
    checked={checked}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Icon name="check" />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
))

export default DropdownMenuCheckboxItem
