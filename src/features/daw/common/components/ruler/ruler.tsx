import { useDispatch, useSelector } from 'react-redux'
import { RULER_BAR_WIDTH, SUB_BAR_NUM } from './constants'
import {
  selectCurrentTick,
  selectMaxBars,
} from '../../../playlist-header/store/selectors'
import { setCurrentTick } from '../../../playlist-header/store/playlist-header-slice'

type RulerBarProps = {
  barIndex: number
  maxBars: number
  currentTick: number
  onSelectTick: (tick: number) => void
}

const RulerSubBar = ({
  barIndex,
  subBarIndex,
  currentTick,
  onSelectTick,
}: {
  subBarIndex: number
} & RulerBarProps) => {
  const tick = barIndex * SUB_BAR_NUM + subBarIndex
  return (
    <div
      key={subBarIndex}
      className={`w-full relative border-slate-400 ${
        subBarIndex == SUB_BAR_NUM - 1 ? '' : 'border-r'
      }`}
      onClick={() => onSelectTick(tick)}
    >
      {tick == currentTick && (
        <div
          className="w-0 h-0 
  border-l-[8px] border-l-transparent
  border-t-[17px] border-t-white-500
  border-r-[8px] border-r-transparent absolute -left-2"
        ></div>
      )}
    </div>
  )
}

const RulerBar = ({
  barIndex,
  maxBars,
  currentTick,
  onSelectTick,
}: RulerBarProps) => {
  return (
    <div
      key={barIndex + 1}
      className={`flex flex-col justify-end gap-4 w-[${RULER_BAR_WIDTH}px] border-l border-slate-400 ${
        barIndex == maxBars - 1 ? 'border-r' : ''
      }`}
    >
      <div className="px-2 text-slate-400 select-none">{barIndex + 1}</div>

      <div className="flex flex-row h-[40%]">
        {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
          <RulerSubBar
            key={j}
            barIndex={barIndex}
            maxBars={maxBars}
            subBarIndex={j}
            currentTick={currentTick}
            onSelectTick={onSelectTick}
          />
        ))}
      </div>
    </div>
  )
}

export const Ruler = () => {
  const maxBars = useSelector(selectMaxBars)
  const currentTick = useSelector(selectCurrentTick)
  const dispatch = useDispatch()

  const handleSelectTick = (tick: number) => {
    dispatch(setCurrentTick(tick))
  }

  return (
    <div className="h-full flex flex-row bg-slate-950">
      {Array.from({ length: maxBars }).map((_, i) => (
        <RulerBar
          key={i}
          barIndex={i}
          maxBars={maxBars}
          currentTick={currentTick}
          onSelectTick={handleSelectTick}
        />
      ))}
    </div>
  )
}
