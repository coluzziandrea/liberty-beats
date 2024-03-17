import { Key } from '../../../../../model/note/key/key'
import { Note } from '../../../../../model/note/note'
import { Track, TrackUtils } from '../../../../../model/track/track'

export type PianoRollKeyProps = {
  note: Note
  track: Track
  showedKeys: Readonly<Key[]>
  beatWidth: number
  keyHeight: number
  nonMutedColorTailwindClass?: string
}

export const PianoRollKey = ({
  note,
  track,
  showedKeys,
  beatWidth,
  keyHeight,
  nonMutedColorTailwindClass,
}: PianoRollKeyProps) => {
  const noteLengthPixel = note.durationTicks * beatWidth

  const noteLeftOffsetPixel = note.startsAtRelativeTick * beatWidth

  const noteTopOffsetPixel = showedKeys.indexOf(note.key) * keyHeight

  const noteColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-400'
    : nonMutedColorTailwindClass
    ? nonMutedColorTailwindClass
    : `bg-${track.color}-500`

  return (
    <div
      className={`absolute ${noteColor} z-20`}
      style={{
        height: `${keyHeight}px`,
        width: `${noteLengthPixel}px`,
        left: `${noteLeftOffsetPixel}px`,
        top: `${noteTopOffsetPixel}px`,
      }}
    />
  )
}
