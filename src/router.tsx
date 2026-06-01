import { createBrowserRouter, redirect } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'

import { App } from '@/App'
import { AboutPage } from '@/components/about-page/AboutPage'
import { CardDetailed } from '@/components/card-detailed/CardDetailed'
import ErrorPage from '@/components/error-page/ErrorPage'
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH.index,
        element: <App />,
        loader: ({ request }: LoaderFunctionArgs) => {
          const parameters = new URL(request.url.toString()).searchParams

          if (parameters.get('page') === null) {
            return redirect('?page=1')
          }

          return null
        },
        children: [
          {
            path: PATH.cardDetailed,
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
        Component: ErrorPage,
      },
    ],
  }]

export const router = createBrowserRouter(routes)
