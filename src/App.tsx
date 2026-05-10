import type { ChangeEvent, SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import type { Card } from '@/api/api'

import { getQueryImages } from '@/api/api'
import { CardList } from '@/components/card-list/CardList'
import { Header } from '@/components/header/Header'
import { Spinner } from '@/components/ui/spinner'

export const STORAGE = 'wingedquery' as const

export function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // will remove when setup react-router
  //  eslint-disable-next-line react/purity
  const [query, setQuery] = useState(localStorage.getItem(STORAGE) ?? '')
  const [data, setData] = useState<Card[]>([])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const getImages = async (e: SyntheticEvent | null) => {
    if (e !== null) {
      e.preventDefault()

      if (localStorage.getItem(STORAGE) === query) {
        return
      }
    }

    try {
      localStorage.setItem(STORAGE, query)
      setLoading(true)
      const response = await getQueryImages(query.trim())

      setData(response)
      setError('')
    }
    catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
      console.warn(e)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getImages(null)
  })

  return (
    <div id="center" className="p-20">

      <Header getImages={getImages} onChange={onChange} query={query} loading={loading} />
      <CardList data={data} loading={loading} />
      {loading && <Spinner> Loading... </Spinner>}
      {error && (
        <p>
          Issue:
          {error}
        </p>
      )}

    </div>
  )
}
