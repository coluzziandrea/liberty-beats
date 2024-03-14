import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const DEFAULT_BPM = 120
export interface PlayerState {
  isPlaying: boolean
  bpm: number
  time: number
  metronomeActive: boolean
}

const initialState: PlayerState = {
  isPlaying: false,
  bpm: DEFAULT_BPM,
  time: 0,
  metronomeActive: false,
}

export const playerBarSlice = createSlice({
  name: 'playerBar',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
    },
    stop: (state) => {
      state.isPlaying = false
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
    toggleMetronome: (state) => {
      state.metronomeActive = !state.metronomeActive
    },
  },
})

export const {
  togglePlay,
  setTime,
  stop,
  setBpm,
  increaseBpm,
  toggleMetronome,
  decreaseBpm,
} = playerBarSlice.actions

export default playerBarSlice.reducer
