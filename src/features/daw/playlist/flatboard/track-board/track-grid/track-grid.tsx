import { Track } from '../../../../../../model/track/track'
import { SUB_BAR_NUM } from '../../../../playlist-header/constants'

export type TrackGridProps = {
  track: Track
  isSelected: boolean
  maxBars: number
  onSelectTick: (tick: number) => void
  onCreateBar: (startTick: number) => void
}

const TrackBoardItem = ({
  barIndex,
  currentSubBar,
  onSelectTick,
  onCreateBar,
}: {
  barIndex: number
  currentSubBar: number
  onSelectTick: (tick: number) => void
  onCreateBar: (startTick: number) => void
}) => {
  const tick = barIndex * SUB_BAR_NUM + currentSubBar
  return (
    <p
      key={currentSubBar}
      className={`w-[20px] border-slate-500 ${
        currentSubBar == SUB_BAR_NUM - 1 ? '' : 'border-r'
      }`}
      onClick={() => onSelectTick(tick)}
      onDoubleClick={() => onCreateBar(tick)}
    ></p>
  )
}

export const TrackGrid = ({
  track,
  maxBars,
  onSelectTick,
  onCreateBar,
  isSelected,
}: TrackGridProps) => {
  const getTrackColorClass = (barIndex: number) => {
    if (isSelected) {
      return barIndex % 2 == 0
        ? `bg-${track.color}-800`
        : `bg-${track.color}-900`
    } else {
      return barIndex % 2 == 0 ? 'bg-zinc-800' : 'bg-zinc-900'
    }
  }
  return (
    <>
      {Array.from({ length: maxBars }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col justify-end opacity-50 w-[80px] border-l border-slate-500 ${
            i == maxBars - 1 ? 'border-r' : ''
          }  ${getTrackColorClass(i)}`}
        >
          <div className="flex flex-row h-full">
            {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
              <TrackBoardItem
                key={j}
                barIndex={i}
                currentSubBar={j}
                onSelectTick={onSelectTick}
                onCreateBar={onCreateBar}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
