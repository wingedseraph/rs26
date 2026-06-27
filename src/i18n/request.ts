import type { AbstractIntlMessages } from 'next-intl'

import { getRequestConfig } from 'next-intl/server'

const EN_MESSAGES = import('../../messages/en.json')
const RU_MESSAGES = import('../../messages/ru.json')

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale ?? 'en'

  return {
    locale,
    messages: locale === 'en' ? (await EN_MESSAGES).default : (await RU_MESSAGES).default as AbstractIntlMessages,
  }
})
