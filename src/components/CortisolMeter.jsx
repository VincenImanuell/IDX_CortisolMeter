import { useState } from 'react'
import Header from './Header'
import CortisolGauge from './CortisolGauge'
import StockSelector from './StockSelector'
import styles from './CortisolMeter.module.css'

const CortisolMeter = () => {
  const [selectedStock, setSelectedStock] = useState(null)

  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <CortisolGauge score={0} />

          <div className={styles.card}>
            <StockSelector
              selectedStock={selectedStock}
              onSelect={setSelectedStock}
            />
          </div>

        </main>

        <footer className={styles.footer}>
          <span className={styles.mono}>built with low cortisol energy 😌</span>
        </footer>
      </div>
    </div>
  )
}

export default CortisolMeter