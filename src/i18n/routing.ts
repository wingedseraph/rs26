import { defineRouting } from 'next-intl/routing'

const locales = ['en', 'ru']
const defaultLocale = 'en'

export const routing = defineRouting({
  locales,
  defaultLocale,
})
