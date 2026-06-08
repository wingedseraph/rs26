import { z } from 'zod'

import store from '@/store'

const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const countries = store.getState().countries

const baseSchema = z.object({
  name: z.string().regex(/^[A-Z]/, { error: 'First letter must be uppercase!' }),
  password: z.string().min(8),
  passwordConfirm: z.string(),
  age: z.coerce.number<number>().positive({ error: 'Must be a number, no negative values' }),
  country: z.enum(countries, { error: 'A valid country must be selected' }),
  email: z.string().check(
    z.refine((value) => {
      const parts = value.split('@')
      if (parts.length !== 2)
        return false
      const [local, domain] = parts
      if (!local || !domain)
        return false
      if (!domain.includes('.'))
        return false
      return true
    }, { error: 'One @, non-empty local part, domain with at least one dot' }),
  ),
  file: z.preprocess(
    (value: FileList | File) => (value instanceof FileList ? value[0] : value),
    z.file({ error: 'Please add a photo' })
      .max(MAX_IMAGE_SIZE, { error: `Please add a photo maximum size ${MAX_IMAGE_SIZE / 1024} Mb` })
      .mime(['image/png', 'image/jpeg'], { error: 'Please add a png/jpeg photo' }),
  ),
  gender: z.enum(['male', 'female', 'other'], { error: 'Please select your gender' }),
  terms: z.union([z.stringbool(), z.boolean()], { error: 'Please accept the terms' }),
})

export const schema = baseSchema
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
export type FormSchemaErrors = z.ZodFlattenedError<FormSchema>['fieldErrors']
