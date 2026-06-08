import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { PasswordField } from '@/pages/forms-page/PasswordField'

describe('PasswordField', () => {
  it('должен отобразить label и input', () => {
    render(
      <PasswordField placeholder='Enter password' id='pw'>
        Password
      </PasswordField>,
    )

    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
  })

  it('не должен показывать индикатор силы без strength', () => {
    render(
      <PasswordField placeholder='Enter password' id='pw'>
        Password
      </PasswordField>,
    )

    expect(screen.queryByText(/lowercase/)).not.toBeInTheDocument()
  })

  it('должен показать все критерии непроверенными при начальном рендере', () => {
    render(
      <PasswordField placeholder='Enter password' id='pw' strength={true}>
        Password
      </PasswordField>,
    )

    expect(screen.getByText(/○ lowercase/)).toBeInTheDocument()
    expect(screen.getByText(/○ uppercase/)).toBeInTheDocument()
    expect(screen.getByText(/○ number/)).toBeInTheDocument()
    expect(screen.getByText(/○ special/)).toBeInTheDocument()
  })

  it('должен отметить lowercase и uppercase при вводе "Aa"', async () => {
    const user = userEvent.setup()

    render(
      <PasswordField placeholder='Enter password' id='pw' strength={true}>
        Password
      </PasswordField>,
    )

    await user.type(screen.getByPlaceholderText('Enter password'), 'Aa')

    expect(screen.getByText(/✓ lowercase/)).toBeInTheDocument()
    expect(screen.getByText(/✓ uppercase/)).toBeInTheDocument()
    expect(screen.getByText(/○ number/)).toBeInTheDocument()
  })

  it('должен отметить все 4 критерия при вводе "Aa1!"', async () => {
    const user = userEvent.setup()

    render(
      <PasswordField placeholder='Enter password' id='pw' strength={true}>
        Password
      </PasswordField>,
    )

    await user.type(screen.getByPlaceholderText('Enter password'), 'Aa1!')

    expect(screen.getByText(/✓ lowercase/)).toBeInTheDocument()
    expect(screen.getByText(/✓ uppercase/)).toBeInTheDocument()
    expect(screen.getByText(/✓ number/)).toBeInTheDocument()
    expect(screen.getByText(/✓ special/)).toBeInTheDocument()
  })

  it('должен показать hint при передаче', () => {
    render(
      <PasswordField placeholder='Enter password' id='pw' hint='Too short'>
        Password
      </PasswordField>,
    )

    expect(screen.getByText('Too short')).toBeInTheDocument()
  })
})
