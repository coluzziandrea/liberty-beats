import { PianoRollKeyProps } from './types'
import { EditablePianoRollKey } from './editable/editable-piano-roll-key'
import { ReadonlyPianoRollKey } from './readonly/readonly-piano-roll-key'
import { PianoRollKeySkeleton } from './common/piano-roll-key-skeleton'

export const PianoRollKey = ({ editable, ...props }: PianoRollKeyProps) => {
  return editable ? (
    <PianoRollKeySkeleton PianoRollKeyBody={EditablePianoRollKey} {...props} />
  ) : (
    <PianoRollKeySkeleton PianoRollKeyBody={ReadonlyPianoRollKey} {...props} />
  )
}
