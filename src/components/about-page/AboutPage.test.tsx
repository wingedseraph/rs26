import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AboutPage } from '@/components/about-page/AboutPage'

describe('about page', () => {
  it('should render about page', () => {
    const headingContent = 'Art enriches the soul, and that is what this project is all about'
    const linkContent = 'try the course'
    render(<MemoryRouter><AboutPage /></MemoryRouter>)

    const heading = screen.getByRole<HTMLHeadingElement>('heading', { name: headingContent })
    const link = screen.getByRole<HTMLHeadingElement>('link', { name: linkContent })

    expect(heading).toHaveTextContent(headingContent)
    expect(link).toHaveTextContent(linkContent)
  })
})
