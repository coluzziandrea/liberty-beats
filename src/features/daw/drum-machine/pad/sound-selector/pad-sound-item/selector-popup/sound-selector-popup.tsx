import { useRef } from 'react'
import { TRACK_DRUM_PATTERN_SIZE } from '../../../../../../../model/track/drums/track-drums'
import {
  DrumSound,
  DrumSoundUtils,
} from '../../../../../../../model/drums/sound/drums-sound'
import { Track } from '../../../../../../../model/track/track'
import { DrumMachineCategoryIcon } from '../../category/drum-category-icon'
import { useCallbackOnOutsideClick } from '../../../../../common/hooks/use-outside-click'
import { useDispatch } from 'react-redux'
import {
  addPlayingKey,
  removeAllPlayingKeys,
  removePlayingKey,
} from '../../../../../instrument/store/instrument-slice'

export type SoundSelectorPopupProps = {
  selectedTrack: Track
  currentSoundIndex: number

  onSelectedSound: (sound: DrumSound) => void
  onClose: () => void
}

export const SoundSelectorPopup = ({
  onClose,
  currentSoundIndex,
  selectedTrack,
  onSelectedSound,
}: SoundSelectorPopupProps) => {
  const dispatch = useDispatch()
  const popupMenuRef = useRef<HTMLDivElement>(null)

  const onClosePopup = () => {
    onClose()
    dispatch(removeAllPlayingKeys(selectedTrack.id))
  }

  useCallbackOnOutsideClick(popupMenuRef, onClosePopup)

  const sounds = DrumSoundUtils.getDrumsSoundSetByPreset(
    selectedTrack.instrumentPreset
  )
  const defaultSounds = sounds.slice(0, TRACK_DRUM_PATTERN_SIZE)
  const selectedSoundsFromStore = selectedTrack.trackDrums?.selectedSounds
  const selectedSounds =
    selectedSoundsFromStore === undefined ||
    selectedSoundsFromStore?.length === 0
      ? defaultSounds
      : selectedSoundsFromStore

  const currentSound = selectedSounds[currentSoundIndex]

  const selectable = [
    currentSound,
    ...sounds.filter((sound) => !selectedSounds.includes(sound)),
  ]

  return (
    <div
      className="w-52 max-h-60 overflow-y-auto flex flex-col bg-zinc-100 dark:bg-zinc-900 shadow-md shadow-zinc-600 rounded-xl "
      ref={popupMenuRef}
    >
      {selectable.map((item, index) => (
        <div
          key={index}
          className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 select-none cursor-pointer flex flex-row gap-2 items-center"
          onClick={() => {
            onClosePopup()
            onSelectedSound(item)
          }}
          onMouseEnter={() => {
            dispatch(
              addPlayingKey({
                key: item.key,
                trackId: selectedTrack.id,
              })
            )
          }}
          onMouseLeave={() => {
            dispatch(
              removePlayingKey({
                key: item.key,
                trackId: selectedTrack.id,
              })
            )
          }}
        >
          <DrumMachineCategoryIcon
            category={item.category}
            className="w-6 h-full"
          />
          <p className="font-bold text-sm">{item.name}</p>
        </div>
      ))}
    </div>
  )
}
