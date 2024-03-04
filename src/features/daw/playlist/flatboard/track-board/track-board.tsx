import { useDispatch, useSelector } from 'react-redux'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { TrackGrid } from './track-grid/track-grid'
import { Track } from '../../../../../model/track/track'
import { Bar } from '../../../../../model/bar/bar'
import { TrackBar } from './track-bar/track-bar'
import { setCurrentTick } from '../../../playlist-header/store/playlist-header-slice'
import { addTrackBar, selectTrack } from '../../store/playlist-slice'

export const TrackBoard = ({ track }: { track: Track }) => {
  const maxBars = useSelector(selectMaxBars)

  const dispatch = useDispatch()

  const handleSelectTick = (tick: number) => {
    dispatch(setCurrentTick(tick))
    dispatch(selectTrack(track))
  }

  const handleCreateBar = (actualTick: number) => {
    dispatch(setCurrentTick(actualTick))
    dispatch(selectTrack(track))

    const newBar: Bar = {
      id: Date.now().toString(),
      title: track.title + ' ' + (track.bars.length + 1),
      startAtTick: actualTick,
      endAtTick: actualTick + 8,
      notes: [],
    }

    dispatch(
      addTrackBar({
        track: track,
        bar: newBar,
      })
    )
  }

  return (
    <div className="relative">
      <div className="flex flex-row h-24 min-h-24 max-h-24">
        <TrackGrid
          maxBars={maxBars}
          onSelectTick={handleSelectTick}
          onCreateBar={handleCreateBar}
        />

        {track.bars.map((bar: Bar) => (
          <TrackBar key={bar.id} track={track} bar={bar} />
        ))}
      </div>
    </div>
  )
}
