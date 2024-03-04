import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'
import { Track } from '../../../../model/track/track'
import { TrackBoard } from './track-board/track-board'
import { TickPlaceholder } from './tick-placeholder/tick-placeholder'

export const Flatboard = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="relative h-max min-h-full">
      <div className="flex flex-col gap-1">
        {tracks.map((track: Track) => (
          <TrackBoard key={track.id} track={track} />
        ))}
      </div>
      <TickPlaceholder />
    </div>
  )
}
