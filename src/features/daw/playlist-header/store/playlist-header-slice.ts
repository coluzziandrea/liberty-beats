import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface PlaylistHeaderSlice {
  maxBars: number
  rulerScrollPosition: number
  currentTick: number
}

const initialState: PlaylistHeaderSlice = {
  maxBars: 40,
  rulerScrollPosition: 0,
  currentTick: 11,
}

export const playlistHeaderSlice = createSlice({
  name: 'playlistHeader',
  initialState,
  reducers: {
    setRulerScrollPosition: (state, action: PayloadAction<number>) => {
      state.rulerScrollPosition = action.payload
    },
  },
})

export const { setRulerScrollPosition } = playlistHeaderSlice.actions

export default playlistHeaderSlice.reducer
