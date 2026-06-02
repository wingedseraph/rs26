import { Outlet, useOutlet } from 'react-router'

import { useGetArtworkByNameQuery } from '@/api/services/artwork'
import { Pagination } from '@/components/pagination/Pagination'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePage } from '@/hooks/usePage'
import { cn } from '@/lib/utilities'
import { FALLBACK_CARDS } from '@/mocks/mocks'
import ErrorPage from '@/pages/error-page/ErrorPage'
import { CardList } from '@/widgets/card-list/CardList'
import { Flyout } from '@/widgets/flyout/Flyout'
import { baseHeaderStyle, Header } from '@/widgets/header/Header'
import { baseStyleDetailed, outletStyleDetailed } from '@/widgets/layout/Layout'

function LandingPage() {
  const page = usePage()

  const query = useLocalStorage('')
  const outlet = useOutlet()
  const { data, isLoading, isError, refetch } = useGetArtworkByNameQuery({ query: query.value, page })

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !data) {
    return (
      <ErrorPage>
        <Button className={cn(baseHeaderStyle, 'relative p-10 text-4xl hover:no-underline')} onClick={() => refetch()}>
          Refetch data
        </Button>
      </ErrorPage>
    )
  }

  const records = data.records
  const recordsCount = data.info.record_count

  return (
    <>
      <div
        className={`${outlet ? 'outlet flex-1' : 'max-w-3xl'}`}
      >
        <Header />
        <CardList data={records ?? FALLBACK_CARDS} page={page} />
        <Pagination page={page ?? '1'} recordsCount={recordsCount ?? FALLBACK_CARDS.length} />
        <Flyout />
      </div>

      <div className={cn(baseStyleDetailed, { [outletStyleDetailed]: outlet })}>
        <Outlet />
      </div>
    </>
  )
}

export { LandingPage }
