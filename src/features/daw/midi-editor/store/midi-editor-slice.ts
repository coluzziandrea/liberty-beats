import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MidiEditorSlice {
  rulerSize: number
  horizontalScroll: number
  verticalScroll: number
  whiteKeySize: number

  lastKeyDuration: number

  selectedNoteId: string | null
}

const initialState: MidiEditorSlice = {
  rulerSize: 20,
  horizontalScroll: 0,
  verticalScroll: 0,
  lastKeyDuration: 2,
  whiteKeySize: 20,
  selectedNoteId: null,
}

export const midiEditorSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    setMidiEditorRulerSize: (state, action: PayloadAction<number>) => {
      state.rulerSize = action.payload
    },
    setMidiEditorWhiteKeySize: (state, action: PayloadAction<number>) => {
      state.whiteKeySize = action.payload
    },
    setMidiEditorHorizontalScroll: (state, action: PayloadAction<number>) => {
      state.horizontalScroll = action.payload
    },
    setMidiEditorVerticalScroll: (state, action: PayloadAction<number>) => {
      state.verticalScroll = action.payload
    },
    setLastKeyDuration: (state, action: PayloadAction<number>) => {
      state.lastKeyDuration = action.payload
    },
    selectNote: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload
    },
  },
})

export const {
  setMidiEditorRulerSize,
  setMidiEditorWhiteKeySize,
  setMidiEditorHorizontalScroll,
  setMidiEditorVerticalScroll,
  setLastKeyDuration,
  selectNote,
} = midiEditorSlice.actions

export default midiEditorSlice.reducer
