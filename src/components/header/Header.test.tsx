import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from '@/components/header/Header'

const clearQuery = vi.fn()
const onChange = vi.fn()

describe('header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render input with provided query props', () => {
    render(<MemoryRouter><Header clearQuery={clearQuery} onChange={onChange} query='Paris' /></MemoryRouter>)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    expect(input).toBeTruthy()
    expect(input).toHaveValue('Paris')
    expect(input).not.toBeDisabled()
  })
})

describe('header user interactions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should call onChange when input value is changed', async () => {
    render(<MemoryRouter><Header clearQuery={clearQuery} onChange={onChange} query='' /></MemoryRouter>)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'Paris')

    expect(onChange).toHaveBeenCalledTimes(5)
  })
})
