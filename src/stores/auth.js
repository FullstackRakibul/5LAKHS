import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem('authToken'))
  const user = ref(null)

  const setAuthenticated = (status) => {
    isAuthenticated.value = status
  }

  const setUser = (userData) => {
    user.value = userData
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem("authToken")
  }

  return {
    isAuthenticated,
    user,
    setAuthenticated,
    setUser,
    logout,
  }
})
