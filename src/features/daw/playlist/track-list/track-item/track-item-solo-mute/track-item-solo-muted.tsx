import { TrackItemProps } from '../track-item'
import { FaHeadphones } from 'react-icons/fa6'
import { FaVolumeMute } from 'react-icons/fa'

export const TrackItemSoloMuted = ({
  track,
  onToggleMute,
  onToggleSolo,
}: Pick<TrackItemProps, 'track' | 'onToggleMute' | 'onToggleSolo'>) => {
  return (
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
  )
}
