import { useSelector } from 'react-redux'
import { selectTracks } from '../store/selectors'
import { Ruler } from './ruler/ruler'

export const Flatboard = () => {
  const tracks = useSelector(selectTracks)

  return (
    <div className="flex flex-col gap-2">
      <Ruler />

      <div>
        {tracks.map((track) => (
          <div key={track.id}>{track.title}</div>
        ))}
      </div>
    </div>
  )
}
