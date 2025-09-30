<template>
  <div class="check-template">
    <!-- Address / Account Holder -->
    <div class="check-address">
      {{ checkData.accountHolder || 'YOUR NAME' }}<br />
      {{ checkData.address || '1939 Kane Street, Gotham City' }}<br />
      {{ checkData.phone || 'Tel: (718) 979-02005' }}
    </div>

    <!-- Bank Name -->
    <div class="bank-name">{{ checkData.bankName }}</div>

    <!-- Check Number -->
    <div class="check-number">Check #: {{ checkData.checkNumber }}</div>

    <!-- Date -->
    <div class="check-date">
      Date: <span>{{ formatDate(checkData.date) }}</span>
    </div>

    <!-- Payee -->
    <div class="payee">
      <label>Pay to the order of:</label>
      <span class="payee-name">{{ checkData.payeeName || '_________________________' }}</span>
    </div>

    <!-- Amount Box -->
    <div class="amount-box">
      <label>Amount</label>
      <div class="amount-value">
        {{ getCurrencySymbol(checkData.currency) }}{{ formatAmount(checkData.amount) }}
      </div>
    </div>

    <!-- Amount in Words -->
    <div class="amount-words">
      <label>Amount in words:</label>
      <span>
        {{ checkData.amount
          ? getAmountInWords(checkData.amount, checkData.currency) + ' ' + getCurrencyName(checkData.currency) + ' ONLY'
          : '___________________________________________________'
        }}
      </span>
    </div>

    <!-- Memo -->
    <div class="memo">
      <label>For:</label>
      <span>{{ checkData.memo || '_________________________' }}</span>
    </div>

    <!-- Signature -->
    <div class="signature">
      <div class="line"></div>
      <div>Authorized Signature</div>
      <strong>{{ checkData.accountHolder || '_________________________' }}</strong>
    </div>

    <!-- MICR -->
    <div class="micr">
      C{{ checkData.checkNumber }}C A123FAKE789A C••••6789C
    </div>

    <!-- Watermark -->
    <div class="watermark">{{ checkData.bankName }}</div>
  </div>
</template>

<script setup>
import { numberToWords } from '../utils/pdfGenerator'

const props = defineProps({
  checkData: {
    type: Object,
    required: true,
    default: () => ({
      payeeName: '',
      bankName: '',
      currency: 'USD',
      amount: 500000,
      date: '',
      memo: '',
      accountHolder: '',
      address: '',
      phone: '',
      checkNumber: '0001'
    })
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'short', day: '2-digit' }
  return date.toLocaleDateString('en-US', options)
}

const getCurrencySymbol = (currency) => {
  const symbols = { USD: '$', EUR: '€', GBP: '£', INR: '₹', CAD: 'C$', AUD: 'A$', JPY: '¥' }
  return symbols[currency] || '$'
}

const formatAmount = (amount) => amount.toLocaleString()

const getAmountInWords = (amount) => numberToWords(amount).toLowerCase()

const getCurrencyName = (currency) => {
  const names = { USD: 'DOLLARS', EUR: 'EUROS', GBP: 'POUNDS', INR: 'RUPEES', CAD: 'DOLLARS', AUD: 'DOLLARS', JPY: 'YEN' }
  return names[currency] || 'DOLLARS'
}
</script>

<style scoped>
.check-template {
  width: 800px;
  height: 350px;
  background: #fdfdfd;
  border: 1px solid #333;
  padding: 20px;
  font-family: 'Times New Roman', serif;
  font-size: 15px;
  color: #000;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.check-address {
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 12px;
  color: #444;
  line-height: 1.4;
}

.bank-name {
  position: absolute;
  top: 20px;
  left: 260px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.check-number {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 14px;
  font-weight: bold;
}

.check-date {
  position: absolute;
  top: 80px;
  right: 30px;
  font-size: 14px;
}

.payee {
  position: absolute;
  top: 120px;
  left: 20px;
  width: 500px;
}

.payee label {
  font-size: 13px;
  display: block;
  margin-bottom: 4px;
}

.payee-name {
  border-bottom: 1px solid #000;
  font-weight: bold;
  font-size: 16px;
  display: inline-block;
  min-width: 300px;
  padding: 2px 0;
}

.amount-box {
  position: absolute;
  top: 120px;
  right: 30px;
  width: 180px;
}

.amount-box label {
  font-size: 13px;
  display: block;
  margin-bottom: 4px;
  text-align: right;
}

.amount-value {
  border: 1px solid #000;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
  padding: 5px;
  background: #fff;
}

.amount-words {
  position: absolute;
  top: 180px;
  left: 20px;
  width: 600px;
}

.amount-words label {
  font-size: 13px;
  display: block;
  margin-bottom: 4px;
}

.amount-words span {
  border-bottom: 1px solid #000;
  font-style: italic;
  display: inline-block;
  min-width: 500px;
  padding: 2px 0;
}

.memo {
  position: absolute;
  top: 240px;
  left: 20px;
  width: 300px;
}

.memo label {
  font-size: 13px;
  display: block;
  margin-bottom: 4px;
}

.memo span {
  border-bottom: 1px solid #000;
  display: inline-block;
  min-width: 200px;
  padding: 2px 0;
}

.signature {
  position: absolute;
  bottom: 70px;
  right: 40px;
  width: 250px;
  text-align: center;
}

.signature .line {
  border-top: 1px solid #000;
  margin-bottom: 5px;
}

.micr {
  position: absolute;
  bottom: 25px;
  left: 20px;
  right: 20px;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 18px;
  letter-spacing: 2px;
  border-top: 1px solid #ccc;
  padding-top: 8px;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 70px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.05);
  pointer-events: none;
}
</style>