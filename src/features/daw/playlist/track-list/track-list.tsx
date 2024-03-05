import { TrackItem } from './track-item/track-item'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedTrack, selectTracks } from '../store/selectors'
import { Track } from '../../../../model/track/track'
import { selectTrack } from '../store/playlist-slice'

export const TrackList = () => {
  const tracks = useSelector(selectTracks)
  const selectedTrack = useSelector(selectSelectedTrack)
  const dipatch = useDispatch()
  const handleSelectTrack = (track: Track) => {
    dipatch(selectTrack(track))
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {tracks.map((track: Track) => (
        <TrackItem
          key={track.id}
          track={track}
          selectedTrack={selectedTrack}
          onSelectTrack={handleSelectTrack}
        />
      ))}
    </div>
  )
}
