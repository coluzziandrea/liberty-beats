import { ScaleKey } from '../../scale/scale'

export const KEYS = [
  'C1',
  'C#1',
  'D1',
  'D#1',
  'E1',
  'F1',
  'F#1',
  'G1',
  'G#1',
  'A1',
  'A#1',
  'B1',
  'C2',
  'C#2',
  'D2',
  'D#2',
  'E2',
  'F2',
  'F#2',
  'G2',
  'G#2',
  'A2',
  'A#2',
  'B2',
  'C3',
  'C#3',
  'D3',
  'D#3',
  'E3',
  'F3',
  'F#3',
  'G3',
  'G#3',
  'A3',
  'A#3',
  'B3',
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
  'F#4',
  'G4',
  'G#4',
  'A4',
  'A#4',
  'B4',
  'C5',
  'C#5',
  'D5',
  'D#5',
  'E5',
  'F5',
  'F#5',
  'G5',
  'G#5',
  'A5',
  'A#5',
  'B5',
  'C6',
  'C#6',
  'D6',
  'D#6',
  'E6',
  'F6',
  'F#6',
  'G6',
  'G#6',
  'A6',
  'A#6',
  'B6',
  'C7',
  'C#7',
  'D7',
  'D#7',
  'E7',
  'F7',
  'F#7',
  'G7',
  'G#7',
  'A7',
  'A#7',
  'B7',
  'C8',
  'C#8',
  'D8',
  'D#8',
  'E8',
  'F8',
  'F#8',
  'G8',
  'G#8',
  'A8',
  'A#8',
  'B8',
] as const

export type Key = (typeof KEYS)[number]

export class KeyUtils {
  static isKeyBlack = (key: Key) => key.includes('#')

  static getMinKey(keys: Readonly<Key[]>) {
    let minIndex = 0
    for (let i = 1; i < keys.length; i++) {
      if (KEYS.indexOf(keys[i]) < KEYS.indexOf(keys[minIndex])) {
        minIndex = i
      }
    }
    return keys[minIndex]
  }

  static getMaxKey(keys: Readonly<Key[]>) {
    let maxIndex = 0
    for (let i = 1; i < keys.length; i++) {
      if (KEYS.indexOf(keys[i]) > KEYS.indexOf(keys[maxIndex])) {
        maxIndex = i
      }
    }
    return keys[maxIndex]
  }

  static getKeySubset(start: Key, end: Key, padding?: number) {
    let startIndex = KEYS.indexOf(start)
    let endIndex = KEYS.indexOf(end)

    if (padding) {
      startIndex = Math.max(startIndex - padding, 0)
      endIndex = Math.min(endIndex + padding, KEYS.length - 1)
    }

    return KEYS.slice(startIndex, endIndex + 1)
  }

  static transposeKey(key: Key, keyOffset: number) {
    const index = KEYS.indexOf(key)
    const newIndex = index + keyOffset
    if (newIndex >= KEYS.length || newIndex < 0) return key
    return KEYS[index + keyOffset]
  }

  static getFirstKeyMatchingScaleKey(scaleKey: ScaleKey): Key {
    const key = KEYS.find((key) => key.includes(scaleKey))
    if (!key) return KEYS[0]
    return key
  }

  static applyIntervalToKey(key: Key, interval: number) {
    const keyIndex = KEYS.indexOf(key)
    const newIndex = keyIndex + interval
    if (newIndex >= KEYS.length || newIndex < 0) return null
    return KEYS[newIndex]
  }
}
