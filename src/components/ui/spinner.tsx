import type { ComponentProps, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utilities'

type Properties = Omit<ComponentProps<'span'>, 'children'> & {
  children: ReactNode
  as?: ElementType
  minOpacity?: number
}

function Spinner({ children, as: Component = 'p', className, style, ...properties }: Properties) {
  return (
    <>
      <Component
        className={cn('appear inline-block animate-pulse font-medium', className)}
        role='status'
        aria-live='polite'
        {...properties}
      >
        {children}
      </Component>
    </>
  )
}

export { Spinner }
