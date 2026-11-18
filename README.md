# Whimavera — interactive prototype

*Beautifully imagined. Effortlessly planned.*

A mobile-first React prototype of Whimavera's free children's birthday planner, running on mock data.

## Run it

Requires Node 18+.

```bash
npm install
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
| `#premium` | $29 Deluxe Printable Bundle (live name preview; checkout is a placeholder) |

Answers persist in `localStorage`. "See an example plan" loads the Fairy Garden example (age 6, 12 guests, $300).

## Architecture

```
src/
  data/
    eventTypes.js        # registry: birthday (live), wedding, holiday, homeschool (coming soon)
    birthday/
      questions.js       # questionnaire definition (rendered generically)
      themes.js          # 6 themes, palettes, motifs, photo keys
      plans.js           # plan templates (Fairy Garden is complete)
    photos.js            # Unsplash photo ids
    premium.js           # bundle definition
  lib/
    buildPlan.js         # pure function: answers → personalized plan (scales qty & budget)
    router.js            # tiny hash router
  components/            # Scene (photo + illustrated fallback), Layout, ui primitives
  screens/               # Home, Questionnaire, Results, ShopDiy, Premium
  styles/global.css      # design tokens + all styles
```

To add a new celebration type such as weddings, register it in `eventTypes.js` with its own `questions`, `themes` and `plans`. The screens read from the registry.

`buildPlan()` is the seam where an AI- or server-backed plan generator can plug in later.

## Notes on content

- **Costs** are illustrative planning estimates for generic items, not real product or retailer prices.
- **Product links** are placeholders (`#`).
- **Photography** comes from free Unsplash photos, hot-linked by id. If a photo can't load, the matching illustrated scene shows instead. Themes without photos use their illustrations. Before launch, download the chosen photos into `/public/photos` and point `photoUrl()` at them.
- No payments, accounts, AI calls or retailer integrations.
