import { useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from '../bottom-bar/store/selectors'
import { InstrumentHeader } from './header/instrument-header'
import { InstrumentConfig } from './config/instrument-config'
import { InstrumentKeyboard } from './keyboard/instrument-keyboard'
import { selectSelectedTrack } from '../playlist/store/selectors'
import { selectSelectedOctave } from './store/selectors'

export const InstrumentSetup = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const isSelected = selectedBottomUpPanel === 'instrument'

  const selectedTrack = useSelector(selectSelectedTrack)
  const selectedOctave = useSelector(selectSelectedOctave)

  if (!selectedTrack) return null

  return (
    <div className={`${!isSelected && 'hidden'}`}>
      <div className="flex flex-col gap-2 p-2 bg-stone-900">
        <InstrumentHeader
          selectedTrack={selectedTrack}
          selectedOctave={selectedOctave}
        />

        <InstrumentConfig selectedTrack={selectedTrack} />

        <div className="flex w-full overflow-auto bg-zinc-800">
          <InstrumentKeyboard
            selectedTrack={selectedTrack}
            selectedOctave={selectedOctave}
          />
        </div>
      </div>
    </div>
  )
}
