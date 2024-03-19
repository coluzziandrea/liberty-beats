import { useDispatch, useSelector } from 'react-redux'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { Track, TrackUtils } from '../../../../../model/track/track'
import { Bar } from '../../../../../model/bar/bar'
import { TrackBar } from './track-bar/track-bar'
import { requestNewTickPosition } from '../../../playlist-header/store/playlist-header-slice'
import { addTrackBar, selectTrack, moveBar } from '../../store/playlist-slice'
import { MixGrid } from '../../../common/components/mix-grid/mix-grid'
import { selectBottomUpPanel } from '../../../bottom-bar/store/bottom-bar-slice'
import { TICK_WIDTH_PIXEL, TRACK_HEIGHT } from '../../constants'

export const TrackBoard = ({
  track,
  selectedTrack,
}: {
  track: Track
  selectedTrack?: Track
}) => {
  const maxBars = useSelector(selectMaxBars)

  const isSelected =
    selectedTrack?.id === track.id && !TrackUtils.isTrackEffectivelyMuted(track)

  const dispatch = useDispatch()

  const handleSelectTick = (tick: number) => {
    dispatch(requestNewTickPosition(tick))
    dispatch(selectTrack(track))
  }

  const handleCreateBar = (actualTick: number) => {
    dispatch(requestNewTickPosition(actualTick))
    dispatch(selectTrack(track))

    const newBar: Bar = {
      id: Date.now().toString(),
      title: track.title + ' ' + (track.bars.length + 1),
      startAtTick: actualTick,
      durationTicks: 8,
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

    dispatch(requestNewTickPosition(bar.startAtTick))
    dispatch(selectBottomUpPanel('midiEditor'))
  }

  const getEvenColumnsColor = () => {
    return isSelected ? `bg-${track.color}-800` : 'bg-zinc-800'
  }

  const getOddColumnsColor = () => {
    return isSelected ? `bg-${track.color}-900` : 'bg-zinc-900'
  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const barId = e.dataTransfer.getData('dragging_bar/bar_id')
    console.log(barId)
    const fromTrackId = e.dataTransfer.getData('dragging_bar/track_id')
    console.log(fromTrackId)
    const startDraggingTick = e.dataTransfer.getData(
      'dragging_bar/relative_tick'
    )

    const mouseXPositionWithinTrack =
      e.clientX - e.currentTarget.getBoundingClientRect().left
    const mouseSelectedTick = Math.floor(
      mouseXPositionWithinTrack / TICK_WIDTH_PIXEL
    )
    // the new startAtTick will be the tick selected by mouse taking into consideration the relative tick where the bar was grabbed
    const newStartAtTick = Math.max(
      mouseSelectedTick - parseInt(startDraggingTick),
      0
    )

    dispatch(
      moveBar({ barId, fromTrackId, toTrackId: track.id, newStartAtTick })
    )
  }

  return (
    <div
      className="relative"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleOnDrop}
    >
      <div className="flex flex-row" style={{ height: `${TRACK_HEIGHT}px` }}>
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
