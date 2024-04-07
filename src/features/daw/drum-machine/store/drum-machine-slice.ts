import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TRACK_DRUM_PATTERNS } from '../../../../model/track/drums/track-drums'

export interface DrumMachineState {
  isPlayingPattern: boolean
  maxTrackPatterns: number
  selectedPatternIndex: number
}

const initialState: DrumMachineState = {
  isPlayingPattern: false,
  maxTrackPatterns: TRACK_DRUM_PATTERNS,
  selectedPatternIndex: 0,
}

export const drumMachineSlice = createSlice({
  name: 'drumMachine',
  initialState,
  reducers: {
    togglePlayPattern: (state) => {
      state.isPlayingPattern = !state.isPlayingPattern
    },
    selectPattern: (state, action: PayloadAction<number>) => {
      state.selectedPatternIndex = action.payload
    },
  },
})

export const { togglePlayPattern, selectPattern } = drumMachineSlice.actions

export default drumMachineSlice.reducer
