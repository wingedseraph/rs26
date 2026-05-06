import type { ReactNode } from 'react'

import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'

function Throw(): ReactNode {
  throw new Error('Testing ErrorBoundary')
}

describe('errorboundary', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  it('should render fallback ui when render error appear', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { })
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => { })
    render(<ErrorBoundary><Throw /></ErrorBoundary>)

    const header = screen.getByText('Something went wrong')
    expect(header).toBeTruthy()
    expect(consoleError).toHaveBeenCalledTimes(1)
    expect(consoleWarn).toHaveBeenCalledTimes(1)
  })

  it('should render children if no error appear', () => {
    render(<ErrorBoundary><h1>Hello World!</h1></ErrorBoundary>)

    const header = screen.getByText('Hello World!')
    expect(header).toBeTruthy()
  })
})
