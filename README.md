# 🏦  Upay (উপায়) — Mayer Dowa Check Generator  

[![Made with Vue](https://img.shields.io/badge/Made%20with-Vue-42b883?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)  
[![Fun Project](https://img.shields.io/badge/Fun-Office%20Gamification-ff69b4?style=for-the-badge&logo=github-sponsors)](#)  
[![Not Real Money](https://img.shields.io/badge/⚠️-NOT%20LEGAL%20TENDER-red?style=for-the-badge)](#)  

---

> *“A small paper thing that says: you mattered today.”*  

This repo contains a playful **Vue component** that generates **fake bank checks** 📝 for developer office fun.  
Each help = 🏅 a **5 lakh check** → at month’s end, they become **points + cake party**.  

⚠️ **Disclaimer:** Just for fun. Keep it lighthearted & respectful.  

---

## 📑 Table of Contents  

- [✨ Features](#-features)  
- [📂 Repo Structure](#-repo-structure)  
- [🚀 Quick Start](#-quick-start)  
- [💡 Usage](#-usage-example-props)  
- [🎨 Customization](#-customization)  
- [🖨️ Printing](#️-printing)  
- [🛠️ Troubleshooting](#️-troubleshooting)  
- [📈 Roadmap](#-roadmap-fun--real)  
- [🤝 Contributing](#-contributing)  
- [📜 License](#-license)  
- [🌟 Final Note](#-final-note)  

---

## ✨ Features  

- 🎨 **Classic layout** (Times New Roman vibe)  
- 🌊 **Blue-gradient theme** (modern + fun)  
- 🧾 **Realistic fields**: payee, amount, words, memo, MICR  
- ⚡ **Helpers**: format date, numbers → words  
- 💡 Lightweight: No external UI frameworks  

---



## 📂 Repo Structure
```text
.
├── src/
│   ├── components/
│   │   └── CheckTemplate.vue      # main Vue SFC
│   ├── utils/
│   │   └── numberToWords.js       # helper
│   └── App.vue
├── public/
│   └── assets/                     # logos / fonts
├── package.json
├── README.md
└── LICENSE


Open 👉 http://localhost:3000

Build for production:


npm run build



💡 Usage (example props)
<template>
  <CheckTemplate :checkData="myCheck" theme="blue" />
</template>

<script>
import CheckTemplate from './components/CheckTemplate.vue'

export default {
  components: { CheckTemplate },
  data() {
    return {
      myCheck: {
        payeeName: 'Rakibul H. Rabbi',
        bankName: 'Mayer Dowa Bank',
        currency: 'BDT',
        amount: 500000,
        date: '2025-09-30',
        memo: 'Saved us from regex hell',
        accountHolder: 'Office Treasury',
        address: 'Ha-Meem Group, Dhaka',
        phone: '+880 17 0000 0000',
        checkNumber: '0025'
      }
    }
  }
}
</script>

🎨 Customization

Themes: classic | blue

Branding: Replace watermark/address with your team’s inside jokes

Number-to-Words: Edit numberToWords.js for local “taka / poisha” flavor

🖨️ Printing

Default size: 800×350px

@media print {
  .check-template { 
    box-shadow: none; 
    border: 1px solid #000; 
  }
}

🛠️ Troubleshooting

🔧 Fields misaligned? → Wrap in fixed container

🔧 Words missing? → Check numberToWords.js

🔧 Print scale off? → Adjust with @media print

📈 Roadmap (fun + real)

✅ Classic Times-style check

✅ Blue-gradient theme

🔜 Leaderboards (CSV export)

🔜 Auto PDF generation

🔜 Bengali localization (Taka / Poisha)

🔜 Retro / neon / treasure map themes

🤝 Contributing

🍴 Fork

🌿 Create branch

🧪 Add tests/screenshots

🔁 Submit PR

Ideas: more themes, better localization, mini leaderboard backend

📜 License

MIT
 — remix, use, and award colleagues their 5 lakh checks 🎉

🌟 Final Note

In a world of silent commits & unseen fixes,
sometimes a silly check is all you need to say:

Thank you. 🙌