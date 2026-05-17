import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

function Button({ children, className, ...properties }: ComponentProps<'button'>) {
  return (
    <button
      data-slot='button'
      className={cn(
        `
          group/button inline-flex h-9 shrink-0 items-center justify-center
          gap-1.5 rounded-md border border-transparent bg-clip-padding px-2.5
          text-sm font-medium whitespace-nowrap transition-all outline-none
          select-none
          hover:underline
          focus-visible:ring-3
          active:not-aria-[haspopup]:translate-y-px
          disabled:pointer-events-none disabled:opacity-50
          in-data-[slot=button-group]:rounded-md
          has-data-[icon=inline-end]:pr-2
          has-data-[icon=inline-start]:pl-2
          aria-invalid:ring-3
          [&_svg]:pointer-events-none [&_svg]:shrink-0
        `,
        className,
      )}
      {...properties}
    >
      {children}
    </button>
  )
}

export { Button }
