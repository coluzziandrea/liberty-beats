import { Key, Note } from '../../../../../model/note/note'
import { Track, TrackUtils } from '../../../../../model/track/track'
import { useMidiEditorDimensions } from '../../../midi-editor/midi-body/key-editor/hooks/useMidiEditorDimensions'

export type PianoRollKeyProps = {
  note: Note
  track: Track
  showedKeys: Readonly<Key[]>
  midiEditorDimensions: ReturnType<typeof useMidiEditorDimensions>
}

export const PianoRollKey = (props: PianoRollKeyProps) => {
  const noteLengthPixel =
    props.note.durationTicks * props.midiEditorDimensions.beatWidth

  const noteLeftOffsetPixel =
    props.note.startsAtRelativeTick * props.midiEditorDimensions.beatWidth

  const noteTopOffsetPixel =
    props.showedKeys.indexOf(props.note.key) *
    props.midiEditorDimensions.keyHeight

  const noteColor = TrackUtils.isTrackEffectivelyMuted(props.track)
    ? 'bg-gray-400'
    : `bg-${props.track.color}-500`

  return (
    <div
      className={`absolute ${noteColor} z-20`}
      style={{
        height: `${props.midiEditorDimensions.keyHeight}px`,
        width: `${noteLengthPixel}px`,
        left: `${noteLeftOffsetPixel}px`,
        top: `${noteTopOffsetPixel}px`,
      }}
    />
  )
}
