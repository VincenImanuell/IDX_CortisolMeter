import { PERIOD_OPTIONS } from '../data/periods'
import styles from './PeriodSelector.module.css'

const PeriodSelector = ({ selected, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Periode Perhitungan</label>
      <div className={styles.options}>
        {PERIOD_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`${styles.option} ${selected === opt.value ? styles.active : ''}`}
            onClick={() => onChange(opt.value)}
            style={selected === opt.value ? { borderColor: opt.tagColor, boxShadow: `0 0 0 2px ${opt.tagColor}33` } : {}}
          >
            <span className={styles.tag} style={{ color: opt.tagColor, borderColor: opt.tagColor }}>
              {opt.tag}
            </span>
            <span className={styles.optLabel}>{opt.label}</span>
            <span className={styles.optDesc}>{opt.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PeriodSelector