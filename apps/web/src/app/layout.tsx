import './globals.css'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Create Next App',
}

const RootLayout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
export default RootLayout
