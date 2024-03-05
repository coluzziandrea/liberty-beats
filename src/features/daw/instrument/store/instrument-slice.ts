import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Key } from '../../../../model/note/note'

export interface InstrumentSlice {
  playingKeys: Key[]
}

const initialState: InstrumentSlice = {
  playingKeys: [],
}

export const instrumentSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    addPlayingKey: (state, action: PayloadAction<Key>) => {
      state.playingKeys.push(action.payload)
    },
    removePlayingKey: (state, action: PayloadAction<Key>) => {
      state.playingKeys = state.playingKeys.filter((k) => k !== action.payload)
    },
  },
})

export const { addPlayingKey, removePlayingKey } = instrumentSlice.actions

export default instrumentSlice.reducer
