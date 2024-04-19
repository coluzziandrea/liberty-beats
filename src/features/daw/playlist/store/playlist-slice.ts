import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Track } from '../../../../model/track/track'
import { Bar } from '../../../../model/bar/bar'
import {
  AddKeyToCurrentBarPayload,
  AddKeyToCurrentTrackPayload,
  MoveBarPayload,
  RenameTrackPayload,
  SetTrackColorPayload,
  MoveNotePayload,
  ResizeBarPayload,
  ResizeNotePayload,
  SetTrackVolumePayload,
  setCurrentTrackDrumsPatternPayload,
} from './types'
import { v4 as uuidv4 } from 'uuid'
import { KeyUtils } from '../../../../model/note/key/key'
import { DrumSound } from '../../../../model/drums/sound/drums-sound'

export interface PlaylistSlice {
  tracks: Track[]
  selectedTrackId: string | null
  flatboardScroll: number
}

const initialState: PlaylistSlice = {
  tracks: [],
  selectedTrackId: null,
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
          durationTicks: action.payload.duration + 32,
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
        velocity: 100,
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
        velocity: 100,
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
    resizeNote: (state, action: PayloadAction<ResizeNotePayload>) => {
      const track = state.tracks.find((t) => t.id === action.payload.trackId)
      if (!track) return

      const bar = track.bars.find((b) => b.id === action.payload.barId)
      if (!bar) return

      const note = bar.notes.find((note) => note.id === action.payload.noteId)
      if (!note) return

      note.durationTicks = action.payload.newDurationTicks
    },
    setCurrentTrackNoteVelocity: (
      state,
      action: PayloadAction<{ noteId: string; velocity: number }>
    ) => {
      const track = state.tracks.find((t) => t.id === state.selectedTrackId)
      if (!track) return

      const bar = track.bars.find((b) =>
        b.notes.find((n) => n.id === action.payload.noteId)
      )
      if (!bar) return

      const note = bar.notes.find((note) => note.id === action.payload.noteId)
      if (!note) return

      note.velocity = action.payload.velocity
    },
    transposeCurrentTrackNoteKey: (
      state,
      action: PayloadAction<{ noteId: string; keyOffset: number }>
    ) => {
      const track = state.tracks.find((t) => t.id === state.selectedTrackId)
      if (!track) return

      const bar = track.bars.find((b) =>
        b.notes.find((n) => n.id === action.payload.noteId)
      )
      if (!bar) return

      const note = bar.notes.find((note) => note.id === action.payload.noteId)
      if (!note) return

      note.key = KeyUtils.transposeKey(note.key, action.payload.keyOffset)
    },
    deleteCurrentTrackNote: (state, action: PayloadAction<string>) => {
      const track = state.tracks.find((t) => t.id === state.selectedTrackId)
      if (!track) return

      const bar = track.bars.find((b) =>
        b.notes.find((n) => n.id === action.payload)
      )
      if (!bar) return

      bar.notes = bar.notes.filter((n) => n.id !== action.payload)
    },
    moveNote: (state, action: PayloadAction<MoveNotePayload>) => {
      const track = state.tracks.find((t) => t.id === action.payload.trackId)
      if (!track) return

      const fromBar = track.bars.find((b) => b.id === action.payload.fromBarId)
      if (!fromBar) return

      const note = fromBar.notes.find(
        (note) => note.id === action.payload.noteId
      )
      if (!note) return

      let newContainingBar = track.bars.find(
        (b) =>
          b.startAtTick <= action.payload.newStartAtTick &&
          b.startAtTick + b.durationTicks >= action.payload.newStartAtTick
      )

      if (newContainingBar) {
        if (newContainingBar.id !== fromBar.id) {
          // the note is moved to a different bar
          newContainingBar.notes.push(note)
          fromBar.notes = fromBar.notes.filter((n) => n.id !== note.id)
        }
      } else {
        // the note is moved to a new bar
        newContainingBar = {
          id: uuidv4(),
          title: track.title + ' ' + (track.bars.length + 1),
          startAtTick: action.payload.newStartAtTick,
          durationTicks: note.durationTicks + 16,
          notes: [note],
        }
        track.bars.push(newContainingBar)
        fromBar.notes = fromBar.notes.filter((n) => n.id !== note.id)
      }

      note.startsAtRelativeTick =
        action.payload.newStartAtTick - newContainingBar.startAtTick
      note.key = action.payload.newKey
    },
    setCurrentTrackDrumsPattern: (
      state,
      action: PayloadAction<setCurrentTrackDrumsPatternPayload>
    ) => {
      const track = state.tracks.find((t) => t.id === state.selectedTrackId)
      if (!track) return

      if (!track.trackDrums) {
        track.trackDrums = {
          patterns: [],
          selectedSounds: [],
        }
      }

      track.trackDrums.patterns[action.payload.patternIndex] =
        action.payload.pattern
    },
    setCurrentTrackDrumsSounds: (state, action: PayloadAction<DrumSound[]>) => {
      const track = state.tracks.find((t) => t.id === state.selectedTrackId)
      if (!track) return

      if (!track.trackDrums) {
        track.trackDrums = {
          patterns: [],
          selectedSounds: [],
        }
      }

      track.trackDrums.selectedSounds = action.payload
    },
  },
})

export const {
  addTrack,
  selectTrack,
  addTrackBar,
  setTrackColor,
  renameTrack,
  deleteTrack,
  setCurrentTrackNoteVelocity,
  duplicateTrack,
  moveTrackUp,
  moveTrackDown,
  moveBar,
  resizeBar,
  resizeNote,
  moveNote,
  deleteCurrentTrackNote,
  setTrackVolume,
  toggleTrackMute,
  toggleTrackSolo,
  setFlatboardScroll,
  addNoteToCurrentTrack,
  addNoteToCurrentBar,
  transposeCurrentTrackNoteKey,
  setCurrentTrackDrumsPattern,
  setCurrentTrackDrumsSounds,
} = playlistSlice.actions

export default playlistSlice.reducer
