import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../../model/track/track'
import { Bar } from '../../../../model/bar/bar'
import { INSTRUMENT_PRESETS } from '../../../../model/instrument/preset/preset'
import { AddKeyToCurrentTrackPayload } from './types'
import { v4 as uuidv4 } from 'uuid'

export interface PlaylistSlice {
  tracks: Track[]
  selectedTrackId: string | null
  selectedBarId: string | null
  flatboardScroll: number
}

const initialState: PlaylistSlice = {
  tracks: [
    {
      id: '1',
      title: 'Piano Lead',
      color: 'green',
      instrumentPreset: INSTRUMENT_PRESETS[0],
      bars: [
        {
          id: '1',
          title: 'Solo',
          startAtTick: 5,
          endAtTick: 20,
          notes: [
            {
              id: '1',
              startAtTick: 5,
              endAtTick: 7,
              durationTicks: 2,
              key: 'C4',
            },
          ],
        },
      ],
    },
  ],
  selectedTrackId: '1',
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
    addKeyToCurrentTrack: (
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
          endAtTick: action.payload.startAtTick + 20,
          notes: [],
        }
        track.bars.push(bar)
      }

      bar.notes.push({
        id: uuidv4(),
        startAtTick: action.payload.startAtTick,
        endAtTick: action.payload.startAtTick + action.payload.duration,
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
  addKeyToCurrentTrack,
} = playlistSlice.actions

export default playlistSlice.reducer
