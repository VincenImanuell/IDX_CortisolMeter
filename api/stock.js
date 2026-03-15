const calcHV = (prices) => {
  if (prices.length < 2) return 0

  const returns = []
  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1] > 0 && prices[i] > 0) {
      returns.push(Math.log(prices[i] / prices[i - 1]))
    }
  }

  if (returns.length < 2) return 0

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1)
  const stdDev = Math.sqrt(variance)

  return stdDev * Math.sqrt(252) * 100
}

const hvToCortisolScore = (hv) => {
  const min = 5
  const max = 75
  const clamped = Math.min(Math.max(hv, min), max)
  return Math.round(((clamped - min) / (max - min)) * 100)
}

const RANGE_MAP = {
  7:  '1mo',
  14: '1mo',
  30: '3mo',
  60: '6mo',
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { symbol, period = '30' } = req.query

  if (!symbol) return res.status(400).json({ error: 'Symbol is required' })

  const days = parseInt(period)
  if (isNaN(days) || days < 7 || days > 365) {
    return res.status(400).json({ error: 'Period must be between 7 and 365 days' })
  }

  try {
    const range = RANGE_MAP[days] || '3mo'
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=${range}`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://finance.yahoo.com/',
        'Origin': 'https://finance.yahoo.com',
      }
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: `Yahoo Finance error: ${response.status}` })
    }

    const json = await response.json()
    const result = json?.chart?.result?.[0]

    if (!result) {
      return res.status(404).json({ error: `Tidak ada data untuk: ${symbol}` })
    }

    const closes = result.indicators.quote[0].close
    const timestamps = result.timestamp

    // Filter null values dan slice sesuai period
    const valid = closes
      .map((c, i) => ({ close: c, ts: timestamps[i] }))
      .filter(d => d.close != null)
      .slice(-days)

    const prices = valid.map(d => d.close)
    const lastTs = valid[valid.length - 1]?.ts
    const lastDate = lastTs ? new Date(lastTs * 1000).toISOString().split('T')[0] : null

    const hv = calcHV(prices)
    const cortisolScore = hvToCortisolScore(hv)

    // Gunakan meta regularMarketPrice dan chartPreviousClose dari Yahoo
    const meta = result.meta
    const latestPrice = meta.regularMarketPrice ?? prices[prices.length - 1]
    const prevPrice = meta.chartPreviousClose ?? prices[prices.length - 2]
    const changePercent = prevPrice
    ? ((latestPrice - prevPrice) / prevPrice) * 100
    : 0

    return res.status(200).json({
      symbol,
      period: days,
      cortisolScore,
      hv: parseFloat(hv.toFixed(2)),
      currentPrice: latestPrice,
      changePercent: parseFloat(changePercent.toFixed(2)),
      dataPoints: prices.length,
      lastUpdated: lastDate,
    })
  } catch (err) {
    console.error('Yahoo Finance error:', err)
    return res.status(500).json({ error: 'Gagal mengambil data', detail: err.message })
  }
}