import { createBrowserRouter, redirect } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'

import { AboutPage } from '@/pages/about-page/AboutPage'
import { CardDetailedPage } from '@/pages/card-detailed-page/CardDetailedPage'
import ErrorPage from '@/pages/error-page/ErrorPage'
import { FormsPage } from '@/pages/forms-page/FormsPage'
import { LandingPage } from '@/pages/landing-page/LandingPage'
import { Layout } from '@/widgets/layout/Layout'

export const PATH = {
  index: '/',
  cardDetailed: 'card/:id',
  forms: 'forms',
  about: 'about',
  error: '*',
} as const

const FORM_TASK = true

export const routes
  = [{
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH.index,
        element: <LandingPage />,
        loader: ({ request }: LoaderFunctionArgs) => {
          if (FORM_TASK) {
            return redirect(PATH.forms)
          }

          const parameters = new URL(request.url.toString()).searchParams

          if (parameters.get('page') === null) {
            return redirect('?page=1')
          }

          return null
        },
        children: [
          {
            path: PATH.cardDetailed,
            element: <CardDetailedPage />,
          },
        ],
      },
      {
        path: PATH.forms,
        element: <FormsPage />,
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
