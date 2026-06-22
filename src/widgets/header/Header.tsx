import { getLocale, getTranslations } from 'next-intl/server'

import { redirectAction } from '@/app/actions'
import { Link } from '@/i18n/navigation'
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
  const t = await getTranslations('Header')
  const locale = await getLocale()

  return (
    <form
      action={redirectAction}
      className='flex w-full flex-col items-center justify-between pt-4 pb-2 font-sans'
    >
      <h1>{t('title')}</h1>

      <Link href={PATH.about} className={cn(baseHeaderStyle, 'top-0')}>
        {' '}
        {t('aboutLink')}
        {' '}
      </Link>

      <Link href={PATH.notFound} className={cn(baseHeaderStyle, 'top-8')}>
        {' '}
        {t('notFoundLink')}
        {' '}
      </Link>

      <ThemeToggle className={cn(baseHeaderStyle, `top-16`)} />

      <Link
        className={cn(baseHeaderStyle, `top-24`)}
        href='/'
        locale={locale === 'en' ? 'ru' : 'en'}
      >
        {t('localeLink')}
      </Link>

      <Link
        href={{ pathname: PATH.index, search: `page=${page}` }}
        className={cn(baseHeaderStyle, `top-32 hidden outlet:block`)}
      >
        {t('closeOutlet')}
      </Link>

      <CombinedInput initialQuery={query} key={query} role='textbox' name='query' />
    </form>
  )
}
