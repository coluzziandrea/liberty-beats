import { Track } from '../../../../../model/track/track'

export type TrackItemProps = {
  track: Track
  selectedTrack?: Track | null
}

export const TrackItem = ({ track, selectedTrack }: TrackItemProps) => {
  const isSelected = selectedTrack?.id === track.id

  return (
    <div
      className={`flex flex-row w-full h-24 min-h-24 max-h-24 ${
        isSelected ? 'bg-zinc-600' : 'bg-zinc-900'
      }`}
    >
      <div className="flex flex-col">
        <button>{'M'}</button>
        <button>{'S'}</button>
      </div>

      <div className="flex flex-col py-2">
        <div>{track.title}</div>

        <div>
          <input
            id="minmax-range"
            type="range"
            min="0"
            max="10"
            value="5"
            onChange={() => {}}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          ></input>
        </div>
      </div>

      <div>
        <button>{'...'}</button>
      </div>
    </div>
  )
}
