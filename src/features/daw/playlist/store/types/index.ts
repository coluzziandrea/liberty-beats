import { Key } from '../../../../../model/note/note'

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
