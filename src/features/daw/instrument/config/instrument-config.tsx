import { Track } from '../../../../model/track/track'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { ScaleSelector } from '../../common/components/scale-selector/scale-selector'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectScaleViewEnabled,
  selectSelectedScale,
} from '../../midi-editor/store/selectors'
import {
  selectScale,
  toggleScaleViewEnabled,
} from '../../midi-editor/store/midi-editor-slice'
import { Scale } from '../../../../model/scale/scale'

export type InstrumentConfigProps = {
  selectedTrack: Track
}

export const InstrumentConfig = ({ selectedTrack }: InstrumentConfigProps) => {
  const scaleViewEnabled = useSelector(selectScaleViewEnabled)
  const selectedScale = useSelector(selectSelectedScale)
  const dispatch = useDispatch()

  console.log(selectedScale)

  return (
    <div className="flex flex-row justify-between gap-4">
      <div className="flex flex-row items-center gap-2">
        <p>{selectedTrack.instrumentPreset.instrument} Preset</p>
        <div>{selectedTrack.instrumentPreset.name}</div>
        <div>
          <button>
            <IoIosArrowBack />
          </button>
          <button>
            <IoIosArrowForward />
          </button>
        </div>
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
