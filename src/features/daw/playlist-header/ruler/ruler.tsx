import { useSelector } from 'react-redux'
import { selectMaxBars } from '../store/selectors'
import { SUB_BAR_NUM } from '../constants'

export const Ruler = () => {
  const maxBars = useSelector(selectMaxBars)
  return (
    <div className="h-full flex flex-row">
      {Array.from({ length: maxBars }).map((_, i) => (
        <div
          key={i + 1}
          className={`flex flex-col justify-end gap-4 w-16 border-l border-slate-200 ${
            i == maxBars - 1 ? 'border-r' : ''
          }`}
        >
          <div className="px-2 text-slate-300 select-none">{i + 1}</div>

          <div className="flex flex-row h-4">
            {Array.from({ length: SUB_BAR_NUM }).map((_, j) => (
              <p
                key={j}
                className={`w-16 border-slate-200 ${
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
