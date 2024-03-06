import { Track } from '../../../../model/track/track'
import { LeftMenu } from './left-menu/left-menu'

export type MidiBodyProps = {
  selectedTrack: Track
}

export const MidiBody = (props: MidiBodyProps) => {
  console.log(props.selectedTrack)
  return (
    <div className="flex flex-row">
      <div>
        <LeftMenu />
      </div>
    </div>
  )
}
