import { Link } from 'react-router'

import type { Card } from '@/api/types'

import { useAppDispatch, useAppSelector } from '@/store'
import { toggleOne } from '@/store/slices/selectedCardsSlice'
import { CardListFooter } from '@/widgets/card-list/CardListFooter'

type CardItemProperties = {
  card: Card
  page: string
}

const cardBaseStyle = `
  relative my-10 w-full appear cursor-pointer break-inside-avoid rounded-md-custom bg-white p-1 shadow-card
  transition-shadow duration-200
  hover:shadow-card-hover
  outlet:animate-none
`

function CardItem({ card, page }: CardItemProperties) {
  const dispatch = useAppDispatch()
  const selectedCards = useAppSelector(state => state.selectedCards)

  return (
    <div
      className={cardBaseStyle}
      key={card.systemNumber}
      title={card._primaryTitle}
    >
      <Link viewTransition to={{ pathname: `card/${card.systemNumber}`, search: `page=${page}` }}>
        <div className='flex flex-col gap-1 p-1'>
          <div className='flex min-h-40 w-full cursor-default justify-center rounded-md-custom bg-stone-6/30'>
            <img
              className='
                max-h-40 w-full cursor-zoom-in rounded-xs object-contain transition-opacity duration-150
                hover:opacity-[0.92]
              '
              src={`${card._images._iiif_image_base_url}full/!600,600/0/default.jpg`}
              alt={card.objectType}
            />
          </div>

          <div className='flex items-center justify-center p-2'>
            <h2 className='line-clamp-3 text-base-custom text-stone-3'>
              {card._primaryTitle.length > 0 ? card._primaryTitle : card.objectType}
            </h2>
          </div>

        </div>
      </Link>

      <CardListFooter
        onClick={() => dispatch(toggleOne({ id: card.systemNumber, card }))}
        isSelected={Object.hasOwn(selectedCards, card.systemNumber)}
      />

    </div>
  )
}
export { CardItem }
