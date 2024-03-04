import { Bar } from '../bar/bar'
import type { InstrumentType } from '../instrument/instrument'
import { TrackColor } from './track-color'

export interface Track {
  id: string
  title: string

  /**
   * Tailwind CSS color class
   * @example 'green'
   */
  color: TrackColor
  instrumentType: InstrumentType
  bars: Bar[]
}
