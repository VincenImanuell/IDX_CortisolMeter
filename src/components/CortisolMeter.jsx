import { useState } from 'react'
import Header from './Header'
import CortisolGauge from './CortisolGauge'
import styles from './CortisolMeter.module.css'

const CortisolMeter = () => {
  // Placeholder score for Phase 2 demo — will be wired to real data in Phase 4+
  const [demoScore, setDemoScore] = useState(0)

  return (
    <div className={styles.page}>
      {/* Background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <CortisolGauge score={demoScore} />

          {/* Temp demo slider — will be replaced by stock selector */}
          <div className={styles.demoControl}>
            <p className={styles.demoLabel}>
              🎛️ Demo — geser untuk test animasi gauge
            </p>
            <input
              type="range" min={0} max={100} value={demoScore}
              onChange={e => setDemoScore(Number(e.target.value))}
              className={styles.slider}
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
