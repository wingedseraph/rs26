import type { ChangeEvent, SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import type { Card } from '@/api/api'

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

  const onChange = (event_: ChangeEvent<HTMLInputElement>) => {
    setQuery(event_.target.value)
  }

  const getImages = async (event_: SyntheticEvent | null) => {
    if (event_ !== null) {
      event_.preventDefault()

      if (localStorage.getItem(STORAGE) === query) {
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

  const clearQuery = () => setQuery('')
  useEffect(() => {
    getImages(null)
    // will remove when setup react-router
    // eslint-disable-next-line react/exhaustive-deps
  }, [])

  return (
    <div id='center'>
      <Header getImages={getImages} onChange={onChange} clearQuery={clearQuery} query={query} loading={isLoading} />
      <CardList data={data} loading={isLoading} />
      {isLoading && <Spinner> Loading... </Spinner>}
      {errorMessage && (
        <p>
          Issue:
          {errorMessage}
        </p>
      )}
    </div>
  )
}
