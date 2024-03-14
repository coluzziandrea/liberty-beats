import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface PlaylistHeaderSlice {
  maxBars: number
  rulerScrollPosition: number
  currentTick: number
  requestedNewTickPosition: number | null
}

const initialState: PlaylistHeaderSlice = {
  maxBars: 40,
  rulerScrollPosition: 0,
  currentTick: 0,
  requestedNewTickPosition: null,
}

export const playlistHeaderSlice = createSlice({
  name: 'playlistHeader',
  initialState,
  reducers: {
    setRulerScrollPosition: (state, action: PayloadAction<number>) => {
      state.rulerScrollPosition = action.payload
    },
    setCurrentTickFromSequencer: (state, action: PayloadAction<number>) => {
      state.currentTick = action.payload
      state.requestedNewTickPosition = null
    },
    requestNewTickPosition: (state, action: PayloadAction<number>) => {
      state.requestedNewTickPosition = action.payload
    },
  },
})

export const {
  setRulerScrollPosition,
  setCurrentTickFromSequencer,
  requestNewTickPosition,
} = playlistHeaderSlice.actions

export default playlistHeaderSlice.reducer
