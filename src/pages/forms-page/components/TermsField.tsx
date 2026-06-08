import type { ComponentProps } from 'react'

import { IconCheckbox } from '@/components/ui/icon-checkbox'
import { IconCheckboxChecked } from '@/components/ui/icon-checkbox-checked'
import { cn } from '@/lib/utilities'

type TermsFieldProperties = {
  hint?: string[] | string
} & ComponentProps<'input'>

function TermsField({ hint, ...properties }: TermsFieldProperties) {
  return (
    <div className='form-card shadow-card'>
      <label htmlFor='terms' className='cb-row'>
        <input {...properties} type='checkbox' id='terms' />
        <IconCheckbox />
        <IconCheckboxChecked />

        <span>
          I agree to the
          {' '}

          <span
            className='text-stone-1 underline underline-offset-2'
          >
            Terms &amp; Conditions
          </span>
        </span>
      </label>

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

    </div>
  )
}
export { TermsField }
