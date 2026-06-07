import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

type EmailFieldProperties = {
  hint?: string[]
} & ComponentProps<'input'>

function EmailField({ hint, ...properties }: EmailFieldProperties) {
  return (
    <div className='form-card shadow-card'>
      <label htmlFor='email' className='form-card-label'>Email</label>
      <input {...properties} type='email' id='email' className='form-input' placeholder='your@email.com' autoComplete='email' />

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

    </div>
  )
}

export { EmailField }
