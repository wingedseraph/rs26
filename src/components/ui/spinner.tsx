import type { ComponentProps, ReactNode } from 'react'

import { getTranslations } from 'next-intl/server'

import { cn } from '@/lib/utilities'

type SpinnerProperties = Omit<ComponentProps<'span'>, 'children'> & {
  children?: ReactNode
}

async function Spinner({ children, className, ...properties }: SpinnerProperties) {
  const t = await getTranslations('Common')

  return (
    <div className='fixed inset-0 z-50 appear backdrop-blur-md'>
      <div className='absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
        <span
          className={cn('inline-block animate-pulse font-medium', className)}
          role='status'
          aria-live='polite'
          {...properties}
        >
          {children ?? t('loading')}
        </span>
      </div>
    </div>

  )
}

export { Spinner }
