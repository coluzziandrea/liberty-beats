import { MouseEvent } from 'react'
import { Bar } from '../../../../../../model/bar/bar'
import { Track, TrackUtils } from '../../../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../../../playlist/constants'
import { useMidiEditorDimensions } from '../hooks/useMidiEditorDimensions'
import { PianoRollKey } from '../../../../common/components/piano-roll-key/piano-roll-key'
import { Key } from '../../../../../../model/note/key/key'
import { PianoRollBarHeader } from './header/piano-roll-bar-header'
import { useDragAndDrop } from '../../../../common/hooks/useDragAndDrop'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCurrentTrackNote,
  moveNote,
} from '../../../../playlist/store/playlist-slice'
import { selectNote } from '../../../store/midi-editor-slice'
import {
  selectEditorMode,
  selectSelectedNoteId,
} from '../../../store/selectors'

export type PianoRollBarProps = {
  track: Track
  bar: Bar
  showedKeys: Readonly<Key[]>

  onKeyClick: (bar: Bar, key: Key, tick: number) => void
  onKeyDoubleClick: (bar: Bar, key: Key, tick: number) => void
}

export const PianoRollBar = ({
  track,
  bar,
  showedKeys,
  onKeyDoubleClick,
  onKeyClick,
}: PianoRollBarProps) => {
  const midiEditorDimensions = useMidiEditorDimensions()

  const selectedNoteId = useSelector(selectSelectedNoteId)
  const editorMode = useSelector(selectEditorMode)

  const barLengthPixel = bar.durationTicks * TICK_WIDTH_PIXEL
  const barWidthStyle = `${barLengthPixel}px`

  const barOffsetPixel = bar.startAtTick * TICK_WIDTH_PIXEL
  const barOffsetStyle = `${barOffsetPixel}px`

  const dispatch = useDispatch()

  const barColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-400 dark:bg-gray-200'
    : `bg-${track.color}-400 dark:bg-${track.color}-200`

  const getKeyFromClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - rect.top

    const keyIndex = Math.floor(clickY / midiEditorDimensions.keyHeight)

    return showedKeys[keyIndex]
  }

  const getBeatFromClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left

    return Math.floor(clickX / midiEditorDimensions.beatWidth)
  }

  const { handleOnDrop } = useDragAndDrop({
    type: 'drop_note',
    singleKeyHeight: midiEditorDimensions.keyHeight,
    gridPaddingTop: 0,
    onDropNote: (noteId, fromBarId, trackId, newStartAtTick, newKey) => {
      dispatch(
        moveNote({
          noteId,
          fromBarId,
          trackId,
          newStartAtTick: newStartAtTick + bar.startAtTick,
          newKey,
        })
      )
    },
  })

  return (
    <div
      key={bar.id}
      className="absolute"
      style={{
        width: barWidthStyle,
        left: barOffsetStyle,
        height: '100%',
        top: 0,
      }}
    >
      <div
        className={`flex flex-col h-full w-full`}
        style={{ width: barLengthPixel, height: '100%' }}
      >
        <PianoRollBarHeader bar={bar} track={track} />

        <div className="flex-grow relative">
          <div
            className={`absolute left-0 top-0 h-full w-full opacity-30 ${barColor} ${
              editorMode === 'draw' ? 'cursor-cell' : 'cursor-default'
            }`}
            onDoubleClick={(e: MouseEvent<HTMLDivElement>) => {
              onKeyDoubleClick(bar, getKeyFromClick(e), getBeatFromClick(e))
            }}
            onClick={(e: MouseEvent<HTMLDivElement>) => {
              onKeyClick(bar, getKeyFromClick(e), getBeatFromClick(e))
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleOnDrop}
          />
          {bar.notes.map((note) => (
            <PianoRollKey
              key={note.id}
              bar={bar}
              track={track}
              note={note}
              showedKeys={showedKeys}
              beatWidth={midiEditorDimensions.beatWidth}
              keyHeight={midiEditorDimensions.keyHeight}
              editable
              selected={selectedNoteId === note.id}
              cursorStyle={editorMode === 'delete' ? 'pointer' : 'default'}
              onNoteClick={() => {
                if (editorMode === 'delete') {
                  dispatch(deleteCurrentTrackNote(note.id))
                } else {
                  dispatch(selectNote(note.id))
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
