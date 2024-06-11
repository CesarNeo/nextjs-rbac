import type { FC } from 'react'

import { cn } from '@/lib/utils'

import type { IErrorTextProps } from './types'

const ErrorText: FC<IErrorTextProps> = ({ className, ...props }) => {
  return (
    <p
      {...props}
      className={cn(
        'text-xs font-medium text-red-500 dark:text-red-400',
        className,
      )}
    />
  )
}

export default ErrorText
