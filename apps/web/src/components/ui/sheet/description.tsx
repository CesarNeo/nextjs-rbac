'use client'

import { Description } from '@radix-ui/react-dialog'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof Description> {}
interface ISheetDescriptionProps
  extends ComponentPropsWithoutRef<typeof Description> {}

const SheetDescription = forwardRef<IElementRef, ISheetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <Description
      {...props}
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
    />
  ),
)

export default SheetDescription
