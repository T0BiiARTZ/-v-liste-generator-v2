/**
 * EA FC 26 Tick-Ladder (Beispiel, kann angepasst werden).
 * Format: [bisPreisInklusive, Tickgröße]
 */
const TICKS: Array<[number, number]> = [
  [1000, 50],
  [10000, 100],
  [50000, 250],
  [100000, 500],
  [1000000, 1000],
  [10000000, 2500]
]

export function roundToTick(price: number, direction: 'up'|'down'='up') {
  let step = TICKS[TICKS.length - 1][1]
  for (const [limit, tick] of TICKS) {
    if (price <= limit) { step = tick; break }
  }
  const q = price / step
  const r = direction === 'up' ? Math.ceil(q) : Math.floor(q)
  return r * step
}

/** Rechnet VK so, dass (VK - Buy - tax) nahe targetProfit ist, VK auf gültigen Tick. */
export function suggestListPrice(buy: number, tax: number, targetProfit: number) {
  const raw = buy + tax + targetProfit
  return roundToTick(raw, 'up')
}
