'use client'
import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import Link from 'next/link'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePage } from '@/hooks/usePage'
import { useTheme } from '@/hooks/useTheme'
import { baseHeaderStyle } from '@/styles/styles'
import { cn } from '@/lib/utilities'
import { PATH } from '@/router'
import { CombinedInput } from '@/widgets/combined-input/CombinedInput'

function Header() {
  const store = useLocalStorage('')
  const [value, setValue] = useState(store.value)

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setValue(event_.target.value)
  }

  const pageParameters = usePage()
  const theme = useTheme()

  const onSubmit = (event_: SyntheticEvent) => {
    event_.preventDefault()
    store.setValue(value)
    /* fix navigate on first page on submit void navigate('?page=1') */
  }

  return (
    <form
      onSubmit={onSubmit}
      className='flex w-full flex-col items-center justify-between pt-4 pb-2 font-sans'
    >
      <h1>An inspiration engine for ideas</h1>
      <Link href={PATH.about} className={cn(baseHeaderStyle, 'top-0')}> about </Link>
      <Link href={PATH.error} className={cn(baseHeaderStyle, 'top-8')}> not-found </Link>

      <button
        type='button'
        onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}
        className={cn(baseHeaderStyle, `top-16`)}
      >
        {theme.value === 'light' ? 'dark' : 'light'}
      </button>

      <Link
        href={{ pathname: PATH.index, search: `page=${pageParameters}` }}
        className={cn(baseHeaderStyle, `top-24 hidden outlet:block`)}
      >
        close outlet
      </Link>

      <CombinedInput role='textbox' onChange={onChange} clearQuery={() => setValue('')} query={value} />
    </form>
  )
}

export { Header }
