import styles from './ResultExplanation.module.css'

const ResultExplanation = ({ data }) => {
  if (!data) return null

  const dailyMove = (data.hv / Math.sqrt(252)).toFixed(2)

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>📊 Dari mana angka ini?</h3>

      <div className={styles.step}>
        <div className={styles.stepNum}>1</div>
        <div className={styles.stepContent}>
          <div className={styles.stepTitle}>Ambil data harga {data.period} hari terakhir</div>
          <div className={styles.stepDesc}>
            Kami mengambil <span className={styles.highlight}>{data.dataPoints} data harga penutupan</span> dari Yahoo Finance untuk saham <span className={styles.highlight}>{data.symbol}</span>.
          </div>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNum}>2</div>
        <div className={styles.stepContent}>
          <div className={styles.stepTitle}>Hitung Daily Return</div>
          <div className={styles.stepDesc}>
            Setiap hari dihitung perubahan harga:
          </div>
          <div className={styles.formula}>
            Return = ln(Harga Hari Ini / Harga Kemarin)
          </div>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNum}>3</div>
        <div className={styles.stepContent}>
          <div className={styles.stepTitle}>Hitung Historical Volatility (HV)</div>
          <div className={styles.stepDesc}>
            Standar deviasi dari semua daily return, lalu disetahunkan:
          </div>
          <div className={styles.formula}>
            HV = StdDev(returns) × √252 = <span className={styles.highlight}>{data.hv}%</span>
          </div>
          <div className={styles.stepDesc} style={{ marginTop: '0.4rem' }}>
            Artinya saham ini bergerak rata-rata <span className={styles.highlight}>±{dailyMove}% per hari</span>.
          </div>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepNum}>4</div>
        <div className={styles.stepContent}>
          <div className={styles.stepTitle}>Konversi ke Cortisol Score</div>
          <div className={styles.stepDesc}>
            HV dipetakan ke skala 0–100 berdasarkan range volatilitas saham IDX (5%–75%):
          </div>
          <div className={styles.formula}>
            Score = (HV - 5) / (75 - 5) × 100 = <span className={styles.highlight}>{data.cortisolScore}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultExplanation