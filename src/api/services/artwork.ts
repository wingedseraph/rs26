import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { ValidResponse, ValidResponseSingleCard } from '@/api/typeguard'

import { BASE, IMAGES_EXIST, PAGE_SIZE } from '@/api/api'
import { isValidResponse, isValidResponseSingleItem } from '@/api/typeguard'

type Arguments = {
  query: string
  page: string
}

export const byQueryTag = 'ArtworkByQuery'
export const byIdTag = 'ArtworkById'

export const artworkApi = createApi({
  keepUnusedDataFor: Number(import.meta.env.VITE_TTL) ?? 20,
  tagTypes: ['ArtworkByQuery', 'ArtworkById'],
  reducerPath: 'artworkApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  endpoints: builder => ({
    getArtworkByName: builder.query<ValidResponse, Arguments>({
      query: ({ query, page }) => {
        const parameters = new URLSearchParams({
          q: query,
          images_exist: IMAGES_EXIST,
          page_size: PAGE_SIZE,
          page: page ?? '1',
        })

        return `/objects/search?${parameters.toString()}`
      },
      providesTags: [byQueryTag],
      transformResponse: async (response) => {
        if (!isValidResponse(response)) {
          throw new Error('error in typeguard')
        }
        return response
      },
    }),
    getArtworkById: builder.query<ValidResponseSingleCard, string>({
      query: (id) => {
        return `/museumobject/${id}`
      },
      providesTags: [byIdTag],
      transformResponse: async (response) => {
        if (!isValidResponseSingleItem(response)) {
          throw new Error('error in typeguard')
        }
        return response
      },
    }),
  }),
})

export const { useGetArtworkByNameQuery, useGetArtworkByIdQuery } = artworkApi
