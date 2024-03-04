import { SUB_BAR_NUM } from '../../../../playlist-header/constants'

export type TrackGridProps = {
  maxBars: number
  onSelectTick: (tick: number) => void
}

const TrackBoardItem = ({
  barIndex,
  currentSubBar,
  onSelectTick,
}: {
  barIndex: number
  currentSubBar: number
  onSelectTick: (tick: number) => void
}) => {
  const tick = barIndex * SUB_BAR_NUM + currentSubBar
  return (
    <p
      key={currentSubBar}
      className={`w-[20px] border-slate-600 ${
        currentSubBar == SUB_BAR_NUM - 1 ? '' : 'border-r'
      }`}
      onClick={() => onSelectTick(tick)}
    ></p>
  )
}

export const TrackGrid = ({ maxBars, onSelectTick }: TrackGridProps) => {
  return (
    <>
      {Array.from({ length: maxBars }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col justify-end w-[80px] border-l border-slate-600 ${
            i == maxBars - 1 ? 'border-r' : ''
          }  ${i % 2 == 0 ? 'bg-zinc-800' : 'bg-zinc-900'}`}
        >
          <div className="flex flex-row h-full">
            {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
              <TrackBoardItem
                key={j}
                barIndex={i}
                currentSubBar={j}
                onSelectTick={onSelectTick}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
