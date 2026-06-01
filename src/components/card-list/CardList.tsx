import type { Card } from '@/api/typeguard'

import { CardItem } from '@/components/card-list/Card'

type CardListProperties = {
  data: Card[]
  page: string
}

function CardList({ data: cards, page }: CardListProperties) {
  if (cards.length === 0) {
    return (
      <h2 className='appear'>Oh No Data</h2>
    )
  }

  return (
    <div className='columns-2 gap-6 pt-10 md:columns-3 outlet:md:columns-2'>
      {cards.map(element => (
        <CardItem card={element} page={page} key={element.systemNumber} />
      ))}
    </div>
  )
}

export { CardList }
