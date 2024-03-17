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
