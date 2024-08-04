'use client'

import { Content, Overlay, Portal } from '@radix-ui/react-dialog'
import type { VariantProps } from 'class-variance-authority'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

import SheetClose from './close'
import { sheetVariants } from './constants'

interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof Content>,
    VariantProps<typeof sheetVariants> {
  onClose?: () => void
}

const SheetContent = forwardRef<ElementRef<typeof Content>, SheetContentProps>(
  ({ side = 'right', className, children, onClose, ...props }, ref) => (
    <Portal>
      <Overlay />
      <Content
        {...props}
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
      >
        {children}

        <SheetClose onClick={onClose} />
      </Content>
    </Portal>
  ),
)

export default SheetContent
