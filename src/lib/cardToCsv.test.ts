import { describe, expect, it } from 'vitest'

import { cardToCsv } from '@/lib/cardToCsv'
import { CARD_WITH_PRIMARY_TITLE_MOCK } from '@/mocks/mocks'

describe('cardToCsv', () => {
  describe('Данные переданы', () => {
    it('должен сгенерировать CSV с заголовком и строкой данных', () => {
      const csv = cardToCsv(CARD_WITH_PRIMARY_TITLE_MOCK)

      expect(csv).toContain('id,name,description,details URL')
      expect(csv).toContain('1,Secondary Title,Primary Title,')
    })
  })

  describe('Данные отсутствуют', () => {
    it('должен вернуть только заголовок для пустого массива', () => {
      const csv = cardToCsv([])
      const lines = csv.split('\r\n')

      expect(lines).toHaveLength(1)
    })
  })
})
