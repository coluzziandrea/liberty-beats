import { Key, KeyUtils } from './key/key'

export interface Note {
  id: string

  /**
   * starting tick, this is relative to the bar parent
   *  */
  startsAtRelativeTick: number

  durationTicks: number
  velocity: number
  key: Key
}

export class NoteUtils {
  static getSmallerKeySetContainingNotes = (
    notes: Readonly<Note[]>,
    padding: number
  ) => {
    const keys = notes.map((n) => n.key)
    const minKey = KeyUtils.getMinKey(keys)
    const maxKey = KeyUtils.getMaxKey(keys)
    return KeyUtils.getKeySubset(minKey, maxKey, padding)
  }
}
