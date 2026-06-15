import type { Card } from '@/api/types'

export function cardToCsv(card: Card[]) {
  const header = 'id,name,description,details URL'

  const data = card.map(element => [element.systemNumber, element.objectType, element._primaryTitle, `${window.location.origin}/card/${element.systemNumber}`].join(','))
  const csv = [header, ...data].join('\r\n')

  return csv
}
