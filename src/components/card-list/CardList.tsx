import { useOutlet } from 'react-router'

import type { Card } from '@/api/typeguard'

import { CardItem } from '@/components/card-list/Card'
import { cn } from '@/lib/utilities'

type CardListProperties = {
  data: Card[]
  page: string
}

function CardList({ data: cards, page }: CardListProperties) {
  const outlet = useOutlet()

  if (cards.length === 0) {
    return (
      <h2 className='appear'>Oh No Data</h2>
    )
  }

  return (
    <div className={cn(`columns-2 gap-6 pt-10 md:columns-3`, { 'md:columns-2': outlet })}>
      {cards.map(element => (
        <CardItem card={element} page={page} key={element.systemNumber} />
      ))}
    </div>
  )
}

export { CardList }
