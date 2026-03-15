import { useEffect, useRef, useState } from 'react'
import styles from './CortisolGauge.module.css'

const LEVELS = [
  { max: 20,  label: "Santai Banget",  emoji: "😌", color: "#00f5a0", desc: "Low cortisol. Porto aman, hati tenang." },
  { max: 40,  label: "Masih Oke",      emoji: "🙂", color: "#38bdf8", desc: "Volatilitas normal. Tetap pantau ya." },
  { max: 60,  label: "Mulai Waspada",  emoji: "😬", color: "#ffe94e", desc: "Lumayan volatile. Jangan sering cek porto." },
  { max: 80,  label: "Deg-degan",      emoji: "😰", color: "#ff8c42", desc: "Volatile tinggi. Cortisol mulai naik nih." },
  { max: 100, label: "PANIK TOTAL",    emoji: "💀", color: "#ff3e6c", desc: "Ultra volatile. Siapkan mental & antasida." },
]

const getLevel = (score) => LEVELS.find(l => score <= l.max) || LEVELS[LEVELS.length - 1]

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const arcPath = (cx, cy, r, startAngle, endAngle) => {
  const s = polarToCartesian(cx, cy, r, startAngle)
  const e = polarToCartesian(cx, cy, r, endAngle)
  const large = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

// Speedometer: starts from bottom-left (210deg) sweeps to bottom-right (330deg... but going clockwise)
// In SVG, 0deg = right (3 o'clock), going clockwise
// We want: start = 210deg (bottom-left), end = 330deg sweep right, total = 120deg? 
// Actually: start 160deg to 380deg = 220deg sweep (wide speedometer feel)
const CX = 180, CY = 160, R = 130
const START_ANGLE = 160   // bottom-left
const END_ANGLE = 380     // bottom-right (160 + 220)
const TOTAL_ARC = END_ANGLE - START_ANGLE // 220 degrees

const SEGMENTS = [
  { from: 0,  to: 20,  color: "#00f5a0" },
  { from: 20, to: 40,  color: "#38bdf8" },
  { from: 40, to: 60,  color: "#ffe94e" },
  { from: 60, to: 80,  color: "#ff8c42" },
  { from: 80, to: 100, color: "#ff3e6c" },
]

const CortisolGauge = ({ score = 0, loading = false }) => {
  const [displayScore, setDisplayScore] = useState(0)
  const animRef = useRef(null)
  const prevScore = useRef(0)

  useEffect(() => {
    const start = prevScore.current
    const end = score
    const duration = 1400
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(start + (end - start) * eased)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        prevScore.current = end
      }
    }

    cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [score])

  const needleAngle = START_ANGLE + (displayScore / 100) * TOTAL_ARC
  const needleTip = polarToCartesian(CX, CY, R - 20, needleAngle)
  const needleLeft = polarToCartesian(CX, CY, 12, needleAngle + 90)
  const needleRight = polarToCartesian(CX, CY, 12, needleAngle - 90)
  const level = getLevel(displayScore)

  return (
    <div className={styles.wrapper}>
      <div className={styles.gaugeWrap}>
        <svg viewBox="0 0 360 220" className={styles.svg}>
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <path
            d={arcPath(CX, CY, R, START_ANGLE, END_ANGLE)}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Colored segments */}
          {SEGMENTS.map((seg, i) => {
            const segStart = START_ANGLE + (seg.from / 100) * TOTAL_ARC
            const segEnd   = START_ANGLE + (seg.to   / 100) * TOTAL_ARC
            const filled   = Math.min(Math.max(displayScore - seg.from, 0), seg.to - seg.from) / (seg.to - seg.from)
            if (filled <= 0) return null
            return (
              <path key={i}
                d={arcPath(CX, CY, R, segStart, segStart + (segEnd - segStart) * filled)}
                fill="none"
                stroke={seg.color}
                strokeWidth="18"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${seg.color}99)` }}
              />
            )
          })}

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = START_ANGLE + (tick / 100) * TOTAL_ARC
            const outer = polarToCartesian(CX, CY, R + 14, angle)
            const inner = polarToCartesian(CX, CY, R + 5,  angle)
            return (
              <line key={tick}
                x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
                stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round"
              />
            )
          })}

          {/* Tick labels */}
          {[
            { tick: 0,   text: "0" },
            { tick: 100, text: "100" },
          ].map(({ tick, text }) => {
            const angle = START_ANGLE + (tick / 100) * TOTAL_ARC
            const pos = polarToCartesian(CX, CY, R + 28, angle)
            return (
              <text key={tick} x={pos.x} y={pos.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fill="var(--color-text-muted)"
                fontFamily="monospace"
              >{text}</text>
            )
          })}

          {/* Needle */}
          <polygon
            points={`${needleTip.x},${needleTip.y} ${needleLeft.x},${needleLeft.y} ${needleRight.x},${needleRight.y}`}
            fill={level.color}
            filter="url(#glow)"
          />
          {/* Needle center cap */}
          <circle cx={CX} cy={CY} r="12" fill="var(--color-surface-2)" stroke={level.color} strokeWidth="3" />
          <circle cx={CX} cy={CY} r="4"  fill={level.color} />
        </svg>

        {/* Score display */}
        <div className={styles.scoreDisplay}>
          {loading ? (
            <div className={styles.loadingDots}>
              <span /><span /><span />
            </div>
          ) : (
            <>
              <div className={styles.emoji}>{level.emoji}</div>
              <div className={styles.scoreNumber} style={{ color: level.color }}>
                {Math.round(displayScore)}
              </div>
              <div className={styles.scoreLabel} style={{ color: level.color }}>
                {level.label}
              </div>
              <div className={styles.scoreDesc}>{level.desc}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CortisolGauge
