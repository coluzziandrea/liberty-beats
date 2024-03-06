import { Track } from '../../../../model/track/track'
import { KeyEditor } from './key-editor/key-editor'
import { LeftMenu } from './left-menu/left-menu'

export type MidiBodyProps = {
  selectedTrack: Track
}

export const MidiBody = (props: MidiBodyProps) => {
  console.log(props.selectedTrack)
  return (
    <div className="flex h-full flex-row">
      <div>
        <LeftMenu />
      </div>

      <div>
        <KeyEditor />
      </div>
    </div>
  )
}
