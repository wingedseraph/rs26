import type { ComponentProps, CSSProperties, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utilities'

type Properties = Omit<ComponentProps<'span'>, 'children'> & {
  children: ReactNode
  as?: ElementType
  minOpacity?: number
}

function Spinner({ children, as: Component = 'p', className, minOpacity = 0.45, style, ...properties }: Properties) {
  return (
    // fix: css in component mentor comment: https://github.com/wingedseraph/rs26/pull/1#discussion_r3217025371
    // fix replace it with skeleton!
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
        className={cn('appear inline-block font-medium', className)}
        role='loading'
        style={
          {
            ...style,
            '--loading-ui-text-blink-opacity': minOpacity,
            'animation':
              'loading-ui-text-blink var(--duration, 1s) ease-in-out infinite',
          } as CSSProperties
        }
        {...properties}
      >
        {children}
      </Component>
    </>
  )
}

export { Spinner }
