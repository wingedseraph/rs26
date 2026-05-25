import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router'

import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { STORAGE } from '@/api/localStorage'
import { ThemeContextProvider } from '@/components/context/ThemeContext'
import { routes } from '@/router'
import store from '@/store'

function renderApp() {
  const router = createMemoryRouter(routes, { initialEntries: ['/'] })
  return render(
    <Provider store={store}>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </Provider>,
  )
}

describe('App', () => {
  afterEach(() => {
    localStorage.clear()
    vi.resetAllMocks()
  })

  describe('Данные загружены', () => {
    it('должен отобразить карточку с данными из MSW', async () => {
      renderApp()

      const card = await screen.findByRole('heading', { name: 'Pastoral landscape' })

      expect(card).toBeInTheDocument()
    })
  })

  describe('localStorage', () => {
    it('должен восстановить значение поиска из localStorage', async () => {
      localStorage.setItem(STORAGE, 'Paris')

      renderApp()

      const input = await screen.findByRole<HTMLInputElement>('textbox')

      expect(input).toHaveValue('Paris')
    })

    it('должен сохранить введённый текст в localStorage при submit', async () => {
      renderApp()

      const input = await screen.findByRole<HTMLInputElement>('textbox')
      await userEvent.type(input, 'Not Paris')
      await userEvent.type(input, '{Enter}')

      await waitFor(() => expect(localStorage.getItem(STORAGE)).toBe('Not Paris'))
    })
  })
})
