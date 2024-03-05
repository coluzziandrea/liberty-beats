import { useDispatch } from 'react-redux'
import { BottomUpPanel } from '../types/bottom-up-panel'
import {
  closeAllBottomUpPanels,
  selectBottomUpPanel,
} from '../store/bottom-bar-slice'

export const Instrument = ({
  selectedBottomUpPanel,
}: {
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
        onClick={handleInstrumentSelection}
        className={`text-xs font-bold ${isSelected && 'bg-white text-black'}`}
      >
        Instrument
      </button>
    </div>
  )
}
