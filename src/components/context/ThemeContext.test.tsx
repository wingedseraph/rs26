import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { STORAGE_THEME } from '@/api/localStorage'
import { ThemeContextProvider } from '@/components/context/ThemeContext'
import { useTheme } from '@/hooks/useTheme'

function ThemeDisplay() {
  const theme = useTheme()
  return (
    <div>
      <span data-testid='theme-value'>{theme.value}</span>

      <button onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}>
        toggle
      </button>
    </div>
  )
}

function renderThemeDisplay() {
  return render(
    <ThemeContextProvider><ThemeDisplay /></ThemeContextProvider>,
  )
}

describe('ThemeContext', () => {
  afterEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  describe('Тема по умолчанию', () => {
    it('должен использовать светлую тему', () => {
      renderThemeDisplay()

      expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
    })
  })

  describe('Переключение темы', () => {
    it('должен переключить на темную и добавить класс dark', async () => {
      renderThemeDisplay()

      await userEvent.click(screen.getByRole('button', { name: 'toggle' }))

      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('должен убрать класс dark при переключении обратно', async () => {
      renderThemeDisplay()

      await userEvent.click(screen.getByRole('button', { name: 'toggle' }))
      await userEvent.click(screen.getByRole('button', { name: 'toggle' }))

      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('localStorage', () => {
    it('должен сохранить тему в localStorage', async () => {
      renderThemeDisplay()

      await userEvent.click(screen.getByRole('button', { name: 'toggle' }))

      expect(localStorage.getItem(STORAGE_THEME)).toBe('dark')
    })

    it('должен восстановить тему из localStorage', () => {
      localStorage.setItem(STORAGE_THEME, 'dark')

      renderThemeDisplay()

      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
    })
  })
})
