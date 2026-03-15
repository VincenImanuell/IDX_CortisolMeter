import { useState, useRef, useEffect } from 'react'
import { IDX_STOCKS, SECTORS } from '../data/stocks'
import styles from './StockSelector.module.css'

const StockSelector = ({ onSelect, selectedStock }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Semua')
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const sectors = ['Semua', ...SECTORS]

  const filtered = IDX_STOCKS.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.symbol.toLowerCase().includes(search.toLowerCase())
    const matchSector = activeFilter === 'Semua' || s.sector === activeFilter
    return matchSearch && matchSector
  })

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSelect = (stock) => {
    onSelect(stock)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <label className={styles.label}>Pilih Saham IDX</label>

      <button className={styles.trigger} onClick={handleOpen}>
        {selectedStock ? (
          <span className={styles.selected}>
            <span className={styles.selectedSymbol}>{selectedStock.symbol.replace('.JK', '').replace('^', '')}</span>
            <span className={styles.selectedName}>{selectedStock.name}</span>
          </span>
        ) : (
          <span className={styles.placeholder}>Cari saham... (contoh: BBCA, Telkom)</span>
        )}
        <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Cari nama atau kode saham..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <div className={styles.filters}>
            {sectors.map(sector => (
              <button
                key={sector}
                className={`${styles.filterBtn} ${activeFilter === sector ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(sector)}
              >
                {sector}
              </button>
            ))}
          </div>

          <div className={styles.list}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <span>😅</span>
                <p>Saham tidak ditemukan</p>
              </div>
            ) : (
              filtered.map(stock => (
                <button
                  key={stock.symbol}
                  className={`${styles.item} ${selectedStock?.symbol === stock.symbol ? styles.itemActive : ''}`}
                  onClick={() => handleSelect(stock)}
                >
                  <span className={styles.itemSymbol}>
                    {stock.symbol.replace('.JK', '').replace('^', '')}
                  </span>
                  <span className={styles.itemInfo}>
                    <span className={styles.itemName}>{stock.name}</span>
                    <span className={styles.itemSector}>{stock.sector}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default StockSelector