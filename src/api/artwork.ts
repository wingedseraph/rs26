import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { ValidResponse, ValidResponseSingleCard } from '@/api/types'

import { isValidResponse, isValidResponseSingleItem } from '@/api/typeguard'

type Arguments = {
  query: string
  page: string
}

export const BASE = 'https://api.vam.ac.uk/v2'
export const PAGE_SIZE = '6'
export const IMAGES_EXIST = '1'

export const byQueryTag = 'ArtworkByQuery'
export const byIdTag = 'ArtworkById'

export const artworkApi = createApi({
  keepUnusedDataFor: Number.isFinite(Number(import.meta.env.VITE_TTL)) ? Number(import.meta.env.VITE_TTL) : 20,
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
