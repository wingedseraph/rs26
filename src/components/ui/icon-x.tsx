import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

function IconX({ className, ...properties }: ComponentProps<'svg'>) {
  return (
    <svg
      width='16'
      height='16'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      viewBox='0 0 24 24'
      className={cn('text-current', className)}
      aria-hidden='true'
      {...properties}
    >
      <line x1='18' y1='6' x2='6' y2='18' />
      <line x1='6' y1='6' x2='18' y2='18' />
    </svg>
  )
}
export { IconX }
