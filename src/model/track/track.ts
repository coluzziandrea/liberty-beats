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

  muted: boolean
  soloed: boolean
  areThereAnyOtherTrackSoloed: boolean
}
