import { RootState } from '../../../../../store'

export const selectSelectedBottomUpPanel = (state: RootState) =>
  state.bottomBar.selectedBottomUpPanel
