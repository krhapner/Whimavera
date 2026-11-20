/**
 * Print fonts. The same font files are used to measure text (layout), to
 * draw the on-screen preview (FontFace), and to embed in PDFs, so line
 * breaks and sizes match everywhere.
 */
import scriptUrl from '@fontsource/pinyon-script/files/pinyon-script-latin-400-normal.woff?url'
import displayUrl from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff?url'
import displayItalicUrl from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff?url'
import displayBoldUrl from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff?url'
import bodyUrl from '@fontsource/jost/files/jost-latin-400-normal.woff?url'
import bodyMediumUrl from '@fontsource/jost/files/jost-latin-500-normal.woff?url'

// family is the CSS family registered for previews (unique to avoid clashes).
export const FONT_FILES = {
  script: { family: 'WV Script', url: scriptUrl },
  display: { family: 'WV Display', url: displayUrl },
  displayItalic: { family: 'WV Display Italic', url: displayItalicUrl },
  displayBold: { family: 'WV Display Bold', url: displayBoldUrl },
  body: { family: 'WV Body', url: bodyUrl },
  bodyMedium: { family: 'WV Body Medium', url: bodyMediumUrl },
}

let loading = null

/**
 * Load every print font once. `readBytes(url)` can be swapped in tests.
 * Resolves to { [id]: { id, family, bytes, fk } }.
 */
export function loadFonts(readBytes = defaultRead) {
  if (!loading) {
    // fontkit is large; load it only when printables are first previewed.
    loading = import('@pdf-lib/fontkit').then(({ default: fontkit }) => Promise.all(
      Object.entries(FONT_FILES).map(async ([id, f]) => {
        const bytes = new Uint8Array(await readBytes(f.url))
        const fk = fontkit.create(bytes)
        if (typeof FontFace !== 'undefined' && typeof document !== 'undefined' && document.fonts) {
          try {
            const face = new FontFace(f.family, bytes)
            await face.load()
            document.fonts.add(face)
          } catch {
            /* preview falls back to system fonts; layout is unaffected */
          }
        }
        return [id, { id, family: f.family, bytes, fk }]
      }),
    )).then(Object.fromEntries)
  }
  return loading
}

async function defaultRead(url) {
  const res = await fetch(url)
  return res.arrayBuffer()
}

/** Reset (tests). */
export const _resetFonts = () => {
  loading = null
}
