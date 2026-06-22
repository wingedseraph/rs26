import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import './globals.css'
import { getLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Inspiration engine',
  description: 'Artwork search and discovery app built with the Victoria and Albert Museum API.',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  )
}
