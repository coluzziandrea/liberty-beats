import { useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from '../bottom-bar/store/selectors'
import { selectSelectedTrack } from '../playlist/store/selectors'
import { MidiHeader } from './midi-header/midi-header'

export const MidiEditor = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const isSelected = selectedBottomUpPanel === 'midiEditor'

  const selectedTrack = useSelector(selectSelectedTrack)

  if (!selectedTrack) return null

  return (
    <div className={`${!isSelected && 'hidden'}`}>
      <div className="flex flex-col gap-2 p-2 bg-stone-900">
        <MidiHeader selectedTrack={selectedTrack} />
      </div>
    </div>
  )
}
