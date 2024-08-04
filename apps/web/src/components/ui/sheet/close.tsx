'use client'

import { Close } from '@radix-ui/react-dialog'
import type { ComponentProps } from 'react'

import Icon from '@/components/icon'
import { cn } from '@/lib/utils'

interface ISheetCloseProps extends ComponentProps<typeof Close> {}

function SheetClose({ className, ...props }: ISheetCloseProps) {
  return (
    <Close
      {...props}
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary',
        className,
      )}
    >
      <Icon name="x" />
      <span className="sr-only">Close</span>
    </Close>
  )
}

export default SheetClose
