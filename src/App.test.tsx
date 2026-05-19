import { createMemoryRouter, RouterProvider } from 'react-router'

import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { STORAGE } from '@/api/localStorage'
import { routes } from '@/router'

describe('app', () => {
  afterEach(() => {
    localStorage.clear()
    vi.resetAllMocks()
  })

  describe('render', () => {
    it('should render card with msw mocked data', async () => {
      const router = createMemoryRouter(routes, { initialEntries: ['/'] })
      render(<RouterProvider router={router} />)

      const card = await screen.findByRole('heading', { name: 'Pastoral landscape' })
      const img = await screen.findByRole('img')

      expect(card).toBeInTheDocument()
      expect(img).toBeInTheDocument()
    })
  })
  describe('localStorage', () => {
    it('should get data from localStorage', async () => {
      const query = 'Paris'
      localStorage.setItem(STORAGE, query)

      const router = createMemoryRouter(routes, { initialEntries: ['/'] })
      render(<RouterProvider router={router} />)

      const input = await screen.findByRole<HTMLInputElement>('textbox')

      expect(input).toHaveValue(query)
    })

    it('should set data to localStorage on submit', async () => {
      const query = 'Not Paris'
      const router = createMemoryRouter(routes, { initialEntries: ['/'] })
      render(<RouterProvider router={router} />)

      const input = await screen.findByRole<HTMLInputElement>('textbox')
      await waitFor(() => expect(input).not.toBeDisabled())
      await userEvent.type(input, query)
      await userEvent.type(input, '{Enter}')

      await waitFor(() => expect(localStorage.getItem(STORAGE)).toBe(query))
    })
  })
})
