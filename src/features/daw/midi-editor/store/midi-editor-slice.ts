import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EditorMode } from './types/types'
import { SCALE_KEYS, SCALE_TYPES, Scale } from '../../../../model/scale/scale'

export interface MidiEditorSlice {
  rulerSize: number
  horizontalScroll: number
  verticalScroll: number
  whiteKeySize: number

  lastKeyDuration: number
  editorMode: EditorMode
  selectedNoteId: string | null
  notePreviewEnabled: boolean
  scaleViewEnabled: boolean
  selectedScale: Scale
}

const initialState: MidiEditorSlice = {
  rulerSize: 20,
  horizontalScroll: 0,
  verticalScroll: 0,
  lastKeyDuration: 2,
  whiteKeySize: 20,
  selectedNoteId: null,
  editorMode: 'select',
  notePreviewEnabled: false,
  scaleViewEnabled: false,
  selectedScale: {
    key: SCALE_KEYS[0],
    type: SCALE_TYPES[0],
  },
}

export const midiEditorSlice = createSlice({
  name: 'midiEditor',
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
    setEditorMode: (state, action: PayloadAction<EditorMode>) => {
      state.editorMode = action.payload
    },
    toggleNotePreviewEnabled: (state) => {
      state.notePreviewEnabled = !state.notePreviewEnabled
    },
    toggleScaleViewEnabled: (state) => {
      state.scaleViewEnabled = !state.scaleViewEnabled
    },
    selectScale: (state, action: PayloadAction<Scale>) => {
      state.selectedScale = action.payload
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
  setEditorMode,
  toggleNotePreviewEnabled,
  toggleScaleViewEnabled,
  selectScale,
} = midiEditorSlice.actions

export default midiEditorSlice.reducer
