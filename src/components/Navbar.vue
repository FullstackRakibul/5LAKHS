<template>
  <nav class="glass-nav fixed w-full z-50 border-b border-dark-border">
    <div class="backdrop-blur-lg bg-dark-card bg-opacity-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo / Title -->
          <div class="flex items-center">
            <router-link to="/dashboard" class="flex items-center gap-2 group">
              <div class="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 transition-transform group-hover:scale-105">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text text-transparent">
                Check Generator
              </span>
            </router-link>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-2">
            <router-link to="/dashboard"
              class="nav-link"
              :class="{ 'nav-link-active': $route.path === '/dashboard' }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4l4 2m-5-5l4 2" />
              </svg>
              Dashboard
            </router-link>
            <router-link to="/generate-check"
              class="nav-link"
              :class="{ 'nav-link-active': $route.path === '/generate-check' }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
              </svg>
              Generate Check
            </router-link>
          </div>

          <!-- Right side actions -->
          <div class="flex items-center gap-4">
            <!-- User greeting - Desktop only -->
            <span class="hidden sm:inline text-sm text-dark-text-secondary">Welcome, <span class="text-indigo-300 font-semibold">DKDC</span></span>
            
            <!-- Logout button -->
            <button @click="handleLogout"
              class="btn-logout">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Logout</span>
            </button>

            <!-- Mobile Menu Button -->
            <button @click="isOpen = !isOpen"
              class="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:bg-opacity-20">
              <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <transition name="mobile-menu"
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2" 
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150 transform" 
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2">
      <div v-if="isOpen" class="md:hidden border-t border-dark-border backdrop-blur-lg bg-dark-card bg-opacity-10">
        <div class="px-4 pt-4 pb-6 space-y-3">
          <router-link to="/dashboard"
            class="mobile-nav-link"
            :class="{ 'mobile-nav-link-active': $route.path === '/dashboard' }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4l4 2m-5-5l4 2" />
            </svg>
            Dashboard
          </router-link>
          <router-link to="/generate-check"
            class="mobile-nav-link"
            :class="{ 'mobile-nav-link-active': $route.path === '/generate-check' }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
            </svg>
            Generate Check
          </router-link>
          <div class="pt-3 border-t border-dark-border">
            <span class="block text-sm text-dark-text-secondary px-3 mb-3">Welcome, <span class="text-indigo-300 font-semibold">DKDC</span></span>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.glass-nav {
  @apply transition-all duration-300;
}

.nav-link {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg text-dark-text-secondary hover:text-dark-text transition-all duration-300;
  @apply hover:bg-indigo-600 hover:bg-opacity-10;
}

.nav-link-active {
  @apply text-indigo-300 bg-indigo-600 bg-opacity-15 border border-indigo-500 border-opacity-30;
}

.mobile-nav-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg text-dark-text-secondary hover:text-dark-text transition-all duration-300;
  @apply hover:bg-indigo-600 hover:bg-opacity-10 block w-full;
}

.mobile-nav-link-active {
  @apply text-indigo-300 bg-indigo-600 bg-opacity-15 border border-indigo-500 border-opacity-30;
}

.btn-logout {
  @apply flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium;
  @apply text-dark-text-secondary hover:text-white transition-all duration-300;
  @apply hover:bg-red-600 hover:bg-opacity-20 border border-red-600 border-opacity-0 hover:border-opacity-30;
}
</style>
