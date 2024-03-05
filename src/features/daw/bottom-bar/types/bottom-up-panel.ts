export const BOTTOM_UP_PANELS = ['instrument'] as const

export type BottomUpPanel = (typeof BOTTOM_UP_PANELS)[number]
