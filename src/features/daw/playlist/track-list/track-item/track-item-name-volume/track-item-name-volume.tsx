import { useDispatch } from 'react-redux'
import { TrackItemProps } from '../track-item'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../../common/hooks/useDebounce'
import { renameTrack, setTrackVolume } from '../../../store/playlist-slice'
import { Volume } from '../../../../../../sequencer/volume/volume'
import { MAX_VOLUME } from '../../../../player-bar/constants/player-bar-constants'

export type TrackItemNameVolumeProps = Pick<TrackItemProps, 'track'> & {
  effectivelyMuted: boolean
  isRenaming: boolean
  setIsRenaming: (isRenaming: boolean) => void
}

export const TrackItemNameVolume = ({
  track,
  effectivelyMuted,
  isRenaming,
  setIsRenaming,
}: TrackItemNameVolumeProps) => {
  const dispatch = useDispatch()

  const [localTrackVolume, setLocalTrackVolume] = useState(track.volume)
  const [trackName, setTrackName] = useState(track.title)
  const debouncedVolume = useDebounce(localTrackVolume, 500)

  const [volumeTooltipVisible, setVolumeTooltipVisible] = useState(false)

  // Update the track volume when the debounced volume changes, but apply some debounce
  useEffect(() => {
    dispatch(
      setTrackVolume({
        trackId: track.id,
        volume: localTrackVolume,
      })
    )
    setVolumeTooltipVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedVolume, dispatch, track.id])
  const sliderColor = effectivelyMuted
    ? 'accent-gray-800 dark:accent-gray-500'
    : `accent-${track.color}-600`

  const volumeInDb =
    Volume.transformVolumeToToneVolume(localTrackVolume).toFixed(1)
  return (
    <div className="flex-grow flex flex-col px-4 py-2">
      <div className="h-[50%]">
        {
          // Show the input for renaming the track
          isRenaming ? (
            <input
              type="text"
              className="w-full p-1 mt-1 bg-zinc-200 dark:bg-zinc-800"
              value={trackName}
              autoFocus
              onBlur={() => {
                setIsRenaming(false)
                dispatch(
                  renameTrack({ trackId: track.id, newTitle: trackName })
                )
              }}
              onChange={(e) => setTrackName(e.target.value)}
            />
          ) : (
            <span className="select-none font-bold text-sm">{track.title}</span>
          )
        }
      </div>
      <div className="relative">
        <div
          id="tooltip-top"
          role="tooltip"
          className="tooltip absolute -top-8 left-4 z-10 bg-zinc-600 font-medium shadow-sm py-1 px-3  rounded-lg"
          style={{ visibility: volumeTooltipVisible ? 'visible' : 'hidden' }}
        >
          <span className="font-bold">{volumeInDb}</span>{' '}
          <span className="text-sm font-light">db</span>
        </div>
        <input
          id="track-vol-range"
          type="range"
          min="0"
          max={MAX_VOLUME}
          value={localTrackVolume}
          onChange={(e) => {
            setLocalTrackVolume(e.target.valueAsNumber)
            setVolumeTooltipVisible(true)
          }}
          className={`w-full h-1 bg-gray-700 appearance-none cursor-ew-resize ${sliderColor}`}
        ></input>
      </div>
    </div>
  )
}
