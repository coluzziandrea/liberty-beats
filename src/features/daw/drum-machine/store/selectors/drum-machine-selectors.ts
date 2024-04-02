import { RootState } from '../../../../../store'

export const selectMaxTrackPatterns = (state: RootState) =>
  state.drumMachine.maxTrackPatterns

export const selectSelectedPatternIndex = (state: RootState) =>
  state.drumMachine.selectedPatternIndex
