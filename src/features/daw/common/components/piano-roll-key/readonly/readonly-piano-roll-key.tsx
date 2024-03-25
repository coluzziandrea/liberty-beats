import { PianoRollKeyProps } from '../types'

export const ReadonlyPianoRollKey = ({
  note,
  beatWidth,
}: PianoRollKeyProps) => {
  const noteLengthPixel = note.durationTicks * beatWidth

  return (
    <div
      style={{
        width: `${noteLengthPixel}px`,
      }}
    />
  )
}
