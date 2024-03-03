import { TracksCommands } from './tracks-commands/tracks-commands'
import { TrackItem } from './track-item/track-item'
import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'

export const TrackList = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="flex flex-col gap-2">
      <div>
        <TracksCommands />
      </div>

      <div className="flex flex-col">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
