'use client'

import type { ComponentProps } from 'react'

import { useTranslations } from 'next-intl'

import { useTheme } from '@/hooks/useTheme'

function ThemeToggle({ ...properties }: ComponentProps<'button'>) {
  const t = useTranslations('ThemeToggle')
  const theme = useTheme()

  return (
    <button
      type='button'
      onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}
      {...properties}
    >
      {theme.value === 'light' ? t('dark') : t('light')}
    </button>
  )
}

export { ThemeToggle }
