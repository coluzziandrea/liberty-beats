import { SCALE_KEYS, SCALE_TYPES } from '../../../../model/scale/scale'
import { Track } from '../../../../model/track/track'

export type InstrumentConfigProps = {
  selectedTrack: Track
}

export const InstrumentConfig = ({ selectedTrack }: InstrumentConfigProps) => {
  return (
    <div className="flex flex-row justify-between gap-4">
      <div className="flex flex-row items-center gap-2">
        <p>{selectedTrack.instrumentPreset.instrument} Preset</p>
        <div>{selectedTrack.instrumentPreset.name}</div>
        <div>
          <button>{'<-'}</button>
          <button>{'->'}</button>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <label>Scale</label>

        <select>
          {SCALE_KEYS.map((scaleKey) => (
            <option key={scaleKey} value={scaleKey}>
              {scaleKey}
            </option>
          ))}
        </select>

        <select>
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
