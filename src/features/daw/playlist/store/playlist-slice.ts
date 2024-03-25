import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../../model/track/track'
import { Bar } from '../../../../model/bar/bar'
import {
  AddKeyToCurrentBarPayload,
  AddKeyToCurrentTrackPayload,
  MoveBarPayload,
  RenameTrackPayload,
  ResizeBarPayload,
  SetTrackColorPayload,
  SetTrackVolumePayload,
} from './types'
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
      const areThereAnyOtherTrackSoloed = state.tracks.some((t) => t.soloed)
      const newTrack = action.payload
      newTrack.areThereAnyOtherTrackSoloed = areThereAnyOtherTrackSoloed
      state.tracks.push(newTrack)
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
    toggleTrackMute: (state, action: PayloadAction<string>) => {
      const track = state.tracks.find((t) => t.id === action.payload)
      if (!track) return
      track.muted = !track.muted
    },
    setTrackColor: (state, action: PayloadAction<SetTrackColorPayload>) => {
      const track = state.tracks.find((t) => t.id === action.payload.trackId)
      if (!track) return
      track.color = action.payload.color
    },
    renameTrack: (state, action: PayloadAction<RenameTrackPayload>) => {
      const track = state.tracks.find((t) => t.id === action.payload.trackId)
      if (!track) return
      track.title = action.payload.newTitle
    },
    deleteTrack: (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter((t) => t.id !== action.payload)
    },
    duplicateTrack: (state, action: PayloadAction<string>) => {
      const track = state.tracks.find((t) => t.id === action.payload)
      if (!track) return
      const newTrack = { ...track, id: uuidv4(), title: track.title + ' Copy' }
      const oldTrackIndex = state.tracks.findIndex((t) => t.id === track.id)
      state.tracks = [
        ...state.tracks.slice(0, oldTrackIndex + 1),
        newTrack,
        ...state.tracks.slice(oldTrackIndex + 1),
      ]
    },
    moveTrackUp: (state, action: PayloadAction<string>) => {
      const track = state.tracks.find((t) => t.id === action.payload)
      if (!track) return
      const oldTrackIndex = state.tracks.findIndex((t) => t.id === track.id)
      if (oldTrackIndex === 0) return
      state.tracks = state.tracks.filter((t) => t.id !== action.payload)
      const targetIndex = oldTrackIndex - 1
      state.tracks = [
        ...state.tracks.slice(0, targetIndex),
        track,
        ...state.tracks.slice(targetIndex),
      ]
    },
    moveTrackDown: (state, action: PayloadAction<string>) => {
      const track = state.tracks.find((t) => t.id === action.payload)
      if (!track) return
      const oldTrackIndex = state.tracks.findIndex((t) => t.id === track.id)
      if (oldTrackIndex === state.tracks.length - 1) return
      state.tracks = state.tracks.filter((t) => t.id !== action.payload)
      const targetIndex = oldTrackIndex + 1
      state.tracks = [
        ...state.tracks.slice(0, targetIndex),
        track,
        ...state.tracks.slice(targetIndex),
      ]
    },
    setTrackVolume: (state, action: PayloadAction<SetTrackVolumePayload>) => {
      const track = state.tracks.find((t) => t.id === action.payload.trackId)
      if (!track) return
      track.volume = action.payload.volume
    },
    toggleTrackSolo: (state, action: PayloadAction<string>) => {
      const track = state.tracks.find((t) => t.id === action.payload)
      if (!track) return
      track.soloed = !track.soloed

      if (track.soloed) {
        state.tracks.forEach((t) => {
          if (t.id !== track.id) t.areThereAnyOtherTrackSoloed = true
        })
      } else {
        const areThereAnyOtherTrackSoloed = state.tracks.some((t) => t.soloed)
        state.tracks.forEach((t) => {
          t.areThereAnyOtherTrackSoloed = areThereAnyOtherTrackSoloed
        })
      }
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
          bar.startAtTick + bar.durationTicks >= action.payload.startAtTick
      )
      if (!bar) {
        const newBarId = uuidv4()
        bar = {
          id: newBarId,
          title: track.title + ' ' + (track.bars.length + 1),
          startAtTick: action.payload.startAtTick,
          durationTicks: action.payload.duration + 20,
          notes: [],
        }
        track.bars.push(bar)
        bar = track.bars.find((bar) => bar.id === newBarId)
        if (!bar) {
          console.error('Bar not found')
          return
        }
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
    moveBar: (state, action: PayloadAction<MoveBarPayload>) => {
      const fromTrack = state.tracks.find(
        (t) => t.id === action.payload.fromTrackId
      )
      const toTrack = state.tracks.find(
        (t) => t.id === action.payload.toTrackId
      )
      if (!fromTrack || !toTrack) return
      if (!action.payload.barId) return

      const bar = fromTrack.bars.find((b) => b.id === action.payload.barId)

      if (!bar) return

      fromTrack.bars = fromTrack.bars.filter(
        (b) => b.id !== action.payload.barId
      )

      bar.startAtTick = action.payload.newStartAtTick
      toTrack.bars.push(bar)
    },
    resizeBar: (state, action: PayloadAction<ResizeBarPayload>) => {
      const track = state.tracks.find((t) => t.id === action.payload.trackId)
      if (!track) return
      if (!action.payload.barId) return

      const bar = track.bars.find((b) => b.id === action.payload.barId)

      if (!bar) return

      bar.durationTicks = action.payload.newDurationTicks
    },
  },
})

export const {
  addTrack,
  selectTrack,
  selectBar,
  addTrackBar,
  setTrackColor,
  renameTrack,
  deleteTrack,
  duplicateTrack,
  moveTrackUp,
  moveTrackDown,
  moveBar,
  resizeBar,
  setTrackVolume,
  toggleTrackMute,
  toggleTrackSolo,
  setFlatboardScroll,
  addNoteToCurrentTrack,
  addNoteToCurrentBar,
} = playlistSlice.actions

export default playlistSlice.reducer
