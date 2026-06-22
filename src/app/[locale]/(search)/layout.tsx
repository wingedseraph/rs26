import type { ReactNode } from 'react'

export default async function Layout({
  list,
  details,
}: {
  list: ReactNode
  details: ReactNode
}) {
  return (
    <div className='search-layout contents'>
      {list}
      <div className='contents' data-outlet>{details}</div>
    </div>
  )
}
