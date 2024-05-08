import { useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from '../bottom-bar/store/selectors'
import { selectSelectedTrack } from '../playlist/store/selectors'
import { DrumMachineHeader } from './header/drum-machine-header'
import { DrumMachineConfig } from './config/drum-machine-config'
import { DrumMachinePad } from './pad/drum-machine-pad'

export const DrumMachine = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const isSelected = selectedBottomUpPanel === 'drumMachine'

  const selectedTrack = useSelector(selectSelectedTrack)

  if (!selectedTrack) return null

  return (
    <div className={`${!isSelected && 'hidden'}`}>
      <div className="flex flex-col bg-stone-200 dark:bg-stone-900 h-96 divide-y divide-slate-600 border-t border-slate-600 mx-1 px-2">
        <div className="flex h-[15%] w-full">
          <DrumMachineHeader selectedTrack={selectedTrack} />
        </div>

        <div className="flex h-[15%] w-full">
          <DrumMachineConfig selectedTrack={selectedTrack} />
        </div>

        <div className="flex w-full flex-grow overflow-auto bg-zinc-200 dark:bg-zinc-800">
          <DrumMachinePad selectedTrack={selectedTrack} />
        </div>
      </div>
    </div>
  )
}
