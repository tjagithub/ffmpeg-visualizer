import { useState } from 'preact/hooks'

// Parse FFmpeg time duration string to seconds (number)
// Supports: [-][HH:]MM:SS[.m...], [-]S+[.m...][s|ms|us]
export function parseTimeDuration(input: string): number | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  let negative = false
  let s = trimmed
  if (s.startsWith('-')) {
    negative = true
    s = s.slice(1)
  }
  // Suffix-based: 200ms, 200000us, 23.189s
  const suffixMatch = s.match(/^(\d+(?:\.\d+)?)(ms|us|s)?$/)
  if (suffixMatch) {
    let value = Number.parseFloat(suffixMatch[1])
    const unit = suffixMatch[2] || 's'
    if (unit === 'ms') value /= 1000
    else if (unit === 'us') value /= 1_000_000
    // 's' or no suffix: seconds
    return negative ? -value : value
  }
  // Colon-based: [HH:]MM:SS[.m...]
  const colonParts = s.split(':')
  if (colonParts.length >= 2 && colonParts.length <= 3) {
    let [hh, mm, ss] = [0, 0, 0]
    if (colonParts.length === 3) {
      hh = Number.parseInt(colonParts[0], 10)
      mm = Number.parseInt(colonParts[1], 10)
      ss = Number.parseFloat(colonParts[2])
    } else {
      mm = Number.parseInt(colonParts[0], 10)
      ss = Number.parseFloat(colonParts[1])
    }
    if ([hh, mm, ss].some(Number.isNaN)) return null
    const value = hh * 3600 + mm * 60 + ss
    return negative ? -value : value
  }
  return null
}

// Format seconds as HH:MM:SS.mmm
function formatDuration(seconds: number): string {
  const neg = seconds < 0
  const s = Math.abs(seconds)
  const hh = Math.floor(s / 3600)
  const mm = Math.floor((s % 3600) / 60)
  const ss = s % 60
  return (
    (neg ? '-' : '') +
    (hh > 0 ? String(hh).padStart(2, '0') + ':' : '') +
    String(mm).padStart(2, '0') +
    ':' +
    ss.toFixed(3).padStart(6, '0')
  )
}

export default function TimeDuration() {
  const [input, setInput] = useState('')
  const parsed = parseTimeDuration(input)
  return (
    <div
      style={{
        alignItems: 'flex-start',
        background: '#fafbfc',
        border: '1px solid #eee',
        borderRadius: 10,
        display: 'flex',
        gap: 18,
        maxWidth: 520,
        padding: 8,
      }}
    >
      <div style={{ flex: 1 }}>
        <label
          for='ffmpeg-time-input'
          style={{ display: 'block', fontSize: 15, fontWeight: 600, marginBottom: 4 }}
        >
          FFmpeg Time Duration
        </label>
        <input
          id='ffmpeg-time-input'
          onInput={e => setInput((e.target as HTMLInputElement).value)}
          placeholder='e.g. 12:03:45, 200ms, 23.189'
          style={{
            border: '1px solid #bbb',
            borderRadius: 6,
            fontSize: 16,
            marginBottom: 6,
            padding: 6,
            width: '100%',
          }}
          type='text'
          value={input}
        />
        <div
          style={{
            background: '#f5f6fa',
            borderRadius: 6,
            boxShadow: '0 1px 2px #0001',
            color: 'var(--color-text-secondary)',
            fontSize: 13,
            marginTop: 8,
            padding: 8,
          }}
        >
          Examples:
          <br />
          <code>55</code> → 55 seconds
          <br />
          <code>0.2</code> → 0.2 seconds
          <br />
          <code>200ms</code> → 0.2 seconds
          <br />
          <code>200000us</code> → 0.2 seconds
          <br />
          <code>12:03:45</code> → 12 hours, 3 minutes, 45 seconds
          <br />
          <code>23.189</code> → 23.189 seconds
        </div>
      </div>
      <div
        style={{
          alignItems: 'flex-start',
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          boxShadow: '0 2px 8px #0001',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minWidth: 180,
          padding: 14,
        }}
      >
        <div style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Parsed (seconds):</div>
        <div
          style={{
            color: parsed !== null ? 'var(--color-accent)' : 'var(--color-secondary)',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {input ? (parsed !== null ? parsed : 'Invalid') : '—'}
        </div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>Formatted:</div>
        <div
          style={{
            color: parsed !== null ? 'var(--color-primary)' : 'var(--color-secondary)',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {input && parsed !== null ? formatDuration(parsed) : '—'}
        </div>
      </div>
    </div>
  )
}
