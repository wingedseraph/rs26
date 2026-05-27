import { Link, useOutlet } from 'react-router'

import type { Card } from '@/api/typeguard'

import { CardListFooter } from '@/components/card-list/CardListFooter'
import { toggleOne, useAppDispatch, useAppSelector } from '@/store'

type CardListProperties = {
  data: Card[]
  page: number
}

function CardList({ data: cards, page }: CardListProperties) {
  const outlet = useOutlet()
  const dispatch = useAppDispatch()
  const selectedCards = useAppSelector(state => state.selectedCards)

  if (cards.length === 0) {
    return (
      <h2 className='appear'>Oh No Data</h2>
    )
  }

  return (
    <div className={`
      columns-2 gap-6 pt-10
      ${outlet ? 'md:columns-2' : 'md:columns-3'}
    `}
    >
      {cards.map(element => (
        <div
          className='
            appear relative my-10 w-full cursor-pointer break-inside-avoid
            rounded-md-custom bg-white p-1 shadow-card transition-shadow
            duration-200
            hover:shadow-card-hover
          '
          key={element.systemNumber}
          title={element._primaryTitle}
        >
          <Link viewTransition to={{ pathname: `card/${element.systemNumber}`, search: `page=${page}` }}>
            <div className='flex flex-col gap-1 p-1'>
              <div className='
                flex min-h-40 w-full cursor-default justify-center bg-stone-6/30
              '
              >
                <img
                  className='
                    max-h-40 w-full cursor-zoom-in rounded-xs object-contain
                    transition-opacity duration-150
                    hover:opacity-[0.92]
                  '
                  src={`${element._images._iiif_image_base_url}full/!600,600/0/default.jpg`}
                  alt={element.objectType}
                />
              </div>

              <div className='flex items-center justify-center p-2'>
                <h2 className='line-clamp-3 text-base-custom text-silver-font'>
                  {element._primaryTitle.length > 0 ? element._primaryTitle : element.objectType}
                </h2>
              </div>

            </div>
          </Link>

          <CardListFooter
            onClick={() => dispatch(toggleOne({ id: element.systemNumber, card: element }))}
            isSelected={Object.hasOwn(selectedCards, element.systemNumber)}
          />

        </div>
      ))}
    </div>
  )
}

export { CardList }
