import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ThemeContextProvider } from '@/components/context/ThemeContext'
import { Header } from '@/components/header/Header'

function renderHeader(query = '') {
  const clearQuery = vi.fn()
  const onChange = vi.fn()

  render(
    <MemoryRouter>
      <ThemeContextProvider>
        <Header clearQuery={clearQuery} onChange={onChange} query={query} />
      </ThemeContextProvider>
    </MemoryRouter>,
  )

  return { clearQuery, onChange }
}

describe('Header', () => {
  describe('Отрисовка', () => {
    it('должен отобразить поле ввода с переданным значением', () => {
      renderHeader('Paris')

      expect(screen.getByRole('textbox')).toHaveValue('Paris')
    })

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
    it('должен вызвать onChange при вводе текста', async () => {
      const { onChange } = renderHeader()

      await userEvent.type(screen.getByRole('textbox'), 'Paris')

      expect(onChange).toHaveBeenCalledTimes(5)
    })

    it('должен переключить тему при клике на кнопку', async () => {
      renderHeader()

      await userEvent.click(screen.getByRole('button', { name: 'dark' }))

      expect(screen.getByRole('button', { name: 'light' })).toBeInTheDocument()
    })

    it('должен вызвать clearQuery при клике на кнопку очистки', async () => {
      const { clearQuery } = renderHeader('test')

      await userEvent.click(screen.getByRole('button', { name: 'Clear search' }))

      expect(clearQuery).toHaveBeenCalledTimes(1)
    })
  })
})
