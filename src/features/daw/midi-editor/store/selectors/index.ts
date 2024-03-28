import { RootState } from '../../../../../store'

export const selectMidiEditorRulerSize = (state: RootState) =>
  state.midiEditor.rulerSize

export const selectLastKeyDuration = (state: RootState) =>
  state.midiEditor.lastKeyDuration

export const selectWhiteKeySize = (state: RootState) =>
  state.midiEditor.whiteKeySize

export const selectSelectedNoteId = (state: RootState) =>
  state.midiEditor.selectedNoteId

export const selectEditorMode = (state: RootState) =>
  state.midiEditor.editorMode

export const selectNotePreviewEnabled = (state: RootState) =>
  state.midiEditor.notePreviewEnabled

export const selectScaleViewEnabled = (state: RootState) =>
  state.midiEditor.scaleViewEnabled

export const selectSelectedScale = (state: RootState) =>
  state.midiEditor.selectedScale
