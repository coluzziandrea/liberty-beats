import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../model/track/track'

export interface PlaylistSlice {
  tracks: Track[]
  maxBars: number
}

const initialState: PlaylistSlice = {
  tracks: [],
  maxBars: 20,
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<Track>) => {
      console.warn('Adding track', action.payload)
      state.tracks.push(action.payload)
    },
  },
})

export const { addTrack } = playlistSlice.actions

export default playlistSlice.reducer
