import type { ComponentProps } from 'react'

interface ITextError extends ComponentProps<'p'> {}

function TextError(props: ITextError) {
  return (
    <p
      {...props}
      className="text-xs font-medium text-red-500 dark:text-red-400"
    />
  )
}

export default TextError
