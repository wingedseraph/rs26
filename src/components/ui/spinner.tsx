import type { ComponentProps, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utilities'

type SpinnerProperties = Omit<ComponentProps<'span'>, 'children'> & {
  children: ReactNode
  as?: ElementType
  minOpacity?: number
}

function Spinner({ children, className, ...properties }: SpinnerProperties) {
  return (
    <span
      className={cn('appear inline-block animate-pulse font-medium', className)}
      role='status'
      aria-live='polite'
      {...properties}
    >
      {children}
    </span>
  )
}

export { Spinner }
