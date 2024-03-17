export const OCTAVES = [1, 2, 3, 4, 5, 6, 7, 8] as const

export type Octave = (typeof OCTAVES)[number]
