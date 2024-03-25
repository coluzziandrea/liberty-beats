import { Track } from '../../../../../model/track/track'
import { FaHeadphones } from 'react-icons/fa6'
import { FaVolumeMute } from 'react-icons/fa'
import { TRACK_HEIGHT } from '../../constants'
import { MAX_VOLUME } from '../../../player-bar/constants/player-bar-constants'
import { useDispatch } from 'react-redux'
import { renameTrack, setTrackVolume } from '../../store/playlist-slice'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../common/hooks/useDebounce'
import { Volume } from '../../../../../sequencer/volume/volume'
import { TrackPopupMenu } from '../track-popup-menu/track-popup-menu'
import { IoMdSettings } from 'react-icons/io'

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
  const [showTrackMenu, setShowTrackMenu] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
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

  const effectivelyMuted =
    track.muted || (track.areThereAnyOtherTrackSoloed && !track.soloed)

  const selectedHighlightColor = effectivelyMuted
    ? 'bg-gray-500'
    : `bg-${track.color}-500`

  const sliderColor = effectivelyMuted
    ? 'accent-gray-500'
    : `accent-${track.color}-600`

  const volumeInDb =
    Volume.transformVolumeToToneVolume(localTrackVolume).toFixed(1)

  return (
    <div
      className={`flex flex-row justify-between w-full ${
        isSelected ? 'bg-zinc-800' : 'bg-zinc-900'
      }`}
      style={{ height: `${TRACK_HEIGHT}px` }}
      onClick={() => onSelectTrack(track)}
    >
      <div className="flex flex-col divide-y border-r border-slate-600 divide-slate-600 min-w-8 max-w-8 w-8 cursor-pointer">
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

      <div className="flex-grow flex flex-col px-4 py-2">
        <div className="h-[50%]">
          {
            // Show the input for renaming the track
            isRenaming ? (
              <input
                type="text"
                className="w-full p-1 mt-1 bg-zinc-800 text-white"
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
              <span className="select-none font-bold text-sm">
                {track.title}
              </span>
            )
          }
        </div>

        <div className="relative">
          <div
            id="tooltip-top"
            role="tooltip"
            className="tooltip absolute -top-8 left-4 z-10 bg-zinc-600 font-medium shadow-sm text-white py-1 px-3  rounded-lg"
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

      <div className="relative h-full w-8">
        <div
          className="mt-4 cursor-pointer self-center"
          onClick={() => {
            if (!showTrackMenu) {
              setShowTrackMenu(true)
            }
          }}
        >
          <IoMdSettings />
        </div>
        {showTrackMenu && (
          <div className="fixed mt-2 z-50 h-fit w-fit">
            <TrackPopupMenu
              track={track}
              onClose={() => setShowTrackMenu(false)}
              onRename={() => {
                setShowTrackMenu(false)
                setIsRenaming(true)
              }}
            />
          </div>
        )}
      </div>

      <div className={`h-full w-1 ${isSelected && selectedHighlightColor}`} />
    </div>
  )
}
