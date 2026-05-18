import { delay, http, HttpResponse } from 'msw'

import type { ValidResponse } from '@/api/typeguard'

import { BASE } from '@/api/api'

export const handlers = [
  http.get(`${BASE}/*`, async () => {
    await delay(100)
    return HttpResponse.json({
      info: { record_count: 100 },
      records: [
        {
          systemNumber: 124343,
          objectType: 'Oil painting',
          _primaryTitle: 'Pastoral landscape',
          _images: {
            _iiif_image_base_url: 'https://framemark.vam.ac.uk/collections/2007BP1066/',
          },
        },
      ],
    } satisfies ValidResponse)
  }),
]
