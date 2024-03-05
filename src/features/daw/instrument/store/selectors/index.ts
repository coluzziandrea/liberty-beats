import { RootState } from '../../../../../store'

export const selectPlayingKeys = (state: RootState) =>
  state.instrument.playingKeys
