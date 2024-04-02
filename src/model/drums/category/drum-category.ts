export const DRUMS_CATEGORY = [
  'OPEN_HI_HAT',
  'CLOSED_HI_HAT',
  'SNARE',
  'CRASH',
  'TOM',
  'KICK',
  'COWBELL',
  'RIDE',
  'STICK',
  'HAND_CLAP',
] as const

export type DrumCategory = (typeof DRUMS_CATEGORY)[number]
