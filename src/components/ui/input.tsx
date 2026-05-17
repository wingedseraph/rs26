import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

function Input({ type, className, ...properties }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-
      slot='input'
      className={
        cn(
          `
            min-w-0 flex-1 rounded-full border-none bg-silver-field py-3 pr-7
            pl-0.5 text-base font-semibold
            placeholder:text-silver-font
            focus:ring-0 focus:outline-none
          `,
          className,
        )
      }
      {...properties}
    />
  )
}

export { Input }
