import { createSlice } from '@reduxjs/toolkit'

export interface PlayerState {
  isPlaying: boolean
}

const initialState: PlayerState = {
  isPlaying: false,
}

export const playerBarSlice = createSlice({
  name: 'playerBar',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
    },
  },
})

export const { togglePlay } = playerBarSlice.actions

export default playerBarSlice.reducer
