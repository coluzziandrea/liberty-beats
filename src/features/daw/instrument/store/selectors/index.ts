import { RootState } from '../../../../../store'

export const selectPlayingTrackKeys = (state: RootState) =>
  state.instrument.playingTrackKeys

export const selectSelectedOctave = (state: RootState) =>
  state.instrument.selectedOctave

export const selectTrackPreviewLoop = (state: RootState) =>
  state.instrument.trackPreviewLoop

export const selectTrackIdInPlayingPreviewloop = (state: RootState) =>
  state.instrument.trackIdInPlayingPreviewloop
