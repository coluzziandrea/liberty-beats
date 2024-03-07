import { Track } from '../../../../../model/track/track'
import { SUB_BAR_NUM } from '../ruler/constants'

export type MixGridProps = {
  track: Track
  isSelected: boolean
  maxBars: number

  highlightType?: 'row' | 'column'

  onSelectTick: (tick: number) => void
  onCreateBar: (startTick: number) => void
}

const MixGridItem = ({
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

export const MixGrid = (props: MixGridProps) => {
  const getTrackColorClass = (barIndex: number) => {
    if (props.isSelected) {
      return barIndex % 2 == 0
        ? `bg-${props.track.color}-800`
        : `bg-${props.track.color}-900`
    } else {
      return barIndex % 2 == 0 ? 'bg-zinc-800' : 'bg-zinc-900'
    }
  }
  return (
    <>
      {Array.from({ length: props.maxBars }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col justify-end opacity-50 w-[80px] border-l border-slate-500 ${
            i == props.maxBars - 1 ? 'border-r' : ''
          }  ${getTrackColorClass(i)}`}
        >
          <div className="flex flex-row h-full">
            {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
              <MixGridItem
                key={j}
                barIndex={i}
                currentSubBar={j}
                onSelectTick={props.onSelectTick}
                onCreateBar={props.onCreateBar}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
