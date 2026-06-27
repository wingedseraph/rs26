import { getTranslations } from 'next-intl/server'

import { BackLink } from '@/components/ui/back-link'

export default async function NotFoundPage() {
  const t = await getTranslations('NotFoundPage')

  return (
    <>
      <BackLink />

      <div
        id='center'
        className='appear p-2 md:px-8 md:pt-6'
      >
        <h1 className='sm:text-8xl/30'>{t('title')}</h1>
      </div>
    </>
  )
}
