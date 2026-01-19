import Breadcrumbs from '../components/breadcrumbs.component.tsx'
import ColorDef from '../components/color-def.component.tsx'

export function ColorPage() {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Color Definitions', path: '/color' },
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
          Color Definitions
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          Explore named colors and color distributions for FFmpeg
        </p>
      </div>

      <ColorDef />
    </div>
  )
}
