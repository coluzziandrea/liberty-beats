import { Bar } from '../../../../../../model/bar/bar'
import { Track } from '../../../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../../../playlist/constants'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../../constants'

export const PianoRollBar = ({
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
      className="absolute z-10"
      style={{
        width: barWidthStyle,
        left: barOffsetStyle,
        height: '100%',
        top: 0,
      }}
    >
      <div
        className={`flex flex-col rounded-md`}
        style={{ width: barLengthPixel, height: '100%' }}
        onClick={() => onSelectBar(bar)}
        onDoubleClick={() => onBarDetails(bar)}
      >
        <div
          className={`sticky bg-${track.color}-700 rounded-t-md cursor-grab z-20 pl-2`}
          style={{
            top: 0,
            height: PIANO_ROLL_BAR_HEADER_HEIGHT,
          }}
        >
          <p className="text-white text-sm font-bold select-none">
            {bar.title}
          </p>
        </div>

        <div
          className={`flex flex-grow opacity-30 bg-${track.color}-200 rounded-b-md`}
        />
      </div>
    </div>
  )
}
