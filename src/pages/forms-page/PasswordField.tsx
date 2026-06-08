import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utilities'

type PasswordFieldProperties = {
  placeholder: string
  children: ReactNode
  hint?: string[] | string
  strength?: boolean
} & ComponentProps<'input'>

function PasswordField({ placeholder, children, id, hint, strength, ...properties }: PasswordFieldProperties) {
  return (
    <div className='form-card shadow-card'>
      <label htmlFor={id} className='form-card-label'>{children}</label>

      <div className='relative'>
        <input
          type='password'
          id={id}
          className='form-input-pw'
          placeholder={placeholder}
          autoComplete='new-password'
          {...properties}
        />

        <button type='button' className='pw-toggle' aria-label='Toggle password'>
          {/* as icon */}
          <svg width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
            <circle cx='12' cy='12' r='3' />
          </svg>
        </button>
      </div>

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

      {strength && (
        <>
          <div className='flex gap-1'>
            <div className='str-seg bg-stone-1'></div>
            <div className='str-seg bg-stone-3'></div>
            <div className='str-seg bg-stone-4'></div>
            <div className='str-seg'></div>
          </div>

          <div className='flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-stone-4'>
            <span className='text-stone-2'>&#10003; lowercase</span>
            <span className='text-stone-2'>&#10003; uppercase</span>
            <span>&#9675; number</span>
            <span>&#9675; special</span>
          </div>
        </>
      )}
    </div>
  )
}
export { PasswordField }
