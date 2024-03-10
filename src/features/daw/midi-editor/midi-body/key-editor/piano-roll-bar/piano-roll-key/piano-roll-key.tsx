import { Key } from '../../../../../../../model/note/note'

export type PianoRollKeyProps = {
  key: Key
}

export const PianoRollKey = (props: PianoRollKeyProps) => {
  console.log('rendering key', props.key)
  return <div></div>
}
