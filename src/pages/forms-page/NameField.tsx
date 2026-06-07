import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

type NameFieldProperties = {
  hint?: string[]
} & ComponentProps<'input'>

function NameField({ hint, ...properties }: NameFieldProperties) {
  return (
    <div className='form-card shadow-card'>
      <label htmlFor='name' className='form-card-label'>Name</label>
      <input {...properties} type='text' id='name' className='form-input' placeholder='Enter your name' autoComplete='given-name' />

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

    </div>
  )
}

export { NameField }
