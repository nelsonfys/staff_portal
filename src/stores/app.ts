// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as string,
    locale: 'en' as string
  }),

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },

    setTheme(value: string) {
      this.theme = value
    },

    setLocale(value: string) {
      this.locale = value
    }

  },

  persist: true
})
