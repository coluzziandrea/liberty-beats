import { Track } from '../../../../../model/track/track'
import { FaHeadphones } from 'react-icons/fa6'
import { FaVolumeMute } from 'react-icons/fa'
import { TRACK_HEIGHT } from '../../constants'

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

  const effectivelyMuted =
    track.muted || (track.areThereAnyOtherTrackSoloed && !track.soloed)

  const selectedHighlightColor = effectivelyMuted
    ? 'bg-gray-500'
    : `bg-${track.color}-500`

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
            id="minmax-range"
            type="range"
            min="0"
            max="10"
            value="5"
            onChange={() => {}}
            className="h-2 w-full cursor-ew-resize appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
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
