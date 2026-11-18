/** Compact − n + control. */
export default function Stepper({ label, value, onChange, min = 0, max = 40, hint }) {
  return (
    <div className="stepper">
      <span className="stepper__label">
        {label}
        {hint && <span className="stepper__hint">{hint}</span>}
      </span>
      <div className="stepper__ctl" role="group" aria-label={label}>
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  )
}
