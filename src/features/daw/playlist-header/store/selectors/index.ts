import { RootState } from '../../../../../store'

export const selectMaxBars = (state: RootState) => state.playlistHeader.maxBars

export const selectCurrentTick = (state: RootState) =>
  state.playlistHeader.currentTick
