'use client'

import { useState } from 'react'
import type { ChangeEvent, ComponentProps } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { IconClear } from '@/components/ui/icon-clear'
import { IconSearch } from '@/components/ui/icon-search'
import { IconSubmit } from '@/components/ui/icon-submit'
import { Input } from '@/components/ui/input'

type CombinedInputProperties = {
  initialQuery: string
} & ComponentProps<'input'>

function CombinedInput({ initialQuery, ...properties }: CombinedInputProperties) {
  const [query, setQuery] = useState(initialQuery)
  const t = useTranslations('Search')

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setQuery(event_.target.value)
  }
  const clearQuery = () => setQuery('')

  return (
    <div className='relative w-full grow'>
      <div className='flex items-center rounded-full bg-silver-field px-1'>
        <IconSearch />

        <Input
          type='text'
          name='query'
          value={query}
          onChange={onChange}
          placeholder={t('placeholder')}
          {...properties}
        />

        {query && (
          <>
            <Button
              title={t('submitTitle')}
              type='submit'
              className='shrink-0 cursor-pointer border-none bg-transparent pr-0.5'
            >
              <IconSubmit />
            </Button>

            <Button
              title={t('clearTitle')}
              type='button'
              onClick={clearQuery}
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
