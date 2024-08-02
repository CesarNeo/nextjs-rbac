import './globals.css'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Providers from './providers'

dayjs.extend(relativeTime)

export const metadata: Metadata = {
  title: 'Create Next App',
}

function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
