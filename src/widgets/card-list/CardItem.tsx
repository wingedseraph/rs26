'use client'
import Image from 'next/image'
import Link from 'next/link'

import type { Card } from '@/api/types'

import { useAppDispatch, useAppSelector } from '@/store'
import { toggleOne } from '@/store/slices/selectedCardsSlice'
import { baseCardItemStyle } from '@/styles/styles'
import { CardListFooter } from '@/widgets/card-list/CardListFooter'

type CardItemProperties = {
  card: Card
  query: string
  page: string
}

function CardItem({ card, query, page }: CardItemProperties) {
  const dispatch = useAppDispatch()
  const isCardSelected = useAppSelector(state => Object.hasOwn(state.selectedCards, card.systemNumber))
  const searchParam = new URLSearchParams({ query, page }).toString()

  return (
    <div
      className={baseCardItemStyle}
      title={card._primaryTitle}
    >
      <Link href={{ pathname: `/card/${card.systemNumber}`, search: searchParam }}>
        <div className='flex flex-col gap-1 p-1'>
          <div className='flex min-h-40 w-full cursor-default justify-center rounded-md-custom bg-stone-6/30'>
            <Image
              loading='eager'
              width={600}
              height={600}
              className='
                max-h-40 cursor-zoom-in rounded-xs object-contain transition-opacity duration-150
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
        isSelected={isCardSelected}
      />

    </div>
  )
}
export { CardItem }
