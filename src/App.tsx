import { Outlet, useOutlet, useSearchParams } from 'react-router'

import { useGetArtworkByNameQuery } from '@/api/services/artwork'
import { CardList } from '@/components/card-list/CardList'
import ErrorPage from '@/components/error-page/ErrorPage'
import { Flyout } from '@/components/flyout/Flyout'
import { Header } from '@/components/header/Header'
import { baseStyleDetailed, outletStyleDetailed } from '@/components/layout/Layout'
import { Pagination } from '@/components/pagination/Pagination'
import { Spinner } from '@/components/ui/spinner'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { cn } from '@/lib/utilities'
import { FALLBACK_CARDS } from '@/mocks/mocks'

function App() {
  const [searchParameters] = useSearchParams()
  const pageParameters = Number(searchParameters.get('page'))
  const page = pageParameters > 0 ? pageParameters : 1

  const query = useLocalStorage('')
  const outlet = useOutlet()
  const { data, isLoading, isError } = useGetArtworkByNameQuery({ query: query.value, page })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorPage />
  }

  // fix: ok/err
  // if (!data) {
  //   records = FALLBACK_CARDS
  //  record_count = FALLBACK_CARDS.length
  // }

  // todo: why it returns data|undefined if using typeguard
  const records = data?.records
  const recordsCount = data?.info.record_count

  return (
    <>
      <div className={`${outlet ? 'flex-1' : 'max-w-3xl'}`}>
        <Header />
        <CardList data={records ?? FALLBACK_CARDS} page={page} />
        <Pagination page={page ?? 1} recordsCount={recordsCount ?? FALLBACK_CARDS.length} />
        <Flyout />
      </div>

      <div className={cn(baseStyleDetailed, { [outletStyleDetailed]: outlet })}>
        <Outlet />
      </div>
    </>
  )
}

export { App }
