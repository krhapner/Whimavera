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

## Amazon shopping (affiliate)

Shopping is woven through the plan — activity and food cards (“Shop supplies” / “Shop ingredients”), activity guides (“Materials & shopping”), decor zones (“Shop this look”), DIY projects, recipe ingredients, and the consolidated **Shop your party** list.

**How it fits together**

| Piece | File |
|---|---|
| Tracking tag (one place) | `src/config/affiliate.js` — `VITE_AMAZON_ASSOCIATE_TAG`, default `whimavera-20` |
| URL generator | `src/lib/amazon.js` — `amazonSearchUrl`, `amazonProductUrl`, `withAffiliateTag`, `amazonLinkFor` |
| Reusable supply catalog | `src/data/supplies/catalog.js` — `SUPPLIES`, `KITS`, `KITS_FOR`, `THEME_SUPPLIES` |
| Shopping engine | `src/lib/shopping.js` — resolves materials to supplies, consolidates, builds lists |
| UI pieces | `src/components/Shopping.jsx` — `AmazonButton`, `SupplyRow`, `SupplySheet`, `KitList`, disclosure |

- Materials are matched to supplies by exact name through `aliases`, so the same supply is recognised across activities and themes and its quantities are combined. Reusable items (a speaker, wire cutters) count once.
- Anything not in the catalog still gets a relevant Amazon search built from its name, so missing mappings never break shopping.
- **To add a curated product:** add `asin: 'B0XXXXXXXX'` (or a full `url`) to the supply in `catalog.js`. Every card, guide and list switches to that product. Pasted URLs keep their parameters; any existing `tag` is replaced with ours.
- Kits are always presented as “Browse … kits” searches, never as a specific product.
- Owned items (`whimavera.owned.v1`) and items marked “Not needed” (`whimavera.skipped.v1`) persist in the browser. Opening a shopping panel or clicking a link never changes the plan; Amazon opens in a new tab only on a click. Nothing is added to an Amazon cart.
- No Amazon prices, ratings, images or availability are shown. “Typical cost” ranges are generic planning estimates.

**Tests:** `npm test` runs `test:links` (every generated link carries exactly one `whimavera-20` tag, params preserved, non-Amazon URLs refused) and `test:ui` (jsdom interaction checks: shopping from unselected cards, guides, add/remove, shared materials, guests, budget, owned/skip, print, persistence).

## Made to Match printables

A personalized stationery studio on the results page (section 08) and the Printables page: invitation 5×7, welcome sign 8×10, folded food tent cards, favor tags 2×3, treasure-hunt clue cards 3×5, activity station signs 5×7, cupcake toppers (2 in circles) and thank-you cards 4×6.

**How it fits together**

| Piece | File |
|---|---|
| Products (sizes, print sheets, tiers, instructions) | `src/printables/products.js` |
| Collection (colors, typography, artwork slots, layouts) | `src/printables/collections/fairyGarden.js` |
| Artwork files | `src/assets/printables/<collection>/<slot>.png` (`<slot>--<color>.png` per color) |
| Party details (only what the parent enters) | `src/printables/details.js` |
| Layout engine → scene | `src/printables/compose.js`, text fitting `text.js`, fonts `fonts.js` |
| Renderers | SVG preview `components/printables/SceneSVG.jsx`, PDF `printables/pdf.js`, PNG `studio.js` |
| Studio UI | `components/printables/MadeToMatch.jsx` |
| Who can download what | `src/printables/entitlements.js` |

- Artwork and text are separate layers. Text is real, embedded-font text, fitted to its box: long names shrink and wrap; anything that still can't fit is flagged in the editor instead of printing over the art. Artwork is never stretched; full-bleed borders fill the card keeping their proportions.
- One layout definition drives the preview, PDF and PNG, so what you see is what prints.
- Personalization comes from the plan: station signs for selected activities, tent cards for the chosen menu, picture clues for ages 6 and under (rhymes for older), toppers and tags for the guest count. Everything else stays browsable. Details, edits, color and chosen products persist per theme in `whimavera.printables.v1`, apart from quiz answers.
- PDFs: US Letter with crop marks for home printing (small items tiled on sheets, tents with fold marks, toppers with cut circles), or a print-shop file at trim size with ⅛ in bleed. Every PDF ends with cutting and assembly instructions. The invitation also exports a 300 dpi PNG for sharing — the same template can later power digital invitations.
- **Adding artwork:** drop files named after the slots into `src/assets/printables/fairy-garden/` (sizes listed in `ART` in the collection). `npm run printables:art -- <folder>` re-cuts the delivered art sheets. Supply 300 dpi files for the crispest print — the current art is about 150–210 dpi.
- **Adding a theme:** copy `collections/fairyGarden.js`, change colors, slots and layouts, add its artwork folder and register it in `collections/index.js`. Themes without a collection show a "being designed" note — no placeholder designs.
- **Payments aren't built.** Favor tags and cupcake toppers download free; other designs download as watermarked proofs. Set `VITE_PRINTABLES_UNLOCKED=true` (Netlify environment variable) to download everything in full while testing. `entitlements.js` is where a checkout will plug in.
- `npm run printables:proof` renders every design to a proof PDF. Tests: `npm run test:printables` (sizes, long names, missing details, ages, edits, PDFs) and `npm run test:ui`.
