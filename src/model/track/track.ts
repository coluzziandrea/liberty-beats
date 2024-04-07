import { Bar } from '../bar/bar'
import { InstrumentPreset } from '../instrument/preset/preset'
import { TrackColor } from './track-color'
import { TrackDrums } from './drums/track-drums'

export interface Track {
  id: string
  title: string

  /**
   * Tailwind CSS color class
   * @example 'green'
   */
  color: TrackColor
  instrumentPreset: InstrumentPreset

  /**
   * Drums track specific data (can be undefined if track is not drums track)
   */
  trackDrums?: TrackDrums
  bars: Bar[]

  volume: number

  muted: boolean
  soloed: boolean
  areThereAnyOtherTrackSoloed: boolean
}

export class TrackUtils {
  static isTrackEffectivelyMuted(track: Track) {
    return track.muted || (track.areThereAnyOtherTrackSoloed && !track.soloed)
  }
}
