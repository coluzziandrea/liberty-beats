import { Bar } from '../bar/bar'
import { InstrumentPreset } from '../instrument/preset/preset'
import { TrackColor } from './track-color'

export interface Track {
  id: string
  title: string

  /**
   * Tailwind CSS color class
   * @example 'green'
   */
  color: TrackColor
  instrumentPreset: InstrumentPreset
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
