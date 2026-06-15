import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import StoreProvider from '@/app/StoreProvider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Inspiration engine',
  description: 'Artwork search and discovery app built with the Victoria and Albert Museum API.',
}

const baseStyle = 'mx-auto flex flex-col items-center justify-center gap-20 md:mx-20 md:flex-row'
export const baseStyleDetailed = 'hidden transition-all duration-300'
export const outletStyleDetailed = 'flex w-full items-center justify-center md:relative md:w-1/2'

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
          <div className={baseStyle} id='root'>{children}</div>
        </StoreProvider>
      </body>
    </html>
  )
}
