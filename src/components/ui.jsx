// Small, reusable presentational building blocks.

export function Button({ children, variant = 'primary', size = 'md', as = 'button', className = '', ...rest }) {
  const Tag = as
  return (
    <Tag className={`btn btn--${variant} btn--${size} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', id }) {
  return (
    <header className={`section-heading section-heading--${align}`} id={id}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display-2">{title}</h2>
      {intro && <p className="lede">{intro}</p>}
    </header>
  )
}

export function Sparkle({ size = 14, className = '' }) {
  return (
    <svg className={`sparkle ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0 C 13 8, 16 11, 24 12 C 16 13, 13 16, 12 24 C 11 16, 8 13, 0 12 C 8 11, 11 8, 12 0 Z" fill="currentColor" />
    </svg>
  )
}

export function Palette({ colors, size = 'md' }) {
  return (
    <ul className={`palette palette--${size}`}>
      {colors.map((c) => (
        <li key={c.hex}>
          <span className="palette__swatch" style={{ background: c.hex }} />
          <span className="palette__name">{c.name}</span>
          <span className="palette__hex">{c.hex}</span>
        </li>
      ))}
    </ul>
  )
}

export function Tag({ children, tone = 'neutral' }) {
  return <span className={`tag tag--${tone}`}>{children}</span>
}

export function Divider() {
  return (
    <div className="flourish" aria-hidden="true">
      <span />
      <Sparkle size={12} />
      <span />
    </div>
  )
}

export const money = (n) => `$${Math.round(n).toLocaleString()}`
