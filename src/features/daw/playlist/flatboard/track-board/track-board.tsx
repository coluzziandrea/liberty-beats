import { useSelector } from 'react-redux'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { SUB_BAR_NUM } from '../../../playlist-header/constants'

export const TrackBoard = () => {
  const maxBars = useSelector(selectMaxBars)

  return (
    <div className="flex flex-row">
      {Array.from({ length: maxBars }).map((_, i) => (
        <div
          key={i}
          className={`flex flex-col justify-end gap-4 w-16 border-l border-slate-300 ${
            i == maxBars - 1 ? 'border-r' : ''
          }`}
        >
          <div className="flex flex-row h-4">
            {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
              <p
                key={j}
                className={`w-16 border-slate-300 ${
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
