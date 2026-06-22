import Link from 'next/link'

import { redirectAction } from '@/app/actions'
import { cn } from '@/lib/utilities'
import { PATH } from '@/router'
import { baseHeaderStyle } from '@/styles/styles'
import { CombinedInput } from '@/widgets/combined-input/CombinedInput'
import { ThemeToggle } from '@/widgets/header/ThemeToggle'

type HeaderProperties = {
  query: string
  page: string
}

export default async function Header({ query, page }: HeaderProperties) {
  return (
    <form
      action={redirectAction}
      className='flex w-full flex-col items-center justify-between pt-4 pb-2 font-sans'
    >
      <h1>An inspiration engine for ideas</h1>
      <Link href={PATH.about} className={cn(baseHeaderStyle, 'top-0')}> about </Link>
      <Link href={PATH.notFound} className={cn(baseHeaderStyle, 'top-8')}> not-found </Link>
      <ThemeToggle className={cn(baseHeaderStyle, `top-16`)} />

      <Link
        href={{ pathname: PATH.index, search: `page=${page}` }}
        className={cn(baseHeaderStyle, `top-24 hidden outlet:block`)}
      >
        close outlet
      </Link>

      <CombinedInput initialQuery={query} key={query} role='textbox' name='query' />
    </form>
  )
}
