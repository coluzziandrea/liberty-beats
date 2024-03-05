import { useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from '../bottom-bar/store/selectors'
import { InstrumentHeader } from './header/instrument-header'
import { InstrumentConfig } from './config/instrument-config'
import { InstrumentKeyboard } from './keyboard/instrument-keyboard'
import { selectSelectedTrack } from '../playlist/store/selectors'

export const InstrumentSetup = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const isSelected = selectedBottomUpPanel === 'instrument'

  const selectedTrack = useSelector(selectSelectedTrack)

  if (!selectedTrack) return null

  return (
    <div className={`${!isSelected && 'hidden'}`}>
      <div className="flex flex-col gap-2 p-2">
        <InstrumentHeader selectedTrack={selectedTrack} />

        <InstrumentConfig selectedTrack={selectedTrack} />

        <div className="flex w-full">
          <InstrumentKeyboard />
        </div>
      </div>
    </div>
  )
}
