import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.badge}>IDX Volatility Tracker</div>
      <h1 className={styles.title}>
        Cortisol Meter
      </h1>
      <p className={styles.subtitle}>
        Seberapa volatile saham pilihanmu?<br />
        <span className={styles.mono}>Ngitung dulu, panik belakangan.</span>
      </p>
    </header>
  )
}

export default Header
