'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store'
import { removeAll } from '@/store/slices/selectedCardsSlice'

function Flyout() {
  const t = useTranslations('Flyout')
  const dispatch = useAppDispatch()
  const selectedCards = useAppSelector(state => state.selectedCards)
  const array = Object.values(selectedCards)
  const count = array.length

  if (count === 0) {
    return null
  }

  return (
    <nav className='
      fixed bottom-4 left-4 z-40 flex appear justify-center rounded-xl bg-silver-mid-cloud p-2 shadow-cloud
      transition-transform
      sm:w-74 sm:backdrop-blur-xl
    '
    >
      <div className='relative flex justify-center gap-2'>
        <span
          className='absolute top-0 left-0 h-full rounded-md bg-white shadow-main-1 dark:bg-stone-1'
        >
        </span
        >

        <form
          method='POST'
          action='/api/csv'
          className='
            relative flex flex-row items-center gap-4 rounded-md px-2 py-1 text-xs font-bold tracking-[-0.25px]
            text-stone-5 transition-colors duration-150
          '
        >
          <input name='csv' readOnly value={JSON.stringify(array)} className='hidden' />
          <p className='text-2xl' title={t('selectedCards')}>{count}</p>

          <Button
            title={t('unselectAllTitle')}
            className='block h-fit cursor-pointer text-lg font-bold hover:bg-silver-mist-hover hover:no-underline'
            onClick={() => dispatch(removeAll())}
          >

            {t('unselectAll')}
          </Button>

          <Button
            type='submit'
            className='block h-fit cursor-pointer text-lg font-bold hover:bg-silver-mist-hover hover:no-underline'
          >
            {t('download')}
          </Button>

        </form
        >
      </div>
    </nav>
  )
}

export { Flyout }
