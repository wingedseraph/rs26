import { screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { VALID_FORM_DATA } from '@/mocks/mocks'
import { renderWithProviders } from '@/mocks/setupStore'
import { UncontrolledForm } from '@/pages/forms-page/forms/UncontrolledForm'

vi.mock('@/lib/base64', () => ({
  toBase64: vi.fn().mockResolvedValue('data:image/png;base64,mock'),
}))

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn()
  HTMLDialogElement.prototype.close = vi.fn()
})

// user.upload ставит files на wrapper через Object.defineProperty,
// jsdom FormData читает files с impl через внутренний Symbol —
// файл не попадает в FormData. Мокаем safeParse как границу.
// Валидация покрыта в schema.test.ts.
function mockSafeParse() {
  return import('@/pages/forms-page/schema/schema').then(({ schema }) => {
    vi.spyOn(schema, 'safeParse').mockReturnValue({
      success: true,
      data: VALID_FORM_DATA,
    } as ReturnType<typeof schema.safeParse>)
  })
}

describe('UncontrolledForm', () => {
  it('должен отобразить все поля', () => {
    renderWithProviders(<UncontrolledForm />)

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

  it('должен показать ошибки валидации при пустом submit', async () => {
    const { user } = renderWithProviders(<UncontrolledForm />)

    await user.click(screen.getByRole('button', { name: /accept/i }))

    await waitFor(() => {
      expect(screen.getByText('First letter must be uppercase!')).toBeInTheDocument()
    })
  })

  it('должен отправить данные в стор при валидном submit', async () => {
    await mockSafeParse()

    const { user, store } = renderWithProviders(<UncontrolledForm />)

    await user.click(screen.getByRole('button', { name: /accept/i }))

    await waitFor(() => {
      expect(store.getState().submissions).toHaveLength(1)
    })
  })

  it('должен вызвать onSuccess после успешного submit', async () => {
    await mockSafeParse()

    const handleClick = vi.fn()
    const { user } = renderWithProviders(<UncontrolledForm onSuccess={handleClick} />)

    await user.click(screen.getByRole('button', { name: /accept/i }))

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
