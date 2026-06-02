import { createContext, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_THEME } from '@/lib/localStorage'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  value: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  value: 'light',
  setTheme: () => { },
})

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const stored = useLocalStorage('light', STORAGE_THEME)
  const currentTheme: Theme = stored.value === 'dark' ? 'dark' : 'light'

  useLayoutEffect(() => {
    if (stored.value === 'light') {
      // fix: remove dom manipulation, use root react element
      document.documentElement.classList.remove('dark')
    }

    if (stored.value === 'dark') {
      document.documentElement.classList.add('dark')
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
