import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'
import { Track } from '../../../../model/track/track'
import { TrackBoard } from './track-board/track-board'

export const Flatboard = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="flex flex-col gap-1">
      {tracks.map((track: Track) => (
        <TrackBoard key={track.id} />
      ))}
    </div>
  )
}
