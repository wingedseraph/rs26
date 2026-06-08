import type { ComponentProps } from 'react'

import type { Countries } from '@/store/slices/countriesSlice'

import { cn } from '@/lib/utilities'

type CountryFieldProperties = {
  countries: Countries
  hint?: string[] | string
} & ComponentProps<'input'>

function CountryField({ countries, hint, ...properties }: CountryFieldProperties) {
  return (
    <div className='form-card shadow-card'>
      <label htmlFor='country' className='form-card-label'>Country</label>

      <div className='ac-wrap group relative'>
        <input
          type='text'
          id='country'
          list='countries'
          className='form-input pr-10'
          placeholder='Select or type country'
          autoComplete='off'
          {...properties}
        />

        {/* as icon component */}
        <svg
          className='
            pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-stone-4 opacity-0 transition-opacity
            duration-500
            group-focus-within:opacity-100
            group-hover:opacity-100
          '
          width='18'
          height='18'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <polyline points='6 9 12 15 18 9' />
        </svg>

        <datalist id='countries'>
          {countries.map(country =>
            <option key={country} value={country} />,
          )}
        </datalist>
      </div>

      <div className={cn('collapsible', { collapsed: !hint })}>
        <span className='form-card-hint'>{hint}</span>
      </div>

    </div>
  )
}
export { CountryField }
