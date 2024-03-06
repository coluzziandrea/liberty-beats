import { useDispatch } from 'react-redux'
import { Track } from '../../../../model/track/track'
import { closeAllBottomUpPanels } from '../../bottom-bar/store/bottom-bar-slice'
import { Ruler } from '../../common/components/ruler/ruler'

export type MidiHeaderProps = {
  selectedTrack: Track
}

export const MidiHeader = ({ selectedTrack }: MidiHeaderProps) => {
  const dispatch = useDispatch()
  return (
    <div className="flex h-full w-full flex-row justify-between">
      <div
        className="cursor-pointer w-[5%]"
        onClick={() => dispatch(closeAllBottomUpPanels())}
      >
        <p>X</p>
      </div>
      <div className="flex w-[10%]">
        <p className="font-semibold text-md">{selectedTrack.title}</p>
      </div>

      <div className="flex w-[85%] overflow-x-scroll no-scrollbar">
        <Ruler />
      </div>
    </div>
  )
}
