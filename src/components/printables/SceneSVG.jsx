import { useId } from 'react'
import { watermarkTiles, WATERMARK_TEXT, WATERMARK_OPACITY } from '../../printables/watermark.js'

/**
 * Draws a composed scene (printables/compose.js) as SVG — the same positions,
 * fonts and sizes the PDF uses. Units are points; the viewBox is the trim.
 * `showMissing` outlines artwork slots that haven't been supplied yet.
 */
export default function SceneSVG({ scene, showMissing = true, className = '', title, watermark = false }) {
  const uid = useId().replace(/:/g, '')
  const { w, h } = scene
  const circle = scene.shape === 'circle'
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={title || 'Printable preview'} preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id={`trim${uid}`}>{circle ? <circle cx={w / 2} cy={h / 2} r={w / 2} /> : <rect width={w} height={h} />}</clipPath>
        {scene.els.map((e, i) => e.type === 'image' && e.clip && (
          <clipPath key={i} id={`c${uid}-${i}`}>
            <rect x={e.clip.x} y={e.clip.y} width={e.clip.w} height={e.clip.h} />
          </clipPath>
        ))}
      </defs>
      <g clipPath={`url(#trim${uid})`}>
        {scene.background.color && <rect x={0} y={0} width={w} height={h} fill={scene.background.color} />}
        {scene.background.art?.url && <image href={scene.background.art.url} x={0} y={0} width={w} height={h} preserveAspectRatio="xMidYMid slice" />}
        {scene.els.map((e, i) => {
          if (e.type === 'image') {
            if (e.art?.url || e.file?.url)
              return (
                <image
                  key={i}
                  href={(e.art || e.file).url}
                  x={e.x}
                  y={e.y}
                  width={e.w}
                  height={e.h}
                  preserveAspectRatio="none"
                  clipPath={e.clip ? `url(#c${uid}-${i})` : undefined}
                />
              )
            if (!showMissing) return null
            const a = e.area || e
            return (
              <g key={i} className="scene-missing">
                <rect x={Math.max(a.x, 6)} y={Math.max(a.y, 6)} width={Math.min(a.w, w - 12)} height={Math.min(a.h, h - 12)} fill="none" stroke="#C9B8B2" strokeDasharray="3 3" strokeWidth={0.6} rx={3} />
              </g>
            )
          }
          if (e.type === 'rect') return <rect key={i} x={e.x} y={e.y} width={e.w} height={e.h} fill="none" stroke={e.stroke} strokeWidth={e.width} />
          if (e.type === 'line') return <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={e.stroke} strokeWidth={e.width} />
          if (e.type === 'circle') return <circle key={i} cx={e.cx} cy={e.cy} r={e.r} fill="none" stroke={e.stroke} strokeWidth={e.width} />
          if (e.type === 'text')
            return (
              <g key={i} fill={e.color} opacity={e.placeholder ? 0.55 : 1} fontStyle={e.placeholder ? 'normal' : undefined}>
                {e.lines.map((ln, n) => (
                  <text
                    key={n}
                    x={ln.x}
                    y={ln.y}
                    fontFamily={`'${e.family}'`}
                    fontSize={e.size}
                    letterSpacing={e.tracking ? (e.tracking / 1000) * e.size : undefined}
                    style={{ fontKerning: 'normal', fontVariantLigatures: 'common-ligatures' }}
                  >
                    {ln.text}
                  </text>
                ))}
              </g>
            )
          return null
        })}
        {watermark && <Watermark w={w} h={h} />}
      </g>
    </svg>
  )
}

/** Tiled "Preview" mark drawn into the design itself, so screenshots carry it. */
function Watermark({ w, h }) {
  const { tiles, cx, cy, angle } = watermarkTiles(w, h)
  return (
    <g className="scene-watermark" transform={`rotate(${angle} ${cx} ${cy})`} pointerEvents="none" aria-hidden="true">
      {[
        ['#fff', WATERMARK_OPACITY * 1.6, 0.6],
        ['rgb(107,82,82)', WATERMARK_OPACITY, 0],
      ].map(([fill, opacity, dy]) => (
        <g key={fill} fill={fill} opacity={opacity} fontFamily="'Jost', 'Helvetica Neue', Arial, sans-serif" fontWeight={500}>
          {tiles.map((t, i) => (
            <text key={i} x={t.x} y={t.y + dy} fontSize={t.size} letterSpacing={t.size * 0.12}>
              {WATERMARK_TEXT}
            </text>
          ))}
        </g>
      ))}
    </g>
  )
}
