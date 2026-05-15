import { createBrowserRouter } from 'react-router'

import { getQueryImages } from '@/api/api'
import { App, STORAGE } from '@/App'
import { About } from '@/components/about/About'

import { CardDetailed } from './components/card-detailed/CardDetailed'

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
      // todo rewrite to useLocalStorage
      return { records: await getQueryImages(localStorage.getItem(STORAGE) ?? '') }
    },
    element: <App />,
    children: [
      { path: PATH.cardDetailed, element: <CardDetailed /> },
    ],
  },
  {
    path: PATH.about,
    element: <About />,
  },
  {
    path: PATH.error,
    element: <h1 id='center'> error </h1>,
  },
])
