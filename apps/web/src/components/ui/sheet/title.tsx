'use client'

import { Title } from '@radix-ui/react-dialog'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

interface ISheetTitleProps extends ComponentPropsWithoutRef<typeof Title> {}

const SheetTitle = forwardRef<ElementRef<typeof Title>, ISheetTitleProps>(
  ({ className, ...props }, ref) => (
    <Title
      {...props}
      ref={ref}
      className={cn('text-lg font-semibold text-foreground', className)}
    />
  ),
)

export default SheetTitle
