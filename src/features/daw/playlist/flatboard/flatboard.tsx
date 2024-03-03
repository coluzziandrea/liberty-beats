import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'
import { Track } from '../../../../model/track/track'
import { Ruler } from '../../playlist-header/ruler/ruler'

export const Flatboard = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="flex flex-col gap-2">
      <div>
        {tracks.map((track: Track) => (
          <Ruler key={track.id} />
        ))}
      </div>
    </div>
  )
}
