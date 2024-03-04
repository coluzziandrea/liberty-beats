import { useDispatch, useSelector } from 'react-redux'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { TrackGrid } from './track-grid/track-grid'
import { Track } from '../../../../../model/track/track'
import { Bar } from '../../../../../model/bar/bar'
import { TrackBar } from './track-bar/track-bar'
import { setCurrentTick } from '../../../playlist-header/store/playlist-header-slice'

export const TrackBoard = ({ track }: { track: Track }) => {
  const maxBars = useSelector(selectMaxBars)

  const dispatch = useDispatch()

  const handleSelectTick = (tick: number) => {
    dispatch(setCurrentTick(tick))
  }

  return (
    <div className="relative">
      <div className="flex flex-row h-24 min-h-24 max-h-24">
        <TrackGrid maxBars={maxBars} onSelectTick={handleSelectTick} />

        {track.bars.map((bar: Bar) => (
          <TrackBar key={bar.id} track={track} bar={bar} />
        ))}
      </div>
    </div>
  )
}
