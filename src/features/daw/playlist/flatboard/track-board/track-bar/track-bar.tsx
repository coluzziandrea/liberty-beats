import { Bar } from '../../../../../../model/bar/bar'
import { Track } from '../../../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../../constants'

export const TrackBar = ({ track, bar }: { track: Track; bar: Bar }) => {
  const barLengthPixel = (bar.endAtTick - bar.startAtTick) * TICK_WIDTH_PIXEL
  const barWidthStyle = `${barLengthPixel}px`

  const barOffsetPixel = bar.startAtTick * TICK_WIDTH_PIXEL
  const barOffsetStyle = `${barOffsetPixel}px`

  return (
    <div
      key={bar.id}
      className={`left-[${bar.startAtTick * TICK_WIDTH_PIXEL}px] absolute z-10`}
      style={{ width: barWidthStyle, left: barOffsetStyle }}
    >
      <div
        className={`flex flex-col h-24 min-h-24 max-h-24 bg-${track.color}-500 opacity-80 rounded-md`}
        style={{ width: barLengthPixel }}
      >
        <div
          className={`flex flex-row bg-${track.color}-700 pl-2 rounded-t-md text-white text-sm font-bold select-none`}
        >
          {bar.title}
        </div>
      </div>
    </div>
  )
}