// Run: npm run test:ui — interaction smoke tests in jsdom
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://whimavera.test/#results', pretendToBeVisual: true })
const { window } = dom
for (const [k, v] of Object.entries({ navigator: window.navigator })) Object.defineProperty(globalThis, k, { value: v, configurable: true, writable: true })
Object.assign(globalThis, { window, document: window.document, location: window.location, history: window.history, localStorage: window.localStorage, HTMLElement: window.HTMLElement, Node: window.Node, CustomEvent: window.CustomEvent, getComputedStyle: window.getComputedStyle, requestAnimationFrame: (f) => setTimeout(f, 0), cancelAnimationFrame: clearTimeout, IS_REACT_ACT_ENVIRONMENT: true })
window.scrollTo = () => {}
window.IntersectionObserver = globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} }
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
window.print = () => { globalThis.printed = true }
localStorage.setItem('whimavera.hasPlan.v1', '1')
localStorage.setItem('whimavera.answers.v1', JSON.stringify({ theme: 'fairy-garden', ageRange: '6-8', guestCount: 12, budget: 150, budgetMode: 'limit', interests: ['crafts', 'hunts'], location: 'backyard', style: 'mix', prepTime: 'week', duration: 120, diet: ['none'] }))

const React = await import('react')
const { act } = React
const { createRoot } = await import('react-dom/client')
const { default: App } = await import('../src/App.jsx')
const assert = (await import('node:assert/strict')).default
let n = 0
const ok = (c, m) => { assert.ok(c, m); n++; }
const $ = (s) => document.querySelector(s)
const $$ = (s) => [...document.querySelectorAll(s)]
const click = async (el) => { assert.ok(el, 'element to click'); await act(async () => { el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })) }) }
const text = () => document.body.textContent
const sel = () => JSON.parse(localStorage.getItem('whimavera.selections.v1') || '{}')['fairy-garden'] || {}
const tagOk = (href) => new URL(href).searchParams.getAll('tag').join() === 'whimavera-20'

const root = createRoot($('#root'))
await act(async () => root.render(React.createElement(App)))
ok(text().includes('Recommended for you'), 'results render with view toggle')

// 1. Shop from an UNSELECTED activity preview
const potionShop = $('[data-shop="activity-fairy-potion-lab"]')
ok(!potionShop, 'unselected activity hidden in Recommended view')
await click($$('.plan-bar .seg button').find((b) => b.textContent.includes('Explore')))
const before = JSON.stringify(sel())
await click($('[data-shop="activity-fairy-potion-lab"]'))
ok($('.guide-overlay, [role="dialog"]'), 'shopping panel opened')
ok(text().includes('Just browsing'), 'panel says browsing (not in plan)')
const links = $$('[role="dialog"] a.amz-btn')
ok(links.length >= 4 && links.every((a) => tagOk(a.href) && a.target === '_blank' && a.rel.includes('sponsored')), 'panel Amazon links tagged, new tab, sponsored')
ok(text().includes('As an Amazon Associate I earn from qualifying purchases.'), 'disclosure shown in panel')
ok(JSON.stringify(sel()) === before, 'opening shop panel did not change selections')
ok(location.hash === '#results', 'shop panel did not navigate')
// Clicking an Amazon link must not select anything
await click(links[0])
ok(JSON.stringify(sel()) === before, 'clicking Amazon link did not select')
// Already have this
const firstCheck = $('[role="dialog"] .supply input[type=checkbox]')
await click(firstCheck)
ok(JSON.parse(localStorage.getItem('whimavera.owned.v1')).length === 1, 'owned persisted')
await click($('[role="dialog"] .guide__close, [role="dialog"] button[aria-label*="Close"]'))
ok(!$('[role="dialog"]'), 'panel closed')

// 2. Shop inside a detail guide
await click($('[data-activity="flower-crown-studio"]'))
ok(text().includes('Materials & shopping'), 'guide has Materials & shopping')
const gl = $$('[role="dialog"] a.amz-btn')
ok(gl.length >= 6 && gl.every((a) => tagOk(a.href)), 'guide Amazon links tagged')
ok(gl.some((a) => decodeURIComponent(a.href).includes('chenille')), 'crown links to pipe cleaners')
ok(text().includes('Prefer a kit?'), 'kit suggestion in guide')
await click($('[role="dialog"] .guide__close, [role="dialog"] button[aria-label*="Close"]'))

