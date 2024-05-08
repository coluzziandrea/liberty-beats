import { useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from '../bottom-bar/store/selectors'
import { InstrumentHeader } from './header/instrument-header'
import { InstrumentConfig } from './config/instrument-config'
import { selectSelectedTrack } from '../playlist/store/selectors'
import { selectSelectedOctave } from './store/selectors'
import { InstrumentKeyboard } from './keyboard/instrument-keyboard'

export const InstrumentSetup = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const isSelected = selectedBottomUpPanel === 'instrument'

  const selectedTrack = useSelector(selectSelectedTrack)
  const selectedOctave = useSelector(selectSelectedOctave)

  if (!selectedTrack) return null

  return (
    <div className={`${!isSelected && 'hidden'}`}>
      <div className="flex flex-col bg-stone-200 dark:bg-stone-900 h-96 divide-y divide-slate-600 border-t border-slate-600 mx-1 px-2">
        <div className="flex h-[15%] w-full">
          <InstrumentHeader
            selectedTrack={selectedTrack}
            selectedOctave={selectedOctave}
          />
        </div>

        <div className="flex h-[15%] w-full">
          <InstrumentConfig selectedTrack={selectedTrack} />
        </div>

        <div className="flex w-full flex-grow overflow-auto bg-zinc-800">
          <InstrumentKeyboard
            selectedTrack={selectedTrack}
            selectedOctave={selectedOctave}
          />
        </div>
      </div>
    </div>
  )
}
