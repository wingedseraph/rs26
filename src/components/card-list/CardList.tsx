import { useSelector } from 'react-redux'
import { Link } from 'react-router'

import type { Card } from '@/api/typeguard'
import type { RootState } from '@/store'

import { CardListFooter } from '@/components/card-list/CardListFooter'
import { removeAll, toggleOne, useAppDispatch } from '@/store'

type CardListProperties = {
  data: Card[]
  page: number
}

function CardList({ data, page }: CardListProperties) {
  const dispatch = useAppDispatch()
  const selectedCards = useSelector((state: RootState) => state.selectedCards)

  if (data.length === 0) {
    return (
      <h2 className='appear'>Oh No Data</h2>
    )
  }

  return (
    <div className='
      columns-2 gap-6 pt-10
      md:columns-3
    '
    >

      <button className='absolute top-0 left-0' onClick={() => dispatch(removeAll())}>clear all</button>
      <p className='absolute top-4 left-0'>{JSON.stringify(Object.keys(selectedCards))}</p>

      {data.map(element => (
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
              <div className='flex w-full cursor-default justify-center'>
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
