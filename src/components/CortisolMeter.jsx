import { useState } from 'react'
import Header from './Header'
import CortisolGauge from './CortisolGauge'
import StockSelector from './StockSelector'
import PeriodSelector from './PeriodSelector'
import ResultExplanation from './ResultExplanation'
import { useStockData } from '../hooks/useStockData'
import { DEFAULT_PERIOD } from '../data/periods'
import styles from './CortisolMeter.module.css'

const CortisolMeter = () => {
  const [selectedStock, setSelectedStock] = useState(null)
  const [period, setPeriod] = useState(DEFAULT_PERIOD)
  const { data, loading, error, fetchStock } = useStockData()

  const handleHitung = () => {
    if (!selectedStock) return
    fetchStock(selectedStock.symbol, period)
  }

  const canHitung = selectedStock && !loading

  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <CortisolGauge score={data?.cortisolScore ?? 0} loading={loading} />

          {data && !loading && (
            <div className={styles.resultCard}>
              <div className={styles.resultRow}>
                <span className={styles.resultKey}>Harga Terakhir</span>
                <span className={styles.resultVal}>Rp {data.currentPrice?.toLocaleString('id-ID')}</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultKey}>Perubahan</span>
                <span className={styles.resultVal} style={{ color: data.changePercent >= 0 ? 'var(--color-green)' : 'var(--color-red)' }}>
                  {data.changePercent >= 0 ? '+' : ''}{data.changePercent?.toFixed(2)}%
                </span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultKey}>Volatilitas (HV)</span>
                <span className={styles.resultVal}>{data.hv?.toFixed(2)}%</span>
              </div>
              <div className={styles.resultRow}>
                <span className={styles.resultKey}>Data Points</span>
                <span className={styles.resultVal}>{data.dataPoints} hari</span>
              </div>
            </div>
          )}

          {error && (
            <div className={styles.errorCard}>
              <span>😵</span>
              <p>{error}</p>
            </div>
          )}

          {data && !loading && (
            <>
              <div className={styles.resultCard}>
                ...
              <ResultExplanation data={data} />
              </div>
            </>
          )}

          <div className={styles.card}>
            <StockSelector selectedStock={selectedStock} onSelect={setSelectedStock} />
          </div>

          <div className={styles.card}>
            <PeriodSelector selected={period} onChange={setPeriod} />
          </div>

          <button
            className={styles.hitungBtn}
            onClick={handleHitung}
            disabled={!canHitung}
          >
            {loading ? (
              <span className={styles.btnLoading}>
                <span />Mengambil data...
              </span>
            ) : (
              '😌 Hitung Cortisol'
            )}
          </button>
        </main>

        <footer className={styles.footer}>
          <span className={styles.mono}>built with low cortisol energy 😌</span>
          <div className={styles.author}>
            <span className={styles.authorName}>Dibuat oleh Vincen Imanuel</span>
            <div className={styles.links}>
              <a href="https://github.com/VincenImanuell" target="_blank" rel="noopener noreferrer">GitHub</a>
              <br />
              <a href="https://linkedin.com/in/vincenimanuel" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <br />
              <a href="https://instagram.com/vincenimanuellim" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default CortisolMeter