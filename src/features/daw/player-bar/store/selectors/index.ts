import { RootState } from '../../../../store'

export const selectIsPlaying = (state: RootState) => state.playerBar.isPlaying
