import { TrackDrumPatternSound } from '../../../../../../model/track/drums/track-drums'
import { TRACK_COLORS } from '../../../../../../model/track/track-color'

export type DrumMachinePadPatternProps = {
  patternSounds: TrackDrumPatternSound[]
  soundIndex: number
  activeTickBar: number | null
  onSoundChange: (
    toChangeSoundIndex: number,
    toChangeBeatIndex: number,
    newValue: TrackDrumPatternSound
  ) => void
}

export const DrumMachinePadPattern = ({
  patternSounds,
  soundIndex,
  onSoundChange,
  activeTickBar,
}: DrumMachinePadPatternProps) => {
  const getItemBackground = (indexCol: number) => {
    if (indexCol === activeTickBar) {
      return 'bg-white'
    }
    return Math.floor(indexCol / 4) % 2 === 0 ? 'bg-zinc-600' : 'bg-zinc-700'
  }

  return (
    <div className="flex flex-row gap-1">
      {patternSounds.map((sound, indexCol) => (
        <div
          className={`cursor-pointer h-8 w-8 p-[2px] ${getItemBackground(
            indexCol
          )} hover:bg-${TRACK_COLORS[soundIndex]}-900`}
          key={indexCol}
          onClick={() =>
            onSoundChange(soundIndex, indexCol, sound === 'on' ? 'off' : 'on')
          }
        >
          {sound === 'on' && (
            <div
              className={`w-full h-full bg-${TRACK_COLORS[soundIndex]}-500 rounded-full`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
