import type { ComponentProps } from 'react'

import { cn } from '@/lib/utilities'

type GenderFieldProperties = {
  name: string
  hint?: string[] | string
} & ComponentProps<'input'>

function GenderField({ name, hint, ...properties }: GenderFieldProperties) {
  return (
    <div className='form-card items-center shadow-card'>
      <span className='form-card-label'>Gender</span>

      <div className='seg-group' role='radiogroup' aria-label='Gender'>
        <label className='seg-item'>
          <input type='radio' name={name} {...properties} value='male' />
          Male
        </label>

        <label className='seg-item'>
          <input type='radio' name={name} {...properties} value='female' />
          Female
        </label>

        <label className='seg-item'>
          <input type='radio' name={name} {...properties} value='other' />
          Other
        </label>
      </div>

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

    </div>
  )
}

export { GenderField }
