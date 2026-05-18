import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import { getByIdArtwork, getByQueryArtwork } from '@/api/api'
import { STORAGE } from '@/api/localStorage'
import { App } from '@/App'
import { AboutPage } from '@/components/about-page/AboutPage'
import { CardDetailed } from '@/components/card-detailed/CardDetailed'

export const PATH = {
  index: '/',
  cardDetailed: 'card/:id',
  about: 'about',
  error: '*',
} as const

export const router = createBrowserRouter([
  {
    path: PATH.index,
    loader: async ({ request }) => {
      const query = localStorage.getItem(STORAGE) ?? ''
      const parameters = new URL(request.url.toString()).searchParams
      const page = Number(parameters.get('page')) || 1
      const nonNegativePage = page > 0 ? page : 1

      return { records: await getByQueryArtwork(query, nonNegativePage) }
    },
    element: <App />,
    children: [
      {
        path: PATH.cardDetailed,
        loader: async ({ params }) => {
          if (params.id != null) {
            const result = await getByIdArtwork(params.id)
            return result
          }
        },
        element: <CardDetailed />,
      },
    ],
  },
  {
    path: PATH.about,
    element: <AboutPage />,
  },
  {
    path: PATH.error,
    Component: lazy(async () => import('@/components/error-page/ErrorPage')),
  },
])
