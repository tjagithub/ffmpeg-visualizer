import { JSX } from 'preact'

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
  if (!(Number.isNaN(num) || Number.isNaN(den)) && den !== 0) return num / den
  if (!Number.isNaN(num) && den === 0) return Number.POSITIVE_INFINITY
  return
}

function AspectBox({ ratio }: Readonly<{ ratio: string }>) {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div
        style={{
          width: boxW,
          height: boxH,
          background: '#e3e3e3',
          border: '2px solid #888',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          color: '#444',
        }}
      >
        {ratio}
      </div>
      <div style={{ fontSize: 12, color: '#666' }}>
        {value === undefined
          ? 'undefined'
          : value === Number.POSITIVE_INFINITY
            ? '∞'
            : value.toFixed(2)}
      </div>
    </div>
  )
}

export function AspectRatio() {
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

export default AspectRatio
