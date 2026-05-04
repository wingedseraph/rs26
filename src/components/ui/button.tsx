import type { ComponentProps } from 'react'
import { PureComponent } from 'react'

import { cn } from '@/lib/utils'

class Button extends PureComponent<ComponentProps<'button'>, unknown> {
  render() {
    const { children, className, ...props } = this.props

    return (
      <button
        data-slot="button"
        className={cn(
          'group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground hover:underline h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
}

export { Button }
