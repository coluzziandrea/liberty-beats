import { FaItunesNote } from 'react-icons/fa6'
import {
  SCALE_KEYS,
  SCALE_TYPES,
  ScaleKey,
  ScaleType,
} from '../../../../../../model/scale/scale'
import { selectSelectedTrack } from '../../../../playlist/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from '../../../../common/components/switch/switch'
import {
  selectScaleViewEnabled,
  selectSelectedScale,
} from '../../../store/selectors'
import {
  selectScale,
  toggleScaleViewEnabled,
} from '../../../store/midi-editor-slice'

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

      <div className="flex flex-row items-center gap-2">
        <Switch
          checked={scaleViewEnabled}
          onChange={() => dispatch(toggleScaleViewEnabled())}
          mainColor={selectedTrack?.color}
        />

        <div className="flex flex-row gap-1">
          <select
            className="text-sm"
            defaultValue={selectedScale?.key}
            onChange={(e) => {
              dispatch(
                selectScale({
                  key: e.currentTarget.value as ScaleKey,
                  type: selectedScale?.type as ScaleType,
                })
              )
            }}
          >
            {SCALE_KEYS.map((scaleKey) => (
              <option key={scaleKey} value={scaleKey}>
                {scaleKey}
              </option>
            ))}
          </select>
          <select
            className="text-sm"
            onChange={(e) => {
              dispatch(
                selectScale({
                  key: selectedScale?.key as ScaleKey,
                  type: e.currentTarget.value as ScaleType,
                })
              )
            }}
            defaultValue={selectedScale?.type}
          >
            {SCALE_TYPES.map((scaleType) => (
              <option key={scaleType} value={scaleType}>
                {scaleType}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
