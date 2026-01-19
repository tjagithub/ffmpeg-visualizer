import { useEffect, useState } from 'preact/hooks'
import { ColorPage } from '../pages/color.page.tsx'
import { HomePage } from '../pages/home.page.tsx'
import { StreamsPage } from '../pages/streams.page.tsx'
import { TimePage } from '../pages/time.page.tsx'
import { VideoPage } from '../pages/video.page.tsx'

interface NavigationProps {
  currentPath: string
}

const navItems: { path: string; label: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'Time', path: '/time' },
  { label: 'Video', path: '/video' },
  { label: 'Color', path: '/color' },
  { label: 'Streams', path: '/streams' },
]

function Navigation({ currentPath }: NavigationProps): preact.JSX.Element {
  const handleNavigation = (path: string): void => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <header
      style={{
        background: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 2px 4px var(--color-shadow)',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <nav
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '32px',
          height: '60px',
          margin: '0 auto',
          maxWidth: '1200px',
        }}
      >
        <div
          style={{
            color: 'var(--color-text-primary)',
            fontSize: '20px',
            fontWeight: '700',
            marginRight: 'auto',
          }}
        >
          FFmpeg Tools
        </div>

        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            onMouseEnter={e => {
              if (currentPath !== item.path) {
                e.currentTarget.style.color = 'var(--color-primary)'
                e.currentTarget.style.background = 'var(--color-primary-light)'
              }
            }}
            onMouseLeave={e => {
              if (currentPath !== item.path) {
                e.currentTarget.style.color = 'var(--color-text-secondary)'
                e.currentTarget.style.background = 'none'
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              borderRadius: '6px',
              color:
                currentPath === item.path ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              padding: '8px 16px',
              position: 'relative',
              transition: 'all 0.2s',
            }}
            type='button'
          >
            {item.label}
            {currentPath === item.path && (
              <div
                style={{
                  background: 'var(--color-primary)',
                  borderRadius: '2px',
                  bottom: '-2px',
                  height: '3px',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translateX(-50%)',
                  width: '20px',
                }}
              />
            )}
          </button>
        ))}
      </nav>
    </header>
  )
}

function getPageComponent(path: string): preact.JSX.Element {
  switch (path) {
    case '/':
      return <HomePage />
    case '/time':
      return <TimePage />
    case '/video':
      return <VideoPage />
    case '/color':
      return <ColorPage />
    case '/streams':
      return <StreamsPage />
    default:
      return <HomePage />
  }
}

export function AppRouter(): preact.JSX.Element {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = (): void => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return (): void => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <div>
      <Navigation currentPath={currentPath} />
      <main>{getPageComponent(currentPath)}</main>
    </div>
  )
}
