import { useDispatch, useSelector } from 'react-redux'
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
import {
  removeBar,
  renameBar,
  resizeBar,
  setToCopyBar,
} from '../../../store/playlist-slice'
import { TrackUtils } from '../../../../../../model/track/track'
import { useDragAndDrop } from '../../../../common/hooks/useDragAndDrop'
import { selectSelectedBar } from '../../../store/selectors'
import { MdDelete } from 'react-icons/md'
import { FaRegCopy } from 'react-icons/fa'
import { BiRename } from 'react-icons/bi'

export const useTrackBarData = ({
  track,
  bar,
  onSelectBar,
  onBarDetails,
}: TrackBarProps) => {
  const {
    elementWidth: barLengthPixel,
    setElementWidth,
    handleResizeMouseDown: onResizeMouseDown,
  } = useHorizontalResize(bar.durationTicks * TICK_WIDTH_PIXEL)

  const dispatch = useDispatch()
  const debouncedBarLength = useDebounce(barLengthPixel, 500)

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameInput, setRenameInput] = useState(bar.title)

  const selectedBar = useSelector(selectSelectedBar)

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

  const barBorder = selectedBar?.id === bar.id ? 'border-white border-2' : ''

  const showedKeys = NoteUtils.getSmallerKeySetContainingNotes(
    bar.notes,
    2
  ).reverse()

  const keyHeight = Math.min(
    (TRACK_HEIGHT - FLATBOARD_BAR_HEADER_HEIGHT) / showedKeys.length,
    MIN_FLATBOARD_KEY_HEIGHT
  )

  const { handleDragStart: onDragStart } = useDragAndDrop({
    type: 'drag_bar',
    bar,
    track,
  })

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    onSelectBar(bar)
    if (!menuIsOpen) {
      setMenuIsOpen(true)
    }
  }

  return {
    bar,
    track,
    showedKeys,

    isSelected: selectedBar?.id === bar.id,

    style: {
      barLengthPixel,
      barOffsetStyle,
      barColor,
      headerColor,
      keyHeight,
      barBorder,
    },

    onSelectBar,
    onBarDetails,
    onDragStart,
    onResizeMouseDown,
    onContextMenu,

    renameInput: {
      isEnabled: isRenaming,
      value: renameInput,
      onInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setRenameInput(e.target.value),
      onInputBlur: () => {
        setIsRenaming(false)
        dispatch(
          renameBar({
            trackId: track.id,
            barId: bar.id,
            newTitle: renameInput,
          })
        )
      },
    },

    menu: {
      isOpen: menuIsOpen,
      onClose: () => setMenuIsOpen(false),

      items: [
        {
          label: 'Rename',
          icon: <BiRename />,
          action: () => {
            setMenuIsOpen(false)
            setIsRenaming(true)
          },
        },
        {
          label: 'Copy',
          icon: <FaRegCopy />,
          action: () => {
            dispatch(setToCopyBar(bar))
            setMenuIsOpen(false)
          },
        },
        {
          label: 'Delete',
          icon: <MdDelete />,
          action: () => {
            dispatch(removeBar({ trackId: track.id, barId: bar.id }))
          },
        },
      ],
      bar,
      track,
    },
  }
}
