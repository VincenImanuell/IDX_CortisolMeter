import { useState, useCallback } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.PROD
  ? '/api'
  : 'http://localhost:3000/api'

export const useStockData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStock = useCallback(async (symbol, period) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await axios.get(`${API_BASE}/stock`, {
        params: { symbol, period },
        timeout: 15000,
      })
      setData(res.data)
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Gagal mengambil data'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchStock }
}