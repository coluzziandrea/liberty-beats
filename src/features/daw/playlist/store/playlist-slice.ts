import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../../model/track/track'

export interface PlaylistSlice {
  tracks: Track[]
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
  flatboardScroll: 0,
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<Track>) => {
      console.warn('Adding track', action.payload)
      state.tracks.push(action.payload)
    },
    setFlatboardScroll: (state, action: PayloadAction<number>) => {
      state.flatboardScroll = action.payload
    },
  },
})

export const { addTrack, setFlatboardScroll } = playlistSlice.actions

export default playlistSlice.reducer
