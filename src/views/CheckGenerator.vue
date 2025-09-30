<template>
  <div class="min-h-screen bg-gray-50"> 
    <Navbar /> 
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
          
        <div class="bg-white overflow-hidden shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Generate Bank Check</h2>
            <p class="text-gray-600">Fill in the details to generate a professional bank check</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Check Details</h3>
              
              <form @submit.prevent="generateCheck" class="space-y-6">
                <div>
                  <label for="payeeName" class="block text-sm font-medium text-gray-700">
                    Pay to the Order of <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="payeeName"
                    v-model="checkData.payeeName"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter payee name"
                  />
                </div>

                <div>
                  <label for="bankName" class="block text-sm font-medium text-gray-700">
                    Bank Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="bankName"
                    v-model="checkData.bankName"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter bank name"
                  />
                </div>

                <div>
                  <label for="currency" class="block text-sm font-medium text-gray-700">
                    Currency <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="currency"
                    v-model="checkData.currency"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Amount (Fixed)</label>
                  <div class="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                    <span class="text-lg font-semibold text-gray-900">
                      {{ formatAmount(500000, checkData.currency) }}
                    </span>
                    <span class="text-sm text-gray-500 ml-2">(Five Hundred Thousand)</span>
                  </div>
                </div>

                  
                <div>
                  <label for="checkDate" class="block text-sm font-medium text-gray-700">
                    Date <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="checkDate"
                    v-model="checkData.date"
                    type="date"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label for="memo" class="block text-sm font-medium text-gray-700">
                    Memo/For (Optional)
                  </label>
                  <input
                    id="memo"
                    v-model="checkData.memo"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter memo or purpose"
                  />
                </div>

                <div>
                  <label for="accountHolder" class="block text-sm font-medium text-gray-700">
                    Account Holder Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="accountHolder"
                    v-model="checkData.accountHolder"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter account holder name"
                  />
                </div>

                <div class="flex space-x-4">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
                  >
                    {{ loading ? 'Generating...' : 'Generate Check Preview' }}
                  </button>
                  
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>


          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Check Preview</h3>
                <button
                  v-if="showPreview"
                  @click="downloadPDF"
                  :disabled="downloadingPDF"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {{ downloadingPDF ? 'Generating PDF...' : 'Download PDF' }}
                </button>
              </div>
              
              <div v-if="!showPreview" class="text-center py-12 text-gray-500">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="mt-2">Fill in the form to see check preview</p>
              </div>

              <div v-if="showPreview" class="border rounded-lg overflow-hidden">
                <CheckTemplate :checkData="checkData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

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
    JPY: '¥'
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
    
    // Add to recent activity
    const activity = {
      description: `Generated check for ${checkData.value.payeeName} - ${formatAmount(checkData.value.amount, checkData.value.currency)}`,
      time: new Date().toLocaleTimeString()
    }
    
    const recentActivity = JSON.parse(localStorage.getItem('recentActivity') || '[]')
    recentActivity.unshift(activity)
    if (recentActivity.length > 10) recentActivity.pop()
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
