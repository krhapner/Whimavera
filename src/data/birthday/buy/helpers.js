/**
 * Buy lists: everything a parent might buy for an activity, a dish or a DIY
 * project, each with its own Amazon search and a typical cost per unit.
 *
 *   b(name, search, qty, unit, est, flags)
 *
 *   qty   each(n, spare)  n per child, plus spares
 *         per(n)          one per n children — packs, boxes, bags
 *         one(n)          a fixed number, whatever the party size
 *   est   [low, high] typical cost per unit in USD. A generic planning
 *         estimate for the kind of item, never a retailer price.
 *   flags opt   nice to have — listed separately, not in the cost
 *         home  most families already own it — linked, not in the cost
 *         keep  reusable: one is enough however many activities use it
 *         cat   'tableware' | 'decor' | 'favors' | 'food' to override
 *         note, save  extra line and a cheaper swap
 *         units irregular plural ("boxes" is automatic)
 *
 * An activity's or dish's cost estimate is the sum of its required,
 * not-at-home lines, so the price on a card always matches its list.
 */
export const b = (name, search, qty, unit, est, flags = {}) => ({ name, search, qty, unit, est, ...flags })
export const each = (n = 1, spare = 0) => ({ perChild: n, spare })
export const per = (n) => ({ per: n })
export const one = (n = 1) => ({ fixed: n })

export const opt = { opt: true }
export const home = { home: true, keep: true }
export const keep = { keep: true }
