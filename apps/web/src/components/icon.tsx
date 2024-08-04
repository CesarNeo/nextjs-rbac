import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import dynamic from 'next/dynamic'

import { cn } from '@/lib/utils'

export interface IIconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

const Icon = ({ name, className, ...props }: IIconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon {...props} className={cn('size-4', className)} />
}

export default Icon
