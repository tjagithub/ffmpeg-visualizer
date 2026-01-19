import Breadcrumbs from '../components/breadcrumbs.component.tsx'

export function StreamsPage() {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Stream Specifiers', path: '/streams' },
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
          Stream Specifiers
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          Documentation and examples for FFmpeg stream specifiers used to precisely target specific
          streams
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Overview
          </h2>
          <div
            style={{
              background: 'var(--color-surface)',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '16px',
            }}
          >
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '15px',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              Stream specifiers are strings appended to option names, separated by a colon, to
              specify which stream(s) an option applies to. For example,
              <code
                style={{
                  background: 'var(--color-background)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                  margin: '0 4px',
                }}
              >
                -codec:a:1 ac3
              </code>
              contains the{' '}
              <code
                style={{
                  background: 'var(--color-background)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                  margin: '0 4px',
                }}
              >
                a:1
              </code>{' '}
              stream specifier.
            </p>
          </div>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            A stream specifier can match multiple streams, applying the option to all of them. An
            empty stream specifier matches all streams.
          </p>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Stream Index
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 12px 0',
            }}
          >
            Matches the stream with this index. Stream numbering is based on the order detected by
            libavformat.
          </p>
          <div
            style={{
              background: 'var(--color-primary-light)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <code
              style={{
                background: 'var(--color-background)',
                borderRadius: '4px',
                padding: '8px 12px',
                fontFamily: 'monospace',
                display: 'block',
                marginBottom: '8px',
                color: '#0066cc',
              }}
            >
              -threads:1 4
            </code>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
              Sets thread count for the second stream to 4
            </p>
          </div>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Stream Type
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              stream_type[:additional_stream_specifier]
            </code>
          </p>
          <ul
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
              paddingLeft: '20px',
            }}
          >
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                v
              </code>{' '}
              - all video streams
            </li>
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                V
              </code>{' '}
              - video streams excluding attached pictures, thumbnails, or cover art
            </li>
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                a
              </code>{' '}
              - audio streams
            </li>
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                s
              </code>{' '}
              - subtitle streams
            </li>
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                d
              </code>{' '}
              - data streams
            </li>
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                t
              </code>{' '}
              - attachments
            </li>
          </ul>
          <div
            style={{
              background: 'var(--color-primary-light)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <code
              style={{
                background: 'var(--color-background)',
                borderRadius: '4px',
                padding: '8px 12px',
                fontFamily: 'monospace',
                display: 'block',
                marginBottom: '8px',
                color: '#0066cc',
              }}
            >
              -b:a 128k
            </code>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
              Sets bitrate to 128k for all audio streams
            </p>
          </div>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Group Specifier
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              g:group_specifier[:additional_stream_specifier]
            </code>
          </p>
          <ul
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
              paddingLeft: '20px',
            }}
          >
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                g:group_index
              </code>{' '}
              - match by group index
            </li>
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                g:#group_id
              </code>{' '}
              - match by group ID
            </li>
            <li>
              <code
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontFamily: 'monospace',
                }}
              >
                g:i:group_id
              </code>{' '}
              - match by group ID
            </li>
          </ul>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Program Specifier
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              p:program_id[:additional_stream_specifier]
            </code>
          </p>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            Matches streams in the program with the specified ID.
          </p>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Stream ID Specifier
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              #stream_id
            </code>{' '}
            or{' '}
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              i:stream_id
            </code>
          </p>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            Match the stream by stream ID (e.g., PID in MPEG-TS container).
          </p>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Metadata Specifier
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              m:key[:value]
            </code>
          </p>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            Matches streams with metadata tag{' '}
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              key
            </code>{' '}
            having the specified{' '}
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              value
            </code>
            . If value is omitted, matches streams containing the tag with any value. Colon
            characters in key or value must be backslash-escaped.
          </p>
          <div
            style={{
              background: 'var(--color-accent-light)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid var(--color-accent)',
              marginBottom: '16px',
            }}
          >
            <p style={{ color: '#e65100', fontSize: '14px', margin: 0 }}>
              <strong>Note:</strong> Metadata matching only works properly for input files.
            </p>
          </div>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Disposition Specifier
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              disp:dispositions[:additional_stream_specifier]
            </code>
          </p>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            Matches streams with the given disposition(s).{' '}
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              dispositions
            </code>{' '}
            is a list of one or more dispositions joined with '+'.
          </p>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Usable Configuration Specifier
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            <code
              style={{
                background: 'var(--color-surface)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontFamily: 'monospace',
              }}
            >
              u
            </code>
          </p>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '15px',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            Matches streams with usable configuration - the codec must be defined and essential
            information (video dimension, audio sample rate, etc.) must be present.
          </p>
        </section>

        <section>
          <h2
            style={{
              color: 'var(--color-text-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 16px 0',
            }}
          >
            Examples
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid var(--color-border)',
              }}
            >
              <code
                style={{
                  background: 'var(--color-border)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontFamily: 'monospace',
                  display: 'block',
                  marginBottom: '8px',
                  color: '#495057',
                }}
              >
                -codec copy
              </code>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
                Copy all streams without reencoding (empty stream specifier)
              </p>
            </div>

            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid var(--color-border)',
              }}
            >
              <code
                style={{
                  background: 'var(--color-border)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontFamily: 'monospace',
                  display: 'block',
                  marginBottom: '8px',
                  color: '#495057',
                }}
              >
                -c:v:0 libx264
              </code>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
                Use libx264 codec for the first video stream
              </p>
            </div>

            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid var(--color-border)',
              }}
            >
              <code
                style={{
                  background: 'var(--color-border)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontFamily: 'monospace',
                  display: 'block',
                  marginBottom: '8px',
                  color: '#495057',
                }}
              >
                -map 0:v:0
              </code>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: 0 }}>
                Map only the first video stream from input 0
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
