import { useSelector } from 'react-redux'
import {
  selectCurrentTick,
  selectMaxBars,
} from '../../../playlist-header/store/selectors'
import { TrackGrid } from './track-grid/track-grid'
import { Track } from '../../../../../model/track/track'
import { Bar } from '../../../../../model/bar/bar'
import { TrackBar } from './track-bar/track-bar'

export const TrackBoard = ({ track }: { track: Track }) => {
  const maxBars = useSelector(selectMaxBars)
  const currentTick = useSelector(selectCurrentTick)

  return (
    <div className="relative">
      <div className="flex flex-row h-24 min-h-24 max-h-24">
        <TrackGrid maxBars={maxBars} currentTick={currentTick} />

        {track.bars.map((bar: Bar) => (
          <TrackBar key={bar.id} track={track} bar={bar} />
        ))}
      </div>
    </div>
  )
}
