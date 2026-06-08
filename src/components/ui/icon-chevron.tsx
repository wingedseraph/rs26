import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

function IconChevron({ className, ...properties }: ComponentProps<'svg'>) {
  return (
    <svg
      width='18'
      height='18'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      viewBox='0 0 24 24'
      className={cn('text-stone-4', className)}
      aria-hidden='true'
      {...properties}
    >
      <polyline points='6 9 12 15 18 9' />
    </svg>
  )
}
export { IconChevron }
