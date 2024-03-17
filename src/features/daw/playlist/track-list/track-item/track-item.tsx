import { Track } from '../../../../../model/track/track'
import { FaHeadphones } from 'react-icons/fa6'
import { FaVolumeMute } from 'react-icons/fa'
import { TRACK_HEIGHT } from '../../constants'
import { MAX_VOLUME } from '../../../player-bar/constants/player-bar-constants'
import { useDispatch } from 'react-redux'
import { setTrackVolume } from '../../store/playlist-slice'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../common/hooks/useDebounce'

export type TrackItemProps = {
  track: Track
  selectedTrack?: Track | null
  onSelectTrack: (track: Track) => void
  onToggleMute: () => void
  onToggleSolo: () => void
}

export const TrackItem = ({
  track,
  selectedTrack,
  onSelectTrack,
  onToggleMute,
  onToggleSolo,
}: TrackItemProps) => {
  const isSelected = selectedTrack?.id === track.id

  const dispatch = useDispatch()

  const [localTrackVolume, setLocalTrackVolume] = useState(track.volume)
  const debouncedVolume = useDebounce(localTrackVolume, 500)

  // Update the track volume when the debounced volume changes, but apply some debounce
  useEffect(() => {
    dispatch(
      setTrackVolume({
        trackId: track.id,
        volume: localTrackVolume,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedVolume, dispatch, track.id])

  const effectivelyMuted =
    track.muted || (track.areThereAnyOtherTrackSoloed && !track.soloed)

  const selectedHighlightColor = effectivelyMuted
    ? 'bg-gray-500'
    : `bg-${track.color}-500`

  const sliderColor = effectivelyMuted
    ? 'accent-gray-500'
    : `accent-${track.color}-600`

  return (
    <div
      className={`flex flex-row justify-between w-full ${
        isSelected ? 'bg-zinc-800' : 'bg-zinc-900'
      }`}
      style={{ height: `${TRACK_HEIGHT}px` }}
      onClick={() => onSelectTrack(track)}
    >
      <div className="flex flex-col divide-y border-r border-slate-600 divide-slate-600 w-8 cursor-pointer">
        <div
          className={`flex flex-1 w-full justify-center items-center ${
            track.soloed ? 'bg-orange-400' : ''
          }`}
          onClick={onToggleSolo}
        >
          <FaHeadphones />
        </div>
        <div
          className={`flex flex-1 w-full justify-center items-center ${
            track.muted && 'bg-gray-500'
          }`}
          onClick={onToggleMute}
        >
          <FaVolumeMute />
        </div>
      </div>

      <div className="flex flex-col p-2 py-2">
        <span className="select-none">{track.title}</span>

        <div>
          <input
            id="track-vol-range"
            type="range"
            min="0"
            max={MAX_VOLUME}
            value={localTrackVolume}
            onChange={(e) => {
              setLocalTrackVolume(e.target.valueAsNumber)
            }}
            className={`w-full h-1 cursor-ew-resize ${sliderColor}`}
          ></input>
        </div>
      </div>

      <div>
        <button>{'...'}</button>
      </div>

      <div className={`h-full w-1 ${isSelected && selectedHighlightColor}`} />
    </div>
  )
}
