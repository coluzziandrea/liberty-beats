import { RootState } from '../../../../../store'

export const selectMidiEditorRulerSize = (state: RootState) =>
  state.midiEditor.rulerSize
