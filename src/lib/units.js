// Kitchen units: one canonical base per dimension so quantities can be
// scaled, rounded and consolidated consistently.
//   volume → teaspoons, weight → ounces, count → the item's own unit.

// A stick of butter is ½ cup (8 tbsp), so butter can be written in sticks or
// tablespoons and still add up.
const VOLUME = { tsp: 1, tbsp: 3, stick: 24, cup: 48 }
const WEIGHT = { oz: 1, lb: 16 }

export function dimensionOf(unit) {
  if (unit in VOLUME) return 'volume'
  if (unit in WEIGHT) return 'weight'
  return 'count'
}

/** Convert to the dimension's base unit. */
export function toBase(qty, unit) {
  if (unit in VOLUME) return qty * VOLUME[unit]
  if (unit in WEIGHT) return qty * WEIGHT[unit]
  return qty
}

const FRACTIONS = { 0.25: '¼', 0.5: '½', 0.75: '¾', 0.33: '⅓', 0.67: '⅔' }

/** Round up to the nearest quarter and print as a mixed number. */
export function fraction(n) {
  const q = Math.ceil(n * 4 - 1e-9) / 4
  const whole = Math.floor(q)
  const rest = +(q - whole).toFixed(2)
  if (!rest) return String(whole)
  return whole ? `${whole} ${FRACTIONS[rest]}` : FRACTIONS[rest]
}

const plural = (unit, n) => {
  if (n <= 1) return unit
  if (unit.endsWith('y') && !/[aeiou]y$/.test(unit)) return `${unit.slice(0, -1)}ies`
  if (/(ch|sh|s|x)$/.test(unit)) return `${unit}es`
  return `${unit}s`
}

/**
 * Format a base quantity in the most readable unit.
 * Volume: cups from ¼ cup, then tbsp, then tsp. Weight: lb from 1 lb.
 * Counts are always whole and rounded up.
 */
export function formatQty(base, dimension, countUnit = '') {
  if (dimension === 'volume') {
    if (base >= VOLUME.cup / 4) {
      const v = base / VOLUME.cup
      return `${fraction(v)} ${plural('cup', Math.ceil(v * 4) / 4)}`
    }
    if (base >= VOLUME.tbsp) {
      const v = base / VOLUME.tbsp
      return `${fraction(v)} tbsp`
    }
    return `${fraction(base)} tsp`
  }
  if (dimension === 'weight') {
    if (base >= WEIGHT.lb) {
      const v = base / WEIGHT.lb
      return `${fraction(v)} lb`
    }
    return `${fraction(base)} oz`
  }
  const n = Math.ceil(base - 1e-9)
  return countUnit ? `${n} ${plural(countUnit, n)}` : String(n)
}

/** Format a scaled amount in the recipe's own unit (counts round up). */
export function formatIn(value, unit) {
  const dim = dimensionOf(unit)
  if (dim === 'count') return formatQty(value, 'count', unit)
  const shown = Math.ceil(value * 4 - 1e-9) / 4
  const label = unit === 'cup' || unit === 'stick' ? plural(unit, shown) : unit
  return `${fraction(value)} ${label}`
}
