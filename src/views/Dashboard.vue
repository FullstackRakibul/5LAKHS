<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Welcome Section -->
        <div class="bg-white overflow-hidden shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
            <p class="text-gray-600">Generate professional bank checks with ease</p>
          </div>
        </div>

        <!-- Analytics / Stats Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer"
            @click="navigateToGenerator">
            <div class="flex items-center space-x-4">
              <div class="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">New Check</p>
                <p class="text-lg font-semibold text-gray-900">Generate</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center space-x-4">
              <div class="p-3 rounded-full bg-green-100 text-green-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586L18 8.414V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Checks Generated</p>
                <p class="text-2xl font-bold text-gray-900">{{ checksGenerated }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center space-x-4">
              <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Fixed Amount</p>
                <p class="text-2xl font-bold text-gray-900">5,00,000</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center space-x-4">
              <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Success Rate</p>
                <p class="text-2xl font-bold text-gray-900">100%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div v-if="recentActivity.length > 0" class="space-y-4">
              <div v-for="(activity, index) in recentActivity" :key="index"
                class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                <div>
                  <p class="text-sm text-gray-700">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500">{{ activity.time }}</p>
                </div>
                <!-- <div class="flex items-center space-x-2">
                  <button @click="redownloadCheck(activity)"
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Re-download
                  </button>
                </div> -->
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-500">No recent activity. Generate your first check to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()
const authStore = useAuthStore()

const checksGenerated = ref(0)
const recentActivity = ref([])

onMounted(() => {
  const savedChecksCount = localStorage.getItem('checksGenerated')
  if (savedChecksCount) {
    checksGenerated.value = parseInt(savedChecksCount)
  }

  const savedActivity = localStorage.getItem('recentActivity')
  if (savedActivity) {
    recentActivity.value = JSON.parse(savedActivity)
  }
})

const navigateToGenerator = () => {
  router.push('/generate-check')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const redownloadCheck = (activity) => {
  // For demo: just show console log
  console.log("Re-downloading check:", activity)
  // In real: trigger file download logic here
}
</script>