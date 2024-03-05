import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../../model/track/track'
import { Bar } from '../../../../model/bar/bar'

export interface PlaylistSlice {
  tracks: Track[]
  selectedTrackId: string | null
  flatboardScroll: number
}

const initialState: PlaylistSlice = {
  tracks: [
    {
      id: '1',
      title: 'Piano Lead',
      color: 'green',
      instrumentType: 'PIANO',
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
              sound: 'C4',
            },
          ],
        },
      ],
    },
  ],
  selectedTrackId: null,
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
    setFlatboardScroll: (state, action: PayloadAction<number>) => {
      state.flatboardScroll = action.payload
    },
  },
})

export const { addTrack, selectTrack, addTrackBar, setFlatboardScroll } =
  playlistSlice.actions

export default playlistSlice.reducer
