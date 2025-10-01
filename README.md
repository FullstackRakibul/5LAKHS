Developer Bank — Fun Check Generator (office gamification)

“A small paper thing that says: you mattered today.”
This repo holds a playful Vue component and styling for generating fake bank checks you can gift inside your developer team — 5 lakh checks, memos of glory, and points that turn into cake at month-end. Keep it safe, keep it silly, keep it respectful.

What it is

A simple, single-file Vue check template (with styles and helpers) that renders a printable-looking bank check.
Designed for office fun — recognition tokens, silly awards, and gamified gratitude among devs.

Key ideas

Realistic layout (payee, amount, amount-in-words, memo, signature, MICR).

Easy to plug into an existing Vue app or a tiny static page.

Customizable address, bank name, currency, date, and designs/themes.

Meant for internal, non-financial use only — purely decorative.

Features

Clean classic check layout (Times New Roman feel) + optional blue-gradient theme.

Properly aligned fields and responsive-ish sizing for printing.

Helpers: format date, format amount, convert numbers to words.

Watermark & MICR line for visual fun.

Lightweight: no external UI frameworks required.

Repo structure
.
├── src/
│   ├── components/
│   │   └── CheckTemplate.vue      # main Vue SFC
│   ├── utils/
│   │   └── numberToWords.js       # amount-to-words helper
│   └── App.vue
├── public/
│   └── assets/                     # optional logos / fonts
├── package.json
├── README.md
└── LICENSE

Quick start (run locally)

Clone

git clone <repo-url>
cd developer-bank


Install

npm install
# or
yarn


Dev server

npm run dev
# or
yarn dev


Open http://localhost:3000 (or the address printed by your dev server) and click Generate Check or navigate to the component page.

Build for production

npm run build

Usage — example props

Drop CheckTemplate.vue into your Vue app and pass a checkData prop:

<template>
  <CheckTemplate :checkData="myCheck" />
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


Supported currencies: USD, EUR, GBP, INR, CAD, AUD, JPY, BDT (BDT will default to a generic symbol if not defined — you can add in getCurrencySymbol).

Customization
Themes

Two built-in visual approaches:

Classic: Times New Roman, subtle watermark, conservative layout.

Blue Gradient: modern, playful background — like the second attached image.

Switch by toggling a class on .check-template or by using a theme prop to the component (e.g., theme: 'classic' | 'blue'). Add CSS under .check-template.blue { ... }.

Address & branding

Replace the address block and watermark with your company/dev-club name and inside jokes. Keep it tasteful and non-offensive.

Number-to-words

The helper lives at src/utils/numberToWords.js. It’s simple and deterministic — tweak formatting for BDT linguistic flavor if you want to show “taka” or local wording.

Printing

The component is sized to an 800×350px check by default. For printing, use the browser print dialog and scale to fit.

Consider adding a @media print CSS block to remove shadows and set exact scale.

Example:

@media print {
  .check-template { box-shadow: none; border: 1px solid #000; }
}

Accessibility & Safety

This is decorative — do not present as legal tender. Add a tiny footer or watermark text like: FOR OFFICE FUN ONLY — NOT LEGAL TENDER.

Avoid real bank logos or real person info without consent.

Contributing

Yes, please! Suggestions:

Add more themes (retro, neon, treasure map).

Add a tiny backend or JSON store to track “issued checks” and produce a leaderboard.

Improve number-to-words for BDT (taka / poisha) or other language localization.

Contribute with PRs:

Fork

Create a feature branch

Add tests or a demo screenshot

Submit PR with clear description

Troubleshooting

Fields misaligned? Make sure parent container isn’t resizing. The component expects a stable width; wrap it inside a container with overflow: auto if needed.

Amount words missing? Check numberToWords helper and ensure amount is numeric.

Printing scale off? Use browser print scaling or adjust width/height in CSS for a print-specific class.

Roadmap (short & fun)

 Classic Times-style check

 Proper alignment & MICR line

 Blue-gradient theme (optional)

 Small leaderboards export (CSV)

 Monthly theme scheduler + auto PDF generation

 Localization for Bengali (taka words)

License

MIT — use it, remix it, award colleagues their 5 lakh checks and throw that party. Just don’t use this to deceive people.

Final note (Because I like to end on a warm line)

This repo is small and honest: it makes beautiful little tokens of appreciation. In a world full of silent commits and unseen midnight fixes, let a silly check say what sometimes we forget to speak — thank you.