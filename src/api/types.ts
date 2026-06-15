export type ValidResponse = {
  records: Card[]
  info: { record_count: number }
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
