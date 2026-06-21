import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { IconClear } from '@/components/ui/icon-clear'
import { IconSearch } from '@/components/ui/icon-search'
import { IconSubmit } from '@/components/ui/icon-submit'
import { Input } from '@/components/ui/input'

type CombinedInputProperties = {
  query?: string
} & ComponentProps<'input'>

function CombinedInput({ query, ...properties }: CombinedInputProperties) {
  return (
    <div className='relative w-full grow'>
      <div className='flex items-center rounded-full bg-silver-field px-1'>
        <IconSearch />

        <Input
          type='text'
          name='query'
          value={query}
          placeholder='Find'
          {...properties}
        />

        {query && (
          <>
            <Button
              title='Submit search'
              type='submit'
              className='shrink-0 cursor-pointer border-none bg-transparent pr-0.5'
            >
              <IconSubmit />
            </Button>

            <Button
              title='Clear search'
              type='button'
              // fix
              // onClick={clearQuery}
              className='shrink-0 cursor-pointer border-none bg-transparent pr-0.5'
            >
              <IconClear />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export { CombinedInput }
