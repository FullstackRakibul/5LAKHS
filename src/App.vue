<template>
  <div id="app" class="min-h-screen" style="background-color: #0f0f1a;">
    <Navbar v-if="authStore.isAuthenticated" />
    <router-view v-slot="{ Component }">
      <transition 
        name="page-fade"
        mode="out-in"
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
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
@import './style.css';

/* Page Transition Styles */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Scrollbar styling for entire app */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}
</style>