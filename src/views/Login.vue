<template>
  <div class="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-dark-base via-dark-tertiary to-dark-secondary"></div>
    
    <!-- Animated Blobs -->
    <div class="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-20 left-40 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <!-- Main Content -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Glass Card Container -->
      <div class="glass-card">
        <!-- Header -->
        <div class="text-center mb-8 animate-slide-up">
          <!-- Logo Badge -->
          <div class="flex justify-center mb-6">
            <div class="relative group ai-container">

              <!-- Glow -->
              <div
                class="absolute -inset-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-all duration-700 animate-pulse">
              </div>

              <!-- Floating Ring -->
              <div class="absolute inset-0 rounded-full border border-indigo-400/30 animate-spin-slow"></div>

              <!-- Main AI Bubble -->
              <div
                class="relative w-24 h-24 rounded-full bg-white/90 flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-500 hover:scale-110 hover:-rotate-6 ai-float">

                <!-- AI Image -->
                <img src="../../public/assets/mostisco-ai.png" alt="Mostisco AI"
                  class="w-20 h-20 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">

                <!-- Funny Floating Dot -->
                <div class="absolute -top-1 right-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce shadow-lg"></div>

                <!-- Tiny Thinking Bubble -->
                <div class="absolute -left-3 top-3 text-lg animate-wiggle">
                  💭
                </div>

              </div>

              <!-- Hover Tooltip -->
              <div
                class="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition duration-300">
                Thinking dangerous thoughts...
              </div>

            </div>
          </div>

          <h1 class="text-3xl md:text-4xl font-bold text-gradient mb-2">মস্তিস্ক The AI</h1>
          <p class="text-secondary text-xs md:text-base">شراب کے بغیر میرے ہاتھ کا قلم چل نہیں رہا۔ اے بے دھواں آگ، تو
            کہاں ہے؟</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5" style="animation: slideUp 0.4s ease-out 0.1s backwards;">
          <!-- Username Input -->
          <div class="glass-input-container">
            <label for="username" class="block text-sm font-medium text-primary mb-2">Username</label>
            <input 
              id="username"
              v-model="credentials.username"
              type="text"
              required
              class="input-primary w-full"
              placeholder="Enter your username"
              :disabled="loading"
            />
          </div>

          <!-- Password Input -->
          <div class="glass-input-container">
            <label for="password" class="block text-sm font-medium text-primary mb-2">Password</label>
            <input 
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="input-primary w-full"
              placeholder="Enter your password"
              :disabled="loading"
            />
          </div>

          <!-- Error Message -->
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-90"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-90"
          >
            <div 
              v-if="error"
              class="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm"
            >
              {{ error }}
            </div>
          </transition>

          <!-- Button Group -->
          <div class="grid grid-cols-3 gap-3 pt-4">
            <!-- Sign In Button -->
            <button 
              type="submit"
              :disabled="loading"
              class="col-span-1 button-primary h-11 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span v-if="!loading" class="relative z-10">Sign In</span>
              <div 
                v-else 
                class="flex items-center justify-center space-x-1"
              >
                <div class="animate-spin-indigo">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            </button>

            <!-- Demo Credentials Button -->
            <button 
              
              type="submit"
              @click="setDemoCredentials"
              :disabled="loading"
              class="col-span-2 button-secondary h-11 text-xs md:text-sm font-medium disabled:opacity-50"
              title="AI diye log in korun"
            >
              আন্দাজে Try করেন
            </button>
          </div>
        </form>

        <!-- Demo Credentials Info -->
        <!-- <div class="mt-6 pt-6 border-t" style="border-color: rgba(99, 102, 241, 0.2);">
          <p class="text-xs text-secondary text-center">
            <span class="font-medium">Demo:</span> admin / admin123
          </p>
        </div> -->
      </div>

      <!-- Bottom Text -->
      <p class="text-center text-secondary text-xs mt-6 animate-fade-in" style="animation-delay: 0.3s;">
        ᓚᘏᗢ - linadi sabaq
      </p>
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
    // Simulate network request
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

<style scoped>
:deep(.text-gradient) {
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:deep(.text-primary) {
  color: #f0f0f0;
}

:deep(.text-secondary) {
  color: #a0a0a0;
}

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

@keyframes floatAI {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes wiggle {

  0%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-10deg);
  }

  75% {
    transform: rotate(10deg);
  }
}

@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.ai-float {
  animation: floatAI 3s ease-in-out infinite;
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spinSlow 12s linear infinite;
}

.ai-container:hover .ai-float {
  animation-duration: 1s;
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

:deep(.animate-blob) {
  animation: blob 7s infinite;
}

:deep(.animation-delay-2000) {
  animation-delay: 2s;
}

:deep(.animation-delay-4000) {
  animation-delay: 4s;
}
</style>