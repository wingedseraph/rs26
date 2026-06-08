import { screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { VALID_FORM_DATA } from '@/mocks/mocks'
import { renderWithProviders } from '@/mocks/setupStore'
import { RHFForm } from '@/pages/forms-page/forms/RHFForm'

vi.mock('@/lib/base64', () => ({
  toBase64: vi.fn().mockResolvedValue('data:image/png;base64,mock'),
}))

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn()
  HTMLDialogElement.prototype.close = vi.fn()
})

async function fillForm(user: ReturnType<typeof renderWithProviders>['user']) {
  await user.type(screen.getByLabelText(/name/i), VALID_FORM_DATA.name)
  await user.type(screen.getByPlaceholderText(/your password/i), VALID_FORM_DATA.password)
  await user.type(screen.getByPlaceholderText(/repeat password/i), VALID_FORM_DATA.passwordConfirm)
  await user.type(screen.getByLabelText(/age/i), String(VALID_FORM_DATA.age))
  await user.type(screen.getByLabelText(/email/i), VALID_FORM_DATA.email)
  await user.type(screen.getByLabelText(/country/i), VALID_FORM_DATA.country)
  await user.click(screen.getByRole('radio', { name: /^male$/i }))
  await user.upload(screen.getByLabelText(/profile picture/i), VALID_FORM_DATA.file)
  await user.click(screen.getByLabelText(/terms/i))
}

describe('RHFForm', () => {
  it('должен отобразить все поля', () => {
    renderWithProviders(<RHFForm />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your password/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/repeat password/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /gender/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
    expect(screen.getByText(/choose file/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/terms/i)).toBeInTheDocument()
  })

  it('должен заблокировать кнопку submit при невалидной форме', () => {
    renderWithProviders(<RHFForm />)

    const submitButton = screen.getByRole('button', { name: /accept/i })
    expect(submitButton).toBeDisabled()
  })

  it('должен отобразить кнопку cancel', () => {
    const handleClick = vi.fn()
    renderWithProviders(<RHFForm onSuccess={handleClick} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    expect(cancelButton).toBeInTheDocument()
  })

  it('должен отправить данные в стор при валидном submit', async () => {
    const { user, store } = renderWithProviders(<RHFForm />)

    await fillForm(user)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /accept/i })).toBeEnabled()
    })

    await user.click(screen.getByRole('button', { name: /accept/i }))

    await waitFor(() => {
      expect(store.getState().submissions).toHaveLength(1)
    })
  })
})
