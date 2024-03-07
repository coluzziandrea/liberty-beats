import { Track } from '../../../../model/track/track'
import { KeyEditor } from './key-editor/key-editor'
import { LeftMenu } from './left-menu/left-menu'

export type MidiBodyProps = {
  selectedTrack: Track
}

export const MidiBody = (props: MidiBodyProps) => {
  console.log(props.selectedTrack)
  return (
    <div className="flex h-full w-full flex-row justify-between">
      <div className="flex h-full justify-between divide-x divide-slate-600 max-w-72 min-w-72">
        <LeftMenu />
      </div>

      <div className="flex flex-grow overflow-x-auto">
        <KeyEditor />
      </div>
    </div>
  )
}
