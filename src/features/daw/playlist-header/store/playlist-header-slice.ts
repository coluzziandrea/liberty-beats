import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface PlaylistHeaderSlice {
  maxBars: number
  rulerScrollPosition: number
  currentTick: number
  requestedNewTickPosition: number | null
}

const DEFAULT_MAX_BARS = 40
const TICKS_PER_MEASURE = 16

const initialState: PlaylistHeaderSlice = {
  maxBars: DEFAULT_MAX_BARS,
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
      state.currentTick = Math.floor(action.payload)
      state.requestedNewTickPosition = null
    },
    requestNewTickPosition: (state, action: PayloadAction<number>) => {
      state.requestedNewTickPosition = action.payload
    },
    requestForwardTickPosition: (state) => {
      const newTick = Math.min(
        state.currentTick + 1,
        state.maxBars * TICKS_PER_MEASURE
      )
      state.requestedNewTickPosition = newTick
    },
    requestBackwardTickPosition: (state) => {
      const newTick = Math.max(state.currentTick - 1, 0)
      state.requestedNewTickPosition = newTick
    },
  },
})

export const {
  setRulerScrollPosition,
  setCurrentTickFromSequencer,
  requestNewTickPosition,
  requestForwardTickPosition,
  requestBackwardTickPosition,
} = playlistHeaderSlice.actions

export default playlistHeaderSlice.reducer
