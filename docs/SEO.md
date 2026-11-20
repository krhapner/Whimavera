# SEO at Whimavera

## How it works

The planner is a React app at `/` (screens are `#plan`, `#results`, …).
Public pages are **prerendered to static HTML at build time** from the same
React components and theme data, so Google gets full content and metadata
in the first response:

| URL | What it is |
|---|---|
| `/` | Home — prerendered content; the planner takes over on load |
| `/themes/` | All party themes |
| `/themes/<slug>/` | One guide per theme (palette, decor, activities, DIY, food, costs, shopping, tips) |
| `/guides/how-to-plan-a-kids-birthday-party/` | Planning guide: budget, games by age, timeline, checklist |
| `/404.html` | Branded not-found page (Netlify returns status 404) |

`npm run build` = app build → SSR build of `src/entry-server.jsx` →
`scripts/prerender.mjs`, which writes the pages, `sitemap.xml` and
`robots.txt` into `dist/`.

**A new theme gets its page automatically**: add it to the theme list and
plans; its page, sitemap entry, metadata and structured data appear on the
next build. For a better page, add hand-written copy in `src/seo/content.js`
and a 1200×630 share image at `public/og/<slug>.jpg`.

Each page has: unique title and description, canonical URL, Open Graph /
Pinterest / Twitter tags with a share image, JSON-LD (Organization +
WebSite on home; BreadcrumbList + Article on theme and guide pages), image
`width`/`height`, lazy loading below the fold and a high-priority hero.
Affiliate links use `rel="sponsored nofollow"` and every shopping block
carries the Amazon Associates disclosure. No Product or review markup.

## Manual setup (not done yet)

1. **Domain:** in Netlify → Domain management, make `www.whimavera.com` the
   primary domain so `whimavera.com` redirects to it. Canonical URLs use
   `https://www.whimavera.com`. To use the bare domain instead, set
   `VITE_SITE_URL=https://whimavera.com` in Netlify environment variables.
2. **Google Search Console:** add a *Domain* property for `whimavera.com`
   and verify with the DNS TXT record Google gives you (best), or add a
   *URL-prefix* property and set `VITE_GSC_VERIFICATION=<token>` in Netlify
   so every page gets the verification meta tag. Then submit
   `https://www.whimavera.com/sitemap.xml` under Sitemaps and use URL
   Inspection → Request indexing on `/themes/` and each theme page.
3. **Rich results:** check a theme page in Google's Rich Results Test and
   the Schema Markup Validator after the first deploy.
4. **Analytics (recommended):** a privacy-friendly tool (Plausible,
   Fathom) or GA4. Worth tracking: organic landings by page, theme-page →
   "Plan this party" clicks, planner starts (`#plan`), completed plans
   (`#results`), "Shop" button and Amazon link clicks, printable purchases.
   Pair with the Amazon Associates reports for revenue per theme.

## Biggest content opportunities

- More themes: each is a new landing page (princess, construction, unicorn,
  safari and space/rocket are high-volume searches).
- Age guides: "birthday party games for 5 year olds", "first birthday
  ideas" — built from the existing activity age data.
- Indoor / small-space party guide (activities already flag "Works indoors").
- Pinterest: 2:3 pin images per theme and a "Save" pin per activity photo.
