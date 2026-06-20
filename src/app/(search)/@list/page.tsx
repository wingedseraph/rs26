import { getByQueryArtwork } from '@/api/artwork'
import ErrorPage from '@/app/error'
import { Pagination } from '@/components/pagination/Pagination'
import { FALLBACK_CARDS } from '@/tests/mocks/mocks'
import { CardList } from '@/widgets/card-list/CardList'
import { Flyout } from '@/widgets/flyout/Flyout'
import { Header } from '@/widgets/header/Header'

export type SearchParams = {
  query: string
  page: string
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { query = 'Rome', page = '1' } = await searchParams
  const data = await getByQueryArtwork(query, page)

  // fix take data from url /card/ to match outlet exist
  const outlet = false

  if (!data) {
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
  const recordsCount = data.recordsCount

  return (
    <>
      {/* fix check url is not /card/ not `children or true` */}
      <div className={`${outlet ? 'outlet flex-1' : 'max-w-3xl'}`}>
        <Header />
        <CardList data={records ?? FALLBACK_CARDS} page={page} />
        <Pagination page={page ?? '1'} recordsCount={recordsCount ?? FALLBACK_CARDS.length} />
        <Flyout />
      </div>

      {/* <div className={cn(baseStyleDetailed, { [outletStyleDetailed]: outlet })}>
        {children}
      </div> */}

    </>
  )
}
