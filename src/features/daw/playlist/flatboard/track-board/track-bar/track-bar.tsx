import { Bar } from '../../../../../../model/bar/bar'
import { Track, TrackUtils } from '../../../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../../constants'

export const TrackBar = ({
  track,
  bar,
  onSelectBar,
  onBarDetails,
}: {
  track: Track
  bar: Bar
  onSelectBar: (bar: Bar) => void
  onBarDetails: (bar: Bar) => void
}) => {
  const barLengthPixel = (bar.endAtTick - bar.startAtTick) * TICK_WIDTH_PIXEL
  const barWidthStyle = `${barLengthPixel}px`

  const barOffsetPixel = bar.startAtTick * TICK_WIDTH_PIXEL
  const barOffsetStyle = `${barOffsetPixel}px`

  const headerColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-700'
    : `bg-${track.color}-700`

  const barColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-500'
    : `bg-${track.color}-500`

  return (
    <div
      key={bar.id}
      className={`left-[${bar.startAtTick * TICK_WIDTH_PIXEL}px] absolute z-10`}
      style={{ width: barWidthStyle, left: barOffsetStyle }}
    >
      <div
        className={`flex flex-col h-20 min-h-20 max-h-20 ${barColor} opacity-80 rounded-md cursor-grab`}
        style={{ width: barLengthPixel }}
        onClick={() => onSelectBar(bar)}
        onDoubleClick={() => onBarDetails(bar)}
      >
        <div
          className={`flex flex-row ${headerColor} pl-2 rounded-t-md text-white text-sm font-bold select-none`}
        >
          {bar.title}
        </div>
      </div>
    </div>
  )
}
