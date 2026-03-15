# 😌 IDX Cortisol Meter

> Ngitung dulu, panik belakangan.

**IDX Cortisol Meter** adalah web app yang mengukur seberapa volatile saham pilihanmu di Bursa Efek Indonesia (IDX) — dan mengkonversinya jadi **Cortisol Score** yang mudah dibaca.

Karena investor sejati itu *low cortisol*. Tapi tetap ngitung dulu sebelum santai.

---

## 🚀 Live Demo

👉 **[idx-cortisol-meter.vercel.app](https://idx-cortisol-meter.vercel.app)**

---

## ✨ Fitur

- 📊 **956 saham IDX** — lengkap dengan filter per sektor
- 😌 **Cortisol Meter** — gauge animasi smooth yang menunjukkan level volatilitas
- 📅 **Periode fleksibel** — pilih 7, 14, 30, atau 60 hari
- 🧮 **Edukasi transparan** — penjelasan lengkap dari mana angka cortisol score berasal
- ⚡ **Real-time data** — langsung dari Yahoo Finance
- 🌙 **Dark mode** — karena investor yang stres tidak butuh silau

---

## 🧮 Cara Kerja

### 1. Ambil Data Harga
Data harga penutupan diambil dari Yahoo Finance untuk periode yang dipilih.

### 2. Hitung Daily Return
```
Return = ln(Harga Hari Ini / Harga Kemarin)
```

### 3. Hitung Historical Volatility (HV)
```
HV = StdDev(Daily Returns) × √252 × 100%
```
Disetahunkan dengan √252 (jumlah hari trading dalam setahun).

### 4. Konversi ke Cortisol Score
```
Score = (HV - 5) / (75 - 5) × 100
```
Dipetakan dari range HV saham IDX (5%–75%) ke skala 0–100.

### Skala Cortisol Score

| Score | Level | Artinya |
|-------|-------|---------|
| 0–20 | 😌 Santai Banget | Volatilitas rendah, tidur nyenyak |
| 21–40 | 🙂 Masih Oke | Normal, tetap pantau |
| 41–60 | 😬 Mulai Waspada | Lumayan volatile |
| 61–80 | 😰 Deg-degan | Volatile tinggi |
| 81–100 | 💀 Panik Total | Ultra volatile, siapkan antasida |

---

## 🛠 Tech Stack

- **React** + Vite
- **Vercel Serverless Functions** (Node.js) — backend API
- **Yahoo Finance** — sumber data harga saham real-time
- **CSS Modules** — styling
- Deployed on **Vercel**

---

## 🏃 Jalankan Lokal

```bash
# Clone repo
git clone https://github.com/VincenImanuell/IDX_CortisolMeter.git
cd IDX_CortisolMeter

# Install dependencies
npm install

# Jalankan dengan Vercel CLI (untuk API serverless)
npm install -g vercel
vercel dev
```

Buka `http://localhost:3000` di browser.

---

## 📁 Struktur Project

```
IDX_CortisolMeter/
├── api/
│   └── stock.js          # Serverless function — fetch & kalkulasi
├── src/
│   ├── components/
│   │   ├── CortisolMeter.jsx
│   │   ├── CortisolGauge.jsx
│   │   ├── StockSelector.jsx
│   │   ├── PeriodSelector.jsx
│   │   ├── ResultExplanation.jsx
│   │   └── Header.jsx
│   ├── data/
│   │   ├── stocks.js     # 956 saham IDX
│   │   └── periods.js
│   ├── hooks/
│   │   └── useStockData.js
│   └── styles/
│       └── globals.css
├── vercel.json
└── index.html
```

---

## 👤 Author

**Vincen Imanuel**

[![GitHub](https://img.shields.io/badge/GitHub-VincenImanuell-181717?style=flat&logo=github)](https://github.com/VincenImanuell)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vincen%20Imanuel-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/vincenimanuel)
[![Instagram](https://img.shields.io/badge/Instagram-@USERNAME-E4405F?style=flat&logo=instagram)](https://instagram.com/vincenimanuellim)

---

*Built with low cortisol energy 😌*
