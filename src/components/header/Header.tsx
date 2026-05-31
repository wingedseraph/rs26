import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link, useNavigate, useOutlet, useSearchParams } from 'react-router'

import { artworkApi, byIdTag, byQueryTag } from '@/api/services/artwork'
import { CombinedInput } from '@/components/combined-input/CombinedInput'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utilities'
import { PATH } from '@/router'
import { useAppDispatch } from '@/store'

const baseStyle = `
  text-header-about absolute right-0 z-10 rounded-xl p-1 text-stone-5 outline-hidden transition-colors
  hover:bg-stone-6
  focus-visible:ring-1 focus-visible:ring-black
`

function Header() {
  const store = useLocalStorage('')
  const [value, setValue] = useState(store.value)

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setValue(event_.target.value)
  }

  // todo: rewrite as custom hook to take page
  const [searchParameters] = useSearchParams()
  const pageParameters = Number(searchParameters.get('page'))
  const theme = useTheme()
  const outlet = useOutlet()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
      <Link viewTransition to={PATH.about} className={cn(baseStyle, 'top-0')}> about </Link>
      <Link viewTransition to={PATH.error} className={cn(baseStyle, 'top-8')}> error </Link>

      <button
        type='button'
        onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}
        className={cn(baseStyle, `top-16`)}
      >
        {theme.value === 'light' ? 'dark' : 'light'}
      </button>

      <button className={cn(baseStyle, 'top-24')} onClick={() => dispatch(artworkApi.util.invalidateTags([byQueryTag]))}> revalidate getByQuery cache </button>
      <button className={cn(baseStyle, 'top-32')} onClick={() => dispatch(artworkApi.util.invalidateTags([byIdTag]))}> revalidate getById cache </button>

      {outlet
        && (
          <Link
            viewTransition
            to={{ pathname: PATH.index, search: `page=${pageParameters}` }}
            className={cn(baseStyle, `top-40`)}
          >
            close outlet
          </Link>
        )}

      <CombinedInput role='textbox' onChange={onChange} clearQuery={() => setValue('')} query={value} />
    </form>
  )
}

export { Header }
