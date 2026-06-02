import { Provider } from 'react-redux'

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CARD_WITH_PRIMARY_TITLE_MOCK } from '@/mocks/mocks'
import store, { removeAll, toggleOne } from '@/store'

import { Flyout } from './Flyout'

function renderFlyout() {
  return render(
    <Provider store={store}>
      <Flyout />
    </Provider>,
  )
}

describe('Flyout', () => {
  beforeEach(() => {
    store.dispatch(removeAll())
  })

  describe('Карточки не выбраны', () => {
    it('не должен отрисовываться', () => {
      renderFlyout()

      expect(screen.queryByRole('button', { name: 'Unselect all' })).not.toBeInTheDocument()
    })
  })

  describe('Карточки выбраны', () => {
    it('должен отобразить счетчик и кнопки действий', () => {
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))

      renderFlyout()

      expect(screen.getByText(/1/)).toBeInTheDocument()
    })
  })

  describe('Сброс выбора', () => {
    it('должен скрыть flyout после Unselect all', async () => {
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))

      renderFlyout()

      await userEvent.click(screen.getByRole('button', { name: 'Unselect all' }))

      expect(screen.queryByRole('button', { name: 'Unselect all' })).not.toBeInTheDocument()
    })
  })

  describe('Скачивание CSV', () => {
    it('должен создать blob и установить атрибуты скачивания', async () => {
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))

      renderFlyout()

      const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => { })
      const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test')

      await userEvent.click(screen.getByRole('button', { name: /Download/ }))

      const downloadLink = screen.getByLabelText('download')

      expect(createObjectURL).toHaveBeenCalled()
      expect(downloadLink).toHaveAttribute('href', 'blob:test')
      expect(downloadLink).toHaveAttribute('download', '1 selected cards.csv')

      createObjectURL.mockRestore()
      revokeObjectURL.mockRestore()
    })
  })
})
