import { useDispatch } from 'react-redux'
import { addTrack } from '../../playlist/store/playlist-slice'

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
              instrumentType: 'PIANO',
            })
          )
        }
      >
        {'+ Add Track'}
      </button>
    </div>
  )
}
