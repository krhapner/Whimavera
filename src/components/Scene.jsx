import { useId, useState } from 'react'
import { photos, photoUrl } from '../data/photos.js'

/**
 * Scene — an illustrated, photo-styled placeholder for editorial imagery.
 * Pass `photo` (a key from data/photos.js) or `src` to show real photography;
 * if the image fails to load, the illustration renders instead.
 *
 * kinds: hero | tablescape | cake | detail | balloons | invite | crown
 * motifs: mushroom | shell | star | teacup | leaf | rainbow
 */
export default function Scene({ kind = 'tablescape', palette, motif = 'mushroom', photo, src, label = 'Fairy Garden', alt = '', className = '' }) {
  const uid = useId().replace(/:/g, '')
  const [failed, setFailed] = useState(false)
  const c = (palette || DEFAULT).map((p) => (typeof p === 'string' ? p : p.hex))
  const imgSrc = src || (photo && photoUrl(photo, kind === 'hero' ? 1600 : 900))
  if (imgSrc && !failed) {
    return (
      <img
        className={`scene scene--photo ${className}`}
        src={imgSrc}
        alt={alt || photos[photo]?.alt || ''}
        onError={() => setFailed(true)}
      />
    )
  }

  const wide = kind === 'hero'
  const W = wide ? 800 : 400
  const H = wide ? 520 : 400

  return (
    <svg
      className={`scene ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt || `${kind} illustration`}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={mix(c[3], '#ffffff', 0.55)} />
          <stop offset="1" stopColor={mix(c[0], '#ffffff', 0.35)} />
        </linearGradient>
        <radialGradient id={`glow${uid}`} cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fffaf0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`vig${uid}`} cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.6" stopColor="#3b2f25" stopOpacity="0" />
          <stop offset="1" stopColor="#3b2f25" stopOpacity="0.16" />
        </radialGradient>
        <filter id={`grain${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0.07 0" />
        </filter>
        <filter id={`soft${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#5a4636" floodOpacity="0.18" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#bg${uid})`} />
      <rect width={W} height={H} fill={`url(#glow${uid})`} />

      {kind === 'hero' && <Hero W={W} H={H} c={c} motif={motif} soft={`url(#soft${uid})`} />}
      {kind === 'tablescape' && <Tablescape c={c} motif={motif} soft={`url(#soft${uid})`} />}
      {kind === 'cake' && <CakeScene c={c} soft={`url(#soft${uid})`} />}
      {kind === 'detail' && <Detail c={c} motif={motif} soft={`url(#soft${uid})`} />}
      {kind === 'balloons' && <BalloonScene c={c} soft={`url(#soft${uid})`} />}
      {kind === 'invite' && <InviteScene c={c} motif={motif} label={label} soft={`url(#soft${uid})`} />}
      {kind === 'crown' && <CrownScene c={c} soft={`url(#soft${uid})`} />}

      <rect width={W} height={H} filter={`url(#grain${uid})`} opacity="0.9" />
      <rect width={W} height={H} fill={`url(#vig${uid})`} />
    </svg>
  )
}

const DEFAULT = ['#E9C6C1', '#A9B79E', '#CBC2DD', '#F1E2B2', '#B89A5E']

/* ---------- color helpers ---------- */
function hexToRgb(h) {
  const n = parseInt(h.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
export function mix(a, b, t) {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  const r = A.map((v, i) => Math.round(v + (B[i] - v) * t))
  return `rgb(${r[0]},${r[1]},${r[2]})`
}
const shade = (h, t) => mix(h, '#3a2c22', t)
const tint = (h, t) => mix(h, '#ffffff', t)

/* ---------- small elements ---------- */
function Flower({ x, y, r = 10, color, center = '#F4E3B5' }) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx={x + Math.cos((a * Math.PI) / 180) * r * 0.85}
          cy={y + Math.sin((a * Math.PI) / 180) * r * 0.85}
          r={r * 0.62}
          fill={color}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.42} fill={center} />
    </g>
  )
}

function Leaf({ x, y, s = 1, rot = 0, color }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C 10 -14, 30 -14, 40 0 C 30 14, 10 14, 0 0 Z" fill={color} />
      <path d="M2 0 L 36 0" stroke={shade(color, 0.25)} strokeWidth="1" opacity="0.5" />
    </g>
  )
}

function Balloon({ x, y, r, color }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} />
      <ellipse cx={x - r * 0.35} cy={y - r * 0.4} rx={r * 0.22} ry={r * 0.32} fill="#fff" opacity="0.38" />
    </g>
  )
}

