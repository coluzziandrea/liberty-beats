import { useDispatch } from 'react-redux'
import { addTrack } from '../../playlist/store/playlist-slice'
import { TRACK_COLORS } from '../../../../model/track/track-color'

export const PlaylistCommands = () => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-row">
      <button
        onClick={() =>
          dispatch(
            addTrack({
              id: Date.now().toString(),
              title: 'New Track',
              color:
                TRACK_COLORS[Math.floor(Math.random() * TRACK_COLORS.length)],
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
            })
          )
        }
      >
        {'+ Add Track'}
      </button>
    </div>
  )
}
