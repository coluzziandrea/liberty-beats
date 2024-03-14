import { RootState } from '../../../../../store'

export const selectMaxBars = (state: RootState) => state.playlistHeader.maxBars

export const selectCurrentTick = (state: RootState) =>
  state.playlistHeader.currentTick

export const selectRequestedNewTickPosition = (state: RootState) =>
  state.playlistHeader.requestedNewTickPosition
