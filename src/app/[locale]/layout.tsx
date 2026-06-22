import type { ReactNode } from 'react'

import { NextIntlClientProvider } from 'next-intl'

import { ThemeContextProvider } from '@/context/ThemeContext'
import { StoreProvider } from '@/store/StoreProvider'
import { baseLayoutStyle } from '@/styles/styles'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <>
      <StoreProvider>
        <ThemeContextProvider>
          <NextIntlClientProvider locale={locale}>
            <div className={baseLayoutStyle} id='root'>{children}</div>
          </NextIntlClientProvider>
        </ThemeContextProvider>
      </StoreProvider>
    </>
  )
}
