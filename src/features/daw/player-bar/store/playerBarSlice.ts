import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_BPM, DEFAULT_VOLUME } from '../constants/player-bar-constants'

export interface PlayerState {
  isPlaying: boolean
  bpm: number
  time: number
  metronomeActive: boolean
  volume: number
}

const initialState: PlayerState = {
  isPlaying: false,
  bpm: DEFAULT_BPM,
  time: 0,
  metronomeActive: false,
  volume: DEFAULT_VOLUME,
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
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
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
  setVolume,
} = playerBarSlice.actions

export default playerBarSlice.reducer
