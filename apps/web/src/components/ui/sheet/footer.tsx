import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface ISheetFooterProps extends ComponentProps<'div'> {}

function SheetFooter({ className, ...props }: ISheetFooterProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
    />
  )
}

export default SheetFooter
