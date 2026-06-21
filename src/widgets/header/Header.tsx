import Link from 'next/link'

import redirectAction from '@/app/actions'
import { cn } from '@/lib/utilities'
import { PATH } from '@/router'
import { baseHeaderStyle } from '@/styles/styles'
import { CombinedInput } from '@/widgets/combined-input/CombinedInput'

export default async function Header({ page }: { page: string }) {
  // fix useTheme react context
  const theme = { value: 'light', setTheme: () => null }

  return (
    <form
      action={redirectAction}
      className='flex w-full flex-col items-center justify-between pt-4 pb-2 font-sans'
    >
      <h1>An inspiration engine for ideas</h1>
      {/* fix those links should be separate component */}
      <Link href={PATH.about} className={cn(baseHeaderStyle, 'top-0')}> about </Link>
      <Link href={PATH.error} className={cn(baseHeaderStyle, 'top-8')}> not-found </Link>

      <button
        type='button'
        // onClick={() => theme.setTheme(theme.value === 'light' ? 'dark' : 'light')}
        className={cn(baseHeaderStyle, `top-16`)}
      >
        {theme.value === 'light' ? 'dark' : 'light'}
      </button>

      <Link
        href={{ pathname: PATH.index, search: `page=${page}` }}
        className={cn(baseHeaderStyle, `top-24 hidden outlet:block`)}
      >
        close outlet
      </Link>

      <CombinedInput role='textbox' name='query' /* fix re-implement clear input clearQuery={() => setValue('')} */ />
    </form>
  )
}
