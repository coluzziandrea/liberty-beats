import { useSelector } from 'react-redux'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { SUB_BAR_NUM } from '../../../playlist-header/constants'

export const TrackBoard = () => {
  const maxBars = useSelector(selectMaxBars)

  return (
    <div className="flex flex-row h-24 min-h-24 max-h-24">
      {Array.from({ length: maxBars }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col justify-end gap-4 w-16 border-l border-slate-400 ${
            i == maxBars - 1 ? 'border-r' : ''
          }  ${i % 2 == 0 ? 'bg-zinc-800' : 'bg-zinc-900'}`}
        >
          <div className="flex flex-row h-full">
            {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
              <p
                key={j}
                className={`w-16 border-slate-500 ${
                  j == SUB_BAR_NUM - 1 ? '' : 'border-r'
                }`}
              ></p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
