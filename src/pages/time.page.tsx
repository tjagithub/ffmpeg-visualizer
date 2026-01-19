import Breadcrumbs from '../components/breadcrumbs.component.tsx'
import TimeDuration from '../components/time-duration.component.tsx'

export function TimePage() {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Time Duration', path: '/time' },
  ]

  return (
    <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '20px' }}>
      <Breadcrumbs items={breadcrumbItems} />

      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            color: 'var(--color-text-primary)',
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 12px 0',
          }}
        >
          Time Duration
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          Parse and format FFmpeg time duration strings with real-time validation
        </p>
      </div>

      <TimeDuration />
    </div>
  )
}
