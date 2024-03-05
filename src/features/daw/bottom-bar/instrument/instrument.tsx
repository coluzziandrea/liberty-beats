import { useDispatch } from 'react-redux'
import { BottomUpPanel } from '../types/bottom-up-panel'
import {
  closeAllBottomUpPanels,
  selectBottomUpPanel,
} from '../store/bottom-bar-slice'
import { Track } from '../../../../model/track/track'

export const Instrument = ({
  selectedTrack,
  selectedBottomUpPanel,
}: {
  selectedTrack?: Track
  selectedBottomUpPanel: BottomUpPanel | null
}) => {
  const dispatch = useDispatch()
  const isSelected = selectedBottomUpPanel === 'instrument'

  const handleInstrumentSelection = () => {
    if (isSelected) {
      dispatch(closeAllBottomUpPanels())
    } else {
      dispatch(selectBottomUpPanel('instrument'))
    }
  }

  return (
    <div className="flex">
      <button
        disabled={!selectedTrack}
        onClick={handleInstrumentSelection}
        className={`text-xs font-bold  ${!selectedTrack && 'bg-gray-600'} ${
          isSelected && 'bg-white text-black'
        }`}
      >
        Instrument
      </button>
    </div>
  )
}
