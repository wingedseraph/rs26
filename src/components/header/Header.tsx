import type { ChangeEvent, SyntheticEvent } from 'react'

import { Button } from '@/components/ui/button'
import { IconClear } from '@/components/ui/icon-clear'
import { IconSearch } from '@/components/ui/icon-search'
import { IconSubmit } from '@/components/ui/icon-submit'
import { Input } from '@/components/ui/input'

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
      className='font-sans flex items-center flex-col justify-between w-full pt-4 pb-2'
    >
      <h1 className='leading-10'>
        An
        {' '}
        <span className='bg-sublime-green-2'>inspiration</span>
        {' '}
        engine for ideas
      </h1>

      <div className='relative w-full grow'>
        <div className='bg-silver-field flex items-center rounded-full px-1'>
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
                className='shrink-0 pr-0.5 border-none bg-transparent cursor-pointer'
              >
                <IconSubmit />
              </Button>

              <Button
                title='Clear search'
                type='button'
                onClick={clearQuery}
                className='shrink-0 pr-0.5 border-none bg-transparent cursor-pointer'
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
