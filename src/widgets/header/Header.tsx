import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePage } from '@/hooks/usePage'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utilities'
import { PATH } from '@/router'
import { CombinedInput } from '@/widgets/combined-input/CombinedInput'

export const baseHeaderStyle = `
  absolute right-0 text-header-about z-10 cursor-pointer rounded-xl p-1 text-stone-5 outline-hidden transition-colors
  hover:bg-stone-6
  focus-visible:ring-1 focus-visible:ring-black
`

function Header() {
  const store = useLocalStorage('')
  const [value, setValue] = useState(store.value)

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setValue(event_.target.value)
  }

  const pageParameters = usePage()
  const theme = useTheme()
  const navigate = useNavigate()

  const onSubmit = (event_: SyntheticEvent) => {
    event_.preventDefault()
    store.setValue(value)
    void navigate('?page=1')
  }

  return (
    <form
      onSubmit={onSubmit}
      className='flex w-full flex-col items-center justify-between pt-4 pb-2 font-sans'
    >
      <h1> An inspiration engine for ideas </h1>
      <Link viewTransition to={PATH.about} className={cn(baseHeaderStyle, 'top-0')}> about </Link>
      <Link viewTransition to={PATH.error} className={cn(baseHeaderStyle, 'top-8')}> error </Link>

      <button
        type='button'
        onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}
        className={cn(baseHeaderStyle, `top-16`)}
      >
        {theme.value === 'light' ? 'dark' : 'light'}
      </button>

      <Link
        viewTransition
        to={{ pathname: PATH.index, search: `page=${pageParameters}` }}
        className={cn(baseHeaderStyle, `top-40 hidden outlet:block`)}
      >
        close outlet
      </Link>

      <CombinedInput role='textbox' onChange={onChange} clearQuery={() => setValue('')} query={value} />
    </form>
  )
}

export { Header }
