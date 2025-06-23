import { useState } from 'preact/hooks'
import '../App.css'
import { videoSizes } from './video-size.data.ts'

// Compute max width/height for relative scaling
const maxDims = videoSizes.reduce(
  (acc, v) => {
    const [w, h] = v.size.split('x').map(Number)
    return {
      w: Math.max(acc.w, w),
      h: Math.max(acc.h, h),
    }
  },
  { w: 0, h: 0 },
)

function parseSize(size: string) {
  const [w, h] = size.split('x').map(Number)
  return { w, h }
}

// Dynamically determine the best block size
function getBestBlockSize(sizes: { size: string }[]): number {
  const candidates = [640, 480, 320, 240, 160, 120, 80, 64, 40, 32, 24, 16]
  const allDims = sizes.flatMap(v => v.size.split('x').map(Number))
  let best = 16
  let bestCount = 0
  for (const c of candidates) {
    const count = allDims.filter(dim => dim % c === 0).length
    if (count > bestCount || (count === bestCount && c > best)) {
      best = c
      bestCount = count
    }
  }
  return best
}

// Use the smallest width/height as the block size, but not less than 160
const allDims = videoSizes.flatMap(v => v.size.split('x').map(Number))
const pxPerBlock = Math.max(160, Math.min(...allDims))

function SizePreview({ size }: { size: string }) {
  const { w, h } = parseSize(size)
  // Use min(first digit, w/100) and min(first digit, h/100)
  const wFirst = Number(String(w)[0])
  const hFirst = Number(String(h)[0])
  const cols = Math.max(1, Math.min(wFirst, Math.floor(w / 100)))
  const rows = Math.max(1, Math.min(hFirst, Math.floor(h / 100)))
  const blockSize = 16
  const gridWidth = cols * blockSize
  const gridHeight = rows * blockSize
  const max = 80
  // Calculate scale to fit grid inside preview area
  const scale = Math.min(max / gridWidth, max / gridHeight, 1)
  return (
    <div
      style={{
        width: max,
        height: max,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${blockSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${blockSize}px)`,
          width: gridWidth,
          height: gridHeight,
          background: '#f3f3f3',
          borderRadius: 4,
          boxShadow: '0 1px 2px #0001',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            style={{
              width: blockSize - 2,
              height: blockSize - 2,
              margin: 1,
              background: '#0078d4',
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function SizeCard({
  v,
  selected,
  onSelect,
}: {
  v: { label: string; size: string }
  selected: boolean
  onSelect: () => void
}) {
  return (
    <div
      style={{
        border: selected ? '2px solid #d32f2f' : '1px solid #ccc',
        borderRadius: 8,
        padding: 0,
        margin: 0,
        width: '100%',
        boxSizing: 'border-box',
        background: selected ? '#fff3f3' : '#fafbfc',
        boxShadow: selected ? '0 0 0 2px #d32f2f33' : undefined,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'border 0.2s, box-shadow 0.2s, background 0.2s',
      }}
      onClick={onSelect}
    >
      <SizePreview size={v.size} />
      <div style={{ margin: '0px 0 0px 0', fontWeight: 600 }}>{v.label}</div>
      <div style={{ fontSize: 13, color: '#555', marginBottom: 0 }}>{v.size}</div>
      <input
        type='radio'
        name='videosize'
        value={v.label}
        checked={selected}
        onChange={onSelect}
        style={{ marginTop: 2 }}
      />
    </div>
  )
}

export default function VideoSize() {
  const [selected, setSelected] = useState(videoSizes[0].label)
  return (
    <div>
      <h3>Video size</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 16,
          justifyItems: 'center',
          alignItems: 'start',
        }}
      >
        {videoSizes.map(v => (
          <SizeCard
            key={v.label}
            v={v}
            selected={selected === v.label}
            onSelect={() => setSelected(v.label)}
          />
        ))}
      </div>
    </div>
  )
}