export function Motif({ type, x, y, s = 1, c }) {
  const t = `translate(${x} ${y}) scale(${s})`
  switch (type) {
    case 'shell':
      return (
        <g transform={t}>
          <path d="M0 30 L -34 -6 A 40 40 0 0 1 34 -6 Z" fill={c[2] || c[0]} />
          {[-24, -12, 0, 12, 24].map((dx) => (
            <path key={dx} d={`M0 30 L ${dx} -22`} stroke={shade(c[2] || c[0], 0.2)} strokeWidth="2" opacity="0.5" />
          ))}
          <ellipse cx="0" cy="30" rx="9" ry="5" fill={shade(c[2] || c[0], 0.15)} />
        </g>
      )
    case 'star':
      return (
        <g transform={t}>
          <polygon
            points="0,-34 9,-11 33,-10 14,5 21,29 0,15 -21,29 -14,5 -33,-10 -9,-11"
            fill={c[3]}
            stroke={shade(c[3], 0.15)}
            strokeWidth="1.5"
          />
        </g>
      )
    case 'teacup':
      return (
        <g transform={t}>
          <ellipse cx="0" cy="26" rx="40" ry="8" fill={tint(c[3], 0.4)} />
          <path d="M-28 -10 L 28 -10 C 26 18, 14 26, 0 26 C -14 26, -26 18, -28 -10 Z" fill={tint(c[2], 0.3)} />
          <path d="M27 -2 C 44 -4, 44 16, 22 14" fill="none" stroke={tint(c[2], 0.1)} strokeWidth="5" />
          <ellipse cx="0" cy="-10" rx="28" ry="6" fill={shade(c[4], 0.05)} opacity="0.75" />
          <Flower x={0} y={8} r={6} color={c[0]} />
        </g>
      )
    case 'leaf':
      return (
        <g transform={t}>
          {[-40, -20, 0, 20, 40].map((r, i) => (
            <Leaf key={i} x={0} y={20} s={0.9} rot={-90 + r} color={i % 2 ? c[1] : shade(c[1], 0.12)} />
          ))}
        </g>
      )
    case 'rainbow':
      return (
        <g transform={t} fill="none" strokeWidth="8" strokeLinecap="round">
          {c.slice(0, 4).map((col, i) => (
            <path key={i} d={`M ${-36 + i * 9} 20 A ${36 - i * 9} ${36 - i * 9} 0 0 1 ${36 - i * 9} 20`} stroke={col} />
          ))}
        </g>
      )
    case 'mushroom':
    default:
      return (
        <g transform={t}>
          <path d="M-9 0 L 9 0 L 12 32 C 4 36, -4 36, -12 32 Z" fill="#F8F1E4" />
          <path d="M-34 4 C -34 -30, 34 -30, 34 4 C 20 9, -20 9, -34 4 Z" fill={shade(c[0], 0.12)} />
          <circle cx="-15" cy="-10" r="4.5" fill="#FFF8EE" />
          <circle cx="8" cy="-16" r="3.5" fill="#FFF8EE" />
          <circle cx="18" cy="-3" r="4" fill="#FFF8EE" />
          <circle cx="-3" cy="-2" r="2.5" fill="#FFF8EE" />
        </g>
      )
  }
}

