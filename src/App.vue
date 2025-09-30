<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  // Check if user is logged in on app start
  const token = localStorage.getItem('authToken')
  if (token) {
    authStore.setAuthenticated(true)
    if (router.currentRoute.value.path === '/') {
      router.push('/dashboard')
    }
  }
})
</script>

<style>
/* Import global styles */
@import './style.css';
</style>
