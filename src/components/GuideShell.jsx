import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared dialog frame for activity guides and recipes.
 * Large modal on desktop, full-screen sheet on mobile. Escape closes, focus is
 * trapped while open and returned to `returnFocusSelector` afterwards, and the
 * page behind keeps its scroll position.
 */
export default function GuideShell({ crumb, titleId, returnFocusSelector, onClose, children, wide = false, closeLabel = 'Close guide' }) {
  const panel = useRef(null)
  const closeBtn = useRef(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = prevOverflow
      if (returnFocusSelector) document.querySelector(returnFocusSelector)?.focus({ preventScroll: true })
    }
  }, [returnFocusSelector])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const items = [...panel.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return createPortal(
    <div className="guide-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panel} className={`guide ${wide ? 'guide--wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby={titleId} onKeyDown={onKeyDown}>
        <div className="guide__bar">
          <span className="guide__crumb">{crumb}</span>
          <button ref={closeBtn} className="guide__close" onClick={onClose} aria-label={closeLabel}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {children}
        <div className="guide__foot">
          <button className="btn btn--secondary" onClick={onClose}>
            Back to your plan
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
