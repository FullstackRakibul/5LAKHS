<template>
  <nav class="bg-white shadow-sm border-b fixed w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo / Title -->
        <div class="flex items-center">
          <router-link to="/dashboard" class="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
            Check Generator
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/dashboard"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path === '/dashboard' }">
            Dashboard
          </router-link>
          <router-link to="/generate-check"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path === '/generate-check' }">
            Generate Check
          </router-link>
          <span class="text-sm text-gray-500">Welcome, DKDC</span>
          <button @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
            Logout
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="isOpen = !isOpen"
            class="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <transition enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150 transform" leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2">
      <div v-if="isOpen" class="md:hidden bg-white shadow-md border-t">
        <div class="px-4 pt-4 pb-6 space-y-4">
          <router-link to="/dashboard"
            class="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path === '/dashboard' }">
            Dashboard
          </router-link>
          <router-link to="/generate-check"
            class="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path === '/generate-check' }">
            Generate Check
          </router-link>
          <span class="block text-sm text-gray-500 px-3">Welcome, DKDC</span>
          <button @click="handleLogout"
            class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
            Logout
          </button>
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