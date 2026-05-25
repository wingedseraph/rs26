import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ErrorPage from '@/components/error-page/ErrorPage'

describe('ErrorPage', () => {
  describe('Страница отрисована', () => {
    it('должен отобразить заголовок с текстом ошибки', () => {
      render(<MemoryRouter><ErrorPage /></MemoryRouter>)

      expect(screen.getByRole('heading')).toHaveTextContent('Something went wrong')
    })
  })
})
