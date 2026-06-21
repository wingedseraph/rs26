import type { Card } from '@/api/types'

import { CardItem } from '@/widgets/card-list/CardItem'

type CardListProperties = {
  data: Card[]
  query: string
  page: string
}

function CardList({ data: cards, query, page }: CardListProperties) {
  if (cards.length === 0) {
    return (
      <h2 className='appear'>Oh No Data</h2>
    )
  }

  return (
    <div className='columns-2 gap-6 pt-10 md:columns-3 outlet:md:columns-2'>
      {cards.map(element => (
        <CardItem card={element} page={page} query={query} key={element.systemNumber} />
      ))}
    </div>
  )
}

export { CardList }
