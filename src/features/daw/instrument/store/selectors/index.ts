import { RootState } from '../../../../../store'

export const selectPlayingKeys = (state: RootState) =>
  state.instrument.playingKeys

export const selectSelectedOctave = (state: RootState) =>
  state.instrument.selectedOctave
