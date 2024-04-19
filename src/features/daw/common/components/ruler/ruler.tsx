import { useDispatch, useSelector } from 'react-redux'
import { RULER_BAR_WIDTH, SUB_BAR_NUM } from './constants'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { requestNewTickPosition } from '../../../playlist-header/store/playlist-header-slice'
import { TICK_WIDTH_PIXEL } from '../../../playlist/constants'
import { usePreviewLoopSafeTransportPosition } from '../../hooks/use-preview-loop-safe-transport-position'

type RulerBarProps = {
  barIndex: number
  maxBars: number
  currentTick: number
  onSelectTick: (tick: number) => void
}

const RulerSubBar = ({
  barIndex,
  subBarIndex,
  onSelectTick,
}: {
  subBarIndex: number
} & RulerBarProps) => {
  const tick = barIndex * SUB_BAR_NUM * 4 + subBarIndex * 4
  return (
    <div
      key={subBarIndex}
      className={`w-full relative border-slate-400 ${
        subBarIndex == SUB_BAR_NUM - 1 ? '' : 'border-r'
      }`}
      onClick={() => onSelectTick(tick)}
    ></div>
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

const RulerThumb = ({ currentTick }: { currentTick: number }) => {
  // -7 is the offset to center the thumb (probably depending on the border width)
  const leftOffset = currentTick * TICK_WIDTH_PIXEL - 7
  return (
    <div
      className="absolute bottom-0 w-0 h-0 
  border-l-[8px] border-l-transparent
  border-t-[17px] border-t-white-500
  border-r-[8px] border-r-transparent"
      style={{ left: `${leftOffset}px` }}
    />
  )
}

export const Ruler = () => {
  const maxBars = useSelector(selectMaxBars)
  const { tick: currentTick } = usePreviewLoopSafeTransportPosition()
  const dispatch = useDispatch()

  const handleSelectTick = (tick: number) => {
    dispatch(requestNewTickPosition(tick))
  }

  return (
    <div className="relative">
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
      <RulerThumb currentTick={currentTick} />
    </div>
  )
}
