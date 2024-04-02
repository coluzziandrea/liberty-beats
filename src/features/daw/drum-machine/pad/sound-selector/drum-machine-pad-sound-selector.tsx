import { DrumSoundUtils } from '../../../../../model/drums/sound/drums-sound'
import { TRACK_COLORS } from '../../../../../model/track/track-color'
import { DrumMachinePadProps } from '../drum-machine-pad'
import { DrumMachineCategoryIcon } from './category/drum-category-icon'
import { RiArrowDropDownLine } from 'react-icons/ri'

export const DrumMachinePadSoundSelector = ({
  selectedTrack,
}: DrumMachinePadProps) => {
  const sounds = DrumSoundUtils.getDrumsSoundSetByPreset(
    selectedTrack.instrumentPreset
  )
  const selectedSounds =
    selectedTrack.trackDrums?.selectedSounds || sounds.slice(0, 7)
  return (
    <div className="flex flex-col gap-1">
      {selectedSounds.map((sound, index) => {
        return (
          <div
            key={index}
            className="flex flex-row group items-center justify-start h-8 gap-2 select-none cursor-pointer bg-slate-900 hover:bg-slate-700"
            onClick={() => {
              console.log('change sound', sound)
            }}
          >
            <div
              className={`w-[2px] h-full group-hover:bg-${TRACK_COLORS[index]}-500`}
            />
            <div
              className={`h-full py-1 w-fit text-${TRACK_COLORS[index]}-500 `}
            >
              <DrumMachineCategoryIcon
                category={sound.category}
                className="w-6 h-full"
              />
            </div>
            <div className="text-sm font-bold flex-grow">{sound.name}</div>

            <RiArrowDropDownLine />
          </div>
        )
      })}
    </div>
  )
}
