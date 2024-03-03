import { TrackList } from './track-list/track-list'
import { Flatboard } from './flatboard/flatboard'

export const Playlist = () => {
  return (
    <div className="flex flex-row justify-between gap-2 divide-x divide-slate-600">
      <div>
        <TrackList />
      </div>

      <div className="flex flex-grow px-2">
        <Flatboard />
      </div>
    </div>
  )
}
