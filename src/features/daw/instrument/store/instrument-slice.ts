import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OCTAVES, Octave } from '../../../../model/note/key/octave/octave'
import {
  PlayingTrackKeys,
  TogglePlayingKeyPayload,
  TrackPreviewLoop,
} from './types/types'

export interface InstrumentSlice {
  playingTrackKeys: PlayingTrackKeys[]
  trackPreviewLoop: TrackPreviewLoop | null
  trackIdInPlayingPreviewloop: string | null
  selectedOctave: Octave
}

const initialState: InstrumentSlice = {
  playingTrackKeys: [],
  selectedOctave: 4,
  trackPreviewLoop: null,
  trackIdInPlayingPreviewloop: null,
}

export const instrumentSlice = createSlice({
  name: 'instrument',
  initialState,
  reducers: {
    addPlayingKey: (state, action: PayloadAction<TogglePlayingKeyPayload>) => {
      const playingTrackKeysItem = state.playingTrackKeys.find(
        (item) => item.trackId === action.payload.trackId
      )
      if (playingTrackKeysItem) {
        playingTrackKeysItem.keys.push(action.payload.key)
      } else {
        state.playingTrackKeys.push({
          trackId: action.payload.trackId,
          keys: [action.payload.key],
        })
      }
    },
    removePlayingKey: (
      state,
      action: PayloadAction<TogglePlayingKeyPayload>
    ) => {
      const playingTrackKeysItem = state.playingTrackKeys.find(
        (item) => item.trackId === action.payload.trackId
      )
      if (playingTrackKeysItem) {
        playingTrackKeysItem.keys = playingTrackKeysItem.keys.filter(
          (key) => key !== action.payload.key
        )
      } else {
        state.playingTrackKeys.push({
          trackId: action.payload.trackId,
          keys: [],
        })
      }
    },
    removeAllPlayingKeys: (state, action: PayloadAction<string>) => {
      const playingTrackKeysItem = state.playingTrackKeys.find(
        (item) => item.trackId === action.payload
      )
      if (playingTrackKeysItem) {
        playingTrackKeysItem.keys = []
      } else {
        state.playingTrackKeys.push({
          trackId: action.payload,
          keys: [],
        })
      }
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
    setTrackPreviewLoop: (
      state,
      action: PayloadAction<TrackPreviewLoop | null>
    ) => {
      state.trackPreviewLoop = action.payload
    },
    setTrackIdInPlayingPreviewLoop: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.trackIdInPlayingPreviewloop = action.payload
    },
  },
})

export const {
  addPlayingKey,
  removePlayingKey,
  removeAllPlayingKeys,
  selectPreviousOctave,
  selectNextOctave,
  setTrackPreviewLoop,
  setTrackIdInPlayingPreviewLoop,
} = instrumentSlice.actions

export default instrumentSlice.reducer
