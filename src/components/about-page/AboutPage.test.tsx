import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AboutPage } from '@/components/about-page/AboutPage'

function renderAboutPage() {
  return render(<MemoryRouter><AboutPage /></MemoryRouter>)
}

describe('AboutPage', () => {
  describe('Страница отрисована', () => {
    it('должен отобразить заголовок', () => {
      renderAboutPage()

      expect(screen.getByRole('heading')).toHaveTextContent(
        'Art enriches the soul, and that is what this project is all about',
      )
    })

    it('должен отобразить ссылку на курс с корректным href', () => {
      renderAboutPage()

      const link = screen.getByRole('link', { name: 'try the course' })

      expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs')
    })
  })
})
