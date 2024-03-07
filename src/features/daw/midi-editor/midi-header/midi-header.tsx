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
    <div className="flex h-full w-full flex-row justify-between divide-x divide-slate-600">
      <div className="flex flex-row h-full justify-between divide-x divide-slate-600 max-w-72 min-w-72">
        <div
          className="flex flex-grow cursor-pointer items-center justify-center"
          onClick={() => dispatch(closeAllBottomUpPanels())}
        >
          <p>X</p>
        </div>
        <div className="flex w-[85%] items-center justify-center">
          <p className="font-semibold text-md">{selectedTrack.title}</p>
        </div>
      </div>

      <div className="flex flex-grow overflow-x-scroll no-scrollbar pl-2">
        <Ruler />
      </div>
    </div>
  )
}
