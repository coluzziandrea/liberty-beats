// if you update this remember to also update safelist in tailwind.config.js
export const TRACK_COLORS = [
  'blue',
  'green',
  'red',
  'yellow',
  'orange',
  'purple',
] as const

export type TrackColor = (typeof TRACK_COLORS)[number]
