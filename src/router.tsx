import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import { getQueryImages } from '@/api/api'
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
    loader: async () => {
      // todo: useSearchParams: /?q="Paris"
      // localStorage.get
      // ""
      return { records: await getQueryImages(localStorage.getItem(STORAGE) ?? '') }
    },
    element: <App />,
    children: [
      { path: PATH.cardDetailed, element: <CardDetailed /> },
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
