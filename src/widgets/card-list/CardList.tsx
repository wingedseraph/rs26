import { getTranslations } from 'next-intl/server'

import type { Card } from '@/api/types'

import { CardItem } from '@/widgets/card-list/CardItem'

type CardListProperties = {
  data: Card[]
  query: string
  page: string
}

async function CardList({ data: cards, query, page }: CardListProperties) {
  const t = await getTranslations('CardList')

  if (cards.length === 0) {
    return (
      <h2 className='appear'>{t('noData')}</h2>
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
