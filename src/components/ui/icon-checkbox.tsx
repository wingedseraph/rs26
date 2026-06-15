import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

function IconCheckbox({ className, ...properties }: ComponentProps<'svg'>) {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('cb-icon h-6 w-6 shrink-0 transition-all duration-200', className)}
      aria-hidden='true'
      {...properties}
    >
      <path
        d='M12.53 4.47c.56-.01 1.1.05 1.81.12.67.07 1.48.14 2.35.06.95-.1 1.6-.07 2.18.16 3.18 1.37 5.93 4.03 6.76 7.51.44 1.78.06 3.32-.29 5.68-.23 1.78-1.2 3.5-2.5 4.69-1.71 1.24-3.54 2.28-5.34 2.72-1.64.19-3.25.05-4.72-.51l-1.36-.51c-1.33-.51-2.56-1.03-3.66-1.74l-.36-.21c-1.57-1.11-2.73-3.11-3.05-5.28l-.09-.65c-.17-1.52-.12-3.15.17-4.6.25-1.41 1.07-2.83 2.04-4.25.61-.89 1.43-1.59 2.45-2.31l.14-.1.12-.13c.07-.08.14-.15.19-.21.05-.06.1-.13.14-.17.03-.04.06-.08.09-.1.93-.09 1.86-.09 2.93-.11Z'
      />
    </svg>
  )
}
export { IconCheckbox }