// 3. Add/remove activities → list updates, shared materials stay
const goShop = async () => { await act(async () => { window.dispatchEvent(new window.CustomEvent('whimavera:navigate', { detail: 'shop' })) }) }
const { navigate } = await import('../src/lib/router.js')
await act(async () => navigate('shop'))
ok(text().includes('Shop your party'), 'shop page')
const names = () => $$('.party-list .supply__name').map((e) => e.textContent)
ok(names().includes('Fairy birthday invitations with envelopes'), 'curated invitations listed')
const inv = $$('.party-list .supply').find((li) => li.textContent.includes('Fairy birthday invitations'))
ok(inv.querySelector('a.amz-btn').href === 'https://www.amazon.com/dp/B0H41D1GQ5?tag=whimavera-20', 'curated product link exact')
ok(names().includes('Large acrylic gems (1¾ in+)'), 'treasure hunt gems in list')
ok(!names().includes('Clear PET jars with lids, 4–8 oz'), 'wish jars supplies not in list before adding')
const ribbonQty = () => $$('.party-list .supply').find((li) => li.querySelector('.supply__name').textContent.startsWith('Satin ribbon'))?.querySelector('.supply__qty').textContent
const r0 = ribbonQty()
await act(async () => navigate('results'))
await click($$('.plan-bar .seg button').find((b) => b.textContent.includes('Explore')))
const wishCard = $('[data-activity="wish-jars"]').closest('article')
await click(wishCard.querySelector('.plan-toggle'))
await act(async () => navigate('shop'))
ok(names().includes('Clear PET jars with lids, 4–8 oz'), 'adding wish jars adds its supplies')
const r1 = ribbonQty()
ok(r1 !== r0 && r1.includes('+'), `shared ribbon consolidated (${r0} → ${r1})`)
const ribbonRow = $$('.party-list .supply').find((li) => li.querySelector('.supply__name').textContent.startsWith('Satin ribbon'))
ok(ribbonRow.textContent.includes('Wish Jars') && ribbonRow.textContent.includes('Flower Crown Studio'), 'ribbon lists both sources')
await act(async () => navigate('results'))
await click($$('.plan-bar .seg button').find((b) => b.textContent.includes('Explore')))
await click($('[data-activity="wish-jars"]').closest('article').querySelector('.plan-toggle'))
await act(async () => navigate('shop'))
ok(!names().includes('Clear PET jars with lids, 4–8 oz'), 'removing wish jars removes its supplies')
ok(ribbonQty() === r0, 'shared ribbon kept for crown after removal')

// 4. Owned + skipped
const gemRow = () => $$('.party-list .supply').find((li) => li.textContent.includes('Large acrylic gems'))
await click(gemRow().querySelector('.supply__skip'))
ok(gemRow().classList.contains('is-skipped'), 'item deselected')
ok(JSON.parse(localStorage.getItem('whimavera.skipped.v1')).length === 1, 'skip persisted')
await click(gemRow().querySelector('.supply__skip'))
ok(!gemRow().classList.contains('is-skipped'), 'item reselected')
await click(gemRow().querySelector('input[type=checkbox]'))
ok(gemRow().classList.contains('is-owned'), 'owned in list')

// 5. Guest count change → quantities
const gemQty = () => gemRow().querySelector('.supply__qty').textContent
const q12 = gemQty()
await act(async () => navigate('results'))
await click($('.plan-bar__edit'))
const plus = $$('.edit-panel button').find((b) => /increase|more|\+/i.test(b.getAttribute('aria-label') || b.textContent))
for (let i = 0; i < 8; i++) await click(plus)
await act(async () => navigate('shop'))
ok(gemQty() !== q12, `gems scale with guests (${q12} → ${gemQty()})`)

// 6. Budget change → lean tip
ok(text().includes('Keeping costs down?'), 'lean budget tip at $150')
await act(async () => navigate('results'))
await click($('.plan-bar__edit'))
const allBox = $$('.edit-panel input[type=checkbox]')[0]
await click(allBox)
await act(async () => navigate('shop'))
ok(!text().includes('Keeping costs down?'), 'no lean tip with unlimited budget')

// 7. Copy / print
await click($$('.party-list__actions button').find((b) => b.textContent.includes('Print')))
ok(globalThis.printed, 'print invoked')

// 8. Recipe ingredient links
await act(async () => navigate('recipe-fairy-treats'))
await act(async () => navigate('results'))
await act(async () => navigate('recipe-fairy-treats'))
const rl = $$('[role="dialog"] .ingr a.amz-btn')
ok(rl.length > 0 && rl.every((a) => tagOk(a.href)), 'recipe ingredient links tagged')

// 9. Persistence across reload
root.unmount()
const root2 = createRoot($('#root'))
await act(async () => navigate('shop'))
await act(async () => root2.render(React.createElement(App)))
ok(gemRow()?.classList.contains('is-owned'), 'owned survives reload')

// 10. Every Amazon link on the page tagged
ok($$('a[href*="amazon."]').every((a) => tagOk(a.href)), 'all Amazon links tagged')
console.log(`✓ ${n} UI checks passed`)
process.exit(0)
