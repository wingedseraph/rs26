'use client'

import type { ComponentProps } from 'react'

import { useTheme } from '@/hooks/useTheme'

function ThemeToggle({ ...properties }: ComponentProps<'button'>) {
  const theme = useTheme()

  return (
    <button
      type='button'
      onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}
      {...properties}
    >
      {theme.value === 'light' ? 'dark' : 'light'}
    </button>
  )
}

export { ThemeToggle }
