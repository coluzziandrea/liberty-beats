import { RootState } from '../../../../../store'

export const selectMidiEditorRulerSize = (state: RootState) =>
  state.midiEditor.rulerSize

export const selectLastKeyDuration = (state: RootState) =>
  state.midiEditor.lastKeyDuration
