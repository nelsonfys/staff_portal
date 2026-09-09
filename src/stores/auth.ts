// Login
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    username: '',
    isLoggedIn: false
  }),

  actions: {
    login(username: string, token: string) {
      this.username = username
      this.token = token
      this.isLoggedIn = true
    },

    logout() {
      this.token = ''
      this.username = ''
      this.isLoggedIn = false
    }
  },

  persist: true
})