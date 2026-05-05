<template>
  <section class="min-h-screen bg-dark-bg pt-24 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-12 space-y-3">
        <h1 class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-100 bg-clip-text text-transparent">
          Generate Check
        </h1>
        <p class="text-lg text-dark-text-secondary">Fill in the details to create a professional bank check</p>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div class="glass-card-lg">
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-dark-text mb-2">Check Details</h2>
              <p class="text-dark-text-secondary">Enter the check information below</p>
            </div>

              <form @submit.prevent="generateCheck" class="space-y-6">
                <!-- Payee Name -->
                <div>
                  <label for="payeeName" class="form-label">
                    Pay to the Order of <span class="text-red-400">*</span>
                  </label>
                  <input 
                    id="payeeName" 
                    v-model="checkData.payeeName" 
                    type="text" 
                    required
                    class="input-primary text-base"
                    placeholder="Enter payee name" />
                </div>

                <!-- Two Column Layout -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <!-- Bank Name -->
                  <div>
                    <label for="bankName" class="form-label">
                      Bank Name <span class="text-red-400">*</span>
                    </label>
                    <input 
                      id="bankName" 
                      v-model="checkData.bankName" 
                      type="text" 
                      required
                      class="input-primary text-base"
                      placeholder="Enter bank name" />
                  </div>

                  <!-- Currency -->
                  <div>
                    <label for="currency" class="form-label">
                      Currency <span class="text-red-400">*</span>
                    </label>
                    <select 
                      id="currency" 
                      v-model="checkData.currency"
                      class="input-primary text-base">
                      <option value="BDT">BDT - Bangladeshi Taka</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                </div>

                <!-- Check Date -->
                <div>
                  <label for="checkDate" class="form-label">
                    Date <span class="text-red-400">*</span>
                  </label>
                  <input 
                    id="checkDate" 
                    v-model="checkData.date" 
                    type="date" 
                    required
                    class="input-primary text-base" />
                </div>

                <!-- Fixed Amount Display -->
                <div>
                  <label class="form-label">Amount (Fixed)</label>
                  <div class="p-4 rounded-xl border border-dark-border bg-dark-card bg-opacity-20 backdrop-blur-lg">
                    <p class="text-2xl font-bold text-indigo-300">
                      {{ formatAmount(500000, checkData.currency) }}
                    </p>
                    <p class="text-sm text-dark-text-secondary mt-2">Five Hundred Thousand</p>
                  </div>
                </div>

                <!-- Memo & Account Holder -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label for="memo" class="form-label">
                      Memo/For <span class="text-dark-text-secondary">(Optional)</span>
                    </label>
                    <input 
                      id="memo" 
                      v-model="checkData.memo" 
                      type="text"
                      class="input-primary text-base"
                      placeholder="Enter memo or purpose" />
                  </div>

                  <div>
                    <label for="accountHolder" class="form-label">
                      Account Holder <span class="text-red-400">*</span>
                    </label>
                    <input 
                      id="accountHolder" 
                      v-model="checkData.accountHolder" 
                      type="text" 
                      required
                      class="input-primary text-base"
                      placeholder="Enter account holder name" />
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-4">
                  <button 
                    type="submit" 
                    :disabled="loading"
                    class="btn-primary flex-1 flex items-center justify-center gap-2">
                    <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
                    </svg>
                    <svg v-else class="animate-spin-indigo w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ loading ? 'Generating...' : 'Generate Preview' }}
                  </button>

                  <button 
                    type="button" 
                    @click="resetForm"
                    class="btn-secondary px-6">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

        <!-- Preview Section -->
        <div class="glass-card-lg sticky top-24">
          <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col gap-4">
              <div>
                <h2 class="text-2xl font-bold text-dark-text mb-2">Check Preview</h2>
                <p class="text-dark-text-secondary">Live preview of your check</p>
              </div>
              
              <button 
                v-if="showPreview" 
                @click="downloadPDF" 
                :disabled="downloadingPDF"
                class="btn-primary w-full flex items-center justify-center gap-2">
                <svg v-if="!downloadingPDF" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <svg v-else class="animate-spin-indigo w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ downloadingPDF ? 'Generating PDF...' : 'Download Check' }}
              </button>
            </div>

            <!-- Empty State -->
            <div v-if="!showPreview" class="text-center py-12">
              <div class="mx-auto w-16 h-16 text-dark-text-secondary mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <p class="text-dark-text-secondary">Fill the form to preview your check</p>
            </div>

            <!-- Preview Content -->
            <div v-if="showPreview" class="space-y-4">
              <div class="bg-dark-card bg-opacity-40 rounded-xl p-4 border border-dark-border">
                <div class="flex justify-center overflow-auto">
                  <div class="w-full max-w-xl">
                    <CheckTemplate :checkData="checkData" />
                  </div>
                </div>
              </div>
              <p class="text-xs text-dark-text-secondary text-center">
                PDF will be generated at actual check size (3×7 inches)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-label {
  @apply block text-sm font-semibold text-dark-text mb-2;
}

