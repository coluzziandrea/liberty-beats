import { TrackItem } from './track-item/track-item'
import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'
import { Track } from '../../../../model/track/track'

export const TrackList = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        {tracks.map((track: Track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
