import type { ReactNode } from 'react'

function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 antialiased">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}

export default AuthLayout
