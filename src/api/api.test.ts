import { describe, expect, it } from 'vitest'

import { isArray, isValidCard } from '@/api/typeguard'
import { PRIMARY_SECONDARY_TITLE_MOCK } from '@/components/card-list/CardList.test'

describe('typeguard api response', () => {
  it('should pass typeguard correct api response array', () => {
    expect(isArray(PRIMARY_SECONDARY_TITLE_MOCK, isValidCard)).toBeTruthy()
  })

  it('should fail typeguard incorrect api response array', () => {
    expect(isArray([{ wrong: 'data' }], isValidCard)).toBeFalsy()
  })
})
