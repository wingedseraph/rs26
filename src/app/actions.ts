'use server'

import { getLocale } from 'next-intl/server'
import { z } from 'zod'

import { redirect } from '@/i18n/navigation'

const schema = z.object({
  query: z.string({
    error: 'Invalid query',
  }),
})

export async function redirectAction(formData: FormData) {
  const validatedFields = schema.safeParse({
    query: formData.get('query'),
  })

  if (validatedFields.success) {
    const locale = await getLocale()
    redirect({ href: { pathname: '/', query: { query: validatedFields.data.query, page: '1' } }, locale })
  }
}
