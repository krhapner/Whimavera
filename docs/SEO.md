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
| `/guides/first-birthday-party-ideas/` and `/guides/birthday-party-ideas-for-<a>-to-<b>-year-olds/` | One guide per age group (1–2, 3–5, 6–8, 9–12): best-fit activities, themes, tips |
| `/guides/birthday-party-games-and-activities/` | Every activity, grouped by type, with ages and indoor flags |
| `/guides/diy-birthday-decorations/` | Every DIY project with materials, steps and cost |
| `/guides/birthday-party-on-a-budget/` | Lean vs full cost per theme, free games, swaps, budget split |
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

## Keyword-to-page map

Search volumes aren't listed: no keyword tool is connected (Semrush, Ahrefs
or Ubersuggest connectors can be added in claude.ai to fill this in).
"Competition" below describes who ranked in a Google search on 2026-11-20.

| Priority | Page | Primary intent | Keywords | Who ranks today |
|---|---|---|---|---|
| 1 | `/` | Use a planning tool | kids birthday party planner; free / online / personalized birthday party planner; birthday party planning website | Template and tool sites (Template.net, ClickUp, Kapwing, Microsoft, Taskade) and big-brand checklists |
| 1 | `/themes/<slug>/` | Ideas for one theme | fairy garden birthday party ideas; dinosaur birthday party ideas (+ games, food, decorations, DIY); under the sea / starry night & space / woodland tea party / rainbow picnic | Shutterfly, Paperless Post, Today's Parent, GigSalad, craft blogs |
| 2 | Age guides | Ideas for a child's age | birthday party ideas / games for 3, 4, 5 … 12 year olds; first birthday party ideas | Care.com, Haribo, Fatherly, smaller parenting blogs |
| 2 | `/guides/birthday-party-games-and-activities/` | Choose games | kids birthday party games; birthday party activities; indoor birthday party games | Care.com, Minted, Splashlearn, Country Living |
| 2 | `/guides/birthday-party-on-a-budget/` | Spend less | birthday party ideas on a budget; affordable / cheap kids birthday party | Parenting and retailer blogs |
| 3 | `/guides/how-to-plan-a-kids-birthday-party/` | Step-by-step + checklist | how to plan a kids birthday party; birthday party planning checklist | Vistaprint, Evite, Minted, Cozi, The Bash, PBS |
| 3 | `/guides/diy-birthday-decorations/` | Make it yourself | DIY birthday decorations; birthday party crafts for kids | Craft blogs, Cricut, Lia Griffith |
| 3 | `/themes/` | Browse themes | unique / creative birthday party themes for kids | Care.com (101 themes), Party City, Today's Parent, HGTV |

Planner and checklist searches are dominated by big, established brands,
so the long tail — age-specific games, theme + activity ("dinosaur fossil
dig activity"), and budget-per-theme — is where Whimavera's specific,
data-backed pages have the best chance first.

## Adding a theme (the framework)

1. Add the theme, its plan, catalog and buy list as usual.
2. On the next build it automatically gets `/themes/<id>-birthday/`, a
   sitemap entry, title, description, canonical, breadcrumbs, Article
   markup, a link from `/themes/`, the footer and the home page, and its
   activities, DIY projects and costs flow into every age, activity, DIY
   and budget guide.
3. To make it better: add hand-written copy to `THEME_SEO` in
   `src/seo/content.js` (slug, short name, title, description, intro, tips)
   and a 1200×630 share image at `public/og/<slug>.jpg`.

## Manual setup (not done yet)

1. **Domain:** the live site is `https://whimavera.com` (www redirects to
   it), and canonical URLs, the sitemap and social tags all use that. If the
   primary domain ever changes, set `VITE_SITE_URL` in Netlify to match.
2. **Google Search Console:** the `whimavera.com` property exists. Submit
   `sitemap.xml` under Sitemaps if not done, then use URL Inspection →
   Request indexing on `/themes/`, the theme pages and the guides.
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
