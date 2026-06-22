'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

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
    redirect(`/?query=${validatedFields.data.query}&page=1`)
  }
}
