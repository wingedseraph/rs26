import type { ComponentProps } from 'react'
import { PureComponent } from 'react'

import { cn } from '@/lib/utils'

class Input extends PureComponent<ComponentProps<'input'>, unknown> {
  render() {
    const { type, className, ...props } = this.props

    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          'h-9 w-full min-w-0 px-3 bg-transparent dark:bg-input/30 text-base md:text-sm rounded-lg border border-input shadow-xs/5 placeholder:text-muted-foreground/64 file:inline-flex file:h-7 file:items-center file:border-0 file:font-medium file:text-foreground file:text-sm transition-[color,box-shadow] outline-none focus-visible:border-primary focus-visible:ring-[1px] focus-visible:ring-ring/32 aria-invalid:border-destructive aria-invalid:text-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/24 data-invalid:border-destructive data-invalid:text-destructive data-invalid:ring-[3px] data-invalid:ring-destructive/24 dark:aria-invalid:border-destructive-foreground dark:aria-invalid:text-destructive-foreground dark:aria-invalid:ring-destructive-foreground/40 dark:data-invalid:border-destructive-foreground dark:data-invalid:text-destructive-foreground dark:data-invalid:ring-destructive-foreground/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-64',
          className,
        )}
        {...props}
      />
    )
  }
}

export { Input }
