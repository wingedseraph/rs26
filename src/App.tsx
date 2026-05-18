import type { ChangeEvent, SyntheticEvent } from 'react'
import { useState } from 'react'
import { Outlet, useLoaderData, useOutlet, useSearchParams } from 'react-router'

import type { Card, ValidResponse } from '@/api/typeguard'

import { getByQueryArtwork } from '@/api/api'
import { CardList } from '@/components/card-list/CardList'
import { Header } from '@/components/header/Header'
import { Pagination } from '@/components/pagination/Pagination'
import { Spinner } from '@/components/ui/spinner'
import { useLocalStorage } from '@/hooks/useLocalStorage'

function App() {
  const [searchParameters] = useSearchParams()
  const pageParameters = Number(searchParameters.get('page'))
  const page = pageParameters > 0 ? pageParameters : 1
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { value, setValue } = useLocalStorage('')
  const [data, setData] = useState<Card[]>([])
  const outlet = useOutlet()

  const { records: loaderData } = useLoaderData<ValidResponse>()

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setValue(event_.target.value)
  }

  // todo: rewrite as custom hook and/or navigate to /?q=Paris and loader will run it properly?
  const getImages = async (event_: SyntheticEvent | null) => {
    if (event_ !== null) {
      event_.preventDefault()

      // fix: do i need that check?
      // if (localStorage.getItem(STORAGE) === value) {
      //   return
      // }
    }

    try {
      setIsLoading(true)
      const response = await getByQueryArtwork(value, page)

      setData(response)
      setErrorMessage('')
    }
    catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      }
      console.warn(error)
    }
    finally {
      setIsLoading(false)
    }
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
        <Header getImages={getImages} onChange={onChange} clearQuery={() => setValue('')} query={value} loading={isLoading} />
        <CardList data={data.length > 0 ? data : loaderData} loading={isLoading} page={page} />
        {isLoading && <Spinner> Loading... </Spinner>}

        {errorMessage && (
          <p>
            Issue:
            {errorMessage}
          </p>
        )}

        <Pagination page={page ?? 1} />
      </div>

      <div className={`
        transition-all duration-300
        ${outlet
      ? `
        absolute flex w-full items-center justify-center
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
