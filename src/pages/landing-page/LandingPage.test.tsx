import { createMemoryRouter, RouterProvider } from 'react-router'

import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { AppStore } from '@/store'

import { BASE } from '@/api/artwork'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { STORAGE } from '@/lib/localStorage'
import { server } from '@/mocks/node'
import { renderWithProviders } from '@/mocks/setupStore'
import { LandingPage } from '@/pages/landing-page/LandingPage'
import { PATH } from '@/router'
import { Layout } from '@/widgets/layout/Layout'

const routes
  = [{
    element: <Layout />,
    children: [
      {
        path: PATH.index,
        element: <LandingPage />,
      },
    ],
  }]

function renderApp(store?: AppStore) {
  const router = createMemoryRouter(routes, { initialEntries: ['/?page=1'] })
  return renderWithProviders(
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>,
    { store },
  )
}

describe('App', () => {
  afterEach(() => {
    localStorage.clear()
    vi.resetAllMocks()
  })

  describe('Отображение loading, error, cache данных при запросе', () => {
    it('должен отобразить loading при запросе', async () => {
      renderApp()

      const loading = await screen.findByText('Loading...')

      expect(loading).toBeInTheDocument()
    })

    it('должен отобразить error при ошибке запроса', async () => {
      server.use(
        http.get(`${BASE}/objects/search`, () => HttpResponse.error()),
      )

      renderApp()

      const fallbackHeader = await screen.findByRole('heading', { name: 'Something went wrong' })
      const fallbackButton = await screen.findByRole('button', { name: 'Refetch data' })

      expect(fallbackHeader).toBeInTheDocument()
      expect(fallbackButton).toBeInTheDocument()
    })

    it('должен отобразить cache данные при повторном запросе', async () => {
      const { store, unmount } = renderApp()

      await screen.findByRole('heading', { name: 'Pastoral landscape' })

      unmount()
      renderApp(store)

      const loading = screen.queryByText('Loading')

      expect(loading).not.toBeInTheDocument()
    })
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

    it('должен сохранить введенный текст в localStorage при submit', async () => {
      renderApp()

      const input = await screen.findByRole<HTMLInputElement>('textbox')
      await userEvent.type(input, 'Not Paris')
      await userEvent.type(input, '{Enter}')

      await waitFor(() => expect(localStorage.getItem(STORAGE)).toBe('Not Paris'))
    })
  })
})