function StringLights({ x1, x2, y, sag = 30, n = 14 }) {
  const pts = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    return { x: x1 + (x2 - x1) * t, y: y + Math.sin(Math.PI * t) * sag }
  })
  return (
    <g>
      <path d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}`} fill="none" stroke="#8a7a66" strokeWidth="1" opacity="0.5" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y + 3} r="7" fill="#FFE7A8" opacity="0.35" />
          <circle cx={p.x} cy={p.y + 3} r="2.6" fill="#FFF4CF" />
        </g>
      ))}
    </g>
  )
}

function Cake({ x, y, s = 1, c }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="4" rx="62" ry="9" fill={tint(c[4], 0.35)} />
      <rect x="-6" y="4" width="12" height="20" fill={tint(c[4], 0.25)} />
      <ellipse cx="0" cy="26" rx="30" ry="5" fill={tint(c[4], 0.3)} />
      <rect x="-50" y="-52" width="100" height="56" rx="6" fill="#FBF3E6" />
      <rect x="-50" y="-30" width="100" height="5" fill={tint(c[0], 0.2)} opacity="0.7" />
      <rect x="-34" y="-98" width="68" height="48" rx="6" fill="#FDF7EE" />
      <rect x="-34" y="-78" width="68" height="4" fill={tint(c[2], 0.1)} opacity="0.7" />
      <Flower x={-36} y={-50} r={9} color={c[0]} />
      <Flower x={-22} y={-46} r={6} color={c[2]} />
      <Leaf x={-46} y={-44} s={0.5} rot={160} color={c[1]} />
      <Flower x={24} y={-96} r={8} color={c[0]} />
      <Flower x={34} y={-92} r={5} color={c[3]} />
      <Leaf x={14} y={-96} s={0.45} rot={200} color={c[1]} />
      {[-12, 0, 12].map((dx) => (
        <g key={dx}>
          <rect x={dx - 1.5} y="-118" width="3" height="20" fill={tint(c[2], 0.2)} />
          <ellipse cx={dx} cy="-122" rx="3" ry="5" fill="#FFD98A" />
        </g>
      ))}
    </g>
  )
}

/* ---------- compositions ---------- */
function Hero({ W, H, c, motif, soft }) {
  const tableY = 360
  return (
    <g>
      {/* wall panel + arch */}
      <path d={`M 230 ${tableY} L 230 220 A 170 170 0 0 1 570 220 L 570 ${tableY} Z`} fill={tint(c[1], 0.55)} />
      <StringLights x1={70} x2={730} y={60} sag={26} n={20} />
      {/* balloon arch */}
      <g filter={soft}>
        {arcPoints(400, 225, 185, 195, 345, 22).map((p, i) => (
          <Balloon key={i} x={p.x} y={p.y} r={22 + ((i * 7) % 14)} color={c[i % 4]} />
        ))}
      </g>
      {arcPoints(400, 225, 208, 200, 340, 14).map((p, i) => (
        <Leaf key={i} x={p.x} y={p.y} s={0.7} rot={i * 40} color={i % 2 ? c[1] : shade(c[1], 0.15)} />
      ))}
      {/* table */}
      <rect x="0" y={tableY} width={W} height={H - tableY} fill={tint(c[4], 0.55)} />
      <rect x="0" y={tableY} width={W} height="8" fill={tint(c[4], 0.35)} />
      <path d={`M 120 ${tableY + 8} L 680 ${tableY + 8} L 720 ${H} L 80 ${H} Z`} fill={shade(c[1], 0.05)} opacity="0.55" />
      <g filter={soft}>
        <Cake x={400} y={tableY - 2} s={1.15} c={c} />
        <Motif type={motif} x={250} y={tableY - 36} s={1.1} c={c} />
        <Motif type={motif} x={560} y={tableY - 30} s={0.85} c={c} />
        <Motif type={motif} x={150} y={tableY - 22} s={0.6} c={c} />
        {/* bud vases */}
        {[310, 500, 640].map((x, i) => (
          <g key={x}>
            <rect x={x - 8} y={tableY - 34} width="16" height="34" rx="6" fill="#fff" opacity="0.7" />
            <path d={`M ${x} ${tableY - 34} L ${x - 4} ${tableY - 62}`} stroke={c[1]} strokeWidth="2" />
            <Flower x={x - 4} y={tableY - 66} r={9} color={c[(i + 2) % 4]} />
          </g>
        ))}
        {/* cupcakes */}
        {[680, 720].map((x) => (
          <g key={x}>
            <path d={`M ${x - 13} ${tableY - 18} L ${x + 13} ${tableY - 18} L ${x + 9} ${tableY} L ${x - 9} ${tableY} Z`} fill={tint(c[4], 0.25)} />
            <ellipse cx={x} cy={tableY - 22} rx="15" ry="10" fill={shade(c[0], 0.08)} />
            <circle cx={x - 5} cy={tableY - 25} r="2" fill="#fff" />
            <circle cx={x + 5} cy={tableY - 21} r="2" fill="#fff" />
          </g>
        ))}
      </g>
      {/* scattered petals */}
      {[[180, 470], [260, 440], [540, 455], [610, 490], [420, 480]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill={c[i % 3]} transform={`rotate(${i * 35} ${x} ${y})`} opacity="0.9" />
      ))}
    </g>
  )
}

function Tablescape({ c, motif, soft }) {
  return (
    <g>
      <StringLights x1={-10} x2={410} y={40} sag={22} n={12} />
      <rect x="0" y="250" width="400" height="150" fill={tint(c[4], 0.55)} />
      <path d="M 70 258 L 330 258 L 380 400 L 20 400 Z" fill={shade(c[1], 0.05)} opacity="0.6" />
      <g filter={soft}>
        {[100, 200, 300].map((x, i) => (
          <g key={x}>
            <ellipse cx={x} cy={320} rx="38" ry="14" fill="#FFFDF8" />
            <ellipse cx={x} cy={318} rx="26" ry="9" fill={tint(c[i % 3], 0.3)} />
          </g>
        ))}
        <Motif type={motif} x={200} y={225} s={1.2} c={c} />
        <Motif type={motif} x={90} y={240} s={0.7} c={c} />
        <Motif type={motif} x={318} y={236} s={0.8} c={c} />
      </g>
      {[[60, 360], [140, 375], [260, 365], [340, 380]].map(([x, y], i) => (
        <Flower key={i} x={x} y={y} r={7} color={c[(i + 1) % 4]} />
      ))}
    </g>
  )
}

function CakeScene({ c, soft }) {
  return (
    <g>
      <circle cx="200" cy="170" r="130" fill={tint(c[2], 0.45)} />
      <rect x="0" y="300" width="400" height="100" fill={tint(c[4], 0.55)} />
      <g filter={soft}>
        <Cake x={200} y={300} s={1.6} c={c} />
      </g>
      <Leaf x={60} y={330} s={1} rot={-20} color={c[1]} />
      <Flower x={330} y={340} r={12} color={c[0]} />
      <Flower x={352} y={360} r={8} color={c[2]} />
    </g>
  )
}

function Detail({ c, motif, soft }) {
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={0} y={i * 40} width="400" height="1" fill={shade(c[3], 0.2)} opacity="0.12" />
      ))}
      <g filter={soft}>
        <rect x="120" y="230" width="160" height="96" rx="4" fill="#FFFDF8" transform="rotate(-4 200 278)" />
        <Motif type={motif} x={200} y={190} s={2} c={c} />
      </g>
      <text x="200" y="292" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="22" fill={shade(c[4], 0.35)} transform="rotate(-4 200 278)">
        Olivia
      </text>
      <Leaf x={40} y={90} s={1.2} rot={30} color={c[1]} />
      <Flower x={340} y={80} r={14} color={c[0]} />
      <Flower x={360} y={350} r={10} color={c[2]} />
    </g>
  )
}

function BalloonScene({ c, soft }) {
  const pts = [
    [150, 140, 52], [230, 110, 46], [290, 170, 40], [190, 210, 44], [110, 230, 34],
    [270, 250, 36], [330, 110, 30], [80, 150, 30], [220, 300, 28], [150, 300, 24],
  ]
  return (
    <g>
      <rect x="0" y="330" width="400" height="70" fill={tint(c[4], 0.55)} />
      <g filter={soft}>
        {pts.map(([x, y, r], i) => (
          <Balloon key={i} x={x} y={y} r={r} color={c[i % 4]} />
        ))}
      </g>
      {[[120, 190], [260, 210], [300, 140], [180, 270]].map(([x, y], i) => (
        <Leaf key={i} x={x} y={y} s={0.8} rot={i * 60} color={c[1]} />
      ))}
    </g>
  )
}

function InviteScene({ c, motif, label, soft }) {
  return (
    <g>
      <rect width="400" height="400" fill={tint(c[1], 0.35)} />
      <g filter={soft}>
        <rect x="95" y="70" width="210" height="270" rx="3" fill={tint(c[2], 0.55)} transform="rotate(6 200 205)" />
        <rect x="100" y="64" width="200" height="270" rx="3" fill="#FFFCF6" transform="rotate(-3 200 200)" />
      </g>
      <g transform="rotate(-3 200 200)">
        <Motif type={motif} x={200} y={130} s={0.9} c={c} />
        <text x="200" y="196" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="15" letterSpacing="3" fill={shade(c[4], 0.3)}>
          YOU ARE INVITED
        </text>
        <text x="200" y="232" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="30" fill={shade(c[0], 0.45)}>
          Olivia is six
        </text>
        <rect x="160" y="250" width="80" height="1" fill={c[4]} />
        <text x="200" y="276" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="10" letterSpacing="2" fill={shade(c[4], 0.4)}>
          {`A ${label.toUpperCase()} PARTY`}
        </text>
      </g>
      <path d="M 40 360 C 120 330, 260 380, 380 340" stroke={c[0]} strokeWidth="6" fill="none" strokeLinecap="round" />
      <Flower x={330} y={60} r={14} color={c[0]} />
      <Leaf x={300} y={70} s={0.9} rot={200} color={c[1]} />
    </g>
  )
}

function CrownScene({ c, soft }) {
  const pts = arcPoints(200, 205, 120, 0, 360, 16)
  return (
    <g>
      <rect width="400" height="400" fill={tint(c[4], 0.6)} />
      <circle cx="200" cy="205" r="120" fill="none" stroke={c[1]} strokeWidth="5" />
      <g filter={soft}>
        {pts.map((p, i) =>
          i % 2 ? (
            <Leaf key={i} x={p.x} y={p.y} s={0.7} rot={i * 22} color={c[1]} />
          ) : (
            <Flower key={i} x={p.x} y={p.y} r={14 - (i % 4) * 2} color={c[(i / 2) % 4 | 0]} />
          ),
        )}
      </g>
      <path d="M 200 325 C 190 360, 170 380, 150 400" stroke={c[2]} strokeWidth="5" fill="none" />
      <path d="M 205 325 C 220 360, 240 375, 262 400" stroke={c[0]} strokeWidth="5" fill="none" />
    </g>
  )
}

function arcPoints(cx, cy, r, a0, a1, n) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / (n - (a1 - a0 >= 360 ? 0 : 1))) * Math.PI) / 180
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  })
}
