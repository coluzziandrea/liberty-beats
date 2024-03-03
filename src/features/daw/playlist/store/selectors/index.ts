import { RootState } from '../../../../store'

export const selectTracks = (state: RootState) => state.playlist.tracks

export const selectMaxBars = (state: RootState) => state.playlist.maxBars
