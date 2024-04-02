import { Track } from '../../../../model/track/track'
import { DrumMachinePadCommands } from './commands/drum-machine-pad-commands'
import { DrumMachinePadGrid } from './grid/drum-machine-pad-grid'
import { DrumMachinePadSoundSelector } from './sound-selector/drum-machine-pad-sound-selector'

export type DrumMachinePadProps = {
  selectedTrack: Track
}

export const DrumMachinePad = ({ selectedTrack }: DrumMachinePadProps) => {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      <div className="border-[1px] border-slate-400 rounded-lg flex flex-row px-2 py-1 gap-4">
        <DrumMachinePadSoundSelector selectedTrack={selectedTrack} />
        <DrumMachinePadGrid selectedTrack={selectedTrack} />
        <DrumMachinePadCommands selectedTrack={selectedTrack} />
      </div>
    </div>
  )
}
