import { beforeEach, describe, expect, it } from 'vitest'

import type { Card } from '@/api/typeguard'

import { CARD_WITH_PRIMARY_TITLE_MOCK } from '@/mocks/mocks'
import store, { removeAll, toggleOne } from '@/store'

const mockCard2: Card = {
  systemNumber: 2,
  objectType: 'Painting',
  _primaryTitle: 'Test Card 2',
  _images: { _iiif_image_base_url: 'https://example2.com/' },
}

describe('Store selectedCards', () => {
  beforeEach(() => {
    store.dispatch(removeAll())
  })

  describe('Добавление карточки', () => {
    it('должен добавить карточку в стор', () => {
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))

      expect(store.getState().selectedCards[1]).toEqual(CARD_WITH_PRIMARY_TITLE_MOCK[0])
    })

    it('должен добавить несколько карточек', () => {
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))
      store.dispatch(toggleOne({ id: 2, card: mockCard2 }))

      expect(Object.keys(store.getState().selectedCards)).toHaveLength(2)
    })
  })

  describe('Удаление карточки', () => {
    it('должен удалить карточку при повторном toggle', () => {
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))

      expect(store.getState().selectedCards[1]).toBeUndefined()
    })
  })

  describe('Сброс всех карточек', () => {
    it('должен очистить стор при removeAll', () => {
      store.dispatch(toggleOne({ id: 1, card: CARD_WITH_PRIMARY_TITLE_MOCK[0] }))
      store.dispatch(toggleOne({ id: 2, card: mockCard2 }))
      store.dispatch(removeAll())

      expect(Object.keys(store.getState().selectedCards)).toHaveLength(0)
    })
  })
})
