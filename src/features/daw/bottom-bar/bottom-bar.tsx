import { useSelector } from 'react-redux'
import { Instrument } from './instrument/instrument'
import { selectSelectedBottomUpPanel } from './store/selectors'

export const BottomBar = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  return (
    <div className="flex flex-row p-1">
      <Instrument selectedBottomUpPanel={selectedBottomUpPanel} />
    </div>
  )
}
