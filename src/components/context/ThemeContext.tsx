import { createContext, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'

import { STORAGE_THEME } from '@/api/localStorage'
import { useLocalStorage } from '@/hooks/useLocalStorage'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  value: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  value: 'light',
  setTheme: () => {},
})

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const stored = useLocalStorage('light', STORAGE_THEME)
  const currentTheme: Theme = stored.value === 'dark' ? 'dark' : 'light'

  useLayoutEffect(() => {
    if (stored.value === 'light') {
      document.body.classList.remove('dark')
    }

    if (stored.value === 'dark') {
      document.body.classList.add('dark')
    }
  }, [stored.value])

  const theme = {
    value: currentTheme,
    setTheme: (selectedTheme: Theme) => {
      stored.setValue(selectedTheme)
    },
  }

  return (
    <ThemeContext value={theme}>
      {children}
    </ThemeContext>
  )
}

export { ThemeContext }
