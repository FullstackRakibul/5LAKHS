<template>
  <div class="min-h-screen bg-gray-50">


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
                class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition gap-4 sm:gap-0">
                <div class="flex items-start space-x-3">
                  <div class="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
                    <div class="flex items-center mt-1">
                      <svg class="w-3 h-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p class="text-xs text-gray-500">{{ activity.time }}</p>
                      <span class="mx-2 text-gray-300">•</span>
                      <p class="text-xs text-gray-500">Check #{{ activity.data?.checkNumber || '0001' }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center space-x-2 mt-2 sm:mt-0 w-full sm:w-auto">
                  <button @click="redownloadCheck(activity)" :disabled="generatingPDF"
                    class="flex-1 sm:flex-none inline-flex justify-center items-center px-3 py-2 sm:py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg v-if="!generatingPDF || selectedActivityIndex !== index" class="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                    <svg v-else class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    <span class="hidden sm:inline">{{ generatingPDF && selectedActivityIndex === index ? 'Generating...'
                      : 'Re-download' }}</span>
                    <span class="sm:hidden">{{ generatingPDF && selectedActivityIndex === index ? 'Generating...' :
                      'Download' }}</span>
                  </button>

                  <button @click="removeActivity(index)"
                    class="inline-flex items-center px-3 py-2 sm:py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                      </path>
                    </svg>
                    <span class="hidden sm:inline ml-1">Remove</span>
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 sm:py-12">
              <div class="mx-auto w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <p class="text-sm sm:text-base text-gray-500 mb-2">No recent activity</p>
              <p class="text-xs sm:text-sm text-gray-400">Generate your first check to get started!</p>
              <button @click="navigateToGenerator"
                class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"></path>
                </svg>
                Generate First Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Hidden Check Template for PDF Generation -->
    <div class="fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
      <div class="w-[800px]">
        <CheckTemplate v-if="selectedCheckData" :checkData="selectedCheckData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import CheckTemplate from '../components/CheckTemplate.vue'
import { generateCheckPDF } from '../utils/pdfGenerator'

const router = useRouter()
const authStore = useAuthStore()

const checksGenerated = ref(0)
const recentActivity = ref([])
const selectedCheckData = ref(null)
const generatingPDF = ref(false)
const selectedActivityIndex = ref(-1)

onMounted(() => {
  loadDashboardData()
})

const loadDashboardData = () => {
  const savedChecksCount = localStorage.getItem('checksGenerated')
  if (savedChecksCount) {
    checksGenerated.value = parseInt(savedChecksCount)
  }

  const savedActivity = localStorage.getItem('recentActivity')
  if (savedActivity) {
    recentActivity.value = JSON.parse(savedActivity)
  }
}

const navigateToGenerator = () => {
  router.push('/generate-check')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const redownloadCheck = async (activity) => {
  if (!activity.data) {
    alert('Data for this check is not available for re-download.')
    return
  }

  generatingPDF.value = true
  selectedActivityIndex.value = recentActivity.value.indexOf(activity)
  selectedCheckData.value = activity.data

  try {
    // Wait for DOM to update with the selected check data
    await nextTick()
    // Small delay to ensure fonts and styles are applied
    await new Promise(resolve => setTimeout(resolve, 100))

    await generateCheckPDF(activity.data)
    showNotification('Check downloaded successfully!', 'success')
  } catch (error) {
    console.error('Error re-generating PDF:', error)
    showNotification('Failed to re-generate PDF. Please try again.', 'error')
  } finally {
    generatingPDF.value = false
    selectedActivityIndex.value = -1
    selectedCheckData.value = null
  }
}

const removeActivity = (index) => {
  if (confirm('Are you sure you want to remove this activity?')) {
    recentActivity.value.splice(index, 1)
    saveActivityToStorage()
    showNotification('Activity removed successfully', 'success')
  }
}

const saveActivityToStorage = () => {
  localStorage.setItem('recentActivity', JSON.stringify(recentActivity.value))
}

const showNotification = (message, type = 'info') => {
  // Simple notification - you can replace with a proper notification system
  alert(`${type === 'success' ? '✓' : '⚠'} ${message}`)
}
</script>

<style scoped>
/* Mobile responsive adjustments */
@media (max-width: 640px) {

  /* Improve touch targets on mobile */
  button {
    min-height: 36px;
  }

  /* Ensure text doesn't overflow on mobile */
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* Smooth transitions */
.transition {
  transition: all 0.2s ease-in-out;
}

/* Hover effects for better UX */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>