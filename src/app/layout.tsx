import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import './globals.css'
import StoreProvider from '@/app/StoreProvider'
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
        {/* fix add providers.ts */}
        <StoreProvider>
          {/* fix add theme providers! without flickering on first page init
          <ThemeContextProvider> */}
          <div className={baseLayoutStyle} id='root'>{children}</div>
        </StoreProvider>
      </body>
    </html>
  )
}
