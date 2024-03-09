import { Key } from '../../../../../model/note/note'

export type AddKeyToCurrentTrackPayload = {
  key: Key
  startAtTick: number
  duration: number
}
