export type ValidResponse = {
  records: Card[]
}
export type ValidResponseSingleCard = {
  record: SingleCard
}
export type Card = {
  systemNumber: number
  objectType: string
  _primaryTitle: string
  _images: {
    _iiif_image_base_url: string
  }
}
export type SingleCard = {
  systemNumber: number
  dimensionsNote: string
  briefDescription: string
  images: [string]
}
function isObject(argument: unknown): argument is object {
  return (argument !== null && typeof argument === 'object')
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
function isValidSingleCard(card: unknown): card is SingleCard {
  return (
    isObject(card) && 'systemNumber' in card && 'dimensionsNote' in card
    && 'briefDescription' in card && 'images' in card && isArray(card.images)
  )
}
export function isValidResponse(data: unknown): data is ValidResponse {
  return (
    isObject(data)
    && 'records' in data && isArray(data.records, isValidCard)
  )
}

export function isValidResponseSingleItem(data: unknown): data is ValidResponseSingleCard {
  return (
    isObject(data)
    && 'record' in data && isValidSingleCard(data.record)
  )
}
