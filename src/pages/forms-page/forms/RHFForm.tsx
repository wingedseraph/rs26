import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import type { FormSchema } from '@/pages/forms-page/schema/schema'

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

function RHFForm({ ...properties }: ComponentProps<'button'>) {
  const dispatch = useAppDispatch()
  const countries = useAppSelector(state => state.countries)

  const { register, reset, formState: { errors, isValid }, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const { file, terms: _, passwordConfirm: __, ...rest } = data
    const formattedFile = await toBase64(file)
    dispatch(addOne({ ...rest, file: String(formattedFile) }))
    reset()
  }
  return (
    <>
      <h1 className='text-black/70 sm:text-8xl/30'>RHF</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='masonry'>
          <NameField hint={errors.name?.message} {...register('name')} />

          <PasswordField
            placeholder='Your password'
            id='pw'
            strength={true}
            hint={errors.password?.message}
            {...register('password')}
          >
            Password
          </PasswordField>

          <PasswordField
            placeholder='Repeat password'
            id='cpw'
            hint={errors.passwordConfirm?.message}
            {...register('passwordConfirm')}
          >
            Confirm Passwords
          </PasswordField>

          <AgeField
            hint={errors.age?.message}
            {...register('age')}
          />

          <FileField
            hint={errors.file?.message}
            {...register('file')}
          />

          <GenderField
            hint={errors.gender?.message}
            {...register('gender')}
          />

          <EmailField
            hint={errors.email?.message}
            {...register('email')}
          />

          <CountryField
            hint={errors.country?.message}
            countries={countries}
            {...register('country')}
          />

          <TermsField
            hint={errors.terms?.message}
            {...register('terms')}
          />

          <div className='form-card-actions'>
            <button disabled={!isValid} type='submit' className='btn-accept'>Accept</button>
            <button type='button' className='btn-cancel' {...properties}>Cancel</button>
          </div>

        </div>
      </form>
    </>

  )
}

export { RHFForm }
