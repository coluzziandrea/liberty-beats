import { useSelector } from 'react-redux'
import { selectCurrentTick, selectMaxBars } from '../store/selectors'
import { SUB_BAR_NUM } from '../constants'

const RulerSubBar = ({
  barIndex,
  subBarIndex,
  currentTick,
}: {
  barIndex: number
  subBarIndex: number
  currentTick: number
}) => {
  const tick = barIndex * SUB_BAR_NUM + subBarIndex
  return (
    <div
      key={subBarIndex}
      className={`w-16 relative border-slate-400 ${
        subBarIndex == SUB_BAR_NUM - 1 ? '' : 'border-r'
      }`}
    >
      {tick == currentTick && (
        <div
          className="w-0 h-0 
  border-l-[7px] border-l-transparent
  border-t-[18px] border-t-white-500
  border-r-[7px] border-r-transparent absolute -left-2"
        ></div>
      )}
    </div>
  )
}

const RulerBar = ({
  barIndex,
  maxBars,
  currentTick,
}: {
  barIndex: number
  maxBars: number
  currentTick: number
}) => {
  return (
    <div
      key={barIndex + 1}
      className={`flex flex-col justify-end gap-4 w-16 border-l border-slate-400 ${
        barIndex == maxBars - 1 ? 'border-r' : ''
      }`}
    >
      <div className="px-2 text-slate-400 select-none">{barIndex + 1}</div>

      <div className="flex flex-row h-4">
        {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
          <RulerSubBar
            key={j}
            barIndex={barIndex}
            subBarIndex={j}
            currentTick={currentTick}
          />
        ))}
      </div>
    </div>
  )
}

export const Ruler = () => {
  const maxBars = useSelector(selectMaxBars)
  const currentTick = useSelector(selectCurrentTick)
  return (
    <div className="h-full flex flex-row">
      {Array.from({ length: maxBars }).map((_, i) => (
        <RulerBar
          key={i}
          barIndex={i}
          maxBars={maxBars}
          currentTick={currentTick}
        />
      ))}
    </div>
  )
}
