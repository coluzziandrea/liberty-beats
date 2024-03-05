import { useDispatch } from 'react-redux'
import { Track } from '../../../../model/track/track'
import { closeAllBottomUpPanels } from '../../bottom-bar/store/bottom-bar-slice'

export type InstrumentHeaderProps = {
  selectedTrack: Track
}

export const InstrumentHeader = ({ selectedTrack }: InstrumentHeaderProps) => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-row justify-between">
      <div
        className="cursor-pointer"
        onClick={() => dispatch(closeAllBottomUpPanels())}
      >
        <p>X</p>
      </div>
      <div className="flex">
        <p className="font-semibold text-md">{selectedTrack.title}</p>
      </div>
      <div>
        <button>{'-'}</button>
        <span>{'Octave ' + 1}</span>
        <button>{'+'}</button>
      </div>
    </div>
  )
}
