import type { routing } from '@/i18n/routing'

import type messages from '../messages/en.json'

declare module 'next-intl' {
  // eslint-disable-next-line ts/consistent-type-definitions -- extend existing interface
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
