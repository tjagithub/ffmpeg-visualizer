# ffmpeg-visualizer: plan

A static site that explains FFmpeg option syntax by showing it. Not a command
builder, and it never runs FFmpeg.

Replaces `ffmpeg-tauri`, which used Tauri and a bundled FFmpeg build (575 MB of
binaries) for something that is only a reference. That was the wrong shape.

## Audience and goal

People who paste an `ffmpeg` command and do not know what it does. The official docs
assume you know muxing and codec terms; this site does not.

- Lead with "explain this command": paste one, get it split into input, filters, codecs,
  streams and output, each with a plain-English line and a small visual.
- Plain words first, jargon second. Hover definitions; a glossary page as the spine
  (container, codec, stream, mux, bitrate, keyframe, pixel format, copy vs re-encode).
- Concept pages for what the docs assume. Streams and muxing use tracker lanes going
  into a container box, with `-map` choosing which lanes come out. The Boing demo is for
  filters only.
- Be right or say so: build from a small checked table of the ~20 options people paste
  (`-i -c -vf -ss -t -map -r -crf`) and flag anything it does not recognise.

## What it does

Each topic is a page with a small interactive control and a picture of the result.

- **Sizes:** pick a name (`hd720`, `wuxga`) or type `WxH`, and see the frame to scale.
- **Aspect ratio and rate:** `16:9`, `30000/1001`; show the ratio and the frame timing.
- **Time durations:** `01:02:03.5`, `90s`, `1500ms`; parse and show the other forms.
- **Colour:** names, `#RRGGBB@alpha`, `random`; swatches.
- **Stream specifiers:** `0:v:1`, `a:m:language:eng`; show which streams of a sample
  file each one picks.
- Later: a `-filter_complex` graph drawn as boxes and arrows.

## Shape

- Static site on GitHub Pages. React or Preact, Vite, TypeScript. No backend.
- State lives in the URL (`?size=1920x1080&rate=30000/1001`) so a view can be linked.
- Parsers are pure functions with unit tests (durations, ratios, rates, specifiers).
- Tooling as on the other repos: mise, oxfmt and oxlint with TS configs.
- A LICENSE (MIT) from the first commit.

## Seed material

`seed/` holds the data tables from the old repo (named video sizes, rates, colour
names). `seed/old-src/` is a copy of its components and pages, kept so the visuals
can be rebuilt. Check the tables against the FFmpeg docs before relying on them.

## Visuals from the old app

- **Keep:** the frame-rate comparison (`video-rate.component.tsx`). A master clock
  ticks and each chosen rate lights its own frames against it. Port it as is, then
  tidy.
- **Rework:** the others (size, aspect ratio, colour, time, streams). Which ones and
  how is still open; decide per topic when starting it.

## Sample media

Use Big Buck Bunny (CC BY 3.0, credit "© Blender Foundation | peach.blender.org"; confirm the
licence of the exact files) so every page shows real footage.

- Commit a few extracted WebP frames (under 1 MB total) and at most one short clip.
  Never the full film.
- Streams page: commit only `ffprobe -show_streams -of json` output and show which
  streams each specifier selects. No video needed.
- Time page: a timeline over the real running time; `-ss` and `-t` highlight a span.

## Animation

Faux-Amiga demoscene look: a checkered bouncing ball over a perspective grid, copper
bars, a scroller. Drawn by hand on one canvas (2D or WebGL), no animation library.

- One clock `t`. Every frame is a pure function of `t`, so pause, scrub and speed are free.
- **Rate:** sample the same bounce at the chosen rate beside a continuous copy; show the judder.
- **Size:** render at the real pixel size, scale up nearest-neighbour.
- **Aspect:** wrong SAR or DAR turns the ball into an ellipse.
- **Colour:** copper bars and palette cycling.
- **Time:** a scroller or timeline marking the `-ss` and `-t` span.
- **Streams:** tracker-style lanes; a specifier lights the lanes it selects.
- GSAP or anime.js only if a page needs sequencing the clock cannot give. Big Buck Bunny
  becomes optional, for one real-footage panel.

## Core model

One fixed scene (the Boing ball), rendered deterministically from a clock `t`. Each
FFmpeg option is a stage that maps frames to frames; the output sits beside the source.

- Stages are WebGL passes: `fps`, `scale`, `setsar` and `-aspect`, `crop` and `pad`,
  `hflip` and `transpose`, `eq` and `hue`, `-ss` and `-t`, `format` and `pix_fmt`.
- Sliders and the command text stay in sync. Editing either updates the other.
- The chain is reorderable, because order matters (`scale,crop` differs from `crop,scale`).
- These approximate FFmpeg; say so on the site. Spot-check stages against a real `ffmpeg` run.
- Build first: `fps`, `scale`, `setsar` and `-aspect`, `crop`, plus the chain and
  command plumbing.

## Order

1. Command tokenizer, the checked option table and plain-English explanations, with tests.
2. Pure parsers and tests (size, ratio, rate, duration, colour, specifier).
3. One page per topic, one control each.
4. URL state and share links.
5. Pages deploy and README.
6. Filter graph view, if it still seems worth it.
