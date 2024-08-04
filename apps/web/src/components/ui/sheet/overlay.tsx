'use client'

import { Overlay } from '@radix-ui/react-dialog'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

import { cn } from '@/lib/utils'

interface IElementRef extends ElementRef<typeof Overlay> {}
interface ISheetOverlayProps extends ComponentPropsWithoutRef<typeof Overlay> {}

const SheetOverlay = forwardRef<IElementRef, ISheetOverlayProps>(
  ({ className, ...props }, ref) => (
    <Overlay
      {...props}
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
    />
  ),
)

export default SheetOverlay
