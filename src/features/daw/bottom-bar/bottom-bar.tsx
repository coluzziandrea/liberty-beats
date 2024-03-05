import { useSelector } from 'react-redux'
import { Instrument } from './instrument/instrument'
import { selectSelectedBottomUpPanel } from './store/selectors'
import { selectSelectedTrack } from '../playlist/store/selectors'

export const BottomBar = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const selectedTrack = useSelector(selectSelectedTrack)
  return (
    <div className="flex flex-row p-1">
      <Instrument
        selectedTrack={selectedTrack}
        selectedBottomUpPanel={selectedBottomUpPanel}
      />
    </div>
  )
}
