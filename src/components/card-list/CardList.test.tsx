import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { CARD_WITH_PRIMARY_TITLE_MOCK, CARD_WITH_SECONDARY_TITLE_MOCK } from '@/mocks/mocks'
import store from '@/store'

import { CardList } from './CardList'

function renderCardList(data: Parameters<typeof CardList>[0]['data']) {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CardList data={data} page={1} />
      </MemoryRouter>
    </Provider>,
  )
}

describe('CardList', () => {
  describe('Данные отсутствуют', () => {
    it('должен отобразить заглушку', () => {
      renderCardList([])

      expect(screen.getByRole('heading', { name: 'Oh No Data' })).toBeInTheDocument()
    })
  })

  describe('Данные получены', () => {
    it('должен отобразить основной заголовок карточки', () => {
      renderCardList(CARD_WITH_PRIMARY_TITLE_MOCK)

      expect(screen.getByRole('heading', { name: 'Primary Title' })).toBeInTheDocument()
    })

    it('должен отобразить тип объекта если основной заголовок пуст', () => {
      renderCardList(CARD_WITH_SECONDARY_TITLE_MOCK)

      expect(screen.getByRole('heading', { name: 'Secondary Title' })).toBeInTheDocument()
    })
  })

  describe('Взаимодействие с кнопкой Save', () => {
    it('должен переключить Save на Saved при клике', async () => {
      renderCardList(CARD_WITH_PRIMARY_TITLE_MOCK)

      await userEvent.click(screen.getByRole('button', { name: /Save/ }))

      expect(screen.getByRole('button', { name: /Saved/ })).toBeInTheDocument()
    })
  })
})
