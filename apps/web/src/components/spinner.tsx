import { cn } from '@/lib/utils'

import Icon, { type IIconProps } from './icon'

interface ISpinnerProps extends IIconProps {}

function Spinner({ className, name = 'loader', ...props }: ISpinnerProps) {
  return (
    <Icon {...props} name={name} className={cn('animate-spin', className)} />
  )
}

export default Spinner
