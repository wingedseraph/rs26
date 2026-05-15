import type { ChangeEvent, SyntheticEvent } from 'react'
import { useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'

import type { Card, ValidResponse } from '@/api/api'

import { getQueryImages } from '@/api/api'
import { CardList } from '@/components/card-list/CardList'
import { Header } from '@/components/header/Header'
import { Spinner } from '@/components/ui/spinner'

export const STORAGE = 'wingedquery' as const

export function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  // will remove when setup react-router, may be enough to use customHook for it
  //  eslint-disable-next-line react/purity
  const [query, setQuery] = useState(localStorage.getItem(STORAGE) ?? '')
  const [data, setData] = useState<Card[]>([])

  const { records: loaderData }: ValidResponse = useLoaderData()

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setQuery(event_.target.value)
  }

  // todo: rewrite as custom hook
  const getImages = async (event_: SyntheticEvent | null) => {
    if (event_ !== null) {
      event_.preventDefault()

      if (localStorage.getItem(STORAGE) === query.trim()) {
        return
      }
    }

    try {
      localStorage.setItem(STORAGE, query)
      setIsLoading(true)
      const response = await getQueryImages(query.trim())

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
    <div className='flex justify-center gap-20 flex-1'>
      <div>
        <Header getImages={getImages} onChange={onChange} clearQuery={() => setQuery('')} query={query} loading={isLoading} />
        <CardList data={data.length > 0 ? data : loaderData} loading={isLoading} />
        {isLoading && <Spinner> Loading... </Spinner>}

        {errorMessage && (
          <p>
            Issue:
            {errorMessage}
          </p>
        )}

      </div>

      <div className='flex-1 flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
}
