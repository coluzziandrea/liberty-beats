import { Track } from '../../../../model/track/track'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export type DrumMachineConfigProps = {
  selectedTrack: Track
}

export const DrumMachineConfig = ({
  selectedTrack,
}: DrumMachineConfigProps) => {
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
    </div>
  )
}
