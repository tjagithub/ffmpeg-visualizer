import type { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { namedColors } from './color-def.data.ts'
import '../App.css'

// Helper: convert RGB to HSL and return hue (0-360), sat (0-1), light (0-1)
function rgbToHsl(hex: number) {
  const r = ((hex >> 16) & 0xff) / 255
  const g = ((hex >> 8) & 0xff) / 255
  const b = (hex & 0xff) / 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h *= 60
  }
  return { h, l, s }
}

function getMainColorName(h: number, s: number, l: number) {
  if (s < 0.15) return 'Gray'
  if (l < 0.2 || l > 0.8) return 'Gray'
  if (h < 30 || h >= 330) return 'Red'
  if (h < 90) return 'Yellow'
  if (h < 150) return 'Green'
  if (h < 210) return 'Cyan'
  if (h < 270) return 'Blue'
  if (h < 330) return 'Magenta'
  return 'Gray'
}

const MAIN_COLORS = ['Red', 'Yellow', 'Green', 'Cyan', 'Blue', 'Magenta', 'Gray']

function ColorSwatch({
  color,
  onHover,
  onLeave,
  onFocus,
  onBlur,
}: Readonly<{
  color: { name: string; hex: number }
  onHover: (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => void
  onLeave: () => void
  onFocus: (e: JSX.TargetedFocusEvent<HTMLButtonElement>) => void
  onBlur: () => void
}>) {
  const hexStr = `#${color.hex.toString(16).padStart(6, '0')}`
  return (
    <button
      aria-label={color.name}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        background: hexStr,
        border: '1px solid #ccc',
        borderRadius: 6,
        boxShadow: '0 1px 2px #0001',
        cursor: 'pointer',
        height: 28,
        outline: 'none',
        padding: 0,
        transition: 'box-shadow 0.2s, border 0.2s',
        width: 28,
      }}
      type='button'
    />
  )
}

function ColorTooltip({
  color,
  anchorRect,
}: Readonly<{
  color: { name: string; hex: number }
  anchorRect: DOMRect | null
}>) {
  if (!anchorRect) return null
  const hexStr = `#${color.hex.toString(16).padStart(6, '0')}`
  const style: JSX.CSSProperties = {
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 8,
    boxShadow: '0 4px 16px #0002',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 15,
    gap: 6,
    left: anchorRect.left + anchorRect.width / 2,
    minWidth: 120,
    padding: 12,
    pointerEvents: 'none',
    position: 'fixed',
    top: anchorRect.top - 12,
    transform: 'translate(-50%, -100%)',
    zIndex: 1000,
  }
  return (
    <div style={style}>
      <div
        style={{
          background: hexStr,
          border: '1px solid #bbb',
          borderRadius: 8,
          boxShadow: '0 2px 8px #0001',
          height: 56,
          marginBottom: 6,
          width: 56,
        }}
      />
      <div style={{ fontWeight: 600 }}>{color.name}</div>
      <div style={{ color: '#555' }}>{hexStr}</div>
    </div>
  )
}

// AspectRatioExamples component
const RATIO_EXAMPLES = [
  '16:9',
  '4:3',
  '1:1',
  '2.39:1',
  '21:9',
  '9:16',
  '0:0', // undefined
  '1:0', // infinite
  '-4:3', // negative
  '3:4',
  '5:4',
  '1.85:1',
  '2:1',
]

function parseRatio(ratio: string): number | undefined {
  if (ratio === '0:0') return
  const [num, den] = ratio.split(':').map(Number)
  if (!(isNaN(num) || isNaN(den)) && den !== 0) return num / den
  if (!isNaN(num) && den === 0) return Number.POSITIVE_INFINITY
  return
}

function AspectBox({ ratio }: { ratio: string }) {
  const value = parseRatio(ratio)
  const w = 64,
    h = 40
  let aspect = 1
  if (value === undefined) aspect = 1
  else if (value === Number.POSITIVE_INFINITY) aspect = 2.5
  else if (value < 0) aspect = Math.abs(value)
  else aspect = value
  const boxW = aspect >= 1 ? w : w * aspect
  const boxH = aspect < 1 ? h : h / aspect
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div
        style={{
          alignItems: 'center',
          background: '#e3e3e3',
          border: '2px solid #888',
          borderRadius: 6,
          color: '#444',
          display: 'flex',
          fontSize: 12,
          height: boxH,
          justifyContent: 'center',
          width: boxW,
        }}
      >
        {ratio}
      </div>
      <div style={{ color: '#666', fontSize: 12 }}>
        {value === undefined
          ? 'undefined'
          : value === Number.POSITIVE_INFINITY
            ? '∞'
            : value.toFixed(2)}
      </div>
    </div>
  )
}

export function AspectRatioExamples() {
  return (
    <div>
      <h3>Aspect Ratio Examples</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {RATIO_EXAMPLES.map(ratio => (
          <AspectBox key={ratio} ratio={ratio} />
        ))}
      </div>
    </div>
  )
}

export default function ColorDef() {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  // Group namedColors by main color
  const colorRows = MAIN_COLORS.map(main =>
    namedColors
      .map(c => {
        const hsl = rgbToHsl(c.hex)
        return { ...c, ...hsl, main: getMainColorName(hsl.h, hsl.s, hsl.l) }
      })
      .filter(c => c.main === main)
      .sort((a, b) => a.h - b.h || a.s - b.s || a.l - b.l),
  )

  return (
    <div>
      <h3>Named Color Distribution</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {MAIN_COLORS.map((main, row) => (
          <div key={main} style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
            <div style={{ fontWeight: 600, textAlign: 'right', width: 70 }}>{main}</div>
            <div style={{ display: 'flex', gap: 2 }}>
              {colorRows[row].map((color, col) => (
                <div key={color.name} style={{ position: 'relative' }}>
                  <ColorSwatch
                    color={color}
                    onBlur={() => {
                      setHovered(null)
                      setAnchorRect(null)
                    }}
                    onFocus={e => {
                      setHovered({ col, row })
                      setAnchorRect(e.currentTarget.getBoundingClientRect())
                    }}
                    onHover={e => {
                      setHovered({ col, row })
                      setAnchorRect(e.currentTarget.getBoundingClientRect())
                    }}
                    onLeave={() => {
                      setHovered(null)
                      setAnchorRect(null)
                    }}
                  />
                  {hovered && hovered.row === row && hovered.col === col && (
                    <ColorTooltip anchorRect={anchorRect} color={color} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
