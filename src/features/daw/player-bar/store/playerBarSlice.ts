import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const DEFAULT_BPM = 120
export interface PlayerState {
  isPlaying: boolean
  wasStopped: boolean | null
  bpm: number
  time: number
}

const initialState: PlayerState = {
  isPlaying: false,
  wasStopped: null,
  bpm: DEFAULT_BPM,
  time: 0,
}

export const playerBarSlice = createSlice({
  name: 'playerBar',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
      state.wasStopped = null
    },
    stop: (state) => {
      state.isPlaying = false
      state.wasStopped = true
    },
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload
    },
    decreaseBpm: (state) => {
      state.bpm = state.bpm - 1
    },
    increaseBpm: (state) => {
      state.bpm = state.bpm + 1
    },
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload
    },
  },
})

export const { togglePlay, setTime, stop, setBpm, increaseBpm, decreaseBpm } =
  playerBarSlice.actions

export default playerBarSlice.reducer
