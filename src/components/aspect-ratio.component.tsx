const ws = new WebSocket('ws://localhost:8080')
ws.onopen = () => {
  console.log('WebSocket connection established')
}
ws.onmessage = event => {
  console.log('Received message:', event.data)
}
ws.onclose = () => {
  console.log('WebSocket connection closed')
}
ws.onerror = error => {
  console.error('WebSocket error:', error)
}

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
  const w = 80
  const h = 50
  let aspect = 1
  const InfinityAspectRatio = 2.5
  if (value && value < 0) {
    aspect = Math.abs(value)
  } else {
    switch (value) {
      case undefined:
        aspect = 1
        break
      case Number.POSITIVE_INFINITY:
        aspect = InfinityAspectRatio
        break
      default:
        aspect = value
        break
    }
  }
  const boxW = aspect >= 1 ? w : w * aspect
  const boxH = aspect < 1 ? h : h / aspect
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '8px',
        borderRadius: '8px',
        background: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          background: 'var(--color-primary)',
          border: '2px solid var(--color-primary)',
          borderRadius: '6px',
          color: 'var(--color-background)',
          display: 'flex',
          fontSize: '12px',
          fontWeight: '600',
          height: boxH,
          justifyContent: 'center',
          width: boxW,
          transition: 'all 0.2s',
        }}
      >
        {ratio}
      </div>
      <div
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '12px',
          textAlign: 'center',
          width: '100%',
          fontWeight: '500',
        }}
      >
        {value === Number.POSITIVE_INFINITY ? '∞' : value?.toFixed(2)}
      </div>
    </div>
  )
}

export function AspectRatio() {
  return (
    <div>
      <h3
        style={{
          color: 'var(--color-text-primary)',
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 16px 0',
        }}
      >
        Aspect Ratio Examples
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          padding: '16px',
          background: 'var(--color-surface)',
          borderRadius: '8px',
          border: '1px solid var(--color-border)',
        }}
      >
        {RATIO_EXAMPLES.map(ratio => (
          <AspectBox key={ratio} ratio={ratio} />
        ))}
      </div>
    </div>
  )
}

export default AspectRatio
