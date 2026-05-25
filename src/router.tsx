import { createBrowserRouter } from 'react-router'

import { App } from '@/App'
import { AboutPage } from '@/components/about-page/AboutPage'
import { CardDetailed } from '@/components/card-detailed/CardDetailed'
import ErrorPage from '@/components/error-page/ErrorPage'
import { Layout } from '@/components/layout/Layout'
import { loaderGetAllCards, loaderGetOneCard } from '@/router-loader'

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
        loader: loaderGetAllCards,
        element: <App />,
        children: [
          {
            path: PATH.cardDetailed,
            loader: loaderGetOneCard,
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
