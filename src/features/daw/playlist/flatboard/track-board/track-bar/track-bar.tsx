import { Bar } from '../../../../../../model/bar/bar'
import { NoteUtils } from '../../../../../../model/note/note'
import { Track, TrackUtils } from '../../../../../../model/track/track'
import { PianoRollKey } from '../../../../common/components/piano-roll-key/piano-roll-key'
import {
  FLATBOARD_BAR_HEADER_HEIGHT,
  MIN_FLATBOARD_KEY_HEIGHT,
  TICK_WIDTH_PIXEL,
  TRACK_HEIGHT,
} from '../../../constants'

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

  const showedKeys = NoteUtils.getSmallerKeySetContainingNotes(
    bar.notes,
    2
  ).reverse()

  const keyHeight = Math.min(
    (TRACK_HEIGHT - FLATBOARD_BAR_HEADER_HEIGHT) / showedKeys.length,
    MIN_FLATBOARD_KEY_HEIGHT
  )

  return (
    <div
      key={bar.id}
      className="absolute z-10"
      style={{ width: barWidthStyle, left: barOffsetStyle }}
    >
      <div
        className={`flex flex-col ${barColor} opacity-80 rounded-md cursor-grab`}
        style={{ width: barLengthPixel, height: `${TRACK_HEIGHT}px` }}
        onClick={() => onSelectBar(bar)}
        onDoubleClick={() => onBarDetails(bar)}
      >
        <div
          className={`flex flex-row ${headerColor} pl-2 rounded-t-md text-white text-sm font-bold select-none`}
          style={{
            height: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
            minHeight: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
            maxHeight: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
          }}
        >
          {bar.title}
        </div>

        <div className="flex-grow w-full h-full relative">
          {bar.notes.map((note) => (
            <PianoRollKey
              key={note.id}
              track={track}
              note={note}
              showedKeys={showedKeys}
              beatWidth={TICK_WIDTH_PIXEL}
              keyHeight={keyHeight}
              nonMutedColorTailwindClass="bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
