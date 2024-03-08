import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MidiEditorSlice {
  rulerSize: number
  horizontalScroll: number
  verticalScroll: number
}

const initialState: MidiEditorSlice = {
  rulerSize: 20,
  horizontalScroll: 0,
  verticalScroll: 0,
}

export const midiEditorSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    setMidiEditorRulerSize: (state, action: PayloadAction<number>) => {
      state.rulerSize = action.payload
    },
    setMidiEditorHorizontalScroll: (state, action: PayloadAction<number>) => {
      state.horizontalScroll = action.payload
    },
    setMidiEditorVerticalScroll: (state, action: PayloadAction<number>) => {
      state.verticalScroll = action.payload
    },
  },
})

export const {
  setMidiEditorRulerSize,
  setMidiEditorHorizontalScroll,
  setMidiEditorVerticalScroll,
} = midiEditorSlice.actions

export default midiEditorSlice.reducer