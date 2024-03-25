import { useDispatch } from 'react-redux'

import { PianoRollKeyProps } from '../types'
import { useHorizontalResize } from '../../../hooks/useHorizontalResize'
import { useDebounce } from '../../../hooks/useDebounce'
import { TICK_WIDTH_PIXEL } from '../../../../playlist/constants'
import { resizeNote } from '../../../../playlist/store/playlist-slice'
import { useEffect } from 'react'
import { useDragAndDrop } from '../../../hooks/useDragAndDrop'

export const EditablePianoRollKey = ({
  note,
  bar,
  track,
  beatWidth,
  onNoteSelect,
}: PianoRollKeyProps) => {
  const {
    elementWidth: noteLengthPixel,
    setElementWidth,
    handleResizeMouseDown,
  } = useHorizontalResize(note.durationTicks * beatWidth)

  const dispatch = useDispatch()
  const debouncedNoteLengthPixel = useDebounce(noteLengthPixel, 500)

  const { handleDragStart } = useDragAndDrop({
    type: 'drag_note',
    bar,
    track,
    note,
  })

  useEffect(() => {
    const newDurationTicks = Math.floor(noteLengthPixel / TICK_WIDTH_PIXEL)
    if (newDurationTicks === note.durationTicks) return

    dispatch(
      resizeNote({
        trackId: track.id,
        barId: bar.id,
        noteId: note.id,
        newDurationTicks,
      })
    )
    setElementWidth(newDurationTicks * TICK_WIDTH_PIXEL)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNoteLengthPixel, dispatch, track.id])

  return (
    <div
      className="h-full"
      onDragStart={handleDragStart}
      draggable
      style={{
        width: `${noteLengthPixel}px`,
      }}
    >
      <div className="relative w-full h-full">
        <div className="w-full h-full" onClick={onNoteSelect} />
        <div
          className="absolute z-30 top-0 right-0 h-full w-2 cursor-ew-resize"
          onMouseDown={handleResizeMouseDown}
        />
      </div>
    </div>
  )
}
