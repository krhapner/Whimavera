/**
 * Site identity for SEO: canonical URLs, sitemap and social cards.
 * Override the origin at build time with VITE_SITE_URL (no trailing slash).
 * Optional: VITE_GSC_VERIFICATION adds the Google Search Console
 * verification meta tag to every page (DNS verification works too).
 */
const env = (k) => (typeof import.meta !== 'undefined' && import.meta.env?.[k]) || (typeof process !== 'undefined' && process.env?.[k]) || ''

export const SITE = {
  name: 'Whimavera',
  url: (env('VITE_SITE_URL') || 'https://www.whimavera.com').replace(/\/+$/, ''),
  tagline: 'Beautifully imagined. Effortlessly planned.',
  locale: 'en_US',
  gscVerification: env('VITE_GSC_VERIFICATION'),
  // First publication of the public pages (Article datePublished).
  published: '2026-11-20',
}

export const absolute = (path) => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
