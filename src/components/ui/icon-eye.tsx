import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

function IconEye({ className, ...properties }: ComponentProps<'svg'>) {
  return (
    <svg
      width='20'
      height='20'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      viewBox='0 0 24 24'
      className={cn('text-current', className)}
      aria-hidden='true'
      {...properties}
    >
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  )
}
export { IconEye }
