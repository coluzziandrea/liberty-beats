import { FaItunesNote } from 'react-icons/fa6'
import { Scale } from '../../../../../../model/scale/scale'
import { selectSelectedTrack } from '../../../../playlist/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectScaleViewEnabled,
  selectSelectedScale,
} from '../../../store/selectors'
import {
  selectScale,
  toggleScaleViewEnabled,
} from '../../../store/midi-editor-slice'
import { ScaleSelector } from '../../../../common/components/scale-selector/scale-selector'

export const LeftMenuScaleView = () => {
  const selectedTrack = useSelector(selectSelectedTrack)
  const scaleViewEnabled = useSelector(selectScaleViewEnabled)
  const selectedScale = useSelector(selectSelectedScale)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <FaItunesNote className={`text-${selectedTrack?.color}-500`} />
        <p className="text-sm font-bold">Scale View</p>
      </div>

      <ScaleSelector
        scaleViewEnabled={scaleViewEnabled}
        selectedTrack={selectedTrack}
        selectedScale={selectedScale}
        onToggleScaleViewEnabled={() => dispatch(toggleScaleViewEnabled())}
        onSelectScale={(scale: Scale) => dispatch(selectScale(scale))}
      />
    </div>
  )
}
