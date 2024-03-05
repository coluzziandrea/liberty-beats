export const SCALE_TYPES = [
  'MAJOR',
  'MINOR',
  'PENTATONIC MINOR',
  'PENTATONIC MAJOR',
  'BLUES',
  'CHROMATIC',
] as const

export type ScaleType = (typeof SCALE_TYPES)[number]

export const SCALE_KEYS = [
  'C',
  'C#',
  'D♭',
  'D',
  'D#',
  'E♭',
  'E',
  'F',
  'F#',
  'G♭',
  'G',
  'G#',
  'A♭',
  'A',
  'A#',
  'B♭',
  'B',
] as const

export type ScaleKey = (typeof SCALE_KEYS)[number]
