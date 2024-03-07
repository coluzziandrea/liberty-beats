import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MidiEditorSlice {
  rulerSize: number
}

const initialState: MidiEditorSlice = {
  rulerSize: 20,
}

export const midiEditorSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    setMidiEditorRulerSize: (state, action: PayloadAction<number>) => {
      state.rulerSize = action.payload
    },
  },
})

export const { setMidiEditorRulerSize } = midiEditorSlice.actions

export default midiEditorSlice.reducer
