import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Input({ type, className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-
      slot='input'
      className={
        cn(
          'bg-silver-field placeholder:text-silver-font min-w-0 flex-1 rounded-full border-none py-3 pr-7 pl-0.5 text-base font-semibold focus:outline-none focus:ring-0',
          className,
        )
      }
      {...props}
    />
  )
}

export { Input }
