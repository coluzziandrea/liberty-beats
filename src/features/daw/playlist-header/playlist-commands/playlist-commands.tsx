import { useDispatch } from 'react-redux'
import { addTrack, selectTrack } from '../../playlist/store/playlist-slice'
import { TRACK_COLORS } from '../../../../model/track/track-color'
import { Track } from '../../../../model/track/track'

export const PlaylistCommands = () => {
  const dispatch = useDispatch()

  const handleAddTrack = () => {
    const newTrack: Track = {
      id: Date.now().toString(),
      title: 'New Track',
      color: TRACK_COLORS[Math.floor(Math.random() * TRACK_COLORS.length)],
      instrumentType: 'PIANO',
      bars: [
        {
          id: Date.now().toString(),
          title: 'New Bar',
          startAtTick: 0,
          endAtTick: 10,
          notes: [],
        },
      ],
    }
    dispatch(addTrack(newTrack))
    dispatch(selectTrack(newTrack))
  }

  return (
    <div className="flex flex-row">
      <button onClick={handleAddTrack}>{'+ Add Track'}</button>
    </div>
  )
}
