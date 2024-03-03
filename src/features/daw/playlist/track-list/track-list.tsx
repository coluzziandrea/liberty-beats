import { TracksCommands } from './tracks-commands/tracks-commands'
import { TrackItem } from './track-item/track-item'
import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'
import { Track } from '../../../../model/track/track'
import { RULER_HEIGHT } from '../constants'

export const TrackList = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex h-${RULER_HEIGHT} min-h-${RULER_HEIGHT}`}>
        <TracksCommands />
      </div>

      <div className="flex flex-col">
        {tracks.map((track: Track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </div>
  )
}
