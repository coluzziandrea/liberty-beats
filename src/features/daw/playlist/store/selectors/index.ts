import { RootState } from '../../../../../store'

export const selectTracks = (state: RootState) => state.playlist.tracks

export const selectSelectedTrack = (state: RootState) =>
  state.playlist.tracks.find((t) => t.id === state.playlist.selectedTrackId)

export const selectSelectedBar = (state: RootState) => {
  const selectedTrack = state.playlist.tracks.find(
    (t) => t.id === state.playlist.selectedTrackId
  )
  return selectedTrack?.bars.find((b) => b.id === state.playlist.selectedBarId)
}
