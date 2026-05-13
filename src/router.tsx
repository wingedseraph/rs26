import { createBrowserRouter } from 'react-router'

import { getQueryImages } from '@/api/api'
import { App, STORAGE } from '@/App'

export const PATH = {
  index: '/',
  about: 'about',
  error: '*',
} as const

export const router = createBrowserRouter([
  {
    path: PATH.index,
    loader: async () => {
      return { records: await getQueryImages(localStorage.getItem(STORAGE) ?? '') }
    },
    element: <App />,
  },
  {
    path: PATH.about,
    element: <h1 id='center'> about </h1>,
  },
  {
    path: PATH.error,
    element: <h1 id='center'> error </h1>,
  },
])
