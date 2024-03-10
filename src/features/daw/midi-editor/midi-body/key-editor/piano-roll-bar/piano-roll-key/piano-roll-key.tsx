import { Key, Note } from '../../../../../../../model/note/note'
import { Track } from '../../../../../../../model/track/track'
import { useMidiEditorDimensions } from '../../hooks/useMidiEditorDimensions'

export type PianoRollNoteProps = {
  note: Note
  track: Track
  showedKeys: Readonly<Key[]>
  midiEditorDimensions: ReturnType<typeof useMidiEditorDimensions>
}

export const PianoRollNote = (props: PianoRollNoteProps) => {
  const noteLengthPixel =
    props.note.durationTicks * props.midiEditorDimensions.beatWidth

  const noteLeftOffsetPixel =
    props.note.startsAtRelativeTick * props.midiEditorDimensions.beatWidth

  const noteTopOffsetPixel =
    props.showedKeys.indexOf(props.note.key) *
    props.midiEditorDimensions.keyHeight

  return (
    <div
      className={`absolute bg-${props.track.color}-500 z-20`}
      style={{
        height: `${props.midiEditorDimensions.keyHeight}px`,
        width: `${noteLengthPixel}px`,
        left: `${noteLeftOffsetPixel}px`,
        top: `${noteTopOffsetPixel}px`,
      }}
    />
  )
}
