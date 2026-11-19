// Shared helpers for theme catalog metadata.

/** A decor version whose cost estimate is the sum of its supplies. */
export function look(v) {
  const sum = (v.supplies || []).reduce((r, s) => [r[0] + s.est[0] * s.qty, r[1] + s.est[1] * s.qty], [0, 0]).map(Math.round)
  return { ...v, cost: { fixed: sum } }
}

/** A setup zone with budget / classic / premium looks. */
export const zone = (z) => ({ ...z, variants: z.variants.map(look) })

/** Diet shorthand: all 'yes' unless overridden. */
export const diet = (o = {}) => ({ 'nut-free': 'yes', 'gluten-free': 'yes', 'dairy-free': 'yes', 'egg-free': 'yes', vegetarian: 'yes', ...o })
