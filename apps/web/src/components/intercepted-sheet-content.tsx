'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import type { VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type ElementRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

import { SheetOverlay, SheetPortal, sheetVariants } from './ui/sheet'

interface ISheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const InterceptedSheetContent = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  ISheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => {
  const router = useRouter()

  function onClosing() {
    return router.back()
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        onEscapeKeyDown={onClosing}
        onPointerDownOutside={onClosing}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          onClick={onClosing}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
InterceptedSheetContent.displayName = SheetPrimitive.Content.displayName

export default InterceptedSheetContent
