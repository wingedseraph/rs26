import { delay, http, HttpResponse } from 'msw'

import { BASE } from '@/api/artwork'
import { MSW_SEARCH_RESPONSE, MSW_SINGLE_CARD_RESPONSE } from '@/mocks/mocks'

export const VALID_ID = 1
export const INVALID_ID = 4
export const ERROR_ID = 999

export const handlers = [
  http.get(`${BASE}/objects/search`, async () => {
    await delay(100)
    return HttpResponse.json(MSW_SEARCH_RESPONSE)
  }),

  http.get(`${BASE}/museumobject/${VALID_ID}`, async () => {
    await delay(100)
    return HttpResponse.json(MSW_SINGLE_CARD_RESPONSE)
  }),

  http.get(`${BASE}/museumobject/${INVALID_ID}`, async () => {
    await delay(100)
    return HttpResponse.json(null)
  }),

  http.get(`${BASE}/museumobject/${ERROR_ID}`, async () => {
    return HttpResponse.error()
  }),
]
