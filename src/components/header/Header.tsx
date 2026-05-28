import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link, useNavigate, useOutlet, useSearchParams } from 'react-router'

import { CombinedInput } from '@/components/combined-input/CombinedInput'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTheme } from '@/hooks/useTheme'
import { PATH } from '@/router'

function Header() {
  const store = useLocalStorage('')
  const [value, setValue] = useState(store.value)

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setValue(event_.target.value)
  }

  const [searchParameters] = useSearchParams()
  const pageParameters = Number(searchParameters.get('page'))
  const theme = useTheme()
  const outlet = useOutlet()
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
      <h1>
        An inspiration engine for ideas
      </h1>

      <Link
        viewTransition
        to={PATH.about}
        className='
          text-header-about absolute top-0 right-0 rounded-xl p-1 text-stone-5 outline-hidden transition-colors
          hover:bg-stone-6
          focus-visible:ring-1 focus-visible:ring-black
        '
      >
        about
      </Link>

      <Link
        viewTransition
        to={PATH.error}
        className='
          text-header-about absolute top-8 right-0 rounded-xl p-1 text-stone-5 outline-hidden transition-colors
          hover:bg-stone-6
          focus-visible:ring-1 focus-visible:ring-black
        '
      >
        error
      </Link>

      <button
        type='button'
        onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}
        className='
          text-header-about absolute top-16 right-0 rounded-xl p-1 text-stone-5 outline-hidden transition-colors
          hover:bg-stone-6
          focus-visible:ring-1 focus-visible:ring-black
        '
      >
        {theme.value === 'light' ? 'dark' : 'light'}
      </button>

      {outlet
        && (
          <Link
            viewTransition
            to={{
              pathname: PATH.index,
              search: `page=${pageParameters}`,
            }}
            className='
              text-header-about absolute top-24 right-0 rounded-xl p-1 text-stone-5 outline-hidden transition-colors
              hover:bg-stone-6
              focus-visible:ring-1 focus-visible:ring-black
            '
          >
            close outlet
          </Link>
        )}

      <CombinedInput role='textbox' onChange={onChange} clearQuery={() => setValue('')} query={value} />
    </form>
  )
}

export { Header }
