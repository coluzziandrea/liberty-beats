import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Key, OCTAVES, Octave } from '../../../../model/note/note'

export interface InstrumentSlice {
  playingKeys: Key[]
  selectedOctave: Octave
}

const initialState: InstrumentSlice = {
  playingKeys: [],
  selectedOctave: 4,
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
    selectPreviousOctave: (state) => {
      state.selectedOctave =
        state.selectedOctave === OCTAVES[0]
          ? state.selectedOctave
          : OCTAVES[OCTAVES.indexOf(state.selectedOctave) - 1]
    },
    selectNextOctave: (state) => {
      state.selectedOctave =
        state.selectedOctave === OCTAVES[OCTAVES.length - 1]
          ? state.selectedOctave
          : OCTAVES[OCTAVES.indexOf(state.selectedOctave) + 1]
    },
  },
})

export const {
  addPlayingKey,
  removePlayingKey,
  selectPreviousOctave,
  selectNextOctave,
} = instrumentSlice.actions

export default instrumentSlice.reducer
