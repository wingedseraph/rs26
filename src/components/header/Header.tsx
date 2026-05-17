import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { IconClear } from '@/components/ui/icon-clear'
import { IconSearch } from '@/components/ui/icon-search'
import { IconSubmit } from '@/components/ui/icon-submit'
import { Input } from '@/components/ui/input'
import { PATH } from '@/router'

type HeaderProperties = {
  getImages: (event_: SyntheticEvent | null) => void
  onChange: (event_: ChangeEvent<HTMLInputElement>) => void
  clearQuery: () => void
  query: string
  loading: boolean
}

function Header({ getImages, onChange, clearQuery, query, loading }: HeaderProperties) {
  return (
    <form
      onSubmit={getImages}
      className='
        flex w-full flex-col items-center justify-between pt-4 pb-2 font-sans
      '
    >
      <h1>
        An
        {' '}
        <span className='bg-sublime-green-2'>inspiration</span>
        {' '}
        engine for ideas
      </h1>

      <Link
        viewTransition
        to={PATH.about}
        className='
          text-header-about absolute top-0 right-0 rounded-xl p-1 text-stone-5
          outline-hidden transition-colors
          hover:bg-stone-custom-6
          focus-visible:ring-1 focus-visible:ring-black
        '
      >
        about
      </Link>

      <Link
        viewTransition
        to={PATH.error}
        className='
          text-header-about absolute top-8 right-0 rounded-xl p-1 text-stone-5
          outline-hidden transition-colors
          hover:bg-stone-custom-6
          focus-visible:ring-1 focus-visible:ring-black
        '
      >
        error
      </Link>

      <div className='relative w-full grow'>
        <div className='flex items-center rounded-full bg-silver-field px-1'>
          {/* fix make it as assembled component with button, icons together */}
          <IconSearch />

          <Input
            type='text'
            value={query}
            placeholder='Find'
            onChange={onChange}
            disabled={loading}
          />

          {query && (
            <>
              <Button
                title='Submit search'
                type='submit'
                className='
                  shrink-0 cursor-pointer border-none bg-transparent pr-0.5
                '
              >
                <IconSubmit />
              </Button>

              <Button
                title='Clear search'
                type='button'
                onClick={clearQuery}
                className='
                  shrink-0 cursor-pointer border-none bg-transparent pr-0.5
                '
              >
                <IconClear />
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

export { Header }
