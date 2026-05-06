import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from '@/components/header/Header'

const getImages = vi.fn()
const onChange = vi.fn()

describe('header props', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render input with provided query props', () => {
    render(<Header loading={false} getImages={getImages} onChange={onChange} query="Paris" />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    expect(input).toBeTruthy()
    expect(input.value).toBe('Paris')
    expect(input.disabled).toBeFalsy()
  })

  it('should render disabled input with provided loading props', () => {
    render(<Header loading={true} getImages={getImages} onChange={onChange} query="" />)

    const input = screen.getByRole<HTMLInputElement>('textbox')

    expect(input.disabled).toBeTruthy()
  })
})

describe('header user interactions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should call onChange when input value is changed', async () => {
    render(<Header loading={false} getImages={getImages} onChange={onChange} query="" />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'Paris')

    expect(onChange).toHaveBeenCalledTimes(5)
  })

  it('should call getImages when form is submitted', async () => {
    render(<Header loading={false} getImages={getImages} onChange={onChange} query="" />)

    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '{Enter}')

    expect(getImages).toHaveBeenCalledTimes(1)
  })
})
