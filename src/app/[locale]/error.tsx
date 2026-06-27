'use client'
import type { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

import { BackLink } from '@/components/ui/back-link'

type ErrorPageProperties = {
  error?: Error
  unstable_retry?: () => void
  children?: ReactNode
}

export default function ErrorPage({ error, unstable_retry, children }: ErrorPageProperties) {
  const t = useTranslations('ErrorPage')

  return (
    <>
      <BackLink />

      <div
        id='center'
        className='appear p-2 md:px-8 md:pt-6'
      >
        <h1 className='sm:text-8xl/30'>{t('title')}</h1>
        {error && <span>{error.message}</span>}
        {unstable_retry && <button onClick={() => unstable_retry()}>{t('tryAgain')}</button>}
        {children}
      </div>
    </>
  )
}
