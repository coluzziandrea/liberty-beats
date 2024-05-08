import { useDispatch, useSelector } from 'react-redux'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { Track, TrackUtils } from '../../../../../model/track/track'
import { Bar } from '../../../../../model/bar/bar'
import { TrackBar } from './track-bar/track-bar'
import { requestNewTickPosition } from '../../../playlist-header/store/playlist-header-slice'
import {
  addTrackBar,
  selectTrack,
  moveBar,
  selectBar,
} from '../../store/playlist-slice'
import { MixGrid } from '../../../common/components/mix-grid/mix-grid'
import { selectBottomUpPanel } from '../../../bottom-bar/store/bottom-bar-slice'
import { TRACK_HEIGHT } from '../../constants'
import { useDragAndDrop } from '../../../common/hooks/useDragAndDrop'
import { selectToCopyBar } from '../../store/selectors'
import { v4 as uuidv4 } from 'uuid'

export const TrackBoard = ({
  track,
  selectedTrack,
}: {
  track: Track
  selectedTrack?: Track
}) => {
  const maxBars = useSelector(selectMaxBars)
  const toCopyBar = useSelector(selectToCopyBar)

  const isSelected =
    selectedTrack?.id === track.id && !TrackUtils.isTrackEffectivelyMuted(track)

  const dispatch = useDispatch()

  const handleSelectTick = (tick: number) => {
    dispatch(requestNewTickPosition(tick))
    dispatch(selectTrack(track))
  }

  const handleCreateBar = (actualTick: number) => {
    dispatch(requestNewTickPosition(actualTick))

    const newBar: Bar = {
      id: Date.now().toString(),
      title: track.title + ' ' + (track.bars.length + 1),
      startAtTick: actualTick,
      durationTicks: 32,
      notes: [],
    }

    dispatch(
      addTrackBar({
        track: track,
        bar: newBar,
      })
    )
  }

  const handlePasteBar = (actualTick: number) => {
    const newBar: Bar = {
      id: uuidv4(),
      title: toCopyBar?.title + ' Copy',
      startAtTick: actualTick,
      durationTicks: toCopyBar?.durationTicks || 32,
      notes: toCopyBar?.notes || [],
    }

    dispatch(
      addTrackBar({
        track: track,
        bar: newBar,
      })
    )
  }

  const handleBarDetails = (bar: Bar) => {
    dispatch(selectTrack(track))

    dispatch(requestNewTickPosition(bar.startAtTick))
    dispatch(selectBottomUpPanel('midiEditor'))
  }

  const getEvenColumnsColor = () => {
    return isSelected
      ? `bg-${track.color}-400 dark:bg-${track.color}-800`
      : 'bg-zinc-400 dark:bg-zinc-800'
  }

  const getOddColumnsColor = () => {
    return isSelected
      ? `bg-${track.color}-300 dark:bg-${track.color}-900`
      : 'bg-zinc-300 dark:bg-zinc-900'
  }

  const { handleOnDrop } = useDragAndDrop({
    type: 'drop_bar',
    onDropBar: (barId, fromTrackId, newStartAtTick) => {
      dispatch(
        moveBar({ barId, fromTrackId, toTrackId: track.id, newStartAtTick })
      )
    },
  })

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
          onPasteBar={handlePasteBar}
          evenColumnsColor={getEvenColumnsColor()}
          oddColumnsColor={getOddColumnsColor()}
        />

        {track.bars.map((bar: Bar) => (
          <TrackBar
            key={bar.id}
            track={track}
            bar={bar}
            onSelectBar={() => {
              dispatch(selectBar({ track, bar }))
            }}
            onBarDetails={handleBarDetails}
          />
        ))}
      </div>
    </div>
  )
}
