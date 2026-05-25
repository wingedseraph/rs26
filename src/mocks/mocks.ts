import type { Card, ValidResponse } from '@/api/typeguard'

export const SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK = {
  systemNumber: 1,
  dimensionsNote: 'Mocked artwork note',
  briefDescription: 'Mocked artwork description',
  images: ['url'],
}
export const SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK_RESPONSE = { record: SINGLE_CARD_WITH_PRIMARY_TITLE_MOCK }

export const CARD_WITH_PRIMARY_TITLE_MOCK = [
  {
    systemNumber: 1,
    objectType: 'Secondary Title',
    _primaryTitle: 'Primary Title',
    _images: {
      _iiif_image_base_url: 'example.com',
    },
  },
]

export const CARD_WITH_SECONDARY_TITLE_MOCK = CARD_WITH_PRIMARY_TITLE_MOCK.map(element => ({
  ...element,
  _primaryTitle: '',
}))

export const FALLBACK_CARDS = [
  {
    systemNumber: 68770,
    objectType: 'Print',
    _primaryTitle: 'Il Meglio del Meglio all Infinito',
    _images: { _iiif_image_base_url: 'https://framemark.vam.ac.uk/collections/2006BB5874/' },
  },
  {
    systemNumber: 68767,
    objectType: 'Print',
    _primaryTitle: 'The Top Ten Most Wanted Paintings',
    _images: { _iiif_image_base_url: 'https://framemark.vam.ac.uk/collections/2006BB5868/' },
  },
  {
    systemNumber: 71455,
    objectType: 'Watercolour',
    _primaryTitle: 'The Thames at Richmond',
    _images: { _iiif_image_base_url: 'https://framemark.vam.ac.uk/collections/2006AJ6572/' },
  },
  {
    systemNumber: 54872,
    objectType: 'Photograph',
    _primaryTitle: 'Portrait of a Young Woman',
    _images: { _iiif_image_base_url: 'https://framemark.vam.ac.uk/collections/2013GR3841/' },
  },
] satisfies Card[]

export const FALLBACK_RESPONSE = {
  records: FALLBACK_CARDS,
  info: { record_count: FALLBACK_CARDS.length },
} satisfies ValidResponse
