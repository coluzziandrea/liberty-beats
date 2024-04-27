import { useDispatch } from 'react-redux'
import { NoteUtils } from '../../../../../../model/note/note'
import { useHorizontalResize } from '../../../../common/hooks/useHorizontalResize'
import {
  FLATBOARD_BAR_HEADER_HEIGHT,
  MIN_FLATBOARD_KEY_HEIGHT,
  TICK_WIDTH_PIXEL,
  TRACK_HEIGHT,
} from '../../../constants'
import { TrackBarProps } from './types'
import { useDebounce } from '../../../../common/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { resizeBar, selectTrack } from '../../../store/playlist-slice'
import { TrackUtils } from '../../../../../../model/track/track'
import { useDragAndDrop } from '../../../../common/hooks/useDragAndDrop'

export const useTrackBarData = ({
  track,
  bar,
  onSelectBar,
  onBarDetails,
}: TrackBarProps) => {
  const {
    elementWidth: barLengthPixel,
    setElementWidth,
    handleResizeMouseDown,
  } = useHorizontalResize(bar.durationTicks * TICK_WIDTH_PIXEL)

  const dispatch = useDispatch()
  const debouncedBarLength = useDebounce(barLengthPixel, 500)

  const [menuIsOpen, setMenuIsOpen] = useState(false)

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

  const { handleDragStart } = useDragAndDrop({
    type: 'drag_bar',
    bar,
    track,
  })

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(selectTrack(track))
    if (!menuIsOpen) {
      setMenuIsOpen(true)
    }
  }

  return {
    bar,
    track,
    barLengthPixel,
    barOffsetStyle,
    barColor,
    onSelectBar,
    onBarDetails,
    handleDragStart,
    headerColor,
    showedKeys,
    keyHeight,
    handleResizeMouseDown,
    menuIsOpen,
    onContextMenu,
    menuProps: {
      onClose: () => setMenuIsOpen(false),
      onRename: () => {},
      bar,
      track,
    },
  }
}
