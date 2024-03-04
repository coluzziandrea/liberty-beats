import { Note } from '../note/note'

export interface Bar {
  id: string
  startAtTick: number
  endAtTick: number
  notes: Note[]
}
