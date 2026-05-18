import { describe, expect, it } from 'vitest'

import { isArray, isValidCard, isValidResponseSingleItem, isValidSingleCard } from '@/api/typeguard'
import { CARD_WITH_PRIMARY_TITLE_MOCK, SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK, SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK_RESPONSE } from '@/mocks/mocks'

describe('typeguard api response for many items', () => {
  it('should pass typeguard correct api response array', () => {
    expect(isArray(CARD_WITH_PRIMARY_TITLE_MOCK, isValidCard)).toBeTruthy()
  })

  it('should fail typeguard incorrect api response array', () => {
    expect(isArray([{ wrong: 'data' }], isValidCard)).toBeFalsy()
  })
})

describe('typeguard api response for single item', () => {
  it('should pass typeguard correct api response single card object', () => {
    expect(isValidSingleCard(SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK))
  })

  it('should fail typeguard incorrect api response single card object', () => {
    expect(isValidSingleCard({ wrong: 'data' })).toBeFalsy()
  })

  it('should pass typeguard incorrect api response object with card', () => {
    expect(isValidResponseSingleItem(SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK_RESPONSE)).toBeTruthy()
  })

  it('should fail typeguard incorrect api response object with card', () => {
    expect(isValidResponseSingleItem({ wrong: 'data' })).toBeFalsy()
  })
})
