import type { ChangeEvent } from 'react'
import { Outlet, useLoaderData, useOutlet, useSearchParams } from 'react-router'

import type { getByQueryArtwork } from '@/api/api'

import { CardList } from '@/components/card-list/CardList'
import { Flyout } from '@/components/flyout/Flyout'
import { Header } from '@/components/header/Header'
import { Pagination } from '@/components/pagination/Pagination'
import { useLocalStorage } from '@/hooks/useLocalStorage'

function App() {
  const [searchParameters] = useSearchParams()
  const pageParameters = Number(searchParameters.get('page'))
  const page = pageParameters > 0 ? pageParameters : 1

  const { value, setValue } = useLocalStorage('')
  const outlet = useOutlet()

  const { records, recordsCount } = useLoaderData<typeof getByQueryArtwork>()

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setValue(event_.target.value)
  }

  return (
    <div className={`
      flex items-center justify-center gap-20
      ${outlet
      ? `
        mx-0 w-screen flex-col
        md:mx-20 md:flex-row
      `
      : `mx-auto`}
    `}
    >
      <div className={`
        ${outlet ? 'flex-1' : 'max-w-3xl'}
      `}
      >
        <Header onChange={onChange} clearQuery={() => setValue('')} query={value} />
        <CardList data={records} page={page} />
        <Pagination page={page ?? 1} recordsCount={recordsCount} />
        <Flyout />
      </div>

      <div className={`
        transition-all duration-300
        ${outlet
      ? `
        flex w-full items-center justify-center
        md:relative md:w-1/2
      `
      : `hidden`}
      `}
      >
        <Outlet />
      </div>

    </div>
  )
}

export { App }
