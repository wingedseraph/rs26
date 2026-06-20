import type { SearchParams } from '@/app/(search)/@list/page'

import SearchPage from '@/app/(search)/@list/page'

export default function DefaultSearch() {
  const searchParams = new Promise<SearchParams>(resolve => resolve({ query: 'Rome', page: '1' }))

  return <SearchPage searchParams={searchParams} />
}
