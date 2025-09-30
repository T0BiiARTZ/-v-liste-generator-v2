/** Convert strings like "29.5K", "1.2M", "350" to number of coins. */
export function parseCoinString(s: any): number {
  if (typeof s === 'number') return Math.round(s)
  if (!s) return 0
  const t = String(s).trim().toUpperCase().replace(/[,\s]/g,'')
  const m = t.match(/^([0-9]*\.?[0-9]+)([KM])?$/)
  if (!m) return Number(t) || 0
  const num = parseFloat(m[1])
  const unit = m[2]
  if (unit === 'K') return Math.round(num * 1000)
  if (unit === 'M') return Math.round(num * 1000000)
  return Math.round(num)
}
