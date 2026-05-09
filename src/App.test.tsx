import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { App, STORAGE } from '@/App'

import { ErrorBoundary } from './components/error-boundary/ErrorBoundary'

describe('render app', () => {
  afterEach(() => localStorage.clear())
  it('should render card with msw mocked data', async () => {
    render(<App />)

    await screen.findByText('Pastoral landscape')
    await screen.findByRole('img')
  })

  it('should get data from localStorage', async () => {
    const query = 'Paris'
    localStorage.setItem(STORAGE, query)

    render(<App />)

    const input = await screen.findByRole<HTMLInputElement>('textbox')

    expect(input).toHaveValue(query)
  })
  it('should set data to localStorage on submit', async () => {
    const query = 'Not Paris'
    render(<App />)

    const input = await screen.findByRole<HTMLInputElement>('textbox')
    await waitFor(() => expect(input).not.toBeDisabled())
    await userEvent.type(input, query)
    await userEvent.type(input, '{Enter}')

    await waitFor(() => expect(localStorage.getItem(STORAGE)).toBe(query))
  })
  it('should display loading and disable form on api request', async () => {
    render(<App />)

    const input = await screen.findByRole<HTMLInputElement>('textbox')
    const loadingText = screen.getByText('Loading...')

    expect(input).toBeDisabled()
    expect(loadingText).toBeTruthy()
  })
  it('should early return on query equal localStorage data', async () => {
    localStorage.setItem(STORAGE, 'Paris')
    render(<App />)

    const input = await screen.findByRole<HTMLInputElement>('textbox')
    await waitFor(() => expect(input).not.toBeDisabled())
    await userEvent.type(input, '{Enter}')

    expect(input).not.toBeDisabled()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })
  it('should render fallback ui on throw error', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { })
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => { })
    render(<ErrorBoundary><App /></ErrorBoundary>)

    const button = await screen.findByRole<HTMLButtonElement>('button')
    await userEvent.click(button)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(consoleError).toHaveBeenCalledTimes(1)
    expect(consoleWarn).toHaveBeenCalledTimes(1)
    vi.resetAllMocks()
  })
})
