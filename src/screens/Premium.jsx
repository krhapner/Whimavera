import { Button, Eyebrow, Sparkle } from '../components/ui.jsx'
import MadeToMatch from '../components/printables/MadeToMatch.jsx'
import { collectionForTheme } from '../printables/collections/index.js'
import { getEntitlements, PRICES } from '../printables/entitlements.js'

/**
 * Printables page: the theme's Made to Match collection, personalized from
 * the plan. Parents buy single designs or the whole collection; checkout isn't connected yet, so the price is shown for
 * reference and nothing is charged.
 */
export default function Premium({ plan, hasPlan, sel }) {
  const collection = collectionForTheme(plan.theme.id)
  const ent = getEntitlements(plan.theme.id)

  if (!hasPlan) {
    return (
      <section className="section container gate">
        <Eyebrow>
          <Sparkle size={10} /> Printables
        </Eyebrow>
        <h1 className="display-2">Printables are designed around your party</h1>
        <p className="lede">Plan your party first. We’ll match the invitations, signs, tags and toppers to your theme, activities and menu.</p>
        <Button as="a" href="#plan" size="lg">
          Plan Your Party
        </Button>
      </section>
    )
  }

  return (
    <div className="premium">
      <section className="page-hero container premium__hero">
        <div>
          <Eyebrow>
            <Sparkle size={10} /> Made to Match
          </Eyebrow>
          <h1 className="display-1">
            The {plan.theme.name} <em>printable</em> collection
          </h1>
          <p className="lede">
            Eight coordinated designs — invitation, welcome sign, food tents, favor tags, clue cards, station signs, cupcake toppers and
            thank-you cards — personalized with your party details and printed at home or by a print shop.
          </p>
        </div>
        {collection && (
          <div className="price-card">
            <span className="price-card__theme">Complete collection</span>
            <span className="price-card__price">
              <sup>$</sup>
              {PRICES.bundle}
            </span>
            <span className="price-card__once">one-time · all eight designs · or ${PRICES.single} per design</span>
            <ul>
              {['Personalized with your details', 'Signs and labels for your plan', 'US Letter print sheets', 'Print-shop files with bleed'].map((p) => (
                <li key={p}>
                  <Sparkle size={9} /> {p}
                </li>
              ))}
            </ul>
            <span className="price-card__fine">
              {ent.checkoutAvailable ? '' : 'Checkout isn’t open yet — no payment is taken. '}
              {ent.unlocked ? 'Every design is unlocked.' : 'Previews show a “Preview” mark until a design is bought.'}
            </span>
          </div>
        )}
      </section>

      <section className="section container">
        <MadeToMatch plan={plan} sel={sel} answers={plan.answers} eyebrow="Personalize & download" heading="Your collection" />
      </section>
    </div>
  )
}
