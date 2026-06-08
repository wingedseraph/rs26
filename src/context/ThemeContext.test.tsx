import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { ThemeContextProvider } from '@/context/ThemeContext'
import { useTheme } from '@/hooks/useTheme'
import { STORAGE_THEME } from '@/lib/localStorage'

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
  const { container } = render(
    <ThemeContextProvider><ThemeDisplay /></ThemeContextProvider>,
  )

  return { container }
}

describe('ThemeContext', () => {
  afterEach(() => {
    localStorage.clear()
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
    })

    it('должен убрать класс dark при переключении обратно', async () => {
      renderThemeDisplay()

      await userEvent.click(screen.getByRole('button', { name: 'toggle' }))
      await userEvent.click(screen.getByRole('button', { name: 'toggle' }))

      expect(screen.getByTestId('theme-value')).not.toHaveTextContent('dark')
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
