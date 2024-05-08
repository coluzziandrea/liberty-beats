import { useMidiEditorDimensions } from '../hooks/useMidiEditorDimensions'
import { Key } from '../../../../../../model/note/key/key'
import { useDragAndDrop } from '../../../../common/hooks/useDragAndDrop'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../../constants'
import { useDispatch } from 'react-redux'
import { moveNote } from '../../../../playlist/store/playlist-slice'
import { GridCanvas } from './grid-canvas/grid-canvas'

export type MidiEditorKeyGridProps = {
  showedKeys: Readonly<Key[]>

  cursorStyle?: 'default' | 'add'

  onKeyClick?: (key: Key, beat: number) => void
  onKeyDoubleClick?: (key: Key, beat: number) => void
}

export const MidiEditorKeyGrid = ({
  showedKeys,
  onKeyClick,
  cursorStyle,
  onKeyDoubleClick,
}: MidiEditorKeyGridProps) => {
  const midiEditorDimensions = useMidiEditorDimensions()
  const dispatch = useDispatch()

  const { handleOnDrop } = useDragAndDrop({
    type: 'drop_note',
    singleKeyHeight: midiEditorDimensions.keyHeight,
    gridPaddingTop: PIANO_ROLL_BAR_HEADER_HEIGHT,
    onDropNote: (noteId, fromBarId, trackId, newStartAtTick, newKey) => {
      dispatch(
        moveNote({
          noteId,
          fromBarId,
          trackId,
          newStartAtTick,
          newKey,
        })
      )
    },
  })

  const getKeyFromClick = (e: MouseEvent, boundigRect: DOMRect) => {
    const gridClickY =
      e.clientY - boundigRect.top - midiEditorDimensions.barHeaderHeight

    const keyIndex = Math.floor(gridClickY / midiEditorDimensions.keyHeight)
    return showedKeys[keyIndex]
  }

  const getTickFromClick = (e: MouseEvent, boundigRect: DOMRect) => {
    const gridClickX = e.clientX - boundigRect.left
    return Math.floor(gridClickX / midiEditorDimensions.beatWidth)
  }

  const onDoubleClick = (e: MouseEvent, boundigRect: DOMRect) => {
    onKeyDoubleClick &&
      onKeyDoubleClick(
        getKeyFromClick(e, boundigRect),
        getTickFromClick(e, boundigRect)
      )
  }

  const onClick = (e: MouseEvent, boundigRect: DOMRect) => {
    onKeyClick &&
      onKeyClick(
        getKeyFromClick(e, boundigRect),
        getTickFromClick(e, boundigRect)
      )
  }

  return (
    <GridCanvas
      onDrop={handleOnDrop}
      showedKeys={showedKeys}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      cursorStyle={cursorStyle}
      midiEditorDimensions={midiEditorDimensions}
    />
  )
}
