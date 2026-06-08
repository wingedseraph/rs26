import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Modal } from '@/pages/forms-page/Modal'

const showModalMock = vi.fn(function (this: HTMLDialogElement) {
  this.setAttribute('open', '')
})
const closeMock = vi.fn(function (this: HTMLDialogElement) {
  this.removeAttribute('open')
})

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = showModalMock
  HTMLDialogElement.prototype.close = closeMock
})

describe('Modal', () => {
  it('должен отрисоваться через портал', () => {
    render(
      <Modal isOpen={false}>
        <p>Portal content</p>
      </Modal>,
    )

    const dialog = screen.getByRole('dialog', { hidden: true })
    expect(dialog).toBeInTheDocument()
  })

  it('должен отобразить дочерние элементы', () => {
    render(
      <Modal isOpen={true}>
        <p>Child text</p>
      </Modal>,
    )

    expect(screen.getByText('Child text')).toBeInTheDocument()
  })

  it('не должен быть открыт при isOpen=false', () => {
    render(
      <Modal isOpen={false}>
        <p>Hidden</p>
      </Modal>,
    )

    const dialog = screen.getByRole('dialog', { hidden: true })
    expect(dialog).not.toHaveAttribute('open')
  })

  it('должен быть видимым при isOpen=true', () => {
    render(
      <Modal isOpen={true}>
        <p>Visible</p>
      </Modal>,
    )

    const dialog = screen.getByRole('dialog', { hidden: true })
    expect(dialog).toHaveAttribute('open')
  })

  it('должен вызвать onClose при native close event', () => {
    const handleClose = vi.fn()

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Close me</p>
      </Modal>,
    )

    const dialog = screen.getByRole('dialog', { hidden: true })
    dialog.dispatchEvent(new Event('close', { bubbles: false }))

    expect(handleClose).toHaveBeenCalled()
  })
})
