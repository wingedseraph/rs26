import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import './globals.css'
import StoreProvider from '@/app/StoreProvider'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { baseLayoutStyle } from '@/styles/styles'

export const metadata: Metadata = {
  title: 'Inspiration engine',
  description: 'Artwork search and discovery app built with the Victoria and Albert Museum API.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <ThemeContextProvider>
            <div className={baseLayoutStyle} id='root'>{children}</div>
          </ThemeContextProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
