import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import { BASE, getByIdArtwork, getByQueryArtwork } from '@/api/api'
import { isArray, isValidCard, isValidResponse, isValidResponseSingleItem, isValidSingleCard } from '@/api/typeguard'
import { CARD_WITH_PRIMARY_TITLE_MOCK, FALLBACK_CARDS, FALLBACK_RESPONSE, MSW_SEARCH_RESPONSE, MSW_SINGLE_CARD_RESPONSE, SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK, SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK_RESPONSE } from '@/mocks/mocks'
import { server } from '@/mocks/node'

describe('isArray', () => {
  it('должен пройти для валидного массива с guard', () => {
    expect(isArray(CARD_WITH_PRIMARY_TITLE_MOCK, isValidCard)).toBe(true)
  })

  it('должен отклонить массив с невалидными элементами', () => {
    expect(isArray([{ wrong: 'data' }], isValidCard)).toBe(false)
  })

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['number', 42],
  ])('должен отклонить %s', (_, value) => {
    expect(isArray(value)).toBe(false)
  })
})

describe('isValidCard', () => {
  it('должен пройти для валидной карточки', () => {
    expect(isValidCard(CARD_WITH_PRIMARY_TITLE_MOCK[0])).toBe(true)
  })

  it('должен отклонить объект с отсутствующими полями', () => {
    expect(isValidCard({ systemNumber: 1 })).toBe(false)
  })
})

describe('isValidSingleCard', () => {
  it('должен пройти для валидной одиночной карточки', () => {
    expect(isValidSingleCard(SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK)).toBe(true)
  })

  it('должен отклонить невалидный объект', () => {
    expect(isValidSingleCard({ wrong: 'data' })).toBe(false)
  })
})

describe('isValidResponse', () => {
  it('должен пройти для валидного ответа', () => {
    expect(isValidResponse(FALLBACK_RESPONSE)).toBe(true)
  })

  it('должен отклонить ответ без records', () => {
    expect(isValidResponse({ info: { record_count: 0 } })).toBe(false)
  })

  it('должен отклонить ответ без info', () => {
    expect(isValidResponse({ records: [] })).toBe(false)
  })
})

describe('isValidResponseSingleItem', () => {
  it('должен пройти для валидного ответа с карточкой', () => {
    expect(isValidResponseSingleItem(SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK_RESPONSE)).toBe(true)
  })

  it('должен отклонить невалидный ответ', () => {
    expect(isValidResponseSingleItem({ wrong: 'data' })).toBe(false)
  })
})

describe('getByQueryArtwork', () => {
  it('должен вернуть записи и количество', async () => {
    // eslint-disable-next-line testing-library/no-await-sync-queries
    const result = await getByQueryArtwork('test')

    expect(result.records).toEqual(MSW_SEARCH_RESPONSE.records)
    expect(result.recordsCount).toBe(MSW_SEARCH_RESPONSE.info.record_count)
  })

  it('должен вернуть fallback данные при ошибке сервера', async () => {
    server.use(
      http.get(`${BASE}/objects/search`, () => HttpResponse.error()),
    )

    // eslint-disable-next-line testing-library/no-await-sync-queries
    const result = await getByQueryArtwork('test')

    expect(result.records).toEqual(FALLBACK_CARDS)
  })

  it('должен вернуть fallback данные при невалидном ответе', async () => {
    server.use(
      http.get(`${BASE}/objects/search`, () => HttpResponse.json({ wrong: 'data' })),
    )

    // eslint-disable-next-line testing-library/no-await-sync-queries
    const result = await getByQueryArtwork('test')

    expect(result.records).toEqual(FALLBACK_CARDS)
  })
})

describe('getByIdArtwork', () => {
  it('должен вернуть данные карточки', async () => {
    // eslint-disable-next-line testing-library/no-await-sync-queries
    const result = await getByIdArtwork('1')

    expect(result).toEqual(MSW_SINGLE_CARD_RESPONSE)
  })

  it('должен вернуть пустой объект при ошибке сервера', async () => {
    server.use(
      http.get(`${BASE}/museumobject/:id`, () => HttpResponse.error()),
    )

    // eslint-disable-next-line testing-library/no-await-sync-queries
    const result = await getByIdArtwork('1')

    expect(result).toEqual({})
  })
})
