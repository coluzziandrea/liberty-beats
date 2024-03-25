import { Bar } from '../../../../../../../model/bar/bar'
import { Track, TrackUtils } from '../../../../../../../model/track/track'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../../../constants'

export const PianoRollBarHeader = ({
  bar,
  track,
}: {
  bar: Bar
  track: Track
}) => {
  const barHeaderColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-600'
    : `bg-${track.color}-700`
  return (
    <div
      className={`sticky z-30 ${barHeaderColor} rounded-t-md pl-2 top-0`}
      style={{
        height: PIANO_ROLL_BAR_HEADER_HEIGHT,
      }}
    >
      <p className="text-white text-sm font-bold select-none">{bar.title}</p>
    </div>
  )
}
