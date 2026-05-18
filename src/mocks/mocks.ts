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
