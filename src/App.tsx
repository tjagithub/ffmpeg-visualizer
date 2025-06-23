import type { JSX } from 'preact/jsx-runtime'
import './App.css'
import AspectRatio from './components/aspect-ratio.component.tsx'
import ColorDef from './components/color-def.component.tsx'
import TimeDuration from './components/time-duration.component.tsx'
import VideoRate from './components/video-rate.component.tsx'
import VideoSize from './components/video-size.component.tsx'

function App(): JSX.Element {
  return (
    <>
      <TimeDuration />
      <AspectRatio />
      <ColorDef />
      <VideoSize />
      <VideoRate />
    </>
  )
}

export { App }