/* Input focus style */
:deep(.input-primary) {
  @apply text-dark-text placeholder-dark-text-secondary;
}

:deep(.input-primary:focus) {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

/* Sticky preview on larger screens */
@media (max-width: 1024px) {
  .sticky {
    position: static;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  :deep(.input-primary) {
    @apply text-base;
  }
}

/* Animation for preview appearance */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-preview {
  animation: fadeSlideUp 0.4s ease-out;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import CheckTemplate from '../components/CheckTemplate.vue'
import { generateCheckPDF } from '../utils/pdfGenerator'

const checkData = ref({
  payeeName: '',
  bankName: '',
  currency: 'USD',
  amount: 500000,
  date: '',
  memo: '',
  accountHolder: '',
  checkNumber: '0001'
})

const loading = ref(false)
const downloadingPDF = ref(false)
const showPreview = ref(false)

onMounted(() => {
  // Set today's date as default
  const today = new Date().toISOString().split('T')[0]
  checkData.value.date = today

  // Generate new check number
  generateCheckNumber()
})

const formatAmount = (amount, currency) => {
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
    BDT: '৳'
  }

  const symbol = currencySymbols[currency] || currency
  return `${symbol}${amount.toLocaleString()}`
}

const generateCheckNumber = () => {
  const savedCheckCount = localStorage.getItem('checksGenerated') || '0'
  const nextNumber = (parseInt(savedCheckCount) + 1).toString().padStart(4, '0')
  checkData.value.checkNumber = nextNumber
}

const generateCheck = async () => {
  loading.value = true

  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    showPreview.value = true

    // Update statistics
    const currentCount = parseInt(localStorage.getItem('checksGenerated') || '0')
    const newCount = currentCount + 1
    localStorage.setItem('checksGenerated', newCount.toString())

    // Create full check object with ID
    const newCheck = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      ...checkData.value,
      createdAt: new Date().toISOString(),
      formattedTime: new Date().toLocaleTimeString(),
      description: `Generated check for ${checkData.value.payeeName} - ${formatAmount(checkData.value.amount, checkData.value.currency)}`
    }

    let recentActivity = JSON.parse(localStorage.getItem('recentActivity') || '[]')
    // Ensure recentActivity is an array
    if (!Array.isArray(recentActivity)) {
      recentActivity = []
    }

    recentActivity.unshift(newCheck)
    if (recentActivity.length > 20) recentActivity.pop()
    localStorage.setItem('recentActivity', JSON.stringify(recentActivity))

  } catch (error) {
    console.error('Error generating check:', error)
  } finally {
    loading.value = false
  }
}

const downloadPDF = async () => {
  downloadingPDF.value = true

  try {
    await generateCheckPDF(checkData.value)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
  } finally {
    downloadingPDF.value = false
  }
}

const resetForm = () => {
  checkData.value = {
    payeeName: '',
    bankName: '',
    currency: 'USD',
    amount: 500000,
    date: new Date().toISOString().split('T')[0],
    memo: '',
    accountHolder: '',
    checkNumber: '0001'
  }
  showPreview.value = false
  generateCheckNumber()
}
</script>
