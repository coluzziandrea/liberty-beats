import { useSelector } from 'react-redux'
import {
  selectCurrentTick,
  selectMaxBars,
} from '../../../playlist-header/store/selectors'
import { TrackGrid } from './track-grid/track-grid'
import { Track } from '../../../../../model/track/track'
import { Bar } from '../../../../../model/bar/bar'

export const TrackBoard = ({ track }: { track: Track }) => {
  const maxBars = useSelector(selectMaxBars)

  const currentTick = useSelector(selectCurrentTick)

  const trackBars = track.bars

  const TICK_WIDTH_PIXEL = 20

  return (
    <div className="relative">
      <div className="flex flex-row h-24 min-h-24 max-h-24">
        <TrackGrid maxBars={maxBars} currentTick={currentTick} />

        {trackBars.map((bar: Bar) => (
          <div
            key={bar.id}
            className={`left-[${
              bar.startAtTick * TICK_WIDTH_PIXEL
            }px] absolute z-10`}
          >
            {bar.notes.toString()}
          </div>
        ))}
      </div>
    </div>
  )
}
