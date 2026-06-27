import type { ReactNode } from 'react'

import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import { ThemeContextProvider } from '@/context/ThemeContext'
import { routing } from '@/i18n/routing'
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
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
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
