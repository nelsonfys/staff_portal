import { createI18n } from 'vue-i18n'

import en from '@/locales/en'
import zh from '@/locales/zh'

const messages = {
  en,
  zh
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})
