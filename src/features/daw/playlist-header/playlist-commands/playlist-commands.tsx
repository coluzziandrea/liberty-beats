import { useDispatch } from 'react-redux'
import { addTrack, selectTrack } from '../../playlist/store/playlist-slice'
import { TRACK_COLORS } from '../../../../model/track/track-color'
import { Track } from '../../../../model/track/track'
import { INSTRUMENT_PRESETS } from '../../../../model/instrument/preset/preset'
import { FaPlus } from 'react-icons/fa'

export const PlaylistCommands = () => {
  const dispatch = useDispatch()

  const handleAddTrack = () => {
    const newTrack: Track = {
      id: Date.now().toString(),
      title: 'New Track',
      color: TRACK_COLORS[Math.floor(Math.random() * TRACK_COLORS.length)],
      instrumentPreset: INSTRUMENT_PRESETS[0],
      bars: [],
      muted: false,
      soloed: false,
      areThereAnyOtherTrackSoloed: false,
    }
    dispatch(addTrack(newTrack))
    dispatch(selectTrack(newTrack))
  }

  return (
    <div className="flex flex-row">
      <button onClick={handleAddTrack}>
        <div className="flex flex-row items-center justify-center gap-2">
          <FaPlus /> <p>Add Track</p>
        </div>
      </button>
    </div>
  )
}
