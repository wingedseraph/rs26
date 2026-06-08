import { useState } from 'react'
import type { SyntheticEvent } from 'react'

import { z } from 'zod'

import type { FormSchemaErrors } from '@/pages/forms-page/schema/schema'

import { toBase64 } from '@/lib/base64'
import { AgeField } from '@/pages/forms-page/AgeField'
import { CountryField } from '@/pages/forms-page/CountryField'
import { EmailField } from '@/pages/forms-page/EmailField'
import { FileField } from '@/pages/forms-page/FileField'
import { GenderField } from '@/pages/forms-page/GenderField'
import { NameField } from '@/pages/forms-page/NameField'
import { PasswordField } from '@/pages/forms-page/PasswordField'
import { schema } from '@/pages/forms-page/schema/schema'
import { TermsField } from '@/pages/forms-page/TermsField'
import { useAppDispatch, useAppSelector } from '@/store'
import { addOne } from '@/store/slices/submissionsSlice'

function UncontrolledForm({ onSuccess }: { onSuccess?: () => void }) {
  const dispatch = useAppDispatch()
  const countries = useAppSelector(state => state.countries)
  const [validation, setValidation] = useState<FormSchemaErrors>({})

  async function onSubmit(event_: SyntheticEvent<HTMLFormElement>) {
    event_.preventDefault()
    const form = event_.currentTarget
    const formData = new FormData(form)
    const formValues = Object.fromEntries(formData.entries())

    const result = schema.safeParse(formValues)
    if (result.error) {
      const flattened = z.flattenError(result.error)
      setValidation(flattened.fieldErrors)
      return null
    }

    const { file, terms: _, passwordConfirm: __, ...rest } = result.data
    const formattedFile = await toBase64(file)
    dispatch(addOne({ ...rest, file: String(formattedFile) }))
    form.reset()
    setValidation({})
    onSuccess?.()
  }
  return (
    <>
      <h1 className='text-black/70 sm:text-8xl/30'>Uncontrolled</h1>

      <form onSubmit={onSubmit}>
        <div className='masonry'>
          <NameField hint={validation.name} name='name' />

          <PasswordField
            name='password'
            placeholder='Your password'
            id='pw'
            strength={true}
            hint={validation.password}
          >
            Password
          </PasswordField>

          <PasswordField
            name='passwordConfirm'
            placeholder='Repeat password'
            id='cpw'
            hint={validation.passwordConfirm}
          >
            Confirm Passwords
          </PasswordField>

          <AgeField hint={validation.age} name='age' />
          <FileField hint={validation.file} name='file' />
          <GenderField hint={validation.gender} name='gender' />
          <EmailField hint={validation.email} name='email' />
          <CountryField hint={validation.country} countries={countries} name='country' />
          <TermsField hint={validation.terms} name='terms' />

          <div className='form-card-actions'>
            <button type='submit' className='btn-accept'>Accept</button>
            <button type='button' className='btn-cancel' onClick={onSuccess}>Cancel</button>
          </div>

        </div>
      </form>
    </>

  )
}

export { UncontrolledForm }
