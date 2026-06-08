import type { ComponentProps } from 'react'

import type { Countries } from '@/store/slices/countriesSlice'

import { IconChevron } from '@/components/ui/icon-chevron'
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

        <IconChevron
          className='
            pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 opacity-0 transition-opacity duration-500
            group-focus-within:opacity-100
            group-hover:opacity-100
          '
        />

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
