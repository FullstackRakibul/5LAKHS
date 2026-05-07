<template>
  <!-- Glass Navigation Bar -->
  <nav class="glass-base fixed w-full top-0 z-50 border-b" style="border-color: rgba(99, 102, 241, 0.2);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo / Branding -->
        <router-link 
          to="/dashboard" 
          class="flex items-center space-x-3 group transition-all duration-300"
        >
          <div class="relative">
            <!-- Logo Icon Badge -->
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span class="text-white font-bold text-lg">✓</span>
            </div>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-lg md:text-xl font-bold text-gradient">মস্তিস্ক The AI Check Generator</h1>
            <p class="text-xs text-secondary">ভন্ড চেক তৈরী করার আন্তর্জালস্থল</p>
          </div>
        </router-link>

        <!-- Desktop Navigation Menu -->
        <div class="hidden md:flex items-center space-x-2">
          <nav-link 
            to="/dashboard"
            :isActive="$route.path === '/dashboard'"
            icon="📊"
          >
            Dashboard
          </nav-link>
          <nav-link 
            to="/generate-check"
            :isActive="$route.path === '/generate-check'"
            icon="🏦"
          >
            Generate Check
          </nav-link>
        </div>

        <!-- User Menu (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="flex items-center space-x-2 px-4 py-2 rounded-lg" style="background-color: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2);">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <span class="text-sm font-medium text-primary hidden sm:inline">DKDC</span>
          </div>
          
          <button 
            @click="handleLogout"
            class="button-secondary px-4 py-2 text-sm"
          >
            <span>Logout</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-3">
          <button 
            @click="isOpen = !isOpen"
            class="p-2 rounded-lg transition-all duration-300"
            style="background-color: rgba(99, 102, 241, 0.1);"
            @mouseover="$event.target.style.backgroundColor = 'rgba(99, 102, 241, 0.2)'"
            @mouseout="$event.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'"
          >
            <svg 
              v-if="!isOpen" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 text-primary" 
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 text-primary" 
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition 
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 scale-95 -translate-y-2" 
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-150 transform" 
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2"
    >
      <div 
        v-if="isOpen" 
        class="md:hidden glass-base border-t mt-2 mx-2 rounded-lg overflow-hidden"
        style="border-color: rgba(99, 102, 241, 0.2);"
      >
        <div class="px-4 py-4 space-y-3">
          <mobile-nav-link 
            to="/dashboard"
            :isActive="$route.path === '/dashboard'"
            icon="📊"
            @click="isOpen = false"
          >
            Dashboard
          </mobile-nav-link>
          <mobile-nav-link 
            to="/generate-check"
            :isActive="$route.path === '/generate-check'"
            icon="🏦"
            @click="isOpen = false"
          >
            Generate Check
          </mobile-nav-link>
          
          <div class="border-t" style="border-color: rgba(99, 102, 241, 0.2); margin-top: 12px; padding-top: 12px;">
            <div class="flex items-center space-x-2 px-3 py-2 rounded-lg mb-3" style="background-color: rgba(99, 102, 241, 0.1);">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                D
              </div>
              <span class="text-sm font-medium text-primary">DKDC</span>
            </div>
            
            <button 
              @click="handleLogout"
              class="w-full button-secondary px-4 py-2 text-sm justify-center"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>

  <!-- Spacer to account for fixed navbar -->
  <div class="h-16 md:h-20"></div>
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

<script>
export default {
  components: {
    NavLink: {
      props: ['to', 'isActive', 'icon'],
      template: `
        <router-link 
          :to="to"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm"
          :class="{
            'text-accent-primary shadow-lg shadow-indigo-500/50': isActive,
            'text-secondary hover:text-primary': !isActive,
          }"
          :style="{
            backgroundColor: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            borderColor: isActive ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.2)',
          }"
        >
          <span>{{ icon }}</span>
          <span>{{ $slots.default() }}</span>
        </router-link>
      `,
    },
    MobileNavLink: {
      props: ['to', 'isActive', 'icon'],
      template: `
        <router-link 
          :to="to"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium"
          :class="{
            'text-accent-primary': isActive,
            'text-secondary hover:text-primary': !isActive,
          }"
          :style="{
            backgroundColor: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
          }"
        >
          <span class="text-xl">{{ icon }}</span>
          <span>{{ $slots.default() }}</span>
        </router-link>
      `,
    },
  },
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
</style>