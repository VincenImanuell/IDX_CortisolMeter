import yahooFinance from 'yahoo-finance2'

// Calculate Historical Volatility
const calcHV = (prices) => {
  if (prices.length < 2) return 0

  // Daily log returns
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

  // Annualized HV (×√252 trading days)
  return stdDev * Math.sqrt(252) * 100
}

// Map HV% to cortisol score 0–100
// IDX typical HV range: ~10% (very calm) to ~80%+ (extreme)
const hvToCortisolScore = (hv) => {
  const min = 5
  const max = 75
  const clamped = Math.min(Math.max(hv, min), max)
  return Math.round(((clamped - min) / (max - min)) * 100)
}

export default async function handler(req, res) {
  // CORS headers
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
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days - 10)

    const result = await yahooFinance.historical(symbol, {
      period1: startDate,
      period2: endDate,
      interval: '1d',
    })

    if (!result || result.length === 0) {
      return res.status(404).json({ error: `No data found for symbol: ${symbol}` })
    }

    const prices = result
      .filter(d => d.close != null)
      .map(d => d.close)
      .slice(-days)

    const hv = calcHV(prices)
    const cortisolScore = hvToCortisolScore(hv)

    const latest = result[result.length - 1]
    const previous = result[result.length - 2]
    const changePercent = previous
      ? ((latest.close - previous.close) / previous.close) * 100
      : 0

    return res.status(200).json({
      symbol,
      period: days,
      cortisolScore,
      hv: parseFloat(hv.toFixed(2)),
      currentPrice: latest.close,
      changePercent: parseFloat(changePercent.toFixed(2)),
      dataPoints: prices.length,
      lastUpdated: latest.date,
    })
  } catch (err) {
    console.error('Yahoo Finance error:', err)
    return res.status(500).json({ error: 'Failed to fetch stock data', detail: err.message })
  }
}