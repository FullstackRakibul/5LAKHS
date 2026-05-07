<template>
  <section class="min-h-screen py-8 sm:py-12" style="background-color: #0f0f1a;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-10 space-y-3 animate-slide-up">
        <h1 class="text-4xl md:text-5xl font-bold text-gradient">Generate Check</h1>
        <p class="text-secondary text-lg">Fill in the details to create a professional bank check</p>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div 
          class="glass-card"
          style="animation: slideUp 0.4s ease-out 0.1s backwards;"
        >
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-primary mb-1">Check Details</h2>
              <p class="text-secondary text-sm">Enter the check information below</p>
            </div>

            <form @submit.prevent="generateCheck" class="space-y-5">
              <!-- Payee Name -->
              <div class="glass-input-container">
                <label for="payeeName" class="block text-sm font-medium text-primary mb-2">
                  Pay to the Order of <span class="text-warning">*</span>
                </label>
                <input 
                  id="payeeName"
                  v-model="checkData.payeeName"
                  type="text"
                  required
                  class="input-primary w-full"
                  placeholder="Enter payee name"
                  @input="onFormChange"
                />
              </div>

              <!-- Two Column Layout -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <!-- Bank Name -->
                <div class="glass-input-container">
                  <label for="bankName" class="block text-sm font-medium text-primary mb-2">
                    Bank Name <span class="text-warning">*</span>
                  </label>
                  <input 
                    id="bankName"
                    v-model="checkData.bankName"
                    type="text"
                    required
                    class="input-primary w-full"
                    placeholder="Enter bank name"
                    @input="onFormChange"
                  />
                </div>

                <!-- Currency -->
                <div class="glass-input-container">
                  <label for="currency" class="block text-sm font-medium text-primary mb-2">
                    Currency <span class="text-warning">*</span>
                  </label>
                  <select 
                    id="currency"
                    v-model="checkData.currency"
                    class="input-primary w-full"
                    @change="onFormChange"
                  >
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
              <div class="glass-input-container">
                <label for="checkDate" class="block text-sm font-medium text-primary mb-2">
                  Date <span class="text-warning">*</span>
                </label>
                <input 
                  id="checkDate"
                  v-model="checkData.date"
                  type="date"
                  required
                  class="input-primary w-full"
                  @change="onFormChange"
                />
              </div>

              <!-- Fixed Amount Display -->
              <div class="p-4 rounded-xl border-2 transition-all duration-300" style="background-color: rgba(99, 102, 241, 0.08); border-color: rgba(99, 102, 241, 0.3);">
                <label class="block text-sm font-medium text-secondary mb-2">Amount (Fixed)</label>
                <p class="text-3xl font-bold text-accent-light">
                  {{ formatAmount(500000, checkData.currency) }}
                </p>
                <p class="text-xs text-secondary mt-2">Five Hundred Thousand</p>
              </div>

              <!-- Memo & Account Holder -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="glass-input-container">
                  <label for="memo" class="block text-sm font-medium text-primary mb-2">
                    Memo/For <span class="text-tertiary">(Optional)</span>
                  </label>
                  <input 
                    id="memo"
                    v-model="checkData.memo"
                    type="text"
                    class="input-primary w-full"
                    placeholder="Enter memo or purpose"
                    @input="onFormChange"
                  />
                </div>

                <div class="glass-input-container">
                  <label for="accountHolder" class="block text-sm font-medium text-primary mb-2">
                    Account Holder <span class="text-warning">*</span>
                  </label>
                  <input 
                    id="accountHolder"
                    v-model="checkData.accountHolder"
                    type="text"
                    required
                    class="input-primary w-full"
                    placeholder="Enter account holder name"
                    @input="onFormChange"
                  />
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 pt-4">
                <button 
                  type="submit"
                  :disabled="loading"
                  class="button-primary flex-1 flex items-center justify-center gap-2 py-3 disabled:opacity-50"
                >
                  <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
                  </svg>
                  <svg v-else class="animate-spin-indigo w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  {{ loading ? 'Generating...' : 'Generate Preview' }}
                </button>

                <button type="button" @click="resetForm" class="button-secondary px-6 py-3">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Preview Section -->
        <div 
          class="glass-card sticky top-24 h-fit"
          style="animation: slideUp 0.4s ease-out 0.2s backwards;"
        >
          <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col gap-4">
              <div>
                <h2 class="text-2xl font-bold text-primary mb-1">Check Preview</h2>
                <p class="text-secondary text-sm">Live preview of your check</p>
              </div>

              <button 
                v-if="showPreview"
                @click="downloadPDF"
                :disabled="downloadingPDF"
                class="button-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50"
              >
                <svg v-if="!downloadingPDF" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <svg v-else class="animate-spin-indigo w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ downloadingPDF ? 'Generating PDF...' : 'Download Check' }}
              </button>
            </div>

            <!-- Empty State -->
            <div v-if="!showPreview" class="text-center py-12">
              <div class="mx-auto w-16 h-16 text-secondary mb-4 opacity-50">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
              </div>
              <p class="text-primary font-medium">Fill the form to preview your check</p>
              <p class="text-secondary text-sm mt-1">All fields must be completed</p>
            </div>

            <!-- Preview Content -->
            <transition
              enter-active-class="transition-all ease-out duration-300"
              enter-from-class="opacity-0 scale-95 translate-y-2"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all ease-in duration-200"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-2"
            >
              <div v-if="showPreview" class="space-y-4 animate-fade-in">
                <div class="p-4 rounded-xl border-2 overflow-auto" style="background-color: rgba(99, 102, 241, 0.05); border-color: rgba(99, 102, 241, 0.2);">
                  <div class="flex justify-center">
                    <div class="w-full">
                      <CheckTemplate :checkData="checkData" />
                    </div>
                  </div>
                </div>
                <p class="text-xs text-secondary text-center">
                  PDF will be generated at actual check size (3×7 inches)
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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

:deep(.text-tertiary) {
  color: #808080;
}

:deep(.text-warning) {
  color: #f59e0b;
}

:deep(.text-accent-light) {
  color: #818cf8;
}

/* Sticky preview on larger screens */
@media (max-width: 1024px) {
  .sticky {
    position: static;
  }
  
  .h-fit {
    height: auto;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
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
  const today = new Date().toISOString().split('T')[0]
  checkData.value.date = today
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

const onFormChange = () => {
  // Form change handler for live updates if needed
}

const generateCheck = async () => {
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    showPreview.value = true

    const currentCount = parseInt(localStorage.getItem('checksGenerated') || '0')
    const newCount = currentCount + 1
    localStorage.setItem('checksGenerated', newCount.toString())

    const newCheck = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      ...checkData.value,
      createdAt: new Date().toISOString(),
      formattedTime: new Date().toLocaleTimeString(),
      description: `Generated check for ${checkData.value.payeeName} - ${formatAmount(checkData.value.amount, checkData.value.currency)}`
    }

    let recentActivity = JSON.parse(localStorage.getItem('recentActivity') || '[]')
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
</script>