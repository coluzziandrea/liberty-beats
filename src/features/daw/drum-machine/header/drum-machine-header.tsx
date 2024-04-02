import { useDispatch } from 'react-redux'
import { Track } from '../../../../model/track/track'
import { closeAllBottomUpPanels } from '../../bottom-bar/store/bottom-bar-slice'
import { IoClose } from 'react-icons/io5'

export type DrumMachineHeaderProps = {
  selectedTrack: Track
}

export const DrumMachineHeader = ({
  selectedTrack,
}: DrumMachineHeaderProps) => {
  const dispatch = useDispatch()
  return (
    <div className="flex h-full w-full flex-row justify-between divide-x divide-slate-600">
      <div className="flex flex-row h-full justify-between divide-x divide-slate-600 max-w-72 min-w-72">
        <div
          className="flex flex-grow cursor-pointer items-center justify-center"
          onClick={() => dispatch(closeAllBottomUpPanels())}
        >
          <IoClose />
        </div>
        <div className="flex w-[85%] items-center justify-center">
          <p className="font-semibold text-md">{selectedTrack.title}</p>
        </div>
      </div>
    </div>
  )
}
