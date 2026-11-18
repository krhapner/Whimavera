// Plan library — one complete, curated plan per theme.
// lib/buildPlan.js personalizes these (quantities, budget, activity ranking, timeline).
import fairyGarden from './fairyGarden.js'
import underTheSea from './underTheSea.js'
import starryNight from './starryNight.js'
import woodlandTea from './woodlandTea.js'
import dinoDig from './dinoDig.js'
import rainbowPicnic from './rainbowPicnic.js'

export const birthdayPlans = Object.fromEntries(
  [fairyGarden, underTheSea, starryNight, woodlandTea, dinoDig, rainbowPicnic].map((p) => [p.themeId, p]),
)

export const fallbackPlanId = 'fairy-garden'
