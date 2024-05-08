import { useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from '../bottom-bar/store/selectors'
import { selectSelectedTrack } from '../playlist/store/selectors'
import { MidiHeader } from './midi-header/midi-header'
import { MidiBody } from './midi-body/midi-body'

export const MidiEditor = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const isSelected = selectedBottomUpPanel === 'midiEditor'

  const selectedTrack = useSelector(selectSelectedTrack)

  if (!selectedTrack) return null

  return (
    <div className={`${!isSelected && 'hidden'}`}>
      <div className="flex flex-col bg-stone-200 dark:bg-stone-900  h-96 divide-y divide-slate-600 border-t border-slate-600 mx-1 px-2">
        <div className="flex h-[15%] w-full">
          <MidiHeader selectedTrack={selectedTrack} />
        </div>

        <div className="flex h-[85%] overflow-auto">
          <MidiBody />
        </div>
      </div>
    </div>
  )
}
