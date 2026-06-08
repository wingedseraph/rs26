import { useEffect, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { cardToCsv } from '@/lib/cardToCsv'
import { useAppDispatch, useAppSelector } from '@/store'
import { removeAll } from '@/store/slices/selectedCardsSlice'

function Flyout() {
  const dispatch = useAppDispatch()
  const selectedCards = useAppSelector(state => state.selectedCards)
  const count = Object.keys(selectedCards).length

  const blobUrl = useMemo(() => {
    const array = Object.values(selectedCards)
    if (array.length === 0)
      return ''
    const csv = cardToCsv(array)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    return URL.createObjectURL(blob)
  }, [selectedCards])

  useEffect(() => {
    return () => {
      if (blobUrl)
        URL.revokeObjectURL(blobUrl)
    }
  }, [blobUrl])

  if (count === 0) {
    return null
  }

  return (
    <nav className='
      fixed bottom-4 left-4 z-40 flex appear justify-center rounded-xl bg-stone-6 p-2 shadow-cloud transition-transform
      max-sm:data-hidden:translate-y-[calc(100%+var(--mobile-main-layout-padding)*2)]
      sm:w-74 sm:bg-stone-5/20 sm:backdrop-blur-xl
    '
    >
      <div className='relative flex justify-center gap-2'>
        <span
          className='absolute top-0 left-0 h-full rounded-md bg-white shadow-main-1 dark:bg-stone-1'
        >
        </span
        >

        <span className='
          relative flex flex-row items-center gap-4 rounded-md px-2 py-1 text-xs font-bold tracking-[-0.25px]
          text-stone-5 transition-colors duration-150
        '
        >
          <p className='text-2xl' title='Selected cards'>{count}</p>

          <Button
            title='Unselect all selected cards'
            className='block h-fit cursor-pointer text-lg font-bold hover:bg-stone-6 hover:no-underline'
            onClick={() => dispatch(removeAll())}
          >

            Unselect all
          </Button>

          <a
            href={blobUrl}
            download={`${count} selected cards.csv`}
            title='Download all selected cards'
            className='block h-fit cursor-pointer text-lg font-bold text-stone-5 hover:bg-stone-6 hover:no-underline'
          >
            Download
          </a>

        </span
        >
      </div>
    </nav>
  )
}

export { Flyout }
