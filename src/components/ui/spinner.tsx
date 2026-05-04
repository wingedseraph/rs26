import { PureComponent } from 'react'
import type { ComponentProps, CSSProperties, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = Omit<ComponentProps<'span'>, 'children'> & {
  children: ReactNode
  as?: ElementType
  minOpacity?: number
}

class Spinner extends PureComponent<Props> {
  render() {
    const {
      children,
      as: Component = 'p',
      className,
      minOpacity = 0.45,
      style,
      ...props
    } = this.props

    return (
      <>
        <style>
          {`
            @keyframes loading-ui-text-blink {
              0%,
              100% {
                opacity: 1;
              }

              50% {
                opacity: var(--loading-ui-text-blink-opacity);
              }
            }
          `}
        </style>

        <Component
          className={cn('inline-block font-medium appear', className)}
          style={
            {
              ...style,
              '--loading-ui-text-blink-opacity': minOpacity,
              'animation':
                'loading-ui-text-blink var(--duration, 1s) ease-in-out infinite',
            } as CSSProperties
          }
          {...props}
        >
          {children}
        </Component>
      </>
    )
  }
}

export { Spinner }
