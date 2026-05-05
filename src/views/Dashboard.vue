<template>
  <div class="min-h-screen bg-dark-bg pt-20">
    <main class="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-10 space-y-3">
        <h1 class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-100 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p class="text-lg text-dark-text-secondary">Welcome back! Generate professional bank checks with ease.</p>
      </div>

      <!-- Stats Grid Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <!-- Generate Check Button Card -->
        <button 
          @click="navigateToGenerator"
          class="glass-card-sm group hover:border-indigo-400 hover:shadow-glow transition-all duration-300 cursor-pointer stagger-item">
          <div class="flex items-center gap-4">
            <div class="p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-600/30">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"></path>
              </svg>
            </div>
            <div>
              <p class="stat-label">New Check</p>
              <p class="text-xl font-bold text-indigo-300">Generate</p>
            </div>
          </div>
        </button>

        <!-- Checks Generated Card -->
        <div class="glass-card-sm stagger-item">
          <div class="flex items-center gap-4">
            <div class="p-4 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-600/30">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586L18 8.414V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <p class="stat-label">Checks Generated</p>
              <p class="text-3xl font-bold text-emerald-300">{{ checksGenerated }}</p>
            </div>
          </div>
        </div>

        <!-- Fixed Amount Card -->
        <div class="glass-card-sm stagger-item">
          <div class="flex items-center gap-4">
            <div class="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-600/30">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"></path>
              </svg>
            </div>
            <div>
              <p class="stat-label">Fixed Amount</p>
              <p class="text-2xl font-bold text-blue-300">৳5,00,000</p>
            </div>
          </div>
        </div>

        <!-- Success Rate Card -->
        <div class="glass-card-sm stagger-item">
          <div class="flex items-center gap-4">
            <div class="p-4 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 shadow-lg shadow-amber-600/30">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p class="stat-label">Success Rate</p>
              <p class="text-3xl font-bold text-amber-300">100%</p>
            </div>
          </div>
        </div>
      </div>

        <!-- Recent Activity Section -->
        <div class="glass-card-lg">
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-dark-text mb-2">Recent Activity</h2>
              <p class="text-dark-text-secondary">Your recently generated checks</p>
            </div>

            <div v-if="recentActivity.length > 0" class="space-y-3">
              <div v-for="(activity, index) in recentActivity" :key="index"
                class="activity-card group">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <!-- Activity Info -->
                  <div class="flex items-start gap-3 flex-1 min-w-0">
                    <div class="p-3 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 flex-shrink-0 shadow-lg shadow-indigo-600/30">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-base font-semibold text-dark-text truncate">
                        {{ activity.payeeName ? `Check for ${activity.payeeName}` : activity.description }}
                      </p>
                      <div class="flex items-center gap-2 mt-2 flex-wrap">
                        <span class="inline-flex items-center gap-1 text-xs text-dark-text-secondary">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {{ activity.formattedTime || activity.time }}
                        </span>
                        <span class="text-dark-text-secondary">•</span>
                        <span class="text-xs font-semibold text-indigo-300">
                          {{ activity.amount ? `${activity.currency} ${activity.amount.toLocaleString()}` : '' }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-2 w-full sm:w-auto">
                    <button @click="redownloadCheck(activity)" 
                      :disabled="generatingPDF"
                      class="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                             bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed">
                      <svg v-if="!generatingPDF || selectedActivityIndex !== index" class="w-4 h-4"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                      </svg>
                      <svg v-else class="animate-spin-indigo w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      <span class="hidden sm:inline">{{ generatingPDF && selectedActivityIndex === index ? 'Generating...'
                        : 'Download' }}</span>
                    </button>

                    <button @click="removeActivity(index)"
                      class="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                             border border-dark-border hover:bg-red-600 hover:bg-opacity-10 hover:border-red-600 hover:border-opacity-30 text-dark-text-secondary hover:text-red-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <div class="mx-auto w-16 h-16 text-dark-text-secondary mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <p class="text-dark-text mb-2">No recent activity yet</p>
              <p class="text-sm text-dark-text-secondary mb-6">Generate your first check to get started!</p>
              <button @click="navigateToGenerator"
                class="btn-primary inline-flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"></path>
                </svg>
                Create First Check
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
  // Support both new structure (activity IS the check data) and old structure (activity.data has the check data)
  let checkData = activity.payeeName ? activity : activity.data

  // Fallback for very old legacy data without 'data' property
  if (!checkData) {
    const confirmFallback = confirm('This check was generated before the re-download feature was fully enabled. Some details (like bank name and date) may be missing. Do you want to proceed with default values?')

    if (!confirmFallback) return

    // Attempt to extract data from description
    const description = activity.description || ''
    const payeeMatch = description.match(/Generated check for (.+?) -/)

    checkData = {
      payeeName: payeeMatch ? payeeMatch[1] : 'Unknown Payee',
      bankName: 'Bank Name', // Default
      currency: 'USD', // Default
      amount: 0, // Default
      date: new Date().toISOString().split('T')[0],
      memo: 'Re-generated Check',
      accountHolder: 'Account Holder',
      checkNumber: '0000'
    }
  }

  generatingPDF.value = true
  selectedActivityIndex.value = recentActivity.value.indexOf(activity)
  selectedCheckData.value = checkData

  try {
    // Wait for DOM to update with the selected check data
    await nextTick()
    // Small delay to ensure fonts and styles are applied
    await new Promise(resolve => setTimeout(resolve, 100))

    await generateCheckPDF(checkData)
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
/* Activity Card Styles */
.activity-card {
  @apply glass-card-sm;
  @apply transition-all duration-300;
}

.activity-card:hover {
  @apply border-indigo-400 shadow-glow;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  button {
    @apply min-h-10;
  }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* Smooth transitions */
.transition {
  @apply transition-all duration-300 ease-in-out;
}

/* Animation for stat counter */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-value {
  animation: slideUp 0.5s ease-out;
}
</style>
