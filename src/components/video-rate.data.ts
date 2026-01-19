export const framerates: ReadonlyArray<{
  readonly label: string
  readonly value: string
  readonly desc: string
}> = [
  { desc: 'Standard NTSC framerate', label: 'ntsc', value: '30000/1001' },
  { desc: 'Standard PAL framerate', label: 'pal', value: '25/1' },
  { desc: 'Quarter NTSC', label: 'qntsc', value: '30000/1001' },
  { desc: 'Quarter PAL', label: 'qpal', value: '25/1' },
  { desc: 'Square NTSC', label: 'sntsc', value: '30000/1001' },
  { desc: 'Square PAL', label: 'spal', value: '25/1' },
  { desc: 'Film', label: 'film', value: '24/1' },
  { desc: 'NTSC Film', label: 'ntsc-film', value: '24000/1001' },
  { desc: 'Slow Motion', label: '10-frames', value: '10/1' },
  { desc: 'Slow Motion', label: '2-frames', value: '2/1' },
] as const
