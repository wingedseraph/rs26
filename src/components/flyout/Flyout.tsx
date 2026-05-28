import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { cardToCsv } from '@/lib/cardToCsv'
import { removeAll, useAppDispatch, useAppSelector } from '@/store'

function Flyout() {
  const dispatch = useAppDispatch()
  const selectedCards = useAppSelector(state => state.selectedCards)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  const downloadBlob = () => {
    if (downloadLinkRef.current && Object.keys(selectedCards).length > 0) {
      const array = Object.values(selectedCards)
      const csv = cardToCsv(array)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)

      downloadLinkRef.current.href = url
      downloadLinkRef.current.setAttribute('download', `${array.length} selected cards.csv`)
      downloadLinkRef.current.click()

      setTimeout(() =>
        URL.revokeObjectURL(url), 100)
    }
  }

  if (Object.keys(selectedCards).length === 0) {
    return null
  }

  return (
    <nav className='
      appear fixed bottom-4 left-4 z-40 flex justify-center rounded-xl bg-stone-6 p-2 shadow-cloud transition-transform
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
          <p className='text-2xl' title='Selected cards'>{Object.keys(selectedCards).length}</p>

          <Button
            title='Unselect all selected cards'
            className='block h-fit cursor-pointer text-lg font-bold hover:bg-stone-6 hover:no-underline'
            onClick={() => dispatch(removeAll())}
          >

            Unselect all
          </Button>

          <Button
            title='Download all selected cards'
            className='block h-fit cursor-pointer text-lg font-bold text-stone-5 hover:bg-stone-6 hover:no-underline'
            onClick={downloadBlob}
          >
            <a aria-label='download' aria-hidden={true} href='/' ref={downloadLinkRef}></a>
            Download
          </Button>

        </span
        >
      </div>
    </nav>
  )
}

export { Flyout }
