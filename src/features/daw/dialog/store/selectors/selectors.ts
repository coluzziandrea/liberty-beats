import { RootState } from '../../../../../store'

export const selectCurrentDialog = (state: RootState) =>
  state.dialog.queue.length > 0 ? state.dialog.queue[0] : null
