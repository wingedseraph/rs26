import type { Card } from '@/api/typeguard'

export function cardToCsv(card: Card[]) {
  const header = 'systemNumber, objectType, _primaryTitle, _images._iiif_image_base_url'

  const data = card.map(element => [element.systemNumber, element.objectType, element._primaryTitle, element._images._iiif_image_base_url].join(','))
  const csv = [header, ...data].join('\r\n')

  return csv
}
