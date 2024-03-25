import { Key } from '../../../../../model/note/key/key'
import { TrackColor } from '../../../../../model/track/track-color'

export type AddKeyToCurrentTrackPayload = {
  key: Key
  startAtTick: number
  duration: number
}

export type AddKeyToCurrentBarPayload = {
  key: Key
  barId: string
  startAtRelativeTick: number
  duration: number
}

export type SetTrackVolumePayload = {
  trackId: string
  volume: number
}

export type MoveBarPayload = {
  fromTrackId: string
  toTrackId: string
  barId: string
  newStartAtTick: number
}
export type ResizeBarPayload = {
  trackId: string
  barId: string
  newDurationTicks: number
}

export type SetTrackColorPayload = {
  trackId: string
  color: TrackColor
}

export type RenameTrackPayload = {
  trackId: string
  newTitle: string
}

export type ResizeNotePayload = {
  trackId: string
  barId: string
  noteId: string
  newDurationTicks: number
}

export type MoveNotePayload = {
  trackId: string
  fromBarId: string
  noteId: string
  newStartAtTick: number
  newKey: Key
}
