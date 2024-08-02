import { Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface ISpinnerProps extends ComponentProps<'svg'> {}

function Spinner({ className, ...props }: ISpinnerProps) {
  return <Loader2 {...props} className={cn('size-4 animate-spin', className)} />
}

export default Spinner
