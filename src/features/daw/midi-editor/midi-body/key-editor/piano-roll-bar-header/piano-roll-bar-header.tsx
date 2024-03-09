import { Bar } from '../../../../../../model/bar/bar'
import { Track } from '../../../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../../../playlist/constants'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../../constants'

export const PianoRollBarHeader = ({
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

  return (
    <div
      key={bar.id}
      className="sticky z-10"
      style={{
        width: barWidthStyle,
        left: barOffsetStyle,
        top: 0,
      }}
    >
      <div
        className={`flex flex-col rounded-md cursor-grab`}
        style={{ width: barLengthPixel }}
        onClick={() => onSelectBar(bar)}
        onDoubleClick={() => onBarDetails(bar)}
      >
        <div
          className={`flex flex-row bg-${track.color}-700 rounded-t-md`}
          style={{
            height: PIANO_ROLL_BAR_HEADER_HEIGHT,
          }}
        >
          <p className="pl-2 text-white text-sm font-bold select-none">
            {bar.title}
          </p>
        </div>
      </div>
    </div>
  )
}
