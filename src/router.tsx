import { lazy } from 'react'
import { createBrowserRouter, redirect } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'

import { getByIdArtwork, getByQueryArtwork } from '@/api/api'
import { STORAGE } from '@/api/localStorage'
import { App } from '@/App'
import { AboutPage } from '@/components/about-page/AboutPage'
import { CardDetailed } from '@/components/card-detailed/CardDetailed'
import { Layout } from '@/components/layout/Layout'

export const PATH = {
  index: '/',
  cardDetailed: 'card/:id',
  about: 'about',
  error: '*',
} as const

export const routes
  = [{
    element: <Layout />,
    children: [
      {
        path: PATH.index,
        loader: async ({ request }: LoaderFunctionArgs) => {
          // todo: упросить логику, будто можно сделать и лаконичнее
          const query = localStorage.getItem(STORAGE) ?? ''
          const parameters = new URL(request.url.toString()).searchParams
          if (parameters.get('page') == null) {
            return redirect('?page=1')
          }
          const page = Number(parameters.get('page'))

          const nonNegativePage = page > 0 ? page : 1

          const result = await getByQueryArtwork(query, nonNegativePage)
          return result
        },
        element: <App />,
        children: [
          {
            path: PATH.cardDetailed,
            loader: async ({ params }: LoaderFunctionArgs) => {
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
    ],
  }]

export const router = createBrowserRouter(routes)
