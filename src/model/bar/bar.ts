import { Note } from '../note/note'

export interface Bar {
  id: string
  title: string
  startAtTick: number
  endAtTick: number
  notes: Note[]
}
