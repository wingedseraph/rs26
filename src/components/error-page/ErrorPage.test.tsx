import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ErrorPage from '@/components/error-page/ErrorPage'

describe('error page', () => {
  it('should render error page', () => {
    render(<MemoryRouter><ErrorPage /></MemoryRouter>)

    const heading = screen.getByRole<HTMLHeadingElement>('heading')

    expect(heading).toHaveTextContent('Something went wrong')
  })
})
