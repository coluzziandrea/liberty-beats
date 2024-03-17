import { FaVolumeHigh } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { selectVolume } from '../store/selectors'
import { setVolume } from '../store/playerBarSlice'
import { MAX_VOLUME } from '../constants/player-bar-constants'
import { Volume } from '../../../../sequencer/volume/volume'

export const MasterVolume = () => {
  const volume = useSelector(selectVolume)
  const dispatch = useDispatch()

  const volumeInDb = Volume.transformVolumeToToneVolume(volume).toFixed(1)
  return (
    <div className="flex flex-row justify-start items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        <FaVolumeHigh />
        <input
          id="volume-range"
          type="range"
          min="0"
          max={MAX_VOLUME}
          value={volume}
          onChange={(e) => {
            dispatch(setVolume(e.target.valueAsNumber))
          }}
          className="h-2 w-full cursor-ew-resize appearance-none rounded-lg bg-gray-700"
        ></input>
      </div>

      <div className="flex flex-row items-center gap-1">
        <span className="font-bold text-sm">{volumeInDb}</span>
        <span className="font-light text-xs">db</span>
      </div>
    </div>
  )
}
