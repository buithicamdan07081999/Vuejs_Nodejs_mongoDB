import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const user = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  function login(newToken, newUser) {
    token.value = newToken
    user.value = newUser
  }

  function logout() {
    token.value = ''
    user.value = null
  }

function setUser(newUser) {
  user.value = { ...newUser }
}

  return { token, user, isLoggedIn, login, logout, setUser}
}, {
  persist: true
})
