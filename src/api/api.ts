export const BASE = 'https://api.vam.ac.uk/v2/objects' as const

export type ValidResponse = {
  records: Card[]
}
export type Card = {
  systemNumber: number
  objectType: string
  _primaryTitle: string
  _images: {
    _iiif_image_base_url: string
  }
}
function isObject(arg: unknown): arg is object {
  return (arg !== null && typeof arg === 'object')
}
export function isArray<T>(
  data: unknown,
  itemGuard?: (item: unknown) => item is T,
): data is T[] {
  return Array.isArray(data) && (itemGuard ? data.every(itemGuard) : true)
};
export function isValidCard(card: unknown): card is Card {
  return (
    isObject(card) && 'systemNumber' in card && '_primaryTitle' in card && '_images' in card && 'objectType' in card
  )
}
function isValidResponse(data: unknown): data is ValidResponse {
  return (
    isObject(data)
    && 'records' in data && isArray(data.records, isValidCard)
  )
}

export async function getQueryImages(query: string) {
  const res = await fetch(`${BASE}/search?q=${query}`)

  if (!res.ok) {
    throw new Error('Issue with API')
  }
  const data: unknown = await res.json()

  if (!isValidResponse(data)) {
    throw new Error('Issue with API Response')
  }
  const filteredData = data.records.filter(e => '_iiif_image_base_url' in e._images)
  return filteredData
}
