import type { FC, ReactNode } from 'react'

const AuthLayout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}

export default AuthLayout
