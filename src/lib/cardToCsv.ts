import type { Card } from '@/api/types'

export function cardToCsv(card: Card[], origin?: string) {
  const header = 'id,name,description,details URL'

  const data = card.map(element => [element.systemNumber, element.objectType, element._primaryTitle, `${origin}/card/${element.systemNumber}`].join(','))
  const csv = [header, ...data].join('\r\n')

  return csv
}
