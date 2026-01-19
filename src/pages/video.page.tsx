import { AspectRatio } from '../components/aspect-ratio.component.tsx'
import Breadcrumbs from '../components/breadcrumbs.component.tsx'
import VideoRate from '../components/video-rate.component.tsx'
import VideoSize from '../components/video-size.component.tsx'

export function VideoPage() {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Video Properties', path: '/video' },
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
          Video Properties
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          Configure video size, aspect ratio, and framerate settings
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        <section
          style={{
            background: 'var(--color-background)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            padding: '20px',
            boxShadow: '0 2px 4px var(--color-shadow)',
          }}
        >
          <VideoSize />
        </section>

        <section
          style={{
            background: 'var(--color-background)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            padding: '20px',
            boxShadow: '0 2px 4px var(--color-shadow)',
          }}
        >
          <VideoRate />
        </section>

        <section
          style={{
            background: 'var(--color-background)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            padding: '20px',
            boxShadow: '0 2px 4px var(--color-shadow)',
          }}
        >
          <AspectRatio />
        </section>
      </div>
    </div>
  )
}
