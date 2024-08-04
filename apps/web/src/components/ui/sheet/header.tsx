import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface ISheetHeaderProps extends ComponentProps<'div'> {}

function SheetHeader({ className, ...props }: ISheetHeaderProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left',
        className,
      )}
    />
  )
}

export default SheetHeader
