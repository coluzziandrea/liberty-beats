import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface DrumMachineState {
  isPlayingPattern: boolean
  maxTrackPatterns: number
  selectedPatternIndex: number
}

const initialState: DrumMachineState = {
  isPlayingPattern: false,
  maxTrackPatterns: 8,
  selectedPatternIndex: 1,
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
