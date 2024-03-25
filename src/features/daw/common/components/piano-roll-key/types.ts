import { Bar } from '../../../../../model/bar/bar'
import { Key } from '../../../../../model/note/key/key'
import { Note } from '../../../../../model/note/note'
import { Track } from '../../../../../model/track/track'

export type PianoRollKeyProps = {
  note: Note
  bar: Bar
  track: Track
  showedKeys: Readonly<Key[]>
  beatWidth: number
  keyHeight: number
  editable?: boolean
  nonMutedColorTailwindClass?: string
}
