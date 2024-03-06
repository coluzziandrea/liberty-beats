export const BOTTOM_UP_PANELS = ['instrument', 'midiEditor'] as const

export type BottomUpPanel = (typeof BOTTOM_UP_PANELS)[number]
