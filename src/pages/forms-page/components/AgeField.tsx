import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

type AgeFieldProperties = {
  hint?: string[] | string
} & ComponentProps<'input'>

function AgeField({ hint, ...properties }: AgeFieldProperties) {
  return (
    <div className='form-card shadow-card'>
      <label htmlFor='age' className='form-card-label'>Age</label>
      <input {...properties} type='number' id='age' className='form-input' placeholder='Enter your age' min='0' />

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

    </div>
  )
}

export { AgeField }
