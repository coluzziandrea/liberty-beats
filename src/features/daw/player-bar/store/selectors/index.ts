import { RootState } from '../../../../../store'

export const selectIsPlaying = (state: RootState) => state.playerBar.isPlaying

export const selectBpm = (state: RootState) => state.playerBar.bpm

export const selectTime = (state: RootState) => state.playerBar.time
