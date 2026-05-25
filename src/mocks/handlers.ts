import { delay, http, HttpResponse } from 'msw'

import { BASE } from '@/api/api'
import { MSW_SEARCH_RESPONSE, MSW_SINGLE_CARD_RESPONSE } from '@/mocks/mocks'

export const handlers = [
  http.get(`${BASE}/objects/search`, async () => {
    await delay(100)
    return HttpResponse.json(MSW_SEARCH_RESPONSE)
  }),

  http.get(`${BASE}/museumobject/:id`, async () => {
    await delay(100)
    return HttpResponse.json(MSW_SINGLE_CARD_RESPONSE)
  }),
]
