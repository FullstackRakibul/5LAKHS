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
          ? getAmountInWords(checkData.amount, checkData.currency) + ' ' + getCurrencyName(checkData.currency) + 'ONLY'
          : '___________________________________________________'
        }}
      </span>
    </div>

    <!-- Memo -->
    <div class="memo">
      <label>For:</label>
      <span>{{ checkData.memo || '_________________________' }}</span>
    </div>

    <!-- Signature with illegible handwriting font -->
    <div class="signature">
      <strong class="handwriting-font">{{ checkData.accountHolder || '_________________________' }}</strong>
      <div class="line"></div>
      <div class="text-center text-xs">Authorized Signature</div>
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
  const symbols = { BDT: "৳", USD: '$', EUR: '€', GBP: '£', INR: '₹', CAD: 'C$', AUD: 'A$', JPY: '¥' }
  return symbols[currency] || '$'
}

const formatAmount = (amount) => amount.toLocaleString()

const getAmountInWords = (amount) => numberToWords(amount).toLowerCase()

const getCurrencyName = (currency) => {
  const names = { BDT: "TAKA", USD: 'DOLLARS', EUR: 'EUROS', GBP: 'POUNDS', INR: 'RUPEES', CAD: 'DOLLARS', AUD: 'DOLLARS', JPY: 'YEN' }
  return names[currency] || 'DOLLARS'
}
</script>

<style scoped>
/* Import Google Fonts for handwriting */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Shadows+Into+Light&family=Homemade+Apple&family=Gochi+Hand&family=Indie+Flower&family=Permanent+Marker&family=Caveat:wght@400;500;600;700&family=Patrick+Hand&family=Amatic+SC:wght@400;700&family=Kalam:wght@300;400;700&family=Nothing+You+Could+Do&family=Rock+Salt&family=Satisfy&family=Shadows+Into+Light+Two&family=Yellowtail&family=Zeyada&display=swap');

/* Base responsive container */
.check-template {
  width: 100%;
  max-width: 800px;
  min-width: 280px;
  height: auto;
  min-height: 350px;
  background: #fdfdfd;
  border: 1px solid #333;
  padding: 15px;
  font-family: 'Times New Roman', serif;
  font-size: 14px;
  color: #000;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

/* Handwriting font class - random selection */
.handwriting-font {
  font-family: 'Zeyada', 'Caveat', 'Dancing Script', 'Shadows Into Light', 'Homemade Apple',
    'Gochi Hand', 'Indie Flower', 'Permanent Marker', 'Patrick Hand',
    'Nothing You Could Do', 'Rock Salt', 'Yellowtail', cursive;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #000;
  text-transform: capitalize;
  margin-bottom: 5px;
  display: block;
  text-align: center;
  width: 100%;
}

/* Random handwriting effect - each signature looks slightly different */
.check-template:nth-child(1) .handwriting-font {
  font-family: 'Zeyada', cursive;
  transform: rotate(-1deg);
}

.check-template:nth-child(2) .handwriting-font {
  font-family: 'Caveat', cursive;
  transform: rotate(0.5deg);
}

.check-template:nth-child(3) .handwriting-font {
  font-family: 'Dancing Script', cursive;
  transform: rotate(-0.5deg);
}

/* Mobile-first responsive design */
@media (max-width: 768px) {
  .check-template {
    padding: 12px;
    font-size: 12px;
    transform: scale(0.95);
    transform-origin: top center;
  }

  .bank-name {
    font-size: 16px !important;
  }

  .amount-value {
    font-size: 14px !important;
  }

  .payee-name {
    min-width: 200px !important;
  }

  .amount-words span {
    min-width: 300px !important;
    font-size: 11px !important;
  }

  .micr {
    font-size: 14px !important;
  }

  .watermark {
    font-size: 40px !important;
  }

  .handwriting-font {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .check-template {
    transform: scale(0.85);
    margin-left: -10px;
    margin-right: -10px;
  }

  .handwriting-font {
    font-size: 18px;
  }
}

@media (min-width: 769px) {
  .check-template {
    width: 800px;
    height: 350px;
  }

  .handwriting-font {
    font-size: 26px;
  }
}

/* Position elements for desktop */
.check-address {
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 11px;
  color: #444;
  line-height: 1.3;
}

.bank-name {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}

.check-number {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 13px;
  font-weight: bold;
}

.check-date {
  position: absolute;
  top: 80px;
  right: 30px;
  font-size: 13px;
}

.payee {
  position: absolute;
  top: 120px;
  left: 20px;
  width: 500px;
}

.payee label {
  font-size: 12px;
  display: block;
  margin-bottom: 3px;
}

.payee-name {
  border-bottom: 1px solid #000;
  font-weight: bold;
  font-size: 15px;
  display: inline-block;
  min-width: 300px;
  padding: 2px 0;
}

.amount-box {
  position: absolute;
  top: 120px;
  right: 30px;
  width: 160px;
}

.amount-box label {
  font-size: 12px;
  display: block;
  margin-bottom: 3px;
  text-align: right;
}

.amount-value {
  border: 1px solid #000;
  font-weight: bold;
  font-size: 15px;
  text-align: right;
  padding: 4px;
  background: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
}

.amount-words {
  position: absolute;
  top: 180px;
  left: 20px;
  width: calc(100% - 40px);
}

.amount-words label {
  font-size: 12px;
  display: block;
  margin-bottom: 3px;
}

.amount-words span {
  border-bottom: 1px solid #000;
  font-style: italic;
  display: inline-block;
  min-width: 500px;
  width: 100%;
  padding: 2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.memo {
  position: absolute;
  top: 240px;
  left: 20px;
  width: 300px;
}

.memo label {
  font-size: 12px;
  display: block;
  margin-bottom: 3px;
}

.memo span {
  border-bottom: 1px solid #000;
  display: inline-block;
  min-width: 200px;
  padding: 2px 0;
}

.signature {
  position: absolute;
  bottom: 55px;
  right: 0px;
  width: 400px;
  text-align: end;
}

.signature .line {
  border-top: 1px solid #000;
  margin: 4px auto 4px;
  width: 180px;
}

.signature .text-xs {
  font-size: 8px;
  color: #666;
  margin-top: 2px;
}

.micr {
  position: absolute;
  bottom: 25px;
  left: 20px;
  right: 20px;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  letter-spacing: 1.5px;
  border-top: 1px solid #ccc;
  padding-top: 6px;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 60px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.05);
  pointer-events: none;
  z-index: 1;
}
</style>