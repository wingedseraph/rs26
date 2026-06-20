import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { ValidResponse, ValidResponseSingleCard } from '@/api/types'

import { isValidResponse, isValidResponseSingleItem } from '@/api/typeguard'

type Arguments = {
  query: string
  page: string
}

export const BASE = 'https://api.vam.ac.uk/v2'
export const PAGE_SIZE = '6'
const IMAGES_EXIST = '1'

const byQueryTag = 'ArtworkByQuery'
const byIdTag = 'ArtworkById'

// fix need to place it in server_action directory?
export async function getByQueryArtwork(query: string, page?: string) {
  const response = await fetch(`${BASE}/objects/search?q=${query}&images_exist=1&page_size=${PAGE_SIZE}&page=${page ?? 0}`)

  if (!response.ok) {
    throw new Error('Issue with API')
  }
  const data: unknown = await response.json()

  if (!isValidResponse(data)) {
    throw new Error('Issue with API Response')
  }
  const records = data.records
  const recordsCount = data.info.record_count

  return { records, recordsCount }
}
export async function getByIdArtwork(id: string) {
  const response = await fetch(`${BASE}/museumobject/${id}`)
  if (!response.ok) {
    throw new Error('Issue with API')
  }
  const data: unknown = await response.json()

  if (!isValidResponseSingleItem(data)) {
    throw new Error('Issue with API Response')
  }
  return data
}

export const artworkApi = createApi({
  // fix later process.env*
  // eslint-disable-next-line node/prefer-global/process
  keepUnusedDataFor: Number.isFinite(Number(process.env.NEXT_PUBLIC_TTL)) ? Number(process.env.NEXT_PUBLIC_TTL) : 20,
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
