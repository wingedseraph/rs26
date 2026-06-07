import { useState } from 'react'
import type { SyntheticEvent } from 'react'

import { z } from 'zod'

import { BackLink } from '@/components/ui/back-link'
import { toBase64 } from '@/lib/base64'
import { AgeField } from '@/pages/forms-page/AgeField'
import { CountryField } from '@/pages/forms-page/CountryField'
import { EmailField } from '@/pages/forms-page/EmailField'
import { FileField } from '@/pages/forms-page/FileField'
import { GenderField } from '@/pages/forms-page/GenderField'
import { NameField } from '@/pages/forms-page/NameField'
import { PasswordField } from '@/pages/forms-page/PasswordField'
import { TermsField } from '@/pages/forms-page/TermsField'
import { useAppDispatch, useAppSelector } from '@/store'
import { addOne } from '@/store/slices/submissionsSlice'

const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'Australia',
] // fix: move to redux

const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const baseSchema = z.object({
  name: z.string().regex(/^[A-Z]/, { error: 'First letter must be uppercase!' }),
  password: z.string().min(8), // todo strength with refine
  passwordConfirm: z.string(),
  age: z.coerce.number().positive({ error: 'Must be a number, no negative values' }),
  country: z.enum(countries, { error: 'A valid country must be selected' }),
  email: z.email({ error: 'One @, non-empty local part, domain with at least one dot' }),
  file: z.file().max(MAX_IMAGE_SIZE, { error: `Please add a photo maximum size ${MAX_IMAGE_SIZE / 1024} Mb` }).mime(['image/png', 'image/jpeg'], { error: 'Please add a png/jpeg photo' }),
  gender: z.enum(['male', 'female', 'other'], { error: 'Please select your gender' }),
  terms: z.enum(['on'], { error: 'Please accept the terms' }),
})

const schema = baseSchema
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],

    when(payload) {
      return baseSchema
        .pick({ password: true, passwordConfirm: true })
        .safeParse(payload.value)
        .success
    },
  })

export type FormSchema = z.infer<typeof baseSchema>
type FormSchemaErrors = z.ZodFlattenedError<FormSchema>['fieldErrors']

function FormsPage() {
  const [validation, setValidation] = useState<FormSchemaErrors>({})
  const dispatch = useAppDispatch()
  const submissions = useAppSelector(state => state.submissions)

  async function onSubmit(event_: SyntheticEvent<HTMLFormElement>) {
    event_.preventDefault()
    const formData = new FormData(event_.currentTarget)
    const formValues = Object.fromEntries(formData.entries())

    const result = schema.safeParse(formValues)
    if (result.error) {
      const flattened = z.flattenError(result.error)
      setValidation(flattened.fieldErrors)
      return null
    }

    const { file, terms, passwordConfirm, ...rest } = result.data
    const formattedFile = await toBase64(file)
    dispatch(addOne({ ...rest, file: String(formattedFile) }))
  }
  return (
    <>
      <p className='absolute top-0 left-0'>{JSON.stringify(submissions)}</p>
      <BackLink />

      <div id='center' className='appear p-2 md:px-8 md:pt-6'>
        <h1 className='sm:text-8xl/30'>Forms</h1>

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
              <button type='button' className='btn-cancel'>Cancel</button>
            </div>

          </div>
        </form>

      </div>
    </>
  )
}

export { FormsPage }
