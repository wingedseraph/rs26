import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ThemeContextProvider } from '@/components/context/ThemeContext'
import { Header } from '@/components/header/Header'

function renderHeader() {
  const setQuery = vi.fn()

  render(
    <MemoryRouter>
      <ThemeContextProvider>
        <Header />
      </ThemeContextProvider>
    </MemoryRouter>,
  )

  return { setQuery }
}

describe('Header', () => {
  describe('Рендер', () => {
    it('должен отобразить кнопку переключения темы', () => {
      renderHeader()

      expect(screen.getByRole('button', { name: 'dark' })).toBeInTheDocument()
    })

    it('должен отобразить навигационные ссылки', () => {
      renderHeader()

      expect(screen.getByRole('link', { name: 'about' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'error' })).toBeInTheDocument()
    })
  })

  describe('Взаимодействия', () => {
    it('должен переключить тему при клике на кнопку', async () => {
      renderHeader()

      await userEvent.click(screen.getByRole('button', { name: 'dark' }))

      expect(screen.getByRole('button', { name: 'light' })).toBeInTheDocument()
    })
  })
})
