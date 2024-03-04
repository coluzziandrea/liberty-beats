import { TrackItem } from './track-item/track-item'
import { useSelector } from 'react-redux'
import { selectSelectedTrack, selectTracks } from '../store/selectors'
import { Track } from '../../../../model/track/track'

export const TrackList = () => {
  const tracks = useSelector(selectTracks)
  const selectedTrack = useSelector(selectSelectedTrack)

  return (
    <div className="flex flex-col gap-1 w-full">
      {tracks.map((track: Track) => (
        <TrackItem key={track.id} track={track} selectedTrack={selectedTrack} />
      ))}
    </div>
  )
}
