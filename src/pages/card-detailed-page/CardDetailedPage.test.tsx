import { createMemoryRouter, RouterProvider } from 'react-router'

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { AppStore } from '@/store'

import { ERROR_ID, INVALID_ID, VALID_ID } from '@/mocks/handlers'
import { SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK } from '@/mocks/mocks'
import { renderWithProviders } from '@/mocks/setupStore'

import { CardDetailedPage } from './CardDetailedPage'

function renderCardDetailed(id: number, store?: AppStore) {
  const routes = [
    {
      path: '/card/:id',
      element: <CardDetailedPage />,
    },
  ]
  const router = createMemoryRouter(routes, { initialEntries: [`/card/${id}`] })
  return renderWithProviders(<RouterProvider router={router} />, { store })
}

describe('CardDetailed', () => {
  describe('Отображение loading, error, cache данных при запросе', () => {
    it('должен отобразить loading при запросе', async () => {
      renderCardDetailed(VALID_ID)

      const loading = screen.getByText('Loading')

      expect(loading).toBeInTheDocument()
    })

    it('должен отобразить error при ошибке запроса', async () => {
      renderCardDetailed(ERROR_ID)

      const fallback = await screen.findByRole('heading', { name: 'Failed to load artwork' })

      expect(fallback).toBeInTheDocument()
    })

    it('должен отобразить cache данные при повторном запросе', async () => {
      const { store, unmount } = renderCardDetailed(VALID_ID)

      await screen.findByText(SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK.briefDescription)

      unmount()
      renderCardDetailed(VALID_ID, store)

      const loading = screen.queryByText('Loading')

      expect(loading).not.toBeInTheDocument()
    })
  })

  describe('Данные получены', () => {
    it('должен отобразить описание карточки', async () => {
      renderCardDetailed(VALID_ID)

      const description = await screen.findByText(SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK.briefDescription)

      expect(description).toBeInTheDocument()
    })

    it('должен отобразить изображение с alt из dimensionsNote', async () => {
      renderCardDetailed(VALID_ID)

      const img = await screen.findByRole('img')

      expect(img).toHaveAttribute('alt', SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK.dimensionsNote)
    })
  })

  describe('Данные отсутствуют', () => {
    it('должен отобразить заглушку при отсутствии record', async () => {
      renderCardDetailed(INVALID_ID)

      const fallback = await screen.findByText('Failed to load artwork')

      expect(fallback).toBeInTheDocument()
    })
  })
})
