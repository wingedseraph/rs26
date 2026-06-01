import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'

function Throw(): ReactNode {
  throw new Error('Testing ErrorBoundary')
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => { })
    vi.spyOn(console, 'warn').mockImplementation(() => { })
  })

  describe('Ошибка в дочернем компоненте', () => {
    it('должен отобразить fallback UI', () => {
      render(<MemoryRouter><ErrorBoundary key='randomKey'><Throw /></ErrorBoundary></MemoryRouter>)

      expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument()
    })
  })

  describe('Ошибки нет', () => {
    it('должен отобразить дочерний компонент', () => {
      render(<ErrorBoundary key='randomKey'><h1>Hello World!</h1></ErrorBoundary>)

      expect(screen.getByRole('heading', { name: 'Hello World!' })).toBeInTheDocument()
    })
  })
})
