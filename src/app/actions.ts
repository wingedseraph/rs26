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

  // fix not sure, better to use early return with !data?
  // fix if details is open it will redirect to <query><page> without details
  if (validatedFields.success) {
    redirect(`/?query=${validatedFields.data.query}&page=1`)
  }
}
