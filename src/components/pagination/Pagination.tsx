import { Link } from 'react-router'

import { PAGE_SIZE } from '@/api/api'
import { IconArrow } from '@/components/ui/icon-arrow'
import { cn } from '@/lib/utilities'

type PaginationProperties = {
  page: string
  recordsCount: number
}

const baseStyle = `
  flex flex-1 items-center justify-center rounded-md bg-white px-2 py-1 text-stone-5 shadow-cloud outline-hidden
  transition-colors
  focus-visible:ring-1 focus-visible:ring-black
  md:p-2
`

function Pagination({ page, recordsCount }: PaginationProperties) {
  const pageNumber = Number(page)
  const firstPage = pageNumber === 1
  const lastPage = Math.ceil(recordsCount / Number(PAGE_SIZE)) <= pageNumber
  return (
    <div className='mx-auto mt-6 max-w-50 rounded-lg bg-light p-2 shadow-[0px_2px_10px_0px_rgba(149,156,166,0.25)]' aria-hidden='false'>
      <nav className='flex items-center gap-x-2'>
        <Link
          to={{ search: `page=${pageNumber - 1}` }}
          aria-disabled={pageNumber === 1}
          className={cn(baseStyle, { 'pointer-events-none': firstPage })}
        >
          <IconArrow className={cn('size-7 rotate-90 cursor-pointer p-0.5 text-stone-2', { 'text-stone-5': firstPage })} />
        </Link>

        <button className={cn(baseStyle, 'h-11 w-12.25 font-extrabold text-stone-2', { 'text-stone-5': lastPage })}>
          {pageNumber}
        </button>

        <Link
          to={{ search: `page=${pageNumber + 1}` }}
          aria-disabled={lastPage}
          className={cn(baseStyle, { 'pointer-events-none': lastPage })}
        >
          <IconArrow className={cn('size-7 rotate-270 cursor-pointer p-0.5 text-stone-2', { 'text-stone-5': lastPage })} />
        </Link>
      </nav>
    </div>
  )
}

export { Pagination }
