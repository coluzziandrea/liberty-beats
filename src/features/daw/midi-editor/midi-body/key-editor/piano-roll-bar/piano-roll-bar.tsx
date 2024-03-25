import { MouseEvent } from 'react'
import { Bar } from '../../../../../../model/bar/bar'
import { Track, TrackUtils } from '../../../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../../../playlist/constants'
import { useMidiEditorDimensions } from '../hooks/useMidiEditorDimensions'
import { PianoRollKey } from '../../../../common/components/piano-roll-key/piano-roll-key'
import { Key } from '../../../../../../model/note/key/key'
import { PianoRollBarHeader } from './header/piano-roll-bar-header'
import { useDragAndDrop } from '../../../../common/hooks/useDragAndDrop'
import { useDispatch } from 'react-redux'
import { moveNote } from '../../../../playlist/store/playlist-slice'

export type PianoRollBarProps = {
  track: Track
  bar: Bar
  showedKeys: Readonly<Key[]>
  onAddKey: (bar: Bar, key: Key, startAtRelativeTick: number) => void
}

export const PianoRollBar = ({
  track,
  bar,
  showedKeys,
  onAddKey,
}: PianoRollBarProps) => {
  const midiEditorDimensions = useMidiEditorDimensions()

  const barLengthPixel = bar.durationTicks * TICK_WIDTH_PIXEL
  const barWidthStyle = `${barLengthPixel}px`

  const barOffsetPixel = bar.startAtTick * TICK_WIDTH_PIXEL
  const barOffsetStyle = `${barOffsetPixel}px`

  const dispatch = useDispatch()

  const barColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-200'
    : `bg-${track.color}-200`

  const onBarEmptyDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect()
    const barDoubleClickX = e.clientX - rect.left
    const barDoubleClickY = e.clientY - rect.top

    const keyIndex = Math.floor(
      barDoubleClickY / midiEditorDimensions.keyHeight
    )

    const relativeBeat = Math.floor(
      barDoubleClickX / midiEditorDimensions.beatWidth
    )
    onAddKey(bar, showedKeys[keyIndex], relativeBeat)
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
            className={`absolute left-0 top-0 h-full w-full opacity-30 ${barColor}`}
            onDoubleClick={onBarEmptyDoubleClick}
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}
