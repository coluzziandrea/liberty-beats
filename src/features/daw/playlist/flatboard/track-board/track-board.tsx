import { useSelector } from 'react-redux'
import {
  selectCurrentTick,
  selectMaxBars,
} from '../../../playlist-header/store/selectors'
import { SUB_BAR_NUM } from '../../../playlist-header/constants'

const TrackBoardItem = ({
  currentBar,
  currentSubBar,
  currentTick,
}: {
  currentBar: number
  currentSubBar: number
  currentTick: number
}) => {
  const tick = currentBar * SUB_BAR_NUM + currentSubBar
  return (
    <p
      key={currentSubBar}
      className={`w-16 border-slate-600 ${
        currentSubBar == SUB_BAR_NUM - 1 ? '' : 'border-r'
      } ${tick == currentTick && 'border-l-white border-l'}`}
    ></p>
  )
}

export const TrackBoard = () => {
  const maxBars = useSelector(selectMaxBars)

  const currentTick = useSelector(selectCurrentTick)

  return (
    <div className="flex flex-row h-24 min-h-24 max-h-24">
      {Array.from({ length: maxBars }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col justify-end gap-4 w-16 border-l border-slate-600 ${
            i == maxBars - 1 ? 'border-r' : ''
          }  ${i % 2 == 0 ? 'bg-zinc-800' : 'bg-zinc-900'}`}
        >
          <div className="flex flex-row h-full">
            {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
              <TrackBoardItem
                key={j}
                currentBar={i}
                currentSubBar={j}
                currentTick={currentTick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
