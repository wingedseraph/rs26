'use client'

import { Children } from 'react'
import type { ReactNode } from 'react'

import { useGetArtworkByNameQuery } from '@/api/artwork'
import ErrorPage from '@/app/error'
import { Pagination } from '@/components/pagination/Pagination'
import { Spinner } from '@/components/ui/spinner'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePage } from '@/hooks/usePage'
import { cn } from '@/lib/utilities'
import { FALLBACK_CARDS } from '@/tests/mocks/mocks'
import { CardList } from '@/widgets/card-list/CardList'
import { Flyout } from '@/widgets/flyout/Flyout'
import { Header } from '@/widgets/header/Header'

const baseStyleDetailed = 'hidden transition-all duration-300'
const outletStyleDetailed = 'flex w-full items-center justify-center md:relative md:w-1/2'

// fix should be SSR!
export default function SearchPage({ children }: { children: ReactNode }) {
  const page = usePage()

  const query = useLocalStorage('')
  const { data, isLoading, isError, refetch } = useGetArtworkByNameQuery({ query: query.value, page })

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !data) {
    return (
      <ErrorPage>
        {/* fix not sure is need for ssr
          <Button className={cn(baseHeaderStyle, 'relative p-10 text-4xl hover:no-underline')} onClick={() => refetch()}>
          Refetch data
        </Button> */}
      </ErrorPage>
    )
  }

  const records = data.records
  const recordsCount = data.info.record_count

  return (
    <>
      <div className={`${children ? 'outlet flex-1' : 'max-w-3xl'}`}>
        <Header />
        <CardList data={records ?? FALLBACK_CARDS} page={page} />
        <Pagination page={page ?? '1'} recordsCount={recordsCount ?? FALLBACK_CARDS.length} />
        <Flyout />
      </div>

      <div className={cn(baseStyleDetailed, { [outletStyleDetailed]: children })}>
        {children}
      </div>
    </>
  )
}
