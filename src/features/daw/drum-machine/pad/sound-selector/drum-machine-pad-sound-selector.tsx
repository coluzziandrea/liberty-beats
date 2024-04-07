import { useDispatch } from 'react-redux'
import { DrumSound } from '../../../../../model/drums/sound/drums-sound'
import { setCurrentTrackDrumsSounds } from '../../../playlist/store/playlist-slice'
import { DrumMachinePadSoundItem } from './pad-sound-item/drum-machine-drum-sound-item'
import { Track } from '../../../../../model/track/track'

export type DrumMachinePadSoundSelectorProps = {
  selectedTrack: Track
  selectedSounds: DrumSound[]
}

export const DrumMachinePadSoundSelector = ({
  selectedSounds,
  selectedTrack,
}: DrumMachinePadSoundSelectorProps) => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col gap-1">
      {selectedSounds.map((sound, index) => {
        return (
          <DrumMachinePadSoundItem
            key={index}
            selectedTrack={selectedTrack}
            sound={sound}
            index={index}
            onSelectedSound={(sound) => {
              const newSounds = selectedSounds.map((s, i) =>
                i === index ? sound : s
              )
              dispatch(setCurrentTrackDrumsSounds(newSounds))
            }}
          />
        )
      })}
    </div>
  )
}
