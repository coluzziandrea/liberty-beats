import { Note } from '../../../../../../../model/note/note'

export type PianoRollNoteProps = {
  note: Note
}

export const PianoRollNote = (props: PianoRollNoteProps) => {
  console.log('rendering note', props.note)
  return (
    <div className="absolute h-8 w-20 bg-green-600 z-20 cursor-move">
      {props.note.key}
    </div>
  )
}
