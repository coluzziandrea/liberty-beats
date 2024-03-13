import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const DEFAULT_BPM = 120
export interface PlayerState {
  isPlaying: boolean
  bpm: number
  time: number
}

const initialState: PlayerState = {
  isPlaying: false,
  bpm: DEFAULT_BPM,
  time: 0,
}

export const playerBarSlice = createSlice({
  name: 'playerBar',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
    },
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload
    },
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload
    },
  },
})

export const { togglePlay, setTime, setBpm } = playerBarSlice.actions

export default playerBarSlice.reducer
