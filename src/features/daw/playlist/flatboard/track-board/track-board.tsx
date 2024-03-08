import { useDispatch, useSelector } from 'react-redux'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { Track } from '../../../../../model/track/track'
import { Bar } from '../../../../../model/bar/bar'
import { TrackBar } from './track-bar/track-bar'
import { setCurrentTick } from '../../../playlist-header/store/playlist-header-slice'
import { addTrackBar, selectTrack } from '../../store/playlist-slice'
import { MixGrid } from '../../../common/components/mix-grid/mix-grid'

export const TrackBoard = ({
  track,
  selectedTrack,
}: {
  track: Track
  selectedTrack?: Track
}) => {
  const maxBars = useSelector(selectMaxBars)

  const isSelected = selectedTrack?.id === track.id

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

  const handleSelectBar = () => {
    dispatch(selectTrack(track))
  }

  const handleBarDetails = (bar: Bar) => {
    dispatch(selectTrack(track))

    dispatch(setCurrentTick(bar.startAtTick))
  }

  const getEvenColumnsColor = () => {
    return isSelected ? `bg-${track.color}-800` : 'bg-zinc-800'
  }

  const getOddColumnsColor = () => {
    return isSelected ? `bg-${track.color}-900` : 'bg-zinc-900'
  }

  return (
    <div className="relative">
      <div className="flex flex-row h-20 min-h-20 max-h-20">
        <MixGrid
          maxBars={maxBars}
          onSelectTick={handleSelectTick}
          onCreateBar={handleCreateBar}
          evenColumnsColor={getEvenColumnsColor()}
          oddColumnsColor={getOddColumnsColor()}
        />

        {track.bars.map((bar: Bar) => (
          <TrackBar
            key={bar.id}
            track={track}
            bar={bar}
            onSelectBar={handleSelectBar}
            onBarDetails={handleBarDetails}
          />
        ))}
      </div>
    </div>
  )
}
