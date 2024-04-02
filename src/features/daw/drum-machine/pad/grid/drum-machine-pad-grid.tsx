import { TRACK_COLORS } from '../../../../../model/track/track-color'
import { DrumMachinePadProps } from '../drum-machine-pad'

export const DrumMachinePadGrid = ({ selectedTrack }: DrumMachinePadProps) => {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 7 }).map((_, indexRow) => (
        <div className="flex flex-row gap-1">
          {Array.from({ length: 16 }).map((_, indexCol) => (
            <div
              className={`cursor-pointer h-8 w-8 ${
                Math.floor(indexCol / 4) % 2 === 0
                  ? 'bg-zinc-600'
                  : 'bg-zinc-700'
              } hover:bg-${TRACK_COLORS[indexRow]}-900`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
