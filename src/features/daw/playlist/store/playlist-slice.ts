import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../../model/track/track'
import { Bar } from '../../../../model/bar/bar'
import { AddKeyToCurrentBarPayload, AddKeyToCurrentTrackPayload } from './types'
import { v4 as uuidv4 } from 'uuid'

export interface PlaylistSlice {
  tracks: Track[]
  selectedTrackId: string | null
  selectedBarId: string | null
  flatboardScroll: number
}

const initialState: PlaylistSlice = {
  tracks: [],
  selectedTrackId: null,
  selectedBarId: null,
  flatboardScroll: 0,
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<Track>) => {
      state.tracks.push(action.payload)
    },
    addTrackBar: (state, action: PayloadAction<{ track: Track; bar: Bar }>) => {
      state.tracks
        .find((t) => t.id === action.payload.track.id)
        ?.bars.push(action.payload.bar)
    },
    selectTrack: (state, action: PayloadAction<Track>) => {
      state.selectedTrackId = action.payload.id
    },
    selectBar: (state, action: PayloadAction<Bar>) => {
      state.selectedBarId = action.payload.id
    },
    setFlatboardScroll: (state, action: PayloadAction<number>) => {
      state.flatboardScroll = action.payload
    },
    addNoteToCurrentTrack: (
      state,
      action: PayloadAction<AddKeyToCurrentTrackPayload>
    ) => {
      const track = state.tracks.find((t) => t.id === state.selectedTrackId)
      if (!track) return

      let bar = track.bars.find(
        (bar) =>
          bar.startAtTick <= action.payload.startAtTick &&
          bar.endAtTick >= action.payload.startAtTick
      )
      if (!bar) {
        bar = {
          id: uuidv4(),
          title: track.title + ' ' + (track.bars.length + 1),
          startAtTick: action.payload.startAtTick,
          endAtTick: action.payload.startAtTick + action.payload.duration + 20,
          notes: [],
        }
        track.bars.push(bar)
      }

      bar.notes.push({
        id: uuidv4(),
        startsAtRelativeTick: action.payload.startAtTick - bar.startAtTick,
        durationTicks: action.payload.duration,
        key: action.payload.key,
      })
    },
    addNoteToCurrentBar: (
      state,
      action: PayloadAction<AddKeyToCurrentBarPayload>
    ) => {
      const track = state.tracks.find((t) => t.id === state.selectedTrackId)
      if (!track) return

      if (!action.payload.barId) return

      const bar = track.bars.find((bar) => bar.id === action.payload.barId)
      if (!bar) {
        console.error('Bar not found')
        return
      }

      bar.notes.push({
        id: uuidv4(),
        startsAtRelativeTick: action.payload.startAtRelativeTick,
        durationTicks: action.payload.duration,
        key: action.payload.key,
      })
    },
  },
})

export const {
  addTrack,
  selectTrack,
  selectBar,
  addTrackBar,
  setFlatboardScroll,
  addNoteToCurrentTrack,
  addNoteToCurrentBar,
} = playlistSlice.actions

export default playlistSlice.reducer
