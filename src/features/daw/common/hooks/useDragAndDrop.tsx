import { Bar } from '../../../../model/bar/bar'
import { KEYS, Key } from '../../../../model/note/key/key'
import { Note } from '../../../../model/note/note'
import { Track } from '../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../playlist/constants'

export type UseDragBarParams = {
  type: 'drag_bar'
  bar: Bar
  track: Track
}

export type UseDragNoteParams = {
  type: 'drag_note'
  bar: Bar
  track: Track
  note: Note
}

export type UseDropBarParams = {
  type: 'drop_bar'
  onDropBar: (
    barId: string,
    fromTrackId: string,
    newStartAtTick: number
  ) => void
}

export type UseDropNoteParams = {
  type: 'drop_note'
  singleKeyHeight: number
  gridPaddingTop: number
  onDropNote: (
    noteId: string,
    fromBarId: string,
    trackId: string,
    newStartAtTick: number,
    newKey: Key
  ) => void
}

export type UseDragAndDropParams =
  | UseDragNoteParams
  | UseDragBarParams
  | UseDropBarParams
  | UseDropNoteParams

export const useDragAndDrop = (props: UseDragAndDropParams) => {
  const handleDragStart = (e: React.DragEvent) => {
    if (props.type === 'drop_bar' || props.type === 'drop_note') return

    const xPositionWithinElement =
      e.clientX - e.currentTarget.getBoundingClientRect().left
    const relativeTick = Math.floor(xPositionWithinElement / TICK_WIDTH_PIXEL)

    e.dataTransfer.effectAllowed = 'move'
    // these will be used to identify the bar when dropping over the piano roll
    e.dataTransfer.setData('dragging/bar_id', props.bar.id)
    e.dataTransfer.setData('dragging/track_id', props.track.id)
    e.dataTransfer.setData('dragging/relative_tick', relativeTick.toString())

    if (props.type === 'drag_note') {
      e.dataTransfer.setData('dragging/note_id', props.note.id)
    }
  }

  const handleOnDrop = (e: React.DragEvent) => {
    if (props.type === 'drag_note' || props.type === 'drag_bar') return

    const barId = e.dataTransfer.getData('dragging/bar_id')
    const fromTrackId = e.dataTransfer.getData('dragging/track_id')
    const startDraggingTick = e.dataTransfer.getData('dragging/relative_tick')

    const mouseXPositionWithinTrack =
      e.clientX - e.currentTarget.getBoundingClientRect().left
    const mouseSelectedTick = Math.floor(
      mouseXPositionWithinTrack / TICK_WIDTH_PIXEL
    )
    // the new startAtTick will be the tick selected by mouse taking into consideration the relative tick where the bar was grabbed
    const newStartAtTick = Math.max(
      mouseSelectedTick - parseInt(startDraggingTick),
      0
    )

    if (props.type === 'drop_bar') {
      props.onDropBar(barId, fromTrackId, newStartAtTick)
    } else if (props.type === 'drop_note') {
      const noteId = e.dataTransfer.getData('dragging/note_id')

      let keyIndex = Math.floor(
        (e.clientY -
          e.currentTarget.getBoundingClientRect().top -
          props.gridPaddingTop) /
          props.singleKeyHeight
      )
      keyIndex = Math.max(0, keyIndex)

      // reversing because of the way the keys are displayed in the piano roll
      const reverseKeys = KEYS.slice().reverse()

      props.onDropNote(
        noteId,
        barId,
        fromTrackId,
        newStartAtTick,
        reverseKeys[keyIndex]
      )
    }
  }

  return {
    handleDragStart,
    handleOnDrop,
  }
}
