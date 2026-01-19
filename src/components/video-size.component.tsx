import '../App.css'
import { videoSizes } from './video-size.data.ts'
import { JSX } from 'preact/jsx-runtime'

// function parseSize(size: string) {
//   const [w, h] = size.split('x').map(Number)
//   return { h, w }
// }

// function SizePreview({ size }: { size: string }) {
//   const { w, h } = parseSize(size)
//   // Calculate aspect ratio scaling to fit in 80px max area
//   const maxSize = 60
//   const scale = Math.min(maxSize / w, maxSize / h)
//   const width = w * scale
//   const height = h * scale

//   return (
//     <div
//       style={{
//         alignItems: 'center',
//         display: 'flex',
//         height: 80,
//         justifyContent: 'center',
//         position: 'relative',
//         width: 80,
//       }}
//     >
//       <div
//         style={{
//           background: 'var(--color-primary)',
//           borderRadius: 4,
//           boxShadow: '0 1px 2px var(--color-shadow)',
//           height,
//           width,
//         }}
//       />
//     </div>
//   )
// }

export default function VideoSize() {
  const cards: JSX.Element[] = videoSizes.map(v => (
    <div
      key={v.label}
      style={{

      }}
    />
  ))
  const title = (
    <h3
      style={{
        color: 'var(--color-text-primary)',
        fontSize: '20px',
        fontWeight: '600',
        margin: '0 0 16px 0',
      }}
    >
      Video size
    </h3>
  )
  return (
    <div>
      {title}
      <div
        style={{
          alignItems: 'start',
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          justifyItems: 'center',
        }}
      >
        {cards}
      </div>
    </div>
  )
}
