import Breadcrumbs from '@/components/breadcrumbs.component'

interface ToolCardProps {
  title: string
  description: string
  path: string
}

function ToolCard({ title, description, path }: ToolCardProps) {
  const handleNavigation = (): void => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <button
      onClick={handleNavigation}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-primary)'
        e.currentTarget.style.boxShadow = '0 4px 12px var(--color-shadow-hover)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = '0 2px 4px var(--color-shadow)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      style={{
        background: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        cursor: 'pointer',
        maxWidth: '300px',
        padding: '24px',
        textAlign: 'left',
        transition: 'all 0.2s',
        width: '100%',
      }}
      type='button'
    >
      <h3
        style={{
          color: 'var(--color-primary)',
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 8px 0',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '14px',
          lineHeight: '1.4',
          margin: 0,
        }}
      >
        {description}
      </p>
    </button>
  )
}

export function HomePage() {
  const breadcrumbItems = [{ label: 'Home', path: '/' }]

  const tools = [
    {
      description: 'Parse and format FFmpeg time duration strings (HH:MM:SS, milliseconds, etc.)',
      path: '/time',
      title: 'Time Duration',
    },
    {
      description: 'Configure video size, aspect ratio, and framerate settings',
      path: '/video',
      title: 'Video Properties',
    },
    {
      description: 'Explore named colors and color distributions for FFmpeg',
      path: '/color',
      title: 'Color Definitions',
    },
    {
      description: 'Documentation and examples for FFmpeg stream specifiers',
      path: '/streams',
      title: 'Stream Specifiers',
    },
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
          FFmpeg Tools
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          A collection of utilities for working with FFmpeg parameters and settings
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          justifyItems: 'center',
        }}
      >
        {tools.map(tool => (
          <ToolCard
            description={tool.description}
            key={tool.path}
            path={tool.path}
            title={tool.title}
          />
        ))}
      </div>
    </div>
  )
}
