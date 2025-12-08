<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
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

/* Page Transition Styles */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>