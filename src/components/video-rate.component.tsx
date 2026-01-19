import type { JSX } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import '../App.css'
import { framerates } from './video-rate.data.ts'

function parseFps(val: string): number {
  const [num, denom] = val.split('/').map(Number)
  return denom ? num / denom : Number(val)
}

// type FrameratePreviewBoxesProps = Readonly<{
//   steps: number
//   highlight: number
//   selected: boolean
//   mask: boolean
// }>
// @deprecation: This component is not used in the current implementation.
// function FrameratePreviewBoxes({
//   steps,
//   highlight,
//   selected,
//   mask,
// }: FrameratePreviewBoxesProps): JSX.Element {
//   const boxes: JSX.Element[] = []
//   for (let i = 0; i < steps; i++) {
//     const isHighlight = i === highlight
//     let background: string
//     let border: string
//     let margin = 1
//     if (isHighlight) {
//       background = selected ? '#d32f2f' : '#0078d4'
//       border = selected ? '2px solid #b71c1c' : '2px solid #333'
//     } else if (mask) {
//       background = '#000'
//       border = 'none'
//       margin = 0
//     } else {
//       background = i % 2 === 0 ? '#fff' : '#eee'
//       border = '1px solid #ccc'
//     }
//     const key = `${steps}-${highlight}-${selected}-${mask}-${i}`
//     boxes.push(
//       <div
//         key={key}
//         style={{
//           background,
//           border,
//           borderRadius: 3,
//           display: 'inline-block',
//           flex: 1,
//           height: 36,
//           margin,
//           minWidth: 4,
//           transition: 'background 0.1s, border 0.1s',
//         }}
//       />,
//     )
//   }
//   return (
//     <div
//       style={{
//         alignItems: 'center',
//         border: '1px solid #ccc',
//         display: 'flex',
//         height: 40,
//         justifyContent: steps < 8 ? 'flex-start' : 'center',
//         overflow: 'hidden',
//         width: 180,
//       }}
//     >
//       {boxes}
//     </div>
//   )
// }

type FramerateTimingGraphProps = Readonly<{
  steps: number
  highlight: number
  selected: boolean
  mask: boolean
}>

function FramerateTimingGraph({
  steps,
  highlight,
  selected,
  mask,
}: FramerateTimingGraphProps): JSX.Element {
  const rects: JSX.Element[] = []
  for (let i = 0; i < steps; i++) {
    const isHighlight = i === highlight
    let color: string
    if (isHighlight) {
      color = selected ? '#d32f2f' : '#0078d4'
    } else if (mask) {
      color = '#222'
    } else {
      color = '#bbb'
    }
    const key = `${steps}-${highlight}-${selected}-${mask}-${i}`
    rects.push(
      <rect
        fill={color}
        height={12}
        key={key}
        rx={1}
        width={Math.max(2, 180 / steps - 1)}
        x={(i * 180) / steps}
        y={2}
      />,
    )
  }
  return (
    <svg height={16} style={{ display: 'block', marginTop: 4 }} width={180}>
      <title>Framerate timing graph preview</title>
      {rects}
    </svg>
  )
}

export default function VideoRate(): JSX.Element {
  const [selected, setSelected] = useState(framerates[0].label)
  const [frame, setFrame] = useState(0)
  const [mask, setMask] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const masterFps = 60 // 60Hz master clock

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setFrame(0)
    intervalRef.current = window.setInterval(
      () => setFrame(f => (f + 1) % masterFps),
      1000 / masterFps,
    )
    return (): void => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  function getHighlightIdx(fps: number): number {
    if (!fps || Number.isNaN(fps)) {
      return 0
    }
    return Math.floor((frame * fps) / masterFps) % Math.round(fps)
  }

  return (
    <div>
      <h3>Video framerate</h3>
      <label style={{ display: 'block', marginBottom: 12 }}>
        <input
          checked={mask}
          onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>): void =>
            setMask(e.currentTarget.checked)
          }
          style={{ marginRight: 6 }}
          type='checkbox'
        />
        Silhouette (show all non-highlighted blocks as black)
      </label>
      <table>
        <thead>
          <tr>
            <th>Choice</th>
            <th>Description</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            const rows: JSX.Element[] = []
            for (const f of framerates) {
              const fps = parseFps(f.value)
              const steps = Math.round(fps)
              const highlight = getHighlightIdx(fps)
              rows.push(
                <tr key={f.label}>
                  <td>
                    <label style={{ cursor: 'pointer', userSelect: 'none' }}>
                      <input
                        checked={selected === f.label}
                        name='framerate'
                        onChange={(): void => setSelected(f.label)}
                        style={{ marginRight: 6 }}
                        type='radio'
                        value={f.label}
                      />
                      {f.label} (<span style={{ userSelect: 'none' }}>{f.value}</span> )
                    </label>
                  </td>
                  <td>{f.desc}</td>
                  <td>
                    {/* <FrameratePreviewBoxes
                      steps={steps}
                      highlight={highlight}
                      selected={selected === f.label}
                      mask={mask}
                    /> */}
                    <FramerateTimingGraph
                      highlight={highlight}
                      mask={mask}
                      selected={selected === f.label}
                      steps={steps}
                    />
                  </td>
                </tr>,
              )
            }
            return rows
          })()}
        </tbody>
      </table>
    </div>
  )
}
