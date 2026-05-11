import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { BASE } from '@/api/api'
import { App, STORAGE } from '@/App'
import { server } from '@/mocks/node'

describe('app', () => {
  afterEach(() => {
    localStorage.clear()
    vi.resetAllMocks()
  })

  describe('render', () => {
    it('should render card with msw mocked data', async () => {
      render(<App />)

      await screen.findByText('Pastoral landscape')
      await screen.findByRole('img')
    })

    it('should render loading and disable form on api request', async () => {
      render(<App />)

      const input = await screen.findByRole<HTMLInputElement>('textbox')
      const loadingText = screen.getByText('Loading...')

      expect(input).toBeDisabled()
      expect(loadingText).toBeTruthy()
    })

    it('should render error on catch api 404 request', async () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => { })
      server.use(
        http.get(`${BASE}/*`, () => {
          return new HttpResponse(null, { status: 404 })
        }),
      )

      render(<App />)

      expect(await screen.findByText('Oh No Data'))
      expect(await screen.findByText(/API/i))
      expect(consoleWarn).toHaveBeenCalledTimes(1)
    })

    it('should render error on catch api invalid response data(typeguard)', async () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => { })
      server.use(
        http.get(`${BASE}/*`, () => {
          return HttpResponse.json({}, { status: 200 })
        }),
      )

      render(<App />)

      expect(await screen.findByText('Oh No Data'))
      expect(await screen.findByText(/Response/i))
      expect(consoleWarn).toHaveBeenCalledTimes(1)
    })
  })
  describe('localStorage', () => {
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

    it('should early return on query equal localStorage data', async () => {
      localStorage.setItem(STORAGE, 'Paris')
      render(<App />)

      const input = await screen.findByRole<HTMLInputElement>('textbox')
      await waitFor(() => expect(input).not.toBeDisabled())
      await userEvent.type(input, '{Enter}')

      expect(input).not.toBeDisabled()
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })
})
