import { Key, KeyUtils } from '../note/key/key'

export const SCALE_TYPES = [
  'MAJOR',
  'MINOR',
  'PENTATONIC MINOR',
  'PENTATONIC MAJOR',
  'BLUES',
] as const

export type ScaleType = (typeof SCALE_TYPES)[number]

export const SCALE_KEYS = [
  'C',
  'C#',
  'D♭',
  'D',
  'D#',
  'E♭',
  'E',
  'F',
  'F#',
  'G♭',
  'G',
  'G#',
  'A♭',
  'A',
  'A#',
  'B♭',
  'B',
] as const

export type ScaleKey = (typeof SCALE_KEYS)[number]

export type Scale = {
  key: ScaleKey
  type: ScaleType
}

export class ScaleUtils {
  static getScaleKeys(scale: Scale): Key[] {
    const scaleKeys: Key[] = []
    let currentKey: Key | null = KeyUtils.getFirstKeyMatchingScaleKey(scale.key)
    const scaleIntervals = ScaleUtils.getScaleIntervals(scale.type)
    let intervalIndex = 0

    do {
      if (!currentKey) break
      scaleKeys.push(currentKey)

      const interval = scaleIntervals[intervalIndex]
      intervalIndex = (intervalIndex + 1) % scaleIntervals.length
      currentKey = KeyUtils.applyIntervalToKey(currentKey, interval)
    } while (currentKey)

    return scaleKeys
  }

  static getScaleIntervals(scaleType: ScaleType): number[] {
    switch (scaleType) {
      case 'MAJOR':
        return [2, 2, 1, 2, 2, 2, 1]
      case 'MINOR':
        return [2, 1, 2, 2, 1, 2, 2]
      case 'PENTATONIC MINOR':
        return [3, 2, 2, 3, 2]
      case 'PENTATONIC MAJOR':
        return [2, 2, 3, 2, 3]
      case 'BLUES':
        return [3, 2, 1, 1, 3, 2]
    }
  }
}
