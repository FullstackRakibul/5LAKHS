<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-bg px-4 py-8 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-500 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
    </div>

    <!-- Login Card -->
    <div class="relative w-full max-w-md z-10">
      <div class="glass-card-lg space-y-8">
        <!-- Header -->
        <div class="text-center space-y-3">
          <div class="flex justify-center">
            <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-600/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-dark-text">Check Generator</h1>
          <p class="text-sm text-dark-text-secondary">Sign in to create professional bank checks</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username Input -->
          <div class="space-y-2">
            <label for="username" class="block text-sm font-semibold text-dark-text">Username</label>
            <div class="relative">
              <svg class="absolute left-4 top-3.5 w-5 h-5 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input 
                id="username" 
                v-model="credentials.username" 
                type="text" 
                required 
                class="input-primary pl-12 text-sm sm:text-base"
                placeholder="admin" />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-semibold text-dark-text">Password</label>
            <div class="relative">
              <svg class="absolute left-4 top-3.5 w-5 h-5 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input 
                id="password" 
                v-model="credentials.password" 
                type="password" 
                required 
                class="input-primary pl-12 text-sm sm:text-base"
                placeholder="••••••••" />
            </div>
          </div>

          <!-- Error Message -->
          <transition name="fade-in">
            <div v-if="error" class="flex items-center gap-3 p-3 rounded-lg bg-red-600 bg-opacity-10 border border-red-600 border-opacity-30">
              <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-300">{{ error }}</p>
            </div>
          </transition>

          <!-- Buttons -->
          <div class="space-y-3 pt-2">
            <button 
              type="submit" 
              :disabled="loading"
              class="btn-primary w-full flex items-center justify-center gap-2 text-base sm:text-lg">
              <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <svg v-else class="animate-spin-indigo w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>

            <button 
              type="button"
              @click="setDemoCredentials"
              class="btn-secondary w-full text-base sm:text-lg">
              <span class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="hidden sm:inline">Demo Login</span>
                <span class="sm:hidden">Try Demo</span>
              </span>
            </button>
          </div>

          <!-- Demo hint -->
          <p class="text-center text-xs text-dark-text-secondary">
            Demo • admin / admin123
          </p>
        </form>
      </div>
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

const setDemoCredentials = () => {
  credentials.value.username = 'admin'
  credentials.value.password = 'admin123'
}
</script>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

/* Input focus effect with glow */
:deep(.input-primary:focus) {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

/* Button hover glow effect */
:deep(.btn-primary:hover) {
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1);
}

/* Error animation */
.fade-in-enter-active {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
