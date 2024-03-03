import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../../model/track/track'

export interface PlaylistSlice {
  tracks: Track[]
  flatboardScroll: number
}

const initialState: PlaylistSlice = {
  tracks: [],
  flatboardScroll: 0,
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<Track>) => {
      console.warn('Adding track', action.payload)
      state.tracks.push(action.payload)
    },
    setFlatboardScroll: (state, action: PayloadAction<number>) => {
      state.flatboardScroll = action.payload
    },
  },
})

export const { addTrack, setFlatboardScroll } = playlistSlice.actions

export default playlistSlice.reducer
