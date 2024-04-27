import { Bar } from '../../../../../../model/bar/bar'
import { Track } from '../../../../../../model/track/track'

export type TrackBarProps = {
  track: Track
  bar: Bar
  onSelectBar: (bar: Bar) => void
  onBarDetails: (bar: Bar) => void
}
