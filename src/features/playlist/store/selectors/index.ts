import { RootState } from '../../../../store'

export const selectTracks = (state: RootState) => state.playlist.tracks
