// src/i18n.js
import { createI18n } from 'vue-i18n'
import vi from './../locales/vi.json'
import en from './../locales/en.json'
import fr from './../locales/fr.json'

const savedLocale = localStorage.getItem('locale') || 'vi'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    vi,
    en,
    fr
  }
})

export default i18n
