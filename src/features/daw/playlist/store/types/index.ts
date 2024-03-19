import { Key } from '../../../../../model/note/key/key'

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
