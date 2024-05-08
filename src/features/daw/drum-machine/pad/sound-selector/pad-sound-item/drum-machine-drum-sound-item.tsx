import { RiArrowDropDownLine } from 'react-icons/ri'
import { DrumMachineCategoryIcon } from '../category/drum-category-icon'
import { SoundSelectorPopup } from './selector-popup/sound-selector-popup'
import { TRACK_COLORS } from '../../../../../../model/track/track-color'
import { useState } from 'react'
import { DrumSound } from '../../../../../../model/drums/sound/drums-sound'
import { Track } from '../../../../../../model/track/track'

export type DrumMachinePadSoundItemProps = {
  selectedTrack: Track
  sound: DrumSound
  index: number

  onSelectedSound: (sound: DrumSound) => void
}

export const DrumMachinePadSoundItem = ({
  selectedTrack,
  sound,
  index,
  onSelectedSound,
}: DrumMachinePadSoundItemProps) => {
  const [showPopup, setShowPopup] = useState(false)
  return (
    <div className="relative">
      <div
        key={index}
        className="flex flex-row group items-center justify-start h-8 gap-2 select-none cursor-pointer bg-slate-100 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700"
        onClick={() => {
          setShowPopup(!showPopup)
        }}
      >
        <div
          className={`w-[2px] h-full group-hover:bg-${TRACK_COLORS[index]}-500`}
        />
        <div className={`h-full py-1 w-fit text-${TRACK_COLORS[index]}-500 `}>
          <DrumMachineCategoryIcon
            category={sound.category}
            className="w-6 h-full"
          />
        </div>
        <div className="text-sm font-bold flex-grow">{sound.name}</div>

        <RiArrowDropDownLine />
      </div>

      {showPopup && (
        <div
          className="fixed z-30 h-fit w-fit"
          style={{
            marginTop: -40 - index * 30,
          }}
        >
          <SoundSelectorPopup
            onClose={() => setShowPopup(false)}
            currentSoundIndex={index}
            selectedTrack={selectedTrack}
            onSelectedSound={onSelectedSound}
          />
        </div>
      )}
    </div>
  )
}
