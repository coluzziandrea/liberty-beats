import { DrumSound } from '../../drums/sound/drums-sound'

export const TRACK_DRUM_PATTERN_SOUNDS_LENGTH = 16
export const TRACK_DRUM_PATTERN_SIZE = 7
export const TRACK_DRUM_PATTERNS = 8

export type TrackDrumPatternSound = 'on' | 'off'

export type TrackDrumPattern = {
  patternSounds: TrackDrumPatternSound[][]
}

export type TrackDrums = {
  selectedSounds: DrumSound[]
  patterns: TrackDrumPattern[]
}

export const EMPTY_DRUM_PATTERN: TrackDrumPatternSound[][] = Array.from({
  length: TRACK_DRUM_PATTERN_SIZE,
}).map(() =>
  Array.from({
    length: TRACK_DRUM_PATTERN_SOUNDS_LENGTH,
  }).map(() => 'off')
)

export const EMPTY_DRUM_TRACK_PATTERNS: TrackDrumPattern[] = Array.from({
  length: TRACK_DRUM_PATTERNS,
}).map(() => {
  return {
    patternSounds: EMPTY_DRUM_PATTERN,
  }
})
