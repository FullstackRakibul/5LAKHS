<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/dashboard" class="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
            Bank Check Generator
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <router-link
            to="/dashboard"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path === '/dashboard' }"
          >
            Dashboard
          </router-link>
          <router-link
            to="/generate-check"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path === '/generate-check' }"
          >
            Generate Check
          </router-link>
          <span class="text-sm text-gray-600">Welcome, Admin</span>
          <button
            @click="handleLogout"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
