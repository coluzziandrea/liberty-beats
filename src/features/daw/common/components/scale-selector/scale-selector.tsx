import {
  SCALE_KEYS,
  SCALE_TYPES,
  Scale,
  ScaleKey,
  ScaleType,
} from '../../../../../model/scale/scale'
import { Track } from '../../../../../model/track/track'
import { Switch } from '../switch/switch'

export type ScaleSelectorProps = {
  scaleViewEnabled: boolean
  selectedTrack?: Track | null
  selectedScale?: Scale | null

  onToggleScaleViewEnabled: () => void
  onSelectScale: (scale: Scale) => void
}

export const ScaleSelector = ({
  scaleViewEnabled,
  selectedTrack,
  selectedScale,
  onToggleScaleViewEnabled,
  onSelectScale,
}: ScaleSelectorProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Switch
        checked={scaleViewEnabled}
        onChange={onToggleScaleViewEnabled}
        mainColor={selectedTrack?.color}
      />

      <div className="flex flex-row gap-1">
        <select
          className="text-sm"
          value={selectedScale?.key}
          onChange={(e) => {
            onSelectScale({
              key: e.currentTarget.value as ScaleKey,
              type: selectedScale?.type as ScaleType,
            })
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
            onSelectScale({
              key: selectedScale?.key as ScaleKey,
              type: e.currentTarget.value as ScaleType,
            })
          }}
          value={selectedScale?.type}
        >
          {SCALE_TYPES.map((scaleType) => (
            <option key={scaleType} value={scaleType}>
              {scaleType}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
