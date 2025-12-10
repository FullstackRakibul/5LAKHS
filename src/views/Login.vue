<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
    <div class="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white rounded-xl shadow-lg">
      <div class="text-center">
        <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">5 Lakhs Check Generator</h2>
        <p class="mt-2 text-sm text-gray-600">Sign in to generate bank checks</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input id="username" v-model="credentials.username" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              placeholder="Enter username" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" v-model="credentials.password" type="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
              placeholder="Enter password" />
          </div>

          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

          <div class="flex justify-center space-x-2">
            <button type="submit" :disabled="loading" class="w-1/3 flex justify-center py-2 px-2 border border-transparent  text-xs rounded-md shadow 
                     text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>

            <!-- Autofill Button -->
            <button type="submit" @click="setDemoCredentials" class="w-2/3 flex justify-center py-2 px-2 rounded-md shadow text-xs font-medium 
                     text-indigo-600 bg-indigo-50 hover:bg-indigo-100 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-sans">
              দরকার নাই, আন্দাজে Try করেন
            </button>
          </div>
        </div>
      </form>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (credentials.value.username === 'admin' && credentials.value.password === 'admin123') {
      localStorage.setItem('authToken', 'demo-token-123')
      authStore.setAuthenticated(true)
      router.push('/dashboard')
    } else {
      error.value = 'Invalid username or password'
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

// Autofill admin/admin123
const setDemoCredentials = () => {
  credentials.value.username = 'admin'
  credentials.value.password = 'admin123'
}
</script>