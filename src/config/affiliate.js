/**
 * Affiliate configuration — the only place the Amazon Associates tag lives.
 *
 * Set it at build time (Netlify → Site settings → Environment variables):
 *   VITE_AMAZON_ASSOCIATE_TAG=yourtag-20
 *
 * The environment variable overrides the default below.
 */
export const AMAZON = {
  tag: (import.meta.env?.VITE_AMAZON_ASSOCIATE_TAG || 'whimavera-20').trim(),
  host: 'https://www.amazon.com',
  disclosure: 'As an Amazon Associate I earn from qualifying purchases.',
}

export const affiliateConfigured = () => !!AMAZON.tag
