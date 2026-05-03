const BASE = 'https://api.vam.ac.uk/v2/objects' as const

type ValidResponse = {
  records: Card[]
}
type Card = {
  _primaryTitle: string
  _images: {
    _iiif_image_base_url: string
  }
}
function isObject(arg: unknown): arg is object {
  return (arg !== null && typeof arg === 'object')
}
function isArray<T>(
  data: unknown,
  itemGuard?: (item: unknown) => item is T,
): data is T[] {
  return Array.isArray(data) && (itemGuard ? data.every(itemGuard) : true)
};
function isValidCard(card: unknown): card is Card {
  return (
    isObject(card) && '_primaryTitle' in card && '_images' in card
  )
}
function isValidResponse(data: unknown): data is ValidResponse {
  return (
    isObject(data)
    && 'records' in data && isArray(data.records, isValidCard)
  )
}

export async function getImages() {
  const res = await fetch(BASE)

  if (!res.ok) {
    // todo, use variable instead of plain string?
    throw new Error('Issue with API')
  }

  const data = await res.json()

  if (!isValidResponse(data)) {
    // todo, use variable instead of plain string?
    throw new Error('Issue with API Response')
  }
  return data
}
export async function getQueryImages(query: string) {
  // fix dont like that body of request so similar, probably we need to combine it
  const res = await fetch(`${BASE}/search?q=${query}`)

  if (!res.ok) {
    // todo, use variable instead of plain string?
    throw new Error('Issue with API')
  }
  const data = await res.json()

  if (!isValidResponse(data)) {
    // todo, use variable instead of plain string?
    throw new Error('Issue with API Response')
  }
  return data
}
