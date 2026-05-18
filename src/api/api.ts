import { isValidResponse, isValidResponseSingleItem } from '@/api/typeguard'

export const BASE = 'https://api.vam.ac.uk/v2' as const
const PAGE_SIZE = 6 as const

export async function getByQueryArtwork(query: string, page?: number) {
  const response = await fetch(`${BASE}/objects/search?q=${query}&images_exist=1&page_size=${PAGE_SIZE}&page=${page ?? 0}`)

  if (!response.ok) {
    throw new Error('Issue with API')
  }
  const data: unknown = await response.json()

  if (!isValidResponse(data)) {
    throw new Error('Issue with API Response')
  }
  return data.records
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
