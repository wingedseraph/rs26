import { useState } from 'react'
import type { ChangeEvent, ComponentProps, ReactNode } from 'react'

import { IconEye } from '@/components/ui/icon-eye'
import { cn } from '@/lib/utilities'

type PasswordFieldProperties = {
  placeholder: string
  children: ReactNode
  hint?: string[] | string
  strength?: boolean
} & ComponentProps<'input'>

type StrengthCriteria = {
  lowercase: boolean
  uppercase: boolean
  number: boolean
  special: boolean
}

const SEGMENT_COLORS = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400']

function PasswordField({ placeholder, children, id, hint, strength, onChange, ...properties }: PasswordFieldProperties) {
  const [criteria, setCriteria] = useState<StrengthCriteria>({
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  })

  const score = Number(criteria.lowercase) + Number(criteria.uppercase) + Number(criteria.number) + Number(criteria.special)

  function handleChange(event_: ChangeEvent<HTMLInputElement>) {
    if (strength) {
      const value = event_.target.value
      setCriteria({
        lowercase: value !== value.toUpperCase(),
        uppercase: value !== value.toLowerCase(),
        number: /\d/.test(value),
        special: /[^a-z0-9]/i.test(value),
      })
    }
    onChange?.(event_)
  }

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
          onChange={handleChange}
          {...properties}
        />

        <button type='button' className='pw-toggle' aria-label='Toggle password'>
          <IconEye />
        </button>
      </div>

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

      {strength && (
        <>
          <div className='flex gap-1'>
            {[0, 1, 2, 3].map(index => (
              <div
                key={index}
                className={cn('str-seg', index < score ? SEGMENT_COLORS[score - 1] : 'bg-stone-6')}
              />
            ))}
          </div>

          <div className='flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-stone-4'>
            <span className={criteria.lowercase ? 'text-lime-600' : ''}>
              {criteria.lowercase ? '✓' : '○'}
              {' '}
              lowercase
            </span>

            <span className={criteria.uppercase ? 'text-lime-600' : ''}>
              {criteria.uppercase ? '✓' : '○'}
              {' '}
              uppercase
            </span>

            <span className={criteria.number ? 'text-lime-600' : ''}>
              {criteria.number ? '✓' : '○'}
              {' '}
              number
            </span>

            <span className={criteria.special ? 'text-lime-600' : ''}>
              {criteria.special ? '✓' : '○'}
              {' '}
              special
            </span>
          </div>
        </>
      )}
    </div>
  )
}
export { PasswordField }
