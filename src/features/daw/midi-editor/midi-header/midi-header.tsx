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
      <div
        className="flex cursor-pointer w-[3%] items-center justify-center"
        onClick={() => dispatch(closeAllBottomUpPanels())}
      >
        <p>X</p>
      </div>
      <div className="flex w-[12%] items-center justify-center">
        <p className="font-semibold text-md">{selectedTrack.title}</p>
      </div>

      <div className="flex w-[85%] overflow-x-scroll no-scrollbar">
        <Ruler />
      </div>
    </div>
  )
}
