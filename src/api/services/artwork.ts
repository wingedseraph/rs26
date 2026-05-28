import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { ValidResponse } from '@/api/typeguard'

import { BASE, PAGE_SIZE } from '@/api/api'
import { isValidResponse } from '@/api/typeguard'

type Arguments = {
  query: string
  page: number
}

export const artworkApi = createApi({
  tagTypes: ['ArtworkByQuery'],
  reducerPath: 'artworkApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  endpoints: builder => ({
    getArtworkByName: builder.query<ValidResponse, Arguments>({
      query: ({ query, page }) => {
        // urlparams instead of string
        return `/objects/search?q=${query}&images_exist=1&page_size=${PAGE_SIZE}&page=${page ?? 1}`
      },
      providesTags: ['ArtworkByQuery'],
      transformResponse: async (response) => {
        if (!isValidResponse(response)) {
          // todo neverthrow
          throw new Error('error in typeguard')
        }
        console.warn(response) // todo remove
        return response
      },
    }),
  }),
})

export const { useGetArtworkByNameQuery } = artworkApi
