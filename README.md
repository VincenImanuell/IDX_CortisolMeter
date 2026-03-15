# 😌 Cortisol Meter — IDX Volatility Tracker

> Karena investor sejati itu low cortisol. Tapi tetap ngitung dulu sebelum santai.

A fun, meme-inspired stock volatility tracker for Indonesian Stock Exchange (IDX). Enter any IDX stock, choose your time period, and let the **Cortisol Meter** tell you how stressed your portfolio should make you feel.

---

## 🚀 Features

- 📊 Real-time IDX stock data via Yahoo Finance
- 😰 Animated Cortisol Meter (smooth gauge animation)
- 🔍 Searchable dropdown for 40+ IDX stocks
- 📅 Adjustable volatility period (7 / 14 / 30 / 60 days)
- 🧮 Volatility calculation using Historical Volatility (HV)
- 🌈 Playful, colorful UI with meme energy

---

## 🧮 How Volatility is Calculated

**Historical Volatility (HV):**
\`\`\`
Daily Return = (Price Today - Price Yesterday) / Price Yesterday
HV = StdDev(Daily Returns) × √252
\`\`\`

**Cortisol Score** maps HV to a 0–100 scale:
- 0–20: 😌 Low cortisol, you're chilling
- 21–40: 🙂 Mild, normal market movement
- 41–60: 😬 Medium, start paying attention
- 61–80: 😰 High, maybe don't check your porto every hour
- 81–100: 💀 Ultra volatile, cortisol through the roof

---

## 🛠 Tech Stack

- **React** + Vite
- **Axios** for API calls
- **Yahoo Finance** (via CORS proxy) for real-time data
- Deployed on **Vercel**

---

## 🏃 Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

---

*Built with love and low cortisol energy. 😌*
