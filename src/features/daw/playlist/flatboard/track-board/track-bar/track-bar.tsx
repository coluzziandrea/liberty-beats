import { useEffect } from 'react'
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
import { useDispatch } from 'react-redux'
import { resizeBar } from '../../../store/playlist-slice'
import { useDebounce } from '../../../../common/hooks/useDebounce'
import { useHorizontalResize } from '../../../../common/hooks/useHorizontalResize'
import { useDragAndDrop } from '../../../../common/hooks/useDragAndDrop'

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
  const {
    elementWidth: barLengthPixel,
    setElementWidth,
    handleResizeMouseDown,
  } = useHorizontalResize(bar.durationTicks * TICK_WIDTH_PIXEL)

  const dispatch = useDispatch()
  const debouncedBarLength = useDebounce(barLengthPixel, 500)

  useEffect(() => {
    const newDurationTicks = Math.floor(barLengthPixel / TICK_WIDTH_PIXEL)
    if (newDurationTicks === bar.durationTicks) return

    dispatch(resizeBar({ trackId: track.id, barId: bar.id, newDurationTicks }))
    setElementWidth(newDurationTicks * TICK_WIDTH_PIXEL)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedBarLength, dispatch, track.id])

  const barOffsetStyle = `${bar.startAtTick * TICK_WIDTH_PIXEL}px`

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

  const { handleDragStart } = useDragAndDrop({ type: 'drag_bar', bar, track })

  return (
    <div
      key={bar.id}
      className="absolute z-10"
      style={{
        width: barLengthPixel,
        left: barOffsetStyle,
        height: `${TRACK_HEIGHT}px`,
      }}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute flex flex-col ${barColor} opacity-80 rounded-md cursor-grab h-full w-full`}
          onClick={() => onSelectBar(bar)}
          onDoubleClick={() => onBarDetails(bar)}
          draggable
          onDragStart={handleDragStart}
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
                bar={bar}
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
        <div
          className="absolute z-20 right-0 h-full w-2 cursor-ew-resize"
          onMouseDown={handleResizeMouseDown}
        />
      </div>
    </div>
  )
}
