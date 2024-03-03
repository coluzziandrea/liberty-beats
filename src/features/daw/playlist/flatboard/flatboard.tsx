import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'
import { Ruler } from './ruler/ruler'
import { Track } from '../../../../model/track/track'
import { RULER_HEIGHT } from '../constants'

export const Flatboard = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="flex flex-col gap-2">
      <div className={`h-${RULER_HEIGHT}`}>
        <Ruler />
      </div>

      <div>
        {tracks.map((track: Track) => (
          <div key={track.id}>{track.title}</div>
        ))}
      </div>
    </div>
  )
}
