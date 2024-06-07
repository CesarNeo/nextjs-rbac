import './globals.css'

import type { Metadata } from 'next'
import type { FC, ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Create Next App',
}

const RootLayout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
export default RootLayout
