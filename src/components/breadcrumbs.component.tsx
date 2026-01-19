interface BreadcrumbItem {
  label: string
  path: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const handleNavigation = (path: string): void => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <nav
      style={{
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '20px',
        padding: '12px 0',
      }}
    >
      <ol
        style={{
          alignItems: 'center',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          fontSize: '14px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, index) => (
          <li
            key={item.path}
            style={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {index === items.length - 1 ? (
              <span
                style={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item.path)}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-primary-hover)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-primary)'
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  cursor: 'pointer',
                  font: 'inherit',
                  padding: 0,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                type='button'
              >
                {item.label}
              </button>
            )}
            {index < items.length - 1 && (
              <span
                style={{
                  color: 'var(--color-text-muted)',
                  margin: '0 8px',
                }}
              >
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
