# Whimavera — interactive prototype

*Beautifully imagined. Effortlessly planned.*

A mobile-first React prototype of Whimavera's free children's birthday planner, running on mock data.

## Run it

Requires Node 18+.

```bash
npm install
npm run photos       # one-time: download the stock photos into the project
npm run dev          # open http://localhost:5173
```

Other scripts:

- `npm run build` → production build in `dist/` (`npm run preview` to serve it)
- `npm run build:single` → one self-contained `dist-single/index.html` for sharing

## Screens (hash routes)

| Route | Screen |
|---|---|
| `#home` | Homepage: hero, theme previews, example plan, premium teaser |
| `#plan` | 8-step questionnaire |
| `#results` | Personalized plan: inspiration board, palette, decor, budget, games, food, timeline, checklist |
| `#shop` | Shop the list, DIY projects and budget swaps |
| `#premium` | $29 printable bundle tailored to the planned theme (only offered once a plan exists; checkout is a placeholder) |

Answers persist in `localStorage`. "See an example plan" loads the Fairy Garden example (age 6, 12 guests, $300).

## Activity guides

Every activity card on the plan opens a step-by-step guide. On desktop the guide is a large window; on a phone it's a full-screen sheet. It covers materials (with quantities for the party's guest count), preparation, setup, how to run it with lines to say aloud, safety notes, tips and variations, and cleanup.

- **Content:** `src/data/birthday/guides/<theme>.js`, keyed by activity id. All nine Fairy Garden guides are written; activities without a guide open a short version.
- **Schema and validation:** `src/lib/guides.js` exports `activityGuideSchema` (a JSON Schema, usable as structured output if guides are AI-generated later), `normalizeGuide()`, which fills defaults so missing data never breaks the UI, and `personalizeGuide()`, which adapts quantities, age notes and indoor/outdoor setup.
- **When guides are built:** guides are attached to activities in `buildPlan()`, once per plan. Opening a card never regenerates anything.
- **Images:** drop `<activity-id>.webp` (or `.jpg`/`.png`) into `src/assets/activities/`. See the README there. Missing images show an illustrated placeholder.
- **Shopping:** a material can carry `products: [{ title, url, retailer, verified: true }]`. "Shop the supplies" only appears when verified products exist; none are included now.
- **Navigation:** opening a guide sets `#guide-<activity-id>`, so Back closes it and the link can be shared. Escape, the close button and clicking outside the guide also close it. Focus is trapped inside the guide and returned to the card afterwards, and the plan keeps its scroll position.

## Menu & recipes

The plan's "Food & refreshments" section is a grid of photo cards. Each card opens a recipe in the same guide frame as the activity guides (`#recipe-<id>`, so Back closes it). A recipe covers ingredients scaled to the party, servings, prep and total time, method, make-ahead and storage, presentation, allergens and swaps, and food-safety notes for young children.

- **Content:** `src/data/birthday/recipes/<theme>.js`, keyed by menu item id. All seven Fairy Garden recipes are written. The cake also has an "Order from a bakery" brief, with no listings or prices.
- **Scaling (`src/lib/recipes.js`, `src/lib/units.js`):** recipes scale to the plan's children plus an "Adults eating too" count, which starts at 0 so adults are never assumed. Recipes scale in sensible steps (cupcakes by the dozen, for example), counted items round up and measures round up to the nearest ¼. The tiered cake doesn't scale; it warns you if it's too small for the guest count.
- **Shopping list:** "Add ingredients to shopping list" stores only recipe ids, so adding twice does nothing. Shop & DIY → **Food shopping list** (`#shopping`) adds up shared ingredients across recipes using consistent units (volume in tsp, weight in oz, counted items by unit), groups them by aisle and shows which recipes use each one.
- **Images:** drop `<item-id>.webp` into `src/assets/menu/` (see the README there). Missing images show an illustrated placeholder.
- `recipeSchema` is a JSON Schema for future AI-generated recipes; `normalizeRecipe()` checks and fills defaults.

## Architecture

```
src/
  data/
    eventTypes.js        # registry: birthday (live), wedding, holiday, homeschool (coming soon)
    birthday/
      questions.js       # questionnaire definition (rendered generically)
      themes.js          # 6 themes, palettes, motifs, photo keys
      plans/             # one complete plan per theme + shared.js (budget, checklist)
    photoList.js         # Unsplash photo ids and credits
    photos.js            # resolves bundled vs. hot-linked photos
    premium.js           # printable bundle per theme
  lib/
    buildPlan.js         # answers → personalized plan: scales quantities and budget,
                         # ranks activities by play style, builds the timeline
    router.js            # tiny hash router
  components/            # Scene (photo + illustrated fallback), Layout, ui primitives,
                         # ZoneExplorer, ActivityCard, ActivityGuide, GuideShell
                         # (shared dialog frame), FoodCard, RecipeGuide, Stepper
  screens/               # Home, Questionnaire, Results, ShopDiy, Premium
  styles/global.css      # design tokens + all styles
```

To add a new celebration type such as weddings, register it in `eventTypes.js` with its own `questions`, `themes` and `plans`. The screens read from the registry.

`buildPlan()` is the seam where an AI- or server-backed plan generator can plug in later.

## Notes on content

- **Costs** are illustrative planning estimates for generic items, not real product or retailer prices.
- **Product links** are placeholders (`#`).
- **Photography** comes from free Unsplash photos, listed in `src/data/photos.js`. `npm run photos` downloads them into `src/assets/photos/` so they're bundled into every build, including the single-file preview. If a photo isn't downloaded it's hot-linked instead, and if it can't load at all the matching illustrated scene shows. Themes without photos use their illustrations.
- No payments, accounts, AI calls or retailer integrations.
