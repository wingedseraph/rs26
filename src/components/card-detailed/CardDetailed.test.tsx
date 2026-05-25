import { createMemoryRouter, RouterProvider } from 'react-router'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK } from '@/mocks/mocks'

import { CardDetailed } from './CardDetailed'

function renderCardDetailed(record = SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK) {
  const routes = [
    {
      path: '/card/:id',
      element: <CardDetailed />,
      loader: () => ({ record }),
    },
  ]
  const router = createMemoryRouter(routes, { initialEntries: ['/card/1'] })
  return render(<RouterProvider router={router} />)
}

describe('CardDetailed', () => {
  describe('Данные получены', () => {
    it('должен отобразить описание карточки', async () => {
      renderCardDetailed()

      const description = await screen.findByText(SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK.briefDescription)

      expect(description).toBeInTheDocument()
    })

    it('должен отобразить изображение с alt из dimensionsNote', async () => {
      renderCardDetailed()

      const img = await screen.findByRole('img')

      expect(img).toHaveAttribute('alt', SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK.dimensionsNote)
    })
  })

  describe('Данные отсутствуют', () => {
    it('должен отобразить заглушку при отсутствии record', async () => {
      const routes = [
        {
          path: '/card/:id',
          element: <CardDetailed />,
          loader: () => ({ record: null }),
        },
      ]
      const router = createMemoryRouter(routes, { initialEntries: ['/card/1'] })
      render(<RouterProvider router={router} />)

      const fallback = await screen.findByText('no data')

      expect(fallback).toBeInTheDocument()
    })
  })
})
