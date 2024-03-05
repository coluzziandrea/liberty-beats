import { useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from '../bottom-bar/store/selectors'
import { InstrumentHeader } from './header/instrument-header'
import { InstrumentConfig } from './config/instrument-config'
import { InstrumentKeyboard } from './keyboard/keyboard'

export const InstrumentSetup = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const isSelected = selectedBottomUpPanel === 'instrument'
  return (
    <div className={`${!isSelected && 'hidden'}`}>
      <div className="flex flex-col">
        <InstrumentHeader />

        <InstrumentConfig />

        <InstrumentKeyboard />
      </div>
    </div>
  )
}
