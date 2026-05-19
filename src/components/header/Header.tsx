import type { ChangeEvent, SyntheticEvent } from 'react'
import { Link, useNavigate, useOutlet, useSearchParams } from 'react-router'

import { CombinedInput } from '@/components/combined-input/CombinedInput'
import { PATH } from '@/router'

type HeaderProperties = {
  onChange: (event_: ChangeEvent<HTMLInputElement>) => void
  clearQuery: () => void
  query: string
}

function Header({ onChange, clearQuery, query }: HeaderProperties) {
  const [searchParameters] = useSearchParams()
  const pageParameters = Number(searchParameters.get('page'))
  const outlet = useOutlet()
  const navigate = useNavigate()
  const onSubmit = (event_: SyntheticEvent) => {
    event_.preventDefault()
    void navigate('?page=1')
  }

  return (
    <form
      onSubmit={onSubmit}
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

      {outlet
        && (
          <Link
            viewTransition
            to={{
              pathname: PATH.index,
              search: `page=${pageParameters}`,
            }}
            className='
              text-header-about absolute top-16 right-0 rounded-xl p-1
              text-stone-5 outline-hidden transition-colors
              hover:bg-stone-custom-6
              focus-visible:ring-1 focus-visible:ring-black
            '
          >
            close outlet
          </Link>
        )}

      <CombinedInput onChange={onChange} clearQuery={clearQuery} query={query} />
    </form>
  )
}

export { Header }
