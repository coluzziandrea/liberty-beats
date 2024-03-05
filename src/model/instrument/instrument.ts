export const INSTRUMENT_TYPES = [
  'GUITAR',
  'BASS',
  'DRUMS',
  'KEYBOARDS',
] as const

export type InstrumentType = (typeof INSTRUMENT_TYPES)[number]
