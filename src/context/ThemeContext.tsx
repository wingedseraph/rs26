import { createContext } from 'react'
import type { ReactNode } from 'react'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_THEME } from '@/lib/localStorage'
import { cn } from '@/lib/utilities'

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

  const theme = {
    value: currentTheme,
    setTheme: (selectedTheme: Theme) => {
      stored.setValue(selectedTheme)
    },
  }

  return (
    <ThemeContext value={theme}>
      <div className={cn('contents', { dark: currentTheme === 'dark' })}>
        {children}
      </div>
    </ThemeContext>
  )
}

export { ThemeContext }
