import { Bar } from '../../../../../model/bar/bar'
import { Key } from '../../../../../model/note/key/key'

export type PlayingTrackKeys = {
  trackId: string
  keys: Key[]
}

export type TrackPreviewLoop = {
  trackId: string
  loopBar: Bar | null
}

export type TogglePlayingKeyPayload = {
  trackId: string
  key: Key
}
